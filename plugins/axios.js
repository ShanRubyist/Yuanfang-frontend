export default function ({ $axios, store, redirect }) {
  // console.log('AXIOS PLUGIN LOADED');

  $axios.onRequest(request => {
    console.log('[ REQUEST ]' + request.url)
    //   if (store.state.sessionStorage.authUser) {
    //     request.headers.common['Authorization'] = store.state.sessionStorage.authUser.token_type + ' ' + store.state.sessionStorage.authUser.access_token;
    //   }

    let token = store.state.token;
    // let token = window.localStorage.getItem('token')

    if ((token == null || token == undefined) && ((request.url != '/api/v1/info'))) {
      return redirect('/signin')
    } else {
      $axios.setToken(token)
      return request
    }
  })

  $axios.onResponse(response => {
    console.log('[ RESPONSE ]' + response.request.responseURL, response)
    // TODO: If token expires, perform a silent refresh

    if (response.headers.authorization != undefined) {
      let token = response.headers.authorization.replace('Bearer ', '')
      let userid = response.data.data.id
      store.commit('set_token', token)
      store.commit('set_userid', userid)
      // window.localStorage.setItem('token', store.state.token)
    }

    return response
  })

  $axios.onError(error => {
    console.error('[ ERROR ]', error)
    //   const code = parseInt(error.response && error.response.status)
    //   if (code === 401) {
    //     // store.state.sessionStorage.authUser = null
    //     return redirect('/')
    //   }

    return error
  })
}