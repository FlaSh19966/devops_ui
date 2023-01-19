<template>
    <div>
        <div class="spinner" v-show="spinnerOn" id="spinner"></div>
        <div class="dash-cont">
            <div class="container-fluid">
                <div class="card dash-card">
                    <div class="card-header d-block d-sm-flex flex-wrap justify-content-between">
                        <h4 class="mb-sm-0">Manage Bots</h4>
                        <div class="card-act d-flex flex-wrap">

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
                                                            id="selectall"
                                                            class="form-check-input"
                                                            @change="selected_tasks('all')"
                                                            type="checkbox"
                                                            value
                                                            required
                                                        />
                                                        <span class="icn"></span>
                                                    </label>
                                                </div>
                                            </th>
                                            <th scope="col" style="width:2%">ACTION</th>
                                            <th scope="col">BOT NAME</th>
                                            <th scope="col">ASSIGNED TO</th>
                                            <th scope="col">ETA</th>
                                            <th scope="col">STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(bot,index) in bot_list" :key="index">
                                            <th scope="col">
                                                <div class="form-check checkbox-success">
                                                    <label class="form-check-label checkbox checkbox-success">
                                                    <input
                                                        class="form-check-input"
                                                        type="checkbox"
                                                        @change="check_list_array(index)"
                                                    />
                                                    <span class="icn"></span>
                                                    </label>
                                                </div>
                                            </th>
                                            <td class="action">
                                                <a href="#" id="edit_role_id">
                                                    <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="15.392"
                                                    height="15.392"
                                                    viewBox="0 0 15.392 15.392"
                                                    style="cursor:pointer"
                                                    @click="get_bot_details(index)"
                                                    >
                                                    <path
                                                        id="square-edit-outline"
                                                        d="M4.71,3A1.7,1.7,0,0,0,3,4.71V16.682a1.71,1.71,0,0,0,1.71,1.71H16.682a1.71,1.71,0,0,0,1.71-1.71V10.7h-1.71v5.986H4.71V4.71H10.7V3H4.71m10.928.855a.591.591,0,0,0-.41.171L14.185,5.061,16.322,7.2l1.043-1.035a.578.578,0,0,0,0-.812L16.04,4.026a.571.571,0,0,0-.4-.171M13.578,5.668l-6.3,6.311v2.138H9.413l6.3-6.311Z"
                                                        transform="translate(-3 -3)"
                                                        fill="#9499ae"
                                                    />
                                                    </svg>
                                                </a>
                                            </td>
                                            <td v-if="bot.assigned_to!=null">{{bot.bot_name}}</td>
                                            <td v-else @click="get_bot_details(index)">{{bot.bot_name}}</td>
                                            <td v-if="bot.assigned_to!=null">{{bot.assigned_to}}</td>
                                            <td v-else @click="get_bot_details(index)">None</td>
                                            <td v-if="bot.eta!=null">{{bot.eta}}</td>
                                            <td v-else @click="get_bot_details(index)">None</td>
                                            <td>{{bot.status}}</td>
                                        </tr>
                                    </tbody>
                                </table>
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
                                                <h3>Manage Bot</h3>
                                            </div>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="clear_all">
                                                <img src="/img/close-icn.png" alt />
                                            </button>
                                            <form @submit="edit_bot_details">
                                                {{bot_list[selected_bot]}}<br>
                                                Bot Status:<br>
                                                <select class="form-control" id="edit_status" v-model="edit_status">
                                                    <option value disabled>Select</option>
                                                    <option
                                                        v-for="(stat,index) in status"
                                                        :key="index"
                                                        :value="stat"
                                                    >{{stat}}</option>
                                                </select>
                                                ETA:<br>
                                                ETA Reason:<br>
                                                Assigned To:<br>
                                                Progress Update:<br>                       
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
import $ from "jquery";
import 'jquery-ui/ui/widgets/datepicker.js';
export default {
    data(){
        return {
            bot_list: [],
            isEdit: false,
            status: ['In Progress','Active','Submitted'],
            developers: [],
            selected_bot: null,
            edit_status: null,
            edit_reason_for_eta: null,
            edit_eta: null,
            edit_assigned_to: null,
            edit_progress_update: null,
            spinnerOn: false
        }
    },
    created(){
        // axios
        //     .post(api_calls(),{
        //         company_id: this.companyid,
        //         company_name: this.companyname,
        //         email: this.$session.get("UserInformation").email,
        //         license_key: this.$session.get("UserInformation").license_key,
        //         token: this.$session.get("UserInformation").tokens,
        //     });

        //////////////
        axios
            .get(api_calls.open_bot(),{
                params:{
                    company_name: this.$session.get("UserInformation").company_name,
                    company_id: this.$session.get("UserInformation").company_id,
                    email: this.$session.get("UserInformation").email,
                    license_key: this.$session.get("UserInformation").license_key,
                    token: this.$session.get("UserInformation").tokens,
                    // bot_name: this.$route.params.botdata.bot_name,
                },
                headers: {
									Authorization: `Bearer ${this.$session.get("at")}`,
                }
            })
            .then(response=>{
                console.log(response);
                for(let i=0;i<response.data.Bots.length;i++){
                    this.bot_list.push({
                        bot_name: response.data.Bots[i].bot_name,
                        eta: response.data.Bots[i].eta,
                        status: response.data.Bots[i].status,
                        assigned_to: response.data.Bots[i].assigned_to,
                    });
                }
                console.log(this.bot_list);
                // this.bot_list=response.data.Bots;
                // this.levels=response.data.Bot.structure;
                // this.maxid = this.levels.length
            });
    },
    methods: {
        get_bot_details(index){
            $("#botmodel").modal("show");
        },
        edit_bot_details(){
            
        },
        clear_all(){

        }
    }
}
</script>