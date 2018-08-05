<template>
  <div class="DashboardSettingsPage">
    <el-row :gutter="20">
      <el-col
        :span="12"
        class="profile-form">
        <el-form
          v-loading="updateUserInfoLoading"
          ref="profileForm"
          :model="profileForm"
          :rules="rules"
          status-icon
          label-width="100px"
          class="demo-ruleForm"
          label-position="top"
        >
          <el-form-item label="UID">
            <el-input
              :value="user.uid"
              disabled/>
          </el-form-item>
          <el-form-item :label="$t('username')">
            <el-input
              :value="user.username"
              disabled/>
          </el-form-item>
          <hr>
          <el-form-item
            :label="$t('email')"
            prop="email"
          >
            <el-input
              v-model="profileForm.email"
              type="email"
              auto-complete="off"
            />
          </el-form-item>
          <hr>
          <el-form-item
            :label="$t('settings.input-new-password')"
            prop="pass">
            <el-input
              v-model="profileForm.pass"
              type="password"
              auto-complete="off"/>
          </el-form-item>
          <el-form-item
            :label="$t('settings.verify-new-password')"
            prop="checkPass">
            <el-input
              v-model="profileForm.checkPass"
              type="password"
              auto-complete="off"/>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit('profileForm')">{{ $t('settings.update-profile') }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="1">
        <br>
      </el-col>
      <el-col :span="6">
        <el-form label-position="top">
          <el-form-item :label="$t('settings.profile-picture')">
            <el-card
              v-loading="uploadAvatarLoading"
              :body-style="{ padding: '0px' }"
              class="avatar-card"
              shadow="never">
              <img
                ref="avatarImage"
                :onload="avatarImageOnLoad"
                :src="avatarUrl"
                class="image">
            </el-card>
            <el-upload
              :action="`${apiBaseUrl}profile/upload-new-avatar`"
              :with-credentials="true"
              :before-upload="beforeAvatarUpload"
              :on-success="onAvatarUploadSucess"
              :on-erro="onAvatarUploadError"
              :show-file-list="false"
              :limit="1"
              accept="image/*"
              name="avatar"
              class="avatar-upload"
              multiple
            >
              <el-button
                slot="trigger"
                size="small"
                type="primary">{{ $t('settings.upload-new-avatar') }}</el-button>
              <div
                slot="tip"
                class="el-upload__tip">{{ $t('settings.upload-avatar-tip') }}</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import remote from '~/assets/js/api/fetch';

import isLogin from '~/middleware/is-login';
import apiPrefix from '~/config';

export default {
  name: 'DashboardSettingsPage',
  layout: 'dashboard',
  middleware: [isLogin],
  head() {
    return {
      title: `${this.$t('settings')} | Animeloop`,
    };
  },
  data() {
    const apiBaseUrl = apiPrefix.browser;

    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input correct email.'));
      } else {
        const pattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
        const flag = pattern.test(value);
        if (flag) {
          callback();
        } else {
          callback(new Error('Please input correct format email.'));
        }
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback();
      } else {
        if (this.profileForm.checkPass !== '') {
          this.$refs.profileForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback();
      } else if (value !== this.profileForm.pass) {
        callback(new Error('Different new password.'));
      } else {
        callback();
      }
    };

    return {
      apiBaseUrl,
      updateUserInfoLoading: false,
      uploadAvatarLoading: false,
      profileForm: {
        email: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        email: [
          { validator: validateEmail, trigger: 'blur' },
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' },
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    avatarUrl() {
      return this.user.avatar ? `http://127.0.0.1:7775/files${this.user.avatar}` : '//animeloop.org/files/web/default_avatar.jpg';
    },
    user() {
      return this.$store.state.profile.userInfo;
    },
  },
  mounted() {
    this.profileForm.email = this.user.email;
  },
  methods: {
    async onSubmit(formName) {
      this.updateUserInfoLoading = true;
      this.$refs[formName].validate(async (valid) => {
        if (!valid) {
          this.$message.error(this.$t('response.update-userinfo-failed'));
        } else {
          const { email, pass } = this.profileForm;
          const result = await remote.updateUserInfo(email, pass);
          if (result.status === 'success') {
            this.$message.success(this.$t(`response.${result.code}`));
          }
        }
        this.updateUserInfoLoading = false;
        return true;
      });
    },
    beforeAvatarUpload(file) {
      this.uploadAvatarLoading = true;
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    onAvatarUploadSucess(res) {
      this.$store.commit('SET_USER_AVATAR', `${res.data.avatar}?date=${new Date()}`);
      this.uploadAvatarLoading = false;
    },
    onAvatarUploadError(err) {
      this.uploadAvatarLoading = false;
    },
  },
  async fetch({ store, error, req }) {
    const headers = process.server ? req.headers : null;
    try {
      await store.dispatch('fetchUserInfo', { headers });
    } catch (err) {
      error({ statusCode: 404, message: 'API returned Error', customMsg: err.message });
    }
  },
};
</script>

<style scoped lang="scss">
  .DashboardPage {

    background-color: #6EA080;
  }

  .profile-form {
    max-width: 600px;
  }


  .avatar-card {
    margin-top: 12px;
    width: 240px;
    height: 240px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .avatar-upload {
    margin-top: 12px;

    button {
      width: 240px;
    }
  }
</style>
