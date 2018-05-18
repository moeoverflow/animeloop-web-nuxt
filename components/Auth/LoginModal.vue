<template>
  <div class="LoginModal">
    <div
      :class="{ 'is-active': isActive }"
      class="modal"
    >
      <div class="modal-background"/>
      <div class="modal-content">
        <div
          v-click-outside="onClickOutside"
          class="box"
        >
          <div class="tabs is-primary is-right">
            <ul>
              <li class="login-logo">
                <img src="~/assets/images/anime-loop-logo.svg">
              </li>
              <li
                :class="{ 'is-active': isTabActive('login') }"
                @click="switchTab('login')"
              >
                <a>
                  <span class="icon is-small">
                    <FontAwesomeIcon :icon="icon.faUser"/>
                  </span>
                  <span>{{ $t('login') }}</span>
                </a>
              </li>
              <li
                :class="{ 'is-active': isTabActive('signup') }"
                @click="switchTab('signup')"
              >
                <a>
                  <span class="icon is-small">
                    <FontAwesomeIcon
                      :icon="icon.faPencilAlt"
                      aria-hidden="true"
                    />
                  </span>
                  <span>{{ $t('signup') }}</span>
                </a>
              </li>
            </ul>
          </div>
          <FormTab
            v-show="isTabShow('login')"
            ref="loginForm"
            form-type="login"
          />
          <FormTab
            v-show="isTabShow('signup')"
            form-type="signup"
            @signup-success="signUpSuccess"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
   * Login of the Navbar.
   */

import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faUser, faPencilAlt } from '@fortawesome/fontawesome-free-solid';

import FormTab from './FormTab';

export default {
  name: 'LoginModal',
  components: {
    FontAwesomeIcon,
    FormTab,
  },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    icon() {
      return {
        faUser,
        faPencilAlt,
      };
    },
    navStates() {
      return this.$store.state.navbar;
    },
    tabActive() {
      return this.navStates.loginFormTab;
    },
  },
  mounted() {
    /*
    * when url hash in the browser changed to #login or #signup,
    * open the loginModal if not, and switch tab.
    * */
    window.onhashchange = () => {
      const { hash } = this.$router.history.current;
      if (hash === '#login' || hash === '#signup') {
        if (!this.navStates.loginModalOpen) {
          this.$store.dispatch('toggleNavbarState', { type: 'loginModal' });
        }
        this.$store.dispatch('switchLoginFormTab', { tab: hash.replace('#', '') });
      }
    };

    /*
    * tabActive init
    * when url hash in the browser is #login or #signup,
    * open the loginModal, and switch tab.
    * */
    const { hash } = this.$router.history.current;
    if (hash === '#login' || hash === '#signup') {
      this.$store.dispatch('toggleNavbarState', { type: 'loginModal' });
      this.$store.dispatch('switchLoginFormTab', { tab: hash.replace('#', '') });
    }
  },
  methods: {
    isTabActive(tab) {
      return tab === this.tabActive;
    },
    isTabShow(tab) {
      return tab === this.tabActive;
    },
    switchTab(tab) {
      this.$store.dispatch('switchLoginFormTab', { tab });

      /*
      * when user switch loginModal tab,
      * change url hash in the browser.
      * */
      const route = this.$router.currentRoute;
      this.$router.replace({ name: route.name, path: route.path, hash: `#${tab}` });
    },
    signUpSuccess({ username, password, code }) {
      this.switchTab('login');
      this.$refs.loginForm.formData.username = username;
      this.$refs.loginForm.formData.password = password;
      this.$refs.loginForm.signUpSuccess(code);
    },
    onClickOutside() {
      if (this.isActive) {
        this.$store.dispatch('toggleNavbarState', { type: 'loginModal' });

        /*
        * when user close loginModal,
        * remove url hash in the browser.
        * */
        const route = this.$router.currentRoute;
        this.$router.replace({ name: route.name, path: route.path, hash: '' });
      }
    },
  },
};
</script>

<style scoped lang="scss">
  .modal-content {
    width: 440px;
  }

  .login-logo {
    margin-right: auto;

    img {
      height: 30px;
    }
  }

  .hidden {
    display: none;
  }
</style>
