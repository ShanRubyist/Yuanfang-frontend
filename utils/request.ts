import { useMainStore } from '~/store'

type Authorization = string | null

export async function request2(path: string, options: any = {}) {
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
        // return navigateTo({
        //     path: "/signin",
        // });
    }

    let authorization: Authorization = response.headers.get('Authorization')

    if (authorization != undefined) {
        let token = authorization.replace('Bearer ', '')
        store.setToken(token)
    }

    return response
}

export async function request(path: string, options: any = {}) {
    const config = useRuntimeConfig()

    let url: string = config.public.endpoint + path

    if (!options.headers) options.headers = {}
    let store = useMainStore()

    if (config.public.has_login) {
        // TODO: 要优化
        store.init();
        options.headers['Authorization'] = store.$state.token
    }

    options.headers['Content-Type'] = 'application/json'
    options.headers['Accept'] = 'application/json'
    // options.credentials = 'include'

    // TODO:$fetch获取到的stream locked
    // let response = await $fetch.raw(url, options)
    try {
        let response = await fetch(url, options)


        let json = await response.json()

        if (config.public.has_login) {
            let authorization: Authorization = response.headers.get('Authorization')

            if (authorization != undefined) {
                let token = authorization.replace('Bearer ', '')
                await store.setToken(token)
            }

            if (response.status == 401) {
                const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
                const match = json.errors[0].match(emailRegex)

                const localePath = useLocalePath()

                if (match) {
                    let email = match[0];
                    // console.log(`Extracted email: ${email}`);

                    navigateTo({
                        path: localePath("/auth/email_verifications"),
                        query: { email: email, type: 'account_confirm' }
                    });
                }
                // else {
                // if (path != localePath('/auth/login')) {
                // navigateTo({
                //     path: localePath('/auth/login')
                // });
                // }

                // }
                // return json;
            }
        }

        return {
            status: response.status,
            headers: response.headers,
            data: json
        }
    } catch (e: any) {
        const { notify } = useNotify()
        notify('error', 'fetch exception:' + e)
        throw e
    }
}