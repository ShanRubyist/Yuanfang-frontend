import { useMainStore } from '~/store'

type Authorization = string | null

export default async function request(path: string, options: any = {}) {
    const config = useRuntimeConfig()
    let url: string = config.public.baseURL + path

    if (!options.headers) options.headers = {}

    let store = useMainStore()

    // TODO: 要优化
    store.init();
    options.headers['Authorization'] = store.$state.token

    // TODO:$fetch获取到的stream locked
    // let response = await $fetch.raw(url, options)
    let response = await fetch(url, options)

    if (response.status == 401) {
        return navigateTo({
            path: "/signin",
        });
    }

    let authorization: Authorization = response.headers.get('Authorization')

    if (authorization != undefined) {
        let token = authorization.replace('Bearer ', '')
        store.setToken(token)
    }

    return response
}