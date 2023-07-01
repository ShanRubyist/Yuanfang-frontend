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
            <div v-html="md(result.find(item => item.label === label)?.answer)"></div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>
  
<script lang="ts">
import request from '@/utils/request'
import { parseSSEMessage, copyToClipboard } from '@/utils/lib'
import markdown from '@/utils/markdown'

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
      (this as any).abort_controller?.abort()
    },
    async achieve(e: any) {
      (this as any).loading = true;
      // console.log((this as any).models)
      (this as any).abort_controller = new AbortController()

      let mapper_model: any;
      for (let model of (this as any).models) {
        mapper_model = MAPPER_MODEL_LIST.find(item => item.label === model);
        this.fetch_answer(mapper_model.label, mapper_model.model, mapper_model.site)
      }
    },
    async fetch_answer(label: any, model: any, site: any) {
      try {
        const response = await request('/api/v1/completions/achieve', {
          method: 'POST',
          headers: {
            responseType: 'stream',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "content": (this as any).question,
            "model": model,
            "temperature": (this as any).temperature,
            "site": site
          }),
          signal: (this as any).abort_controller.signal,
          // mode: 'cors'
        });

        (this as any).result.push({ label: label, answer: '' })
        const reader: any = response.body?.pipeThrough(new TextDecoderStream()).getReader();

        let buf: any = []
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
            const { field, value } = parseSSEMessage(message)
            // console.log('field', field)
            // console.log('value', value)

            let content = JSON.parse(value)?.choices[0]?.delta?.content
            if (typeof content === 'undefined') continue;
            (this as any).result.find((item: any) => item.label === label).answer += content
          }
        }
      }
      catch (e: any) {
        (this as any).result.find((item: any) => item.label === label).answer += ("\n\nOpenAI 请求:" + e)
      }
      finally {
        (this as any).loading = false
      }
    },
    md(str: string) {
      return markdown(str)
    },
    async copy(content: string) {
      await copyToClipboard(content)
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