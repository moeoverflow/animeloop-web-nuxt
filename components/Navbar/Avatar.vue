<template>
  <div
    class="NavbarAvatar">
    <div>{{ this.$store.state.auth.authUser }}</div>
    <figure
      class="image is-32x32 avatar"
      @click="toggleAvatar"
    >
      <img src="~/assets/images/default_avatar_akkarin.jpg">
    </figure>
    <LoginModal :is-active="navStates.loginModalOpen"/>
  </div>
</template>

<script>
/**
 * Login of the Navbar.
 */

import LoginModal from '../Auth/LoginModal';

export default {
  name: 'NavbarAvatar',
  components: {
    LoginModal,
  },
  data() {
    return {
      isLogin: false,
      avatarOn: false,
    };
  },
  computed: {
    navStates() {
      return this.$store.state.navbar;
    },
  },
  methods: {
    toggleAvatar() {
      this.$store.dispatch('toggleNavbarState', { type: 'loginModal' });
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~bulma/sass/utilities/_all";
  @import "~bulma/sass/elements/image";
  @import "~bulma/sass/components/dropdown";

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
