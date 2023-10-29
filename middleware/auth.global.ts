import { useMainStore } from "~/store";

export default defineNuxtRouteMiddleware((to, from) => {
  // If the user is not authenticated
  let store = useMainStore();
  
  //TODO: 要优化
  store.init();
  let token = store.$state.token;

  if ((token == null || token == undefined) && to.fullPath != "/signin") {
    return navigateTo({
      path: "/signin",
    });
  }
});
