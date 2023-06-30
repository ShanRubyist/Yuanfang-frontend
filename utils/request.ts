export default async function request(path: string, options: any = {}) {
    let url = process.env.BASE_URL + path

    if (!options.headers) options.headers = {}
    options.headers['Authorization'] = $nuxt.$store.state.token

    let response = await fetch(url, options)

    let authorization = response.headers.get('Authorization')

    if (authorization != undefined) {
        let token = authorization.replace('Bearer ', '')
        $nuxt.$store.commit('set_token', token)
    }

    return response
}