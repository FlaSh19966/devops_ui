<template>
  <div>
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div id="products_ranking_radio" class="p-0 ml-0" style="max-height: 500px;">
      <div class="col-sm-12 d-flex mb-3 p-0">
        <!-- <div class="col-sm-6" style="text-align: center;">
        <h4 class="mb-sm-0">Most Saleable Products</h4>
        </div>
        <div class="col-sm-6" style="text-align: center;">
        <h4 class="mb-sm-0">Least Saleable Products</h4>
        </div> -->
        <div class="radio my-auto">
          <label>
            <input
              type="radio"
              v-model="filter_products"
              value="Most"
            />
            <span class="icn" id="filter_portal_user_radio"></span>
            {{tlt('product_ranking_most_label')}}
          </label>
          <label>
            <input
              type="radio"
              v-model="filter_products"
              value="Least"
            />
            <span class="icn"></span> {{tlt('product_ranking_least_label')}}
          </label>
          <label>
            <input
              type="radio"
              v-model="filter_products"
              value="Unsold"
            />
            <span class="icn" id="filter_portal_user_radio"></span>
            {{tlt('product_ranking_unsold_label')}}
          </label>
        </div>
        <div class="form-group mb-0 ml-auto" style="width: 135px">
          <select
            class="form-control"
            style="padding: 5px 0px"
            @change="fetch_products_ranking()"            
            id="exampleFormControlSelect1"
          >
            <option value="Last 30 days">{{tlt('product_rank_dropdown_30_day_option')}}</option>
            <option value="Last 3 months">{{tlt('product_rank_dropdown_3_month_option')}}</option>
            <option value="Last 6 months">{{tlt('product_rank_dropdown_6_month_option')}}</option>
            <option value="Last 12 months">{{tlt('product_rank_dropdown_12_month_option')}}</option>
          </select>
        </div>
        <a
          href="#"
          class="darkblue-btn"
          @click="download_csv"
          title="Download CSV report"
          style="padding: 4px 13px; height: 33px; margin-left: 10px;"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="14"
            height="14"
          >
            <path
              d="M8.124046569796448,3.7048888423811563 V-0.0004725085692590319 H0.8684480275323758 C0.385950724471816,-0.0004725085692590319 -0.0022237975393094665,0.29105224477757613 -0.0022237975393094665,0.6534147886572829 v12.641821079713173 c0,0.3623625438797103 0.3881745220111289,0.6538872972265442 0.8706718250716886,0.6538872972265442 h12.18940555100364 c0.4824973030605619,0 0.8706718250716886,-0.2915247533468346 0.8706718250716886,-0.6538872972265442 V4.358776139607697 H8.994718394868137 c-0.47886950378942883,0 -0.8706718250716886,-0.2942492837519449 -0.8706718250716886,-0.6538872972265442 zm2.773452542780442,5.758567464241761 l-3.497924057225508,2.6073755976908415 c-0.24124865153028063,0.18009145977781071 -0.6308742932498614,0.18009145977781071 -0.872122944780142,0 l-3.497924057225508,-2.6073755976908415 C2.661306427325829,9.189096094828278 2.9196057354304337,8.718024787784655 3.437655471348084,8.718024787784655 H5.802255036271947 v-2.1796243240884783 c0,-0.24084848781177734 0.2597504278130543,-0.4359248648176966 0.5804478833811269,-0.4359248648176966 h1.1608957667622521 c0.3206974555680725,0 0.5804478833811269,0.1950763770059196 0.5804478833811269,0.4359248648176966 v2.1796243240884783 h2.3645995649238625 c0.5180497359176551,0 0.7763490440222554,0.47107130704362293 0.4088529778565816,0.7454315188382611 zM13.674579454628462,2.86028441679687 L10.122963968190199,0.1902446197884852 c-0.16325096720094195,-0.12260386822997718 -0.38454672273999646,-0.1907171283577423 -0.6167258760924463,-0.1907171283577423 H9.284942336558702 v3.4873989185415644 h4.643583067049007 v-0.16619635471174685 c0,-0.1716454155219681 -0.09069498177830096,-0.33784177023371487 -0.2539459489792431,-0.46044563846369135 z"
              fill="#fff"
            />
          </svg>
        </a>
        <button @click="show_swal_notification()"
         class="darkblue-btn"
         style="margin-left: 10px; cursor: pointer; font-size: 1rem; padding: 6px 15px;">{{tlt('product_rank_send_report_btn')}}
        </button>
      </div>
    </div>
    <div v-show="Boolean(most_products_list.length===0 && unsold_products_list.length===0) && !spinnerOn">
      <p class="text-center">
        <br>
        <strong>
          {{tlt('product_ranking_find_any_data_text')}}
        </strong>
      </p>
    </div> 
    <div v-if="Boolean((most_products_list.length > 0 || unsold_products_list.length> 0 )&& !spinnerOn)"
    class="col-sm-12 d-flex p-0">
      <div class="p-0" style="width: 100%" v-if="products_list.length>0 ">
        <div class="table-box">
          <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th style="color: #414141;" scope="col">#</th>
                <th style="text-align: left; color: #414141;" scope="col">{{tlt('product_ranking_name_label')}}</th>
                <th style="text-align: center; color: #414141;" scope="col">{{tlt('product_ranking_variant_label')}}</th>
                <th style="color: #414141;" scope="col">{{tlt('product_ranking_quantity_label')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(products, index) in products_list" :key="index">
                <td style="text-align: center;">{{ index + 1 }}</td>
                <td style="width: 200px">{{ products.title }}</td>
                <td style="text-align: center; width: 100px">{{ products.variant_title }}</td>
                <td style="text-align: center; width: 105px">
                  {{ products.quantity }}
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
        <!-- </div> -->
        <!-- <div class="col-sm-6">
          <div class="table-box">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Variant</th>
                      <th scope="col">Quantity Sold</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                    v-for="(products, index) in products_list"
                      :key="index"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>{{ products.title }}</td>
                      <td style="width: 100px;">{{ products.variant_title }}</td>
                      <td style="text-align: center; width: 105px;">{{ products.quantity }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api_calls from "@/portal/api_calls.js";
import Swal from "sweetalert2";
import { freeze_portal,show_subscription_expired_swal } from "@/portal/mixins";

export default {
  name: "ProductsRankingPage",
  mixins: [
    freeze_portal,
    show_subscription_expired_swal
  ],
  data() {
    return {
      spinnerOn: false,
      company_id: this.$session.get("UserInformation").company_id,
      company_name: this.$session.get("UserInformation").company_name,
      months: 10,
      products_list: null,
      most_products_list: [],
      least_products_list: [],
      unsold_products_list: [],
      filter_products: "Most",
      disable_btn_expired: false,
    };
  },
  mounted() {
    this.fetch_products_ranking();
    setTimeout(() => {
      this.freeze_portal();
    }, 1000);
    this.$root.$on("ProductsRankingPageDisabled", (data) => {
      if(data===true){
        this.disable_btn_expired = true;
      }
    });

  },
  watch: {
    filter_products() {
      if (this.filter_products == "Most") {
          this.products_list = this.most_products_list;
      } else if (this.filter_products == "Least") {
          this.products_list = this.least_products_list;
      } else if (this.filter_products == "Unsold") {
          this.products_list = this.unsold_products_list;
      }
    },
  },
  methods: {
    download_csv() {
      this.spinnerOn = true;
      var rows = [];
      var filename = "";

      var csv = "product_id,quantity,title,variant_id,variant_title\n";
      if(this.filter_products == 'Most'){
        filename = "Most saleable products report.csv";
      }else if(this.filter_products == 'Least'){
        filename = "Least saleable products report.csv";
      }else if(this.filter_products == 'Unsold'){
        filename = "Unsold products report.csv";
      }

      rows = this.products_list.map((obj) => Object.values(obj));
      rows.forEach(function (row) {
        csv += row.join(",");
        csv += "\n";
      });

      var hiddenElement = document.createElement("a");
      hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
      hiddenElement.target = "_blank";
      hiddenElement.download = filename;
      hiddenElement.click();
      this.spinnerOn = false;
    },
    fetch_products_ranking() {
      // if(event == undefined){
      //   console.log("coming here---")
      // }else{
      //   console.log(event)
      // }

      this.spinnerOn = true;
      if(event === undefined){
        this.months =1
      }
      else if (event.target.value == "Last 30 days") {
        this.months = 1;
      } else if (event.target.value == "Last 3 months") {
        this.months = 3;
      } else if (event.target.value == "Last 6 months") {
        this.months = 6;
      } else if (event.target.value == "Last 12 months") {
        this.months = 12;
      } else if (event.target.value == undefined) {
        this.months = 1;
      }
      axios
        .post(api_calls.products_report(), {
          company_id: this.company_id,
          company_name: this.company_name,
          records_timeline: this.months,
          is_get: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
          },
        })
        .then(({ data }) => {
          this.spinnerOn = false;
            this.most_products_list = data.data.sorted_list;
            this.least_products_list = [...data.data.sorted_list].reverse();
            this.unsold_products_list = data.data.unsold;
            if(this.filter_products == "Most"){
              this.products_list = this.most_products_list;
            }else if(this.filter_products == "Least"){
              this.products_list = this.least_products_list;
            }else if(this.filter_products == "Unsold"){
              this.products_list = this.unsold_products_list;
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
    },
    show_swal_notification(){
      if(!this.disable_btn_expired){
        Swal.fire({
            title: this.tlt('product_rank_swal_msg'),
            text: "You want to send a report                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: this.tlt('product_rank_swal_confirm_msg')
        }).then((result) => {
          if (result.value == true) {
            this.send_report()
          }
        })
      }else {
        this.show_subscription_expired_swal();
      }
    },
    send_report(){
      this.spinnerOn = true;
      // console.log(this.filter_products);
      axios
        .post(api_calls.products_report(), {
          company_id: this.company_id,
          company_name: this.company_name,
          records_timeline: this.months,
          is_send: true,
          report_type: this.filter_products
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
          },
        })
        .then(({ data }) => {
          this.spinnerOn = false;
          if(data.message.MSG_CODE  == this.api_status_code.REPORT_BEING_SENT_MODELS.MSG_CODE){
        
            Swal({
                type: "success",
                text: this.tlt('product_rank_swal_email_sent_msg'),
                allowOutsideClick: false,
                allowEscapeKey: false,
                timer: 2500,
              });
            
          }
          else if(data.message.MSG_CODE== this.api_status_code.INTERNAL_SERVER_ERROR_MODELS.MSG_CODE){
            Swal({
                type: this.tlt('product_rank_internal_server_msg'),
                allowOutsideClick: false,
                allowEscapeKey: false,
                timer: 2500,
              });
          }
        }).catch((e) => {
          console.log(e)
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
  },
};
</script>
<style scoped>
.darkblue-btn:hover {
  background: #192765;
  color: #fff;
}
.table th {
  border-top: none;
}
.table-responsive {
  max-height: 500px;
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
</style>