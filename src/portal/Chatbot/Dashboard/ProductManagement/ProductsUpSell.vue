<template>
  <div>
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="container">
      <div class="col-sm-12 my-1 p-0">
        <div class="card-act col-sm-12 p-0">
          <button
            id="product_upsell_save_all_btn"
            class="darkblue-btn d-block ml-auto"
            @click="save_product_details"
            v-if="Boolean(current_product) === true"
          >
            {{tlt('product_config_upsell_save_all_btn')}}
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4">
          <div class="table-box" v-if="Boolean(current_product) === true">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      class="text-left"
                      style="
                      font: normal normal normal 16px/22px Roboto;
                      letter-spacing: 0px;
                      color: #414141;
                    "
                    >
                      {{tlt('product_config_upsell_prod_name_label')}}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(product, index) in product_data_list"
                    :key="index"
                    style="cursor: pointer"
                    @click="set_current_product(index)"
                    :class="check_current_product_active(index)"
                  >
                    <td>
                      {{ product.title }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-sm-8" style="overflow :visible;">
          <div
            class="table-responsive"
            v-if="Boolean(current_product) === true"
          >
            <div class="px-3 pt-3">
              <h6>{{ current_product.title }}</h6>
            </div>
            <hr />
            <div class="d-flex px-3 pt-3">
              <multiselect
                v-model="current_product.up_sell_products_list"
                :options="up_sell_products"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                open-direction="bottom"
                :placeholder="tlt('pick_product_label')"
                label="title"
                track-by="id"
                :max="limit_up_sell"
              >
                <template slot="selection" slot-scope="{ values, isOpen }"
                  ><span
                    class="multiselect__single"
                    v-if="values.length && !isOpen"
                    >{{ values.length }} {{tlt('upsell_product_selected_msg')}}</span
                  ></template
                >
                <template slot="maxElements"
                  ><span class="multiselect_single"
                    >{{tlt('upsell_max_of_msg1')}} {{ tlt('upsell_max_of_msg2') }} {{tlt('upsell_max_of_msg3')}}</span
                  ></template
                >
                <template slot="tag">{{ "" }}</template>
              </multiselect>
            </div>
            <p v-show="current_product.up_sell_products_list.length > limit_up_sell" class="p-3">{{tlt('upsell_max_of_product_msg1')}} {{ tlt('upsell_max_of_product_msg2') }} {{tlt('upsell_max_of_product_msg3')}}</p>
            <div class="mt-5 p-3">
              <h5>{{tlt('upsell_max_of_product_msg4')}} {{ current_product.title }}</h5>
              <div style="border-bottom: 1px solid #e3e2e5"></div>
              <div
                v-for="(product,
                index) in current_product.up_sell_products_list"
                :key="index"
                style="border-bottom: 1px solid #e3e2e5"
                class="py-2 d-flex"
              >
                <span> {{ product.title }} </span>
                <span
                  class="ml-auto c-p"
                  @click="remove_button_product_upsell_name(index)"
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api_calls from "@/portal/api_calls.js";
import Multiselect from "vue-multiselect";
import Swal from "sweetalert2";
import { freeze_portal,show_subscription_expired_swal } from "@/portal/mixins";

export default {
  name: "ProductsUpsellPage",
  components: {
    Multiselect
  },
  mixins: [freeze_portal, show_subscription_expired_swal],
  data() {
    return {
      spinnerOn: false,
      isOpen: false,
      company_id: this.$session.get("UserInformation").company_id,
      company_name: this.$session.get("UserInformation").company_name,
      product_data_list: [],
      // new_product_data_list: [],
      up_sell_products: [],
      current_product: null,
      limit_up_sell: null,
      retail_web_framework: "",
      disable_btn_expired:false
    };
  },
  mounted() {
    setTimeout(() => {
              this.freeze_portal();
            }, 1000);
    this.retail_web_framework = this.$session.get("retail_web_framework");
    // this.fetch_product_list();
    this.upsell_crosssell_products_data();
    this.limit_upsell_products();
    this.$root.$on("ProductsUpsellPageDisabled", (data) =>{
      if(data===true){
        this.disable_btn_expired = true;
      }
    })
  },
  methods: {
    save_product_details() {
      if(!this.disable_btn_expired){
      Swal.fire({
        title: this.tlt('upsell_swal_msg'),
        text: this.tlt('upsell_save_product_msg'),
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.tlt('upsell_swal_confirm_msg')
      }).then(result => {
        if (result.value) {
          this.spinnerOn = true;
          axios
            .post(
              api_calls.upsell_crosssell(),
              {
                company_id: this.company_id,
                company_name: this.company_name,
                is_save_edit: true,
                products_data: this.product_data_list,
                is_upsell_data: true
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`
                }
              }
            )
            .then(response => {
              this.spinnerOn = false;
              if (response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE) {
                Swal({
                  type: "success",
                  text: this.tlt('upsell_data_added_confirm_msg'),
                  timer: 2500
                }).then(result => {
                  this.upsell_crosssell_products_data();
                });
              }
            })
            .catch(e => {
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
      });
      }else{
        this.show_subscription_expired_swal();
      }
    },
    // fetch_product_list() {
    //   this.spinnerOn = true;
    //   axios
    //     .post(
    //       api_calls.template_synonyms(),
    //       {
    //         company_id: this.company_id,
    //         company_name: this.company_name,
    //         is_get_product_list: true
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${this.$session.get("at")}`
    //         }
    //       }
    //     )
    //     .then(({ data }) => {
    //       // console.log(data);
    //       if (data.status === "Success") {
    //         var temp;
    //         temp = data.products_data;
    //         if (this.retail_web_framework == "woocommerce") {
    //           for (var i in temp) {
    //             this.new_product_data_list.push({
    //               id: temp[i].id,
    //               title: temp[i].name,
    //               up_sell_products_list: []
    //             });
    //             this.up_sell_products.push({
    //               id: temp[i].id,
    //               title: temp[i].name
    //             });
    //           }  
    //         }else if(this.retail_web_framework == "shopify"){
    //           for (var i in temp) {
    //             this.new_product_data_list.push({
    //               id: temp[i].id,
    //               title: temp[i].title,
    //               up_sell_products_list: []
    //             });
    //             this.up_sell_products.push({
    //               id: temp[i].id,
    //               title: temp[i].title
    //             });
    //           }
    //         }
    //         // console.log("product data", this.product_data_list);
    //         // this.spinnerOn = false;
    //         this.upsell_crosssell_products_data();
    //       }
    //     })
    //     .catch(e => {
    //       this.spinnerOn = false;
    //       if (
    //         e.response.status === 410 ||
    //         e.response.status === 440 ||
    //         e.response.status === 409
    //       ) {
    //         this.$root.$emit("Session_Expired", e.response.data);
    //       }
    //     });
    // },
    upsell_crosssell_products_data() {
      this.product_data_list = [];
      this.spinnerOn = true;
      axios
        .post(
          api_calls.upsell_crosssell(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            is_get: true,
            is_upsell_data: true
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          }
        )
        .then(response => {
          if (response.data.data != null && response.data.data.response_data != null) {
            var temp = response.data.data.response_data.up_sell;
            for (var i in temp) {
              this.product_data_list.push({
                id: temp[i].id,
                title: temp[i].title,
                up_sell_products_list: temp[i].up_sell_products_list ? temp[i].up_sell_products_list : [] 
              });
              this.up_sell_products.push({
                  id: temp[i].id,
                  title: temp[i].title
                });
            }
            // console.log("before old product data",this.product_data_list);
            // var temp2 = this.new_product_data_list;
            // var temp3 = this.product_data_list;

            // var res = temp2.filter(
            //   item1 =>
            //     !temp3.some(
            //       item2 => item2.id === item1.id && item2.name === item1.name
            //     )
            // );
            // // console.log(res);
            // for (var i in res) {
            //   this.product_data_list.push({
            //     id: res[i].id,
            //     title: res[i].title,
            //     up_sell_products_list: []
            //   });
            // }
            // console.log("after old product data",this.product_data_list);
            if (this.product_data_list.length > 0) {
              this.current_product = this.product_data_list[0];
            }
            setTimeout(() => {
              this.freeze_portal();
            }, 1000);
          }
           this.spinnerOn = false;
        })
        .catch(e => {
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
    limit_upsell_products() {
      this.limit_up_sell = 10;
      axios
        .post(
          api_calls.product_settings(),
          {
            company_name: this.company_name,
            company_id: this.company_id,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            is_get: true
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          }
        )
        .then(response => {
          if (
            response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE 
          ) {
            
            if(this.retail_web_framework == "woocommerce"){
              this.limit_up_sell = response.data.data.woocommerce_details.limit_up_sell;
            }
            else if(this.retail_web_framework == "shopify"){
              this.limit_up_sell = response.data.data.shopify_details.limit_up_sell;
            }
            else if(this.retail_web_framework == "magento"){
              this.limit_cross_sell = response.data.data.magento_details.limit_up_sell;
            }
          } else {
            toastr.error(this.tlt('upsell_internal_server_alert'));
          }
        })
        .catch(e => {
          this.spinnerOn = false;
          toastr.error(this.tlt('upsell_error_occurred_alert'));
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    check_current_product_active(index) {
      if (Boolean(this.current_product) === true) {
        return this.current_product.title ===
          this.product_data_list[index].title
          ? "current-product"
          : null;
      }
    },
    remove_button_product_upsell_name(index) {
      this.current_product.up_sell_products_list.splice(index, 1);
    },
    set_current_product(index) {
      this.current_product = this.product_data_list[index];
    }
  }
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
  height: 100vh;
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
.current-product {
  background: rgba(0, 0, 0, 0.1);
}
</style>
