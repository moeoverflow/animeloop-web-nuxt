<template>
  <div class="DashboardAPIPage">
    <el-button
      type="primary"
      @click="createTokenClicked">{{ $t('apii.create-token') }}</el-button>
    <el-table
      :data="tokens">
      <el-table-column
        :label="$t('apii.id')"
        prop="_id"
        width="100"/>
      <el-table-column
        :label="$t('apii.name')"
        prop="name"
        width="180"/>
      <el-table-column
        :label="$t('apii.token')"
        prop="token"
        width="600"/>
      <el-table-column :label="$t('apii.actions')">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="deleteTokenClicked(scope.row)"
          >{{ $t('common.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="creatingToken"
      :title="$t('apii.create-token')">
      <el-form :model="form">
        <el-form-item
          :label="$t('apii.name')">
          <el-input
            v-model="form.name"
            auto-complete="off"/>
        </el-form-item>
        <a
          href="//api.animeloop.org/docs/v2/"
          target="__blank">
          {{ $t('apii.how-to-use') }}
        </a>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button @click="createTokenCancel">{{ $t('common.cancel') }}</el-button>
        <el-button
          :loading="requestCreatingToken"
          type="primary"
          @click="createTokenConfirm"
        >{{ $t('common.sure') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="deletingToken"
      width="30%">
      <span>{{ $t('apii.deleteTokenSure') }}</span>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button @click="deleteTokenCancel">{{ $t('common.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="deleteTokenConfirm">{{ $t('common.sure') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

import remote from '~/assets/js/api/fetch';
import isLogin from '~/middleware/is-login';

export default {
  name: 'DashboardAPIPage',
  layout: 'dashboard',
  middleware: [isLogin],
  head() {
    return {
      title: `${this.$t('api')} | Animeloop`,
    };
  },
  data() {
    return {
      requestCreatingToken: false,
      creatingToken: false,
      form: {
        name: '',
      },
      requestDeletingToken: false,
      deletingToken: false,
      deletingTokenRow: {},
    };
  },
  async fetch({ store, error, req }) {
    try {
      const headers = process.server ? req.headers : null;
      await store.dispatch('fetchUserToken', { headers });
    } catch (err) {
      error({ statusCode: 404, message: 'API returned Error', customMsg: err.message });
    }
  },
  computed: {
    tokens() {
      return this.$store.state.api.tokens;
    },
  },
  methods: {
    createTokenClicked() {
      this.creatingToken = true;
    },
    createTokenCancel() {
      this.form.name = '';
      this.creatingToken = false;
    },
    async createTokenConfirm() {
      this.requestCreatingToken = true;
      const result = await remote.createNewToken({
        name: this.form.name,
      });

      if (result.status === 'success') {
        this.tokens.push(result.data);
      }
      this.creatingToken = false;
      this.requestCreatingToken = false;
    },
    deleteTokenClicked(row) {
      this.deletingToken = true;
      this.deletingTokenRow = row;
    },
    deleteTokenCancel() {
      this.deletingToken = false;
      this.deletingTokenRow = {};
    },
    async deleteTokenConfirm() {
      this.requestDeletingToken = true;
      const id = this.deletingTokenRow._id;
      const result = await remote.revokeToken({
        id,
      });

      if (result.status === 'success') {
        const index = this.tokens.findIndex(t => t._id === id);
        if (index > -1) {
          this.tokens.splice(index, 1);
        }
      }
      this.deletingToken = false;
      this.requestDeletingToken = false;
      this.deletingTokenRow = {};
    },
  },

};
</script>

<style scoped lang="scss">

</style>
