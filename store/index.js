export const state = () => ({
  token: null,
  userid: null
})

export const mutations = {
  set_token(state, token) {
    state.token = token
    this.$cookies.set('token', token)
  },
  set_userid(state, userid) {
    state.userid = userid
  }
}

// 初始化数据方法
export const actions = {
  async nuxtServerInit({ commit }, { app }) {
    let token = app.$cookies.get('token')

    if (token) {
      commit('set_token', token)
    }
  }
}