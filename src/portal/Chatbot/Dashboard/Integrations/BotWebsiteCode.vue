<template>
  <div>
    <div
      class="card-header d-block d-sm-flex flex-wrap justify-content-between pb-0"
    >
      <div class="col-sm-12">
        <h4 class="mb-sm-0">{{tlt('bot_code_heading')}}</h4>
          {{tlt('steps_to_add_label')}}
      </div>
    </div>
    <!-- Copy the code below -->
    <div class="col-sm-12">
      <div class="row m-0 p-0">
        <div class="col-sm-12 pt-0">
            
          <ol>
          <div class="form-group mb-2">
              <li>{{tlt('copy_the_code_label')}}</li>
            <textarea
              class="form-control"
              v-model="widget_code"
              rows="4"
              ref="widget_textarea"
              readonly
              style="padding-left: 1em"
            ></textarea>
          </div>
          <div class="btn-wrap text-left mt-0 pt-0 pb-3">
            <button
              type="click"
              class="darkblue-btn ml-0"
              id="copy_code_tooltip"
              data-toggle="tooltip"
              data-placement="top"
              title="Copied to clipboard!"
              @click="copy_widget_code"
            >
              {{tlt('copy_btn')}}
            </button>
            
          </div>
          <li>{{tlt('body_tags_text')}}</li>
            </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BotWebsiteCode",
  data() {
    return {
      widget_code: "",
    };
  },
  mounted() {
    this.initialize_tooltips();
    this.widget_code = `<link href="${
      process.env.VUE_APP_WIDGET_UI_BASE_URL
    }css/app.css" rel="stylesheet"> <bot-chat></bot-chat> <script src="${
      process.env.VUE_APP_WIDGET_UI_BASE_URL
    }js/app.js"><\/script> <script>var widget=GenerateWidget({source:'Web',license_key:'${
      this.$session.get("UserInformation").license_key
    }'})
    <\/script>`.toString();
  },
  methods: {
    copy_widget_code() {
      this.$refs.widget_textarea.select();
      document.execCommand("copy");
      $("#copy_code_tooltip").tooltip("show");
      setTimeout(() => {
        $("#copy_code_tooltip").tooltip("dispose");
        this.initialize_tooltips();
      }, 5000);
    },
    initialize_tooltips() {
      $('[data-tooltip="tooltip"]').tooltip({
        trigger: "manual",
      });
    },
  },
};
</script>

<style>
</style>