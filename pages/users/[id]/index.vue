<template>
  <div class="container">
    <div class="sidebar">
      <textarea v-model="question" @keyup.ctrl.enter="achieve" class="form-control" rows="5" placeholder="请输入功能描述"
        autofocus></textarea>

      <label>model:</label>
      <a-checkbox-group v-model:value="models" :options="this.modelList" />

      <label>temperature:</label>
      <a-slider v-model:value="temperature" :min="0" :max="2" :step="0.1" />

      <label>prompt:
        <button @click="prompts_modal_visible = true">管理</button></label>
      <p>{{ prompt?.content }}</p>
      <a-modal v-model:open="prompts_modal_visible" title="Prompts Library" centered :footer="null"
        @ok="prompts_modal_visible = false">
        <a-button type="primary" @click="add_prompt_model_visible = true">添加</a-button>

        <a-modal v-model:open="add_prompt_model_visible" title="Add Prompt" centered @ok="addPrompt">
          <div class="form">
            <div class="form-fieldset">
              <div class="form-label">
                <label>prompt</label>
              </div>
              <div class="form-input-container">
                <textarea type="text" placeholder="请输入prompt" v-model="new_prompt_content" required rows="5"></textarea>
              </div>
            </div>

            <div class="form-fieldset">
              <div class="form-input-container">
                <a-checkbox v-model:checked="is_prompt_default">设为默认</a-checkbox>
              </div>
            </div>
          </div>
        </a-modal>

        <a-list bordered :data-source="prompts">
          <template #renderItem="item">
            <a-list-item v-bind:data-index="item?.id" @click="setDefaultPrompt(item?.id)">
              <a-tag color="green" v-if="item?.default">default</a-tag>
              <br />

              {{ item?.content }}

              <button>edit</button>
              <button>delete</button>
            </a-list-item>
          </template>

          <!-- <template #header>
            <div>Header</div>
          </template>
          
          <template #footer>
            <div>Footer</div>
          </template> -->
        </a-list>
      </a-modal>

      <a-button @click="achieve" :loading="loading" type="primary">元芳，你怎么看？</a-button>
      <a-button v-if="loading" @click="abort_request" type="text">取消</a-button>
    </div>

    <div class="main">
      <div class="showcase_container">
        <div v-for="model in this.models" class="showcase">
          <div class="showcase_header">{{ model }}</div>

          <div class="showcase_body" @click="copy(result.find((item) => item.model === model)?.answer)">
            <div v-html="md(result.find((item) => item.model === model)?.answer)"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import request from "@/utils/request";
import { parseSSEMessage, copyToClipboard } from "@/utils/lib";
import markdown from "@/utils/markdown";

export default defineNuxtComponent({
  name: "UserIndexPage",
  data: () => ({
    question: "",
    result: [],
    temperature: 0.5,
    // mapper_model_list: null,
    // modelList: null,
    // models: null,
    abort_controller: null,
    loading: false,
    prompts_modal_visible: false,
    add_prompt_model_visible: false,
    // prompts: null,
    // prompt: null,
    is_prompt_default: false,
    new_prompt_content: null,
  }),
  methods: {
    async get_prompts() {
      const resp = await request("/api/v1/prompts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      (this as any).prompts = await resp.json();
    },
    async get_default_prompt() {
      const resp = await request("/api/v1/prompts/default", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      (this as any).prompt = (await resp.json()).default_prompt;
    },
    async addPrompt() {
      const resp = await request("/api/v1/prompts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: (this as any).new_prompt_content,
          default: (this as any).is_prompt_default,
        }),
      });

      if (resp.status == 200 || resp.status == 201) {
        (this as any).add_prompt_model_visible = false;
        this.get_prompts();
        this.get_default_prompt();
      }
    },
    async setDefaultPrompt(prompt_id: number) {
      const resp = await request("/api/v1/prompts/default", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt_id: prompt_id,
        }),
      });

      if (resp.status == 200 || resp.status == 201) {
        (this as any).prompts_modal_visible = false;
        this.get_default_prompt();
      }
    },
    abort_request() {
      (this as any).abort_controller?.abort();
    },
    async achieve(e: any) {
      (this as any).loading = true;
      // console.log((this as any).models)
      (this as any).abort_controller = new AbortController();

      let mapper_model: any;
      for (let model of (this as any).models) {
        mapper_model = (this as any).mapper_model_list.find(
          (item: any) => item.model === model
        );
        this.fetch_answer(mapper_model.model);
      }
    },
    async fetch_answer(model: string) {
      try {
        const response = await request("/api/v1/completions/achieve", {
          method: "POST",
          headers: {
            responseType: "stream",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            temperature: (this as any).temperature,
            prompt_id: (this as any).prompt.id,
            content: (this as any).question,
            site: model,
          }),
          signal: (this as any).abort_controller.signal,
          // mode: 'cors'
        });

        (this as any).result.push({ model: model, answer: "" });

        if (response.ok) {
          const reader: any = response.body
            ?.pipeThrough(new TextDecoderStream())
            .getReader();

          let buf: any = [];
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            buf += value;
            const messages = buf.split("\n\n");
            buf = messages[messages.length - 1];
            if (messages.length < 2) return;

            for (let i = 0; i < messages.length - 1; i++) {
              const message = messages[i];
              const { field, value } = parseSSEMessage(message);
              // console.log('field', field)
              // console.log('value', value)

              let content = JSON.parse(value)?.choices?.[0]?.delta?.content;
              if (typeof content === "undefined") continue;
              (this as any).result.find(
                (item: any) => item.model === model
              ).answer += content;
            }
          }
        } else {
          const resp = await response.json();
          throw new Error(resp.error);
        }
      } catch (e: any) {
        console.log("AI 请求", e);
        (this as any).result.find((item: any) => item.model === model).answer +=
          "\n\nAI 请求:" + e;
      } finally {
        (this as any).loading = false;
      }
    },
    md(str: string) {
      return markdown(str);
    },
    async copy(content: string) {
      await copyToClipboard(content);
    },
  },
  // async fetch() {
  //   const resp = await request('/api/v1/info/models', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  //   });
  //   (this as any).mapper_model_list = await resp.json();
  //   (this as any).modelList = (this as any).mapper_model_list.map((item: any) => item.model);
  //   (this as any).models = (this as any).mapper_model_list.filter((item: any) => item.default).map((item: any) => item.model);

  //   (this as any).get_default_prompt();
  //   (this as any).get_prompts();
  // },
  async asyncData() {
    const resp = await request("/api/v1/info/models", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resp2 = await request("/api/v1/prompts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resp3 = await request("/api/v1/prompts/default", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let mapper_model_list = await resp.json();
    return {
      mapper_model_list: mapper_model_list,
      modelList: mapper_model_list.map((item: any) => item.model),
      models: mapper_model_list.filter((item: any) => item.default).map((item: any) => item.model),
      prompts: await resp2.json(),
      prompt: (await resp3.json()).default_prompt,
    };
  },
});
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

label {
  margin: 16px 0 8px;
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
  border-width: 0.1px;
  border-style: solid;
  border-color: #e8e8e8;
  border-radius: 8px;
  padding: 8px;
  overflow: auto;
}

.showcase {
  margin: 0.5rem 0.3rem;
  padding: 1rem;
  background-color: #f8f8f8;
  border-radius: 6px;
  /* min-width: 300px; */
  width: 45%;
  /* min-height: 100px; */
  height: 500px;
  overflow: auto;
  border-width: 0.1px;
  border-style: solid;
  border-color: #e8e8e8;
  border-radius: 2px;
}
</style>
