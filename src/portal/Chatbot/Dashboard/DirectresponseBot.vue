<template>
  <div style="overflow: hidden">
    <response-bot v-bind:isTextToBot="false"></response-bot>
  </div>
</template>

<script>
import ResponseBot from "./Data Inputs/ResponseBot";
export default {
  components: {
    ResponseBot,
  },
  created() {
    let route_params = this.$route.params;
    if (route_params.reload === true) {
      this.$router.go();
    }
  },
  mounted() {
    $(".dash-cont").css("margin-left", "0px");
    $(".chat-wrap").css("margin-top", "");
  },
};
</script>

<style scoped>
.chat-wrap.chat-wrap1 {
  margin-right: 0% !important;
}
tr > td,
tr > th {
  padding: 10px;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}
</style>
