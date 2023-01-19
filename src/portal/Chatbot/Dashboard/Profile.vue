<template>
  <div>
    <div class="spinner" v-show="show_loader" id="spinner"></div>
    <div class="dash-cont">
      <div class="container-fluid">
        <div class="card dash-card">
          <div class="card-header d-block d-sm-flex flex-wrap justify-content-between">
            <h4 class="mb-sm-0">Clients Profile</h4>
            <div class="card-act d-flex flex-wrap">
              <a href="#" class="red-btn" @click="delete_selected">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                  <path
                    d="M8.375,3v.778H4V5.333h.875V15.444A1.661,1.661,0,0,0,6.625,17h8.75a1.661,1.661,0,0,0,1.75-1.556V5.333H18V3.778H13.625V3H8.375M6.625,5.333h8.75V15.444H6.625V5.333m1.75,1.556v7h1.75v-7H8.375m3.5,0v7h1.75v-7Z"
                    transform="translate(-4 -3)"
                    fill="#fff"
                  />
                </svg>
                Delete
              </a>
            </div>
          </div>
          <div class="card-body">
            <div class="table-box">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">
                        <div class="form-check checkbox checkbox-success">
                          <label class="form-check-label">
                            <input
                              class="form-check-input"
                              id="selectall"
                              type="checkbox"
                              value
                              required
                              @change="selected_clients('all')"
                            />
                            <span class="icn"></span>
                          </label>
                        </div>
                      </th>
                      <th scope="col">ACTION</th>
                      <th scope="col" style="width: 20%;">COMPANY NAME</th>
                      <th scope="col">EMAIL</th>
                      <th scope="col">REGISTRATION TYPE</th>
                      <th scope="col">STATUS</th>
                      <th scope="col">REFERRED BY</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in client_data" :key="index">
                      <th scope="row">
                        <div class="form-check checkbox checkbox-success">
                          <label class="form-check-label">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              @change="selected_clients(index)"
                              value
                              required
                            />
                            <span class="icn"></span>
                          </label>
                        </div>
                      </th>
                      <td class="action">
                        <a href="#" style="margin-left:30%" @click="delete_individual(index)">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13.682"
                            height="15.392"
                            viewBox="0 0 13.682 15.392"
                          >
                            <path
                              d="M8.276,3v.855H4v1.71h.855V16.682a1.71,1.71,0,0,0,1.71,1.71h8.551a1.71,1.71,0,0,0,1.71-1.71V5.565h.855V3.855H13.406V3H8.276M6.565,5.565h8.551V16.682H6.565V5.565m1.71,1.71v7.7h1.71v-7.7H8.276m3.42,0v7.7h1.71v-7.7Z"
                              transform="translate(-4 -3)"
                              fill="#f23d3d"
                            />
                          </svg>
                        </a>
                      </td>
                      <td>{{ item.companyname }}</td>
                      <td>{{ item.email }}</td>
                      <td>{{ item.reg_type }}</td>
                      <td>
                        <a
                          href="#"
                          v-show="item.status=='Decline' || item.status=='Pending'"
                          @click="status_update(item, 'Accept')"
                        >Accept</a>
                        <a
                          href="#"
                          data-toggle="modal"
                          style="color:red"
                          data-target="#client_modal"
                          v-show="item.status=='Accept' || item.status=='Pending'"
                          @click="status_update(item, 'Decline')"
                        >Decline</a>
                      </td>
                      <td>{{ item.referral }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="pagin-table">
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
                            />
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
    </div>
    <div
      class="modal fade dash-modal"
      id="client_modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <!-- <div class="head-icn">
                <img src="/img/user-blue.png" alt>
              </div>-->
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
            <form @submit="send_mail">
              <div class="form-group">
                <label>Reason For Decline</label>
                <textarea
                  class="form-control"
                  placeholder="Enter your message here"
                  rows="5"
                  v-model="message"
                ></textarea>
              </div>
              <div class="btn-wrap text-right">
                <button
                  type="button"
                  class="btn btn-link"
                  data-dismiss="modal"
                  @click="clear_fields"
                >Cancel</button>
                <button type="submit" class="darkblue-btn">Send Email</button>
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
      client_data: [],
      message: "",
      client_name: null,
      type: null,
      page_no: 1,
      per_page: 10,
      total_pages: null,
      number_of_rows: null,
      show_loader: true,
      checked_list: [],
      user_role: this.$session.get("UserInformation").role
    };
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
  },
  created() {
    this.show_loader = true;
    axios
      .post(api_calls.clients_list_url(), {
        email: this.$session.get("UserInformation").email,
        token: this.$session.get("UserInformation").tokens,
        license_key: this.$session.get("UserInformation").license_key,
        showlist: "True",
        page_no: this.page_no,
        per_page: this.per_page
      },
      {
        headers: {
          Authorization: `Bearer ${this.$session.get("at")}`,
        },
      })
      .then(response => {
        this.number_of_rows = response.data[6].number_of_rows;
        this.total_pages = Math.ceil(this.number_of_rows / this.per_page);
        for (var i in response.data[0]) {
          this.client_data.push({
            companyname: response.data[0][i],
            email: response.data[1][i],
            status: response.data[2][i],
            companyid: response.data[3][i],
            reg_type: response.data[4][i],
            referral: response.data[5][i]
          });
        }
        setTimeout(() => {
          this.show_loader = false;
        }, 1000);
      })
      .catch(e => {
        console.log(e.request);
      });
  },
  methods: {
    selected_clients(index) {
      if (index == "all") {
        if (event.target.checked == true) {
          this.checked_list = this.client_data;
        } else if (event.target.checked == false) {
          this.checked_list = [];
        }
      } else {
        if (event.target.checked == true) {
          let val_index = this.checked_list.indexOf(this.client_data[index]);
          var temp = this.client_data[index];
          if (val_index == -1) {
            this.checked_list.push(temp);
          }
        } else if (event.target.checked == false) {
          var selectall = document.querySelector("#selectall");
          if (selectall.checked == true) {
            selectall.checked = false;
          }
          var temp = this.checked_list.filter(client_data => {
            return client_data.client_data !== index;
          });
          this.checked_list = temp;
        }
      }
    },
    delete_selected() {
      event.preventDefault();
      let emaillist = [];
      for (var i in this.checked_list) {
        emaillist.push(this.client_data[i].email);
      }
      this.delete_clients_api(emaillist);
    },
    delete_individual(index) {
      event.preventDefault();
      let emaillist = [];
      emaillist.push(this.client_data[index].email);
      this.delete_clients_api(emaillist);
    },
    delete_clients_api(emaillist) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete!!"
      }).then(result => {
        if (result.value) {
          this.show_loader = true;
          axios
            .post(api_calls.delete_clients_url(), {
              token: this.$session.get("UserInformation").tokens,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              delete_email_list: emaillist
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            })
            .then(response => {
              if (response.data == "Query Executed Successfully") {
                toastr.success(
                  "Selected clients have been deleted sucessfully"
                );
                setTimeout(() => {
                  this.$router.go();
                }, 1500);
              }
            })
            .catch(e => {
              console.log(e);
            });
        }
      });
    },
    clear_fields() {
      this.message = null;
    },
    status_update(item, type) {
      this.client_name = item;
      this.type = type;
      if (type == "Accept") {
        this.send_mail();
        return;
      } else if (type == "Decline") {
        return;
      }
    },
    page_require(page) {
      if (page == 0 || page == this.total_pages + 1) {
        event.preventDefault();
      } else {
        $("input:checkbox").prop("checked", false);
        this.page_no = page;
        axios
          .post(api_calls.clients_list_url(), {
            email: this.$session.get("UserInformation").email,
            token: this.$session.get("UserInformation").tokens,
            license_key: this.$session.get("UserInformation").license_key,
            showlist: "True",
            page_no: this.page_no,
            per_page: this.per_page
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          })
          .then(response => {
            this.number_of_rows = response.data[6].number_of_rows;
            this.total_pages = Math.ceil(this.number_of_rows / this.per_page);
            for (var i in response.data[0]) {
              this.client_data.push({
                companyname: response.data[0][i],
                email: response.data[1][i],
                status: response.data[2][i],
                companyid: response.data[3][i],
                reg_type: response.data[4][i],
                referral: response.data[5][i]
              });
            }
          });
      }
    },
    pagination_class(index) {
      if (index == this.page_no) {
        return " active";
      } else {
        return "";
      }
    },
    send_mail() {
      event.preventDefault();
      this.show_loader = true;
      axios
        .post(api_calls.clients_list_url(), {
          company_name: this.client_name.companyname,
          company_id: this.client_name.companyid,
          acceptdeclinebit: "True",
          acceptdecline: this.type,
          message: this.message,
          email: this.$session.get("UserInformation").email,
          clientemail: this.client_name.email,
          token: this.$session.get("UserInformation").tokens,
          license_key: this.$session.get("UserInformation").license_key
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        })
        .then(response => {
          this.show_loader = false;
          toastr.info(response.data);
          $("client_modal").modal("hide");
          setTimeout(() => {
            this.$router.go();
          }, 1500);
        });
    }
  }
};
</script>

<style scoped>
</style>
