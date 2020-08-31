<template>
  <div class="toast-popup" :class="showClassToast">
    <i class="fas fa-exclamation-circle"></i>{{ message }}
  </div>
</template>

<script>
import bus from '@/utils/bus';
let toastTimer;

export default {
  data() {
    return {
      message: '',
      isOpen: false
    };
  },
  computed: {
    showClassToast() {
      return this.isOpen ? 'show' : null;
    }
  },
  methods: {
    showToast(message) {
      this.isOpen = true;
      this.message = message;
      clearTimeout(toastTimer);
      toastTimer = setTimeout(this.hideToast, 3000);
    },
    hideToast() {
      this.isOpen = false;
    }
  },
  created() {
    bus.$on('show:toast', this.showToast);
  },
  beforeDestroy() {
    bus.$off('show:toast', this.showToast);
  }
};
</script>

<style></style>
