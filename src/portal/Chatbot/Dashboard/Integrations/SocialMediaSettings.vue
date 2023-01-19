<template>
  <div class="">
    <div class="spinner" id="spinner" v-show="big_spinner"></div>
    <!-- <div class="container-fluid"> -->
      <!-- <div class="card dash-card"> -->
        <div
          class="card-header d-block d-sm-flex flex-wrap justify-content-between"
        >
          <div class="col-sm-12">
            <h4 class="mb-sm-0">{{tlt('social_media_setting_header')}}</h4>
          </div>
        </div>
        <!-- <div class="card-body"> -->
        <div>
          <div class="table-box">
            <div class="table-responsive">
              <div
                class=""
                id="social_media_settings"
                role="tabpanel"
                aria-labelledby="social_media_settings-tab"
              >
                <div class="col-sm-12">
                  <!-- <h5 class="mb-sm-0" style="margin-left: 10px">
                  Social Media Settings
                </h5> -->
                </div>
                <div class="col-sm-12 d-flex">
                  <div class="col-sm-6" style="border-right: solid 1px #eaeaea">
                    <br />
                    <div>
                      <!-- <label style="font-weight: 500;"
                    >Facebook</label
                  > -->
                      <h5 class="mb-sm-6">{{tlt('facebook_header')}}</h5>
                      <div class="form-group">
                        <form @submit="configure_social_media('facebook')">
                          <div class="form-group">
                            <label>{{tlt('url_label')}}</label>
                            <input
                              v-model="facebook_details.url"
                              type="text"
                              class="form-control"
                              :placeholder="tlt('enter_url_label')"
                              style="width: 90%; padding: 5px"
                            />
                            <label style="margin-top: 4%">{{tlt('quote_label')}}</label>
                            <input
                              v-model="facebook_details.quote"
                              type="text"
                              class="form-control"
                              :placeholder="tlt('enter_quote')"
                              style="padding: 5px; width: 90%"
                            />
                            <label style="margin-top: 4%">{{tlt('hashtag_label')}}</label>
                            <tags-input
                              v-model="facebook_details.hash_tag"
                              wrapper-class="form-control"
                              style="width: 90% !important"
                            ></tags-input>
                          </div>
                          <button
                            type="submit"
                            style="
                              width: 100px;
                              height: 35px;
                              text-align: center;
                              font-size: 13px;
                              font-weight: bold;
                              background: #273679;
                              border: solid 1px #273679;
                              cursor: pointer;
                              border-radius: 4px;
                              color: #fff;
                            "
                          >
                            {{tlt('sm_facebook_save_btn')}}
                          </button>
                        </form>
                      </div>
                    </div>
                    <hr />
                    <div>
                      <!-- <label style="font-weight: 500;"
                    >Twitter</label
                  > -->
                      <h5 class="mb-sm-6">{{tlt('twitter_header')}}</h5>
                      <div class="form-group">
                        <form @submit="configure_social_media('twitter')">
                          <div class="form-group">
                            <label>{{tlt('twitter_url_label')}}</label>
                            <input
                              v-model="twitter_details.url"
                              type="text"
                              class="form-control"
                              :placeholder="tlt('enter_url_label')"
                              style="width: 90%; padding: 5px"
                            />
                            <label style="margin-top: 4%">{{tlt('twitter_description_label')}}</label>
                            <input
                              v-model="twitter_details.description"
                              type="text"
                              class="form-control"
                              :placeholder="tlt('enter_description')"
                              style="padding: 5px; width: 90%"
                            />
                            <label style="margin-top: 4%">{{tlt('twitter_hashtag_label')}}</label>
                            <tags-input
                              v-model="twitter_details.hash_tag"
                              wrapper-class="form-control"
                              style="width: 90% !important"
                            ></tags-input>
                          </div>
                          <button
                            type="submit"
                            style="
                              width: 100px;
                              height: 35px;
                              text-align: center;
                              font-size: 13px;
                              font-weight: bold;
                              background: #273679;
                              border: solid 1px #273679;
                              cursor: pointer;
                              border-radius: 4px;
                              color: #fff;
                            "
                          >
                            {{tlt('sm_twitter_save_btn')}}
                          </button>
                        </form>
                      </div>
                    </div>

                    <!-- <hr /> -->
                  </div>
                  <div class="col-sm-6">
                    <br />
                    <div>
                      <!-- <label style="font-weight: 500;"
                    >Google</label
                  > -->
                      <h5 class="mb-sm-6">{{tlt('google_header')}}</h5>
                      <div class="form-group">
                        <form @submit="configure_social_media('google')">
                          <div class="form-group">
                            <label>{{tlt('place_id_label')}}</label>
                            <input
                              v-model="google_details.place_id"
                              type="text"
                              class="form-control"
                              :placeholder="tlt('select_place_id')"
                              style="width: 90%; padding: 5px"
                            />
                          </div>
                          <button
                            type="submit"
                            style="
                              width: 100px;
                              height: 35px;
                              text-align: center;
                              font-size: 13px;
                              font-weight: bold;
                              background: #273679;
                              border: solid 1px #273679;
                              cursor: pointer;
                              border-radius: 4px;
                              color: #fff;
                            "
                          >
                            {{tlt('sm_google_save_btn')}}
                          </button>
                        </form>
                      </div>
                      <google-maps
                        :place-id="google_details.place_id"
                        :latlng="{
                          lat: google_details.lat,
                          lng: google_details.lng,
                        }"
                        @place_id_updated="google_place_id_updated"
                      ></google-maps>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import VoerroTagsInput from "@voerro/vue-tagsinput";
import "@voerro/vue-tagsinput/dist/style.css";
import GoogleMaps from "@/portal/components/GoogleMaps";
import axios from "axios";
import swal from "sweetalert2";
import Swal from "sweetalert2";
import { setTimeout } from "timers";
import api_calls from "@/portal/api_calls";

export default {
  name: "SocialMediaSettings",
  components: {
    GoogleMaps,
    "tags-input": VoerroTagsInput,
  },
  data() {
    return {
      big_spinner: false,
      facebook_details: {
        url: "",
        quote: "",
        hash_tag: [],
      },
      twitter_details: {
        url: "",
        hash_tag: [],
      },
      google_details: {
        place_id: "",
        lat: "",
        lng: "",
      },
      companyid: null,
      companyname: null,
      facebook_regex: /((?:http|https):\/\/)?(?:www.)?facebook.com\/?/,
      twitter_regex : /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/
    };
  },
  created() {
    if (this.$session.get("UserInformation").role == "SuperAdmin") {
      this.companyid = this.$session.get("CompanyId");
      this.companyname = this.$session.get("CompanyName");
    } else {
      this.companyid = this.$session.get("UserInformation").company_id;
      this.companyname = this.$session.get("UserInformation").company_name;
    }
    this.get_social_media_settings();
  },
  mounted() {
    this.$on("Place_Id_Updated", (id) => {
      this.google_details.place_id = id;
    });
  },
  methods: {
    reset_values() {
      this.facebook_details = {
        url: "",
        quote: "",
        hash_tag: [],
      };
      this.twitter_details = {
        url: "",
        hash_tag: [],
      };
      this.google_details = {
        place_id: "",
        lat: "",
        lng: "",
      };
    },
    get_social_media_settings() {
      this.big_spinner = true;
      this.reset_values();
      axios
        .post(
          api_calls.social_media_settings_url(),
          {
            get_social_media_settings: true,
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.big_spinner = false;
          if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE.MSG_CODE) {
            if (Object.keys(response.data.data).length) {
              if (Object.keys(response.data.data.Facebook).length > 0) {
                this.facebook_details.url = response.data.data.Facebook.url;
                this.facebook_details.quote = response.data.data.Facebook.quote;
                let hash_tags = response.data.data.Facebook.hash_tag
                  .split(",")
                  .filter((tag) => {
                    return tag !== "";
                  });
                for (var i in hash_tags) {
                  if (hash_tags[i] != undefined) {
                    this.facebook_details.hash_tag.push({
                      key: hash_tags[i],
                      value: hash_tags[i],
                    });
                  }
                }
              }
              if (Object.keys(response.data.data.Twitter).length > 0) {
                this.twitter_details.url = response.data.data.Twitter.url;
                this.twitter_details.description =
                  response.data.data.Twitter.description;
                let hash_tags = response.data.data.Twitter.hash_tag
                  .split(",")
                  .filter((tag) => {
                    return tag !== "";
                  });
                for (var i in hash_tags) {
                  if (hash_tags[i] != undefined) {
                    this.twitter_details.hash_tag.push({
                      key: hash_tags[i],
                      value: hash_tags[i],
                    });
                  }
                }
              }
              if (Object.keys(response.data.data["Google+"]).length > 0) {
                this.google_details = response.data.data["Google+"];
              }
            }
          }else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              timer: 2500,
              type: "error"
            })
          }
        })
        .catch((e) => {
          this.big_spinner = false;
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
          this.get_social_media_settings();
        });
    },
    google_place_id_updated({ placeId, lat, lng }) {
      this.google_details.place_id = placeId;
      this.google_details.lat = lat;
      this.google_details.lng = lng;
    },
    configure_social_media(network) {
      event.preventDefault();
      //var regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi; 
      if (network == "facebook") {
        if (this.facebook_details.url != "" && this.facebook_details.url.match(this.facebook_regex)) {
          let values_string = "";
          for (var i in this.facebook_details.hash_tag) {
            values_string += this.facebook_details.hash_tag[i].value;
            if (i < this.facebook_details.hash_tag.length - 1) {
              values_string += ",";
            }
          }
          this.big_spinner = true;
          axios
            .post(
              api_calls.social_media_settings_url(),
              {
                social_network: "Facebook",
                url: this.facebook_details.url,
                quote: this.facebook_details.quote,
                hash_tag: values_string,
                company_name: this.companyname,
                company_id: this.companyid,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.big_spinner = false;
              if (response.data.message.MSG_CODE === this.api_status_code.SOCIAL_MEDIA_SETTING_ADDED.MSG_CODE) {
                toastr.success(this.tlt('sm_facebook_details_saved_msg'));
                this.get_social_media_settings();
              } else {
                toastr.error(this.tlt('sm_facebook_error_occurred_msg1'));
                this.get_social_media_settings();
              }
            })
            .catch((e) => {
              this.big_spinner = false;
              toastr.error(this.tlt('sm_facebook_error_occurred_msg1'));
              this.get_social_media_settings();
              if (
                e.response.status === 410 ||
                e.response.status === 440 ||
                e.response.status === 409
              ) {
                this.$root.$emit("Session_Expired", e.response.data);
              }
            });
        } else {
          toastr.error(this.tlt('sm_facebook_enter_standard_url_msg'));
        }
      } else if (network == "twitter") {
        if (this.twitter_details.url != "" && this.twitter_details.url.match(this.twitter_regex)) {
          let values_string = "";
          for (var i in this.twitter_details.hash_tag) {
            values_string += this.twitter_details.hash_tag[i].value;
            if (i < this.twitter_details.hash_tag.length - 1) {
              values_string += ",";
            }
          }
          this.big_spinner = true;
          axios
            .post(
              api_calls.social_media_settings_url(),
              {
                social_network: "Twitter",
                url: this.twitter_details.url,
                hash_tag: values_string,
                description: this.twitter_details.description,
                company_name: this.companyname,
                company_id: this.companyid,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.big_spinner = false;
              if (response.data.message.MSG_CODE === this.api_status_code.SOCIAL_MEDIA_SETTING_ADDED.MSG_CODE) {
                toastr.success(this.tlt('sm_twitter_details_saved_msg'));
                this.get_social_media_settings();
              } else {
                toastr.error(this.tlt('sm_facebook_error_occurred_msg1'));
                this.get_social_media_settings();
              }
            })
            .catch((e) => {
              this.big_spinner = false;
              toastr.error(this.tlt('sm_facebook_error_occurred_msg1'));
              this.get_social_media_settings();
              if (
                e.response.status === 410 ||
                e.response.status === 440 ||
                e.response.status === 409
              ) {
                this.$root.$emit("Session_Expired", e.response.data);
              }
            });
        }else {
          toastr.error(this.tlt('sm_twitter_enter_standard_url_msg'));
        }
      } else if (network == "google") {
        if (this.google_details.place_id != "") {
          this.big_spinner = true;
          axios
            .post(
              api_calls.social_media_settings_url(),
              {
                social_network: "Google+",
                place_id: this.google_details.place_id,
                latlng: {
                  lat: this.google_details.lat,
                  lng: this.google_details.lng,
                },
                company_name: this.companyname,
                company_id: this.companyid,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.big_spinner = false;
              if (response.data.message.MSG_CODE === this.api_status_code.SOCIAL_MEDIA_SETTING_ADDED.MSG_CODE) {
                toastr.success(this.tlt('sm_google_details_saved_msg'));
                // setTimeout(() => {
                //   this.$router.go();
                // }, 1500);
                this.get_social_media_settings();
              } else {
                toastr.error(this.tlt('sm_facebook_error_occurred_msg1'));
                this.get_social_media_settings();
              }
            })
            .catch((e) => {
              this.big_spinner = false;
              toastr.error(this.tlt('sm_facebook_error_occurred_msg1'));
              this.get_social_media_settings();
              if (
                e.response.status === 410 ||
                e.response.status === 440 ||
                e.response.status === 409
              ) {
                this.$root.$emit("Session_Expired", e.response.data);
              }
            });
        }
      }
    },
  },
};
</script>