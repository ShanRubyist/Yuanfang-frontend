<template>
  <div class="container">

    <div class="sidebar">
      <textarea v-model="question" @keyup.ctrl.enter="achieve" class="form-control" rows="5" placeholder="请输入功能描述"
        autofocus></textarea>

      <label>model:</label>
      <a-checkbox-group v-model:value="models" :options="this.modelList" />

      <label>temperature:</label>
      <a-slider v-model:value="temperature" :min="0" :max="2" :step="0.1" />

      <a-button @click="achieve" :loading="loading" type="primary">元芳，你怎么看？</a-button>
      <a-button v-if="loading" @click="abort_request" type="text">取消</a-button>
    </div>

    <div class="main">

      <div class="showcase_container">
        <div v-for="label in this.models" class="showcase">

          <div class="showcase_header">{{ label }}</div>

          <div class="showcase_body" @click="copy(result.find(item => item.label === label)?.answer)">
            <div v-html="markdown(result.find(item => item.label === label)?.answer)"></div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>
  
<script>
import request from '@/utils/request'

const MAPPER_MODEL_LIST = [
  { 'label': 'gpt-3.5-turbo(openai)', 'model': 'gpt-3.5-turbo', 'site': 'openai' },
  { 'label': 'gpt-3.5-turbo(api2d.net)', 'model': 'gpt-3.5-turbo', 'site': 'api2d' },
  { 'label': 'gpt-3.5-turbo(ai.ls)', 'model': 'gpt-3.5-turbo', 'site': 'ai.ls' },
  { 'label': 'gpt-4(api2d.net)', 'model': 'gpt-4', 'site': 'api2d' },
  { 'label': 'gpt-4(ai.ls)', 'model': 'gpt-4', 'site': 'ai.ls' },
]
export default {
  name: "UserIndexPage",
  data: () => ({
    question: '',
    result: [],
    temperature: 0.5,
    modelList: MAPPER_MODEL_LIST.map(item => item.label),
    models: MAPPER_MODEL_LIST.filter(item => item.label != 'gpt-3.5-turbo(openai)').map(item => item.label),
    abort_controller: null,
    loading: false
  }),
  methods: {
    abort_request() {
      this.abort_controller?.abort()
    },
    async achieve(e) {
      this.loading = true
      // console.log(this.models)
      this.abort_controller = new AbortController()

      let mapper_model;
      for (let model of this.models) {
        mapper_model = MAPPER_MODEL_LIST.find(item => item.label === model);
        this.fetch_answer(mapper_model.label, mapper_model.model, mapper_model.site)
      }
    },
    async fetch_answer(label, model, site) {
      try {
        const response = await request('/api/v1/completions/achieve', {
          method: 'POST',
          headers: {
            responseType: 'stream',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "content": this.question,
            "model": model,
            "temperature": this.temperature,
            "site": site
          }),
          signal: this.abort_controller.signal,
          // mode: 'cors'
        })

        this.result.push({ label: label, answer: '' })
        const reader = response.body?.pipeThrough(new TextDecoderStream()).getReader();

        let buf = []
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buf += value
          const messages = buf.split('\n\n')
          buf = messages[messages.length - 1]
          if (messages.length < 2)
            return

          for (let i = 0; i < messages.length - 1; i++) {
            const message = messages[i]
            const { field, value } = this.parseSSEMessage(message)
            // console.log('field', field)
            // console.log('value', value)

            let content = JSON.parse(value)?.choices[0]?.delta?.content
            if (typeof content === 'undefined') continue;
            this.result.find(item => item.label === label).answer += content
          }
        }
      }
      catch (e) {
        this.result.find(item => item.label === label).answer += ("\n\nOpenAI 请求:" + e)

      }
      finally {
        this.loading = false
      }
    },
    parseSSEMessage(message) {
      const lines = message.split('\n')
      const lineFields = []
      const lineValues = []
      for (const line of lines) {
        const { field, value } = this.parseSSELine(line)
        lineFields.push(field)
        lineValues.push(value)
      }
      if (new Set(lineFields).size > 1) {
        throw new Error(
          `Multiple fields appear in a message: ${new Set(lineFields).values()}`,
        )
      }
      return { field: lineFields[0], value: lineValues.join('\n') }
    },
    parseSSELine(line) {
      const pos = line.indexOf(': ')
      if (pos === -1)
        throw new Error(`Can't find ': ' in line '${line}'`)
      if (pos === 0)
        return { field: '', value: line.slice(2) }
      return {
        field: line.slice(0, pos),
        value: line.slice(pos + 2),
      }
    },
    markdown(str) {
      if (typeof str === 'undefined') return '';

      const md = require('markdown-it')({
        html: false,            // Enable HTML tags in source
        xhtmlOut: false,        // Use '/' to close single tags (<br />).
        // This is only for full CommonMark compatibility.
        breaks: false,        // Convert '\n' in paragraphs into <br>
        langPrefix: 'language-',  // CSS language prefix for fenced blocks. Can be
        // useful for external highlighters.
        linkify: false,        // Autoconvert URL-like text to links

        // Enable some language-neutral replacement + quotes beautification
        // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
        typographer: false,

        // Double + single quotes replacement pairs, when typographer enabled,
        // and smartquotes on. Could be either a String or an Array.
        //
        // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
        // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
        quotes: '“”‘’',

        // Highlighter function. Should return escaped HTML,
        // or '' if the source string is not changed and should be escaped externally.
        // If result starts with <pre... internal wrapper is skipped.
        highlight: function (/*str, lang*/) { return ''; }
      });
      return md.render(str)
    },
    async copyToClipboard(text) {
      if (!text) return
      try {
        return await navigator.clipboard.writeText(text)
      } catch {
        const element = document.createElement("textarea")
        const previouslyFocusedElement = document.activeElement

        element.value = text

        // Prevent labelboard from showing on mobile
        element.setAttribute("readonly", "")

        element.style.contain = "strict"
        element.style.position = "absolute"
        element.style.left = "-9999px"
        element.style.fontSize = "12pt" // Prevent zooming on iOS

        const selection = document.getSelection()
        const originalRange = selection
          ? selection.rangeCount > 0 && selection.getRangeAt(0)
          : null

        document.body.appendChild(element)
        element.select()

        // Explicit selection workaround for iOS
        element.selectionStart = 0
        element.selectionEnd = text.length

        document.execCommand("copy")
        document.body.removeChild(element)

        if (originalRange) {
          selection?.removeAllRanges() // originalRange can't be truthy when selection is falsy
          selection?.addRange(originalRange)
        }

        // Get the focus back on the previously focused element, if any
        if (previouslyFocusedElement) {
          ; (previouslyFocusedElement).focus()
        }
      }
    },
    async copy(content) {
      await this.copyToClipboard(content)
    }
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
  /* max-width: 126.25rem; */
}

.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 20rem;
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  width: 100%;
  margin: 0 0 1rem 0;
  padding: 1rem;
  border-radius: 8px;
  border-color: #e8e8e8;
}

.ant-slider {
  width: 100%;
  margin-bottom: 16px;
}

.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem;
  padding: 1rem 0;
}

.showcase_container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  background-color: #efefef;
  border-width: .1px;
  border-style: solid;
  border-color: #e8e8e8;
  border-radius: 8px;
  padding: 8px;
  overflow: auto;
}

.showcase {
  margin: .5rem .3rem;
  padding: 1rem;
  background-color: #f8f8f8;
  border-radius: 6px;
  /* min-width: 300px; */
  width: 45%;
  /* min-height: 100px; */
  height: 500px;
  overflow: auto;
  border-width: .1px;
  border-style: solid;
  border-color: #e8e8e8;
  border-radius: 2px;
}
</style>