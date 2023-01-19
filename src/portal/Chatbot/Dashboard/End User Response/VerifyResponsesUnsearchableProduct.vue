<template>
  <div class="table-box">
    <div class="spinner" id="spinner" v-show="big_spinner"></div>
    <div class="table-responsive" style="overflow :visible;" v-if="product_list.length !=0 && user_query.length !=0">
      <table class="table">
          <thead>
          <tr>
            <th scope="col" style="width:12%; text-align:centre; !important">{{tlt('unsearch_action_label')}}</th>
            <th scope="col" style="width:70%; text-align:left; !important">{{tlt('unsearch_question_label')}}</th>
          </tr>
          </thead>
          <tbody>
            <tr
            v-for="(statement, index) in user_query"
            :key="index"
            > 
              <td
                class="action"
                style="padding: 10px 0px 10px 5px; text-align: center"
              >
                <a 
                href="#" 
                title="Add synonym"
                @click="assign_userquery(index)"
                data-toggle="modal"
                data-target="#addsynonyms"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15.392"
                    height="15.392"
                    viewBox="0 0 15.392 15.392"
                    data-toggle="modal"
                    data-target="#"
                  >
                    <path
                      id="square-edit-outline"
                      d="M4.71,3A1.7,1.7,0,0,0,3,4.71V16.682a1.71,1.71,0,0,0,1.71,1.71H16.682a1.71,1.71,0,0,0,1.71-1.71V10.7h-1.71v5.986H4.71V4.71H10.7V3H4.71m10.928.855a.591.591,0,0,0-.41.171L14.185,5.061,16.322,7.2l1.043-1.035a.578.578,0,0,0,0-.812L16.04,4.026a.571.571,0,0,0-.4-.171M13.578,5.668l-6.3,6.311v2.138H9.413l6.3-6.311Z"
                      transform="translate(-3 -3)"
                      fill="#9499ae"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  @click="delete_userquery(index)"
                  title="Delete"
                  id="single_delete_id"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13.682"
                    height="15.392"
                    viewBox="0 0 13.682 15.392"
                  >
                    <path
                      id="trash-can-outline"
                      d="M8.276,3v.855H4v1.71h.855V16.682a1.71,1.71,0,0,0,1.71,1.71h8.551a1.71,1.71,0,0,0,1.71-1.71V5.565h.855V3.855H13.406V3H8.276M6.565,5.565h8.551V16.682H6.565V5.565m1.71,1.71v7.7h1.71v-7.7H8.276m3.42,0v7.7h1.71v-7.7Z"
                      transform="translate(-4 -3)"
                      fill="#f23d3d"
                    />
                  </svg>
                </a>
              </td>
              <td style="text-align:left; !important">
                {{ statement.UserQuery}}
              </td>
            </tr>
          </tbody>
      </table>
    </div>  
    <div v-show="product_list.length ==0 || user_query.length ==0" class="mt-5">
      <h6 v-show="!big_spinner" class="text-center">{{tlt('no_unsearchable_product')}} </h6>
    </div>
    <div v-if="product_list.length !=0 && user_query.length !=0" class="pagin-table" style="margin-top:2%;margin-bottom:4%">
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a
              class="page-link"
              href="#"
              @click="page_require(page_no - 1)"
            >
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
            <a v-else class="page-link" href="#" @click="page_require(pageno)">{{
              pageno
            }}</a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              href="#"
              @click="page_require(page_no + 1)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8.667"
                height="15.204"
                viewBox="0 0 8.667 15.204"
              >
                <g
                  id="arrow-point-to-right"
                  transform="translate(-97.139 0)"
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
        </ul>
      </nav>
    </div>
    <div>
    <div
      class="modal fade dash-modal"
      id="addsynonyms"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addsynonymsTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content"  style="border-radius:20px;">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>{{tlt('add_synonym')}}</h3>
            </div>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="empty_variable"
            >
              <img src="/img/close-icn.png" alt />
            </button>
            <div class="d-flex">
              <span style="font-weight: 500;font-size: 1.2rem;!important">{{tlt('unsearchable_product_userquery')}}</span>
              <span @mouseup="selected_text()" style="margin-left: 5px;margin-top: 3px;">{{user_query_statment}}</span>
            </div>
            <div class="mb-1">
              <!-- <span>{select the alternate product name(Synonym) from above sentence product}</span> -->
               <span style="font-size:13px; opacity:0.6 !important">({{tlt('unsearchable_product_msg_select_syno')}})</span>
            </div>
            <div v-show="word_selected">
              <div class="d-flex">
                <div class="col-sm-9 pl-0">
                  <multiselect
                  :close-on-select="true"
                  :taggable="false"
                  track-by="product_name"
                  label="product_name"
                  :multiple="false"
                  :options="product_list"
                  v-model="selected_product"
                  :placeholder="tlt('search_product')"
                  >
                  </multiselect>
                </div>
                <span class="label1 mb-0 mt-2" style="padding-left: 5px;">
                  <button
                    type="button"
                    style="
                      cursor: pointer;
                      border: none;
                      background: transparent url('@portal/assets/img/plus.png')
                        0% 0% no-repeat padding-box;
                    "
                    @click="add_synonyms()"
                  >
                    <img src="/img/black_plus.png" alt="" />
                  </button>
                    {{tlt('unsearchable_product_add')}}
                </span>
              </div>
            </div>
            <div v-if="product_synonysm.length >0">
              <table class="table mt-3" style="box-shadow: 4px 2px 6px #bfbfbf;">
                <thead>
                  <tr>
                    <th scope="col" style="width:40%; text-align:centre;!important">{{tlt('unsearchable_product_name_label')}}</th>
                    <th scope="col" style="width:40%; text-align:centre; !important">{{tlt('unsearchable_synonym_label')}}</th>
                    <th scope="col" style="width:20%; text-align:centre; !important">{{tlt('unsearchable_untag_label')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(prouct_syno, idx) in product_synonysm"
                    :key="idx"
                  >
                    <td style="text-align:center; !important">{{prouct_syno.synonyms_tag}}</td>
                    <td style="text-align:center; !important">{{prouct_syno.product_tag}}</td>
                    <td style="cursor: pointer;text-align: center;" @click="remove_tag(idx)">
                        &times;
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="btn-wrap text-right" style="border: none; padding: 0px;">
              <button
                type="button"
                class="btn btn-link"
                data-dismiss="modal"
                @click="empty_variable()"
              >
                {{tlt('unanswered_edit_cancel_btn')}}
              </button>
              <button  class="darkblue-btn" id="save_btn" @click="save_synonyms">{{tlt('save_btn')}}</button>
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
import { setTimeout } from "timers";
import Multiselect from "vue-multiselect";
import {  close_modal } from "@/portal/mixins";

export default {
    name: 'verify_responses_unsearchproduct',
    components: {
        Multiselect,
    },
        mixins: [close_modal],
    data(){
        return{
          big_spinner: false,
          email: this.$session.get("UserInformation").email,
          companyname: this.$session.get("UserInformation").company_name,
          companyid: this.$session.get("UserInformation").company_id,
          per_page: 10,
          page_no: 1,
          retail_bot_template_id:null,
          checked_list:[],
          word_selected: false,
          highlighted_text: "",
          done_entities:[],
          selected_statement:"",
          product_list:[],
          user_query:[],
          user_query_statment: '',
          selected_product: '',
          product_synonysm :[],
          temp_product_syno: [],
          page_array: [],
          total_pages:null,
          number_of_rows:null,
          search_name: ""

        }
        
    },
    mounted(){
        let bot_templates_data = this.$session.get("BotTemplates");
        for (let i = 0; i < bot_templates_data.length; i++) {
        if (
            bot_templates_data[i].domain === "Retail" &&
            bot_templates_data[i].subscribed === true
        ) {
            this.retail_bot_template_id = bot_templates_data[i].template_id;
            break;
        }
        }
        this.$root.$on("search_user_responses", (data) => {
            this.search_name = data;
            this.search_question();
        });
        this.$root.$on("load_verify_responses_user_feedback", (data) => {
            this.usearchable_product_search();
        });
        this.$root.$on("sync_unserach_prodcut", (data) => {
          if(data === true){
            this.sync_products();
          }
        });
        this.$root.$emit("show_sync_button", true);
        this.usearchable_product_search();
        this.empty_variable();
    },
    methods: {
      usearchable_product_search(){
        this.big_spinner = true;
          axios
            .post(
              api_calls.unsearchable_prodcts(),
              {
                company_id: this.companyid,
                company_name: this.companyname,
                email: this.email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                is_get: true,
                template_id:this.retail_bot_template_id,
                page_no: 1,
                per_page: this.per_page
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              if(response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE){
                  this.big_spinner = false;
                  this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
                  this.total_pages =  response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
                  this.page_no = 1;
                  this.user_query = response.data.data.queries;
                  this.product_list = response.data.data.product_list;
                  this.setpagination(this.page_no);
              }else {
                Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2500,
                type: "error"
                });
            }
              }
            )
            .catch((e) => {
              this.big_spinner = false;
                console.log(e);
              if (
                e.response.status === 410 ||
                e.response.status === 440 ||
                e.response.status === 409
              ) {
                this.$root.$emit("Session_Expired", e.response.data);
              }
            })
      },
      empty_variable(){
        this.selected_product = '';
        this.word_selected = false; 
        this.entities_list_string = "";
        this.highlighted_text = '';
        this.product_synonysm = [];
      },
      selected_text(){
        if (window.getSelection) {
          if (
            window.getSelection().toString() != "" &&
            window.getSelection().toString().split(" ").join("") != ""
          ) {
            this.highlighted_text = window.getSelection().toString().trim();
            this.word_selected = true;
            // this.selected_statement = this.user_query[index].UserQuery;
          } else {
            this.highlighted_text = "";
          }
        } else if (document.selection) {
          document.selection.createRange().text;
        }
      },
      update_statements() {
        var words_list = this.highlighted_text.split(" ");
        var master_words_list = this.user_query_statment.split(" ");
        for (var i in words_list) {
          if (master_words_list.includes(words_list[i])) {
            if(this.temp_product_syno.length===0){
              let temp = {};
              temp["product"] = this.selected_product;
              temp["synonym"] = this.highlighted_text
              this.temp_product_syno.push(temp)
            }else {
              if(this.temp_product_syno.some(person => person.synonym === this.highlighted_text)){
                continue
              }else{
                let temp = {};
                temp["product"] = this.selected_product;
                temp["synonym"] = this.highlighted_text
                this.temp_product_syno.push(temp)
              }
            }
          }
        }
        this.selected_product = '';
        this.word_selected = false; 
        this.entities_list_string = "";
        this.highlighted_text = '';          
      },
      assign_userquery(index){
        this.user_query_statment = this.user_query[index].UserQuery;
      },
      add_synonyms(){
        if (this.selected_product != '' && this.highlighted_text !='')
        this.product_synonysm.push({
          synonyms_tag: this.selected_product.product_name,
          product_tag: this.highlighted_text
        })
        this.update_statements()
      },
      remove_tag(index){
        this.product_synonysm.splice(index, 1);
        this.temp_product_syno.splice(index,1)
      },
      save_synonyms(){
        if(this.temp_product_syno.length == 0) {
          Swal({
            text: this.tlt('unsearch_add_some_tags_msg'),
            toast: true,
            position: "top-end",
            type: "warning",
            showConfirmButton: false,
            timer: 2500,
          });
          return;
        }else{
         
            var temp ={};
            var final_product_syno =[];
            temp["Statement"]= this.user_query_statment;
            temp["data"] = this.temp_product_syno;
            final_product_syno.push(temp);
            axios
              .post(
                api_calls.unsearchable_prodcts(),
                {
                  company_id: this.companyid,
                  company_name: this.companyname,
                  email: this.email,
                  license_key: this.$session.get("UserInformation").license_key,
                  token: this.$session.get("UserInformation").tokens,
                  is_add: true,
                  template_id:this.retail_bot_template_id,
                  add_synonyms:final_product_syno
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                  $("#addsynonyms").modal("hide");
                  toastr.success(this.tlt('unsearch_synonyms_add_successful_msg'));
                  this.empty_variable();
                  this.usearchable_product_search();
                }
              )
              .catch((e) => {
                console.log(e);
                if (
                  e.response.status === 410 ||
                  e.response.status === 440 ||
                  e.response.status === 409
                ) {
                  this.$root.$emit("Session_Expired", e.response.data);
                }
              })
              this.close_modal('save_btn')
                  }
         
      },
      delete_userquery(index){
        this.product_synonysm = [];
        Swal.fire({
          title: this.tlt('unsearch_delete_swal_alert_msg'),
          text: this.tlt('unsearch_delete_this_query_msg'),
          type: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: this.tlt('unsearch_delete_swal_confirm_msg'),
        }).then((result) => {
          if (result.value) {
          var delete_userquery = this.user_query[index].UserQuery
          this.big_spinner = true;
          axios
            .post(
              api_calls.unsearchable_prodcts(),
              {
                company_id: this.companyid,
                company_name: this.companyname,
                email: this.email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                is_delete: true,
                template_id:this.retail_bot_template_id,
                delete_query:delete_userquery
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
                this.big_spinner = false;
                toastr.success(this.tlt('unsearch_swal_deleted_successful_msg'));
                this.usearchable_product_search()
              }
            )
            .catch((e) => {
              this.big_spinner = false;
                console.log(e);
              if (
                e.response.status === 410 ||
                e.response.status === 440 ||
                e.response.status === 409
              ) {
                this.$root.$emit("Session_Expired", e.response.data);
              }
            })
          }
        });
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
      clear_search_name() {
      this.search_name = "";
      },
      page_require(page) {
      if (page == 0 || page == this.total_pages + 1) {
      } else {
        if (this.search_name == "") {
          if (page == "...s") {
            this.page_no = Math.ceil((1 + this.page_no) / 2);
          } else if (page == "...l") {
            this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
          } else {
            this.page_no = page;
          }
          this.spinnerOn = true;
          axios
            .post(
              api_calls.unsearchable_prodcts(),
              {
                company_id: this.companyid,
                company_name: this.companyname,
                email: this.email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                is_get: true,
                template_id:this.retail_bot_template_id,
                page_no: this.page_no,
                per_page: this.per_page
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
                  this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
                  this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
                  this.user_query = response.data.data.queries;
                  this.product_list = response.data.data.product_list;
                  this.setpagination(this.page_no);
                }else {
                this.big_spinner = false;
                  Swal({
                  title: response.data.message.MSG_CODE,
                  text: response.data.message.MSG,
                  showCancelButton: false,
                  showConfirmButton: false,
                  timer: 2500,
                  type: "error"
                  });
               }

              }
            )
            .catch((e) => {
              this.big_spinner = false;
                console.log(e);
              if (
                e.response.status === 410 ||
                e.response.status === 440 ||
                e.response.status === 409
              ) {
                this.$root.$emit("Session_Expired", e.response.data);
              }
            })
        } else {
          if (this.pageno == "...s") {
            this.page_no = Math.ceil((1 + this.page_no) / 2);
          } else if (this.pageno == "...l") {
            this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
          } else {
            this.page_no = this.pageno;
          }
          this.spinnerOn = true;
          axios
            .post(
              api_calls.unsearchable_prodcts(),
              {
                company_id: this.companyid,
                company_name: this.companyname,
                email: this.email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                is_get: true,
                template_id:this.retail_bot_template_id,
                page_no: this.page_no,
                per_page: this.per_page
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
                  this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
                  this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
                  this.user_query = response.data.data.queries;
                  this.product_list = response.data.data.product_list;
                  this.setpagination(this.page_no);
                }else {
                  this.big_spinner = false;
                    Swal({
                    title: response.data.message.MSG_CODE,
                    text: response.data.message.MSG,
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 2500,
                    type: "error"
                    });
                 }
              }
            )
            .catch((e) => {
              this.big_spinner = false;
                console.log(e);
              if (
                e.response.status === 410 ||
                e.response.status === 440 ||
                e.response.status === 409
              ) {
                this.$root.$emit("Session_Expired", e.response.data);
              }
            })
        }
      }
      },
      search_question(){
        this.big_spinner = true;
          axios
            .post(
              api_calls.unsearchable_prodcts(),
              {
                company_id: this.companyid,
                company_name: this.companyname,
                email: this.email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                is_search: true,
                template_id:this.retail_bot_template_id,
                search_query:this.search_name,
                page_no: 1,
                per_page: this.per_page
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
                this.big_spinner = false;
                this.user_query  = [];
                this.product_list = [];
                if (response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE) {
                  this.number_of_rows =  response.data.pagination.total_data;
                  this.total_pages = response.data.pagination.total_page;
                  this.page_no = 1;
                  this.user_query = response.data.data.queries;
                  this.product_list = response.data.data.product_list;
                  this.setpagination(this.page_no);
                }else {
                  this.big_spinner = false;
                    Swal({
                    title: response.data.message.MSG_CODE,
                    text: response.data.message.MSG,
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 2500,
                    type: "error"
                    });
                 }
              }
            )
            .catch((e) => {
              this.big_spinner = false;
                console.log(e);
              if (
                e.response.status === 410 ||
                e.response.status === 440 ||
                e.response.status === 409
              ) {
                this.$root.$emit("Session_Expired", e.response.data);
              }
            })
      },
      sync_products() {
        Swal({
          title: this.tlt('unsearch_sync_swal_alert_msg'),
          text: this.tlt('unsearch_sync_product_data_msg'),
          type: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: this.tlt('unsearch_sync_swal_confirm_msg'),
        }).then((result) => {
          if (result.value) {
          this.big_spinner = true;
          axios
          .post(api_calls.template_synonyms(), {
            company_id: this.companyid,
            company_name: this.companyname,
            email: this.email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            template_id:this.retail_bot_template_id,
            page_no: 1,
            per_page: this.per_page,
            is_sync: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
          },
          })
          .then(({ data }) => {
            this.big_spinner = false;
            if (data.message.MSG_CODE === this.api_status_code.SYNC_INPROGRESS_MODELS.MSG_COD){
              Swal({
                title: this.tlt('unsearch_product_being_synced_msg'),
                text: this.tlt('unsearch_sync_in_progress_msg'),
                type: "info",
                showCancelButton: false,
                timer: 5500,
              })
            }else {
              Swal({
                title: this.tlt('unsearch_error_occur_msg'),
                text: this.tlt('unsearch_swal_try_again_msg'),
                type: "error",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
              });
            }
          }).catch((e) => {
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
        })
    },
    },
}
</script>