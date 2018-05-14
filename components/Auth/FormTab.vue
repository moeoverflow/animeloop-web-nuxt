<template>
  <div class="login-tab">
    <div
      v-show="isShowUsername"
      class="field"
    >
      <label class="label">Username</label>
      <div class="control has-icons-left has-icons-right">
        <input
          v-model="formData.username"
          class="input"
          type="text"
          placeholder="Username"
        >
        <span class="icon is-small is-left">
          <FontAwesomeIcon :icon="icon.faUser"/>
        </span>
      </div>
    </div>
    <div
      v-show="isShowEmail"
      class="field"
    >
      <label class="label">Email</label>
      <p class="control has-icons-left has-icons-right">
        <input
          v-model="formData.email"
          class="input"
          type="email"
          placeholder="Email"
        >
        <span class="icon is-small is-left">
          <FontAwesomeIcon :icon="icon.faEnvelope"/>
        </span>
      </p>
    </div>
    <div
      v-show="isShowPassword"
      class="field"
    >
      <label class="label">Password</label>
      <p class="control has-icons-left">
        <input
          v-model="formData.password"
          class="input"
          type="password"
          placeholder="Password">
        <span class="icon is-small is-left">
          <FontAwesomeIcon :icon="icon.faLock"/>
        </span>
      </p>
    </div>
    <div
      v-show="isShowRecaptcha"
      class="field">
      <VueRecaptcha
        sitekey="6Le7LFIUAAAAAHEoYQAM3k9P_lNSKKcT5emrZmim"
        @verify="onVerify"
        @expired="onExpired"
      />
    </div>
    <div class="field">
      <p class="control">
        <button
          :disabled="!isLoginAvaliable"
          :class="isSubmiting"
          class="button is-link is-fullwidth"
          @click="submit"
        >
          {{ submitTitle }}
        </button>
      </p>
    </div>
    <p
      v-show="isShowForgotPassword"
      class="help forgot-password"
    >
      <a href="#">Forgot password?</a>
    </p>
  </div>
</template>

<script>
/**
 * Login of the Navbar.
 */
import remote from '~/assets/js/api/fetch';
import VueRecaptcha from 'vue-recaptcha';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faUser, faLock, faCheck, faEnvelope } from '@fortawesome/fontawesome-free-solid';

export default {
  name: 'LoginTab',
  components: {
    VueRecaptcha,
    FontAwesomeIcon,
  },
  props: {
    formType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      message: {
        type: '',
        body: '',
      },
      formData: {
        username: '',
        email: '',
        password: '',
        gRecaptchaResponse: 's',
      },
      submiting: false,
    };
  },
  computed: {
    isShowUsername() {
      return (this.formType === 'login' || this.formType === 'signup');
    },
    isShowEmail() {
      return this.formType === 'signup';
    },
    isShowPassword() {
      return true;
    },
    isShowForgotPassword() {
      return this.formType === 'login';
    },
    isShowRecaptcha() {
      return true;
    },
    isSubmiting() {
      return this.submiting ? 'is-loading' : '';
    },
    submitTitle() {
      if (this.formType === 'login') {
        return 'Login';
      } else if (this.formType === 'signup') {
        return 'Sign Up';
      }
      return 'None';
    },
    icon() {
      return {
        faUser,
        faLock,
        faCheck,
        faEnvelope,
      };
    },
    isLoginAvaliable() {
      const validUsername = /^[a-zA-Z0-9_-]{5,15}$/.test(this.formData.username);
      const validEmail = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(this.formData.email);
      const validPassword = /^[a-zA-Z]\w{6,17}$/.test(this.formData.password);
      const validgRecaptchaResponse = this.formData.gRecaptchaResponse.length !== 0;

      if (this.formType === 'login') {
        return validgRecaptchaResponse && validUsername && validPassword;
      } else if (this.formType === 'signup') {
        return validgRecaptchaResponse && validUsername && validEmail && validPassword;
      }
      return false;
    },
  },
  methods: {
    onVerify(response) {
      this.formData.gRecaptchaResponse = response;
    },
    onExpired() {
      this.formData.gRecaptchaResponse = '';
    },
    async submit() {
      if (this.formType === 'signup') {
        // Signup submit
        const {
          username,
          email,
          password,
          gRecaptchaResponse,
        } = this.formData;
        this.submiting = true;
        const result = await remote.signup(username, email, password, gRecaptchaResponse);
        this.submiting = false;
        if (result.code === 200) {
          this.$store.dispatch('toggleNavbarState', { type: 'loginModal' });
        }
      } else if (this.formType === 'login') {
        // Login submit
        const {
          username,
          password,
          gRecaptchaResponse,
        } = this.formData;
        this.submiting = true;
        const result = await this.$store.dispatch('login', { username, password, gRecaptchaResponse });
        this.submiting = false;
        if (result.code === 200) {
          this.$store.dispatch('toggleNavbarState', { type: 'loginModal' });
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~bulma/sass/utilities/_all";
  @import "~bulma/sass/elements/image";
  @import "~bulma/sass/elements/box";
  @import "~bulma/sass/components/modal";
  @import "~bulma/sass/elements/button";

  .forgot-password {
    margin: 0 auto;
    text-align: center;
  }
</style>
