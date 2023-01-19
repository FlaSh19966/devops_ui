<template>
  <div>
    <div class="spinner" v-show="spinnerOn"></div>
    <div class="dash-cont">
      <div class="container-fluid">
        <div class="card dash-card">
          <div
            class="card-header d-block d-sm-flex flex-wrap justify-content-between"
          >
            <h4 class="mb-sm-0">Chat Groups</h4>
            <div class="card-act d-flex flex-wrap">
              <a
                href="#"
                class="darkblue-btn"
                data-toggle="modal"
                data-target="#createchatmodal"
                style="height: 33px"
                id="chat_grp_btn"
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
                Add Chat Group
              </a>
            </div>
          </div>
          <div class="card-body">
            <div class="table-box">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" style="width: 5%">ACTION</th>
                      <th scope="col" style="width: 20%">GROUP NAME</th>
                      <th scope="col">USERS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(chat_group, index) in chat_group_list"
                      :key="index"
                    >
                      <td class="action">
                        <a href="#" @click="edit_group(index)">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15.392"
                            height="15.392"
                            viewBox="0 0 15.392 15.392"
                            data-toggle="modal"
                            data-target="#createchatmodal"
                          >
                            <path
                              id="square-edit-outline"
                              d="M4.71,3A1.7,1.7,0,0,0,3,4.71V16.682a1.71,1.71,0,0,0,1.71,1.71H16.682a1.71,1.71,0,0,0,1.71-1.71V10.7h-1.71v5.986H4.71V4.71H10.7V3H4.71m10.928.855a.591.591,0,0,0-.41.171L14.185,5.061,16.322,7.2l1.043-1.035a.578.578,0,0,0,0-.812L16.04,4.026a.571.571,0,0,0-.4-.171M13.578,5.668l-6.3,6.311v2.138H9.413l6.3-6.311Z"
                              transform="translate(-3 -3)"
                              fill="#9499ae"
                            />
                          </svg>
                        </a>
                        <a href="#" @click="delete_single(index)">
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
                      <td style="text-align: center">
                        {{ chat_group.group_name }}
                      </td>
                      <td>
                        <span
                          class="multiselect__tag"
                          v-for="(user, userindex) in chat_group.users_list"
                          :key="userindex"
                          >{{ user }} &nbsp;</span
                        >
                      </td>
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
      id="createchatmodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="createchatmodaltitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt style="width: auto" />
              </div>
              <h6>Kindly select the chat group name</h6>
            </div>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <img src="/img/close-icn.png" alt />
            </button>
            <form @submit="submit_new_group">
              <div class="form-group">
                <label>Group Name</label>
                <input
                  class="form-control"
                  placeholder="Enter the group name"
                  v-model="group_name"
                  id="group_name_id"
                />
              </div>
              <div class="form-group">
                <label>Users</label>
                <multiselect
                  id="multiselect_id"
                  :close-on-select="false"
                  :taggable="true"
                  :multiple="true"
                  @select="user_selected"
                  @remove="remove_user"
                  :options="selected_users_list"
                  placeholder="Select Users"
                  track-by="user"
                  label="user"
                  v-model="selected_users"
                ></multiselect>
              </div>
              <div class="btn-wrap text-right">
                <button type="button" class="btn btn-link" data-dismiss="modal">
                  Cancel
                </button>
                <button
                  type="submit"
                  class="darkblue-btn"
                  id="create_grp_save_btn"
                >
                  Save
                </button>
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
import api_calls from "@/portal/api_calls";
import Multiselect from "vue-multiselect";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      chat_group_list: [],
      group_name: "",
      new_users_selected: [],
      selected_users_list: [],
      companyname: "",
      companyid: "",
      users_list: [],
      selected_users: [],
      isEdit: false,
      spinnerOn: false,
      admin_login_token: this.$session.get("GroupChatLoginToken"),
    };
  },
  created() {
    this.load_chatgroup();
  },
  mounted() {
    var vm = this;
    $("#createchatmodal").on("hidden.bs.modal", () => {
      vm.clear_fields();
    });
  },
  components: {
    Multiselect,
  },
  methods: {
    load_chatgroup(){
      if (
        !this.$session.has("CompanyId") &&
        this.$session.get("UserInformation").role == "SuperAdmin"
      ) {
        toastr.warning("Please select a company name from the dropdown");
      }
      if (this.$session.get("UserInformation").role == "SuperAdmin") {
        if (this.$session.has("CompanyId")) {
          this.companyid = this.$session.get("CompanyId");
          this.companyname = this.$session.get("CompanyName");
        } else {
          toastr.warning("Please select a company name from the dropdown");
        }
      } else {
        this.companyid = this.$session.get("UserInformation").company_id;
        this.companyname = this.$session.get("UserInformation").company_name;
      }
      axios
        .get(api_calls.chat_user_get_groups_url(), {
          params: {
            username: this.$session.get("UserInformation").email,
            token: this.$session.get("GroupChatLoginToken"),
          },
        })
        .then((response) => {
          if (response.data.error == "you need to log in") {
          } else {
            for (var i in response.data) {
              if (!response.data[i].includes("|")) {
                this.get_users_list(i, response.data[i]);
              }
            }
          }
        });
      axios
        .post(
          api_calls.load_users_url(),
          {
            companyid: this.companyid,
            companyname: this.companyname,
            license_key: this.$session.get("UserInformation").license_key,
            email: this.$session.get("UserInformation").email,
            token: this.$session.get("UserInformation").tokens,
            page_no: 1,
            per_page: 5,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          for (var i in response.data[0]) {
            this.selected_users_list.push({
              user: response.data[0][i],
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
    },
    get_users_list(index, group_name) {
      axios
        .get(api_calls.chat_admin_get_group_members_url(), {
          params: {
            username: this.$session.get("UserInformation").email,
            group_name: group_name,
            token: this.admin_login_token,
          },
        })
        .then((response) => {
          if (response.data.error == "you need to log in") {
          } else {
            this.chat_group_list = [];
            this.chat_group_list.push({
              group_name: group_name,
              users_list: response.data,
            });
          }
        });
    },
    submit_new_group() {
      event.preventDefault();
      if (this.isEdit === false && this.group_name != "") {
        axios
          .post(api_calls.chat_admin_create_group_url(), {
            group_name: this.group_name,
            join_me: true,
            token: this.admin_login_token,
          })
          .then((response) => {
            var memberlist = [];
            for (var i in this.selected_users) {
              memberlist.push(this.selected_users[i].user);
            }
            if (response.data.created == true) {
              toastr.success("Your group has been created successfully.");
              axios
                .post(api_calls.chat_admin_add_member_url(), {
                  token: this.admin_login_token,
                  group_name: this.group_name,
                  members_ids: memberlist,
                })
                .then((resp) => {
                  var added = resp.data.filter((resp) => {
                    return resp.added == true;
                  });
                  if (added.length == resp.data.length) {
                    Swal({
                      text:
                        "New members have been added to the group successfully.",
                      showConfirmButton: true,
                      timer: 3000,
                    }).then((result) => {
                      if (result.value) {
                        this.load_chatgroup();
                      }
                    });
                  }
                });
            }
          });
      } else if (this.group_name == "") {
        toastr.error("Please enter the required fields.");
      } else if (
        this.isEdit === true &&
        this.group_name != "" &&
        this.new_users_selected.length > 0
      ) {
        var memberlist = [];
        for (var i in this.new_users_selected) {
          memberlist.push(this.new_users_selected[i].user);
        }
        axios
          .post(api_calls.chat_admin_add_member_url(), {
            token: this.admin_login_token,
            group_name: this.group_name,
            members_ids: memberlist,
          })
          .then((response) => {
            var added = response.data.filter((response) => {
              return response.added == true;
            });
            if (added.length == response.data.length) {
              Swal({
                text: "New members have been added to the group successfully.",
                showConfirmButton: true,
                timer: 3000,
              }).then((result) => {
                if (result.value) {
                  this.load_chatgroup();
                }
              });
            }
          });
      }
    },
    user_selected(selectedUser, id) {
      if (this.isEdit == true) {
        this.new_users_selected.push(selectedUser);
      }
    },
    new_user_removed(removeduser) {
      var removed_index = this.new_users_selected.indexOf(removeduser);
      if (removed_index == -1 && this.isEdit == true) {
        return false;
      } else {
        return true;
      }
    },
    remove_user(removeduser, id) {
      if (this.new_user_removed(removeduser) == false) {
        Swal.fire({
          title:
            "Are you sure about removing the user " +
            removeduser.user +
            " from this group?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete!!",
        }).then((result) => {
          if (result.value) {
            var users = [];
            users.push(removeduser.user);
            axios
              .post(api_calls.chat_admin_remove_member_url(), {
                token: this.admin_login_token,
                group_name: this.group_name,
                members_ids: users,
              })
              .then((response) => {
                if (response.data[0].deleted == true) {
                  toastr.success("The member has been removed from the group.");
                  this.load_chatgroup();
                }
              })
              .catch((e) => {
                this.spinnerOn = false;
              });
          } else if (!result.value) {
            this.selected_users.push(removeduser);
          }
        });
      }
    },
    clear_fields() {
      this.selected_users = [];
      this.group_name = "";
      this.isEdit = false;
      this.new_users_selected = [];
    },
    delete_single(index) {
      event.preventDefault();
      var grouplist = [];
      grouplist.push(this.chat_group_list[index].group_name);
      this.delete_group_api(this.chat_group_list[index].group_name);
    },
    delete_group_api(grouplist) {
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
          axios
            .delete(api_calls.chat_admin_delete_group_url(), {
              params: {
                token: this.admin_login_token,
                group_name: grouplist,
              },
            })
            .then((response) => {
              if (response.data.deleted == true) {
                toastr.success("The group has been deleted.");
                this.load_chatgroup();
              }
            })
            .catch((e) => {
              this.spinnerOn = false;
            });
        }
      });
    },
    edit_group(index) {
      event.preventDefault();
      this.isEdit = true;
      this.group_name = this.chat_group_list[index].group_name;
      var list = [];
      for (var i in this.chat_group_list[index].users_list) {
        list.push({ user: this.chat_group_list[index].users_list[i] });
      }
      this.selected_users = list;
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
<style scoped>
td > .multiselect__tag {
  padding: 4px 0px 4px 10px;
}
.multiselect__option[data-select="Press enter to select"] > span {
  margin-left: 10%;
}
</style>