<template>
  <div
    class="NavbarProfilePanel dropdown-content">
    <div class="dropdown-item">
      <p>Hello, <strong>{{ isLogin ? user.username : 'guest' }}</strong>.</p>
    </div>
    <hr class="dropdown-divider">
    <nuxt-link
      class="dropdown-item"
      to="/dashboard"
      @click.native="goToDashboard"
    >
      <FontAwesomeIcon :icon="icon.faTachometerAlt"/>
      {{ $t('dashboard') }}
    </nuxt-link>
    <a
      class="dropdown-item"
      @click="logout"
    >
      <FontAwesomeIcon :icon="icon.faSignOutAlt"/>
      {{ $t('logout') }}
    </a>
  </div>
</template>

<script>
/**
 * Profile panel of the Navbar.
 */
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faTachometerAlt, faSignOutAlt } from '@fortawesome/fontawesome-free-solid';

export default {
  name: 'NavbarProfilePanel',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {};
  },
  computed: {
    icon() {
      return {
        faTachometerAlt,
        faSignOutAlt,
      };
    },
    navStates() {
      return this.$store.state.navbar;
    },
    user() {
      return this.$store.state.auth.authUser;
    },
    isLogin() {
      return this.user !== null && this.user !== undefined;
    },
  },
  methods: {
    async logout() {
      const result = await this.$store.dispatch('logout');
      if (result.code === 1220002) {
        this.$store.dispatch('toggleNavbarState', { type: 'profilePanel' });
      }
    },
    goToDashboard() {
      this.$store.dispatch('toggleNavbarState', { type: 'profilePanel' });
    },
  },
};
</script>

<style scoped lang="scss">
  .NavbarAvatar {
    margin-left: 1rem;
  }

  .avatar {
    cursor: pointer;

    img {
      border-radius: 50%;
    }
  }
</style>
