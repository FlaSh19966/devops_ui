<template>
  <div>
    <div class="spinner" v-show="show_loader" id="spinner"></div>
    <div class="dash-cont">
      <div class="container-fluid">
        <div class="card dash-card">
          <div class="card-header d-block d-sm-flex flex-wrap justify-content-between">
            <h4 class="mb-sm-0">Payment Details</h4>
            <div class="card-act d-flex flex-wrap">
              <a
                href="#"
                class="darkblue-btn"
                data-toggle="modal"
                data-target="#payment_details_modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13.997"
                  viewBox="0 0 14 13.997"
                >
                  <path
                    id="Union_13"
                    data-name="Union 13"
                    d="M-12684,2058v-5h-5a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5v-5a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5h5a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5v5a1,1,0,0,1-1,1A1,1,0,0,1-12684,2058Z"
                    transform="translate(12690.001 -2045.002)"
                    fill="#fff"
                  />
                </svg>
                Account Details
              </a>
              <!-- <a href="#" class="red-btn" @click="delete_selected">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                  <path
                    d="M8.375,3v.778H4V5.333h.875V15.444A1.661,1.661,0,0,0,6.625,17h8.75a1.661,1.661,0,0,0,1.75-1.556V5.333H18V3.778H13.625V3H8.375M6.625,5.333h8.75V15.444H6.625V5.333m1.75,1.556v7h1.75v-7H8.375m3.5,0v7h1.75v-7Z"
                    transform="translate(-4 -3)"
                    fill="#fff"
                  ></path>
                </svg>
                Delete
              </a>-->
            </div>
          </div>
          <div class="card-body">
            <div class="table-box" v-show="user_role=='SuperAdmin'">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" style="width:10%;">COMPANY NAME</th>
                      <th scope="col" style="width:10%">PAYMENT ID</th>
                      <th scope="col" style="width:10%">TOP-UP AMOUNT</th>
                      <th scope="col" style="width:25%">TOP-UP DATE</th>
                      <th scope="col" style="width:5%">BALANCE</th>
                      <th scope="col" style="width:5%">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(payment, index) in payment_list" :key="index">
                      <td style="text-align: center;">{{ payment.company_name }}</td>
                      <td style="vertical-align: top;">
                        <tr v-for="(id, index) in payment.payment_id" :key="index">
                          <td style="width:100%;text-align: center;" v-show="index%2==0">
                            <a href="#" @click="payment_status(id)">{{ id }}</a>
                          </td>
                          <td style="width:100%;text-align: center;" v-show="index%2==0">
                            <a
                              href="#"
                              @click="payment_status(payment.payment_id[index+1])"
                            >{{ payment.payment_id[index+1] }}</a>
                          </td>
                        </tr>
                      </td>
                      <td style="vertical-align: top;">
                        <tr v-for="(amount,index) in payment.top_up_amount" :key="index">
                          <td
                            style="width:100%;text-align: center;"
                            v-show="index%2==0"
                          >{{ amount }}</td>
                          <td
                            style="width:100%;text-align: center;"
                            v-show="index%2==0"
                          >{{ payment.top_up_amount[index+1] }}</td>
                        </tr>
                      </td>
                      <td>
                        <tr v-for="(date,index) in payment.top_up_date" :key="index">
                          <td style="width:100%;text-align: center;" v-show="index%2==0">{{ date }}</td>
                          <td
                            style="width:100%;text-align: center;"
                            v-show="index%2==0"
                          >{{ payment.top_up_date[index+1] }}</td>
                        </tr>
                      </td>
                      <td style="text-align: center;">${{payment.balance}}</td>
                      <td style="text-align: center;">{{ payment.status }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- <div class="pagin-table">
                <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-center">
                    <li class="page-item">
                      <a class="page-link" href="#" @click="page_require(page_no-1)">
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
                            ></path>
                          </g>
                        </svg>
                      </a>
                    </li>
                    <li
                      :class="'page-item '+pagination_class(page_number)"
                      v-for="page_number in total_pages"
                      :key="page_number"
                    >
                      <a
                        class="page-link"
                        href="#"
                        @click="page_require(page_number)"
                      >{{page_number}}</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#" @click="page_require(page_no+1)">
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
                            ></path>
                          </g>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>-->
            </div>
            <div class="table-box" v-show="user_role=='Admin'">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" style="width:10%;">NAME</th>
                      <th scope="col" style="width:16%">PAYMENT ID</th>
                      <th scope="col" style="width:10%">PHONE</th>
                      <th scope="col" style="width:5%">ACCOUNT NUMBER</th>
                      <th scope="col" style="width:5%">EMAIL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="text-align: center;"></td>
                      <td style="vertical-align: top;"></td>
                      <td style="vertical-align: top;"></td>
                      <td style="text-align: center;"></td>
                      <td style="text-align: center;"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade dash-modal"
      id="payment_details_modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="payment_details_modal_title"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <h3>Bank Account Details</h3>
            </div>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="clear_fields"
            >
              <img src="/img/close-icn.png" alt />
            </button>
            <form @submit="submit_account_details">
              <div class="form-group">
                <label>Account ID</label>
                <input
                  type="text"
                  class="form-control"
                  :disabled="user_role=='Admin' || isEdit"
                  placeholder="Account ID"
                  v-model="account.account_id"
                />
              </div>
              <div class="form-group">
                <label>Account Number</label>
                <input
                  type="text"
                  class="form-control"
                  :disabled="isEdit"
                  placeholder="Enter your account number"
                  v-model="account.account_no"
                />
              </div>
              <div class="form-group">
                <label>IFSC</label>
                <input
                  type="text"
                  :disabled="isEdit"
                  class="form-control"
                  placeholder="Enter your IFSC"
                  v-model="account.ifsc"
                />
              </div>
              <div class="form-group">
                <label>Account Holder Name</label>
                <input
                  type="text"
                  :disabled="isEdit"
                  class="form-control"
                  placeholder="Enter the name"
                  v-model="account.account_holder_name"
                />
              </div>
              <div class="btn-wrap text-right">
                <button type="button" class="btn btn-link" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-link" @click="isEdit_method">Edit</button>
                <button type="submit" class="darkblue-btn" id="add_quesn_save">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { setTimeout } from "timers";
import Swal from "sweetalert2";
import api_calls from "@/portal/api_calls";

export default {
  data() {
    return {
      page_no: 1,
      per_page: 10,
      checked_list: [],
      payment_list: [],
      payment_status_list: [],
      isEdit: false,
      is_edit: false,
      account: {
        account_id: "",
        account_no: "",
        ifsc: "",
        account_holder_name: ""
      },
      old_account: {
        account_id: "",
        account_no: "",
        ifsc: "",
        account_holder_name: ""
      },
      type: null,
      total_pages: null,
      number_of_rows: null,
      show_loader: false,
      payment_status_id: null,
      user_role: this.$session.get("UserInformation").role,
      companyid: "",
      companyname: "",
      variable_super: false
    };
  },
  created() {
    if (
      !this.$session.has("CompanyId") &&
      this.$session.get("UserInformation").role == "SuperAdmin"
    ) {
      toastr.warning("Please select a company name from the dropdown");
    } else if (this.$session.get("UserInformation").role == "SuperAdmin") {
      this.companyid = this.$session.get("CompanyId");
      this.companyname = this.$session.get("CompanyName");
    } else {
      this.companyid = this.$session.get("UserInformation").company_id;
      this.companyname = this.$session.get("UserInformation").company_name;
    }
    axios
      .get(api_calls.account_payment_url(), {
        params: {
          email: this.$session.get("UserInformation").email,
          token: this.$session.get("UserInformation").tokens,
          license_key: this.$session.get("UserInformation").license_key,
          company_id: this.companyid,
          company_name: this.companyname
        },
        headers:
          {
            Authorization: `Bearer ${this.$session.get("at")}`,
          }
      })
      .then(response => {
        for (var i in response.data) {
          this.payment_list.push({
            company_name: i,
            payment_id: response.data[i].Paymentid,
            top_up_amount: response.data[i].TopUpAmount,
            balance: response.data[i].CurrentTopUp,
            top_up_date: response.data[i].TopUpDate,
            status: response.data[i].Status
          });
        }
        this.show_loader = false;
      })
      .catch(e => {
        this.show_loader = false;
      });
    axios
      .post(api_calls.bank_details_url(), {
        get_details: true,
        company_id: this.companyid,
        company_name: this.companyname,
        token: this.$session.get("UserInformation").tokens,
        email: this.$session.get("UserInformation").email,
        license_key: this.$session.get("UserInformation").license_key
      },
        {
        headers: {
          Authorization: `Bearer ${this.$session.get("at")}`,
        },
      })
      .then(response => {
        if (response.data.AccountNumber !== null) {
          this.account.account_no = response.data.AccountNumber;
          this.account.ifsc = response.data.IFscCode;
          this.account.account_holder_name = response.data.AccountHolderName;
          this.account.account_id = response.data.AccountID;
          this.old_account.account_no = response.data.AccountNumber;
          this.old_account.ifsc = response.data.IFscCode;
          this.old_account.account_holder_name =
            response.data.AccountHolderName;
          this.old_account.account_id = response.data.AccountID;
          if (
            this.account.account_no != "" &&
            this.account.account_holder_name != "" &&
            this.account.ifsc != ""
          ) {
            this.isEdit = true;
            this.isAdd = false;
          }
          if (this.$session.get("UserInformation").role == "SuperAdmin") {
            if (this.account.account_id != null) {
              this.variable_super = true;
            }
          }
        }
      })
      .catch(e => {
        toastr.error("Internal Server Error");
      });
    if (this.user_role == "Admin") {
      if (
        this.account.account_no == "" &&
        this.account.account_holder_name == "" &&
        this.account.ifsc == ""
      ) {
        this.isEdit = false;
        this.isAdd = true;
      }
    } else if (this.user_role == "SuperAdmin") {
      if (
        this.account.account_no == "" &&
        this.account.account_holder_name == "" &&
        this.account.ifsc == "" &&
        this.account.account_id == ""
      ) {
        this.isEdit = false;
        this.isAdd = true;
        this.is_edit = true;
      }
    }
  },
  mounted() {
    var vm = this;
    $("#selectall").click(function() {
      if ($(this).is(":checked")) {
        // $('div:input').prop('checked',true);
        $("input:checkbox").prop("checked", true);
      } else {
        vm.checked_list = [];
        $("input:checkbox").prop("checked", false);
      }
    });
    $("#payment_details_modal").on("hidden.bs.modal", function() {
      vm.clear_fields();
    });
  },
  methods: {
    payment_status(id) {
      this.payment_status_id = id;
      axios
        .post(api_calls.payment_status_url(), {
          email: this.$session.get("UserInformation").email,
          token: this.$session.get("UserInformation").tokens,
          license_key: this.$session.get("UserInformation").license_key,
          company_id: this.companyid,
          company_name: this.companyname,
          payment_id: id
        },{
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        })
        .then(response => {
          this.payment_status_list = response.data;
          $("#payment_modal").modal("show");
        });
    },
    submit_account_details() {
      console.log(this.isEdit);
      console.log(this.isAdd);
      event.preventDefault();
      if (this.user_role == "Admin") {
        if (
          this.account.account_no == "" &&
          this.account.ifsc == "" &&
          this.account.account_holder_name == "" &&
          this.is_edit == false &&
          this.isAdd == true
        ) {
          toastr.error("Kindly enter all the values");
        } else if (
          this.account.account_no != "" &&
          this.account.ifsc != "" &&
          this.account.account_holder_name != "" &&
          this.is_edit == false
        ) {
          axios
            .post(api_calls.bank_details_url(), {
              account_holder_name: this.account.account_holder_name,
              account_no: this.account.account_no,
              ifsc_code: this.account.ifsc,
              isedit: false,
              isAdd: true,
              company_id: this.companyid,
              company_name: this.companyname,
              token: this.$session.get("UserInformation").tokens,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            })
            .then(response => {
              if ((response.data = "Account Details Inserted")) {
                Swal({
                  text:
                    "<h6>Thanks for sharing your account details.</h6><br /><h6>You will get an email notification once your payment account is activate.</h6>",
                  type: "success",
                  timer:2500,
                }).then(result => {
                  setTimeout(() => {
                    this.$router.go();
                  }, 1500);
                });
              }
            });
        } else if (
          this.account.account_no != "" &&
          this.account.ifsc != "" &&
          this.account.account_holder_name != "" &&
          this.is_edit == true
        ) {
          axios
            .post(api_calls.bank_details_url(), {
              account_holder_name: this.account.account_holder_name,
              account_no: this.account.account_no,
              ifsc_code: this.account.ifsc,
              isedit: true,
              isAdd: false,
              company_id: this.companyid,
              company_name: this.companyname,
              token: this.$session.get("UserInformation").tokens,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            })
            .then(response => {
              if ((response.data = "Account Details Updated")) {
                Swal({
                  html:
                    "<h6>Thanks for sharing your account details.</h6></br><h6>You will get an email notification once your payment account is activate.</h6>",
                  type: "success",
                  timer:2500,
                }).then(result => {
                  setTimeout(() => {
                    this.$router.go();
                  }, 1500);
                });
              }
            });
        }
      } else if (this.user_role == "SuperAdmin") {
        console.log(this.account.account_id);
        console.log(this.is_edit);
        if (this.is_edit == true && this.account.account_id != "") {
          axios
            .post(api_calls.bank_details_url(), {
              account_holder_name: this.account.account_holder_name,
              account_no: this.account.account_no,
              ifsc_code: this.account.ifsc,
              isedit: false,
              isAdd: false,
              company_id: this.companyid,
              company_name: this.companyname,
              token: this.$session.get("UserInformation").tokens,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              addAccountId: true,
              AccountId: this.account.account_id
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            })
            .then(response => {
              if ((response.data = "Account Details Updated")) {
                Swal({
                  text:
                    "Thanks for sharing your account details.You will get an email notification once your payment account is activate.",
                  type: "success",
                  timer:2500,
                }).then(result => {
                  setTimeout(() => {
                    this.$router.go();
                  }, 1500);
                });
              }
            });
        }
      }
    },
    delete_selected() {
      event.preventDefault();
      let emaillist = [];
      for (var i in this.checked_list) {
        emaillist.push(this.payment_list[i].email);
      }
      this.delete_clients_api(emaillist);
    },
    delete_individual(index) {
      event.preventDefault();
      let emaillist = [];
      emaillist.push(this.payment_list[index].email);
      this.delete_clients_api(emaillist);
    },
    delete_clients_api(emaillist) {
      //   Swal.fire({
      //     title: "Are you sure?",
      //     text: "You won't be able to revert this!",
      //     type: "warning",
      //     showCancelButton: true,
      //     confirmButtonColor: "#3085d6",
      //     cancelButtonColor: "#d33",
      //     confirmButtonText: "Yes, delete!!"
      //   }).then(result => {
      //     if (result.value) {
      //       this.show_loader = true;
      //       axios
      //         .post(api_calls.delete_clients_url(), {
      //           token: this.$session.get("UserInformation").tokens,
      //           email: this.$session.get("UserInformation").email,
      //           license_key: this.$session.get("UserInformation").license_key,
      //           delete_email_list: emaillist
      //         })
      //         .then(response => {
      //           if (response.data == "Query Executed Successfully") {
      //             toastr.success(
      //               "Selected clients have been deleted sucessfully"
      //             );
      //             setTimeout(() => {
      //               this.$router.go();
      //             }, 1500);
      //           }
      //         })
      //         .catch(e => {
      //           console.log(e);
      //         });
      //     }
      //   });
    },
    clear_fields() {
      this.payment_status_list = [];
      this.account = this.old_account;
    },
    page_require(page) {
      //   if (page == 0 || page == this.total_pages + 1) {
      //     event.preventDefault();
      //   } else {
      //     $("input:checkbox").prop("checked", false);
      //     this.page_no = page;
      //     axios
      //       .post(api_calls.clients_list_url(), {
      //         email: this.$session.get("UserInformation").email,
      //         token: this.$session.get("UserInformation").tokens,
      //         license_key: this.$session.get("UserInformation").license_key,
      //         showlist: "True",
      //         page_no: this.page_no,
      //         per_page: this.per_page
      //       })
      //       .then(response => {
      //         this.number_of_rows = response.data[6].number_of_rows;
      //         this.total_pages = Math.ceil(this.number_of_rows / this.per_page);
      //         for (var i in response.data[0]) {
      //           this.payment_list.push({
      //             company_name: response.data[0][i],
      //             email: response.data[1][i],
      //             status: response.data[2][i],
      //             company_id: response.data[3][i],
      //             reg_type: response.data[4][i],
      //             referral: response.data[5][i]
      //           });
      //         }
      //       });
      //   }
    },
    pagination_class(index) {
      //   if (index == this.page_no) {
      //     return " active";
      //   } else {
      //     return "";
      //   }
    },
    isEdit_method() {
      if (this.user_role == "Admin") {
        this.isEdit = false;
        this.is_edit = true;
      } else if (this.user_role == "SuperAdmin") {
        this.isEdit = !this.isEdit;
        this.is_edit = true;
      }
    }
  }
};
</script>

<style scoped>
</style>
