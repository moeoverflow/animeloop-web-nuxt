<template>
  <div class="LoginModal">
    <div
      :class="{ 'is-active': isActive }"
      class="modal"
    >
      <div class="modal-background"/>
      <div class="modal-content">
        <div class="box">
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
                  <span>Login</span>
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
                  <span>Signup</span>
                </a>
              </li>
            </ul>
          </div>
          <FormTab
            :class="{ hidden: !isTabHidden('login') }"
            form-type="login"
          />
          <FormTab
            :class="{ hidden: !isTabHidden('signup') }"
            form-type="signup"
          />
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="closeModal"
      />
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
      default: true,
    },
  },
  data() {
    return {
      tabActive: 'login',
    };
  },
  computed: {
    icon() {
      return {
        faUser,
        faPencilAlt,
      };
    },
  },

  methods: {
    closeModal() {
      this.$store.dispatch('toggleNavbarState', { type: 'loginModal' });
    },
    isTabActive(tab) {
      return tab === this.tabActive;
    },
    isTabHidden(tab) {
      return tab === this.tabActive;
    },
    switchTab(tab) {
      this.tabActive = tab;
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~bulma/sass/utilities/_all";
  @import "~bulma/sass/elements/image";
  @import "~bulma/sass/elements/box";
  @import "~bulma/sass/elements/button";
  @import "~bulma/sass/components/modal";
  @import "~bulma/sass/components/tabs";

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
