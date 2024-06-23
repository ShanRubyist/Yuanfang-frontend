<template>
    <a-modal v-model:open="show" title="New Prompt" centered @ok="newPrompt">
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
</template>

<script setup lang="ts">
interface IProps {
    visible: boolean
}

interface IEmit {
    (e: 'change_add_prompt_modal_visible', visible: boolean): void
    (e: 'update_prompts'): void
    (e: 'update_default_prompt'): void
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmit>()


const show = computed({
    get: () => props.visible,
    set: (visible: boolean) => emit('change_add_prompt_modal_visible', visible),
})

let is_prompt_default: Ref<boolean> = ref(false);
let new_prompt_content: Ref<string> = ref("");

async function newPrompt(): Promise<void> {
    const resp = await request2("/api/v1/prompts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content: new_prompt_content.value,
            default: is_prompt_default.value,
        }),
    });

    if (resp.status == 200 || resp.status == 201) {
        show.value = false;

        emit('update_prompts');
        emit('update_default_prompt');
    }
}

</script>

<style scoped></style>