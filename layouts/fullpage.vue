<template>
  <div class="layout-container">
    <nuxt />
  </div>
</template>

<script>
import ogIcon from '~/assets/images/icon.png';

export default {
  name: 'FullPage',
  head() {
    return {
      htmlAttrs: {
        lang: this.langAttr,
      },
      meta: [
        { hid: 'og:title', name: 'og:title', content: 'Animeloop' },
        { hid: 'og:image', name: 'og:image', content: ogIcon },
        { hid: 'og:description', property: 'og:description', content: 'Animeloop Web Frontend' },
      ],
    };
  },
  computed: {
    langAttr() {
      return this.$store.state.i18n.locale || 'en';
    },
  },
};
</script>

<style lang="postcss">
  .layout-container {
    height: 100vh;
  }
</style>
