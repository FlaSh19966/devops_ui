<template>
  <div class="container-fluid pl-0 pr-0" style="min-height: 520px" id="conference_layout">
    <!-- <top-navbar></top-navbar> -->
      <router-view></router-view>
    <!-- <custom-footer></custom-footer> -->
  </div>
</template>

<script>
// import TopNavbar from './TopNavbar.vue';
// import CustomFooter from './CustomFooter.vue';

export default {
//   components: {
//     TopNavbar,
//     CustomFooter,
//   },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/style.scss";
</style>
