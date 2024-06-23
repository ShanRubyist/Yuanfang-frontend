<template>
    <UModal v-model="props.isOpen">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">

            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        {{ t('need_credit_modal.title') }}
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="$emit('closeModal')" />
                </div>
            </template>

            <p>{{ t('need_credit_modal.content') }}</p>


            <template #footer>
                <div class="flex items-center justify-around">
                    <UButton color="primary" @click="gotoPay">{{ t('need_credit_modal.pay_btn') }}</UButton>
                </div>
            </template>

        </UCard>
    </UModal>
</template>

<script setup lang="ts">
const props = defineProps(['isOpen'])
const localePath = useLocalePath()
const { t } = useI18n()

function gotoPay() {
    navigateTo({
        path: localePath("/pricing")
    });
}

</script>