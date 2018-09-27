<template>
  <div class="DashboardNav">
    <el-menu
      :router="true"
      default-active="2"
      class="el-menu-vertical-demo"
    >
      <el-menu-item index="/dashboard">
        <i class="el-icon-"><FontAwesomeIcon icon="home"/></i>
        <span slot="title">
          {{ $t('dashboard') }}
        </span>
      </el-menu-item>
      <el-submenu index="/dashboard">
        <template slot="title">
          <i class="el-icon-"><FontAwesomeIcon icon="user-alt"/></i>
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
          <i class="el-icon-"><FontAwesomeIcon icon="images"/></i>
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
export default {
  name: 'DashboardNav',
  components: {
  },
  computed: {
  },
};
</script>

<style scoped lang="scss">
</style>
