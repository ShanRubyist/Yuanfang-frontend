import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    token: null,
    userid: null,
  }),
  actions: {
    setToken(token: string) {
      (this as any).token = token;

      let cookie = useCookie("token");
      cookie.value = token;
    },
    setUserId(userid: number) {
      (this as any).userid = userid;
    },
    init() {
      let cookie = useCookie("token");

      let token = cookie.value;

      if (token) {
        this.setToken(token);
      }
    },
  },
});
