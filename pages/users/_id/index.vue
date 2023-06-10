<template>
  <div class="container">

    <div class="sidebar">
      <textarea v-model="question" class="form-control" rows="5" placeholder="请输入功能描述" autofocus></textarea>

      <a-button @click="achieve" type="primary">元芳，你怎么看？</a-button>
    </div>

    <div class="main">

      <div class="showcase_container">
        <div v-if='result' class="showcase">
          <div v-html="this.result"></div>
        </div>
      </div>
    </div>

  </div>
</template>
  
<script>
export default {
  name: "UserIndexPage",
  data: () => ({
    question: '',
    result: '',
  }),
  methods: {
    async achieve() {
      try {
        this.result = "元芳正在思考..."
        const response = await $nuxt.$axios.post('/api/v1/completions/achieve', {
          "content": this.question
        })

        this.result = this.markdown(response.data?.answer)
      }
      catch (e) {
        alert("openai 请求失败:" + e);
      }
    },
    markdown(str) {
      const md = require('markdown-it')({
          html: false,        // Enable HTML tags in source
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

.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem;
  padding: 1rem;
}

.showcase_container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: #efefef;
  border-width: .1px;
  border-style: solid;
  border-color: #e8e8e8;
  border-radius: 8px;
  padding: 8px;
}

.showcase {
  margin: 1rem;
  padding: 1rem;
  background-color: #f8f8f8;
  min-width: 400px;
  min-height: 100px;
  border-width: .1px;
  border-style: solid;
  border-color: #e8e8e8;
  border-radius: 2px;
}
</style>