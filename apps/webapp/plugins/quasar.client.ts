import {
  Quasar,
  QPage,
  QBtn,
  QToolbarTitle,
  QToolbar,
  QCard,
  QCardSection,
  QPageContainer,
  QDrawer,
  QLayout,
  QList,
  QHeader,
  QItemLabel,
  QIcon,
  QItemSection,
  QItem
} from 'quasar';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(nuxtApp => {
  const quasarUserOptions = {
    components: {
      QPage,
      QBtn,
      QToolbarTitle,
      QToolbar,
      QCard,
      QCardSection,
      QPageContainer,
      QList,
      QLayout,
      QDrawer,
      QHeader,
      QItemLabel,
      QIcon,
      QItemSection,
      QItem
    },
    plugins: {}
  };

  nuxtApp.vueApp.use(Quasar, quasarUserOptions);
});
