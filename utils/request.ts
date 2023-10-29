import { useMainStore } from '~/store'

export default async function request(path: string, options: any = {}) {
    const config = useRuntimeConfig()    
    let url = config.public.baseURL + path

    if (!options.headers) options.headers = {}

    let store = useMainStore()
    options.headers['Authorization'] = store.$state.token

    // TODO:$fetch获取到的stream locked
    // let response = await $fetch.raw(url, options)
    let response = await fetch(url, options)

    let authorization = response.headers.get('Authorization')

    if (authorization != undefined) {
        let token = authorization.replace('Bearer ', '')
        store.setToken(token)
    }

    return response
}