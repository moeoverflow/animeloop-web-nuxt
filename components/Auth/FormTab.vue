<template>
  <div class="form-tab">
    <FormMessage
      :type="message.type"
      :content="message.content"
    />
    <div
      v-show="isShowUsername"
      class="field"
    >
      <label class="label">{{ $t('username') }}</label>
      <div class="control has-icons-left">
        <input
          v-model="formData.username"
          :placeholder="$t('username')"
          class="input"
          type="text"
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
      <label class="label">{{ $t('email') }}</label>
      <p class="control has-icons-left">
        <input
          v-model="formData.email"
          :placeholder="$t('email')"
          class="input"
          type="email"
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
      <label class="label">{{ $t('password') }}</label>
      <p class="control has-icons-left">
        <input
          v-model="formData.password"
          :placeholder="$t('password')"
          class="input"
          type="password"
        >
        <span class="icon is-small is-left">
          <FontAwesomeIcon :icon="icon.faLock"/>
        </span>
      </p>
    </div>
    <div
      v-show="isShowRecaptcha"
      class="field">
      <VueRecaptcha
        ref="recaptcha"
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
          {{ $t(formType) }}
        </button>
      </p>
    </div>
    <p
      v-show="isShowForgotPassword"
      class="help forgot-password"
    >
      <a href="#">{{ $t('forgot-password') }}</a>
    </p>
  </div>
</template>

<script>
/* eslint-disable no-fallthrough */

/**
 * Login of the Navbar.
 */
import remote from '~/assets/js/api/fetch';
import VueRecaptcha from 'vue-recaptcha';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faUser, faLock, faCheck, faEnvelope } from '@fortawesome/fontawesome-free-solid';
import FormMessage from './FormMessage';

export default {
  name: 'LoginTab',
  components: {
    VueRecaptcha,
    FontAwesomeIcon,
    FormMessage,
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
        content: '',
      },
      formData: {
        username: '',
        email: '',
        password: '',
        gRecaptchaResponse: '',
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
      const validPassword = /^\w{8,32}$/.test(this.formData.password);
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
        switch (result.code) {
          case 1120001:
            this.$emit('signup-success', {
              username: this.formData.username,
              password: this.formData.password,
              code: result.code,
            });
            this.formData.username = '';
            this.formData.email = '';
            this.formData.password = '';
            break;
          case 1140001:
          case 1140002:
            this.formData.username = '';
          case 1140003:
          case 1140004:
            this.formData.password = '';
          case 1140005:
          case 1140006:
            this.formData.email = '';
          case 1940101:
          case 1140901:
            this.message = {
              type: 'is-danger',
              content: `response.${result.code}`,
            };
            break;
          default:
            this.message = {
              type: 'is-danger',
              content: 'response.unknown-error',
            };
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
        switch (result.code) {
          case 1220001:
            this.toggleLoginModal();
            this.$nuxt.$router.push({ path: '/dashboard' });
            this.username = '';
            this.password = '';
            break;
          case 1940101:
          case 1940104:
          case 1940105:
          case 1940106:
            this.message = {
              type: 'is-danger',
              content: `response.${result.code}`,
            };
            break;
          default:
            this.message = {
              type: 'is-danger',
              content: 'response.unknown-error',
            };
        }
      }
      this.$refs.recaptcha.reset();
    },
    toggleLoginModal() {
      this.$store.dispatch('toggleNavbarState', { type: 'loginModal' });
    },
    signUpSuccess(code) {
      this.message = {
        type: 'is-success',
        content: `response.${code}`,
      };
    },
  },
};
</script>

<style scoped lang="scss">
  .forgot-password {
    margin: 0 auto;
    text-align: center;
  }
</style>
