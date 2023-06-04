export const state = () => ({
    token: null,
    userid: null
  })
  
  export const mutations = {
    set_token (state, token) {
      state.token = token
    },
    set_userid (state, userid) {
      state.userid = userid
    }
  }