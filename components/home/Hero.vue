<template>
    <header class="relative">
        <!-- BG Image -->
        <img src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f66cdeeb4ddfdae25a26e_Background%20Hero.svg"
            alt="" class="absolute -z-10 inline-block h-full w-full object-cover" />
        <!-- Container -->
        <div class="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
            <!-- Heading Content -->
            <div class="mx-auto max-w-3xl text-center">
                <h1 class="text-4xl md:text-6xl font-bold mb-4 text-white">
                    {{ t('index.hero.h1.part1') }}
                    <span class="relative whitespace-nowrap text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 249 22" fill="currentColor"
                            class="absolute inset-x-0 -bottom-0.5 fill-blue-400/75">
                            <path
                                d="M247.564 18.5808C241.772 13.3568 232.473 12.7526 225.225 11.4427C217.124 9.97398 208.996 8.57034 200.846 7.46096C186.542 5.51305 172.169 4.08857 157.79 3.01565C126.033 0.645858 94.0929 0.0338786 62.3387 2.36982C42.1785 3.85419 22.008 5.90888 2.32917 10.8464C-0.0155171 11.4349 0.207047 14.6719 2.6889 14.7084C22.0261 14.9896 41.3866 12.6406 60.7109 11.8568C79.9471 11.0808 99.2274 10.6719 118.484 10.9558C142.604 11.3125 166.719 12.8334 190.722 15.5156C199.956 16.5469 209.195 17.6016 218.411 18.8255C227.864 20.0808 237.259 22 246.767 20.7422C247.709 20.6198 248.426 19.3568 247.564 18.5808Z">
                            </path>
                        </svg>
                        <span class="z-10 relative">{{ t('index.hero.h1.part2') }}</span>
                    </span>
                    {{ t('index.hero.h1.part3') }}
                </h1>

                <p class="mx-auto mb-5 max-w-[528px] text-xl text-[#636262] lg:mb-8">{{ t('index.hero.note') }}</p>
                <a href="#" class="inline-block rounded-full bg-[#c9fd02] px-8 py-4 text-center font-bold text-black transition hover:border-black hover:bg-white">
                    {{ t('index.hero.get_start') }}</a>
            </div>
            <!-- Logo Cloud -->
            <div
                class="mx-auto mt-16 grid max-w-[1040px] grid-cols-2 gap-8 py-20 sm:grid-cols-3 sm:gap-12 md:grid-cols-5">
                <div class="mx-auto">
                    <img src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f66cdeeb4ddfdae25a267_Microsoft%20Logo.svg"
                        alt="" class="inline-block" />
                </div>
                <div class="mx-auto">
                    <img src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f66cdeeb4ddfdae25a26a_PayPal%20Logo.svg"
                        alt="" class="inline-block" />
                </div>
                <div class="mx-auto">
                    <img src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f66cdeeb4ddfdae25a268_Google%20Logo.svg"
                        alt="" class="inline-block" />
                </div>
                <div class="mx-auto">
                    <img src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f66cdeeb4ddfdae25a269_Chase%20Logo.svg"
                        alt="" class="inline-block" />
                </div>
                <div class="mx-auto">
                    <img src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f66cdeeb4ddfdae25a26b_Walmart%20Logo.svg"
                        alt="" class="inline-block" />
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>