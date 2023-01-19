<template>
  <div class="container-fluid p-0" style="background-color: #fff">
    <div class="col-12" style="padding-top: 50px">
      <div class="pt-3 pl-2 pr-3 pb-0">
        <h3 class="mt-3">{{tlt('setup_page_header')}}</h3>
        <hr style="margin-top: 0.4rem; margin-bottom: 0.4rem" />
      </div>
    </div>
    <div class="col-12 d-flex mb-3 p-0">
      <div
        class="col-2"
        id="step-headers"
        style="
          background-color: #f6f9ff;
          border-radius: 0px 25px 25px 0px;
          padding-left: 25px;
        "
      >
        <h6 id="1" class="mb-3 step-head active" style="margin-top: 80px">
          {{tlt('web_framework_step_one')}}
        </h6>
        <h6 id="2" class="mb-3 step-head" style="margin-top: 60px">{{tlt('settings_step_two')}}</h6>
        <h6 id="3" class="mb-3 step-head" style="margin-top: 60px">
          {{tlt('bot_config_step_three')}}
        </h6>
        <h6 id="4" class="mb-3 step-head" style="margin-top: 60px">
          {{tlt('check_bot_resp_step_four')}}
        </h6>
        <h6 id="5" class="mb-3 step-head" style="margin-top: 60px">
          {{tlt('bot_deployment_step_five')}}
        </h6>
      </div>
      <div
        class="col-10"
        style="
          min-height: 500px;
          margin-left: -30px;
        "
        :style="(current_step==2)? 'padding: 7px 0px 30px 0px;': 'padding: 40px 0px 30px 0px;'"
      >
        <!-- <span>Shopify Settings</span> -->
        <h3 style="display:flex;justify-content:center" v-if="website_name == 'Shopify' && current_step==2">{{tlt('shopify_setting_label')}}</h3>
        <h3 style="display:flex;justify-content:center" v-if="website_name == 'Woocommerce' && current_step==2">{{tlt('woocommerce_setting_label')}}</h3>
        <h3 style="display:flex;justify-content:center" v-if="website_name == 'Magento' && current_step==2">{{tlt('magento_setting_label')}}</h3>
        <h3 style="display:flex;justify-content:center" v-if="website_name == 'Bigcommerce' && current_step==2">{{tlt('bigcommerce_setting_label')}}</h3>
        <div v-if="current_step==5" style="position: absolute;z-index: 1;right: 10px;top: 10px;">
          <p>
            For more details, please visit our
              <a target="_blank" :href="retail_video_link()">{{website_name}} playlist</a>
          </p>
        </div>
        <div
          class="col-12 d-flex p-0"
          style="
            width: 100%;
            border: 1px solid #dbdbdb;
            border-radius: 9px;
            background-color: #fff;
          "
        >
          <div class="col-1 p-0" style="margin-left: -20px; margin-right: 20px">
            <ul
              id="progressbar"
              class="text-center"
              style="padding-top: 30px; padding-bottom: 25px"
            >
              <li id="1" class="active step0">
                <span class="number" style="top: 42px; right: 18px">1</span>
              </li>
              <li id="2" class="step0">
                <span class="number" style="top: 120px; right: 18px">2</span>
              </li>
              <li id="3" class="step0">
                <span class="number" style="top: 198px; right: 18px">3</span>
              </li>
              <li id="4" class="step0">
                <span class="number" style="top: 275px; right: 18px">4</span>
              </li>
              <li id="5" class="step0">
                <span class="number" style="top: 354px; right: 18px">5</span>
              </li>
            </ul>
          </div>
          <div id="" class="col-11 p-0">
            <div
              id="1"
              class="card2 show start"
              style="height: 100%; width: 100%"
            >
              <div class="setup_div">
                <div class="col-sm-12">
                  <h4
                    class="mb-sm-0 pt-4 pb-2"
                    style="font-size: 18px; font-weight: 500; line-height: 24px"
                  >
                    {{tlt('retail_framework_header')}}
                  </h4>
                </div>
                <div class="card-body pt-0" style="height: 50%">
                  <div class="table-box">
                    <div class="table-responsive container">
                      <div class="row">
                        <div class="col-sm-3 mt-3 mb-1">
                          <div
                            class="card border-0 card-click"
                            @click="(is_completed == null || website_name == 'Shopify') ? (website_name = 'Shopify', check_name = 'Shopify', update_status(2)) : check_name = 'Shopify'"
                            style="
                              border-radius: 12px;
                            "
                            :style="(is_completed != null &&
                            website_name != 'Shopify') ? 'border: 1px solid #ccc; background-color: #f4f4f4; margin-bottom: 10px;' : ''"
                          >
                            <a
                              href="javascript:void(0)"
                              class="mx-auto"
                              data-toggle="modal"
                              data-target="#widget_code_modal"
                              :style="(is_completed != null &&
                              website_name != 'Shopify') ? 'cursor: not-allowed' : '' "
                              :title="(is_completed != null &&
                              website_name != 'Shopify') ? website_name + ' Training In-Progress':''"
                            >
                              <img
                                :src="
                                  require('@/portal/assets/img/shopify-logo.png')
                                "
                                class="third-party-logo"
                                style="height: 100px !important"
                              />
                            </a>
                          </div>
                        </div>
                        <div class="col-sm-3 mt-3 mb-1">
                          <div
                            class="card border-0 card-click"
                            @click="(is_completed == null || website_name == 'Woocommerce') ? (website_name = 'Woocommerce', check_name = 'Woocommerce', update_status(2)) : check_name = 'Woocommerce'"
                            style="
                              border-radius: 12px;
                            "
                            :style="(is_completed != null &&
                            website_name != 'Woocommerce') ? 'border: 1px solid #ccc; background-color: #f4f4f4; margin-bottom: 10px;' : ''"
                          >
                            <a
                              href="javascript:void(0)"
                              class="mx-auto"
                              data-toggle="modal"
                              data-target="#widget_code_modal"
                              :style="(is_completed != null &&
                              website_name != 'Woocommerce') ? 'cursor: not-allowed' : '' "
                              :title="(is_completed != null &&
                              website_name != 'Woocommerce') ? website_name + ' Training In-Progress':''"
                            >
                              <img
                                :src="
                                  require('@/portal/assets/img/woocommerce-logo.png')
                                "
                                class="third-party-logo"
                                style="height: 100px !important"
                              />
                            </a>
                          </div>
                        </div>
                        <div class="col-sm-3 mt-3 mb-1">
                          <div
                            class="card border-0 card-click"
                            @click="(is_completed == null || website_name == 'Magento') ? (website_name = 'Magento', check_name = 'Magento', update_status(2)) : check_name = 'Magento'"
                            style="
                              border-radius: 12px;
                            "
                            :style="(is_completed != null &&
                            website_name != 'Magento') ? 'border: 1px solid #ccc; background-color: #f4f4f4; margin-bottom: 10px;' : ''"
                          >
                            <a
                              href="javascript:void(0)"
                              class="mx-auto"
                              data-toggle="modal"
                              data-target="#widget_code_modal"
                              :style="(is_completed != null &&
                              website_name != 'Magento') ? 'cursor: not-allowed' : '' "
                              :title="(is_completed != null &&
                              website_name != 'Magento') ? website_name + ' Training In-Progress':''"
                            >
                              <img
                                :src="
                                  require('@/portal/assets/img/magento-logo.png')
                                "
                                class="third-party-logo"
                                style="height: 100px !important"
                              />
                            </a>
                          </div>
                        </div>
                        <div class="col-sm-3 mt-3 mb-1">
                            <div
                              class="card border-0 card-click"
                              @click="(is_completed == null || website_name == 'Bigcommerce') ? (website_name = 'Bigcommerce', check_name = 'Bigcommerce', update_status(2)) : check_name = 'Bigcommerce'"
                              style="
                                border-radius: 12px;
                              "
                              :style="(is_completed != null &&
                              website_name != 'Bigcommerce') ? 'border: 1px solid #ccc; background-color: #f4f4f4; margin-bottom: 10px;' : ''"
                            >
                              <a
                                href="javascript:void(0)"
                                class="mx-auto"
                                data-toggle="modal"
                                data-target="#widget_code_modal"
                                :style="(is_completed != null &&
                                website_name != 'Bigcommerce') ? 'cursor: not-allowed' : '' "
                                :title="(is_completed != null &&
                                website_name != 'Bigcommerce') ? website_name + ' Training In-Progress':''"
                              >
                                <img
                                  :src="
                                    require('@/portal/assets/img/bigcommerce-logo.png')
                                  "
                                  class="third-party-logo"
                                  style="height: 100px !important"
                                />
                              </a>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                 <div class="col-sm-12">
                  <h4
                    class="mb-sm-0 pt-4 pb-2"
                    style="font-size: 18px; font-weight: 500; line-height: 24px"
                  >
                    {{tlt('setup_chatbo_lang')}}
                  </h4>
                </div>
                <div class="card-body pt-0 pl-2">
                  <div class="custom-box box-animation pt-2 px-2" style="padding-right: 0.2rem !important;">
                    <div class="col-sm-3 pr-0" style="">
                      <div class="form-group" style="">
                        <div class="form-group mb-0">
                          <multiselect
                            v-model="language_code"
                            :options="country_list"
                            :searchable="true"
                            :close-on-select="true"
                            :taggable="false"
                            :multiple="false"
                            :placeholder="tlt('Country')"
                            :max-height="200"
                            track-by="display_name"
                            label="display_name"
                            :allow-empty="false"
                            @input="save_language_chatbot()"
                          >
                          </multiselect>
                        </div>
                      </div>
                      <div class="col-sm-12 pr-2" style="text-align:right">
                        <div class="card-act" style="text-align: end; padding-top: 9px;">
                          <button
                            type="submit"
                            class="darkblue-btn mt-0"
                            id="widget_title_save_id"
                          >
                          Save
                          </button>
                        </div>
                      </div>  
                    </div>
                  </div> 
                </div>
              </div>
            </div>
            <div id="2" class="card2">
              <div class="setup_div">
                <div
                  v-if="website_name == 'Shopify'"
                  style="padding: 0px 130px 0px"
                >
                  <shopify-details
                    @shopify_sync_status="sync_status"
                    :from_setup="this.from_setup"
                  ></shopify-details>
                </div>
                <div
                  v-if="website_name == 'Woocommerce'"
                  style="padding: 0px 130px 0px"
                >
                  <woocommerce-details
                    @woocommerce_sync_status="sync_status"
                    :from_setup="this.from_setup"
                  ></woocommerce-details>
                </div>
                <div
                  v-if="website_name == 'Magento'"
                  style="padding: 0px 130px 0px"
                >
                  <magento-details
                    @magento_sync_status="sync_status"
                    :from_setup="this.from_setup"
                  ></magento-details>
                </div>
                <div
                  v-if="website_name == 'Bigcommerce'"
                  style="padding: 0px 130px 0px"
                >
                  <bigcommerce-details
                    @bigcommerce_sync_status="sync_status"
                    :from_setup="this.from_setup"
                  ></bigcommerce-details>
                </div>
              </div>
              <div class="d-flex next_prev">
                <div class="col-6" style="text-align: -webkit-right">
                  <button class="darkblue-btn prev" id="back">{{tlt('setup_prev1')}}</button>
                </div>
                <div class="col-6">
                  <button
                    id="credentialformNext"
                    class="darkblue-btn next-button"
                    disabled
                    @click="update_status(3)"
                  >
                    {{tlt('setup_next1')}}
                  </button>
                </div>
              </div>
            </div>
            <div id="3" class="card2">
              <div class="setup_div">
                <bot-configuration
                  :from_setup="this.from_setup"
                ></bot-configuration>
              </div>
              <div class="d-flex next_prev">
                <div class="col-6" style="text-align: -webkit-right">
                  <button class="darkblue-btn prev" id="back">{{tlt('setup_prev2')}}</button>
                </div>
                <div class="col-6">
                  <button
                    class="darkblue-btn next-button"
                    @click="update_status(4)"
                  >
                    {{tlt('setup_next2')}}
                  </button>
                </div>
              </div>
            </div>
            <div id="4" class="card2" style="overflow: hidden">
              <div class="setup_div">
                <template v-if="current_slide_num">
                <template v-if="current_step==4">
                <response-bot
                  style="
                    padding-top: 50px;
                    top: -75px;
                    right: 30%;
                    position: relative;
                  "
                  :isCalledFromSetup="true"
                ></response-bot>
                </template>
              </template>
              </div>
              <div class="d-flex next_prev">
                <div class="col-6" style="text-align: -webkit-right">
                  <button class="darkblue-btn prev" id="back">{{tlt('setup_prev3')}}</button>
                </div>
                <div class="col-6">
                  <button
                    class="darkblue-btn next-button"
                    @click="update_status(5)"
                  >
                    {{tlt('setup_next3')}}
                  </button>
                </div>
              </div>
            </div>
            <div id="5" class="card2" style="overflow: hidden; min-height: 100px;">
              <div class="setup_div">
                <template v-if="current_step==5">
                  <detail-guides
                    :website_name="website_name"
                    style="padding: 20px 0 20px 25px;"
                  ></detail-guides>
                </template>
              </div>
              <div class="d-flex next_prev">
                <div class="col-6" style="text-align: -webkit-right">
                  <button class="darkblue-btn prev" id="back">{{tlt('setup_prev4')}}</button>
                </div>
                <div class="col-6">
                  <button class="darkblue-btn" @click="update_status(6)">
                    {{tlt('setup_finish')}}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WebFrameworks from "../Integrations/WebFrameworks.vue";
import ShopifyDetails from "../Integrations/Components/ShopifyDetails.vue";
import WoocommerceDetails from "../Integrations/Components/WoocommerceDetails.vue";
import MagentoDetails from "../Integrations/Components/MagentoDetails.vue";
import BigcommerceDetails from "../Integrations/Components/BigcommerceDetails.vue";
import BotConfiguration from "../BotOutput/BotConfiguration.vue";
import ResponseBot from "../Data Inputs/ResponseBot.vue";
import DetailGuides from "../Integrations/Components/DetailGuides.vue";
import axios from "axios";
import api_calls from "@/portal/api_calls";
import Multiselect from "vue-multiselect";
import swal from "sweetalert2";

export default {
  components: {
    WebFrameworks,
    ShopifyDetails,
    WoocommerceDetails,
    MagentoDetails,
    BigcommerceDetails,
    BotConfiguration,
    ResponseBot,
    DetailGuides,
    Multiselect
  },
  data() {
    return {
      on_step: "",
      website_name: "",
      all_steps_done: false,
      is_completed: null,
      check_name: "",
      playlist_link: "https://www.youtube.com/channel/UC408bJ6Uubesmx2ddefOThg",
      // sync_status: "",
      from_setup: true,
      current_slide_num: false,
      current_step: 1,
      language_code:null,
      country_list: [
        {
          display_name: "🇺🇸 English",
          value: "en",
          lang: "english"
        },
        {
          display_name: "🇮🇳 Hindi",
          value: "hi",
          lang : "hindi"
        },
        // {
        //   display_name: "🇪🇸 Spanish",
        //   value: "es",
        //   lang: "spanish"
        // },
        {
          display_name: "🇵🇹 Portuguese",
          value: "pt",
          lang : "portuguese"
        }
      ],
    };
  },
  watch: {
    on_step() {
      // this.on_step = on_step;
      // console.log(this.on_step);
    },
  },
  created() {
    axios
      .post(
        api_calls.setup_status(),
        {
          company_name: this.$session.get("UserInformation").company_name,
          company_id: this.$session.get("UserInformation").company_id,
          update: false,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        }
      )
      .then((response) => {
        if (response.data.message.MSG_CODE == this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
          if (response.data.data.is_completed == false) {
            this.on_step = response.data.data.current_step;
            this.website_name = response.data.data.website_name;
            if (this.on_step > 1) {
              var current_fs, next_fs;
              var current_slide_num;
              next_fs = $(".start");

              for (var i = 1; i < this.on_step; i++) {
                this.current_step +=1;
                current_fs = $(next_fs);
                next_fs = $(next_fs).next();

                if (next_fs[0].id == "4") {
                  current_slide_num = true;
                  this.current_slide_num = current_slide_num;
                }

                $(current_fs).removeClass("show");
                $(next_fs).addClass("show");

                $("#progressbar li")
                  .eq($(".card2").index(next_fs))
                  .addClass("active");

                $("#step-headers h6")
                  .eq($(".card2").index(next_fs))
                  .addClass("active");
                $("#step-headers h6")
                  .eq($(".card2").index(current_fs))
                  .removeClass("active");
              }
            }
          } else {
            this.on_step = 2;
          }
        } else if(response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE) {
          // Swal({
          //   title: response.data.message.MSG_CODE,
          //   text: response.data.message.MSG,
          //   showCancelButton: false,
          //   showConfirmButton: false,
          //   type: "error"
          // })
        } else {
          Swal({
            title: response.data.message.MSG_CODE,
            text: response.data.message.MSG,
            showCancelButton: false,
            showConfirmButton: false,
            type: "error"
          })
        }
      })
      .catch((e) => {
        if (
          e.response.status === 410 ||
          e.response.status === 440 ||
          e.response.status === 409
        ) {
          this.$root.$emit("Session_Expired", e.response.data);
        }
      });
  },

  mounted() {
    const vm = this;
    var current_fs, next_fs, previous_fs;

    $(".step-head").click(function () {
      vm.goto(this.id);
    });

    $(".card-click").click(function () {
      if ((vm.is_completed == null || vm.check_name == vm.website_name)&& vm.language_code != null) {
        current_fs = $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent();
        next_fs = $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .next();

        $(current_fs).removeClass("show");
        $(next_fs).addClass("show");

        $("#progressbar li").eq($(".card2").index(next_fs)).addClass("active");

        $("#step-headers h6").eq($(".card2").index(next_fs)).addClass("active");
        $("#step-headers h6")
          .eq($(".card2").index(current_fs))
          .removeClass("active");
      }
    });

    // Next button

    $(".next-button").click(function () {
      $("#setup_div").scrollTop(0);
      current_fs = $(this).parent().parent().parent();
      next_fs = $(this).parent().parent().parent().next();

      if (next_fs[0].id == "4") {
        vm.current_slide_num = true;
      }
      $(current_fs).removeClass("show");
      $(next_fs).addClass("show");

      $("#progressbar li").eq($(".card2").index(next_fs)).addClass("active");

      $("#step-headers h6").eq($(".card2").index(next_fs)).addClass("active");
      $("#step-headers h6")
        .eq($(".card2").index(current_fs))
        .removeClass("active");
    });

    // Previous button
    $(".prev").click(function () {
      $("#setup_div").scrollTop(0);
      current_fs = $(this).parent().parent().parent();
      previous_fs = $(this).parent().parent().parent().prev();

      $(current_fs).removeClass("show");
      $(previous_fs).addClass("show");
      vm.current_step = previous_fs[0].id;
      if (previous_fs[0].id == "3") {
        vm.current_slide_num = false;
      }

      $("#step-headers h6")
        .eq($(".card2").index(previous_fs))
        .addClass("active");
      $("#step-headers h6")
        .eq($(".card2").index(current_fs))
        .removeClass("active");

      // $("#progressbar li")
      //   .eq($(".card2").index(current_fs))
      //   .removeClass("active");
    });
    this.$root.$emit("setup_page_botdeployment", true);
  },
  methods: {
    retail_video_link(){
      if(this.website_name == 'Woocommerce'){
        this.playlist_link = "https://www.youtube.com/watch?v=l1EMTezdISM&list=PLRsio0E079o3cyn_7TiI3nZznb5hnQFeX";
      }
      else if(this.website_name == 'Shopify'){
        this.playlist_link = "https://www.youtube.com/watch?v=p_TYirvZXgI&list=PLRsio0E079o3fDhspLdtOM77FiSR5pSFU";
      }
      else if(this.website_name == 'Magento'){
        this.playlist_link = "https://www.youtube.com/watch?v=uMurdHvH6Nk";
      }
      return this.playlist_link;
    },
    goto(val) {
      this.current_step = val;
      $(".step-head active");
      if (val <= this.on_step) {
        $(".step-head").removeClass("active");
        var x = $(".step-head");
        var y = x[val - 1];
        y.className = "step-head active";
        var temp = $(".card2").removeClass("show");
        var temp2 = temp[val - 1];
        temp2.className = "card2 show";
        $(".next-button").css({ display: "block" });

        if (val == 4) {
          this.current_slide_num = true;
        } else {
          this.current_slide_num = false;
        }
      }else{
        this.current_step = this.on_step;
      }
    },
    sync_status(framework_sync_status) {
      this.is_completed = framework_sync_status;
      if (this.is_completed != "Sync Finished") {
        document.getElementById("credentialformNext").disabled = true;
      } else {
        document.getElementById("credentialformNext").disabled = false;
      }
    },
    update_status(num) {
      this.current_step = num;
      // if (num < 6 && this.all_steps_done == false) {
      if (num < 6) {
        // if (num == 5) {
        //   this.all_steps_done = true;
        // }
        axios
          .post(
            api_calls.setup_status(),
            {
              company_name: this.$session.get("UserInformation").company_name,
              company_id: this.$session.get("UserInformation").company_id,
              update: true,
              current_step: num,
              is_completed: false,
              website_name: this.website_name,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            if (response.data.message.MSG_CODE == this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
              if (response.data.data.is_completed == false) {
                this.on_step = response.data.data.current_step;
              } 
            } else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error"
              })
            }
          })
          .catch((e) => {
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              this.$root.$emit("Session_Expired", e.response.data);
            }
          });
      }
      if (num == 6) {
        axios
          .post(
            api_calls.setup_status(),
            {
              company_name: this.$session.get("UserInformation").company_name,
              company_id: this.$session.get("UserInformation").company_id,
              update: true,
              current_step: num,
              is_completed: true,
              website_name: this.website_name,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.$router.go();
          })
          .catch((e) => {
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              this.$root.$emit("Session_Expired", e.response.data);
            }
          });
      }
    },
    save_language_chatbot(){
      if(this.language_code == null){
         swal({
          text: "Please select language",
          type: "warning",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000
        });
        return
      }
      let language = this.language_code.lang;
      let lang_code = this.language_code.value;
      axios.
        post(
          api_calls.portal_language_data(),
          {
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
            email: this.$session.get("UserInformation").email,
            token: this.$session.get("UserInformation").tokens,
            license_key: this.$session.get("UserInformation").license_key,
            chatbot_language_code:lang_code,
            chatbot_language: language,
            save_chatbot_language: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if(response.data.message.MSG_CODE == this.api_status_code.LANGUAGE_UPDATED.MSG_CODE){
            swal({
              text: "Bot Language Update Successfully",
              type: "success",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });
            let userinfo = this.$session.get("UserInformation");
            userinfo["is_set_default_language"] = false;
            userinfo["chatbot_language"] = language;
            userinfo["chatbot_language_code"] = lang_code;
            this.$session.set("UserInformation", userinfo); 
          }else if(response.data.message.MSG_CODE == this.api_status_code.UNSUCCESSFUL_DB_OPERATION.MSG_CODE){
             swal({
              text: "Unable to update Bot Language",
              type: "error",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });
          }else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error"
            })
          }
        })
        .catch((e) => {
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    }
  },
};
</script>
<style scoped>
.setup_div {
  overflow-y: auto;
  height: 530px;
  /* width: 235px; */
  overflow-x: hidden;
  margin-left: 0%;
  min-width: 0px;
  min-height: 0px;
}
.setup_div::-webkit-scrollbar {
    max-height: 10px;
    width: 7px;
    height: 7px;
    border-radius: 10px;
    overflow-x: hidden;
}
.setup_div::-webkit-scrollbar {
    max-height: 10px;
    width: 7px;
    height: 7px;
    border-radius: 10px;
    overflow-x: hidden;
}
.setup_div::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}
.setup_div::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 10px;
}
.setup_div::-webkit-scrollbar-thumb:hover {
    background: #555;
    border-radius: 10px;
}
h3 {
  font: 600 22px/25px Poppins, sans-serif;
  color: #273679;
}
h6 {
  font: 500 12px Poppins, sans-serif;
  color: #8d8d8d;
}
.card {
  box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 9px;
}
.card:hover {
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 9px;
}
.card0 {
  z-index: 0;
}

.card00 {
  z-index: 0;
}

.card2 {
  display: none;
}

.card2.show {
  display: block;
  /* overflow: auto; */
  /* height: 400px; */
  left: 20px;
}

.step-head.active {
  color: #273679;
}
.step-head {
  cursor: pointer;
}

#credentialformNext:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.next-button {
  /* width: 25%; */
  color: #fff;
  display: block;
  cursor: pointer;
  /* border-radius: 6px;
  padding: 10px;
  cursor: pointer; */
}

.next-button:hover {
  color: #220650;
}

#progressbar {
  position: absolute;
  overflow: hidden;
  color: #fff;
}

#progressbar li {
  list-style-type: none;
  font-size: 8px;
  font-weight: 400;
  margin-bottom: 38px;
}

.number {
  position: absolute;
  color: #fff;
  font: 500 12px Poppins, sans-serif;
}

#progressbar li:before .number {
  position: absolute;
  color: #220650;
  font: 500 12px Poppins, sans-serif;
}

#progressbar .step0:before {
  content: "";
  color: #fff;
}

#progressbar li:before {
  width: 40px;
  height: 40px;
  line-height: 30px;
  display: block;
  font-size: 20px;
  background: #fff;
  border: 2px solid grey;
  border-radius: 50%;
  margin: auto;
}

#progressbar li.active:before {
  background: #273679;
  font-family: FontAwesome;
  content: "";
}
.prev {
  display: block;
  cursor: pointer;
}
.next_prev{
  padding: 10px 0px !important;
  bottom: -26 !important;
  position: absolute !important;
  width: 100% !important;
}

@media screen and (max-width: 912px) {
  .card00 {
    padding-top: 30px;
  }

  .card2 {
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 25px;
  }

  #progressbar {
    left: -25px;
  }
}
</style>
