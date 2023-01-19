<template>
  <div>
    <div class="spinner" id="spinner" v-show="big_spinner"></div>
    <div class="container-fluid" style="padding: 0px !important">
      <div class="card dash-card">
        <div
          class="card-header d-block d-sm-flex flex-wrap justify-content-between"
        >
          <div class="col-sm-12">
            <h4 class="mb-sm-0">{{tlt('social_media_link_header')}}</h4>
          </div>
        </div>
        <!-- <div class="card-body container"> -->
        <div class="col-sm-12">
          <div class="row m-0 p-0">
            <!-- <div class="col-sm-3 mt-3">
              <div class="card border-0">
                <a
                  href="javascript:void(0)"
                  class="mx-auto"
                  data-toggle="modal"
                  data-target="#widget_code_modal1"
                  @click="website_name = 'Slack'"
                >
                  <img
                    :src="require('@/portal/assets/img/slack-logo.png')"
                    class="third-party-logo"
                    style="height: 100px !important"
                  />
                </a>
              </div>
            </div> -->
            <div class="col-sm-3 p-3" >
              <div class="card border-1" :style="Messenger_data.is_integrated ? 'border: 1px solid #273679;border-radius:0.4rem;': null">
                <a
                  href="javascript:void(0)"
                  class="mx-auto"
                  data-toggle="modal"
                  data-target="#widget_code_modal2"
                  @click="website_name = 'Messenger'"
                >
                  <img
                    :src="require('@/portal/assets/img/messenger-logo.png')"
                    class="third-party-logo"
                    style="height: 100px !important"
                  />
                </a>
              </div>
            </div>
            <i v-show="Messenger_data.is_integrated" class="fa fa-check-circle" aria-hidden="true" 
            style="color: #273679; margin-left: -1.0rem; margin-top:4px;"></i>
            <div class="col-sm-3 p-3" >
              <div class="card border-1" :style="Telegram_data.is_integrated ? 'border: 1px solid #273679;border-radius:0.4rem;': null">
                <a
                  href="javascript:void(0)"
                  class="mx-auto"
                  data-toggle="modal"
                  data-target="#widget_code_modal2"
                  @click="website_name = 'Telegram'"
                >
                  <img
                    :src="require('@/portal/assets/img/telegram.svg')"
                    class="third-party-logo"
                    style="height: 100px !important"
                  />
                </a>
              </div>
            </div>
            <i v-show="Telegram_data.is_integrated" class="fa fa-check-circle" aria-hidden="true" 
            style="color:#273679; margin-left: -1.0rem;margin-top: 4px;"></i>
            <!-- <div class="col-sm-3 p-3">
              <div class="card border-1">
                <a
                  href="javascript:void(0)"
                  class="mx-auto"
                  data-toggle="modal"
                  data-target="#widget_code_modal4"
                  @click="website_name = 'Microsoft-Teams'"
                >
                  <img
                    src="@/portal/assets/img/microsoft-teams-logo.png"
                    class="third-party-logo"
                    style="height: 100px !important"
                  />
                </a>
              </div>
            </div> -->
            <div class="col-sm-3 p-3">
              <div class="card border-1" :style="Whatsapp_data.is_integrated ? 'border: 1px solid #273679;border-radius:0.4rem;': null">
                <a
                  href="javascript:void(0)"
                  class="mx-auto"
                  data-toggle="modal"
                  data-target="#widget_code_modal2"
                  @click="website_name = 'Whatsapp'"
                >
                  <img
                    :src="require('@/portal/assets/img/WhatsApp-Logo-PNG6.png')"
                    class="third-party-logo"
                    style="height: 100px !important"
                  />
                </a>
              </div>
            </div>
            <i v-show="Whatsapp_data.is_integrated" class="fa fa-check-circle" aria-hidden="true" 
            style="color:#273679; margin-left: -1.0rem; margin-top: 4px;"></i>
            <!-- </div> -->
            <div class="col-sm-3 p-3">
              <div class="card border-1" :style="Instagram_data.is_integrated ? 'border: 1px solid #273679;border-radius:0.4rem;': null">
                <a
                  href="javascript:void(0)"
                  class="mx-auto"
                  data-toggle="modal"
                  data-target="#widget_code_modal2"
                  @click="website_name = 'Instagram'"
                >
                  <img
                    :src="require('@/portal/assets/img/instagram_logo.png')"
                    class="third-party-logo"
                    style="height: 100px !important"
                  />
                </a>
              </div>
            </div>
            <i v-show="Instagram_data.is_integrated" class="fa fa-check-circle" aria-hidden="true" 
            style="color:#273679; margin-left: -1.0rem; margin-top: 4px;"></i>
          </div>
        </div>
      <!-- </div> -->
      <div
        class="modal fade dash-modal"
        id="widget_code_modal2"
        role="dialog"
        aria-labelledby="widget_code_modaltitle"
        data-keyboard="false"
        aria-hidden="true"
        data-backdrop="static"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div class="modal-head d-flex align-items-center">
                <h3>{{ website_name }} {{tlt('sm_settings_label')}}</h3>
              </div>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <img src="/img/close-icn.png" alt />
              </button>
              <div>
                <form >
                  <div v-if="website_name === 'Messenger'">
                    <strong> {{tlt('fb_page_name_label')}}</strong>
                    <span class="msg__span">
                      <svg
                        data-tooltip="tooltip"
                        data-placement="bottom"
                        title="Help"
                        data-toggle="modal"
                        data-target="#help_modal_websites"
                        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:cc="http://creativecommons.org/ns#"
                        xmlns:dc="http://purl.org/dc/elements/1.1/"
                        height="24"
                        width="24"
                        version="1.1"
                      >
                        <g transform="translate(0 -1028.4)">
                          <path
                            d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                            transform="translate(0 1029.4)"
                            fill="#2980b9"
                          />
                          <path
                            d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                            transform="translate(0 1028.4)"
                            fill="#273679"
                          />
                          <path
                            d="m12 1035.4c-1.727-0.1-3.4306 1.1-3.8438 2.8-0.0403 0.3-0.0546 0.4-0.1562 1.2h2c-0.0526-1.3 1.306-2.3 2.5-2 1.021 0.3 1.763 1.5 1.406 2.5-0.294 0.6-0.998 1-1.562 1.4-0.577 0.5-1.074 1.1-1.313 1.8-0.039 0.4-0.034 0.8-0.031 1.3h2v-1c0.172-0.7 0.688-1.1 1.25-1.4 0.634-0.3 1.087-0.8 1.406-1.4 0.543-1 0.454-2.2-0.125-3.1-0.705-1.3-2.067-2.2-3.531-2.1zm0 10c-0.552 0-1 0.4-1 1 0 0.5 0.448 1 1 1s1-0.5 1-1c0-0.6-0.448-1-1-1z"
                            fill="#2980b9"
                          />
                          <path
                            d="m12 6c-1.727-0.0274-3.4306 1.1749-3.8438 2.875-0.0403 0.2941-0.0546 0.3281-0.1562 1.125h2c-0.0526-1.2477 1.306-2.289 2.5-1.9375 1.021 0.2374 1.763 1.4281 1.406 2.4375-0.294 0.684-0.998 0.992-1.562 1.406-0.577 0.482-1.074 1.094-1.313 1.813-0.039 0.42-0.034 0.859-0.031 1.281h2v-1c0.172-0.624 0.688-1.042 1.25-1.312 0.634-0.312 1.087-0.835 1.406-1.469 0.543-0.974 0.454-2.1746-0.125-3.094-0.705-1.2699-2.067-2.1438-3.531-2.125zm0 10c-0.552 0-1 0.448-1 1s0.448 1 1 1 1-0.448 1-1-0.448-1-1-1z"
                            transform="translate(0 1028.4)"
                            fill="#ecf0f1"
                          />
                        </g>
                      </svg>
                    </span>
                    <div class="form-group mb-2">
                      <input
                        class="form-control"
                        type="text"
                        v-model="Messenger_data.fb_page_name"
                        required
                        :placeholder="tlt('page_name_label')"
                      />
                    </div>
                    <strong> {{tlt('fb_messenger_url_label')}} </strong>
                    <div class="form-group mb-2">
                      <input
                        class="form-control"
                        type="text"
                        v-model="Messenger_data.fb_messaging_url"
                        required
                        placeholder="m.me/0123456789"
                      />
                    </div>
                    <div class="form-group mb-0">
                      <label
                        class="col-sm-4"
                        style="width: 90%; padding: 0px; margin-top: 4px"
                        ><strong>{{tlt('messenger_visible_bot_label')}}</strong>
                        <label class="switch col-sm-6" style="margin-top: 0px">
                          <input
                            type="checkbox"
                            v-model="Messenger_data.is_visible_on_bot"
                            id="email_required_id"
                          />
                          <span
                            class="slider round"
                            style="border-radius: 50px"
                          ></span>
                        </label>
                      </label>
                    </div>
                  </div>
                  <div v-if="website_name === 'Telegram'">
                    <strong> {{tlt('telegram_user_name_label')}}</strong>
                    <span class="msg__span">
                      <svg
                        data-tooltip="tooltip"
                        data-placement="bottom"
                        title="Help"
                        data-toggle="modal"
                        data-target="#help_modal_websites"
                        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:cc="http://creativecommons.org/ns#"
                        xmlns:dc="http://purl.org/dc/elements/1.1/"
                        height="24"
                        width="24"
                        version="1.1"
                      >
                        <g transform="translate(0 -1028.4)">
                          <path
                            d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                            transform="translate(0 1029.4)"
                            fill="#2980b9"
                          />
                          <path
                            d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                            transform="translate(0 1028.4)"
                            fill="#273679"
                          />
                          <path
                            d="m12 1035.4c-1.727-0.1-3.4306 1.1-3.8438 2.8-0.0403 0.3-0.0546 0.4-0.1562 1.2h2c-0.0526-1.3 1.306-2.3 2.5-2 1.021 0.3 1.763 1.5 1.406 2.5-0.294 0.6-0.998 1-1.562 1.4-0.577 0.5-1.074 1.1-1.313 1.8-0.039 0.4-0.034 0.8-0.031 1.3h2v-1c0.172-0.7 0.688-1.1 1.25-1.4 0.634-0.3 1.087-0.8 1.406-1.4 0.543-1 0.454-2.2-0.125-3.1-0.705-1.3-2.067-2.2-3.531-2.1zm0 10c-0.552 0-1 0.4-1 1 0 0.5 0.448 1 1 1s1-0.5 1-1c0-0.6-0.448-1-1-1z"
                            fill="#2980b9"
                          />
                          <path
                            d="m12 6c-1.727-0.0274-3.4306 1.1749-3.8438 2.875-0.0403 0.2941-0.0546 0.3281-0.1562 1.125h2c-0.0526-1.2477 1.306-2.289 2.5-1.9375 1.021 0.2374 1.763 1.4281 1.406 2.4375-0.294 0.684-0.998 0.992-1.562 1.406-0.577 0.482-1.074 1.094-1.313 1.813-0.039 0.42-0.034 0.859-0.031 1.281h2v-1c0.172-0.624 0.688-1.042 1.25-1.312 0.634-0.312 1.087-0.835 1.406-1.469 0.543-0.974 0.454-2.1746-0.125-3.094-0.705-1.2699-2.067-2.1438-3.531-2.125zm0 10c-0.552 0-1 0.448-1 1s0.448 1 1 1 1-0.448 1-1-0.448-1-1-1z"
                            transform="translate(0 1028.4)"
                            fill="#ecf0f1"
                          />
                        </g>
                      </svg>
                    </span>
                    <div class="form-group mb-2">
                      <input
                        class="form-control"
                        type="text"
                        v-model="Telegram_data.telegram_user_name"
                        required
                        :placeholder="tlt('user_name_label')"
                      />
                    </div>
                    <div class="form-group mb-0">
                      <label
                        class="col-sm-4"
                        style="width: 90%; padding: 0px; margin-top: 4px"
                        ><strong>{{tlt('telegram_visible_bot_label')}}</strong>
                        <label class="switch col-sm-6" style="margin-top: 0px">
                          <input
                            type="checkbox"
                            v-model="Telegram_data.is_visible_on_bot"
                            id="email_required_id"
                          />
                          <span
                            class="slider round"
                            style="border-radius: 50px"
                          ></span>
                        </label>
                      </label>
                    </div>
                  </div>
                  <div v-if="website_name === 'Whatsapp'">
                    <strong> {{tlt('whatsapp_mobile_no_label')}} </strong>
                    <!-- (Add Country
                    Code as well without any spaces. For eg. +911234567890) -->
                    <span class="msg__span">
                      <svg
                        data-tooltip="tooltip"
                        data-placement="bottom"
                        title="Help"
                        data-toggle="modal"
                        data-target="#help_modal_websites"
                        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:cc="http://creativecommons.org/ns#"
                        xmlns:dc="http://purl.org/dc/elements/1.1/"
                        height="24"
                        width="24"
                        version="1.1"
                      >
                        <g transform="translate(0 -1028.4)">
                          <path
                            d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                            transform="translate(0 1029.4)"
                            fill="#2980b9"
                          />
                          <path
                            d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                            transform="translate(0 1028.4)"
                            fill="#273679"
                          />
                          <path
                            d="m12 1035.4c-1.727-0.1-3.4306 1.1-3.8438 2.8-0.0403 0.3-0.0546 0.4-0.1562 1.2h2c-0.0526-1.3 1.306-2.3 2.5-2 1.021 0.3 1.763 1.5 1.406 2.5-0.294 0.6-0.998 1-1.562 1.4-0.577 0.5-1.074 1.1-1.313 1.8-0.039 0.4-0.034 0.8-0.031 1.3h2v-1c0.172-0.7 0.688-1.1 1.25-1.4 0.634-0.3 1.087-0.8 1.406-1.4 0.543-1 0.454-2.2-0.125-3.1-0.705-1.3-2.067-2.2-3.531-2.1zm0 10c-0.552 0-1 0.4-1 1 0 0.5 0.448 1 1 1s1-0.5 1-1c0-0.6-0.448-1-1-1z"
                            fill="#2980b9"
                          />
                          <path
                            d="m12 6c-1.727-0.0274-3.4306 1.1749-3.8438 2.875-0.0403 0.2941-0.0546 0.3281-0.1562 1.125h2c-0.0526-1.2477 1.306-2.289 2.5-1.9375 1.021 0.2374 1.763 1.4281 1.406 2.4375-0.294 0.684-0.998 0.992-1.562 1.406-0.577 0.482-1.074 1.094-1.313 1.813-0.039 0.42-0.034 0.859-0.031 1.281h2v-1c0.172-0.624 0.688-1.042 1.25-1.312 0.634-0.312 1.087-0.835 1.406-1.469 0.543-0.974 0.454-2.1746-0.125-3.094-0.705-1.2699-2.067-2.1438-3.531-2.125zm0 10c-0.552 0-1 0.448-1 1s0.448 1 1 1 1-0.448 1-1-0.448-1-1-1z"
                            transform="translate(0 1028.4)"
                            fill="#ecf0f1"
                          />
                        </g>
                      </svg>
                    </span>
                    <div class="form-group mb-2">
                      <!-- <input
                        class="form-control"
                        type="text"
                        v-model="Whatsapp_data.whatsapp_number"
                        required
                        placeholder="WhatsApp Mobile Number"
                      /> -->
                      <vue-phone-number-input
                        style="margin-bottom: 1.1rem"
                        v-model="Whatsapp_data.whatsapp_number"
                        :no-use-browser-locale="true"
                        @update="phoneNumber = $event"
                      >
                      </vue-phone-number-input>
                    </div>
                    <div class="form-group mb-0">
                      <label
                        class="col-sm-4"
                        style="width: 90%; padding: 0px; margin-top: 4px"
                        ><strong>{{tlt('whatsapp_visible_bot_label')}}</strong>
                        <label class="switch col-sm-6" style="margin-top: 0px">
                          <input
                            type="checkbox"
                            v-model="Whatsapp_data.is_visible_on_bot"
                            id="email_required_id"
                          />
                          <span
                            class="slider round"
                            style="border-radius: 50px"
                          ></span>
                        </label>
                      </label>
                    </div>
                  </div>
                  <div v-if="website_name === 'Instagram'">
                    <strong> {{tlt('instagram_user_name_label')}}</strong>
                    <span class="msg__span">
                      <svg
                        data-tooltip="tooltip"
                        data-placement="bottom"
                        title="Help"
                        data-toggle="modal"
                        data-target="#help_modal_websites"
                        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:cc="http://creativecommons.org/ns#"
                        xmlns:dc="http://purl.org/dc/elements/1.1/"
                        height="24"
                        width="24"
                        version="1.1"
                      >
                        <g transform="translate(0 -1028.4)">
                          <path
                            d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                            transform="translate(0 1029.4)"
                            fill="#2980b9"
                          />
                          <path
                            d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                            transform="translate(0 1028.4)"
                            fill="#273679"
                          />
                          <path
                            d="m12 1035.4c-1.727-0.1-3.4306 1.1-3.8438 2.8-0.0403 0.3-0.0546 0.4-0.1562 1.2h2c-0.0526-1.3 1.306-2.3 2.5-2 1.021 0.3 1.763 1.5 1.406 2.5-0.294 0.6-0.998 1-1.562 1.4-0.577 0.5-1.074 1.1-1.313 1.8-0.039 0.4-0.034 0.8-0.031 1.3h2v-1c0.172-0.7 0.688-1.1 1.25-1.4 0.634-0.3 1.087-0.8 1.406-1.4 0.543-1 0.454-2.2-0.125-3.1-0.705-1.3-2.067-2.2-3.531-2.1zm0 10c-0.552 0-1 0.4-1 1 0 0.5 0.448 1 1 1s1-0.5 1-1c0-0.6-0.448-1-1-1z"
                            fill="#2980b9"
                          />
                          <path
                            d="m12 6c-1.727-0.0274-3.4306 1.1749-3.8438 2.875-0.0403 0.2941-0.0546 0.3281-0.1562 1.125h2c-0.0526-1.2477 1.306-2.289 2.5-1.9375 1.021 0.2374 1.763 1.4281 1.406 2.4375-0.294 0.684-0.998 0.992-1.562 1.406-0.577 0.482-1.074 1.094-1.313 1.813-0.039 0.42-0.034 0.859-0.031 1.281h2v-1c0.172-0.624 0.688-1.042 1.25-1.312 0.634-0.312 1.087-0.835 1.406-1.469 0.543-0.974 0.454-2.1746-0.125-3.094-0.705-1.2699-2.067-2.1438-3.531-2.125zm0 10c-0.552 0-1 0.448-1 1s0.448 1 1 1 1-0.448 1-1-0.448-1-1-1z"
                            transform="translate(0 1028.4)"
                            fill="#ecf0f1"
                          />
                        </g>
                      </svg>
                    </span>
                    <div class="form-group mb-2">
                      <input
                        class="form-control"
                        type="text"
                        v-model="Instagram_data.instagram_user_name"
                        required
                        :placeholder="tlt('user_name_label')"
                      />
                    </div>
                    <div class="form-group mb-0">
                      <label
                        class="col-sm-4"
                        style="width: 90%; padding: 0px; margin-top: 4px"
                        ><strong>{{tlt('instagram_visible_bot_label')}}</strong>
                        <label class="switch col-sm-6" style="margin-top: 0px">
                          <input
                            type="checkbox"
                            v-model="Instagram_data.is_visible_on_bot"
                            id="email_required_id"
                          />
                          <span
                            class="slider round"
                            style="border-radius: 50px"
                          ></span>
                        </label>
                      </label>
                    </div>
                  </div>
                  <div class="btn-wrap text-left mt-0 pt-2 card-act">
                    <button
                      type="click"
                      class="darkblue-btn ml-0"
                      id="copy_code_tooltip"
                      @click.prevent="submit_save_form"
                    >
                      {{tlt('sm_card_save_btn')}}
                    </button>
                    <button
                      type="button"
                      class="red-btn ml-2"
                      @click="reset_website_details"
                      id="reset"
                    >
                      {{tlt('sm_card_reset_btn')}}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade dash-modal"
        id="help_modal_websites"
        tabindex="-1"
        role="dialog"
        aria-labelledby="widget_code_modaltitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div class="modal-head d-flex align-items-center">
                <h3>{{ website_name }} Help</h3>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <img src="/img/close-icn.png" alt />
                </button>
              </div>
              <div>
                <div v-if="website_name === 'Messenger'">
                  <ol style="padding-left: 1.2rem">
                    <li>
                      {{tlt('go_to_facebook')}}
                      <a href="https://www.facebook.com/" target="blank"
                        >{{tlt('home_label')}}</a
                      >
                    </li>
                    <li>
                      {{tlt('facebook_page_instruct')}}
                    </li>
                    <li>{{tlt('facebook_page_instruct1')}}</li>
                    <li>
                      {{tlt('facebook_page_instruct2')}}
                    </li>
                    <li>
                      {{tlt('facebook_page_instruct3')}}
                    </li>
                  </ol>
                </div>
                <div v-if="website_name === 'Telegram'">
                  <ol style="padding-left: 1.2rem">
                    <li>{{tlt('open_telegram')}}</li>
                    <li>{{tlt('telegram_instruct1')}}</li>
                    <li>
                      {{tlt('telegram_instruct2')}}
                    </li>
                  </ol>
                </div>
                <div v-if="website_name === 'Whatsapp'">
                  <ol style="padding-left: 1.2rem">
                    <li>
                      {{tlt('telegram_instruct3')}} ({{tlt('telegram_instruct4')}}
                      +1-953-123-1234, {{tlt('telegram_instruct5')}} +19531231234 {{tlt('telegram_instruct6')}})
                    </li>
                  </ol>
                </div>
                <div v-if="website_name === 'Instagram'">
                  <ol style="padding-left: 1.2rem">
                    <li>{{tlt('instagram_text')}}</li>
                    <li>{{tlt('instagram_instruct1')}}</li>
                    <li>
                      {{tlt('instagram_instruct2')}}
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div class="card dash-card">
        <div>
          <template style="overflow: hidden">
            <social-media-settings />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import api_calls from "@/portal/api_calls";
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import SocialMediaSettings from "./SocialMediaSettings.vue";
import { freeze_portal,show_subscription_expired_swal , close_modal} from "@/portal/mixins";

export default {
  name: "SocialMediaLinks",
  components: {
      VuePhoneNumberInput,
      SocialMediaSettings
  },
    mixins: [
    freeze_portal,
    show_subscription_expired_swal,
    close_modal
  ],
  data() {
    return {
      big_spinner: false,
      website_name: "",
      widget_code: "",
      Messenger_data: {
        fb_page_name: null,
        fb_messaging_url: null,
        is_visible_on_bot: false,
        is_integrated: false
      },
      company_name: this.$session.get("UserInformation").company_name,
      company_id: this.$session.get("UserInformation").company_id,
      Telegram_data: {
        telegram_user_name: null,
        is_visible_on_bot: false,
        is_integrated: false
      },
      Instagram_data:{
        instagram_user_name: null,
        is_visible_on_bot : false,
        is_integrated : false
      },
      Whatsapp_data: {
        whatsapp_number: null,
        is_visible_on_bot: false,
        is_integrated: false
      },
      whatsapp_profile_name: null,
      is_visible_on_bot: false,
      phoneNumber: null,
      // fb_messaging_url_regex: /[(m.me)\/?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i,
    };
  },
  mounted() {
    $("#help_modal_websites").on("shown.bs.modal", function (e) {
      $("#widget_code_modal2").css("opacity", "-0.5");
    });
    $("#help_modal_websites").on("hidden.bs.modal", function (e) {
      $("#widget_code_modal2").css("opacity", "1");
    });
    this.get_integration_details();
    // this.checkLoginState();
  },
  watch: {
    is_visible_on_bot(newVal) {
      // console.log(this.website_name);
      let webs = this.website_name;
      // console.log(this[webs + "_data"].is_visible_on_bot);
      this[webs + "_data"].is_visible_on_bot = newVal;
    },
  },
  methods: {
    submit_save_form() {
      if (this.website_name === "Messenger") {
         console.log(this.Messenger_data);
         
        let domain_name = "m.me/";
        
        if ( !this.Messenger_data.fb_messaging_url   || !this.Messenger_data.fb_page_name) {
          Swal.fire({
            text:
             this.tlt('enter_all_details'),
            toast: true,
            position: "top-end",
            type: "warning",
            showConfirmButton: false,
            timer: 3500,
          });
          return;
        }
        if ( !this.Messenger_data.fb_messaging_url.includes(domain_name)  ) {
          Swal.fire({
            text:
              this.tlt('sm_enter_proper_msg_url_msg'),
            toast: true,
            position: "top-end",
            type: "warning",
            showConfirmButton: false,
            timer: 3500,
          });
          return;
        }
        Swal.fire({
          text: this.tlt('sm_submit_your_details_msg'),
          toast: true,
          type: "warning",
          showConfirmButton: false,
        });
        axios
          .post(
            api_calls.chatbot_integration_details(),
            {
              company_name: this.company_name,
              company_id: this.company_id,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              is_save: true,
              is_facebook: true,
              is_messaging_platform: true,
              fb_page_name: this.Messenger_data.fb_page_name,
              fb_page_link: this.Messenger_data.fb_messaging_url,
              visible_on_bot: this.Messenger_data.is_visible_on_bot,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then(({ data }) => {
            this.get_integration_details();
            setTimeout(() => {
              if (data.message.MSG_CODE === this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
                Swal.fire({
                  title: this.tlt('sm_details_saved_msg'),
                  type: "success",
                  timer: 2500,
                });
              } else {
                Swal.fire({
                  // title: this.tlt('sm_error_occurred_msg1'),
                  title:data.message.MSG_CODE,
                  text:data.message.MSG,
                  showCancelButton: false,
                  showConfirmButton: false,
                  toast: true,
                  position: "top-end",
                  timer: 2500,
                  type: "error"
                });
              }
            }, 100);
          })
          .catch((e) => {
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              Swal.fire({
                title: this.tlt('sm_error_occurred_msg2'),
                type: "error",
                timer: 2500,
              });
              this.$root.$emit("Session_Expired", e.response.data);
              return;
            }
            Swal.fire({
              title: this.tlt('sm_error_occurred_msg3'),
              type: "error",
              timer: 2500,
            });
          });
          this.close_modal('copy_code_tooltip')

      } else if (this.website_name === "Telegram") {
           if ( !this.Telegram_data.telegram_user_name) {
                Swal.fire({
                  text:
                  this.tlt('enter_all_details'),
                  toast: true,
                  position: "top-end",
                  type: "warning",
                  showConfirmButton: false,
                  timer: 3500,
                });
                return;
              }
        Swal.fire({
          text: this.tlt('sm_telegram_submit_your_details_msg'),
          toast: true,
          type: "warning",
          showConfirmButton: false,
        });
        axios
          .post(
            api_calls.chatbot_integration_details(),
            {
              company_name: this.company_name,
              company_id: this.company_id,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              is_save: true,
              is_telegram: true,
              is_messaging_platform: true,
              telegram_username: this.Telegram_data.telegram_user_name,
              visible_on_bot: this.Telegram_data.is_visible_on_bot,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then(({ data }) => {
            this.get_integration_details();
          
            setTimeout(() => {
              if (data.message.MSG_CODE === this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
                Swal.fire({
                  title: this.tlt('sm_telegram_details_saved_msg'),
                  type: "success",
                  timer: 2500,
                });
                $("#widget_code_modal2").modal("hide");
              } else {
                Swal.fire({
                  // title: this.tlt('sm_telegram_error_occurred_msg1'),
                  title:data.message.MSG_CODE,
                  text:data.message.MSG,
                  showCancelButton: false,
                  showConfirmButton: false,
                  toast: true,
                  position: "top-end",
                  timer: 2500,
                  type: "error"
                });
              }
            }, 100);
          })
          .catch((e) => {
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              Swal.fire({
                title: this.tlt('sm_telegram_error_occurred_msg2'),
                type: "error",
                timer: 2500,
              });
              this.$root.$emit("Session_Expired", e.response.data);
              return;
            }
            Swal.fire({
              title: this.tlt('sm_telegram_error_occurred_msg3'),
              type: "error",
              timer: 2500,
            });
          });
             this.close_modal('copy_code_tooltip')
      } else if (this.website_name === "Whatsapp") {
        if ( !this.phoneNumber) {
                Swal.fire({
                  text:
                  this.tlt('enter_all_details'),
                  toast: true,
                  position: "top-end",
                  type: "warning",
                  showConfirmButton: false,
                  timer: 3500,
                });
                return;
              }
        if (!Boolean(this.phoneNumber)) {
        Swal.fire({
          text: this.tlt('sm_whatsapp_valid_ph_number_msg1'),
          type: "warning",
          timer: 3000,
        });
        return;
      } else if (this.phoneNumber.isValid != true) {
        Swal.fire({
          text: this.tlt('sm_whatsapp_valid_ph_number_msg2'),
          type: "warning",
          timer: 3000,
        });
        return;
      }
        Swal.fire({
          text: this.tlt('sm_whatsapp_submit_your_details_msg'),
          toast: true,
          type: "info",
          showConfirmButton: false,
        });
        axios
          .post(
            api_calls.chatbot_integration_details(),
            {
              company_name: this.company_name,
              company_id: this.company_id,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              is_save: true,
              is_whatsapp: true,
              is_messaging_platform: true,
              whatsapp_number: this.phoneNumber.formattedNumber,
              name: this.whatsapp_profile_name,
              visible_on_bot: this.Whatsapp_data.is_visible_on_bot,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then(({ data }) => {
            this.get_integration_details();
            setTimeout(() => {
              if (data.message.MSG_CODE === this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
                Swal.fire({
                  title: this.tlt('sm_whatsapp_details_saved_msg'),
                  type: "success",
                  timer: 2500,
                });
                $("#widget_code_modal2").modal("hide");
              } else {
                Swal.fire({
                  title: this.tlt('sm_whatsapp_error_occurred_msg1'),
                  type: "error",
                  timer: 2500,
                });
              }
            }, 100);
          })
          .catch((e) => {
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              Swal.fire({
                title: this.tlt('sm_whatsapp_error_occurred_msg2'),
                type: "error",
                timer: 2500,
              });
              this.$root.$emit("Session_Expired", e.response.data);
              return;
            }
            Swal.fire({
              title: this.tlt('sm_whatsapp_error_occurred_msg3'),
              type: "error",
              timer: 2500,
            });
          });
             this.close_modal('copy_code_tooltip')
      } else if (this.website_name === "Instagram") {
         if ( !this.Instagram_data.instagram_user_name) {
                Swal.fire({
                  text:
                  this.tlt('enter_all_details'),
                  toast: true,
                  position: "top-end",
                  type: "warning",
                  showConfirmButton: false,
                  timer: 3500,
                });
                return;
              }
        Swal.fire({
          text: this.tlt('sm_instagram_submit_your_details_msg'),
          toast: true,
          type: "warning",
          showConfirmButton: false,
        });
        axios
          .post(
            api_calls.chatbot_integration_details(),
            {
              company_name: this.company_name,
              company_id: this.company_id,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              is_save: true,
              is_instagram: true,
              is_messaging_platform: true,
              instagram_username: this.Instagram_data.instagram_user_name,
              visible_on_bot: this.Instagram_data.is_visible_on_bot,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then(({ data }) => {
            this.get_integration_details();
            setTimeout(() => {
              if (data.message.MSG_CODE === this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
                Swal.fire({
                  title: this.tlt('sm_instagram_details_saved_msg'),
                  type: "success",
                  timer: 2500,
                });
                $("#widget_code_modal2").modal("hide");
              } else {
                Swal.fire({
                  // title: this.tlt('sm_instagram_error_occurred_msg1'),
                  title:data.message.MSG_CODE,
                  text:data.message.MSG,
                  showCancelButton: false,
                  showConfirmButton: false,
                  timer: 2500,
                  type: "error"
                });
              }
            }, 100);
          })
          .catch((e) => {
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              Swal.fire({
                title: this.tlt('sm_instagram_error_occurred_msg2'),
                type: "error",
                timer: 2500,
              });
              this.$root.$emit("Session_Expired", e.response.data);
              return;
            }
            Swal.fire({
              title: this.tlt('sm_instagram_error_occurred_msg3'),
              type: "error",
              timer: 2500,
            });
          });
             this.close_modal('copy_code_tooltip')
      }
    },
    get_integration_details() {
      this.big_spinner = true;
      axios
        .post(
          api_calls.chatbot_integration_details(),
          {
            is_get: true,
            company_name: this.company_name,
            company_id: this.company_id,
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
        .then(({ data }) => {
          this.big_spinner = false;
          if (data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE.MSG_CODE) {
            if (data.data.messaging_platform || false) {
              if (
                Boolean(data.data.messaging_platform.facebook_details) ||
                false
              ) {
                this.Messenger_data.fb_page_name =
                  data.data.messaging_platform.facebook_details.fb_page_name;
                this.Messenger_data.fb_messaging_url =
                  data.data.messaging_platform.facebook_details.link;
                this.Messenger_data.is_visible_on_bot = data.data.messaging_platform.facebook_details.visible_on_bot
                this.Messenger_data.is_visible_on_bot === true ? this.Messenger_data.is_integrated = true :
                                                                this.Messenger_data.is_integrated = false;
              }
              if (
                Boolean(data.data.messaging_platform.telegram_details) ||
                false
              ) {
                this.Telegram_data.telegram_user_name =
                  data.data.messaging_platform.telegram_details.telegram_username;
                this.Telegram_data.is_visible_on_bot = data.data.messaging_platform.telegram_details.visible_on_bot;
                this.Telegram_data.is_visible_on_bot === true ? this.Telegram_data.is_integrated = true :
                                                                this.Telegram_data.is_integrated = false;
              }
              if (
                Boolean(data.data.messaging_platform.whatsapp_details) ||
                false
              ) {
                this.Whatsapp_data.whatsapp_number =
                  data.data.messaging_platform.whatsapp_details.whatsapp_number;
                this.Whatsapp_data.is_visible_on_bot = data.data.messaging_platform.whatsapp_details.visible_on_bot;
                this.Whatsapp_data.is_visible_on_bot === true ? this.Whatsapp_data.is_integrated = true :
                                                                this.Whatsapp_data.is_integrated = false;
              }
              if (
                Boolean(data.data.messaging_platform.instagram_details) ||
                false
              ) {
                this.Instagram_data.instagram_user_name =
                  data.data.messaging_platform.instagram_details.instagram_username;
                this.Instagram_data.is_visible_on_bot = data.data.messaging_platform.instagram_details.visible_on_bot;
                this.Instagram_data.is_visible_on_bot === true ? this.Instagram_data.is_integrated = true :
                                                                this.Instagram_data.is_integrated = false;
              }
            }
          }else if(data.message.MSG_CODE === this.api_status_code.EMPTY_DATA.MSG_CODE) {
               
          }else {
                Swal.fire({
                  // title: this.tlt('sm_error_occurred_msg1'),
                  title:data.message.MSG_CODE,
                  text:data.message.MSG,
                  showCancelButton: false,
                  showConfirmButton: false,
                  toast: true,
                  position: "top-end",
                  timer: 2500,
                  type: "error"
                });
              }
        })
        .catch((e) => {
          this.big_spinner = false;
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    reset_website_details() {
     
        // console.log(result);
    axios
            .post(
              api_calls.chatbot_integration_details(),
              {
                is_reset: true,
                company_name: this.company_name,
                company_id: this.company_id,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                reset_platform: this.website_name,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then(({ data }) => {
              // console.log(data);
            
              this.reset_to_default()
              this.get_integration_details();
              if (data.message.MSG_CODE === this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
                Swal.fire({
                  title: this.tlt('sm_swal_details_reset_msg'),
                  type: "success",
                  timer: 2500,
                });
                $("#widget_code_modal2").modal("hide");
              } else {
                Swal.fire({
                  title:data.message.MSG_CODE,
                  text:data.message.MSG,
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
              Swal.fire({
                title: this.tlt('sm_error_occurred_msg5'),
                type: "error",
              });
            });
            this.close_modal('reset')
        
      
    },
    reset_to_default(){
      this.Whatsapp_data.whatsapp_number = null;
      this.Whatsapp_data.is_visible_on_bot = false;
      this.Telegram_data.is_visible_on_bot = false ;
      this.Telegram_data.telegram_user_name = null;
      this.Messenger_data.fb_page_name = null;
      this.Messenger_data.fb_messaging_url = null;
      this.Messenger_data.is_visible_on_bot = false;
      this.Instagram_data.instagram_user_name = null;
      this.Instagram_data.is_visible_on_bot = false;
      this.Instagram_data.is_integrated = false;
      this.Messenger_data.is_integrated = false;
      this.Whatsapp_data.is_integrated = false;
      this.Telegram_data.is_integrated = false;
      this.phoneNumber = null
    }
  },
};
</script>
<style scoped>
.fb-connect-btn {
  background: #006cff;
  border: 1px solid #006cff;
  color: #fff;
  cursor: pointer;
  transition: all .3s;
}
.fb-connect-btn:active {
  opacity: .5!important;
}
.fb-connect-btn:hover {
  opacity: .8!important;
}
.fb-button {
  width: 45%;
  display: flex;
  background: #3b5998;
  color: #fff;
  padding: 10px 20px;
  border-radius: 10px;
  -webkit-transition: opacity .3s;
  transition: opacity .3s;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-backface-visibility: hidden;
  cursor: pointer;
  -webkit-transition: all .3s;
  transition: all .3s;
}
.fb-button:active {
  opacity: .5!important;
}
.fb-button:hover {
  opacity: .8!important;
}
.fb-button .icon {
  margin-right: 10px;
  width: 15px;
  height: 25px;
}
.fb-button .icon svg {
  max-width: 100%;
  max-height: 100%;
  -o-object-fit: contain;
  object-fit: contain;
}
.logout-button {
  margin-left: auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 10px 20px;
  border-radius: 20px;
  background: #f0f4f7;
  color: #9ba6b3;
  width: 160px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-backface-visibility: hidden;
  cursor: pointer;
  -webkit-transition: all .3s;
  transition: all .3s;
}
.logout-button:active {
  opacity: .5!important;
}
.logout-button:hover {
  opacity: .8!important;
}
.messenger-pages {
  width: 100%;
  background: #f7f7f8;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  /* -webkit-box-align: center; */
  -ms-flex-align: center;
  align-items: center;
  padding: 10px 15px;
  border-radius: 4px;
  margin-bottom: 10px;
}
.third-party-logo {
  width: 150px;
  height: 75px;
  object-fit: contain;
}
.msg__span {
  padding-left: 1rem;
}
.card-act .red-btn {
  font-size: 14px;
  color: #fff;
  background: #f23d3d;
  border: solid 1px #f23d3d;
  padding: 5px 20px;
  font-weight: 400;
  line-height: 20px;
  display: inline-block;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}
.switch {
  margin-left: 1rem;
}
.col-sm-3{
  max-width: 24%;
}
.row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -2px;
    margin-left: 15px;
}
</style>