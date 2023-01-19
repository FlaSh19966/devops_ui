<template>
  <div>
    <div class="spinner" id="spinner" v-show="big_spinner"></div>
    <div class="container-fluid" style="padding: 0px !important">
      <div class="card dash-card" v-if="is_non_retail">
        <div>
          <template style="overflow: hidden">
            <bot-website-code></bot-website-code>
          </template>
        </div>
      </div>
      <!-- <div class="card dash-card">
        <div>
          <template style="overflow: hidden">
            <social-media-links />
          </template>
        </div>
      </div> -->
      <div class="card dash-card">
        <div>
          <template style="overflow: hidden">
            <web-frameworks />
          </template>
        </div>
      </div>
      <div class="card dash-card">
        <div>
          <template style="overflow: hidden">
            <messaging-frameworks />
          </template>
        </div>
      </div>
      <!-- <div class="card dash-card">
        <div>
          <template style="overflow: hidden">
            <social-media-settings />
          </template>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import MessagingFrameworks from "./MessagingFrameworks.vue";
// import SocialMediaLinks from "./SocialMediaLinks.vue";
// import SocialMediaSettings from "./SocialMediaSettings.vue";
import WebFrameworks from "./WebFrameworks.vue";
import BotWebsiteCode from "./BotWebsiteCode.vue";
export default {
  name: "IntegrationLayout",
  components: {
    MessagingFrameworks,
    // SocialMediaLinks,
    // SocialMediaSettings,
    WebFrameworks,
    BotWebsiteCode
  },
  data() {
    return {
        big_spinner: false,
    };
  },
  computed : {
    is_non_retail() {
      return this.$session.get("retail_web_framework") == null ? true : false;
    }
  }
};
</script>