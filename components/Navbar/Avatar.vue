<template>
  <div
    class="NavbarAvatar">
    <div v-click-outside="onClickOutside">
      <div
        :class="{ 'is-active': navStates.profilePanelOpen }"
        class="dropdown is-right">
        <div class="dropdown-trigger">
          <figure
            class="image is-32x32 avatar"
            @click="toggleAvatar"
          >
            <img :src="avatarImage">
          </figure>
        </div>
        <div
          id="dropdown-menu2"
          class="dropdown-menu"
          role="menu"
        >
          <ProfilePanel/>
        </div>
      </div>
    </div>
    <LoginModal :is-active="navStates.loginModalOpen"/>

  </div>
</template>

<script>
/**
 * Login of the Navbar.
 */
import LoginModal from '../Auth/LoginModal';
import ProfilePanel from '../Auth/ProfilePanel';

export default {
  name: 'NavbarAvatar',
  components: {
    LoginModal,
    ProfilePanel,
  },
  computed: {
    user() {
      return this.$store.state.auth.authUser;
    },
    userInfo() {
      return this.isLogin ? this.$store.state.profile.userInfo : null;
    },
    avatarImage() {
      return this.isLogin ? `/files${this.userInfo.avatar}` : '//animeloop.org/files/web/default_avatar.jpg';
    },
    isLogin() {
      return this.user !== null && this.user !== undefined;
    },
    navStates() {
      return this.$store.state.navbar;
    },
  },
  methods: {
    toggleAvatar() {
      if (!this.isLogin) {
        this.$store.dispatch('toggleNavbarState', { type: 'loginModal' });

        /*
        * when user open or close loginModal,
        * change url hash in the browser.
        * */
        const route = this.$router.currentRoute;
        if (this.navStates.loginModalOpen) {
          this.$router.replace({ name: route.name, path: route.path, hash: '#login' });
        } else {
          this.$router.replace({ name: route.name, path: route.path, hash: '' });
        }
      } else {
        this.$store.dispatch('toggleNavbarState', { type: 'profilePanel' });
      }
    },
    onClickOutside() {
      if (this.navStates.profilePanelOpen) {
        this.$store.dispatch('toggleNavbarState', { type: 'profilePanel' });
      }
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
