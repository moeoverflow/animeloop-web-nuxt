<template>
  <div class="DashboardNav">
    <el-menu
      :router="true"
      default-active="2"
      class="el-menu-vertical-demo"
    >
      <el-menu-item index="/dashboard">
        <i class="el-icon-"><FontAwesomeIcon :icon="icon.faHome"/></i>
        <span slot="title">
          {{ $t('dashboard') }}
        </span>
      </el-menu-item>
      <el-submenu index="/dashboard">
        <template slot="title">
          <i class="el-icon-"><FontAwesomeIcon :icon="icon.faUserAlt"/></i>
          <span>
            {{ $t('dashboard-menu.profile') }}
          </span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :router="true"
            index="/dashboard/profile/settings"
          >
            <span>
              {{ $t('dashboard-menu.settings') }}
            </span>
          </el-menu-item>
          <el-menu-item index="/dashboard/profile/api">
            <span>
              {{ $t('dashboard-menu.api') }}
            </span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/dashboard/gifs">
        <template slot="title">
          <i class="el-icon-"><FontAwesomeIcon :icon="icon.faImages"/></i>
          <span>
            {{ $t('dashboard-menu.gifs') }}
          </span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/dashboard/gifs/loop">
            <span>
              {{ $t('dashboard-menu.loop') }}
            </span>
          </el-menu-item>
          <el-menu-item index="/dashboard/gifs/collection">
            <span>
              {{ $t('dashboard-menu.collection') }}
            </span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faHome, faUserAlt, faImages } from '@fortawesome/fontawesome-free-solid';


export default {
  name: 'DashboardNav',
  components: {
    FontAwesomeIcon,
  },
  computed: {
    icon() {
      return {
        faHome,
        faUserAlt,
        faImages,
      };
    },
  },
};
</script>

<style scoped lang="scss">
</style>
