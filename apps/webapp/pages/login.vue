<template>
  <div class="row q-gutter-xs">
    <div class="col col-12">
      <h4>Faça login</h4>
    </div>

    <div class="col col-12">
      <form @submit.prevent="submit">
        <label for="user"></label>
        <input v-model="authStore.user" name="user" type="text" />

        <label for="pass"></label>
        <input v-model="authStore.pass" name="pass" type="text" />

        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const router = useRouter();
const authStore = useAuthStore();

const submit = async () => {
  await authStore.doLogin();

  if (authStore.isLogged) {
    router.push({ name: 'index' });
  }
};
</script>
