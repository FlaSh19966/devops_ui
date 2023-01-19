<template>
  <span>
    <img
      src="@/portal/assets/img/flags/US.png"
      alt=""
      class="ml-1 c-p"
      @click="change_locale_language('en')"
    />
    <!-- <img
      src="@/portal/assets/img/flags/ES.png"
      height="17px"
      width="23px"
      alt=""
      class="ml-1 c-p"
      @click="change_locale_language('es')"
    />
    <img
      src="@/portal/assets/img/flags/PT.png"
      height="17px"
      width="23px"
      alt=""
      class="ml-1 c-p"
      @click="change_locale_language('pt')"
    /> -->
  </span>
</template>

<script>
export default {
  name: "LanguageMaps",
}
</script>

<style scoped>
.c-p {
    cursor: pointer;
}
</style>