export const state = () => ({
  token: null,
  userid: null
})

export const mutations = {
  set_token(state: any, token: string) {
    state.token = token;
    (this as any).$cookies.set('token', token)
  },
  set_userid(state: any, userid: number) {
    state.userid = userid
  }
}

// 初始化数据方法
export const actions = {
  async nuxtServerInit({ commit }: { commit: any }, { app }: { app: any }) {
    let token = app.$cookies.get('token')

    if (token) {
      commit('set_token', token)
    }
  }
}