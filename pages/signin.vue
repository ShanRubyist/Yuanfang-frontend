<template>
  <div class="container">
    <div class="top-links-container">
      <span>Don't have an account yet?</span>
      <button>Sign up</button>
      <a href="#">Need help?</a>
    </div>

    <div class="content-container">
      <div class="login-form">
        <p class="logo-wrap">Yuanfang</p>

        <div class="auth-content">
          <div class="form-fieldset-container">
            <p>Signin</p>
          </div>
          <div class="form-fieldset">
            <div class="form-label">
              <label>Email</label>
            </div>
            <div class="form-input-container">
              <input type="text" placeholder="bruce@example.com" v-model="email" required />
            </div>
          </div>

          <div class="form-fieldset">
            <div class="form-label">
              <label>Password</label>
            </div>
            <div class="form-input-container">
              <input type="password" placeholder="Password" v-model="password" required />
            </div>
          </div>

          <div class="custom-button-container">
            <a href="#">Forgot password?</a>
          </div>

          <div class="form-button-bar">
            <a-button @click="login" type="primary">Log in</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import request from "@/utils/request";
import { useMainStore } from "~/store";

useHead({
  title: "Signin",
})

let email: string;
let password: string;
let store: any = useMainStore();

async function login(): Promise<void> {
  try {
    const resp = await request("/auth/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (resp.ok) {
      navigateTo({
        path: "/users/1", // + this.store.$state.userid
      });
    } else {
      throw new Error((await resp.json()).errors);
    }
  } catch (e: any) {
    alert("登录失败:" + e);
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* flex: 2 1 120px; */
  width: 100%;
}

.top-links-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}

.content-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 2.5rem 2rem;
}

.logo-wrap {
  font-size: 2rem;
  font-style: bold;
}

.form-fieldset-container {
  display: flex;
  justify-content: center;
}

.form-fieldset-container p {
  font-size: 1.5rem;
}

.form-fieldset {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  min-width: 20rem;
  padding: 0.5rem 0;
}

.form-fieldset .form-input-container {
  width: 100%;
  margin: 0.5rem 0;
}

.form-fieldset .form-label label {
  margin: 0.5rem 0;
  padding: 0.5rem 0;
}

.form-fieldset input:focus {
  outline-style: none;
  border-color: rgb(149, 195, 225);
  box-shadow: 0 0 0.5rem #51cbee;
}

.form-fieldset input {
  width: 100%;
  min-height: 1.5rem;
  padding: 0.5rem;
  border-width: 0.03rem;
}

.custom-button-container {
  margin-bottom: 1.5rem;
}

.custom-button-container a:link,
.custom-button-container a:visited {
  text-decoration: underline;
  color: #777;
}

.custom-button-container a:hover {
  color: blue;
}

.form-button-bar button {
  width: 100%;
}
</style>
