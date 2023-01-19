<template>
  <div>
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="mb-3">
      <div class="radio my-auto">
        <label>
          <input type="radio" v-model="filter_review_rating" value="customer" />
          <span class="icn"></span>
          {{tlt('customer_review_filter_by_cust_label')}}
        </label>
        <label>
          <input type="radio" v-model="filter_review_rating" value="product" />
          <span class="icn"></span>
          {{tlt('customer_review_filter_by_product_label')}}
        </label>
      </div>
    </div>
    <div>
        <div 
            v-if="filter_review_rating === 'customer' && customer_reviews_list.length > 0"
            class="col-sm-12 d-flex px-0"
        >
            <div class="col-sm-4 pl-0">
                <div class="table-box">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col"  class="text-left">{{tlt('customer_review_customer_name_label')}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(customer, index) in customer_reviews_list"
                                    :key="index"
                                    :class="check_current_customer(index)"
                                >
                                    <td
                                        style="cursor: pointer"
                                        @click="show_customer_review(index)"
                                        :title="customer.customer_name"
                                    >
                                        <template>
                                        <p style="margin-bottom: 0">
                                            {{ customer.customer_name }}
                                        </p>
                                        </template>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-sm-8 pr-0">
                <div style="border: 1px solid #dbe2e8">
                    <div class="col-sm-12">
                        <div style="color: #414141" class="d-flex">
                            <h5><p class="mt-4 mb-0">{{tlt('customer_review_details_label')}}</p></h5>
                        </div>
                    </div>
                    <hr />
                    <div class="col-sm-12" style="margin-bottom: 1rem">
                        <h5>
                            <p class="mt-0 mb-0" style="color: #414141">{{tlt('customer_review_name_label')}}</p>
                        </h5>
                        <div style="padding-left: 20px">
                            <p>{{current_selected_customer_name}}</p>
                        </div>
                        <!-- <h5>
                            <p class="mt-0 mb-0" style="color: #414141">Customer Details</p>
                        </h5>
                        <template>
                            <div style="display: block; margin-bottom: 1rem">
                                <div class="custom-button-box p-3 m-3">
                                    <p>
                                        <strong>Name :</strong>   {{current_selected_customer_name}}
                                    </p>
                                    <p>
                                       <strong> ID : </strong> {{current_selected_customer_id}}
                                    </p>
                                    <p>
                                       <strong> Email : </strong>
                                       <span v-html="current_selected_customer_email"></span>
                                    </p>
                                    <p style="margin: 0px !important;">
                                       <strong> Phone Number : </strong> {{current_selected_customer_phone}}
                                    </p>
                                </div>
                            </div>
                        </template> -->
                    </div>
                    <hr />
                    <div class="col-sm-12" style="margin-bottom: 1rem">
                        <h5>
                        <p class="mt-2 mb-0" style="color: #414141">{{tlt('customer_review_cust_reviews_label')}}</p>
                      </h5>
                      <template >
                        <div style="display: block; margin-bottom: 1rem">
                            <div
                                v-for="(
                                    review, index
                                ) in current_selected_review_product_details"
                                :key="index"
                                class="custom-button-box p-3 m-3"
                            >
                                <div class="col-sm-12 d-flex p-0">
                                    <div class="col-sm-9 p-0">
                                        <div style="width: 100% !important;">
                                        <label v-if="Boolean(review.product_details.name) === true" style="text-align: justify !important;" >
                                            <strong><b> {{review.product_details.name}}</b></strong>
                                        </label>
                                        <label v-else style="text-align: justify !important;" ><strong> {{tlt('review_page_product_name1')}} </strong></label>
                                        <div class="mb-3">
                                            <star-rating 
                                                v-model="review.product_rating"
                                                v-bind:star-size="17"
                                                :showRating= false
                                                :read-only = "true"
                                                >
                                            </star-rating>
                                        </div>
                                        <p
                                            style="
                                            width: 100% !important;
                                            text-align: justify !important;"
                                        >
                                            {{review.product_review}}
                                        </p>
                                        <p
                                            style="
                                            width: 100% !important;
                                            margin: 0px !important;
                                            text-align: justify !important;"
                                        >
                                            {{review.product_review_date.split(' ').slice(1,4).join('-')}}
                                        </p>
                                        </div>
                                    </div>
                                    <div class="col-sm-3 pl-3 pr-0">
                                        <div class="container h-100">
                                            <div class="row align-items-center h-100">
                                                <div class="mx-auto">
                                                        <img :src="review.product_details.image_src" alt="Product Image" class="img-thumbnail" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </template>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="filter_review_rating === 'product' && customer_reviews_list_product.length > 0"
            class="col-sm-12 d-flex px-0" 
        >
            <div class="col-sm-4 pl-0">
                <div class="table-box">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col"  class="text-left">{{tlt('customer_review_product_name_label')}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(product, index) in customer_reviews_list_product"
                                    :key="index"
                                    :class="check_current_product(index)"
                                >
                                    <td
                                        style="cursor: pointer"
                                        @click="show_customer_review_product(index)"
                                        :title="product.product_name"
                                    >
                                        <template>
                                        <p style="margin-bottom: 0">
                                            {{ product.product_name }}
                                        </p>
                                        </template>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-sm-8 pr-0">
                <div style="border: 1px solid #dbe2e8">
                    <div class="col-sm-12">
                        <div style="color: #414141" class="d-flex">
                            <h5><p class="mt-4 mb-0">{{tlt('customer_review_product_customer_review_label')}}</p></h5>
                        </div>
                    </div>
                    <hr />
                    <div class="col-sm-12" style="margin-bottom: 1rem">
                        <!-- <h5>
                            <p class="mt-0 mb-0" style="color: #414141">Product Details</p>
                        </h5> -->
                        <template>
                            <div style="display: block; margin-bottom: 1rem">
                                <div class="custom-button-box p-3 m-0">
                                    <div class="col-sm-12 d-flex p-0">
                                        <div class="col-sm-7 p-0">
                                            <div style="width: 100% !important;">
                                                <label v-if="Boolean(current_selected_product_name) === true" style="text-align: justify !important;" >
                                                    <strong><b>{{current_selected_product_name}}</b></strong>
                                                </label>
                                                <label v-else style="text-align: justify !important;" ><strong> {{tlt('review_page_product_name1')}} </strong></label>
                                                <div class="mb-0 d-flex">
                                                    <star-rating 
                                                        v-model="current_selected_avg_star"
                                                        v-bind:star-size="17"
                                                        :showRating= false
                                                        :read-only = "true"
                                                        >
                                                    </star-rating>
                                                    <label style="margin-left:10px !important;margin-top:7px !important;margin-bottom:0px !important;">
                                                        {{current_selected_avg_star}} {{tlt('rating_out_of_star_label')}}
                                                    </label>
                                                </div>
                                                <div class="mb-0">
                                                    <label>{{current_selected_review_count}} {{tlt('review_label')}}</label>
                                                </div>
                                                <div>
                                                    <template>
                                                        <div>
                                                            <div class="col-sm-12 d-flex p-0">
                                                                <label class="col-sm-2 p-0">{{tlt('rating_5_star_label')}}</label>
                                                                <b-progress 
                                                                    :max="current_selected_review_count" 
                                                                    class="mb-3 col-sm-8 p-0" 
                                                                    style="margin-bottom: 20px !important;margin-top: 5px !important;padding: 0px !important;">
                                                                    <b-progress-bar variant="success" :value="current_selected_star_5"></b-progress-bar>
                                                                </b-progress>
                                                                <label 
                                                                    class="col-sm-2 p-0" 
                                                                    style="padding-left: 3% !important;padding-top: 3px !important;"
                                                                >
                                                                    {{(parseInt(current_selected_star_5)*100)/(parseInt(current_selected_review_count))}} %
                                                                </label>
                                                            </div>
                                                            <div class="col-sm-12 d-flex p-0">
                                                                <label class="col-sm-2 p-0">{{tlt('rating_4_star_label')}}</label>
                                                                <b-progress 
                                                                    :max="current_selected_review_count" 
                                                                    class="mb-3 col-sm-8 p-0" 
                                                                    style="margin-bottom: 20px !important;margin-top: 5px !important;padding: 0px !important;">
                                                                    <b-progress-bar variant="success" :value="current_selected_star_4"></b-progress-bar>
                                                                </b-progress>
                                                                <label 
                                                                    class="col-sm-2 p-0"
                                                                    style="padding-left: 3% !important;padding-top: 3px !important;"
                                                                >
                                                                    {{(parseInt(current_selected_star_4)*100)/(parseInt(current_selected_review_count))}} %
                                                                </label>
                                                            </div>
                                                            <div class="col-sm-12 d-flex p-0">
                                                                <label class="col-sm-2 p-0">{{tlt('rating_3_star_label')}}</label>
                                                                <b-progress 
                                                                    :max="current_selected_review_count" 
                                                                    class="mb-3 col-sm-8 p-0" 
                                                                    style="margin-bottom: 20px !important;margin-top: 5px !important;padding: 0px !important;">
                                                                    <b-progress-bar variant="success" :value="current_selected_star_3"></b-progress-bar>
                                                                </b-progress>
                                                                <label 
                                                                    class="col-sm-2 p-0"
                                                                    style="padding-left: 3% !important;padding-top: 3px !important;"
                                                                >
                                                                    {{(parseInt(current_selected_star_3)*100)/(parseInt(current_selected_review_count))}} %
                                                                </label>
                                                            </div>
                                                            <div class="col-sm-12 d-flex p-0">
                                                                <label class="col-sm-2 p-0">{{tlt('rating_2_star_label')}}</label>
                                                                <b-progress 
                                                                    :max="current_selected_review_count" 
                                                                    class="mb-3 col-sm-8 p-0" 
                                                                    style="margin-bottom: 20px !important;margin-top: 4px !important;padding: 0px !important;">
                                                                    <b-progress-bar variant="warning" :value="current_selected_star_2"></b-progress-bar>
                                                                </b-progress>
                                                                <label 
                                                                    class="col-sm-2 p-0"
                                                                    style="padding-left: 3% !important;padding-top: 3px !important;"
                                                                >
                                                                    {{(parseInt(current_selected_star_2)*100)/(parseInt(current_selected_review_count))}} %
                                                                </label>
                                                            </div>
                                                                <div class="col-sm-12 d-flex p-0">
                                                                <label class="col-sm-2 p-0">{{tlt('rating_1_star_label')}}</label>
                                                                <b-progress 
                                                                    :max="current_selected_review_count" 
                                                                    class="mb-3 col-sm-8 p-0" 
                                                                    style="margin-bottom: 20px !important;margin-top: 6px !important; padding: 0px !important;">
                                                                    <b-progress-bar variant="danger" :value="current_selected_star_1"></b-progress-bar>
                                                                </b-progress>
                                                                <label 
                                                                    class="col-sm-2 p-0"
                                                                    style="padding-left: 3% !important;padding-top: 3px !important;"
                                                                >
                                                                    {{(parseInt(current_selected_star_1)*100)/(parseInt(current_selected_review_count))}} %
                                                                </label>
                                                            </div>                                                                                                                                                             
                                                        </div>
                                                    </template>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-5 pl-3 pr-0">
                                            <div class="container h-100">
                                                <div class="row align-items-center h-100">
                                                    <div 
                                                        class="col-6 mx-auto p-0" 
                                                        style="text-align: center !important;max-width: 100% !important;flex: auto !important;">
                                                            <img style="height:250px !important" :src="current_selected_product_img" alt="Product Image" class="img-thumbnail" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                    <!-- <hr /> -->
                    <div class="col-sm-12" style="margin-bottom: 1rem">
                        <!-- <h5>
                            <p class="mt-0 mb-0" style="color: #414141">Customer Reviews</p>
                        </h5> -->
                        <div
                            v-for="(
                                review, index
                            ) in current_selected_product_review_data"
                            :key="index"
                        >
                            <div style="width: 100% !important;">
                                <div class="d-flex">
                                    <i class="fas fa-user-circle mr-3 fa-2x" style="color: darkgrey !important;"></i>
                                    <label v-if="Boolean(review.customer_name[0]) === true" style="text-align: justify !important; margin-top: 4px !important;" >
                                        <strong><b>{{review.customer_name[0]}}</b></strong>
                                    </label>
                                    <label v-else style="text-align: justify !important;margin-top: 4px !important;" >
                                        <strong> {{tlt('review_page_user_label')}} </strong>
                                    </label>
                                </div>
                                <div class="mb-2 mt-2">
                                    <star-rating 
                                        v-model="review.product_rating"
                                        v-bind:star-size="17"
                                        :showRating= false
                                        :read-only = "true"
                                        >
                                    </star-rating>
                                </div>
                                <p
                                    style="
                                    width: 100% !important;
                                    text-align: justify !important;"
                                >
                                    {{review.product_review}}
                                </p>
                                <p
                                    style="
                                    width: 100% !important;
                                    margin: 0px !important;
                                    text-align: justify !important;"
                                >
                                    {{review.product_review_date.split(' ').slice(1,4).join('-')}}
                                </p>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="(customer_reviews_list.length === 0 && 
            customer_reviews_list_product.length ===0) && !spinnerOn"
        >
            <p class="text-center">
                <strong> {{tlt('customer_review_no_customer_yet_label')}}</strong>
            </p>
        </div>
        <div
            class="pagin-table"
            style="margin-top: 2%"
            v-show="customer_reviews_list.length > 0 ||
                customer_reviews_list_product.length > 0"
            >
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                <li class="page-item">
                    <a class="page-link" href="#" @click="page_require(page_no - 1)">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8.667"
                        height="15.204"
                        viewBox="0 0 8.667 15.204"
                    >
                        <g
                        id="arrow-point-to-left"
                        transform="translate(105.806 15.204) rotate(180)"
                        >
                        <path
                            id="Path_1136"
                            data-name="Path 1136"
                            d="M105.493,8.354l-6.537,6.537a1.065,1.065,0,1,1-1.506-1.506L103.235,7.6,97.45,1.817A1.065,1.065,0,0,1,98.956.312l6.537,6.537a1.065,1.065,0,0,1,0,1.505Z"
                            transform="translate(0 0)"
                            fill="#9499ae"
                        />
                        </g>
                    </svg>
                    </a>
                </li>
                <li
                    :class="'page-item ' + pagination_class(pageno)"
                    v-for="pageno in page_array"
                    :key="pageno"
                >
                    <a
                    v-if="pageno == '...s' || pageno == '...l'"
                    class="page-link"
                    href="#"
                    @click="page_require(pageno)"
                    >...</a
                    >
                    <a
                    v-if="pageno != '...s' && pageno != '...l'"
                    class="page-link"
                    href="#"
                    @click="page_require(pageno)"
                    >{{ pageno }}</a
                    >
                </li>
                <li class="page-item">
                    <a class="page-link" href="#" @click="page_require(page_no + 1)">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8.667"
                        height="15.204"
                        viewBox="0 0 8.667 15.204"
                    >
                        <g id="arrow-point-to-right" transform="translate(-97.139 0)">
                        <path
                            id="Path_1136"
                            data-name="Path 1136"
                            d="M105.493,8.354l-6.537,6.537a1.065,1.065,0,1,1-1.506-1.506L103.235,7.6,97.45,1.817A1.065,1.065,0,0,1,98.956.312l6.537,6.537a1.065,1.065,0,0,1,0,1.505Z"
                            transform="translate(0 0)"
                            fill="#9499ae"
                        />
                        </g>
                    </svg>
                    </a>
                </li>
                </ul>
            </nav>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api_calls from "@/portal/api_calls.js";
import swal from "sweetalert2";
import StarRating from 'vue-star-rating';
import Template from '../Template.vue';
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

export default {
    components: {
        StarRating
    },
  name: "ReviewRating",
  data() {
    return {
      spinnerOn: false,
      filter_review_rating: "customer",
      page_no: 1,
      per_page: 10,
      page_array: [],
      total_pages: null,
      number_of_rows: null,
      customer_reviews_list:[],
      customer_reviews_list_product:[],
      current_selected_customer_name:'',
      current_selected_customer_id:'',
    //   current_selected_customer_email:'',
    //   current_selected_customer_phone:'',
      current_selected_review_product_details:[],
      current_selected_customer_name_highlight:'',
      current_selected_star_1: 0,
      current_selected_star_2: 0,
      current_selected_star_3: 0,
      current_selected_star_4: 0,
      current_selected_star_5: 0,
      current_selected_avg_star: 0,
      current_selected_review_count: 0,
      current_selected_product_id: null,
      current_selected_product_name:'',
      current_selected_product_img:'',
      current_selected_product_review_data:'',
      current_selected_product_name_highlight:'',
      bot_response_token_value: this.$session.get("BotToken"),
    };
  },
  created() {
    if (this.$session.get("UserInformation").role == "SuperAdmin") {
      if (this.$session.has("CompanyId")) {
        this.companyid = this.$session.get("CompanyId");
        this.companyname = this.$session.get("CompanyName");
      } else {
        this.companyid = this.$session.get("UserInformation").company_id;
        this.companyname = this.$session.get("UserInformation").company_name;
        toastr.warning(this.tlt('select_company_name_msg2'));
      }
    } else {
      this.companyid = this.$session.get("UserInformation").company_id;
      this.companyname = this.$session.get("UserInformation").company_name;
    }
    if (!this.$session.has("BotToken")) {
      
        axios
          .post(api_calls.bot_response_token(), {
            license_key: this.$session.get("UserInformation").license_key,
            username: this.$session.get("UserInformation").email,
          })
          .then((response) => {
            if (this.api_status_code.STATUS_SUCCESS_CORE.MSG_CODE === response.data.message.MSG_CODE){
                this.$session.set("BotToken", response.data.data);
                this.bot_response_token_value = response.data.data;
                this.get_review_rating();
            }
          });
    } else {
        this.bot_response_token_value = this.$session.get("BotToken");
        this.get_review_rating();
    }
  },
  watch: {
    filter_review_rating() {
        this.get_review_rating();
    },
  },
  methods: {
    get_review_rating(){
        this.spinnerOn = true;
        this.customer_reviews_list_product = [];
        this.customer_reviews_list = [];
        axios
            .post(
                api_calls.product_review_rating(),
                {
                    company_name: this.companyname,
                    company_id: this.companyid,
                    email: this.$session.get("UserInformation").email,
                    license_key: this.$session.get("UserInformation").license_key,
                    token: this.bot_response_token_value,
                    username: this.$session.get("UserInformation").email,
                    is_get_product_review_details: true,
                    filter_by: this.filter_review_rating,
                    page_no: this.page_no,
                    per_page: this.per_page,
                },
                {
                    headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`
                    }
                }
            )
            .then(response => {
                this.spinnerOn = false;
                if(response.data.message.MSG_CODE === this.api_status_code.CUSTOMER_REVIEW_AVAILABLE.MSG_CODE) {
                    if(response.data.data.filter_type == 'customer'){
                        this.customer_reviews_list_product = [];
                        this.customer_reviews_list = [];
                
                        this.total_pages = response.data.pagination.total_page;
                        this.customer_reviews_list = response.data.data.customer_review;
                        if (this.customer_reviews_list.length > 0) {
                            this.show_customer_review(0);
                        }
                        this.setpagination(this.page_no);
                    }else if(response.data.data.filter_type == 'product'){
                        this.customer_reviews_list_product = [];
                        this.customer_reviews_list = [];
                  
                        this.total_pages = response.data.pagination.total_page;
                        this.customer_reviews_list_product = response.data.data.customer_review;
                        if (this.customer_reviews_list_product.length > 0) {
                            this.show_customer_review_product(0);
                        }
                        this.setpagination(this.page_no);
                    }
                }else if (response.data.message.MSG_CODE === this.api_status_code.CUSTOMER_REVIEW_NOT_AVAILABLE.MSG_CODE){
                    this.customer_reviews_list_product = [];
                    this.customer_reviews_list = [];
                }else{
                    swal({
                        text: this.tlt('review_page_error_occurred_msg1'),
                        toast: true,
                        showCancelButton: false,
                        showConfirmButton: false,
                        type: "error",
                        position: "top-end",
                        timer: 5000,
                    });
                }
            })
            .catch(e => {
                console.log(e)
                toastr.error(this.tlt('review_page_error_occurred_msg2'));
                if (
                    e.response.status === 410 ||
                    e.response.status === 440 ||
                    e.response.status === 409
                ) {
                    this.$root.$emit("Session_Expired", e.response.data);
                }
            });
    },
    check_current_customer(index) {
      var return_var = "";
      if (this.customer_reviews_list[index].customer_name === this.current_selected_customer_name_highlight) {
        return_var += "current-active-entity";
      }
      return return_var;
    },
    check_current_product(index) {
      var return_var = "";
      if (this.customer_reviews_list_product[index]['product_name'] === this.current_selected_product_name_highlight) {
        return_var += "current-active-entity";
      }
      return return_var;
    },
    show_customer_review(index){
        this.current_selected_customer_name = this.customer_reviews_list[index].customer_name;
        this.current_selected_customer_id = this.customer_reviews_list[index].customer_id;
        // this.current_selected_customer_email = this.customer_reviews_list[index].customer_email;
        // this.current_selected_customer_phone = this.customer_reviews_list[index].customer_phone;
        this.current_selected_review_product_details = this.customer_reviews_list[index].review_product_details;
        this.current_selected_customer_name_highlight = this.customer_reviews_list[index].customer_name;
    },
    show_customer_review_product(index){
        this.current_selected_star_1 = this.customer_reviews_list_product[index]['1'];
        this.current_selected_star_2 = this.customer_reviews_list_product[index]['2'];
        this.current_selected_star_3 = this.customer_reviews_list_product[index]['3'];
        this.current_selected_star_4 = this.customer_reviews_list_product[index]['4'];
        this.current_selected_star_5 = this.customer_reviews_list_product[index]['5'];
        this.current_selected_avg_star = this.customer_reviews_list_product[index]['avg-star'];
        this.current_selected_review_count = this.customer_reviews_list_product[index]['count'];
        this.current_selected_product_id = this.customer_reviews_list_product[index]['product_id'];
        this.current_selected_product_name = this.customer_reviews_list_product[index]['product_name'];
        this.current_selected_product_img = this.customer_reviews_list_product[index]['product_img'];
        this.current_selected_product_review_data = this.customer_reviews_list_product[index]['product_review_data'];
        this.current_selected_product_name_highlight = this.customer_reviews_list_product[index]['product_name'];
    },
    page_require(page) {
      if (page == 0 || page == this.total_pages + 1) {
      } else {
          if (page == "...s") {
            this.page_no = Math.ceil((1 + this.page_no) / 2);
          } else if (page == "...l") {
            this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
          } else {
            this.page_no = page;
          }
          this.spinnerOn = true;
          this.get_review_rating();
      }
    },
    setpagination(page_no) {
      this.page_array = [];
      if (this.total_pages <= 7) {
        for (let i = 0; i < this.total_pages; i++) {
          this.page_array.push(i + 1);
        }
      } else if (page_no == 1) {
        for (let i = 0; i < 4; i++) {
          this.page_array.push(i + 1);
        }
        this.page_array.push("...l");
        this.page_array.push(this.total_pages);
      } else if (page_no == this.total_pages) {
        this.page_array.push(1);
        this.page_array.push("...s");
        for (let i = this.total_pages - 4; i < this.total_pages; i++) {
          this.page_array.push(i + 1);
        }
      } else if (page_no <= 4) {
        for (let i = 0; i < page_no + 3; i++) {
          this.page_array.push(i + 1);
        }
        this.page_array.push("...l");
        this.page_array.push(this.total_pages);
      } else if (page_no >= this.total_pages - 4) {
        this.page_array.push(1);
        this.page_array.push("...s");
        for (let i = page_no - 4; i < this.total_pages; i++) {
          this.page_array.push(i + 1);
        }
      } else {
        this.page_array.push(1);
        this.page_array.push("...s");
        for (let i = page_no - 3; i <= page_no + 3; i++) {
          this.page_array.push(i);
        }
        this.page_array.push("...l");
        this.page_array.push(this.total_pages);
      }
    },
    pagination_class(index) {
      if (index == this.page_no) {
        return " active";
      } else {
        return "";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.current-active-entity {
  background: rgba(0, 0, 0, 0.1) !important;
}
.table-box tbody tr:hover td,
.table-box tbody tr:hover th {
  background: #ececec;
}
.custom-button-box {
  border: 0.5px solid #ccc;
}
.vue-star-rating-pointer .vue-star-rating-star{
 margin-right: 10px !important;
 margin-bottom: 4px !important;
}
.img-thumbnail{
    height: 130px !important;
}
</style>