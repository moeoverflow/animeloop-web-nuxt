<template>
  <div class="DashboardPage">
    <p>Dashboard content</p>
  </div>
</template>

<script>
import isLogin from '~/middleware/is-login';

export default {
  name: 'DashboardPage',
  layout: 'dashboard',
  middleware: [isLogin],
  head() {
    return {
      title: `${this.$t('about')} | Animeloop`,
    };
  },
};
</script>

<style scoped lang="scss">
  .DashboardPage {

  }
</style>
