<template>
  <div id="top_navbar">
    <div
      class="spinner"
      id="spinner"
      v-show="spinnerOn != undefined && spinnerOn == true"
    ></div>
    <div class="dash-head">
      <nav class="navbar navbar-expand-md navbar-light">
        <!-- <a class="navbar-brand" href="/bot/dashboard"> -->
        <a
          class="navbar-brand"
          href="javascript: void(0)"
          :style="topnavbar_disable()"
          @click="page_redirect"
        >
          <img src="/img/logo.png" alt />
        </a>
        <ul class="nav nav-pills ml-auto">
          <!-- harsh -->
          <span
            style="cursor: pointer; padding-top: 0.45rem; color: white; 
            font-weight: bold; margin-top: 13px;"
            title="Start your guide"
            @click="listen_data"
            data-toggle="modal"
            data-target="#helpguide"
            :style="topnavbar_disable()"
            >{{tlt('help')}}</span
          >
          <!-- <li class="nav-item dropdown"> -->
          <!-- <img
              :src="tour_guide_icon"
              style="cursor: pointer; padding-top: 0.45rem"
              title="Start your guide"
              data-toggle="modal" data-target="#helpguide"
            /> -->
          <!-- </li> -->
          <!-- <div class="modal fade openmodel" id="helpguide" role="dialog" data-backdrop="static"> -->

          <li class="nav-item dropdown noti-drop">
            <a
              class="nav-link dropdown-toggle"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
              @click="seen_all_notifications"
              :style="topnavbar_disable()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="20"
                viewBox="0 0 17 20"
              >
                <path
                  id="bell-outline"
                  d="M16,17H7V10.5a4.5,4.5,0,0,1,9,0M18,16V10.5a6.508,6.508,0,0,0-5-6.32V3.5a1.5,1.5,0,0,0-3,0v.68A6.5,6.5,0,0,0,5,10.5V16L3,18v1H20V18m-8.5,4a2,2,0,0,0,2-2h-4A2,2,0,0,0,11.5,22Z"
                  transform="translate(-3 -2)"
                  fill="#fff"
                />
              </svg>
              <span class="noti-icn"></span>
              <!-- <span class="badge">3</span> -->
              <span
                class="badge"
                v-if="unseen_notifications > 0 && unseen_notifications < 10"
                >{{ unseen_notifications }}</span
              >
              <span class="badge" v-if="unseen_notifications > 9">9+</span>
            </a>
            <div class="dropdown-menu">
              <div class="noti-head">{{ tlt("notifications") }}</div>

              <div
                class="noti-body"
                style="max-height: 300px; overflow-x: auto"
              >
                <div
                  style="padding: 10px 15px; border-bottom: solid 1px #f1f1f3;display:flex;flex-direction:row;justify-content: space-between;"
                  class="noti-blk pending"
                  v-for="(notification, notify) in notifications"
                  :key="notify"
                >
                  <button
                    type="button"
                    @click="
                      clear_single_notification(
                        notification != undefined ? notification.id : null,
                        notify
                      )
                    "
                    class="close"
                    style="
                      font-size: 0px;
                      height: 11px;
                      width: 11px;
                      padding-top: 4px;
                    "
                  >
                    <img
                      src="/img/close-icn.png"
                      alt
                      style="height: 11px; width: 11px"
                    />
                  </button>
                  <template v-if="notification.Notificationid">
                    <p
                      style="font-size: 13px; font-weight: 500; margin: 0 0 5px"
                    >
                      {{ notification.Notificationid }}
                    </p>
                    <p
                      style="
                        font-size: 11px;
                        font-weight: 400;
                        margin: 0;
                        color: #9499ae;
                      "
                    >
                      {{ notification.visitor_name }}
                    </p>
                  </template>
                  <template
                    v-else-if="notification.ModelType == 'Intent,Dialogue'"
                  >
                    <p
                      style="font-size: 13px; font-weight: 500; margin: 0 0 5px"
                    >
                      <span v-if="notification.TrainingStatus == 'Completed'">
                        {{ tlt("latest_model_trained_on") }}
                        {{ notification.date }} {{ tlt("successfully") }}.
                      </span>
                      <span v-if="notification.TrainingStatus == 'Started'">
                        {{ tlt("latest_model_trained_on") }}
                        {{ notification.date }}.
                      </span>
                      <template v-if="notification.TrainingStatus == 'Failed'">
                        {{ tlt("training_of_model_on") }}
                        {{ notification.date }} {{ tlt("has_failed") }}
                        <a
                          href="javascript:void(0)"
                          @click="
                            generate_email_wizard(
                              notification.ModelType,
                              notification.InitiatedOn
                            )
                          "
                          >{{ tlt("contact_admin") }}</a
                        >
                      </template>
                      <!--{{ notification.ModelType }} Model-->
                    </p>
                  </template>
                  <template v-else-if="notification.ModelType" style="display:flex ;flex-direction:row">
                    <p
                      style="font-size: 13px; font-weight: 500; margin: 0 0 5px"
                    >
                      <span v-if="notification.TrainingStatus == 'Completed'">
                        {{tlt("your_latest")}} {{ notification.ModelType }} {{tlt("model has been trained on")}} {{ notification.date }} {{tlt("successfully")}}.
                      </span>
                      <span v-if="notification.TrainingStatus == 'Started'">
                        {{tlt('a_new')}}{{ notification.ModelType }} {{tlt('noti_model_train_req_initiated')}}
                        {{ tlt(notification.date) }}.
                      </span>
                      <template v-if="notification.TrainingStatus == 'Failed'">
                        {{ tlt('training_of')}} {{ notification.ModelType }} {{tlt('model_on')}}
                        {{ notification.date }} {{tlt('has_failed')}}.
                        <a
                          href="javascript:void(0)"
                          @click="
                            generate_email_wizard(
                              notification.ModelType,
                              notification.InitiatedOn
                            )
                          "
                          >{{tlt('noti_contact_admin')}}</a
                        >
                      </template>
                      <!--{{ notification.ModelType }} Model-->
                    </p>
                    
                  </template>
                </div>
                <!-- <div class="not-blk pending">
                  <h5>David Lee</h5>
                  <p>Hey, I just read your message. How are you?</p>
                </div>
                <div class="not-blk pending">
                  <h5>Jonathan Chen</h5>
                  <p>Are you available later today to chat?</p>
                </div>
                <div class="not-blk read">
                  <h5>Jackie Berry</h5>
                  <p>I will be unavailable until after 5pm today. </p>
                </div>
                <div class="not-blk read">
                  <h5>Alex Johnson</h5>
                  <p>How is your day?</p>
                </div>
                <div class="not-blk read">
                  <h5>Maria Cooper</h5>
                  <p>What are you doing this weekend?</p>
                </div> -->
              </div>
              <div class="noti-foot">
                <a
                  href="#"
                  @click="clear_all_notifications"
                  v-if="notifications.length > 0"
                  >{{tlt('noti_clear_all')}} 
                  </a>
              </div>
            </div>
          </li>
          <li
            class="nav-item dropdown user-drop"
            v-if="user_role == 'SuperAdmin'"
          >
            <a
              class="nav-link dropdown-toggle"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="true"
            >
              <span class="user-txt" v-if="company_selected == ''"
                >{{tlt('select_a_company_name')}}</span
              >
              <span class="user-txt" v-else>{{ company_selected }}</span>
            </a>
            <div class="dropdown-menu" style="min-height: auto">
              <div class="noti-body">
                <div
                  class="not-blk pending"
                  v-for="(company, index) in companies"
                  :key="index"
                >
                  <a href="#" @click="company_changed(company)">{{
                    company
                  }}</a>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item" v-show="user_type == 'Partner'">
            <a
              class="nav-link"
              href="#"
              role="button"
              aria-haspopup="true"
              data-toggle="modal"
              data-target="#invite_modal"
              aria-expanded="true"
            >
              <span class="user-txt">Invite Link</span>
            </a>
          </li>
          <li class="nav-item" v-show="tickets_bar_access">
            <a
              @click="raise_ticket"
              class="nav-link"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="true"
            >
              <span class="user-txt">Raise Ticket</span>
            </a>
          </li>
          <li class="nav-item dropdown user-drop">
            <a
              class="nav-link dropdown-toggle"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="true"
              id="logout_dropdown"
            >
              <span class="user-img text-center"
                >{{ user_first_name[0] }}{{ user_last_name[0] }}</span
              >
              <span
                class="user-txt"
                v-show="user_first_name != null && user_last_name != null"
                >{{ user_first_name }} {{ user_last_name }}</span
              >
            </a>
            <div class="dropdown-menu">
              <form class="user-form">
                <div class="user-avatar px-4 py-3">
                  <div
                    class="avatar"
                    v-show="user_first_name != null && user_last_name != null"
                  >
                    <img
                      v-show="photo_img_url"
                      v-bind:src="photo_img_url"
                      alt
                    />
                    <span v-show="!photo_img_url"
                      >{{ user_first_name[0] }}{{ user_last_name[0] }}</span
                    >
                    <div class="user-over">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="100"
                        viewBox="0 0 20 20"
                      >
                        <path
                          id="circle-edit-outline"
                          d="M12,2A10,10,0,1,0,22,12H20a8,8,0,1,1-8-8V2m6.78,1a.691.691,0,0,0-.48.2L17.08,4.41l2.5,2.5L20.8,5.7a.676.676,0,0,0,0-.95L19.25,3.2a.668.668,0,0,0-.47-.2M16.37,5.12,9,12.5V15h2.5l7.37-7.38Z"
                          transform="translate(-2 -40)"
                          fill="#fff"
                        />
                      </svg>
                    </div>
                    <input
                      type="file"
                      accept="image/"
                      class="user-update"
                      ref="myFiles"
                      @change="editImage"
                    />
                  </div>
                  <h3
                    v-show="user_first_name != null && user_last_name != null"
                  >
                    {{ user_first_name }} {{ user_last_name }}
                    <a href="#" style="margin: 0 0 10px; padding: 0 0 10px">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15.392"
                        height="15.392"
                        viewBox="0 0 15.392 15.392"
                        data-toggle="modal"
                        data-target="#edit_profile_modal"
                      >
                        <path
                          id="square-edit-outline"
                          d="M4.71,3A1.7,1.7,0,0,0,3,4.71V16.682a1.71,1.71,0,0,0,1.71,1.71H16.682a1.71,1.71,0,0,0,1.71-1.71V10.7h-1.71v5.986H4.71V4.71H10.7V3H4.71m10.928.855a.591.591,0,0,0-.41.171L14.185,5.061,16.322,7.2l1.043-1.035a.578.578,0,0,0,0-.812L16.04,4.026a.571.571,0,0,0-.4-.171M13.578,5.668l-6.3,6.311v2.138H9.413l6.3-6.311Z"
                          transform="translate(-3 -3)"
                          fill="#9499ae"
                        />
                      </svg>
                    </a>
                  </h3>
                  <p>
                    <span>{{ tlt("user_profile_role_label") }}:</span>
                    {{ user_role }}
                  </p>
                  <a
                    href="#"
                    data-toggle="modal"
                    style="font-size: 15px"
                    data-target="#change_password_modal"
                    >{{ tlt("change_pwd_btn_link") }}</a
                  >
                </div>
                <div class="user-frm px-4 py-3">
                  <div class="form-group">
                    <label>{{ tlt("user_profile_company_id_label") }}</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="user_company_id"
                      :placeholder="tlt('company_id')"
                      disabled
                    />
                  </div>
                  <div class="form-group">
                    <label>{{ tlt("user_profile_company_name_label") }}</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="user_company_name"
                      :placeholder="tlt('company_name')"
                      disabled
                    />
                  </div>
                  <div class="form-group">
                    <label>{{ tlt("user_profile_first_name_label") }}</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="user_first_name"
                      :placeholder="tlt('first_name')"
                      disabled
                    />
                  </div>
                  <div class="form-group">
                    <label>{{ tlt("user_profile_last_name_label") }}</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="user_last_name"
                      :placeholder="tlt('last_name')"
                      disabled
                    />
                  </div>
                  <div class="form-group">
                    <label>{{ tlt("user_profile_email_label") }}</label>
                    <input
                      type="email"
                      class="form-control"
                      v-model="email"
                      disabled
                      :placeholder="tlt('email')"
                    />
                  </div>
                  <div class="form-group">
                    <label>{{ tlt("user_profile_country_label") }}</label>
                    <input
                      type="country"
                      class="form-control"
                      v-model="user_country_name.name"
                      :placeholder="tlt('country')"
                      disabled
                    />
                  </div>
                  <div class="form-group">
                    <label>{{ tlt("user_profile_ph_number_label") }}</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="user_phone_number"
                      :placeholder="tlt('phone_no')"
                      disabled
                    />
                  </div>
                </div>
                <div class="user-foot text-right px-4 py-3">
                  <a
                    style="margin-top: -10px"
                    href="javascript:void(0)"
                    class="red-btn"
                    @click="signout_api"
                    id="logout_btn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14.733"
                      height="14.733"
                      viewBox="0 0 14.733 14.733"
                    >
                      <path
                        id="logout-variant"
                        d="M12.069,13.3l2.12-2.12H6.274V9.548h7.915l-2.12-2.12,1.162-1.154,4.093,4.093-4.093,4.093L12.069,13.3M16.1,3a1.637,1.637,0,0,1,1.637,1.637V8.459L16.1,6.822V4.637H4.637V16.1H16.1V13.911l1.637-1.637V16.1A1.637,1.637,0,0,1,16.1,17.733H4.637A1.637,1.637,0,0,1,3,16.1V4.637A1.631,1.631,0,0,1,4.637,3Z"
                        transform="translate(-3 -3)"
                        fill="#fff"
                      />
                    </svg>
                    {{ tlt("user_profile_logout_btn") }}
                  </a>
                </div>
              </form>
            </div>
          </li>
        </ul>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </nav>
    </div>
    <div
      id="helpguide"
      class="modal fade openmodel"
      role="dialog"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content" style="max-height:100%;">
          <!-- <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    <div v-html="calldata"></div>
                  </h5> -->
          <button
            type="button"
            class="close"
            style="font-size:2rem;"
            data-dismiss="modal"
            aria-label="Close"
          >
            <img src="/img/close-icn.png" alt />
          </button>
          <div v-html="calldata"></div>
          <!-- </div> -->
          <!-- /{{ calldata }}  -->
          <!-- <div class="modal-body">
                  
                </div> -->
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">
              {{tlt('Close')}}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade dash-modal"
      id="change_password_modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="intentmodeltitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>{{ tlt("pwd_model_header") }}</h3>
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
            <form @submit="submit_new_password">
              <div class="form-group">
                <label>{{ tlt("pwd_model_old_pwd_label") }}</label>
                <input
                  v-model="old_password"
                  type="password"
                  id="old_password"
                  class="form-control pass"
                  :placeholder="tlt('old_password')"
                />
                <!-- <div
                  class="is-invalid"
                  style="color: red"
                  v-if="validOldPassword != true && old_password != ''"
                >
                  {{ validOldPassword }}
                </div> -->
                <a
                  href="#"
                  @click="password_toggle('old_password')"
                  class="view-pass"
                >
                  <img src="/img/eye-icn.png" alt />
                </a>
              </div>
              <div class="form-group">
                <label>{{ tlt("pwd_model_new_pwd_label") }}</label>
                <input
                  v-model="new_password"
                  type="password"
                  id="new_password"
                  class="form-control pass"
                  :placeholder="tlt('new_password')"
                />
                <!-- <div
                  class="is-invalid"
                  style="color: red"
                  v-if="validPassword != true && new_password != ''"
                >
                  {{ validPassword }}
                </div> -->
                <a
                  href="#"
                  @click="password_toggle('new_password')"
                  class="view-pass"
                >
                  <img src="/img/eye-icn.png" alt />
                </a>
                <password-validator
                  :testpassword="new_password"
                  @correctPassword="check_password"
                  style="padding: 0px"
                ></password-validator>
              </div>
              <div class="form-group">
                <label>{{ tlt("pwd_model_confirm_pwd_label") }}</label>
                <input
                  v-model="confirm_password"
                  type="password"
                  class="form-control pass"
                  :placeholder="tlt('confirm_password')"
                  id="confirm_password"
                />
                <div
                  class="is-invalid"
                  style="color: red"
                  v-if="validConfirmPassword != true && confirm_password != ''"
                >
                  {{ validConfirmPassword }}
                </div>
                <a
                  href="#"
                  @click="password_toggle('confirm_password')"
                  class="view-pass"
                >
                  <img src="/img/eye-icn.png" alt />
                </a>
              </div>
              <div class="btn-wrap text-right">
                <button type="button" class="btn btn-link" data-dismiss="modal">
                  {{ tlt("pwd_model_cancel_btn") }}
                </button>
                <button type="submit" class="darkblue-btn">
                  {{ tlt("pwd_model_save_btn") }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade dash-modal"
      id="edit_profile_modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="intentmodeltitle"
      aria-hidden="true"
      style="z-index: 10000"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/user-blue.png" alt />
              </div>
              <h3>{{ tlt("edit_model_header") }}</h3>
            </div>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <img src="/img/close-icn.png" alt />
            </button>
            <form @submit="edit_profile_api">
              <div class="form-group">
                <label>{{ tlt("edit_model_first_name_label") }}</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="user_first_name"
                  :placeholder="tlt('Enter First Name')"
                />
              </div>
              <div class="form-group">
                <label>{{ tlt("edit_model_last_name_label") }}</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="user_last_name"
                  :placeholder="tlt('enter_last')"
                />
              </div>
              <div class="form-group">
                {{ tlt("edit_model_country_label") }}
                <multiselect
                  v-model="user_country_name"
                  id="select_country_name"
                  :options="country_list"
                  :searchable="true"
                  :placeholder="tlt('country_name')"
                  :close-on-select="true"
                  track-by="name"
                  label="name"
                ></multiselect>
              </div>
              <div class="form-group">
                <label>{{ tlt("edit_model_ph_number_label") }}</label>
                <!-- <input
                  type="text"
                  class="form-control"
                  v-model="user_phone_number"
                  placeholder="Enter Phone Number"
                />
                <span
                  style="color: red"
                  v-if="validPhoneNumber != true && user_phone_number != ''"
                  >{{ validPhoneNumber }}</span
                > -->
                <vue-phone-number-input
                  style="margin-bottom: 1.1rem"
                  v-model="user_phone_number"
                  :no-use-browser-locale="true"
                  @update="phoneNumber = $event"
                >
                </vue-phone-number-input>
              </div>
              <div class="btn-wrap text-right">
                <button type="button" class="btn btn-link" data-dismiss="modal">
                  {{ tlt("edit_model_cancel_btn") }}
                </button>
                <button type="submit" class="darkblue-btn">
                  {{ tlt("edit_model_save_btn") }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade dash-modal"
      id="invite_modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="intentmodeltitle"
      aria-hidden="true"
      style="z-index: 10000"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/user-blue.png" alt />
              </div>
              <h3>{{tlt('invite_company')}}</h3>
            </div>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <img src="/img/close-icn.png" alt />
            </button>
            <form @submit="send_invite">
              <div class="form-group">
                <label>{{tlt('company_name')}}</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="invite_company_name"
                  :placeholder="tlt('company_name')"
                />
              </div>
              <div class="form-group">
                <label>{{tlt('company_email')}}</label>
                <input
                  type="email"
                  :class="'form-control is-valid' + email_class"
                  v-model="invite_company_email"
                  :placeholder="tlt('company_email')"
                />
              </div>
              <div class="btn-wrap text-right">
                <button type="button" class="btn btn-link" data-dismiss="modal">
                  {{tlt('cancel_btn')}}
                </button>
                <button type="submit" class="darkblue-btn">{{tlt('invite_btn')}}</button>
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
import { bus } from "@/portal/main";
import Countries from "@/portal/components/Countries";
import api_calls from "@/portal/api_calls";
import fingerprint from "@/portal/components/fingerprint";
import { setTimeout } from "timers";
import Multiselect from "vue-multiselect";
import { stringTypeAnnotation } from "@babel/types";
import { stringify } from "querystring";
import { Socket } from "phoenix-socket";
import Swal from "sweetalert2";
import moment from "moment";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
import PasswordValidator from "../Pages/PasswordValidator.vue";
import page_guide from "@/portal/mixins/page_guide.js";
import path from "path";

export default {
  beforeRouteEnter(to, from, next) {
    console.log('Welcome to the swamp!');
    next();
  },
  mixins: [page_guide],
  props: ["title"],
  components: {
    Multiselect,
    VuePhoneNumberInput,
    PasswordValidator
  },
  data() {
    return {
      is_open:true,
      intent_data: null,
      calldata: "",
      new_password: "",
      old_password: "",
      confirm_password: "",
      correct_password: false,
      company_name: null,
      company_id_selected: null,
      companies: [],
      country_list: null,
      company_id: [],
      user_company: null,
      tickets_bar_access: false,
      invite_company_email: null,
      invite_company_name: null,
      old_file_name: null,
      file_label: "Choose file",
      issue: "",
      issue_description: "",
      img_file: "",
      spinnerOn: false,
      photo_img_url: "",
      existing_file_name: null,
      user_country_name: {
        code: "",
        name: ""
      },
      user_phone_number: this.$session.has("PhoneNumber")
        ? this.$session.get("PhoneNumber")
        : this.$session.has("UserInformation")
        ? this.$session.get("UserInformation").phone_no
        : "",
      user_first_name: this.$session.has("UserFirstName")
        ? this.$session.get("UserFirstName")
        : this.$session.has("UserInformation")
        ? this.$session.get("UserInformation").first_name
        : "",
      user_last_name: this.$session.has("UserLastName")
        ? this.$session.get("UserLastName")
        : this.$session.has("UserInformation")
        ? this.$session.get("UserInformation").last_name
        : "",
      company_selected: this.$session.has("CompanyName")
        ? this.$session.get("CompanyName")
        : "Select A Company",
      user_company_name: this.$session.has("UserInformation")
        ? this.$session.get("UserInformation").company_name
        : "",
      email: this.$session.has("UserInformation")
        ? this.$session.get("UserInformation").email
        : "",
      user_company_id: this.$session.has("UserInformation")
        ? this.$session.get("UserInformation").company_id
        : "",
      user_role: this.$session.has("UserInformation")
        ? this.$session.get("UserInformation").role
        : "",
      user_type: this.$session.has("UserInformation")
        ? this.$session.get("UserInformation").registration_type
        : "",
      phone_number_validity: /\+[0-9]{9,14}$/,
      reg_pwd: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}/,
      reg_email: /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/,
      notifications: [],
      to_show_notifications: false,
      socket: null,
      scheduler_channel: null,
      training_channel: null,
      phoneNumber: null,
      tour_guide_icon: require("@/portal/assets/img/info_icon.svg"),
      disable_navbar: false
    };
  },
  computed: {
    validOldPassword() {
      if (this.reg_pwd.test(this.old_password)) {
        return true;
      } else {
        return `${this.tlt('invalid_password')}`;
      }
    },
    validPassword() {
      if (this.reg_pwd.test(this.new_password)) {
        return true;
      } else {
        return `${this.tlt('invalid_password')}`;
      }
    },
    validConfirmPassword() {
      if (this.confirm_password == this.new_password) {
        return true;
      } else {
        return `${this.tlt('pass_no_match')}`;
      }
    },
    // validPhoneNumber() {
    //   if (
    //     this.phone_number_validity.test(
    //       this.user_phone_number.replace(/\s+/g, "")
    //     )
    //   ) {
    //     return true;
    //   } else {
    //     return "Please enter a valid phone number in the format: +CountryCode Number";
    //   }
    // },
    unseen_notifications() {
      let count = 0;
      for (let i = 0; i < this.notifications.length; i++) {
        if (!this.notifications[i].is_clear) {
          count++;
        }
      }
      return count;
    }
  },
  created() {
    this.country_list = Countries;
    if (this.$session.has("photo_img_url")) {
      this.photo_img_url = this.$session.has("UserInformation")
        ? this.$session.get("photo_img_url")
        : "";
    } else {
      this.photo_img_url = this.$session.has("UserInformation")
        ? this.$session.get("UserInformation").photo_img_url
        : "";
    }
    if (
      this.$session.has("country_name") &&
      this.$session.has("UserInformation")
    ) {
      this.user_country_name.code = this.$session.get("country_name");
      let select_country = this.country_list.filter(country => {
        return country.code == this.user_country_name.code;
      });
      this.user_country_name.name = select_country[0].name;
    } else {
      this.user_country_name.code = this.$session.has("UserInformation")
        ? this.$session.get("UserInformation").country_name
        : "";
      if (this.$session.get("UserInformation").country_name == null) {
        this.user_country_name.code = "";
      }
      if (this.user_country_name.code.length > 0) {
        let select_country = this.country_list.filter(country => {
          return country.code == this.user_country_name.code;
        });
        this.user_country_name.name =
          select_country[0] === undefined ? "" : select_country[0].name;
      }
    }
    if (this.user_role == "Admin") {
      this.company_selected = this.$session.get("UserInformation")
        ? this.$session.get("UserInformation").company_name
        : "";
    }
    if (this.$session.get("UserInformation").role == "SuperAdmin") {
      axios
        .post(
          api_calls.company_list_url(),
          {
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
            license_key: this.$session.get("UserInformation").license_key,
            email: this.$session.get("UserInformation").email,
            token: this.$session.get("UserInformation").tokens
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          }
        )
        .then(response => {
          this.companies = response.data.data[0];
          this.company_id = response.data.data[1];
        });
    }
    if (this.user_first_name == null || this.user_first_name == "") {
      this.user_first_name = "First";
      this.user_last_name = "Last";
      this.$session.set("UserFirstName", this.user_first_name);
      this.$session.set("UserLastName", this.user_last_name);
    }
    var menus = this.$session.has("ChatbotMenu")
      ? this.$session.get("ChatbotMenu")
      : [];
    var ticket_access = menus.filter(menu => {
      return menu.main_menu.name == "Tickets";
    });
    if (ticket_access.length == 0) {
      this.tickets_bar_access = false;
    } else if (ticket_access.length == 1) {
      this.tickets_bar_access = true;
    }

    var notifications_access = false;

    for (var i = 0, n = menus.length; i < n; i += 1) {
      for (let j = 0, l = menus[i].sub_menu_list.length; j < l; j += 1) {
        if (menus[i].sub_menu_list[j].name == "Scheduler") {
          notifications_access = true;
          break;
        }
      }
    }
    this.socket = new Socket(
      process.env.VUE_APP_PUSH_NOTIFICATIONS_WEBSOCKET_ENDPOINT,
      {
        params: {
          notification_test: true
        }
      }
    );
    this.socket.connect();
    if (Boolean(notifications_access)) {
      this.to_show_notifications = true;
      //Notification
      this.scheduler_channel = this.socket.channel(
        "notification_channel:" + this.user_company_id
      );
      this.scheduler_channel.join();
      this.scheduler_channel.on("show_notifications", response => {
        if (response.is_response) {
          for (let i = 0, n = response.data.length; i < n; i++) {
            this.notifications.push(response.data[i]);
          }
        }
        this.scheduler_channel.off("show_notifications");
      });
      this.scheduler_channel.on("new_notification", response => {
        this.show_notifications(response.data);
        this.notifications.unshift(response.data);
      });
      this.scheduler_channel.push("show_notifications", {
        need_notifications: true,
        email_id: this.$session.get("UserInformation").email
      });
    }
    this.training_channel = this.socket.channel(
      "training_notification_channel:" + this.user_company_id
    );
    this.training_channel.join();
    this.training_channel.on("show_notifications", response => {
      if (response.is_response && response.data.length > 0) {
        for (let i = 0, n = response.data.length; i < n; i++) {
          this.notifications.push({
            date: moment(response.data[i].InitiatedOn, ["YYYY-MM-DD"]).format(
              "Do MMM YYYY"
            ),
            ...response.data[i]
          });
        }
      }
      this.training_channel.off("show_notifications");
    });
    this.training_channel.on("new_notification", response => {
      this.show_notifications(response.data);
      this.notifications.unshift({
        date: moment(response.data.InitiatedOn, ["YYYY-MM-DD"]).format(
          "Do MMM YYYY"
        ),
        ...response.data
      });
    });
    this.training_channel.push("show_notifications", {
      need_notifications: true,
      email_id: this.$session.get("UserInformation").email
    });
  },
  mounted() {
    bus.$on("LayoutHelpData", dataPg => {
      this.calldata = dataPg;
    });
    // bus.$on('TabsLayoutInfo',(dataFortabs) => {
    //         console.log(dataFortabs,"data of tab pane");
    //         this.calldata = dataFortabs;
    // })
    bus.$on("send company attributes", () => {
      bus.$emit(
        "company name and company id",
        this.company_name,
        this.company_id_selected
      );
    });
    // refreshPopover();

    this.$root.$on("sign_out", () => {
      this.signout_api();
    });
    $(".dropdown-toggle").dropdown();
    if (this.$session.get("SettingTopnavbarDisable") == true) {
      this.disable_navbar = true;
    }
    this.$root.$on("DashboardSidebarDisable", data => {
      if (data === true) {
        this.disable_navbar = true;
      }else{
        this.disable_navbar = false;
      }
    });
  },
  //See tom
  methods: {
    listen_data() {
      this.calldata = this.$route.path;
      //this.comp_name = this.$route.name;
      // Emitting a custom-event via the Event Bus
      bus.$emit("Emitting_data", this.calldata);
    },
    check_password(correctPassword) {
      this.correct_password = correctPassword;
    },
    editImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.previewImage = e.target.result;
        if (this.photo_img_url) {
          this.existing_file_name = this.photo_img_url.split("/")[4];
        }
        this.spinnerOn = true;
        axios
          .post(
            api_calls.edit_profile_url(),
            {
              company_name: this.$session.get("UserInformation").company_name,
              company_id: this.$session.get("UserInformation").company_id,
              license_key: this.$session.get("UserInformation").license_key,
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens,
              upload_photo: "True",
              profile_image: this.previewImage.split("base64,")[1],
              file_name: image.name,
              existing_file_name: this.existing_file_name
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`
              }
            }
          )
          .then((response) => {
            this.spinnerOn = false;
            if (this.api_status_code.PHOTO_UPLOAD.MSG_CODE === response.data.message.MSG_CODE) {
              toastr.success(`${this.tlt('photo_uploaded_successfully')}`);
              this.$session.set("photo_img_url", response.data.ImageUrl);
              setTimeout(() => {
                this.$router.go();
              }, 5000);
            } else if (response.data == "Duplicate image") {
              toastr.warning(
                `${this.tlt('toaster_file_name_already_exists')}`
              );
            } else {
              Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error"
            })
            }
          });
      };
    },
    createImage(file, type) {
      let reader = new FileReader();
      reader.onload = e => {
        this.blog.img_file = e.target.result.split("base64,")[1];
      };
      reader.readAsDataURL(file);
    },
    raise_ticket() {
      event.preventDefault();
      if (this.$route.name == "Tickets") {
        $("#ticketmodal").modal("show");
      } else {
        this.$router.push({
          name: "Tickets",
          props: true,
          params: { raise_ticket: "True" }
        });
      }
    },
    clear_fields() {
      this.img_file = "";
      this.file_label = `${this.tlt('choose_file')}`;
      this.issue = "";
      this.issue_description = "";
      this.spinnerOn = false;
    },
    email_class() {
      if (this.reg_email.test(this.invite_company_email)) {
        return `${this.tlt('is_valid')}`;
      } else {
        return `${this.tlt('is_invalid')}`;
      }
    },
    edit_profile_api() {
      event.preventDefault();
      if (!Boolean(this.phoneNumber)) {
        toastr.warning(`${this.tlt('enter_valid_phone_number')}`);
        return;
      } else if (this.phoneNumber.isValid != true) {
        toastr.warning(`${this.tlt('enter_valid_phone_number')}`);
        return;
      }
      if (
        this.user_country_name.code != null &&
        this.user_first_name != "" &&
        this.user_first_name != "F" &&
        this.user_last_name != "" &&
        this.user_last_name != "L"
        //this.validPhoneNumber === true
      ) {
        this.spinnerOn = true;
        axios
          .post(
            api_calls.edit_profile_url(),
            {
              company_id: this.$session.get("UserInformation").company_id,
              company_name: this.$session.get("UserInformation").company_name,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              first_name: this.user_first_name,
              last_name: this.user_last_name,
              country_name: this.user_country_name.code,
              phone_number: this.phoneNumber.formattedNumber
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`
              }
            }
          )
          .then((response) => {
            this.spinnerOn = false;
            if (response.data.message.MSG_CODE === this.api_status_code.PROFILE_UPDATED.MSG_CODE) {
              // Swal({
              //     title: "Updated Successfully!!",
              //     type: "success",
              //     text: "Your profile has been updated successfully.",
              //     timer:2000,
              //   });
              toastr.success(`${this.tlt('profile_updated_successfully')}`);
              this.$session.set("UserFirstName", this.user_first_name);
              this.$session.set("UserLastName", this.user_last_name);
              this.$session.set("country_name", this.user_country_name.code);
              this.$session.set(
                "PhoneNumber",
                this.phoneNumber.formattedNumber
              );
              setTimeout(() => {
                this.$router.go();
              }, 2500);
            }else {
              Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error"
            })
            }
            $("#edit_profile_modal").modal("hide");
          });
      } else {
        toastr.error(`${this.tlt('enter_all_required_fields')}`);
      }
    },
    company_changed(company) {
      event.preventDefault();
      if (company != this.company_selected) {
        this.company_selected = company;
        if (this.$session.has("CompanyName")) {
          this.$session.remove("CompanyName");
        }
        this.$session.set("CompanyName", this.company_selected);
        if (this.$session.has("CompanyId")) {
          this.$session.remove("CompanyId");
        }
        this.$session.set(
          "CompanyId",
          this.company_id[this.companies.indexOf(this.company_selected)]
        );
        this.$router.go();
      } else {
      }
    },
    submit_new_password() {
      event.preventDefault();
      if (
        this.old_password != "" &&
        this.correct_password == true &&
        this.validConfirmPassword == true
      ) {
        Swal({
          toast: true,
          text: `${this.tlt('wait_while_we_submit_details')}`,
          showConfirmButton: false,
          type: "info"
        });
        var date = new Date();
        axios
          .post(
            api_calls.new_password_url(),
            {
              company_id: this.$session.get("UserInformation").company_id,
              company_name: this.$session.get("UserInformation").company_name,
              old_password: this.old_password,
              new_password: this.new_password,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              date: date
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`
              }
            }
          )
          .then((response) => {
            if (response.data.message.MSG_CODE === this.api_status_code.PASSWORD_INCORRECT_1031.MSG_CODE) {
              toastr.error(`${this.tlt('incorrect_password')}`);
            } else if (response.data.message.MSG_CODE === this.api_status_code.PASSWORD_RESET_SUCCESSFUL_1028.MSG_CODE) {
              toastr.success(
                `${this.tlt('password_updated_successfully')}`
              );
              $("#change_password_modal").modal("hide");
              setTimeout(() => {
                this.$router.go();
              }, 200);
            } else if (response.data.message.MSG_CODE === this.api_status_code.PASSWORD_SIMILAR.MSG_CODE) {
              Swal({
                text:
                  `${this.tlt('cannot_set_old_password')}`,
                timer: 3000
              });
            } else if (response.data.message.MSG_CODE === this.api_status_code.OLD_PASSWORD_NOT_MATCH.MSG_CODE) {
              Swal({
                text: `${this.tlt('old_pass_no_match')}`,
                timer: 3000
              });
            } else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error"
              })
            }
            this.old_password = "";
            this.new_password = "";
            this.confirm_password = "";
          });
      } else {
        toastr.error(`${this.tlt('enter_all_required_fields')}`);
      }
    },
    password_toggle(id) {
      event.preventDefault();
      var password = document.getElementById(id);
      if (password.type == "text") {
        password.type = "password";
      } else if (password.type == "password") {
        password.type = "text";
      }
    },
    update_superadmin(evt) {
      if (evt !== undefined) {
        this.company_name = evt;
        this.company_id_selected = this.company_id[this.companies.indexOf(evt)];
        bus.$emit("company attributes updated", "True");
      }
    },
    send_invite() {
      event.preventDefault();
      if (this.invite_company_name == "") {
        toastr.error(`${this.tlt('enter_all_required_fields')}`);
      } else if (this.reg_email.test(this.invite_company_email) == false) {
        toastr.error(`${this.tlt('enter_valid_email')}`);
      } else {
        axios
          .post(
            api_calls.referrals_url(),
            {
              company_name: this.$session.get("UserInformation").company_name,
              company_id: this.$session.get("UserInformation").company_id,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              email: this.$session.get("UserInformation").email,
              invited_company_name: this.invite_company_name,
              invited_company_email: this.invite_company_email
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`
              }
            }
          )
          .then(response => {
            if (response.data.message.MSG_CODE === this.api_status_code.EMAIL_SENT_SUCCESSFULLY.MSG_CODE) {
              bus.$emit("invite_update", "loader_on");
              toastr.success(response.data);
            }
            $("#invite_modal").modal("hide");
            this.invite_company_name = "";
            this.invite_company_email = "";
          });
      }
    },
    signout_api() {
      bus.$emit("Logout has been clicked", "True");
      this.spinnerOn = true;
      axios
        .post(
          api_calls.clear_access_token_url(),
          {
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
            license_key: this.$session.get("UserInformation").license_key,
            email: this.$session.get("UserInformation").email,
            token: this.$session.get("UserInformation").tokens
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          }
        )
        .then(() => {
          this.execute_signout();
        })
        .catch(() => {
          this.execute_signout();
        });
    },
    execute_signout() {
      let is_super_admin = this.$session.get("is_super_admin");
      if (is_super_admin) {
        axios
          .post(
            api_calls.super_admin_logout(),
            {
              company_name: this.$session.get("UserInformation").company_name,
              company_id: this.$session.get("UserInformation").company_id,
              license_key: this.$session.get("UserInformation").license_key,
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("rt")}`
              }
            }
          )
          .then(response => {
            if (
            response.data.message.MSG_CODE == this.api_status_code.USER_LOGGED_OUT_1032.MSG_CODE ||
            response.data.message.MSG_CODE == this.api_status_code.TOKEN_INVALID_0001.MSG_CODE ||
            response.data.message.MSG_CODE == this.api_status_code.INVALID_CREDENTIALS_0005.MSG_CODE
          ) {
              axios
                .post(api_calls.super_admin_bot_logout(), {
                  company_name: this.$session.get("UserInformation").company_name,
                  company_id: this.$session.get("UserInformation").company_id,
                  license_key: this.$session.get("UserInformation").license_key,
                  username: this.$session.get("UserInformation").email,
                  token: this.$session.get("UserInformation").tokens
                })
                .then(() => {
                  if (this.to_show_notifications) {
                    this.scheduler_channel.leave();
                  }
                  this.training_channel.leave();
                  this.socket.disconnect();
                  this.$session.destroy();
                  this.spinnerOn = false;
                  this.$root.$emit("Clear_Refresh_Token_Interval", {
                    clear_interval: true
                  });
                  bus.$emit("Logged out", "True");
                  bus.$emit("Disable the bot chat now", "True", "Loggedout");
                  this.$router.push({
                    name: "Login"
                  });
                })
                .catch(() => {
                  if (this.to_show_notifications) {
                    this.scheduler_channel.leave();
                  }
                  this.training_channel.leave();
                  this.socket.disconnect();
                  this.$session.destroy();
                  this.spinnerOn = false;
                  this.$root.$emit("Clear_Refresh_Token_Interval", {
                    clear_interval: true
                  });
                  bus.$emit("Logged out", "True");
                  bus.$emit("Disable the bot chat now", "True", "Loggedout");
                  this.$router.push({
                    name: "Login"
                  });
                });
            } else {
              axios
                .post(api_calls.super_admin_bot_logout(), {
                  companyname: this.$session.get("UserInformation")
                    .company_name,
                  companyid: this.$session.get("UserInformation").company_id,
                  license_key: this.$session.get("UserInformation").license_key,
                  username: this.$session.get("UserInformation").email,
                  token: this.$session.get("UserInformation").tokens
                })
                .then(() => {
                  if (this.to_show_notifications) {
                    this.scheduler_channel.leave();
                  }
                  this.training_channel.leave();
                  this.socket.disconnect();
                  this.$session.destroy();
                  this.spinnerOn = false;
                  this.$root.$emit("Clear_Refresh_Token_Interval", {
                    clear_interval: true
                  });
                  bus.$emit("Logged out", "True");
                  bus.$emit("Disable the bot chat now", "True", "Loggedout");
                  this.$router.push({
                    name: "Login"
                  });
                })
                .catch(() => {
                  if (this.to_show_notifications) {
                    this.scheduler_channel.leave();
                  }
                  this.training_channel.leave();
                  this.socket.disconnect();
                  this.$session.destroy();
                  this.spinnerOn = false;
                  this.$root.$emit("Clear_Refresh_Token_Interval", {
                    clear_interval: true
                  });
                  bus.$emit("Logged out", "True");
                  bus.$emit("Disable the bot chat now", "True", "Loggedout");
                  this.$router.push({
                    name: "Login"
                  });
                });
              this.spinnerOn = false;
            }
          })
          .catch(() => {
            if (this.to_show_notifications) {
              this.scheduler_channel.leave();
            }
            this.training_channel.leave();
            this.socket.disconnect();
            this.$session.destroy();
            this.spinnerOn = false;
            bus.$emit("Logged out", "True");
            bus.$emit("Disable the bot chat now", "True", "Loggedout");
            this.$router.push({
              name: "Login"
            });
          });
      } else {
        axios
          .post(
            api_calls.signout_url(),
            {
              company_name: this.$session.get("UserInformation").company_name,
              company_id: this.$session.get("UserInformation").company_id,
              license_key: this.$session.get("UserInformation").license_key,
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("rt")}`
              }
            }
          )
          .then(response => {
            if (
            response.data.message.MSG_CODE == this.api_status_code.USER_LOGGED_OUT_1032.MSG_CODE ||
            response.data.message.MSG_CODE == this.api_status_code.TOKEN_INVALID_0001.MSG_CODE ||
            response.data.message.MSG_CODE == this.api_status_code.INVALID_CREDENTIALS_0005.MSG_CODE
          ) {
              if (this.to_show_notifications) {
                this.scheduler_channel.leave();
              }
              this.training_channel.leave();
              this.socket.disconnect();
              this.$session.destroy();
              this.spinnerOn = false;
              this.$root.$emit("Clear_Refresh_Token_Interval", {
                clear_interval: true
              });
              bus.$emit("Logged out", "True");
              bus.$emit("Disable the bot chat now", "True", "Loggedout");
              this.$router.push({
                name: "Login"
              });
            } else {
              this.spinnerOn = false;
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "success"
              })
            }
          })
          .catch(() => {
            if (this.to_show_notifications) {
              this.scheduler_channel.leave();
            }
            this.training_channel.leave();
            this.socket.disconnect();
            this.$session.destroy();
            this.spinnerOn = false;
            bus.$emit("Logged out", "True");
            bus.$emit("Disable the bot chat now", "True", "Loggedout");
            this.$router.push({
              name: "Login"
            });
          });
      }
    },
    // update_notifications_list() {
    //   this.scheduler_channel.push("show_notifications", {
    //     need_notifications: true,
    //     email_id: this.$session.get("UserInformation").email,
    //   });
    // },
    seen_all_notifications() {
      event.preventDefault();
      let last_index = this.notifications.length - 1;
      if (last_index >= 0) {
        if (this.scheduler_channel) {
          this.scheduler_channel.push("notification_seen", {
            req_id: this.notifications[last_index].id
          });
        }
        if (this.training_channel) {
          this.training_channel.push("notification_seen", {
            req_id: this.notifications[last_index].id
          });
        }
      }
    },
    clear_all_notifications() {
      event.preventDefault();
      event.stopPropagation();
      let req_list_cleared = [];
      let notifications_temp_list = this.notifications;
      for (var i = 0, len = notifications_temp_list.length; i < len; i++) {
        if (typeof notifications_temp_list[i] === "object") {
          if (this.notifications[i].Notificationid) {
            this.scheduler_channel.push("notification_cleared", {
              req_id: this.notifications[i].id
            });
          } else {
            this.training_channel.push("notification_cleared", {
              req_id: this.notifications[i].id
            });
          }
          req_list_cleared.push(notifications_temp_list[i].id);
        }
      }

      this.notifications = notifications_temp_list.filter(
        notification => req_list_cleared.includes(notification.id) === false
      );
    },
    clear_single_notification(req_id, index) {
      event.stopPropagation();
      if (req_id !== null) {
        if (this.notifications[index].Notificationid) {
          this.scheduler_channel.push("notification_cleared", {
            req_id: req_id
          });
        } else {
          this.training_channel.push("notification_cleared", {
            req_id: req_id
          });
        }
        this.notifications.splice(index, 1);
      }
    },
    show_notifications(data) {
      if (data != 1) {
        if (data.Notificationid) {
          var date;
          var monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ];
          date =
            data.visit_date.split(" ")[0].split("-")[2] +
            " " +
            monthNames[data.visit_date.split(" ")[0].split("-")[1] - 1] +
            " " +
            data.visit_date.split(" ")[0].split("-")[0];
          var time;
          data.visit_slot.split("-")[0];
          if (data.visit_slot.split("-")[0].split(":")[0] < 12) {
            time =
              Number(data.visit_slot.split("-")[0].split(":")[0]) + ":00 am";
          } else if (data.visit_slot.split("-")[0].split(":")[0] == 12) {
            time = "12:00 pm";
          } else if (
            data.visit_slot.split("-")[0].split(":")[0] > 12 &&
            data.visit_slot.split("-")[0].split(":")[0] < 24
          ) {
            time =
              Number(data.visit_slot.split("-")[0].split(":")[0]) -
              12 +
              ":00 pm";
          } else if (data.visit_slot.split("-")[0].split(":")[0] == 24) {
            time = "12:00 am";
          }
          if (data.Notificationid == "Appointment Deleted") {
            toastr.error(
              data.visitor_name +
                `${this.tlt('has_cancelled_appointment_schedule_on')}` +
                date +
                " at " +
                time
            );
          } else if (data.Notificationid == "Appointment Confirmed") {
            toastr.success(
              data.visitor_name +
                `${this.tlt('has_confirmed_appointment_schedule_on')}` +
                date +
                " at " +
                time
            );
          } else if (data.Notificationid == "Appointment Rescheduled") {
            toastr.warning(
              data.visitor_name +
               `${this.tlt('has_rescheduled_appointment_on')}` +
                date +
                " at " +
                time
            );
          } else if (data.Notificationid == "Appointment Scheduled") {
            toastr.success(
              data.visitor_name +
                `${this.tlt('has_been_scheduled_an_appointment_on')}` +
                date +
                " at " +
                time
            );
          }
        } else if (data.ModelType == "Intent,Dialogue") {
          var date;
          date = moment(data.InitiatedOn, ["YYYY-MM-DD"]).format("Do MMM YYYY");
          if (data.TrainingStatus == "Failed") {
            toastr.error(
              `${this.tlt('training_of_model_on')} ${date} ${this.tlt('failed_contact_admin')}`
            );
          } else if (data.TrainingStatus == "Completed") {
            toastr.success(
              `${this.tlt('training_of_new_model_initiated')} ${date} ${this.tlt('has_been_completed_successfully')}`
            );
          } else if (data.TrainingStatus == "Started") {
            toastr.info(
              `${this.tlt('new_req_for_training_initiated')} ${date}.`
            );
          }
        } else if (data.ModelType) {
          var date;
          date = moment(data.InitiatedOn, ["YYYY-MM-DD"]).format("Do MMM YYYY");
          if (data.TrainingStatus == "Failed") {
            toastr.error(
              `${this.tlt('training_of')} ${data.ModelType} ${this.tlt('model_on')} ${date} ${this.tlt('failed_contact_admin')}`
            );
          } else if (data.TrainingStatus == "Completed") {
            toastr.success(
              `${this.tlt('training_of_new')} ${data.ModelType} ${this.tlt('model_initiated_on')} ${date} ${this.tlt('has_been_completed_successfully')}`
            );
          } else if (data.TrainingStatus == "Started") {
            toastr.info(
              `${this.tlt('new_req_for_training')} ${data.ModelType} ${this.tlt('model_has_been_initiated_on')} ${date}.`
            );
          }
        }
      }
    },
    start_tour() {
      this.$root.$emit("show_tour_guide", true);
    },
    generate_email_wizard(modelType, initiatedOn) {
      let username = `${this.user_first_name} ${this.user_last_name}`;
      var a = document.createElement("a");
      if (modelType == "Intent,Dialogue") {
        a.href = `mailto:admin@cense.ai?subject=${this.tlt('chatbot_model_training_failed_on')} ${initiatedOn}.&body=${this.tlt('hi_cense_team')},%0D%0A, ${this.tlt('chatbot_failed_admin_will_look')}.%0D%0A${this.tlt('thanks')},%0D%0A${username}`;
      } else {
        a.href = `mailto:admin@cense.ai?subject=${modelType} ${this.tlt('model_training_failed_on')} ${initiatedOn}.&body=${this.tlt('hi_cense_team')},%0D%0A, ${this.tlt('the')} ${modelType} ${this.tlt('chatbot_failed_admin_will_look')}.%0D%0A${this.tlt('thanks')},%0D%0A${username}`;
      }
      a.click();
    },
    page_redirect() {
      if (this.$route.name !== "Dashboard") {
        this.$router.push({ name: "Dashboard" });
        this.$root.$emit("change_sidebar_main_menu", "Dashboard");
      }
    },
    topnavbar_disable() {
      if (this.disable_navbar === true) {
        return "pointer-events:none;";
      } else {
        return "";
      }
    }
  },


};
</script>

<style scoped>
.modal-dialog {
  max-width: 810px;
}
.openmodel.show {
  padding-right: 0px !important;
}
.btn-primary {
  margin-right: 1rem;
  width: 10%;
  padding-top: 4px;
  padding-bottom: 4px;
  color: #fff;
  background: #3e4d92;
  border: solid 1px #3e4d92;
}
.btn-secondary {
  width: 14%;
  color: #9499ae;
  font-size: 14px;
  /* cursor: pointer; */
  border-color: #fff;
  background-color: #fff;
  text-decoration: none;
}
.btn-primary:hover {
  border-color: #273679;
  background-color: #273679;
}
.btn-secondary:hover {
  color: black;
}
button.close {
  position: absolute;
  top: 20px;
  right: 20px;
  opacity: 0.5;
}
.dropdown-toggle .badge {
  position: absolute;
  top: 10px;
  right: 10px;
  /* padding: 5px 10px; */
  border-radius: 50%;
  background-color: red;
  color: white;
}
.pass.form-control {
  background-position: 8px 50% !important;
  padding: 14px 8px 14px 50px;
}
.view-pass {
  top: 40px;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
