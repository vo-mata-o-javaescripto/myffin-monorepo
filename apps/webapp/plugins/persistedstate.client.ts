import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export default function ({ $pinia }) {
  $pinia.use(piniaPluginPersistedstate);
}
