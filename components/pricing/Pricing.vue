<template>
    <section class="bg-white text-zinc-900 py-8 sm:py-16">
        <div class="max-w-screen-xl mx-auto px-6 lg:px-16">
            <div class="mb-8 md:mb-12">
                <h2 class="max-w-xl text-center mx-auto text-5xl font-bold mb-4">Prices, simple and suited for all your
                    needs</h2>
                <p class="max-w-screen-sm text-center text-base mx-auto text-zinc-500 mb-8">Discover transparent and
                    flexible pricing tailored to meet your unique requirements. Our straightforward and customizable
                    plans ensure you get precisely what you need.</p>
                <p class="mx-auto mb-8 mt-4 max-w-lg text-[#636262] md:mb-12 lg:mb-16">
                    For inquiries or assistance, please contact us at
                    <a :href="'mailto:' + email" class="text-blue-500">{{ email }}</a>
                </p>
            </div>
            <div class="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-3 gap-y-6 items-center">
                <div
                    class="bg-white rounded-lg p-2 border border-solid border-zinc-100 md:data-[primary=true]:-mx-4 md:data-[primary=true]:z-[100] shadow-xl">
                    <div
                        class="bg-zinc-100 rounded-md p-6 text-blue-900 from-blue-400 to-blue-600 data-[primary=true]:bg-gradient-to-bl data-[primary=true]:text-white data-[primary=true]:py-10">
                        <h3 class="text-sm font-medium mb-1">Starter</h3>
                        <!-- <div class="flex items-end"><span
                                class="text-3xl font-bold leading-none">$45</span><span
                                class="opacity-50 text-xs ml-2 select-none leading-5">/ year</span>
                            </div> -->
                        <div class="mt-6">
                            <button @click="checkout(price_1)"
                                class="h-10 text-sm font-medium rounded text-blue-900 text-center w-full bg-white active:scale-95 transition-transform">
                                Current plan
                            </button>
                        </div>
                    </div>
                    <ul class="flex flex-col gap-4 p-6 py-6">
                        <li class="flex items-center gap-3">
                            <div class="w-4 h-4 p-0.5 bg-zinc-100 rounded-full"><svg xmlns="http://www.w3.org/2000/svg"
                                    width="100%" height="100%" viewBox="0 0 24 24" stroke-width="2" stroke="#3b67e4"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M5 12l5 5l10 -10"></path>
                                </svg></div>
                            <p>10 GB storage</p>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-4 h-4 p-0.5 bg-zinc-100 rounded-full"><svg xmlns="http://www.w3.org/2000/svg"
                                    width="100%" height="100%" viewBox="0 0 24 24" stroke-width="2" stroke="#3b67e4"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M5 12l5 5l10 -10"></path>
                                </svg></div>
                            <p>Basic Integrations</p>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-4 h-4 p-0.5 bg-zinc-100 rounded-full"><svg xmlns="http://www.w3.org/2000/svg"
                                    width="100%" height="100%" viewBox="0 0 24 24" stroke-width="2" stroke="#3b67e4"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M5 12l5 5l10 -10"></path>
                                </svg></div>
                            <p>Standard Encryption</p>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-4 h-4 p-0.5 bg-zinc-100 rounded-full"><svg xmlns="http://www.w3.org/2000/svg"
                                    width="100%" height="100%" viewBox="0 0 24 24" stroke-width="2" stroke="#3b67e4"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M5 12l5 5l10 -10"></path>
                                </svg></div>
                            <p>Standard Support</p>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-4 h-4 p-0.5 bg-zinc-100 rounded-full"><svg xmlns="http://www.w3.org/2000/svg"
                                    width="100%" height="100%" viewBox="0 0 24 24" stroke-width="2" stroke="#3b67e4"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M5 12l5 5l10 -10"></path>
                                </svg></div>
                            <p>Email Support</p>
                        </li>
                    </ul>
                </div>
                <div class="bg-white rounded-lg p-2 border border-solid border-zinc-100 md:data-[primary=true]:-mx-4 md:data-[primary=true]:z-[100] shadow-xl"
                    data-primary="true">
                    <div class="bg-zinc-100 rounded-md p-6 text-blue-900 from-blue-400 to-blue-600 data-[primary=true]:bg-gradient-to-bl data-[primary=true]:text-white data-[primary=true]:py-10"
                        data-primary="true">
                        <h3 class="text-sm font-medium mb-1">Business</h3>
                        <div class="flex items-end"><span
                                class="text-3xl font-bold leading-none">$<!-- -->95</span><span
                                class="opacity-50 text-xs ml-2 select-none leading-5">/ year</span></div>
                        <div class="mt-6">
                            <button @click="checkout(price_2)"
                                class="h-10 text-sm font-medium rounded text-blue-900 text-center w-full bg-white active:scale-95 transition-transform">
                                Get started</button>
                        </div>
                    </div>
                    <ul class="flex flex-col gap-4 p-6 py-6">
                        <li class="flex items-center gap-3">
                            <div class="w-4 h-4 p-0.5 bg-zinc-100 rounded-full"><svg xmlns="http://www.w3.org/2000/svg"
                                    width="100%" height="100%" viewBox="0 0 24 24" stroke-width="2" stroke="#3b67e4"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M5 12l5 5l10 -10"></path>
                                </svg></div>
                            <p>50 GB storage</p>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-4 h-4 p-0.5 bg-zinc-100 rounded-full"><svg xmlns="http://www.w3.org/2000/svg"
                                    width="100%" height="100%" viewBox="0 0 24 24" stroke-width="2" stroke="#3b67e4"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M5 12l5 5l10 -10"></path>
                                </svg></div>
                            <p>Advanced Integrations</p>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-4 h-4 p-0.5 bg-zinc-100 rounded-full"><svg xmlns="http://www.w3.org/2000/svg"
                                    width="100%" height="100%" viewBox="0 0 24 24" stroke-width="2" stroke="#3b67e4"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M5 12l5 5l10 -10"></path>
                                </svg></div>
                            <p>Two-Factor Authentication</p>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-4 h-4 p-0.5 bg-zinc-100 rounded-full"><svg xmlns="http://www.w3.org/2000/svg"
                                    width="100%" height="100%" viewBox="0 0 24 24" stroke-width="2" stroke="#3b67e4"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M5 12l5 5l10 -10"></path>
                                </svg></div>
                            <p>Enhanced analytics</p>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-4 h-4 p-0.5 bg-zinc-100 rounded-full"><svg xmlns="http://www.w3.org/2000/svg"
                                    width="100%" height="100%" viewBox="0 0 24 24" stroke-width="2" stroke="#3b67e4"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M5 12l5 5l10 -10"></path>
                                </svg></div>
                            <p>24/7 Chat &amp; Email</p>
                        </li>
                    </ul>
                </div>
                <div
                    class="bg-white rounded-lg p-2 border border-solid border-zinc-100 md:data-[primary=true]:-mx-4 md:data-[primary=true]:z-[100] shadow-xl">
                    <div
                        class="bg-zinc-100 rounded-md p-6 text-blue-900 from-blue-400 to-blue-600 data-[primary=true]:bg-gradient-to-bl data-[primary=true]:text-white data-[primary=true]:py-10">
                        <h3 class="text-sm font-medium mb-1">Enterprise</h3>
                        <div class="flex items-end"><span
                                class="text-3xl font-bold leading-none from-blue-400 to-blue-600 bg-gradient-to-br text-transparent bg-clip-text">Let's
                                talk</span></div>
                        <div class="mt-6">
                            <button @click="checkout(price_3)"
                                class="h-10 text-sm font-medium rounded text-blue-900 text-center w-full bg-white active:scale-95 transition-transform">Contact
                                us</button>
                        </div>
                    </div>
                    <ul class="flex flex-col gap-4 p-6 py-6">
                        <li class="flex items-center gap-3">
                            <div class="w-4 h-4 p-0.5 bg-zinc-100 rounded-full"><svg xmlns="http://www.w3.org/2000/svg"
                                    width="100%" height="100%" viewBox="0 0 24 24" stroke-width="2" stroke="#3b67e4"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M5 12l5 5l10 -10"></path>
                                </svg></div>
                            <p>Min 100 GB storage</p>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-4 h-4 p-0.5 bg-zinc-100 rounded-full"><svg xmlns="http://www.w3.org/2000/svg"
                                    width="100%" height="100%" viewBox="0 0 24 24" stroke-width="2" stroke="#3b67e4"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M5 12l5 5l10 -10"></path>
                                </svg></div>
                            <p>Custom API Integrations</p>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-4 h-4 p-0.5 bg-zinc-100 rounded-full"><svg xmlns="http://www.w3.org/2000/svg"
                                    width="100%" height="100%" viewBox="0 0 24 24" stroke-width="2" stroke="#3b67e4"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M5 12l5 5l10 -10"></path>
                                </svg></div>
                            <p>Enterprise-Grade Security</p>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-4 h-4 p-0.5 bg-zinc-100 rounded-full"><svg xmlns="http://www.w3.org/2000/svg"
                                    width="100%" height="100%" viewBox="0 0 24 24" stroke-width="2" stroke="#3b67e4"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M5 12l5 5l10 -10"></path>
                                </svg></div>
                            <p>Premium analytics</p>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-4 h-4 p-0.5 bg-zinc-100 rounded-full"><svg xmlns="http://www.w3.org/2000/svg"
                                    width="100%" height="100%" viewBox="0 0 24 24" stroke-width="2" stroke="#3b67e4"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M5 12l5 5l10 -10"></path>
                                </svg></div>
                            <p>Priority Phone &amp; Chat</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { initializePaddle } from '@paddle/paddle-js'
import { useMainStore } from '~/store'

const config = useRuntimeConfig().public
const pay_success_url = config.pay_success_url
const email = config.email

let { data: payment_info } = await useAsyncData("payment_info", async () => {
    let resp = await request("/api/v1/payment_info", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return resp.data;
});

const payment_processor = payment_info.value?.payment_processor
const paddle_billing_environment = payment_info.value?.paddle_billing_environment
const paddle_billing_client_token = payment_info.value?.paddle_billing_client_token
const price_1 = payment_info.value?.price_1
const price_2 = payment_info.value?.price_2
const price_3 = payment_info.value?.price_3

let { data: info } = await useAsyncData("active_subscription_info", async () => {
    let resp = await request("/api/v1/active_subscription_info", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return resp.data;
});

const has_active_subscription = info.value?.has_active_subscription;
const active_subscriptions = info.value?.active_subscriptions;
// console.log(active_subscriptions)

const { locale } = useI18n()
let localeValue = locale.value || config.defaultLocale
const { notify } = useNotify()

let store = useMainStore()

async function paddle_customer() {
    const resp = await request("/paddle_customer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    });
    return resp
}

async function paddle_checkout(priceId, successUrl = pay_success_url) {
    const resp = await paddle_customer()

    if (resp.status === 200) {
        let paddleInstance = await initializePaddle(
            {
                environment: paddle_billing_environment,
                token: paddle_billing_client_token
            })

        if (paddleInstance) {
            // paddle billing 的中文只有简体中文，繁体中文也会显示简体中文中文
            // 参考链接：https://developer.paddle.com/paddlejs/methods/paddle-checkout-open
            if(localeValue == 'zh') { localeValue = 'zh-Hans'}

            paddleInstance.Checkout.open({
                items: [{
                    priceId: priceId,
                    quantity: 1
                }],
                settings: {
                    displayMode: "overlay",
                    locale: localeValue,
                    allowLogout: false,
                    successUrl: pay_success_url,
                },
                customer: {
                    email: store.userInfo.email,
                },
                customData: {
                    "crm_id": 1,
                    "utm_source": "web"
                },
            });
        }
    }
    else {
        notify('error', 'paddle customer error')
    }
}

async function stripe_checkout(priceId, successUrl = pay_success_url) {
    const resp = await request("/stripe_checkout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            locale: localeValue,
            price_id: priceId,
            success_url: successUrl
        }),
    });

    if (resp.status === 200) {
        navigateTo(resp.data.url, { external: true })
    }
    else {
        notify('error', 'stripe pay error')
    }
}


async function checkout(priceId) {
    if (payment_processor === 'paddle_billing') {
        await paddle_checkout(priceId)
    }
    else if (payment_processor === 'stripe') {
        await stripe_checkout(priceId)
    }
}

</script>