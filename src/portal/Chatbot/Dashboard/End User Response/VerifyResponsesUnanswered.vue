<template>
<div class="table-box">
    <div class="spinner" id="spinner" v-show="show_loader"></div>
    <div class="table-responsive mb-0" style="overflow :visible;">
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
                    @change="question_selected('all')"
                />
                <span class="icn"></span>
                </label>
            </div>
            </th>
            <th scope="col" style="width: 5%">{{tlt('unanswered_action_label')}}</th>
            <th scope="col">{{tlt('unanswered_question_label')}}</th>
            <th scope="col">{{tlt('unanswered_intent_label')}}</th>
            <!-- <th scope="col" style="width: 2%">SOURCES</th> -->
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(row, index) in unanswered_list"
            :key="index"
            id="list-group"
        >
            <!-- <template v-if="row.intent === null"> -->
            <template>
            <th scope="col" class="table-head">
                <div class="form-check checkbox checkbox-success">
                <label class="form-check-label">
                    <input
                    class="form-check-input"
                    @change="question_selected(index)"
                    type="checkbox"
                    />
                    <span class="icn"></span>
                </label>
                </div>
            </th>
            <td class="action">
                <a href="#" @click="edit_item(index)">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15.392"
                    height="15.392"
                    viewBox="0 0 15.392 15.392"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
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
            <td>{{ row.question }}</td>
            <td style="width: 50%;">
                <div class="form-group">
                <multiselect
                    v-model="row.intent"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                    :options="intent_list"
                >
                    <span>{{ row.intent }}</span>
                </multiselect>
                </div>
            </td>
            <!-- <td>{{ row.source }}</td> -->
            </template>
        </tr>
        </tbody>
    </table>
    </div>
    <div class="pagin-table" style="margin-top: 0%">
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
            <a
            v-if="pageno != '...s' && pageno != '...l'"
            class="page-link"
            href="#"
            @click="page_require(pageno)"
            >{{ pageno }}</a
            >
            <!-- <a class="page-link" href="#" @click="page_require(pageno)">{{pageno}}</a> -->
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
     <div
        class="modal fade dash-modal"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div class="modal-head d-flex align-items-center">
                <div class="head-icn">
                  <img src="/img/msg-blue.png" alt />
                </div>
                <h3>{{tlt('unanswered_edit_question_header')}}</h3>
              </div>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <img src="/img/close-icn.png" alt />
              </button>
              <form >
                <div class="form-group">
                  <label>{{tlt('unanswered_your_qs_label')}}</label>
                  <input
                    type="text"
                    class="form-control"
                    :placeholder="tlt('enter_question')"
                    v-model="old_question"
                    id="add_question_question"
                  />
                </div>
                <!-- <div class="form-group">
                  <label>Select Intent</label>
                  <multiselect
                    v-model="old_intent"
                    id="qus_n_int_intent"
                    :options="intent_list"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                  >
                    <span>{{ old_intent }}</span>
                  </multiselect>
                </div> -->
                <div class="btn-wrap text-right">
                  <button
                    type="button"
                    class="btn btn-link"
                    data-dismiss="modal"
                  >
                    {{tlt('unanswered_edit_cancel_btn')}}
                  </button>
                  <button
                    type="submit"
                    class="darkblue-btn"
                    id="add_quesn_save"
                    @click="submit_question"
                  >
                    {{tlt('save_btn')}}
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
import swal from "sweetalert2";
import Swal from "sweetalert2";
import api_calls from "@/portal/api_calls";
import { setTimeout } from "timers";
import Multiselect from "vue-multiselect";
import {  close_modal } from "@/portal/mixins";


export default {
    name: 'verify_responses_unanswered',
    components: {
        Multiselect,
    },
      mixins: [close_modal],

    data() {
        return {
        unanswered_list: [],
        user_role: this.$session.get("UserInformation").role,
        companyname: this.$session.get("UserInformation").company_name,
        companyid: this.$session.get("UserInformation").company_id,
        intent_list: [],
        checked_list: [],
        intentlist: "",
        per_page: 15,
        page_no: 1,
        total_pages: 0,
        show_loader: false,
        number_of_rows: null,
        search_name: "",
        page_array: [],
        old_question: "",
        old_intent: "",
        new_intent_list: [],
        old_data: { question: null, intent: null },
        thumbs_down_icon: require("@/portal/assets/img/Group 61.svg"),
        thumbs_up_icon: require("@/portal/assets/img/Group 71.svg"),
        // view_component_name: "unanswered_questions",
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
        this.$root.$on("add_questions_unanswered", (data) => {
            // console.log(data);   
	        this.add_questions();
        });
        this.$root.$on("search_unanswered", (data) => {
            this.search_name = data;
            this.search_question();
            // this.add_questions();
        });
        this.$root.$on("delete_multiple_unanswered", (data) => {
            this.delete_multiple();
        });
        this.$root.$on("load_verify_responses_unanswered", (data) => {
            this.load_verify_responses_unanswered();
        });
    },
    beforeDestroy() {
        this.$root.$off("add_questions_unanswered");
        this.$root.$off("search_unanswered");
        this.$root.$off("delete_multiple_unanswered");
        this.$root.$off("load_verify_responses_unanswered");
    },
    created() {
        this.load_verify_responses_unanswered();
    },
    methods: {
        load_verify_responses_unanswered(){
        this.checked_list = [];
        $("input:checkbox").prop("checked", false);
        this.show_loader = true;
        this.intent_list = [];
        this.new_intent_list = [];
        this.unanswered_list =[];
        this.search_name = "";
        if (this.user_role == "SuperAdmin") {
        if (this.$session.has("CompanyId")) {
            this.companyid = this.$session.get("CompanyId");
            this.companyname = this.$session.get("CompanyName");
        } else {
            this.companyid = this.$session.get("UserInformation").company_id;
            this.companyname = this.$session.get("UserInformation").company_name;
        }
        } else {
        this.companyid = this.$session.get("UserInformation").company_id;
        this.companyname = this.$session.get("UserInformation").company_name;
        }
        if (this.companyname !== undefined) {
        axios
            .post(
            api_calls.get_unanswered_url(),
            {
                company_name: this.companyname,
                company_id: this.companyid,
                email: this.$session.get("UserInformation").email,
                isDelete: "False",
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                page_no: this.page_no,
                per_page: this.per_page,
                is_get_user_response: false
            },
            {
                headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
                },
            }
            )
            .then((response) => {
            this.show_loader = false;
            if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE.MSG_CODE) {
                this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
                this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
                var data = response.data.data;
                this.unanswered_list = [];
                for (var i in data[0]) {
                    let temp_int = "";
                    if (Boolean(data[2][i])) {
                    // temp_int = data[2][i].replace(this.companyid + "_", "");
                    temp_int = data[2][i];
                    }
                    this.unanswered_list.push({
                    question: data[0][i],
                    intent: temp_int,
                    source: data[1][i],
                    user_response: data[2][i],
                    user_feedback: data[3][i],
                    edit: false,
                    });
                }
                this.setpagination(this.page_no);
                this.show_loader = false;            
            }else if(response.data.message.MSG_CODE === this.api_status_code.NO_DATA_AVAILABLE.MSG_CODE){
                Swal({
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                position: "top-end",
                toast: true,
                timer: 2500,
                type: "info"
                });    
            }else {
                this.show_loader = false;
                Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2500,
                type: "error"
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
                toastr.error(e.message);
            }
            this.show_loader = false;
            });
        }
        axios
        .post(
            api_calls.get_unanswered_url(),
            {
            company_id: this.companyid,
            company_name: this.companyname,
            isDropdown: "True",
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            },
            {
            headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
            },
            }
        )
        .then((response) => {
            // console.log(response.data);
            // for (var i in response.data[0]) {
            // this.intent_list.push(
            //     response.data[0][i].replace(this.companyid + "_", "")
            // );
            // this.new_intent_list.push(
            //     response.data[0][i].replace(this.companyid + "_", "")
            // );
            // }
            if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE.MSG_CODE) {
                for (var i in response.data.data[0]) {
                this.intent_list.push(
                    response.data.data[0][i]
                );
                this.new_intent_list.push(
                    response.data.data[0][i]
                );
                }              
            }else if(response.data.message.MSG_CODE === this.api_status_code.NO_DATA_AVAILABLE.MSG_CODE){
                Swal({
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                position: "top-end",
                toast: true,
                timer: 2500,
                type: "info"
                });    
            }else {
                this.show_loader = false;
                Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2500,
                type: "error"
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
        page_require(page) {
        this.checked_list = [];
        $("input:checkbox").prop("checked", false);
        if (page == 0 || page == this.total_pages + 1) {
        } else {
            $("input:checkbox").prop("checked", false);
            if (page == "...s") {
            this.page_no = Math.ceil((1 + this.page_no) / 2);
            } else if (page == "...l") {
            this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
            } else {
            this.page_no = page;
            }
            if (this.search_name == "") {
            this.show_loader = true;
            axios
                .post(
                api_calls.get_unanswered_url(),
                {
                    company_name: this.companyname,
                    company_id: this.companyid,
                    email: this.$session.get("UserInformation").email,
                    license_key: this.$session.get("UserInformation").license_key,
                    token: this.$session.get("UserInformation").tokens,
                    subscription: this.$session.get("UserInformation").subscription,
                    isDelete: "False",
                    page_no: this.page_no,
                    per_page: this.per_page,
                    is_get_user_response: false
                },
                {
                    headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                    },
                }
                )
                .then((response) => {
                this.show_loader = false;
                this.unanswered_list = [];
                if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE.MSG_CODE) {
                    for (var i in response.data.data[0]) {
                        let temp_int = "";
                        if (Boolean(response.data.data[2][i])) {
                            // temp_int = response.data[2][i].replace(this.companyid + "_", "");
                            temp_int = response.data.data[2][i];
                        }
                        this.unanswered_list.push({
                        question: response.data.data[0][i],
                        intent: temp_int,
                        source: response.data.data[1][i],
                        user_response: response.data.data[2][i],
                        user_feedback: response.data.data[3][i],
                        edit: false,
                        });
                    }
                    this.setpagination(this.page_no);
                }else if(response.data.message.MSG_CODE === this.api_status_code.NO_DATA_AVAILABLE.MSG_CODE){
                    Swal({
                    text: response.data.message.MSG,
                    showCancelButton: false,
                    showConfirmButton: false,
                    toast: true,
                    position: "top-end",
                    timer: 2500,
                    type: "info"
                    });    
                }else {
                    this.show_loader = false;
                    Swal({
                    title: response.data.message.MSG_CODE,
                    text: response.data.message.MSG,
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 2500,
                    type: "error"
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
            } else {
            this.show_loader = true;
            axios
                .post(
                api_calls.get_unanswered_url(),
                {
                    company_id: this.$session.get("UserInformation").company_id,
                    company_name: this.$session.get("UserInformation").company_name,
                    license_key: this.$session.get("UserInformation").license_key,
                    email: this.$session.get("UserInformation").email,
                    token: this.$session.get("UserInformation").tokens,
                    issearch: true,
                    // searchby: this.search_by,
                    key: this.search_name,
                    per_page: this.per_page,
                    page_no: this.page_no,
                    is_get_user_response: false
                },
                {
                    headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                    },
                }
                )
                .then((response) => {
                this.show_loader = false;
                if (response.data.pagination.total_page != undefined) {
                    this.page_no = page;
                    this.unanswered_list = [];
                    this.number_of_rows = response.data.pagination.total_data;
                    this.total_pages =  response.data.pagination.total_page;
                    var data = response.data;
                    for (var i in response.data.data[0]) {
                    let temp_int = "";
                    if (Boolean(data[2][i])) {
                        // temp_int = data[2][i].replace(this.companyid + "_", "");
                        temp_int = data[2][i];
                    }
                    this.unanswered_list.push({
                        question: response.data.data[0][i],
                        intent: temp_int,
                        source: response.data.data[1][i],
                        user_response: response.data.data[2][i],
                        user_feedback: response.data.data[3][i],
                        edit: false,
                    });
                    }
                    this.setpagination(this.page_no);
                } else {
                    toastr.error("Internal Server Error");
                    // setTimeout(() => {
                    // this.$router.go();
                    // }, 2500);
                    this.load_verify_responses_unanswered();
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
        question_selected(value) {
            if (event.target.checked) {
                if (value == "all") {
                    this.checked_list = [];
                    for (var i in this.unanswered_list) {
                        this.checked_list.push(this.unanswered_list[i]);
                }
                } else {
                    this.checked_list.push(this.unanswered_list[value]);
                }
            } else if (!event.target.checked) {
                if (value != "all") {
                    var selectall = document.querySelector("#selectall");
                    if (selectall.checked) {
                        selectall.checked = false;
                    }
                    var temp = this.checked_list.filter((question) => {
                        return question !== this.unanswered_list[value];
                    });
                    this.checked_list = temp;
                }
            }
        },
        delete_single(index) {
            this.show_loader = true;
            let questionlist = [];
            Swal.fire({
                title: this.tlt('unanswered_delete_swal_msg'),
                text: this.tlt('unanswered_delete_this_qs_msg'),
                type: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: this.tlt('unanswered_delete_swal_confirm_msg'),
            }).then((result) => {
                    this.show_loader = false;
                // console.log(result.value);
                if (result.value) {
                
                // console.log("deleted");
                questionlist.push(this.unanswered_list[index].question);
                this.delete_questions_api(questionlist);
                }
            });
        },
        delete_multiple() {
            if (this.checked_list.length == 0) {
                Swal.fire({
                title: this.tlt('unanswered_delete_no_qs_selected_msg'),
                text:"",
                type:"error",
                timer:2000,
                });
            } else if (this.checked_list.length > 0) {
                let questionlist = [];
                Swal.fire({
                title: this.tlt('unanswered_delete_swal_alert_msg'),
                text: this.tlt('unanswered_delete_this_qs_multiple_msg'),
                type: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: this.tlt('unanswered_delete_confirm_swal_msg'),
                }).then((result) => {
                if (result.value) {
                    for (var i in this.checked_list) {
                    questionlist.push(this.checked_list[i].question);
                    }
                    this.delete_questions_api(questionlist);
                }
                });
            }
        },
        delete_questions_api(questionlist) {
        this.show_loader = true;
        axios
            .post(
            api_calls.get_unanswered_url(),
            {
                company_id: this.companyid,
                company_name: this.companyname,
                questionlist: questionlist,
                isDelete: "True",
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
            },
            {
                headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
                },
            }
            )
            .then((response) => {
            this.show_loader = false;
            if (response.data.message.MSG_CODE === this.api_status_code.DELETED_SUCCESSFULLY_0004.MSG_CODE) {
                // console.log("deleted successfully");
                this.checked_list = [];
                this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
                this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
                toastr.success(this.tlt('unanswered_delete_success_msg'));
                // setTimeout(() => {
                // this.$router.go();
                // }, 1500);
                if(questionlist.length === this.unanswered_list.length && 
                    this.page_no >1){
                    this.page_no = this.page_no - 1;
                }
                while(this.page_no > 1 && this.page_no > this.total_pages){
                    this.page_no = this.page_no - 1;
                }
                this.load_verify_responses_unanswered();
            }else{
                this.show_loader = false;
                Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2500,
                type: "error"
                });
            }
            this.show_loader = false;
            })
            .catch((e) => {
            if (
                e.response.status === 410 ||
                e.response.status === 440 ||
                e.response.status === 409
            ) {
                this.$root.$emit("Session_Expired", e.response.data);
            } else {
                toastr.error(e.message);
            }
            this.show_loader = false;
            });
        },
        edit_item(index) {
            this.unanswered_list[index].edit = !this.unanswered_list[index].edit;
            this.old_question = this.unanswered_list[index].question;
            // this.old_intent = this.unanswered_list[index].intent;
            this.old_data.question = this.old_question;
            // this.old_data.intent = this.companyid + "_" + this.old_intent;
            // this.question = question.question;
            // this.intent = question.intent;
            // console.log(this.old_data);
            // console.log(this.old_question);
        },
        submit_question() {
            // console.log("submit");
            // console.log("question", this.old_question);
            // console.log("intent", this.old_intent);
            // console.log("intent", this.isedit);
            event.preventDefault();
            if (this.old_question == "") {
                toastr.error(this.tlt('unanswered_enter_all_field_msg'));
            } else {
                this.show_loader = true;
                axios
                .post(
                    api_calls.get_unanswered_url(),
                    {
                    is_Edit: "True",
                    question: this.old_question,
                    // intent: this.companyid + "_" + this.old_intent,
                    company_name: this.companyname,
                    company_id: this.companyid,
                    old_question_data: this.old_data,
                    email: this.$session.get("UserInformation").email,
                    license_key: this.$session.get("UserInformation").license_key,
                    token: this.$session.get("UserInformation").tokens,
                    subscription: this.$session.get("UserInformation").subscription,
                    },
                    {
                    headers: {
                        Authorization: `Bearer ${this.$session.get("at")}`,
                    },
                    }
                )
                .then((response) => {
                    this.show_loader = false;
                    if (response.data.message.MSG_CODE === this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
                    toastr.error(this.tlt('unanswered_interval_server_msg'));
                    } else if (response.data.message.MSG_CODE === this.api_status_code.EDITED_SUCCESSFULLY_0005.MSG_CODE) {
                    Swal({
                        type: "success",
                        text: this.tlt('unanswered_qs_edited_successful_msg'),
                        timer:2500,
                    }).then((result) => {
                        // if (result.value) {
                        // this.$router.go();
                        // }
                        this.load_verify_responses_unanswered();
                    });
                    } else {
                        this.show_loader = false;
                        Swal({
                        title: response.data.message.MSG_CODE,
                        text: response.data.message.MSG,
                        showCancelButton: false,
                        showConfirmButton: false,
                        timer: 2500,
                        type: "error"
                        });
                    } 
                    // else if (response.data == "Question Intent Updated") {
                    // Swal({
                    //     type: "success",
                    //     text: "Your question has been updated successfully",
                    //     timer:2000,
                    // }).then((result) => {
                    //     // if (result.value) {
                    //     // this.$router.go();
                    //     // }
                    //     this.load_verify_responses_unanswered();
                    // });
                    // }
                })
                .catch((e) => {
                    if (
                    e.response.status === 410 ||
                    e.response.status === 440 ||
                    e.response.status === 409
                    ) {
                    this.$root.$emit("Session_Expired", e.response.data);
                    } else {
                    toastr.error(this.tlt('unanswered_interval_server_msg1'));
                    }
                });
                this.close_modal('add_quesn_save');
            }
        },
        pagination_class(index) {
            if (index == this.page_no) {
                return " active";
            } else {
                return "";
            }
        },
        add_questions() {
            this.show_loader = true;
            var questionlist = [];
            var temp_list = [];
            var empty = this.unanswered_list.filter((unanswered) => {
                return unanswered.intent == "";
            });
            for (var i in this.unanswered_list) {
                if (this.unanswered_list[i].intent != "") {
                temp_list.push(
                    this.unanswered_list[i].question,
                    // this.companyid + "_" + this.unanswered_list[i].intent
                    this.unanswered_list[i].intent
                );
                questionlist.push(temp_list);
                }
                temp_list = [];
            }
            if (questionlist.length > 0) {
                this.show_loader = true;
                axios
                .post(
                    api_calls.get_unanswered_url(),
                    {
                    company_name: this.companyname,
                    company_id: this.companyid,
                    isAdd: "True",
                    questionintent: questionlist,
                    email: this.$session.get("UserInformation").email,
                    license_key: this.$session.get("UserInformation").license_key,
                    token: this.$session.get("UserInformation").tokens,
                    },
                    {
                    headers: {
                        Authorization: `Bearer ${this.$session.get("at")}`,
                    },
                    }
                )
                .then((response) => {
                    this.show_loader = false;
                    if (response.data.message.MSG_CODE === this.api_status_code.ADDED_SUCCESSFULLY_0002.MSG_CODE) {
                        swal({
                            text: this.tlt('unanswered_added_successful_msg'),
                            type: "success",
                            timer: 3000,
                        });
                         if(questionlist.length === this.unanswered_list.length && 
                            this.page_no >1){
                            this.page_no = this.page_no - 1;
                        }
                        this.load_verify_responses_unanswered();
                    }else {
                        this.show_loader = false;
                        Swal({
                        title: response.data.message.MSG_CODE,
                        text: response.data.message.MSG,
                        showCancelButton: false,
                        showConfirmButton: false,
                        timer: 2500,
                        type: "error"
                        });
                    } 
                })
                .catch((e) => {
                    this.show_loader = false;
                    if (
                    e.response.status === 410 ||
                    e.response.status === 440 ||
                    e.response.status === 409
                    ) {
                    this.$root.$emit("Session_Expired", e.response.data);
                    }
                });
            } else {
                toastr.error(this.tlt('unanswered_add_question_msg'));
            }
            this.show_loader = false;
        },
        search_question() {
            // if(this.search_by!=''){
            if (this.search_name != "") {
                this.checked_list = [];
                $("input:checkbox").prop("checked", false);
                this.show_loader = true;
                axios
                .post(
                    api_calls.get_unanswered_url(),
                    {
                    company_id: this.$session.get("UserInformation").company_id,
                    company_name: this.$session.get("UserInformation").company_name,
                    license_key: this.$session.get("UserInformation").license_key,
                    email: this.$session.get("UserInformation").email,
                    token: this.$session.get("UserInformation").tokens,
                    issearch: true,
                    // searchby: this.search_by,
                    key: this.search_name,
                    per_page: this.per_page,
                    page_no: 1,
                    is_get_user_response: false
                    },
                    {
                    headers: {
                        Authorization: `Bearer ${this.$session.get("at")}`,
                    },
                    }
                )
                .then((response) => {
                    this.show_loader = false;
                    if (response.data.message.MSG_CODE === this.api_status_code.NO_DATA_AVAILABLE.MSG_CODE) {
                    toastr.error(this.tlt('unanswered_no_qs_found_msg'));
                    // setTimeout(() => {
                    //     this.$router.go();
                    // }, 2500);
                    this.load_verify_responses_unanswered();
                    } else if (response.data.pagination.total_page != undefined) {
                    this.page_no = 1;
                    this.unanswered_list = [];
                    this.number_of_rows =  response.data.pagination.total_data;
                    this.total_pages = response.data.pagination.total_page;
                    var data = response.data.data;
                    for (var i in response.data.data[0]) {
                        let temp_int = "";
                        if (Boolean(data[2][i])) {
                            // temp_int = data[2][i].replace(this.companyid + "_", "");
                            temp_int = data[2][i];
                        }
                        this.unanswered_list.push({
                        question: response.data.data[0][i],
                        intent: temp_int,
                        source: response.data.data[1][i],
                        user_response: data[2][i],
                        user_feedback: data[3][i],
                        edit: false,
                        });
                    }
                    this.setpagination(this.page_no);
                    }
                    // else if (response.data.MSG == "No Questions Found") {
                    //   toastr.error("No Question Found");
                    //   setTimeout(() => {
                    //     this.$router.go();
                    //   }, 2500);
                        // this.load_verify_responses_unanswered();
                    // }
                    else {
                    toastr.error(this.tlt('unanswered_internal_server_msg2'));
                    // setTimeout(() => {
                    //     this.$router.go();
                    //   }, 2500);
                    this.load_verify_responses_unanswered();
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
                toastr.error(this.tlt('unanswered_data_for_search_msg'));
            }
            // }else{
            //   toastr.error("Select header for searching");
            // }
        },
    }
}
</script>
<style scoped>
/* .table-responsive {
  min-height: 400px;
} */

.form-group{
    margin: 0 0 4px;
    top: 3px;
}
.table-head{
    padding-top: 15px;
}
@media (max-width: 1400px){
    .form-group{
        margin: 0 0 -5px;
        top: -2px;
    }
}
</style>