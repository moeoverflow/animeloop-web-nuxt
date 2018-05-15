<template>
  <div class="FormNotification">
    <div
      v-show="isShow"
      :class="type"
      class="message">
      <div class="message-header">
        <p>{{ $t(content) }}</p>
        <button
          class="delete"
          aria-label="delete"
          @click="close"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormNotification',
  props: {
    type: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
  },
  computed: {
    isShow() {
      return !(this.type === '');
    },
  },
  methods: {
    close() {
      this.type = '';
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~bulma/sass/utilities/_all";
  @import "~bulma/sass/components/message";

  .message-header {
    border-radius: 4px;
    margin-bottom: 1rem;
  }
</style>
