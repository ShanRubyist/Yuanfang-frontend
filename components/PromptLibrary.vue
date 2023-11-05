<template>
    <a-modal v-model:open="show" title="Prompts Library" centered :footer="null"
        @ok="emit('change_prompts_model_visible', false)">
        <a-button type="primary" @click="new_prompt_model_visible = true">添加</a-button>

        <NewPrompt :visible="new_prompt_model_visible" @change_add_prompt_modal_visible="new_prompt_model_visible = false"
            @update_default_prompt="emit('update_default_prompt')" @update_prompts="emit('update_prompts')">
        </NewPrompt>

        <a-list bordered :data-source="prompts">
            <template #renderItem="{ item }">
                <a-list-item v-bind:data-index="item?.id" @click="setDefaultPrompt(item?.id)">
                    <a-tag color="green" v-if="item?.default">default</a-tag>
                    <br />

                    {{ item?.content }}

                    <button>edit</button>
                    <button>delete</button>
                </a-list-item>
            </template>
        </a-list>
    </a-modal>
</template>

<script setup lang="ts">
interface IProps {
    visible: boolean
    prompts: any[]
}

interface IEmit {
    (e: 'change_prompts_model_visible', visible: boolean): void
    (e: 'set_default_prompt', prompt_id: number): void
    (e: 'update_prompts'): void
    (e: 'update_default_prompt'): void
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmit>()


const show = computed({
    get: () => props.visible,
    set: (visible: boolean) => emit('change_prompts_model_visible', visible),
})

let new_prompt_model_visible: Ref<boolean> = ref(false);

function setDefaultPrompt(prompt_id: number): void {
    emit('set_default_prompt', prompt_id);
}
</script>

<style scoped></style>