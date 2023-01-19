<template>
  <div>
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="col-sm-12 mb-1 d-flex px-0">
      <span class="disc-coupon-code-heading">{{tlt('coupon_codes_discount_header')}}</span>
      <button
        @click="sync_coupons"
        style="margin-right: 1rem"
        class="darkblue-btn ml-auto">
        {{tlt('coupon_codes_sync_btn_label')}}
      </button>
      <button
        id="save_coupon_codes_button"
        type="button"
        class="darkblue-btn my-auto"
        title="Save Coupon Details"
        @click="save_all_coupon_codes_data()"
        v-if="company_coupon_codes.length > 0"
      >
        {{tlt('coupon_codes_save_all_btn_label')}}
      </button>
    </div>
    <div class="col-sm-12 d-flex p-0">
      <div class="p-0" style="width: 100%">
        <div class="table-box">
          <div class="table-responsive">
            <table
              class="table table-bordered"
              v-if="company_coupon_codes.length > 0"
            >
              <thead>
                <tr>
                  <th style="color: #414141" scope="col">#</th>
                  <th style="text-align: center; color: #414141" scope="col">
                    {{tlt('coupon_codes_name_table_label')}}
                  </th>
                  <th style="color: #414141" scope="col">{{tlt('coupon_codes_discount_table_label')}}</th>
                  <th style="text-align: center; color: #414141" scope="col">
                    {{tlt('coupon_codes_date_created_table_label')}}
                  </th>
                  <th style="color: #414141" scope="col">{{tlt('coupon_codes_starts_at_table_label')}}</th>
                  <th style="color: #414141" scope="col">{{tlt('coupon_codes_ends_at_table_label')}}</th>
                  <th style="color: #414141" scope="col">{{tlt('coupon_codes_visible_on_bot_label')}}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(coupon, index) in company_coupon_codes"
                  :key="index"
                >
                  <td style="text-align: center">{{ index + 1 }}</td>
                  <td style="text-align: center; width: auto">
                    <!-- {{ Object.keys(coupon) }} -->
                    {{ Boolean(coupon.title) ? coupon.title: coupon.discount_code  }}
                  </td>
                  <td style="text-align: center; width: auto">
                    {{ coupon.discount_code }}
                  </td>
                  <td style="text-align: center; width: auto">
                    {{ format_date(coupon.created_at) }}
                  </td>
                  <td style="text-align: center; width: auto">
                    {{ format_date(coupon.starts_at) }}
                  </td>
                  <td style="text-align: center; width: auto">
                    {{ format_date(coupon.ends_at) }}
                  </td>
                  <td style="text-align: center; width: auto">
                    <!-- {{ coupon.visible_on_bot }} -->
                    <label class="switch" style="margin-top: 0px">
                      <input
                        type="checkbox"
                        v-model="coupon.visible_on_bot"
                        id="email_required_id"
                      />
                      <span
                        class="slider round"
                        style="border-radius: 20px"
                      ></span>
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="text-center" v-else-if="company_coupon_codes.length == 0 & !spinnerOn">
               <h6> {{tlt('coupon_codes_no_codes_text')}} </h6>
            </div>
          </div>
          <div class="pagin-table" style="margin: 0" v-if="company_coupon_codes.length > 0">
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <li class="page-item">
                  <a
                    class="page-link"
                    href="#"
                    @click="page_change(page_no - 1)"
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
                    @click="page_change(pageno)"
                    >...</a
                  >
                  <a
                    v-if="pageno != '...s' && pageno != '...l'"
                    class="page-link"
                    href="#"
                    @click="page_change(pageno)"
                    >{{ pageno }}</a
                  >
                </li>
                <li class="page-item">
                  <a
                    class="page-link"
                    href="#"
                    @click="page_change(page_no + 1)"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api_calls from "@/portal/api_calls";
import swal from "sweetalert2";
import moment from "moment";
import { freeze_portal, show_subscription_expired_swal } from "@/portal/mixins";

export default {
  name: "CouponCodes",
  mixins: [freeze_portal, show_subscription_expired_swal],
  data() {
    return {
      spinnerOn: false,
      company_id: this.$session.get("UserInformation").company_id,
      company_name: this.$session.get("UserInformation").company_name,
      company_coupon_codes: [],
      per_page: 10,
      total_pages: null,
      number_of_rows: null,
      page_no: 1,
      page_array: [],
      disable_btn_expired: false,
    };
  },
  mounted() {
    this.get_all_coupon_codes();
    setTimeout(() => {
      this.freeze_portal();
    }, 3000);
    this.$root.$on("CouponCodesDisabled", (data) =>{
      if(data===true){
        this.disable_btn_expired = true
      }
    });
  },
  methods: {
    sync_coupons() {
      this.spinnerOn = true;
      axios
        .post(api_calls.retail_coupon_codes(), {
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
            if (data.message.MSG_CODE == this.api_status_code.COUPONS_FOUND_MODELS.MSG_CODE){
              swal({
              title: "Latest coupons are synced",
              type: "success",
              showCancelButton: false,
              timer: 2500,
            })
            this.get_all_coupon_codes();
            }
            else if (data.message.MSG_CODE == this.api_status_code.NO_COUPONS_FOUND_MODELS.MSG_CODE){
              swal({
              title: "No Coupons found",
              type: "warning",
              showCancelButton: false,
              timer: 2500,
            })
            }
          else {
             swal({
              title: "Some Error Occurred!",
              text: "Please try again!",
              type: "error",
              showCancelButton: false,
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
    get_all_coupon_codes() {
      this.spinnerOn = true;
      axios
        .post(
          api_calls.retail_coupon_codes(),
          {
            is_get: true,
            company_id: this.company_id,
            company_name: this.company_name,
            page_no: this.page_no,
            per_page: this.per_page,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then(({ data }) => {    
          this.spinnerOn = false;
          if (data.message.MSG_CODE === this.api_status_code.NO_DISCOUNT_COUPONS_FOUND_MODELS.MSG_CODE) {
            this.company_coupon_codes = [];
          } else if (data.message.MSG_CODE === this.api_status_code.DISCOUNT_COUPONS_FOUND_MODELS.MSG_CODE) {
            this.company_coupon_codes = data.data;
            this.total_pages = data.pagination.total_page;
            for (let i = 0; i < this.company_coupon_codes.length; i++) {
              if (
                ![true, false].includes(
                  this.company_coupon_codes[i].visible_on_bot
                )
              ) {
                this.company_coupon_codes[i].visible_on_bot = false;
              }
              // this.company_coupon_codes[i].date_valid =
              //   this.check_valid_end_date(this.company_coupon_codes[i].ends_at);
            }
            this.company_coupon_codes.sort((a, b) =>
              a.visible_on_bot < b.visible_on_bot ? 1 : -1
            );
            this.setpagination(this.page_no);
          }
        })
        .catch((e) => {
          this.spinnerOn = false;
          swal({
            title: "Some Error Occurred",
            text: "Please Refresh or Try Again!",
            type: "error",
            showCancelButton: false,
          });
          if (Boolean(e.response)) {
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              this.$root.$emit("Session_Expired", e.response.data);
            }
          }
        });
    },
    format_date(date) {
      if(date == null) {
        return "N/A"
      }
      return moment(date).format("Do MMM YYYY");
    },
    check_valid_end_date(end_date) {
      let current_date = new Date();
      end_date = new Date(end_date);
      if (current_date.getTime() > end_date.getTime()) {
        return false;
      }
      return true;
    },
    save_all_coupon_codes_data() {
      if(!this.disable_btn_expired){
      swal({
        title: "Are you sure?",
        text: " You want to save this coupons data?",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm!",
      }).then((result) => {
        if (result.value) {
          this.spinnerOn = true;
          axios
            .post(
              api_calls.retail_coupon_codes(),
              {
                is_save: true,
                company_id: this.company_id,
                company_name: this.company_name,
                company_coupon_codes: this.company_coupon_codes,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then(({ data }) => {
              this.spinnerOn = false;
              if (data.message.MSG_CODE === this.api_status_code.DISCOUNT_COUPONS_UPDATED_MODELS.MSG_CODE) {
                swal({
                  title: "Success!",
                  text: " Your coupons data is saved successfully",
                  type: "success",
                  showCancelButton: false,
                });
                this.get_all_coupon_codes();
              } else {
                swal({
                  title: "Some Error Occurred!",
                  text: "Please try again!",
                  type: "success",
                  showCancelButton: false,
                });
              }
            })
            .catch((e) => {
              this.spinnerOn = false;
              swal({
                title: "Some Error Occurred",
                text: "Please Refresh or Try Again!",
                type: "error",
                showCancelButton: false,
              });
              if (Boolean(e.response)) {
                if (
                  e.response.status === 410 ||
                  e.response.status === 440 ||
                  e.response.status === 409
                ) {
                  this.$root.$emit("Session_Expired", e.response.data);
                }
              }
            });
        }
      });}else{
        this.show_subscription_expired_swal()
      }
    },
    pagination_class(index) {
      if (index == this.page_no) {
        return " active";
      } else {
        return "";
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
    page_change(pageno) {
      if (pageno == 0 || pageno == this.total_pages + 1) {
      } else {
        if (pageno == "...s") {
          this.page_no = Math.ceil((1 + this.page_no) / 2);
        } else if (pageno == "...l") {
          this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
        } else {
          this.page_no = pageno;
        }
        this.get_all_coupon_codes();
      }
    },
  },
};
</script>

<style scoped>
.switch {
  margin-left: 1rem;
}
.disc-coupon-code-heading {
  font-size: 1.25rem;
  font-weight: bold;
}
.darkblue-btn {
  font-size: 14px !important;
  padding: 6px 15px !important;
}
</style>
