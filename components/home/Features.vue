<template>

    <!-- Section Features  -->
    <section>
        <!-- Features Container -->
        <div class="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
            <!-- Features Title -->
            <div class="text-center">
                <h2 class="text-3xl font-bold md:text-5xl">{{ t('index.features.title') }}</h2>
                <p class="mx-auto mb-8 mt-4 max-w-lg text-[#647084] md:mb-12 lg:mb-16">{{ t('index.features.note') }}</p>
            </div>
            <!-- Features Grid -->
            <div class="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                <!-- Features Item -->
                <div class="grid gap-8 p-8 md:p-10">
                    <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358bda43ea08a612343b1f3_Vector-3.svg"
                        alt="" class="inline-block h-8" />
                    <p class="text-xl font-semibold">{{ t('index.features.item1')}}</p>
                    <p class="text-sm text-[#636262]">{{ t('index.features.item1_note') }}</p>
                </div>
                <!-- Features Item -->
                <div class="grid gap-8 p-8 md:p-10">
                    <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358bdb1bd05f5915d7bf31c_Vector-4.svg"
                        alt="" class="inline-block h-8" />
                    <p class="text-xl font-semibold">{{ t('index.features.item2')}}</p>
                    <p class="text-sm text-[#636262]">{{ t('index.features.item2_note')}}</p>
                </div>
                <!-- Features Item -->
                <div class="grid gap-8 p-8 md:p-10">
                    <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358bdaaeeb5cbd611bf5048_Vector-5.svg"
                        alt="" class="inline-block h-8" />
                    <p class="text-xl font-semibold">{{ t('index.features.item3') }}</p>
                    <p class="text-sm text-[#636262]">{{ t('index.features.item3_note') }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>