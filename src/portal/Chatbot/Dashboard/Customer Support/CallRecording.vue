<template>
  <div>
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="dash-cont">
      <div class="container-fluid">
        <div class="card dash-card">
          <div class="card-header d-block d-sm-flex flex-wrap justify-content-between">
            <h4 class="mb-sm-0">Recorded Calls</h4>
            <div class="card-act d-flex flex-wrap">
              <!-- <input
                class="form-control search-bar"
                id="search_bar"
                placeholder="Search here"
                v-model="search_name"
                v-on:keyup="callsearch"
              />
              <a
                href="javascript:void(0)"
                class="darkblue-btn"
                @click="search_product"
                id="search_btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="14"
                  height="14"
                >
                  <path
                    d="M13.809011327100071,12.965505435601472 L9.30910012117823,8.49330664854199 C10.007392079586584,7.596111589605521 10.38512817619458,6.499157170138106 10.38512817619458,5.345374656726532 c0,-1.3810948891881802 -0.5423458634784514,-2.676086605733705 -1.523073527148749,-3.6524965835014083 c-0.9807276636702976,-0.9764099777677033 -2.287209392305289,-1.5136937750578685 -3.6751296371814526,-1.5136937750578685 s-2.6944019735111544,0.5390058607430178 -3.6751296371814526,1.5136937750578685 C0.5293349766245179,2.667565987539975 -0.011278152465820316,3.9642797675383576 -0.011278152465820316,5.345374656726532 c0,1.3793728257353273 0.5423458634784514,2.6778086691865575 1.523073527148749,3.6524965835014083 C2.492523038353222,9.974281217995648 3.7972720326001044,10.51156501528581 5.18692501186438,10.51156501528581 c1.160932040033745,0 2.2629511108717475,-0.37540983272197437 3.165705727077092,-1.0676793407689171 l4.499911205921844,4.470476723606628 a0.1420842198250257,0.14120920313395363 0 0 0 0.20099718902076805,0 l0.7554721932159904,-0.7490976019910955 a0.1420842198250257,0.14120920313395363 0 0 0 0,-0.19975936053095905 zM7.931576282630728,8.073123166045836 C7.196896902072058,8.80155600660269 6.2231001759542055,9.20279679111746 5.18692501186438,9.20279679111746 s-2.0099718902076775,-0.4012407845147706 -2.744651270766347,-1.1296736250716286 C1.709327094927478,7.342968262036121 1.3055999824978375,6.37516860153268 1.3055999824978375,5.345374656726532 s0.4037271124296458,-1.99931566876244 1.1366737586002036,-2.727748509319298 C3.1769531216567026,1.8891933068503817 4.150749847774562,1.4879525223356067 5.18692501186438,1.4879525223356067 s2.0117046245957884,0.3995187210619175 2.744651270766347,1.1296736250716286 S9.06825004123093,4.315580711920385 9.06825004123093,5.345374656726532 s-0.4037271124296458,1.99931566876244 -1.1366737586002036,2.727748509319298 z"
                    fill="#fff"
                  />
                </svg>
              </a>-->
              <a
                href="javascript:void(0)"
                class="red-btn"
                id="delete_records"
                @click="delete_recordings('all')"
              >
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
          <div class="card-body" id="page">
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
                              @change="selected_recordings('all')"
                            />
                            <span class="icn"></span>
                          </label>
                        </div>
                      </th>
                      <th scope="col" style="width:2%">ACTION</th>
                      <th scope="col">NUMBER</th>
                      <th scope="col">RECORDED DATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(recording,index) in recordings_list" :key="index">
                      <th scope="col">
                        <div class="form-check checkbox-success">
                          <label class="form-check-label checkbox checkbox-success">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              @change="selected_recordings(index)"
                            />
                            <span class="icn"></span>
                          </label>
                        </div>
                      </th>
                      <td class="action">
                        <a
                          href="javascript:void(0)"
                          id="single_delete_intent_id"
                          @click="delete_individual(index)"
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
                      <td>
                        <a :href="recording.recorded_url">{{recording.number}}</a>
                      </td>
                      <td>{{recording.recorded_date}}</td>
                    </tr>
                  </tbody>
                </table>
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
import api_calls from "@/portal/api_calls";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      spinnerOn: false,
      recordings_list: [],
      checked_list: []
    };
  },
  created() {
    axios
      .post(api_calls.call_recordings_list_url(), {
        companyname: this.$session.get("UserInformation").company_name,
        companyid: this.$session.get("UserInformation").company_id,
        is_show: true,
        license_key: this.$session.get("UserInformation").license_key,
        email: this.$session.get("UserInformation").email,
        token: this.$session.get("UserInformation").tokens
      })
      .then(response => {
        if (response.data.Content == "Empty recording files") {
          console.log("empty");
        } else {
          for (var i in response.data.Content.Number) {
            this.recordings_list.push({
              number: response.data.Content.Number[i],
              recorded_date: response.data.Content.Recorded_Date[i],
              call_url: response.data.Content.CallUrl[i],
              recorded_url: response.data.Content.RecordedUrl[i]
            });
          }
        }
      });
  },
  mounted() {
    var vm = this;
    $("#selectall").click(function() {
      if ($(this).is(":checked")) {
        $("input:checkbox").prop("checked", true);
      } else {
        vm.checked_list = [];
        $("input:checkbox").prop("checked", false);
      }
    });
  },
  methods: {
    selected_recordings(index) {
      if (index == "all") {
        if (event.target.checked) {
          for (var i in this.recordings_list) {
            this.checked_list.push(this.recordings_list[i].call_url);
          }
        } else if (!event.target.checked) {
          this.checked_list = [];
        }
      } else {
        if (event.target.checked == true) {
          let val_index = this.checked_list.indexOf(
            this.recordings_list[index]
          );
          var temp = this.recordings_list[index];
          if (val_index == -1) {
            this.checked_list.push(temp.call_url);
          }
        } else if (event.target.checked == false) {
          var selectall = document.querySelector("#selectall");
          if (selectall.checked == true) {
            selectall.checked = false;
          }
          this.checked_list.splice(this.recordings_list[index].call_url, 1);
        }
      }
    },
    delete_recordings(type) {
      if (this.checked_list.length == 0) {
        Swal.fire({
              title:"No record selected!",
              text:"",
              type:"error",
              timer:2000,
            });
      } else if (this.checked_list.length > 0) {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then(result => {
          if (result.value) {
            this.spinnerOn = true;
            axios
              .post(api_calls.call_recordings_list_url(), {
                companyname: this.$session.get("UserInformation").company_name,
                companyid: this.$session.get("UserInformation").company_id,
                license_key: this.$session.get("UserInformation").license_key,
                email: this.$session.get("UserInformation").email,
                token: this.$session.get("UserInformation").tokens,
                is_delete: true,
                delete_file_url: this.checked_list
              })
              .then(response => {
                this.spinnerOn = false;
                if (response.data.Msg == "Deleted Successfully") {
                  Swal({
                    type: "success",
                    text: "Your Recording(s) have been deleted.",
                    timer:2000,
                  }).then(res => {
                    if (res.value) {
                      this.$router.go();
                    }
                  });
                } else {
                  toastr.error("Internal Server Error");
                }
              })
              .catch(e => {
                this.spinnerOn = false;
                toastr.error("Internal Server Error");
              });
          }
        });
      }
    },
    delete_individual(index) {
      let temp = [];
      temp.push(this.recordings_list[index].call_url);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.spinnerOn = true;
          axios
            .post(api_calls.call_recordings_list_url(), {
              companyname: this.$session.get("UserInformation").company_name,
              companyid: this.$session.get("UserInformation").company_id,
              license_key: this.$session.get("UserInformation").license_key,
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens,
              is_delete: true,
              delete_file_url: temp
            })
            .then(response => {
              this.spinnerOn = false;
              if (response.data.Msg == "Deleted Successfully") {
                Swal({
                  type: "success",
                  text: "Your Recording(s) have been deleted.",
                  timer:2000,
                }).then(res => {
                  if (res.value) {
                    this.$router.go();
                  }
                });
              } else {
                toastr.error("Internal Server Error");
              }
            })
            .catch(e => {
              this.spinnerOn = false;
              toastr.error("Internal Server Error");
            });
        }
      });
    }
  }
};
</script>

<style scoped>
td {
  text-align: center;
}
</style>