<template>
  <div class="container">
    <div class="sidebar">
      <textarea v-model="question" @keyup.ctrl.enter="achieve" class="form-control" rows="5" placeholder="请输入功能描述"
        autofocus></textarea>

      <label>model:</label>
      <a-checkbox-group v-model:value="models" :options="modelList" />

      <label>temperature:</label>
      <a-slider v-model:value="temperature" :min="0" :max="2" :step="0.1" />

      <label>prompt:
        <button @click="prompts_modal_visible = true">管理</button>
      </label>
      <p>{{ prompt?.content }}</p>

      <PromptLibrary :visible="prompts_modal_visible" :prompts="prompts"
        @change_prompts_model_visible="prompts_modal_visible = false" @set_default_prompt="setDefaultPrompt"
        @update_default_prompt="getDefaultPrompt" @update_prompts="getPrompts">
      </PromptLibrary>

      <a-button @click="achieve" :loading="loading" type="primary">元芳，你怎么看？</a-button>
      <a-button v-if="loading" @click="abortRequest" type="text">取消</a-button>
    </div>

    <div class="main">
      <div class="showcase_container">
        <div v-for="model in models" class="showcase">
          <div class="showcase_header">{{ model }}</div>

          <div class="showcase_body" @click="copy(aiMessage(model))">
            <div v-html="md(aiMessage(model))"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import request from "@/utils/request";
import { parseSSEMessage, copyToClipboard } from "@/utils/lib";
import markdown from "@/utils/markdown";
import { v4 as uuidv4 } from 'uuid';

const route = useRoute();
useHead({
  title: '用户中心 - ' + route.params.id,
})

let question: Ref<string> = ref("");
let result: Ref<any[]> = ref([]);
let temperature: Ref<number> = ref(0.5);
let abort_controller: Ref<AbortController | null> = ref(null);
let loading: Ref<boolean> = ref(false);
let prompts_modal_visible: Ref<boolean> = ref(false);

let { data: mapper_model_list } = await useAsyncData("modelList", async () => {
  let resp = await request("/api/v1/info/models", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return resp.json();
});

let { data: prompts } = await useAsyncData("prompts", async () => {
  let resp = await request("/api/v1/prompts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return resp.json();
});

let { data: prompt } = await useAsyncData("defaut_prompt", async () => {
  let resp = await request("/api/v1/prompts/default", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let default_prompt = (await resp.json()).default_prompt;

  return default_prompt;
});

let modelList: any = ref(
  mapper_model_list.value.map((item: any) => item.model)
);

let models: any = ref(
  mapper_model_list.value
    .filter((item: any) => item.default)
    .map((item: any) => item.model)
);

async function getPrompts(): Promise<void> {
  const resp = await request("/api/v1/prompts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  prompts.value = await resp.json();
}

async function getDefaultPrompt(): Promise<void> {
  const resp = await request("/api/v1/prompts/default", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  prompt.value = await (await resp.json()).default_prompt;
}

async function setDefaultPrompt(prompt_id: number): Promise<void> {
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
    prompts_modal_visible.value = false;
    getDefaultPrompt();
  }
}

function abortRequest(): void {
  abort_controller.value?.abort();
}

async function achieve(e: any): Promise<void> {
  loading.value = true;
  // console.log(models)
  abort_controller.value = new AbortController();

  let mapper_model: any;
  let achieve_id = uuidv4();
  for (let model of models.value) {
    mapper_model = mapper_model_list.value.find(
      (item: any) => item.model === model
    );
    fetchAnswer(achieve_id, mapper_model.model);
  }
}

async function fetchAnswer(achieve_id: string, model: string): Promise<void> {
  try {
    result.value.push({ model: model, answer: "" });

    const response = await request("/api/v1/completions/achieve", {
      method: "POST",
      headers: {
        responseType: "stream",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        achieve_id: achieve_id,
        temperature: temperature.value,
        prompt_id: prompt.value.id,
        content: question.value,
        site: model,
      }),
      signal: abort_controller.value?.signal,
      // mode: 'cors'
    });

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
          result.value.find((item: any) => item.model === model).answer +=
            content;
        }
      }
    } else {
      const resp = await response.json();
      throw new Error(resp.error);
    }
  } catch (e: any) {
    console.log("AI 请求", e);
    result.value.find((item: any) => item.model === model).answer +=
      "\n\nAI 请求:" + e;
  } finally {
    loading.value = false;
  }
}

function md(str: string): string {
  return markdown(str);
}

async function copy(content: string): Promise<void> {
  await copyToClipboard(content);
}

function aiMessage(model: string): string {
  return result.value?.find((item: any) => item.model === model)?.answer;
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
