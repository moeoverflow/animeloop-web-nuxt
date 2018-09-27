<template>
  <div class="Layout-container">
    <el-container>
      <el-header>
        <NavbarContainer />
      </el-header>
      <el-container>
        <el-aside class="dashboard-menu-aside">
          <DashboardNav/>
        </el-aside>
        <el-main>
          <nuxt />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavbarContainer from '~/components/Navbar';
import DashboardNav from '~/components/DashboardNav';
import ogIcon from '~/assets/images/icon.png';

export default {
  name: 'Layout',
  components: {
    NavbarContainer,
    DashboardNav,
  },
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
  @import "~/node_modules/element-ui/lib/theme-chalk/index.css";
  @import "~/assets/css/mediaqueries.css";

  .el-header {
    padding: 0;
  }

  html {
    font-family:2 "Helvetica Neue", system-ui, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoot hing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

</style>
