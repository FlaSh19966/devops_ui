<template>
  <div class="alternate_products">
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <!-- <div class="container"> -->
    <div class="col-sm-12 my-1">
      <div class="card-act col-sm-12 my-1">
        <div class="card-act d-flex ">
          <div class="col-sm-4 pl-0 flex-wrap">
            <input 
              class="form-control search-bar" 
              type="search"
              id="search_bar" 
              v-model.trim="searchQuery" 
              :placeholder="tlt('search_here')"
              style="width:99% !important; 
                height:36px !important; 
                display: inline-block !important;"
            />
            <a
              type="button"
              v-if="isVisibleSearchClear"
              class="btn bg-transparent mt-auto mb-auto py-0"
              @click="clear_search_name"
              style="margin-left: -40px; z-index: 10"
            >
              <img src="/img/close-icn.png" alt />
            </a>
          </div>
          <div class="col-sm-8 pr-0"
            style="display: flex;
            margin-bottom: 0.5rem;
            ">
            <button
              @click="sync_products"
              style="margin-right: 1rem"
              class="darkblue-btn ml-auto">
              {{tlt('alternate_product_syn_btn_label')}}
            </button>
            <button
              @click="train_model"
              style="margin-right: 1rem"
              :disabled="intent_ner_model_inprogress == true"
              :style="show_model_progress('style')"
              :title="show_model_progress('title')"
              id="alternate_product_name_train_model_btn"
              class="darkblue-btn">
              <i class="fa fa-spinner fa-spin" v-show="intent_ner_model_inprogress"></i>
              {{tlt('alternate_product_train_btn_label')}}
            </button>
            <button
              style="margin-right:0px !important;"
              id="alternate_product_name_save_all_btn"
              class="darkblue-btn d-block"
              @click="save_synonyms"
              v-if="Boolean(current_active_product) === true"
            >
              {{tlt('alternate_product_save_all_btn_label')}}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-12 d-flex">
      <div class="col-sm-4">
        <div class="d-flex" style="width: 100%; background: #F7F8FB;
    border: solid 1px #DBE2E8;">
          <div style="width: 16%;">
            <div class="form-check checkbox checkbox-success" style="padding: 10px;">
              <label class="form-check-label">
                <input
                  class="form-check-input"
                  id="selectall"
                  type="checkbox"
                  @click="selected_statements('all')"
                />
                <span class="icn"></span>
              </label>
            </div>
          </div>
          <p style="
                      margin: 0px;
                      width: 84%;
                      font: normal normal normal 16px/22px Roboto;
                      letter-spacing: 0px;
                      color: #414141;
                      padding: 10px;
                    "
          >{{tlt('alternate_product_name_label')}}</p>
        </div>
        <div class="table-box" v-if="Boolean(current_active_product) === true">
          <div class="table-responsive">
            <table class="table">
              <!-- <thead>
                <tr>
                  <th scope="col">
                    <div class="form-check checkbox checkbox-success">
                      <label class="form-check-label">
                        <input
                          class="form-check-input"
                          id="selectall"
                          type="checkbox"
                          @click="selected_statements('all')"
                        />
                        <span class="icn"></span>
                      </label>
                    </div>
                  </th>
                  <th
                    scope="col"
                    class="text-left"
                    style="
                      font: normal normal normal 16px/22px Roboto;
                      letter-spacing: 0px;
                      color: #414141;
                    "
                  >
                    <span> PRODUCT NAME </span>
                  </th>
                </tr>
              </thead> -->
              <tbody>
                <tr
                  v-for="(product, index) in resultQuery"
                  :key="index"
                  style="cursor: pointer"
                  :class="check_current_product_active(index)"
                >
                  <td scope="row">
                    <div class="form-check checkbox checkbox-success">
                      <label class="form-check-label">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          @change="selected_statements(index)"
                        />
                        <span class="icn"></span>
                      </label>
                    </div>
                  </td>
                  <td @click="set_current_product(index)">
                    {{ product.product_name }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-sm-8">
        <!-- <div class="table-responsive" v-if="spinnerOn"></div>
          <div class="table-responsive" v-if="product_names_list.length === 0"></div> -->
        <div
          class="table-responsive" id="table_id"
          v-if="Boolean(current_active_product) === true"
        >
          <div class="px-3 pt-3">
            <h6>{{ productName }}</h6>
          </div>
          <hr />
          <div class="card-act d-flex p-3">
            <input
              type="text"
              v-model.trim="alternate_product_name"
              class="form-control"
              :placeholder="tlt('add_product_name')"
              @keyup.enter="check_is_edit"
            />
            <button
              id="alternate_product_name_add_btn"
              class="darkblue-btn ml-2"
              @click="add_alternate_name"
              v-if="!is_edit_alternate_name"
            >
              {{tlt('alternate_product_add_btn_label')}}
            </button>
            <button
              class="darkblue-btn ml-2"
              @click="save_edit_alternate_name"
              v-if="is_edit_alternate_name"
            >
              {{tlt('alter_product_edit_btn')}}
            </button>
          </div>
          <div class="mt-5 p-3">
            <h5>{{tlt('alter_product_name_msg')}}  {{productName}}</h5>
            <div style="border-bottom: 1px solid #e3e2e5"></div>
            <div
              v-for="(alternate_name, index) in current_active_product.synonyms"
              :key="index"
              class="py-2 d-flex"
              :class="check_current_edit_synonym(index, null)"
            >
              <span> {{ alternate_name }} </span>
              <span
                class="ml-auto c-p edit-delete-span"
                @click="edit_alternate_name(index)"
              >
                <img
                  :src="require('@/portal/assets/img/edit-pencil-from-xd.svg')"
                  alt="Edit"
                />
              </span>
              <span
                class="ml-2 c-p edit-delete-span"
                @click="delete_alternate_name(index)"
              >
                <img
                  :src="require('@/portal/assets/img/delete-from-xd.svg')"
                  alt="Delete"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import axios from "axios";
import api_calls from "@/portal/api_calls.js";
import Swal from "sweetalert2";
import { freeze_portal, show_subscription_expired_swal} from "@/portal/mixins";

export default {
  name: "AlternateProductNamesPage",
  mixins: [
    freeze_portal,show_subscription_expired_swal
  ],
  data() {
    return {
      searchQuery: null,
      spinnerOn: false,
      company_id: this.$session.get("UserInformation").company_id,
      company_name: this.$session.get("UserInformation").company_name,
      // product_names_list: [],
      current_product_name: null,
      alternate_product_name: null,
      alternate_product_list: [],
      is_edit_alternate_name: false,
      current_edit_index: null,
      retail_bot_template_id: null,
      products_list_data: [],
      current_active_product: null,
      isVisibleSearchClear: false,
      want_status: true,
      intent_ner_model_inprogress: false,
      checked_list: [],
      disable_btn_expired: false,
    };
  },
  computed: {
    productName(){
      var products_name = ""
      if(this.checked_list.length != 0){
        var check = false;
        for (var i in this.checked_list){
          if (this.checked_list[i].product_name == this.current_active_product.product_name){
            check = true;
          }
        }
        if (check){
          var len = this.checked_list.length - 1;
          return products_name = this.current_active_product.product_name + (len > 0 ? " and " + (len > 0 ? len : '') + " more" : '');
        }else {
          return this.current_active_product.product_name;
        }
      }else {
        return this.current_active_product.product_name;
      }
    },
    resultQuery(){
      if(this.searchQuery){
        $("input:checkbox").prop("checked", false);
        this.checked_list = [];
      return this.products_list_data.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.product_name.toLowerCase().includes(v))
      })
      }else{
        $("input:checkbox").prop("checked", false);
        this.checked_list = [];
        return this.products_list_data;
      }
    },
    check_is_edit() {
      return this.is_edit_alternate_name
        ? this.save_edit_alternate_name
        : this.add_alternate_name;
    },
  },
  mounted() {
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
    this.$root.$on("send_model_status", data =>{
      if (data == true){
        this.check_intent_ner_model_status();
      }
    })
    var vm = this;
    $("#selectall").click(function () {
      if ($(this).is(":checked")) {
        // $('div:input').prop('checked',true);
        $("input:checkbox").prop("checked", true);
      } else {
        vm.checked_list = [];
        $("input:checkbox").prop("checked", false);
      }
    });
    // this.fetch_product_list();
    this.fetch_added_synonyms();
    setTimeout(() => {
      this.freeze_portal();
    }, 1000);
    this.check_intent_ner_model_status();
    this.$root.$on("AlternateProductNamesPageDisabled", (data) =>{
      if(data===true){
        this.disable_btn_expired = true;
      }
    })
  },
  watch:{
  searchQuery() {
      if (this.searchQuery === '' || this.searchQuery === null) {
        this.isVisibleSearchClear = false;
      } else if (this.searchQuery != null || this.searchQuery !='') {
        this.isVisibleSearchClear = true;
      }
      this.set_current_product(0);
    },
  },
  methods: {
    selected_statements(index) {
      if (index == "all") {
        this.checked_list = [];
        var role_length = this.resultQuery.length;
        for (var i = 0; i < role_length; i++) {
          this.checked_list.push(this.resultQuery[i]);
        }
      }else {
        if (event.target.checked == true) {
          if (!this.checked_list.includes(index)) {
            this.checked_list.push(this.resultQuery[index]);
          }
        } else if (event.target.checked == false) {
          var selectall = document.querySelector("#selectall");
          if (selectall.checked == true) {
            selectall.checked = false;
          }
          var temp = this.checked_list.filter((role)=> {
            return role !== this.resultQuery[index];
          });
          this.checked_list = temp;
        }
      }
    },
    check_intent_ner_model_status(){
    this.model_status = this.$session.get("ModelStatus");
    if (this.model_status == "No Failure"){
    this.intent_ner_model_inprogress = false;
    }
    else if (Boolean(this.model_status.intent_model) === true 
     || Boolean(this.model_status.ner_model) === true){
     if(this.model_status.intent_model == "InProgress"
      || this.model_status.ner_model == "InProgress"){
       this.intent_ner_model_inprogress = true;
     }
     else{
       this.intent_ner_model_inprogress = false;
     }
    }
    else{
      this.intent_ner_model_inprogress = false; 
    }
    },

    show_model_progress(index){
      if(this.intent_ner_model_inprogress == true){
         if (index == 'style'){
            return "cursor: not-allowed";
          }
          else if(index == 'title'){
              return this.tlt('alter_training_progress_msg');
          }
      }
      else{
        return null;
      }
    },
    clear_search_name() {
      this.searchQuery = null;
    },
    sync_products() {
      Swal({
        title: this.tlt('alter_product_swal_msg'),
        text: this.tlt('alter_product_sync_msg'),
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.tlt('alter_product_confirm_msg'),
      }).then((result) => {
        if (result.value) {
      this.spinnerOn = true;
      axios
        .post(api_calls.template_synonyms(), {
          company_id: this.company_id,
          company_name: this.company_name,
          template_id: this.retail_bot_template_id,
          is_sync: true,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
        },
        })
        .then(({ data }) => {
          this.spinnerOn = false;
          if (data.message.MSG_CODE == this.api_status_code.SYNC_INPROGRESS_MODELS.MSG_CODE){
            Swal({
              title: this.tlt('alter_product_synced_msg'),
              text: this.tlt('alter_product_in_progress_msg'),
              type: "info",
              showCancelButton: false,
              timer: 5500,
            })
          }else {
            Swal({
              title: this.tlt('alter_product_error_occurred_msg'),
              text: this.tlt('alter_product_swal_try_again_msg'),
              type: "error",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        }).catch((e) => {
          this.spinnerOn = false;
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
    fetch_added_synonyms() {
      this.spinnerOn = true;
      axios
        .post(api_calls.template_synonyms(), {
          company_id: this.company_id,
          company_name: this.company_name,
          template_id: this.retail_bot_template_id,
          is_get: true,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
        },
        })
        .then(({ data }) => {
          this.spinnerOn = false;
          if (data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE) {
            if (data.data.data.Synonyms.length > 0) {
              this.products_list_data = data.data.data.Synonyms;
              this.set_current_product(0);
            }
          }
          setTimeout(() => {
      this.freeze_portal();
    }, 1000);
        }).catch((e) => {
          this.spinnerOn = false;
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              this.$root.$emit("Session_Expired", e.response.data);
            }
          });
    },
    // fetch_product_list() {
    //   this.spinnerOn = true;
    //   axios
    //     .post(api_calls.template_synonyms(), {
    //       company_id: this.company_id,
    //       company_name: this.company_name,
    //       is_get_product_list: true,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${this.$session.get("at")}`,
    //     },
    //     })
    //     .then(({ data }) => {
    //       this.spinnerOn = false;
    //       if (data.status === "Success") {
    //         this.product_names_list = data.product_names_list;
    //         if (this.product_names_list.length > 0) {
    //           this.current_product_name = this.product_names_list[0];
    //         }
    //       }
    // setTimeout(() => {
    //   this.freeze_portal();
    // }, 1000);
    //     })
    //     .catch((e) => {
    //       this.spinnerOn = false;
    //         if (
    //           e.response.status === 410 ||
    //           e.response.status === 440 ||
    //           e.response.status === 409
    //         ) {
    //           this.$root.$emit("Session_Expired", e.response.data);
    //         }
    //       });
    // },
    add_alternate_name() {
      if(!this.disable_btn_expired){
      if (Boolean(this.alternate_product_name) === true){
        if(this.checked_list.length > 0){
          Swal.fire({
            title: this.tlt('alter_product_multiple_select_msg'),
            text: this.tlt('alter_product_name_msg1') + this.alternate_product_name + this.tlt('alter_product_name_msg3'),
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          }).then((result) => {
            if (result.value) {
              for (var i in this.checked_list){
                for (var j in this.products_list_data){
                  if (this.checked_list[i].id == this.products_list_data[j].id){
                    this.products_list_data[j].synonyms.push(this.alternate_product_name);
                  }
                }
              }
              this.alternate_product_name = null;
            }else {
              this.alternate_product_name = null;
            }
          });
        }else {
          this.current_active_product.synonyms.push(this.alternate_product_name);
          this.alternate_product_name = null;
        }
      }}else{
        this.show_subscription_expired_swal();
      }
    },
    edit_alternate_name(index) {
      window.scrollTo(0, 0);
      document.getElementById("table_id").scrollTop = 0;
      if (!this.is_edit_alternate_name) {
        this.alternate_product_name = this.current_active_product.synonyms[
          index
        ];
        this.current_edit_index = index;
        this.is_edit_alternate_name = true;
      } else {
        this.reset_edit();
      }
    },
    save_edit_alternate_name() {
      this.current_active_product.synonyms[
        this.current_edit_index
      ] = this.alternate_product_name;
      this.reset_edit();
    },
    delete_alternate_name(index) {
      this.current_active_product.synonyms.splice(index, 1);
    },
    reset_edit() {
      this.is_edit_alternate_name = false;
      this.current_edit_index = null;
      this.alternate_product_name = null;
    },
    set_current_product(index) {
      this.reset_edit();
      this.current_active_product = this.resultQuery[index];
    },
    check_current_product_active(index) {
      if (Boolean(this.current_active_product) === true) {
        return this.current_active_product.id ===
          this.resultQuery[index].id
          ? "current-active-product"
          : null;
      }
    },
    check_current_edit_synonym(index, tag) {
      if (Boolean(this.is_edit_alternate_name) === true) {
        if (tag === "span") {
          return "not-current-edit-synonym-span";
        } else {
          return this.current_edit_index === index
            ? "current-edit-synonym"
            : "not-current-edit-synonym";
        }
      } else {
        return "not-editing-synonyms";
      }
    },
    save_synonyms() {
      if(!this.disable_btn_expired){
      Swal.fire({
        title: this.tlt('alter_product_swal_save_msg'),
        text: this.tlt('alter_product_swal_save_msg1'),
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.tlt('alter_product_swal_confirm_msg'),
      }).then((result) => {
        if (result.value) {
          this.spinnerOn = true;
          axios
            .post(api_calls.template_synonyms(), {
              company_name: this.$session.get("UserInformation").company_name,
              company_id: this.$session.get("UserInformation").company_id,
              is_add_or_edit: true,
              template_id: this.retail_bot_template_id,
              synonyms: this.products_list_data
            },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
        },
        })
            .then((response) => {
              this.spinnerOn = false;
              if (
               response.data.message.MSG_CODE == this.api_status_code.TEMPLATE_SYNONYMS_UPDATED_SUCCESSFULLY_MODELS.MSG_CODE
              ) {
                Swal({
                  text:
                    this.tlt('alter_product_data_reflect_msg'),
                  type: "success",
                  showConfirmButton: true,
                  // timer: 5000,
                });
              } else {
                Swal({
                  text: this.tlt('alter_product_some_error_msg1'),
                  type: "error",
                  showConfirmButton: false,
                  timer: 2500,
                });
              }
              this.checked_list = [];
              $("input:checkbox").prop("checked", false);
            })
            .catch((e) => {
              this.spinnerOn = false;
              Swal({
                text: this.tlt('alter_product_some_error__msg2'),
                type: "error",
                showConfirmButton: false,
                timer: 2500,
              });
              if (
                Boolean(e.response) === true &&
                (e.response.status === 410 ||
                  e.response.status === 440 ||
                  e.response.status === 409)
              ) {
                this.$root.$emit("Session_Expired", e.response.data);
              }
            });
        }
      });}else{
        this.show_subscription_expired_swal();
      }
    },
    train_model() {
      if(!this.disable_btn_expired){
      Swal({
        title: this.tlt('alter_product_swal_model_msg'),
        text: this.tlt('alter_product_train_model_msg'),
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.tlt('alter_product_swal_confirm_msg'),
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.value) {
          this.spinnerOn = true;
          axios
            .post(
              api_calls.train_intent_ner_model(),
              {
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                subscription: this.$session.get("UserInformation").subscription,
                company_name: this.$session.get("UserInformation").company_name,
                company_id: this.$session.get("UserInformation").company_id,
                update_model: true,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              this.want_status = true;
              this.$root.$emit("want_model_status",this.want_status);
              this.check_intent_ner_model_status();
              if(response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
                toastr.error(this.tlt('alter_product_internal_server_msg'));
              }else if(response.data.message.MSG_CODE == this.api_status_code.TRAINING_LIMIT_EXCEED_MODELS.MSG_CODE){
                  Swal({
                  title: response.data.message.MSG_CODE,
                  text: response.data.message.MSG,
                  showCancelButton: false,
                  showConfirmButton: false,
                  timer: 2500,
                  type:"error"
                  
                })
              }
              else{
                  Swal({
                  title: response.data.message.MSG_CODE,
                  text: response.data.message.MSG,
                  showCancelButton: false,
                  showConfirmButton: false,
                  timer: 2500,
                  
                })
              }
            })
            .catch((e) => {
              this.spinnerOn = false;
              if (
                e.response.status === 410 ||
                e.response.status === 440 ||
                e.response.status === 409
              ) {
                this.$root.$emit("Session_Expired", e.response.data);
              }
            });
        }
      });}else{
        this.show_subscription_expired_swal();
      }
    },
  },
};
</script>

<style scoped>
.alternate_products {
  font-family: "Roboto";
}
.table-box tbody tr:hover td,
.table-box tbody tr:hover th {
  background: #ececec;
}
.table th {
  border-top: none;
}
.table-responsive {
  height: 75vh;
  overflow-y: auto;
  border: 1px solid #e3e2e5;
}
.table-responsive thead th {
  top: 0;
  position: sticky;
}
.table-responsive::-webkit-scrollbar {
  max-height: 10px;
  width: 7px;
  height: 7px;
  border-radius: 10px;
  overflow-x: hidden;
}
.table-responsive::-webkit-scrollbar-track {
  background: #ffffff;
  border-radius: 10px;
}
.table-responsive::-webkit-scrollbar-thumb {
  background: #27397b;
  border-radius: 10px;
}
.table-responsive::-webkit-scrollbar-thumb:hover {
  background: #19295f;
  border-radius: 10px;
}
.form-control {
  line-height: 16px;
  padding: 10px 15px;
}
.current-active-product {
  background: rgba(0, 0, 0, 0.1);
}
.current-edit-synonym {
  transform: scale(1.02);
  border: 1px solid #27397b;
  z-index: 2;
  background: #dddddd;
  padding: 0.5rem;
}
.not-current-edit-synonym {
  opacity: 0.2;
  pointer-events: none;
}
.not-editing-synonyms {
  border-bottom: 1px solid #e3e2e5;
}
/* .darkblue-btn {
  font-family: "Roboto";
  font-weight: 500;
  border-radius: 0;
} */
</style>
