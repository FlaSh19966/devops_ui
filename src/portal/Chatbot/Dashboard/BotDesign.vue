<template>
  <div>
    <div class="spinner" v-show="spinnerOn" id="spinner"></div>
    <div class="dash-cont">
      <div class="container-fluid">
        <div class="card dash-card">
          <div
            class="card-header d-block d-sm-flex flex-wrap justify-content-between"
          >
            <h4 class="mb-sm-0">Bot List</h4>

            <div class="card-act d-flex flex-wrap">
              <a
                href="#"
                class="darkblue-btn"
                data-toggle="modal"
                data-target="#botmodel"
                id="add_bot_btn"
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
                Add Bot
              </a>
              <a
                href="#"
                class="red-btn"
                @click="delete_multiple_bot"
                id="delete_role"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                >
                  <path
                    id="trash-can-outline"
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
                          <label
                            class="form-check-label checkbox checkbox-success"
                          >
                            <input
                              class="form-check-input"
                              id="selectall"
                              type="checkbox"
                              @click="check_list_array('all')"
                            />
                            <span class="icn"></span>
                          </label>
                        </div>
                      </th>
                      <th scope="col" style="width: 10%">ACTION</th>
                      <th scope="col" style="width: 60%; text-align: left">
                        BOT NAME
                      </th>
                      <!-- <th scope="col">BOT TYPE</th> -->
                      <th scope="col">PREVIEW</th>
                      <!-- <th scope="col">STATUS</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(bot, index) in bot_name" :key="index">
                      <th scope="col">
                        <div class="form-check checkbox-success">
                          <label
                            class="form-check-label checkbox checkbox-success"
                          >
                            <input
                              class="form-check-input"
                              type="checkbox"
                              @change="check_list_array(index)"
                            />
                            <span class="icn"></span>
                          </label>
                        </div>
                      </th>

                      <td class="action" style="text-align: center">
                        <a href="#" id="edit_role_id">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15.392"
                            height="15.392"
                            viewBox="0 0 15.392 15.392"
                            style="cursor: pointer"
                            @click="edit_bot(index)"
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
                          @click="delete_bot(index)"
                          id="single_delete_role_id"
                        >
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
                      <td>{{ bot.name }}</td>
                      <!-- <td v-if="bot.status=='active'||bot.type=='Closed Bot'" @click="route_to_preview(index)">{{bot.name}}</td> -->
                      <!-- <td v-else title="The preview will be available once the bot is activated.">{{bot.name}}</td> -->
                      <!-- <td>{{bot.type}}</td> -->
                      <td style="text-align: center">
                        <a
                          href="javascript:void(0)"
                          @click="route_to_preview(index)"
                          >preview</a
                        >
                      </td>
                      <!-- <td @click="set_active(index)"><a href="#">Active</a></td> -->
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="pagin-table" style="margin: 0">
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
                            ></path>
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
                            ></path>
                          </g>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div
                class="modal fade dash-modal"
                id="botmodel"
                tabindex="-1"
                role="dialog"
                aria-labelledby="botmodeltitle"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-body">
                      <div class="modal-head d-flex align-items-center">
                        <div class="head-icn">
                          <img src="/img/user-blue.png" alt />
                        </div>
                        <h3>Add Bot</h3>
                      </div>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        @click="clear_all"
                      >
                        <img src="/img/close-icn.png" alt />
                      </button>
                      <form @submit="add_bot">
                        <!-- <div class="radio" style="margin-left: 25%;">
                        <label>
                          <input
                            type="radio"
                            v-model="bot_type"
                            id="closed_bot"
                            value="Closed Bot"
                          />
                          <span class="icn" id="portal_user_radio"></span> Closed Bot
                        </label>
                        <label>
                          <input type="radio" v-model="bot_type" value="Open Bot" />
                          <span class="icn" id="open_bot"></span> Open Bot
                        </label>
                      </div> -->
                        <div class="form-group" style="padding-top: 10px">
                          <input
                            id="add_bot_text"
                            type="text"
                            class="form-control"
                            placeholder="Enter Bot Name"
                            v-model="bot_names"
                          />
                        </div>
                        <span style="color: #ff0000"></span>
                        <div class="btn-wrap text-right">
                          <button
                            type="button"
                            class="btn btn-link"
                            data-dismiss="modal"
                            @click="clear_all"
                          >
                            Cancel
                          </button>
                          <button type="submit" class="darkblue-btn">
                            Create Bot
                          </button>
                        </div>
                      </form>
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
import Swal from "sweetalert2";
import api_calls from "@/portal/api_calls";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      checked_list: [],
      role_names: "", ////////////
      bot_names: "",
      delete_list: [],
      role_name: [], //////////
      bot_name: [],
      user_type_list: [],
      user_type: null, //////////
      bot_type: "Closed Bot",
      page_no: 1,
      per_page: 10,
      total_pages: 0,
      add_edit: "true",
      old_role_name: "",
      //harsh
      page_array: [],
      search_name: "",
      spinnerOn: false,
      empty_string_validity: /^$/,
    };
  },
  mounted() {
    var vm = this;
    $("#selectall").click(function () {
      if ($(this).is(":checked")) {
        $("input:checkbox").prop("checked", true);
      } else {
        vm.checked_list = [];
        $("input:checkbox").prop("checked", false);
      }
    });
  },
  created() {
    this.spinnerOn = true;
    axios
      .get(
        api_calls.show_closed_form_url(),
        {
          params: {
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
            license_key: this.$session.get("UserInformation").license_key,
            email: this.$session.get("UserInformation").email,
            token: this.$session.get("UserInformation").tokens,
          },
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        },
      )
      .then((response) => {
        this.spinnerOn = false;
        for (let i = 0; i < response.data.Bots.length; i++) {
          this.bot_name.push({
            name: response.data.Bots[i].bot_name,
            type: "Closed Bot",
            id: response.data.Bots[i].bot_id,
            version: response.data.Bots[i].bot_version,
          });
        }
      })
      .catch((e) => {
        if (
          e.response.status === 410 ||
          e.response.status === 440 ||
          e.response.status === 409
        ) {
          this.$root.$emit("Session_Expired", e.response.data);
        }
      });
    // axios
    //   .get(
    //     api_calls.open_bot(),
    //     {
    //       params: {
    //         company_name: this.$session.get("UserInformation").company_name,
    //         company_id: this.$session.get("UserInformation").company_id,
    //         email: this.$session.get("UserInformation").email,
    //         license_key: this.$session.get("UserInformation").license_key,
    //         token: this.$session.get("UserInformation").tokens,
    //         // bot_name: this.$route.params.botdata.bot_name,
    //       },
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${this.$session.get("at")}`,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     // console.log(response);
    //     // for(let i=0;i<response.data.Bots.length;i++){
    //     //   this.bot_name.push({
    //     //     name:response.data.Bots[i],
    //     //     type:'Closed Bot',
    //     //   });
    //     // }
    //     // this.levels=response.data.Bot.structure;
    //     // this.maxid = this.levels.length
    //   })
    //   .catch((e) => {
    //     if (
    //       e.response.status === 410 ||
    //       e.response.status === 440 ||
    //       e.response.status === 409
    //     ) {
    //       this.$root.$emit("Session_Expired", e.response.data);
    //     }
    //   });
    // axios
    // .get(api_calls.open_bot(),{
    //   params: {
    //     company_id: this.$session.get("UserInformation").company_id,
    //     company_name: this.$session.get("UserInformation").company_name,
    //     license_key: this.$session.get("UserInformation").license_key,
    //     email: this.$session.get("UserInformation").email,
    //     token: this.$session.get("UserInformation").tokens,
    //   }
    // }, {
    //   headers: {
    //     Authorization: `Bearer ${this.$session.get("at")}`,
    //   },
    // })
    // .then(response=>{
    //   for(let i=0;i<response.data.Bots.length;i++){
    //     this.bot_name.push({
    //       name:response.data.Bots[i],
    //       type:'Open Bot',
    //     });
    //   }
    // })
    // .catch((e) => {
    //       if (
    //         e.response.status === 410 ||
    //         e.response.status === 440 ||
    //         e.response.status === 409
    //       ) {
    //         this.$root.$emit("Session_Expired", e.response.data);
    //       }
    //     });
    // axios
    //   .post(api_calls.main_role_url(), {
    //     company_id: this.$session.get("UserInformation").company_id,
    //     company_name: this.$session.get("UserInformation").company_name,
    //     license_key: this.$session.get("UserInformation").license_key,
    //     email: this.$session.get("UserInformation").email,
    //     token: this.$session.get("UserInformation").tokens,
    //     page_no: 1,
    //     per_page: this.per_page,
    //     isShow: true
    //   }, {
    //   headers: {
    //     Authorization: `Bearer ${this.$session.get("at")}`,
    //   },
    // })
    //   .then(response => {
    //     if (response.data != "token invalid"&&response.data!=null) {
    //       this.organize_roles(response.data);
    //     }
    //   })
    // .catch((e) => {
    //       if (
    //         e.response.status === 410 ||
    //         e.response.status === 440 ||
    //         e.response.status === 409
    //       ) {
    //         this.$root.$emit("Session_Expired", e.response.data);
    //       }
    //     });
  },
  methods: {
    check_list_array(index) {
      if (index == "all") {
        var role_length = this.role_name.length;
        for (var i = 0; i < role_length; i++) {
          this.checked_list.push(i);
        }
      } else {
        if (event.target.checked == true) {
          if (!this.checked_list.includes(index)) {
            this.checked_list.push(index);
          }
        } else if (event.target.checked == false) {
          var selectall = document.querySelector("#selectall");
          if (selectall.checked == true) {
            selectall.checked = false;
          }
          this.checked_list.splice(this.checked_list.indexOf(index), 1);
          // var temp = this.checked_list.filter(roles => {
          //   return role.role !== index;
          // });
          // this.checked_list = temp;
        }
      }
    },
    edit_role(index) {
      this.old_role_name = this.role_name[index];
      this.role_names = this.role_name[index];
      this.user_type = this.user_type_list[index];
      this.add_edit = "false";
    },
    delete_role(index) {
      this.delete_list.push(this.role_name[index]);
      (this.role_names = this.role_name[index]),
        (this.user_type = this.user_type_list[index]);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete!!",
      }).then((result) => {
        if (result.value) {
          this.spinnerOn = true;
          axios
            .post(
              api_calls.main_role_url(),
              {
                company_id: this.$session.get("UserInformation").company_id,
                company_name: this.$session.get("UserInformation").company_name,
                license_key: this.$session.get("UserInformation").license_key,
                email: this.$session.get("UserInformation").email,
                token: this.$session.get("UserInformation").tokens,
                delete_roles: [
                  {
                    Role: this.role_names,
                    UserType: this.user_type,
                  },
                ],
                isDelete: true,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              this.role_names = "";
              this.user_type = null;
              if (response.data == "User Roles Deleted") {
                Swal.fire({
                  title:"Deleted!",
                  text:"Your bots have been deleted.",
                  type:"success",
                  timer:2000,
                });
                setTimeout(() => {
                  this.$router.go();
                }, 2000);
              } else if (response.data == "USER EXIST") {
                Swal({
                  type: "error",
                  text: "There is already a user associated with this Role",
                  timer:2500,
                });
              }
            })
            .catch((e) => {
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
    },
    delete_bot(index) {
      this.delete_list = [];
      this.delete_list.push({
        bot_name: this.bot_name[index].name,
        bot_id: this.bot_name[index].id,
      });
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete!!",
      }).then((result) => {
        if (result.value) {
          this.spinnerOn = true;
          // console.log(this.delete_list);
          axios
            .delete(api_calls.delete_closed_form_url(), {
              params: {
                company_id: this.$session.get("UserInformation").company_id,
                company_name: this.$session.get("UserInformation").company_name,
                license_key: this.$session.get("UserInformation").license_key,
                email: this.$session.get("UserInformation").email,
                token: this.$session.get("UserInformation").tokens,
                bots: this.delete_list,
              },
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            })
            .then((response) => {
              this.spinnerOn = false;
              if (response.data.status == "Success") {
                Swal.fire({
                  title:"Deleted!",
                  text:"Your bots have been deleted.",
                  type:"success",
                  timer:2000,
                });
                setTimeout(() => {
                  this.$router.go();
                }, 2500);
              } else if (response.data.status == "Partial") {
                Swal({
                  type: "warning",
                  text: "Some Error Occurred.",
                  timer:2000,
                });
              } else if (response.data.status == "Failure") {
                Swal({
                  type: "warning",
                  text: "Some Error Occurred.",
                  timer:2000,
                });
              }
            })
            .catch((e) => {
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
    },
    delete_multiple_role() {
      this.delete_list = [];
      var len = this.checked_list.length;
      for (var i = 0; i < len; i++) {
        var index = this.checked_list[i];
        this.delete_list.push({
          Role: this.role_name[index],
          UserType: this.user_type_list[index],
        });
      }
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete!!",
      }).then((result) => {
        if (result.value) {
          this.spinnerOn = true;
          axios
            .post(
              api_calls.main_role_url(),
              {
                company_id: this.$session.get("UserInformation").company_id,
                company_name: this.$session.get("UserInformation").company_name,
                license_key: this.$session.get("UserInformation").license_key,
                email: this.$session.get("UserInformation").email,
                token: this.$session.get("UserInformation").tokens,
                delete_roles: this.delete_list,
                isDelete: true,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              if (response.data.status == "Success") {
                Swal.fire({
                title:"Deleted!",
                text:"Your bots have been deleted.",
                type:"success",
                timer:2000,
                });
                setTimeout(() => {
                  this.$router.go();
                }, 2500);
              } else if (response.data.status == "Partial") {
                Swal({
                  type: "warning",
                  text: "Some intents already exists.",
                  timer:2000,
                });
              } else if (response.data.status == "Failed") {
                Swal({
                  type: "warning",
                  text: "The intents already exists.",
                  timer:2000,
                });
              }
            })
            .catch((e) => {
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
    },
    delete_multiple_bot() {
      if (this.checked_list.length > 0) {
        this.delete_list = [];
        var len = this.checked_list.length;
        for (var i = 0; i < len; i++) {
          var index = this.checked_list[i];
          this.delete_list.push({
            bot_name: this.bot_name[index].name,
            bot_id: this.bot_name[index].id,
          });
        }
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete!!",
        }).then((result) => {
          if (result.value) {
            this.spinnerOn = true;
            // console.log(this.delete_list);
            axios
              .delete(api_calls.delete_closed_form_url(), {
                params: {
                  company_id: this.$session.get("UserInformation").company_id,
                  company_name: this.$session.get("UserInformation")
                    .company_name,
                  license_key: this.$session.get("UserInformation").license_key,
                  email: this.$session.get("UserInformation").email,
                  token: this.$session.get("UserInformation").tokens,
                  bots: this.delete_list,
                },
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              })
              .then((response) => {
                this.spinnerOn = false;
                if (response.data.status == "Success") {
                  Swal.fire({
                    title:"Deleted!",
                    text:"Your bots have been deleted.",
                    type:"success",
                    timer:2000,
                  });
                  setTimeout(() => {
                    this.$router.go();
                  }, 2500);
                } else if (response.data.status == "Partial") {
                  Swal({
                    type: "warning",
                    text: "Some bot could not be deleted",
                    timer:2000,
                  });
                } else if (response.data.status == "Failure") {
                  Swal({
                    type: "warning",
                    text: "Bot could not be deleted",
                    timer:2000,
                  });
                }
              })
              .catch((e) => {
                if (
                  e.response.status === 410 ||
                  e.response.status === 440 ||
                  e.response.status === 409
                ) {
                  this.$root.$emit("Session_Expired", e.response.data);
                } else {
                  Swal({
                    type: "warning",
                    text: "Bot could not be deleted",
                    timer:2000,
                  });
                }
              });
          }
        });
      } else {
        toastr.error("No bot selected to delete ");
      }
    },
    add_bot() {
      event.preventDefault();
      if (this.empty_string_validity.test(this.bot_names)) {
        //toaster
        toastr.error("Enter Bot Name");
      } else if (this.bot_type == null) {
        //toaster
        toastr.error("Select Bot Type");
      } else {
        var same_name = false;
        for (let i = 0; i < this.bot_name.length; i++) {
          if (this.bot_name[i].name == this.bot_names) {
            same_name = true;
          }
        }
        if (same_name) {
          toastr.error("Bot with same name already exist");
        } else {
          this.bot_type = "Closed Bot";
          if (this.bot_type == "Open Bot") {
            $("#botmodel").modal("hide");
            this.$router.push({
              name: "OpenBot",
              params: {
                botdata: {
                  bot_name: this.bot_names,
                  bot_type: this.bot_type,
                  is_edit: false,
                },
              },
            });
          } else if (this.bot_type == "Closed Bot") {
            $("#botmodel").modal("hide");
            this.$router.push({
              name: "Workflow",
              params: {
                botdata: {
                  bot_name: this.bot_names,
                  bot_type: this.bot_type,
                  is_edit: false,
                },
              },
            });
          }
        }
        // this.$router.push({
        //   name: route_name,
        //   props: true
        // });
      }
    },
    page_change(pageno) {
      if (pageno == 0 || pageno == this.total_pages + 1) {
      } else {
        if (this.search_name == "") {
          if (pageno == "...s") {
            this.page_no = Math.ceil((1 + this.page_no) / 2);
          } else if (pageno == "...l") {
            this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
          } else {
            this.page_no = pageno;
          }
          axios
            .post(
              api_calls.main_role_url(),
              {
                company_id: this.$session.get("UserInformation").company_id,
                company_name: this.$session.get("UserInformation").company_name,
                license_key: this.$session.get("UserInformation").license_key,
                email: this.$session.get("UserInformation").email,
                token: this.$session.get("UserInformation").tokens,
                page_no: this.page_no,
                per_page: this.per_page,
                isShow: true,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              if (response.data != "token invalid" && response.data != null) {
                this.organize_roles(response.data);
              }
            })
            .catch((e) => {
              if (
                e.response.status === 410 ||
                e.response.status === 440 ||
                e.response.status === 409
              ) {
                this.$root.$emit("Session_Expired", e.response.data);
              }
            });
        } else {
          if (pageno == "...s") {
            this.page_no = Math.ceil((1 + this.page_no) / 2);
          } else if (pageno == "...l") {
            this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
          } else {
            this.page_no = pageno;
          }
          this.spinnerOn = true;
          axios
            .post(
              api_calls.main_role_url(),
              {
                company_id: this.$session.get("UserInformation").company_id,
                company_name: this.$session.get("UserInformation").company_name,
                license_key: this.$session.get("UserInformation").license_key,
                email: this.$session.get("UserInformation").email,
                token: this.$session.get("UserInformation").tokens,
                page_no: pageno,
                per_page: this.per_page,
                issearch: true,
                searchstring: this.search_name,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              if (response.data != "token invalid" && response.data != null) {
                this.organize_roles(response.data);
              }
            })
            .catch((e) => {
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
    organize_roles(roles_list) {
      // this.number_of_rows = roles_list.number_of_rows;
      this.role_name = [];
      this.user_type_list = [];
      this.total_pages = roles_list.PageCount;
      var portal_len = roles_list.Portal.length;
      for (var i = 0; i < portal_len; i++) {
        this.user_type_list.push("Portal User");
        this.role_name.push(roles_list.Portal[i]);
      }
      var bot_len = roles_list.Bot.length;
      for (var i = 0; i < bot_len; i++) {
        this.user_type_list.push("Bot User");
        this.role_name.push(roles_list.Bot[i]);
      }
      this.setpagination(this.page_no);
    },
    pagination_class(index) {
      if (index == this.page_no) {
        return " active";
      } else {
        return "";
      }
    },
    callsearch() {
      if (event.keyCode === 13) {
        this.search_product();
      }
    },
    search_product() {
      if (this.search_name != "") {
        this.spinnerOn = true;
        axios
          .post(
            api_calls.main_role_url(),
            {
              company_id: this.$session.get("UserInformation").company_id,
              company_name: this.$session.get("UserInformation").company_name,
              license_key: this.$session.get("UserInformation").license_key,
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens,
              issearch: true,
              searchstring: this.search_name,
              per_page: this.per_page,
              page_no: 1,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.spinnerOn = false;
            if (
              response.data != "token invalid" &&
              response.data != null &&
              response.data.MSG != "No Roles Added Yet"
            ) {
              this.page_no = 1;
              this.organize_roles(response.data);
            } else if (response.data.MSG == "No Roles Added Yet") {
              toastr.error("No role found");
              setTimeout(() => {
                this.$router.go();
              }, 2500);
            } else if (response.data.MSG == "Intrnal Server Error") {
              toastr.error("Intrnal Server Error");
              setTimeout(() => {
                this.$router.go();
              }, 2500);
            }
          })
          .catch((e) => {
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              this.$root.$emit("Session_Expired", e.response.data);
            }
          });
      } else {
        toastr.error("Enter proper data for searching");
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
    route_to_preview(index) {
      this.$router.push({
        name: "Test Closed Bot",
        params: {
          botdata: {
            bot_name: this.bot_name[index].name,
            bot_type: this.bot_name[index].type,
            bot_id: this.bot_name[index].id,
          },
        },
      });
    },
    edit_bot(index) {
      this.$router.push({
        name: "Workflow",
        params: {
          botdata: {
            bot_name: this.bot_name[index].name,
            bot_type: this.bot_name[index].type,
            is_edit: true,
            bot_id: this.bot_name[index].id,
            bot_version: this.bot_name[index].version,
          },
        },
      });
    },
    clear_all() {
      this.bot_names = null;
    },
    set_active(index) {
      if (this.bot_name.status == "active") {
        // Swal.fire(
        //   "Your bots is already active!!",
        //   "Your bots is already active.",
        //   "success"
        // );
      } else {
        Swal.fire({
          title: "Are you sure?",
          text: "Submit to Activate the Bot!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete!!",
        }).then((result) => {
          if (result.value) {
            axios
              .post(
                api_calls.open_bot_assignment(),
                {
                  company_id: this.$session.get("UserInformation").company_id,
                  company_name: this.$session.get("UserInformation")
                    .company_name,
                  license_key: this.$session.get("UserInformation").license_key,
                  email: this.$session.get("UserInformation").email,
                  token: this.$session.get("UserInformation").tokens,
                  status: "",
                  eta: "",
                  eta_change_reason: "",
                  assigned_to: "",
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {})
              .catch((e) => {
                if (
                  e.response.status === 410 ||
                  e.response.status === 440 ||
                  e.response.status === 409
                ) {
                  this.$root.$emit("Session_Expired", e.response.data);
                }
              });

            // axios
            // .post(api_calls.open_bot_assignment(),{
            //   company_id: this.$session.get("UserInformation").company_id,
            //   company_name: this.$session.get("UserInformation").company_name,
            //   license_key: this.$session.get("UserInformation").license_key,
            //   email: this.$session.get("UserInformation").email,
            //   token: this.$session.get("UserInformation").tokens,
            //   status:'',
            //   eta: '',
            //   eta_change_reason:'',
            //   progress_update:'',
            // }, {
            //   headers: {
            //     Authorization: `Bearer ${this.$session.get("at")}`,
            //   },
            // })
            // .then(response=>{

            // })
            //     .catch((e) => {
            //   if (
            //     e.response.status === 410 ||
            //     e.response.status === 440 ||
            //     e.response.status === 409
            //   ) {
            //     this.$root.$emit("Session_Expired", e.response.data);
            //   }
            // });
          }
        });
      }
    },
  },
};
</script>