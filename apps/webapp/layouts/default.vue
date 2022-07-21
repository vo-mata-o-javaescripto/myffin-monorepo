<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white" elevated>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title @click="goHome">
          <q-btn round>
            <q-avatar size="40px">
              <img
                src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
              />
            </q-avatar>
          </q-btn>
          Global Portfolio
        </q-toolbar-title>
        <q-btn color="deep-orange" glossy label="Logout" @click="doLogout" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <q-page class="q-pa-md">
        <NuxtPage />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

export default defineComponent({
  setup() {
    const leftDrawerOpen = ref(false);
    const router = useRouter();
    const authStore = useAuthStore();

    const goHome = () => router.push({ name: 'index' });

    const doLogout = async () => {
      await authStore.doLogout();

      if (!authStore.isLogged) {
        router.push({ name: 'login' });
      }
    };

    return {
      leftDrawerOpen,
      goHome,
      doLogout,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      }
    };
  }
});
</script>
