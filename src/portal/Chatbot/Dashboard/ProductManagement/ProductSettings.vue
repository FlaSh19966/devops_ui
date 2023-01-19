<template>
  <div>
    <div class="dash-cont">
    <div class="spinner" id="spinner" v-show="big_spinner"></div>
    <div class="container-fluid">
      <div class="card dash-card">
        <div class="table-box">
          <div class="table-responsive mb-0">
              <h4 class="mb-sm-6" style="text-align: center;padding-top: 15px;">
                <!-- {{tlt("store_config_header")}} -->
                {{tlt('store_config_heading')}}
              </h4>
              <hr />
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6" style="border-right: solid 1px #eaeaea">
                  <label
                    class="mb-sm-6 mt-"
                    ><strong>
                      <!-- {{tlt('store_config_limit_upsell_label')}} -->
                      {{tlt('store_config_limit_up_sell_label')}}
                    </strong>
                  </label>
                  <input
                    v-model.number="limit_up_sell"
                    type="number"
                    class="form-control"
                    :placeholder="tlt('enter_value_label')"
                    style="padding: 5px"
                  />
                  <hr style="margin-top: 1.13rem;">
                  <label class="mb-sm-6 mt-2" style="margin-top: 0.4rem !important;"
                    ><strong>
                      <!-- {{tlt('store_config_limit_cross_sell')}} -->
                      {{tlt('store_config_limit_cross_sell_label')}}
                    </strong>
                  </label>
                  <input
                    v-model.number="limit_cross_sell"
                    type="number"
                    class="form-control"
                    :placeholder="tlt('enter_value_label')"
                    style="padding: 5px"
                  />
                  <hr style="margin-top: 2rem" />
                  <label
                    class="mb-sm-6 mt-4"
                    style="margin-top: 0.5rem !important;"
                    ><strong>
                      <!-- {{tlt('store_config_inventory_level')}} -->
                      {{tlt('store_config_inventory_level_label')}}
                    </strong>
                  </label>
                  <label
                    >{{tlt('store_config_inventory_level_text')}}
                    </label
                  >
                  <input
                    v-model.number="inventory_level_notification"
                    type="number"
                    class="form-control"
                    :placeholder="tlt('inventory_limit_no')"
                    style="padding: 5px; margin-bottom: 1rem !important"
                    min="0"
                  />
                  <hr style="margin-top: 1.9rem" />
                  <div>
                  <label
                      class="col-sm-11"
                      style="width: 90%; padding: 0px;margin-top:4px"
                      ><strong>
                        <!-- {{tlt('store_config_allow_guest_users_label')}} -->
                        Order notification 
                      </strong>
                    </label>
                    <label class="switch col-sm-1 m-0">
                      <input
                        type="checkbox"
                        v-model="order_notification"
                        id="email_required_id"
                      />
                      <span
                        class="slider round"
                        style="border-radius: 50px"
                      ></span>
                    </label>
                    <div class="bot-font-style" v-if="order_notification && !is_whatsapp_integrated" style="color: red; font-size: 12px;">
                        *This feature only works if you've integrated whatsapp with Cense AI
                      </div>  
                    <label class="col-sm-11" style="padding:0px">
                      (If this checkbox is on, customers will get automated whatsapp notification regarding their orders.)
                    </label>
                  </div>
                  <hr />
                  <label
                    class="mb-sm-6 mt-4"
                    style="margin-top: 0.3rem !important;"
                    ><strong>
                      <!-- {{tlt('store_config_contact_us_email')}} -->
                      {{tlt('store_config_email_label')}}
                    </strong>
                  </label><br/>
                  <label>
                    ({{tlt('store_config_email_note')}})
                  </label>
                  <input
                    v-model.trim="contact_us_email"
                    type="email"
                    class="form-control"
                    :placeholder="tlt('email_label')"
                    style="padding: 5px; margin-bottom: 1rem !important"
                    required
                  />
                  <div
                    class="is-invalid"
                    style="color: red; padding-bottom: 15px"
                    v-if="validEmail != true && contact_us_email != ''"
                  >
                    {{ validEmail }}
                  </div>
                  <hr style="margin-top: 1.9rem" />
                  <label
                    class="mb-sm-6 mt-4"
                    style="margin-top: 0.3rem !important"
                    ><strong>{{tlt('store_config_phone_no_label')}}</strong> </label
                  ><br />
                  <label>
                    {{tlt('store_config_phone_no_note')}}
                  </label>
                  <vue-phone-number-input
                    v-model="contact_us_phone_number"
                    :no-use-browser-locale="true"
                    @update="phoneNumber = $event"
                  >
                  </vue-phone-number-input>
                  <hr style="margin-top: 1rem" />
                  <label
                    class="mb-sm-6 mt-4"
                    style="margin-top: 0.3rem !important"
                    ><strong>{{tlt('store_config_shipment_url_label')}}</strong>
                  </label>
                  <i
                    aria-hidden="true"
                    title="Enter URL for track shipment and enter tracking_id inside {} as show in
                     example"
                    class="fa fa-info-circle"
                    style="font-size: 16px; margin-left: 5px"
                  ></i>
                  <br />
                  <label>
                    {{tlt('store_config_shipment_url_note')}}
                  </label>
                  <input
                    v-model="tracking_url"
                    type="text"
                    class="form-control"
                    :placeholder="tlt('shiprocket_example')"
                    style="padding: 5px"
                  />
                  <!-- <div
                     class="form-group"
                    style="display: flex; cursor: pointer; margin: 8px 0 12px;"
                    v-for="para in url_parameter"
                    :key="para.id"
                  >
                    <input
                      v-model="para.key"
                      type="text"
                      class="form-control"
                      placeholder="Enter key"
                      style="padding: 5px; margin-right:5px"
                    />
                    <input
                      v-model="para.value"
                      type="text"
                      class="form-control"
                      placeholder="Enter value"
                      style="padding: 5px; margin-left:5px"
                    />
                  <i
                    style="
                      font-size: 16px;
                      cursor: pointer;
                      margin-top: 0.6rem;
                    "
                    @click="delete_parameter(para.id)"
                    class="fa ml-auto pl-2"
                    title="Delete Parameter"
                    >&#xf1f8;</i                      
                  >
                  </div> -->
                  <!-- <p class="label1 mb-0" style="padding-left: 5px;">
                    Add url parameter
                      <button
                        type="button"
                        style="
                          cursor: pointer;
                          border: none;
                          background: transparent url('@portal/assets/img/plus.png')
                          0% 0% no-repeat padding-box;
                        "
                        @click="add_parameter"
                      >
                      <img src="/img/black_plus.png" alt="" />
                      </button>
                  </p> -->
                  <!-- <hr />
                    <div>
                    <hr />
                      <h5 class="mb-sm-6 pt-3">SMS Configuration</h5>
                      <div class="form-group">
                        <form @submit="configure_product_settings('phone_no')">
                          <div class="form-group">
                            <label>Phone Number</label>
                            <input
                              v-model="phone_no_details"
                              type="text"
                              class="form-control"
                              placeholder="Enter the mobile number from where the sms will be sent"
                              style="width: 90%; padding: 5px"
                              :disabled="phone_no_disable==true"
                            />
                          </div>
                          <div
                            class="is-invalid"
                            style="color:red; padding-bottom:15px;"
                            v-if="validPhoneNumber!=true && phone_no_details!=''"
                          >
                            {{ validPhoneNumber }}
                          </div>
                          <div class="dash-modal">
                            <div class="btn-wrap text-right mt-0 py-0 border-top-0">
                              <button
                                type="button"
                                class="btn btn-danger"
                                style=""
                                v-if="phone_no_disable==true"
                              >
                                Remove
                              </button>
                              <button
                                type="submit"
                                style="display: flex !important;"
                                class="darkblue-btn"
                                v-else
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div> -->
                </div>
                <div class="col-sm-6">
                  <div class="form-group mb-0">
                    <label
                      class="col-sm-11"
                      style="width: 90%; padding: 0px;margin-top:4px"
                      ><strong>
                        <!-- {{tlt('store_config_allow_guest_users_label')}} -->
                        {{tlt('store_config_guest_user_label')}}
                      </strong>
                    </label>
                    <label class="switch col-sm-1 m-0">
                      <input
                        type="checkbox"
                        v-model="email_required"
                        id="email_required_id"
                      />
                      <span
                        class="slider round"
                        style="border-radius: 50px"
                      ></span>
                    </label>
                      
                    <label class="col-sm-11" style="padding:0px">
                      <!-- ({{tlt('store_config_allow_guest_users_help_text')}}) -->
                      {{tlt('store_config_guest_user_note')}}
                      </label
                    >
                  </div>
                  <hr />
                  <label
                    class="mb-sm-6 mt-3"
                    style="margin-top: 0.3rem !important;"
                    ><strong>
                      <!-- {{tlt('store_config_shop_base_currency')}} -->
                      {{tlt('store_config_shop_base_label')}}
                      </strong></label
                  >
                  <div class="form-group mb-0">
                    <multiselect
                      v-model="currency_code"
                      :options="currency_list"
                      :searchable="true"
                      :close-on-select="true"
                      :taggable="false"
                      :multiple="false"
                      :placeholder="tlt('shop_currency')"
                      :max-height="200"
                      track-by="display_name"
                      label="display_name"
                      :allow-empty="false"
                    >
                    </multiselect>
                  </div>
                  <hr />
                  <label
                    class="mb-sm-6 mt-4"
                    style="margin-top: 0.5rem !important;"
                    ><strong>
                      <!-- {{tlt('store_config_feedback_frequency')}} -->
                      {{tlt('store_config_feedback_label')}} 
                      </strong></label
                  >
                  <label style="max-width: 80%"
                    >{{tlt('store_config_feedback_note')}}</label
                  >
                  <input
                    v-model.number="feedback_question_frequency"
                    type="number"
                    class="form-control"
                    :placeholder="tlt('enter_days_label')"
                    style="padding: 5px;"
                    min="0"
                  />
                  <hr />
                  <label
                    class="mb-sm-6 mt-4"
                    style="margin-top: 0.5rem !important;"
                    ><strong>{{tlt('store_config_review_rating_label')}} </strong></label
                  >
                  <br />
                  <label style="max-width: 80%"
                    >{{tlt('store_config_review_rating_note')}}</label
                  >
                  <input
                    id="review_message_first_id"
                    v-model.trim="review_message_first"
                    type="text"
                    class="form-control mb-3"
                    :placeholder="tlt('review_msg_label')"
                    style="padding: 5px !important;"
                    required
                  />
                  <input
                    v-model.trim="review_message_second"
                    type="text"
                    class="form-control"
                    :placeholder="tlt('review_msg_label')"
                    style="padding: 5px;"
                  />
                  <hr />
                  <label
                    class="mb-sm-6 m-0 mb-1"
                    ><strong>{{tlt('store_config_cart_abandon_label')}}</strong></label
                  >
                  <input
                    id="minutes_after_cart_abandoned_id"
                    v-model.number="minutes_after_cart_abandoned"
                    type="number"
                    class="form-control form-control-cart mb-3"
                    :placeholder="tlt('cart_abandoned_label')"
                    style="padding: 5px !important;"
                    min="0"
                    required
                  />
                  <i
                    aria-hidden="true"
                    title="Enter a minutes  after the cart is considered to be abandoned"
                    class="fa fa-info-circle"
                    style="font-size: 16px; margin-left: 5px"
                  ></i>
                  <input
                    v-model.number="max_notification_count"
                    type="number"
                    class="form-control form-control-cart mb-3"
                    :placeholder="tlt('notification_count_label')"
                    style="padding: 5px;"
                    min="0"
                  />
                  <i
                    aria-hidden="true"
                    title="enter maximum notification count"
                    class="fa fa-info-circle"
                    style="font-size: 16px; margin-left: 5px"
                  ></i>
                  <div class="card-act">
                    <select
                      class="form-control form-control-cart"
                      style="height: 42px !important;"
                      id="abandoned_email_option_id"
                      v-model="abandoned_email_option"
                    >
                      <option disabled selected value=''>{{tlt('notification_period_label')}}</option>
                      <option value="daily">{{tlt('notification_period_daily_option')}}</option>
                      <option value="weekly">{{tlt('notification_period_weekly_option')}}</option>
                    </select>
                  </div>
                  <hr />
                  <div class="form-group mb-0 ml-1">
                    <label class="">
                     <strong>Cart Abandoned Notification</strong> 
                    </label><br/>
                    <div class="checkbox checkbox-success" style="display: inline;"
                       >
                      <span class="form-check-label checkbox checkbox-success"> 
                        <label for="notify1"
                          class="checkbox-label"
                          style="padding: 0px;margin-top:4px"
                          >
                        <input class="form-check-input"
                                type="checkbox"
                                id="notify1" 
                                name="notify1" 
                                value="email"
                                v-model="display_notification_email"
                              />
                              <span class="icn" style="margin-bottom: -2px;"></span>
                          <label for="" class="label-text">Email</label>
                             
                        </label>
                      </span>
                    </div>
                    <div v-show="is_whatsapp_subscription === true" class="checkbox checkbox-success mt-2"
                          style="display: inline; margin-left: 2rem;"
                          >
                      <span class="form-check-label checkbox checkbox-success">
                        <label for="notify2"
                          class="checkbox-label"
                          style="padding: 0px;margin-top:4px"
                          >
                          <input class="form-check-input"
                                type="checkbox"
                                id="notify2" 
                                name="notify2" 
                                value="whatsapp"
                                v-model="display_notification_whatsapp"
                                
                              />
                              <span class="icn" style="margin-bottom: -2px;"></span>
                            <label for="" class="label-text">Whatsapp</label>
                        </label>
                      </span>
                    </div>
                  </div>
                  <hr />
                  <div class="form-group mb-0">
                    <label
                      class="col-sm-11"
                      style="width: 90%; padding: 0px;margin-top:4px"
                      ><strong>
                        <!-- {{tlt('store_config_display_products')}} -->
                        {{tlt('store_config_display_product_label')}}
                      </strong>
                      
                    </label>
                    <label class="switch col-sm-1 m-0">
                      <input
                        type="checkbox"
                        v-model="is_display_products"
                        id="display_products_id"
                      />
                      <span
                        class="slider round"
                        style="border-radius: 50px"
                      ></span>
                    </label>
                    <label class="col-sm-11" style="padding:0px">
                      <!-- ({{tlt('store_config_display_products_help_text')}}) -->
                      {{tlt('store_config_display_product_note')}}
                      </label
                    >
                    <label v-if="is_display_products === true" class="col-sm-11" style="padding:0px">
                      <!-- ({{tlt('store_config__kind_of_products')}}) -->
                      {{tlt('store_config_product_show_text')}}
                      </label
                    >
                    
                    <div v-if="is_display_products === true" class="radio">
                      <div class="d-flex">
                        <label style="vertical-align: text-top">
                          {{tlt('display_product_latest_option')}}
                          <input
                            type="radio"
                            value="latest"
                            v-model="display_products_type"
                          />
                          <span class="icn" id="display_product_type_id"></span>
                        </label>
                        <label style="vertical-align: text-top">
                          {{tlt('display_product_random_option')}}
                          <input
                            type="radio"
                            value="random"
                            v-model="display_products_type"
                          />
                          <span class="icn" id="display_product_type_id"></span>
                        </label>
                        <label style="vertical-align: text-top">
                          {{tlt('display_product_best_selling_option')}}
                          <input
                            type="radio"
                            value="best_selling"
                            v-model="display_products_type"
                          />
                          <span class="icn" id="display_product_type_id"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div class="form-group mb-0">
                    <label
                      class="col-sm-11"
                      style="width: 90%; padding: 0px;margin-top:4px"
                      ><strong>
                        <!-- {{tlt('store_config_display_banners')}} -->
                        {{tlt('store_config_display_banner_label')}}
                      </strong>
                    </label>
                    <label class="switch col-sm-1 m-0">
                      <input
                        type="checkbox"
                        v-model="is_display_banner_on_landing"
                        id="is_display_banner_on_landing_id"
                      />
                      <span
                        class="slider round"
                        style="border-radius: 50px"
                      ></span>
                    </label>
                    <label class="col-sm-11" style="padding:0px">
                      <!-- ({{tlt('store_config_display_banners_help_text')}}) -->
                      {{tlt('store_config_display_banner_note')}}
                      </label
                    >
                  </div>
                </div>
              </div>
              <div class="dash-modal">
                <div class="col-sm-12">
                  <hr style="margin: 0.6rem 1rem 1rem 1rem" />
                </div>
                <div
                  class="
                    card-act
                    btn-wrap
                    text-right
                    mt-0
                    pt-0
                    pb-3
                    border-top-0
                  "
                  style="margin-left: 2rem; margin-bottom: 0.4rem"
                >
                  <button
                    type="submit"
                    style="display: text-center !important"
                    class="darkblue-btn"
                    @click="configure_product_settings('email_required')"
                  >
                     {{tlt('save_btn')}}
                  </button>
                </div>
              </div>
              <hr style="border: 1px solid #959ca3 !important;" />
              <h5 class="mb-sm-6 ml-4 pl-1">
                <!-- {{tlt('store_config_mailer_config')}} -->
                {{tlt('store_config_mailer_config_label')}}
              </h5>
              <hr>
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6">
                  <div class="form-group">
                      <form @submit.prevent="configure_product_settings('email')">
                        <div class="form-group">
                          <label><strong>
                            <!-- {{tlt('store_config_sender_email')}} -->
                            {{tlt('store_config_send_email_label')}}
                            </strong></label>
                            <label>   
                              <!-- ({{tlt('store_config_sender_email_help_text')}}) -->
                              {{tlt('store_config_send_email_note')}}
                            </label>
                          <input
                            v-model="email_details"
                            type="email"
                            class="form-control mt-2"
                            :placeholder="tlt('enter_email_label')"
                            style="padding: 5px"
                            :disabled="(email_disable == true || disable_btn_expired)"
                            required
                          />
                        </div>
                        <div>
                          <p class="label1" v-if="email_disable == true">
                            <strong>
                              <!-- {{tlt('store_config_verification_status')}}: -->
                              {{tlt('store_config_verification_status_label')}}:
                            </strong>
                            <span :style="verification_status == 'Success'?'color:#9acd32':'color:#d9534f'"
                            >
                              {{ verification_status }}
                            </span>&nbsp;
                            <img
                              title="Check Email Verification Status"
                              :src="reset_icon_path"
                              alt=""
                              style="float: inherit; cursor: pointer; padding-left: 5px;"
                              @click="load_product_settings()"
                            />
                          </p>
                        </div>
                        <div class="dash-modal">
                          <button
                            id="product_setting_email_remove_btn"
                            type="button"
                            class="btn btn-danger"
                            style="display: text-center !important"
                            v-if="email_disable == true"
                            @click="configure_product_settings('email_remove')"
                          >
                            {{tlt('store_config_mailer_remove_btn')}}
                          </button>
                          <button
                            id="product_setting_email_save_btn"
                            type="submit"
                            style="display: text-center !important"
                            class="darkblue-btn"
                            v-else
                          >
                             {{tlt('save_btn')}}
                          </button>
                        </div>
                    </form>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div
                    class="form-group"
                    v-if="
                      email_disable == true && verification_status == 'Success'
                    "
                  >
                    <div class="row col-sm-12">
                      <label class="mb-0 mt-1"
                        ><strong>{{tlt('mailer_config_mailer_unsubscribe_tag')}}</strong
                        ><label
                          ><strong>({{tlt('mailer_config_mailer_unsubscribe_marketing')}})</strong></label
                        ></label
                      >
                      <div class="radio ml-3">
                        <label
                          style="vertical-align: text-top; font-size: 17px"
                        >
                          {{tlt('unsubscribe_cense_link')}}
                          <input
                            type="radio"
                            value="standard"
                            v-model="unsubscribe_link_type"
                          />
                          <span class="icn" id="display_product_type_id"></span>
                        </label>
                        <label
                          style="vertical-align: text-top; font-size: 17px"
                        >
                          {{tlt('unsubscribe_store_link ')}}
                          <input
                            type="radio"
                            value="custom"
                            v-model="unsubscribe_link_type"
                          />
                          <span class="icn" id="display_product_type_id"></span>
                        </label>
                      </div>
                    </div>
                    <div class="mt-1">
                      <label v-if="unsubscribe_link_type === 'standard'"
                        >({{tlt('unsubscribe_label_1')}})</label
                      >
                      <label v-else
                        >({{tlt('unsubscribe_label_2')}})</label
                      >
                    </div>
                    <input
                      v-if="unsubscribe_link_type !== 'standard'"
                      type="email"
                      class="form-control mt-1"
                      v-model="unsubscribe_link"
                      :placeholder="tlt('enter_website_url')"
                      style="padding: 5px"
                      :disabled="disable_btn_expired"
                      required
                    />
                    <div class="dash-modal">
                      <div
                        class="
                          card-act
                          btn-wrap
                          text-right
                          mt-2
                          pt-0
                          border-top-0
                        "
                      >
                        <button
                          id="product_setting_promotional_email_save_btn"
                          type="submit"
                          style="display: text-center !important"
                          class="darkblue-btn mt-3"
                          @click="
                            configure_product_settings(
                              'unsubscribe_promotional_email'
                            )
                          "
                        >
                          {{tlt('product_config_save_btn')}}
                        </button>
                      </div>
                    </div>
                  </div>
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
import axios from "axios";
import swal from "sweetalert2";
import Swal from "sweetalert2";
import api_calls from "@/portal/api_calls";
import currency from "@/portal/components/Currency";
import Multiselect from "vue-multiselect";
import { freeze_portal, show_subscription_expired_swal } from "@/portal/mixins";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
export default {
  name: "ProductSettingsPage",
  components: {
    Multiselect,
    VuePhoneNumberInput,
  },
  mixins: [freeze_portal, show_subscription_expired_swal],
  data() {
    return {
      phoneNumber: null,
      contact_us_phone_number: null,
      inventory_level_notification: 5,
      currency_code: "",
      currency_list: [],
      feedback_question_frequency: 90,
      phone_no_disable: false,
      email_disable: false,
      reset_icon_path: require("@/portal/assets/img/reset_icon.svg"),
      verification_status: null,
      big_spinner: false,
      companyid: null,
      companyname: null,
      is_display_products: false,
      display_products_id: true,
      display_products_type: null,
      order_notification: false,
      is_whatsapp_integrated: false,
      display_notification_email:true,
      display_notification_whatsapp: false,
      display_notification_status: [],
      email_required: false,
      phone_no_details: null,
      email_details: null,
      email_required_id: true,
      phone_number_validity: /\+[0-9]{9,14}$/,
      email_validity:
        /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/,
      limit_up_sell: 10,
      limit_cross_sell: 10,
      contact_us_email: "",
      review_message_first: "",
      review_message_second: "",
      retail_web_framework: this.$session.get("retail_web_framework"),
      is_whatsapp_subscription: this.$session.get("whatsapp_subscription"),
      verify_product_settings: [],
      verify_check: false,
      is_display_banner_on_landing: false,
      disable_btn_expired: false,
      unsubscribe_link: null,
      unsubscribe_link_type: "standard",
      reg_host:
        /https:\/\/[(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/i,
      tracking_url: null,
      url_parameter: [],
      new_tracking_url: {},
      get_tracking_url: false,
      minutes_after_cart_abandoned: null,
      max_notification_count: null,
      abandoned_email_option: 'Select notification period',
      cart_notification_list: [],
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
    this.load_product_settings();
  },
  mounted() {
    setTimeout(() => {
      this.freeze_portal();
    }, 1000);
    this.$root.$on("ProductSettingsPageDisabled", (data) => {
      if (data === true) {
        this.disable_btn_expired = true;
      }
    });
    this.retail_web_framework = this.$session.get("retail_web_framework");
    this.is_whatsapp_integrated = this.$session.get("whatsapp_subscription");
    for (var i = 0; i < currency.length; i++) {
      this.currency_list.push({
        display_name:
          currency[i].emoji +
          " " +
          currency[i].currency_code +
          " - " +
          currency[i].currency_name,
        value: currency[i].currency_code,
      });
    }
    // this.unique();
    this.freeze_portal();
    $('[data-toggle="popover"]').popover();
    // load_product_settings();
    this.$root.$emit("change_sidebar_main_menu", "Store");
  },
  computed: {
    validPhoneNumber() {
      if (this.phone_no_details != null) {
        if (
          this.phone_number_validity.test(
            this.phone_no_details.replace(/\s+/g, "")
          )
        ) {
          return true;
        } else {
          return this.tlt('product_config_valid_ph_no_msg') +"CountryCode Number";
        }
      }
    },
    validEmail() {
      if (this.contact_us_email != null) {
        if (this.email_validity.test(this.contact_us_email)) {
          return true;
        } else {
          return this.tlt("product_config_valid_email_address_msg");
        }
      }
    },
    validUrl() {
      if (this.contact_us_email != null) {
        if (this.unsubscribe_link_type === "standard") {
          this.unsubscribe_link = null;
          return true;
        } else if (this.reg_host.test(this.unsubscribe_link)) {
          return true;
        } else {
          return this.tlt("product_config_valid_url_msg");
        }
      }
    },
  },
  watch: {
    email_details() {
      if (this.email_details == null || this.email_details == "") {
        this.email_disable = false;
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    var check = false;
    if (this.verify_check) {
      if (
        this.verify_product_settings.review_message_first ==
          this.review_message_first &&
        this.verify_product_settings.review_message_second ==
          this.review_message_second &&
          this.verify_product_settings.minutes_after_cart_abandoned ==
          this.minutes_after_cart_abandoned &&
          this.verify_product_settings.max_notification_count ==
          this.max_notification_count &&
          this.verify_product_settings.abandoned_email_option ==
          this.abandoned_email_option &&
        this.verify_product_settings.contact_help_email ==
          this.contact_us_email &&
        this.verify_product_settings.contact_us_phone_number ==
          (this.contact_us_phone_number
            ? this.phoneNumber.formattedNumber
            : undefined) &&
        this.verify_product_settings.order_retrieval_only_email_required ==
          this.email_required &&
        this.verify_product_settings.user_feedback_frequency ==
          this.feedback_question_frequency &&
        this.verify_product_settings.low_inventory_notification ==
          this.inventory_level_notification &&
        this.verify_product_settings.limit_up_sell == this.limit_up_sell &&
        this.verify_product_settings.limit_cross_sell ==
          this.limit_cross_sell &&
        this.verify_product_settings.sender_email == this.email_details &&
        this.verify_product_settings.display_products_on_landing ==
          this.is_display_products &&
        this.verify_product_settings.is_display_banner_on_landing ==
          this.is_display_banner_on_landing &&
        this.verify_product_settings.display_products_type ==
          this.display_products_type  &&
        this.verify_product_settings.cart_notification_list ==
          this.cart_notification_list
      ) {
        check = false;
      } else {
        check = true;
      }
    }
    if (check && !this.disable_btn_expired) {
      Swal({
        title: this.tlt('product_config_swal_msg'),
        text: this.tlt('product_config_swal_alert_msg'),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.tlt('product_config_save_msg'),
        cancelButtonText: this.tlt('product_config_cancel_msg'),
      }).then((result) => {
        if (result.value) {
          this.configure_product_settings("email_required");
        } else {
          next();
        }
      });
    } else {
      next();
    }
  },
  methods: {
    unique() {
      let arr = this.currency_list;
      var u = {},
        a = [];
      for (var i = 0, l = arr.length; i < l; ++i) {
        if (!u.hasOwnProperty(arr[i])) {
          a.push(arr[i]);
          u[arr[i]] = 1;
        }
      }
      this.currency_list = a;
    },
    email_verification_status() {
      if (this.email_details != null && this.email_details != "") {
        this.email_disable = true;
        this.big_spinner = true;
        axios
          .post(
            api_calls.product_settings(),
            {
              company_name: this.companyname,
              company_id: this.companyid,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              is_email_verification_status: true,
              email_id: this.email_details,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.big_spinner = false;
            if (response.data.message.MSG_CODE == this.api_status_code.EMAIL_NOT_CONFIGURED.MSG_CODE) {
              this.verification_status = this.tlt('product_config_update_email_msg');
            } else if (response.data.data != null){
              var status = response.data.data.verification_status;
              this.verification_status =
                status == "Success"
                  ? "Success"
                  : status == "Pending"
                  ? this.tlt('product_config_pending_email_msg')
                  : status +
                    this.tlt('product_config_verification_msg');
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
            this.big_spinner = false;
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
    load_product_settings() {
      this.email_details = null;
      this.phone_no_details = null;
      this.email_required = false;
      this.currency_code = "";
      this.feedback_question_frequency = 90;
      this.inventory_level_notification = 5;
      this.limit_up_sell = 10;
      this.limit_cross_sell = 10;
      this.big_spinner = true;
      axios
        .post(
          api_calls.product_settings(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            is_get: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.big_spinner = false;
          let webframework = this.retail_web_framework;
          if(webframework){
            if (
            response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE 
          ) {
            this.verify_product_settings =
              response.data.data[webframework + "_details"];
            this.review_message_first =
              response.data.data[webframework + "_details"].review_message_first;
            this.minutes_after_cart_abandoned =
              response.data.data[webframework + "_details"].minutes_after_cart_abandoned;
              this.max_notification_count =
              response.data.data[webframework + "_details"].max_notification_count;
              this.abandoned_email_option =
              response.data.data[webframework + "_details"].abandoned_email_option;
              this.review_message_second =
              response.data.data[webframework + "_details"].review_message_second;
            this.contact_us_email =
              response.data.data[webframework + "_details"].contact_help_email;
            this.contact_us_phone_number =
              response.data.data[webframework + "_details"].contact_us_phone_number;
            this.email_details =
              response.data.data[webframework + "_details"].sender_email;
            this.phone_no_details =
              response.data.data[webframework + "_details"].sender_phone_no;
            this.email_required =
              response.data.data[
                webframework + "_details"
              ].order_retrieval_only_email_required;
            this.currency_code =
              response.data.data[webframework + "_details"].base_currency;
            this.order_notification =
              response.data.data[webframework + "_details"].order_notification == 
              undefined 
              ? false 
              : response.data.data[webframework + "_details"].order_notification;
            this.feedback_question_frequency =
              response.data.data[webframework + "_details"].user_feedback_frequency;
            this.inventory_level_notification =
              response.data.data[
                webframework + "_details"
              ].low_inventory_notification;
            this.limit_up_sell =
              response.data.data[webframework + "_details"].limit_up_sell;
            this.limit_cross_sell =
              response.data.data[webframework + "_details"].limit_cross_sell;
            this.is_display_products =
              response.data.data[
                webframework + "_details"
              ].display_products_on_landing;
            this.is_display_banner_on_landing =
              response.data.data[
                webframework + "_details"
              ].is_display_banner_on_landing;
            this.display_products_type =
              response.data.data[webframework + "_details"].display_products_type;
            this.cart_notification_list = 
              response.data.data[webframework + "_details"].cart_notification_list;
            this.tracking_url =
              response.data.data[webframework + "_details"].shipment_tracking_url ===
              undefined
                ? null
                : response.data.data[webframework + "_details"].shipment_tracking_url
                    .url;
            this.url_parameter =
              response.data.data[webframework + "_details"].shipment_tracking_url ===
              undefined
                ? []
                : response.data.data[webframework + "_details"].shipment_tracking_url
                    .params;
            // this.get_tracking_url = Boolean(this.tracking_url);
            this.display_notification_status =   response.data.data[webframework + "_details"].abandoned_cart_notification_channels
            this.email_verification_status();
            this.verify_check = true;
          } else {
            this.verify_check = false;
            toastr.error(this.tlt('product_config_swal_internal_server_msg'));
          }
          if ( this.display_notification_status != undefined) {
            this.display_notification_status.includes("email") ? this.display_notification_email = true : this.display_notification_email = false;
            this.display_notification_status.includes("whatsapp") ? this.display_notification_whatsapp = true : this.display_notification_whatsapp = false;
          }
          }else{
            if (
            response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE 
          ) {
            this.verify_product_settings =
              response.data.data.details;
            this.review_message_first =
              response.data.data.details.review_message_first;
            this.minutes_after_cart_abandoned =
              response.data.data.details.minutes_after_cart_abandoned;
              this.max_notification_count =
              response.data.data.details.max_notification_count;
              this.abandoned_email_option =
              response.data.data.details.abandoned_email_option;
              this.review_message_second =
              response.data.data.details.review_message_second;
            this.contact_us_email =
              response.data.data.details.contact_help_email;
            this.contact_us_phone_number =
              response.data.data.details.contact_us_phone_number;
            this.email_details =
              response.data.data.details.sender_email;
            this.phone_no_details =
              response.data.data.details.sender_phone_no;
            this.email_required =
              response.data.data.details.order_retrieval_only_email_required;
            this.currency_code =
              response.data.data.details.base_currency;
            this.order_notification =
              response.data.data.details.order_notification == 
              undefined 
              ? false 
              : response.data.data.details.order_notification;
            this.feedback_question_frequency =
              response.data.data.details.user_feedback_frequency;
            this.inventory_level_notification =
              response.data.data.details.low_inventory_notification;
            this.limit_up_sell =
              response.data.data.details.limit_up_sell;
            this.limit_cross_sell =
              response.data.data.details.limit_cross_sell;
            this.is_display_products =
              response.data.data.details.display_products_on_landing;
            this.is_display_banner_on_landing =
              response.data.data.details.is_display_banner_on_landing;
            this.display_products_type =
              response.data.data.details.display_products_type;
            this.cart_notification_list = 
              response.data.data.details.cart_notification_list;
            this.tracking_url =
              response.data.data.details.shipment_tracking_url ===
              undefined
                ? null
                : response.data.data.details.shipment_tracking_url
                    .url;
            this.url_parameter =
              response.data.data.details.shipment_tracking_url ===
              undefined
                ? []
                : response.data.data.details.shipment_tracking_url
                    .params;
            // this.get_tracking_url = Boolean(this.tracking_url);
            this.email_verification_status();
            this.verify_check = true;
            this.display_notification_status =   response.data.data.details.abandoned_cart_notification_channels
          }else if(response.data.message.MSG_CODE == this.api_status_code.NO_DATA_AVAILABLE.MSG_CODE ){
               Swal({
              type: "info",
              text: this.tlt('no_data_text'),
              timer:3000, 
              toast:true,
              position: "top-end",
              showConfirmButton: false,   
          }); 
          } 
          else {
            this.verify_check = false;
            toastr.error(this.tlt('product_config_swal_internal_server_msg'));
          }
          }
          if ( this.display_notification_status != undefined) {
            this.display_notification_status.includes("email") ? this.display_notification_email = true : this.display_notification_email = false;
            this.display_notification_status.includes("whatsapp") ? this.display_notification_whatsapp = true : this.display_notification_whatsapp = false;
          }
        })
        .catch((e) => {
          console.log(e)
          this.big_spinner = false;
          this.verify_check = false;
          toastr.error(this.tlt('product_config_swal_error_occurred_msg'));
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    configure_product_settings(value) {
      if (!this.disable_btn_expired) {
        event.preventDefault();
        if (value == "email") {
          Swal.fire({
            title: this.tlt('product_config_swal_msg1'),
            text: this.tlt('product_config_swal_alert_msg1'),
            type: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: this.tlt('product_config_swal_confirm_msg'),
          }).then((result) => {
            if (result.value) {
              this.big_spinner = true;
              axios
                .post(
                  api_calls.product_settings(),
                  {
                    company_name: this.companyname,
                    company_id: this.companyid,
                    email: this.$session.get("UserInformation").email,
                    license_key:
                      this.$session.get("UserInformation").license_key,
                    token: this.$session.get("UserInformation").tokens,
                    is_email: true,
                    email_id: this.email_details,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${this.$session.get("at")}`,
                    },
                  }
                )
                .then((response) => {
                  this.big_spinner = false;
                  if (response.data.message.MSG_CODE == this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
                    swal({
                      text:
                        this.tlt('product_config_email_send_msg1') +
                        " " +
                        this.tlt('product_config_email_send_msg2') +
                        this.tlt('product_config_email_send_msg3'),
                      type: "success",
                      title: this.tlt('product_config_swal_success_msg'),
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                    });
                    this.email_disable = true;
                    this.email_verification_status();
                    this.load_product_settings();
                  } else {
                    swal({
                      text: this.tlt('product_config_product_server_error_msg'),
                      type: "error",
                      timer: 2000,
                    });
                  }
                })
                .catch((e) => {
                  this.big_spinner = false;
                  toastr.error(this.tlt('product_config_product_error_occurred_msg'));
                  if (
                    e.response.status === 410 ||
                    e.response.status === 440 ||
                    e.response.status === 409
                  ) {
                    this.$root.$emit("Session_Expired", e.response.data);
                  }
                });
            }
          });
        } else if (value == "phone_no") {
          if (this.validPhoneNumber == true) {
            this.big_spinner = true;
            axios
              .post(
                api_calls.product_settings(),
                {
                  company_name: this.companyname,
                  company_id: this.companyid,
                  email: this.$session.get("UserInformation").email,
                  license_key: this.$session.get("UserInformation").license_key,
                  token: this.$session.get("UserInformation").tokens,
                  is_phone_no: true,
                  phone_no: this.phone_no_details,
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                this.big_spinner = false;
                if (response.data.message.MSG_CODE == this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
                  swal({
                    text: this.tlt('product_config_phone_number_msg'),
                    type: "success",
                    timer: 2000,
                    title: "Success",
                  });
                  this.empty_variable();
                  this.load_product_settings();
                } else {
                  swal({
                    text: this.tlt('product_config_internal_server_alert_msg'),
                    type: "error",
                    timer: 2000,
                  });
                }
              })
              .catch((e) => {
                this.big_spinner = false;
                toastr.error(this.tlt('product_config_some_error_msg'));
                if (
                  e.response.status === 410 ||
                  e.response.status === 440 ||
                  e.response.status === 409
                ) {
                  this.$root.$emit("Session_Expired", e.response.data);
                }
              });
          } else {
            toastr.error(
              this.tlt('product_config_mobile_no_alert_msg') +" CountryCode Number"
            );
          }
        } else if (value == "email_required") {
          this.create_tracking_url();
          if (this.validEmail != true && !Boolean(this.phoneNumber)) {
            swal({
              text: this.tlt('product_config_valid_detail_alert_msg'),
              type: "warning",
              timer: 3000,
            });
            return;
          }
          // if(!Boolean(this.phoneNumber)){
          //   swal({
          //     text: "Please enter a valid Phone Number",
          //     type: "warning",
          //     timer: 3000
          //   });
          //   return
          // }else
          if (
            Boolean(this.phoneNumber) &&
            Boolean(this.phoneNumber.phoneNumber) &&
            this.phoneNumber.isValid != true
          ) {
            swal({
              text: this.tlt('product_config_phone_no_msg'),
              type: "warning",
              timer: 3000,
            });
            return;
          }
          if (
            this.review_message_first === "" &&
            this.review_message_second === ""
          ) {
            swal({
              text: this.tlt('product_config_review_rating_alert_msg'),
              type: "warning",
              timer: 3500,
            });
            return;
          }
          if (
            this.is_display_products === true &&
            (this.display_products_type === null ||
              this.display_products_type === "")
          ) {
            swal({
              text: this.tlt('product_config_product_type_alert_msg'),
              type: "warning",
              timer: 5000,
            });
            return;
          }
          if (
            this.inventory_level_notification < 0 ||
            this.feedback_question_frequency < 0
          ) {
            swal({
              text: this.tlt('product_config_numeric_value_alert_msg'),
              type: "warning",
              timer: 3000,
            });
          }
          if (this.currency_code == "" || this.currency_code == undefined) {
            swal({
              text: this.tlt('product_config_base_currency_alert_msg'),
              type: "warning",
              timer: 3000,
            });
            return;
          } else if (
            this.limit_up_sell == null ||
            this.limit_up_sell <= 0 ||
            this.limit_cross_sell == null ||
            this.limit_cross_sell <= 0
          ) {
            swal({
              text: this.tlt('product_config_upsell_cross_alert_msg'),
              type: "warning",
              timer: 3000,
            });
          } else {
            this.cart_notification_list = [];
            if(this.display_notification_email == true && this.display_notification_whatsapp == true) {
              this.cart_notification_list.push("email", "whatsapp");
            }else if(this.display_notification_email == true && this.display_notification_whatsapp == false) {
              this.cart_notification_list.push("email");
              }
              else if(this.display_notification_whatsapp == true && this.display_notification_email == false) {
              this.cart_notification_list.push("whatsapp");
              }else{
                this.cart_notification_list.push();
                this.display_notification_status = false;
              }
            this.big_spinner = true;
            axios
              .post(
                api_calls.product_settings(),
                {
                  company_name: this.companyname,
                  company_id: this.companyid,
                  email: this.$session.get("UserInformation").email,
                  license_key: this.$session.get("UserInformation").license_key,
                  token: this.$session.get("UserInformation").tokens,
                  is_email_required: true,
                  email_required: {
                    review_message_first: this.review_message_first,
                    minutes_after_cart_abandoned: this.minutes_after_cart_abandoned,
                    max_notification_count: this.max_notification_count,
                    abandoned_email_option: this.abandoned_email_option,
                    abandoned_cart_notification_channels: this.cart_notification_list,
                    review_message_second: this.review_message_second,
                    contact_help_email: this.contact_us_email,
                    contact_us_phone_number:
                      Boolean(this.phoneNumber) &&
                      this.phoneNumber.isValid == true
                        ? this.phoneNumber.formattedNumber
                        : null,
                    order_retrieval_only_email_required: this.email_required,
                    order_notification: this.is_whatsapp_integrated ? this.order_notification : false,
                    base_currency: this.currency_code,
                    user_feedback_frequency: this.feedback_question_frequency,
                    low_inventory_notification:
                      this.inventory_level_notification,
                    limit_up_sell: this.limit_up_sell,
                    limit_cross_sell: this.limit_cross_sell,
                    display_products_on_landing: this.is_display_products,
                    is_display_banner_on_landing:
                      this.is_display_banner_on_landing,
                    display_products_type: this.is_display_products
                      ? this.display_products_type
                      : null,
                    shipment_tracking_url: this.new_tracking_url,
                    shop_settings_saved: true,
                  },
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                this.big_spinner = false;
                if (response.data.message.MSG_CODE == this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
                  swal({
                    text: this.tlt('product_config_changes_saved_msg'),
                    type: "success",
                    timer: 4000,
                  });
                  this.empty_variable();
                  this.load_product_settings();
                } else {
                  swal({
                    text: this.tlt('product_config_internal_server_msg2'),
                    type: "error",
                    timer: 2000,
                  });
                }
              })
              .catch((e) => {
                this.big_spinner = false;
                toastr.error(this.tlt('product_config_some_error_msg2'));
                if (
                  e.response.status === 410 ||
                  e.response.status === 440 ||
                  e.response.status === 409
                ) {
                  this.$root.$emit("Session_Expired", e.response.data);
                }
              });
          }
        } else if (value == "email_remove") {
          Swal.fire({
            title: this.tlt('product_config_swal_msg2'),
            text: this.tlt('product_config_swal_alert_msg2'),
            type: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: this.tlt('product_config_swal_remove_msg2'),
          }).then((result) => {
            if (result.value) {
              this.big_spinner = true;
              axios
                .post(
                  api_calls.product_settings(),
                  {
                    company_name: this.companyname,
                    company_id: this.companyid,
                    email: this.$session.get("UserInformation").email,
                    license_key:
                      this.$session.get("UserInformation").license_key,
                    token: this.$session.get("UserInformation").tokens,
                    is_remove_email: true,
                    email_id: this.email_details,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${this.$session.get("at")}`,
                    },
                  }
                )
                .then((response) => {
                  this.big_spinner = false;
                  if (response.data.message.MSG_CODE == this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
                    swal({
                      text: this.tlt('product_config_swal_confirm_msg2'),
                      type: "success",
                      timer: 5000,
                      title: this.tlt('product_config_swal_success_label_msg'),
                    });
                    this.email_disable = false;
                    this.email_details = null;
                    this.empty_variable();
                    this.load_product_settings();
                  } else {
                    swal({
                      text: this.tlt('product_config_internal_server_msg3'),
                      type: "error",
                      timer: 2000,
                    });
                  }
                })
                .catch((e) => {
                  this.big_spinner = false;
                  toastr.error(this.tlt('product_config_some_error_msg3'));
                  if (
                    e.response.status === 410 ||
                    e.response.status === 440 ||
                    e.response.status === 409
                  ) {
                    this.$root.$emit("Session_Expired", e.response.data);
                  }
                });
            }
          });
        } else if (value == "unsubscribe_promotional_email") {
          if (this.validUrl != true) {
            swal({
              text: this.tlt('product_config_valid_url_msg'),
              type: "warning",
              timer: 3000,
            });
            return;
          } else {
            this.big_spinner = true;
            axios
              .post(
                api_calls.product_settings(),
                {
                  company_name: this.companyname,
                  company_id: this.companyid,
                  email: this.$session.get("UserInformation").email,
                  license_key: this.$session.get("UserInformation").license_key,
                  token: this.$session.get("UserInformation").tokens,
                  is_email_required: true,
                  email_required: {
                    review_message_first: this.review_message_first,
                    review_message_second: this.review_message_second,
                    minutes_after_cart_abandoned: this.minutes_after_cart_abandoned,
                    max_notification_count: this.max_notification_count,
                    abandoned_email_option: this.abandoned_email_option,
                    abandoned_cart_notification_channels: this.cart_notification_list,
                    contact_help_email: this.contact_us_email,
                    // contact_us_phone_number:this.phoneNumber.formattedNumber,
                    order_retrieval_only_email_required: this.email_required,
                    order_notification: this.is_whatsapp_integrated ? this.order_notification : false,
                    base_currency: this.currency_code,
                    user_feedback_frequency: this.feedback_question_frequency,
                    low_inventory_notification:
                      this.inventory_level_notification,
                    limit_up_sell: this.limit_up_sell,
                    limit_cross_sell: this.limit_cross_sell,
                    display_products_on_landing: this.is_display_products,
                    is_display_banner_on_landing:
                      this.is_display_banner_on_landing,
                    display_products_type: this.is_display_products
                      ? this.display_products_type
                      : null,
                    shop_settings_saved: true,
                    unsubscribe_link: this.unsubscribe_link,
                    unsubscribe_link_type: this.unsubscribe_link_type,
                  },
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                this.big_spinner = false;
                if (response.data.message.MSG_CODE == this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
                  swal({
                    text: this.tlt('product_config_changes_saved_msg2'),
                    type: "success",
                    timer: 4000,
                  });
                  this.empty_variable();
                  this.load_product_settings();
                } else {
                  swal({
                    text: this.tlt('product_config_internal_server_msg4'),
                    type: "error",
                    timer: 2000,
                  });
                }
              })
              .catch((e) => {
                this.big_spinner = false;
                toastr.error(this.tlt('product_config_some_error_msg4'));
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
      } else {
        this.show_subscription_expired_swal();
      }
    },
    empty_variable() {
      this.email_details = null;
      this.email_required = false;
      this.currency_code = "";
      this.feedback_question_frequency = 90;
      this.inventory_level_notification = 5;
      this.phone_no_details = null;
      this.limit_up_sell = 10;
      this.limit_cross_sell = 10;
      this.order_notification = false;
    },
    // add_parameter(){
    //   let next_id =Math.random();
    //   if (Boolean(this.tracking_url) ) {
    //     this.url_parameter.push({
    //     key: null,
    //     id: next_id,
    //     value: null
    //   }
    //   )
    //   }else{
    //     swal({
    //       text: "Add  Shipment tracking URL ",
    //       toast: true,
    //       position: "top-end",
    //       type: "warning",
    //       showConfirmButton: false,
    //       timer: 2500,
    //     });
    //     return;
    //   }
    // },
    // delete_parameter(index){
    //   if(
    //     this.url_parameter.length === 0
    //   ) {
    //     swal({
    //       text: "Atleast one url_parameter is required to add buttons",
    //       toast: true,
    //       position: "top-end",
    //       type: "warning",
    //       showConfirmButton: false,
    //       timer: 2500,
    //     });
    //     return;
    //   }
    //   let temp_index = null;
    //   for (let i = 0; i < this.url_parameter.length; i++) {
    //     if (this.url_parameter[i].id == index) {
    //       temp_index = i;
    //     }
    //   }
    //   this.url_parameter.splice(temp_index, 1);
    // },
    create_tracking_url() {
      this.new_tracking_url["url"] = this.tracking_url;
      this.new_tracking_url["params"] = this.url_parameter;
    },
  },
};
</script>
<style scoped>
.form-control-cart{
  width: 95% !important;
  display: inline-block !important;
}
.checkbox .icn{
  position: relative !important;
}
.checkbox-label{
  vertical-align: 2px;
  /* margin: 10px; */
  font-size: 17px;
  position: relative;
  color: #494D69 !important;
}
.label-text{
  vertical-align: 2px;
  font-size: 17px;
  padding-left: 12px !important;
  position: relative;
  color: #494D69 !important;
}
.dash-modal .btn-wrap .darkblue-btn {
  margin-left: 0px;
  padding: 5px 20px !important;
}
.darkblue-btn {
  display: block !important;
}
.btn {
  display: flex !important;
  padding: 5px 20px !important;
  font-size: 14px !important;
}
</style>
<style>
.multiselect__tags {
  min-height: 42px !important;
}
</style>