<template>
  <div class="log-wrap d-flex align-items-center">
    <div class="spinner" v-show="show_spinner" id="spinner"></div>
    <div class="container">
      <!-- <div class="container-fluid front-container p-0 m-0">
        <div class="back-top"></div>
        <div class="back-main"></div>
      </div> -->
      <div class="container-fluid" style="padding: 50px;">
        <div class="col-sm-12 d-flex p-0">
          <button
            type="button"
            class="close"
            aria-label="Close"
            style="padding-bottom: 10px;"
            @click="$router.push('/bot/dashboard')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-box-arrow-in-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"
              />
              <path
                fill-rule="evenodd"
                d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
              />
            </svg>
            <span> Go back</span>
          </button>
        </div>
        <div class="col-sm-12 row">
          <div
            class="col-sm-4 chat-top p-0"
            v-show="!is_profile_setup"
            style="height: 600px;"
          >
            <div class="d-flex p-2" style="align-items: center;">
              <!-- top-bar -->
              <div>
                <img
                  v-if="whatsapp_profile.photo"
                  :src="whatsapp_profile.photo"
                  class="rounded-circle"
                  @click="show_profile_setup"
                  height="40px"
                  width="40px"
                  style="cursor: pointer;"
                />
                <img
                  v-else
                  src="/img/whatsapp-dp.png"
                  class="rounded-circle"
                  @click="show_profile_setup"
                  height="40px"
                  width="40px"
                  style="cursor: pointer;"
                />
              </div>
              <span class="ml-auto mt-1 d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-chat-left-text mr-2"
                  viewBox="0 0 16 16"
                  @click="show_all_contacts"
                  style="cursor:pointer;"
                >
                  <path
                    d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                  />
                  <path
                    d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" fill="currentColor"
                class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                <path
                  d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
              </svg> -->
              </span>
            </div>
            <div class="contacts pr-0">
              <!-- seach tab -->
              <div class="search-chat">
                <div>
                  <input
                    type="text"
                    placeholder="Search or start new chat"
                    v-model="search_value"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    class="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                    />
                  </svg>
                </div>
              </div>
              <div class="contact-table-scroll">
                <table
                  class="table table-hover"
                  style="margin-bottom: 0rem !important"
                >
                  <tbody v-if="contact_list.length > 0">
                    <tr
                      v-for="(contact, index) in contact_list"
                      :key="index"
                      @click="
                        get_history_data(
                          contact.whatsapp_phone_number,
                          contact.profile_name,
                          index,
                          contact
                        )
                      "
                      style="cursor:pointer"
                      :style="is_active_chat(index)"
                    >
                      <td class="" style="width: 22%;">
                        <img
                          src="/img/whatsapp-dp.png"
                          alt=""
                          class="user-profile-picture rounded-circle"
                        />
                      </td>

                      <td class="pl-0 pb-1 pr-3" style="font-size: 13px;">
                        <div class="user-name-date d-flex">
                          <div class="user-name">
                            <span>{{ get_contact_display_name(contact) }}</span>
                            <!-- <span v-if="contact.profile_name">{{ contact.profile_name }}</span>
                          <span v-else>{{ contact.whatsapp_phone_number }}</span> -->
                          </div>
                          <div class="date" v-if="contact.last_bot_response">
                            <span>{{
                              formatContactLastMessageDate(
                                contact.last_bot_response.date,
                                contact.last_bot_response.time
                              )
                            }}</span>
                          </div>
                        </div>
                        <div>
                          <span
                            v-if="contact.last_bot_response"
                            class="user-msg-latest-conv"
                            ><span :title="contact.last_bot_response.text">{{
                              latest_bot_text(contact.last_bot_response.text)
                            }}</span></span
                          >
                          <!-- <span v-if="contact.is_new_notification || false" style="float: right">{{contact.new_message_count || 1}}</span> -->
                        </div>
                      <div>
                        <span v-if="contact.last_bot_response" class="user-msg-latest-conv"><span
                            :title="contact.last_bot_response.text">{{ latest_bot_text(contact.last_bot_response.text)
                            }}</span></span>
                            <span v-if="contact.is_new_notification || false" style="float: right"><i class="fa fa-circle" aria-hidden="true" style="color:#ff0000"></i></span>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td style="position: relative; padding:44px; text-align: center;">
                      <span class="contact-list-empty">No chats,contacts or messages found</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            class="col-sm-4 p-0"
            v-show="is_profile_setup && !is_contact_list"
            style="height: 600px;"
          >
            <!-- profile -->
            <div
              style="border-right: 1px solid rgba(0,0,0,0.2);align-items: center; justify-content: space-between; height: 100%;"
            >
              <div class="profile-top d-flex">
                <span
                  style="margin:0 0 10px 17px;cursor: pointer;"
                  @click="show_profile_setup"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="22"
                    fill="currentColor"
                    class="bi bi-arrow-left left-arrow"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                </span>
                <span style="opacity:2;font-size:1.1rem;margin:0 0 8px 17px;"
                  >Profile</span
                >
              </div>
              <!-- profile pic -->
              <div class="profile-bottom">
                <div class="profile-pic ">
                  <div style="width: 100%;height: 100%;position: relative;">
                    <div
                      class="second-circle"
                      v-if="whatsapp_profile.photo === ''"
                    >
                      <input
                        type="file"
                        id="imgupload"
                        @change="update_profile_image"
                      />
                      <div class="img-circle-gry">
                        <span class="img-circle-title-cam">
                          <span>ADD PROFILE</span>
                          <span>PHOTO</span>
                        </span>
                      </div>
                    </div>
                    <div class="second-circle-image" v-else>
                      <div style="width:300px">
                        <input
                          type="file"
                          id="imgupload"
                          @change="update_profile_image"
                        />
                      </div>
                      <img :src="whatsapp_profile.photo" alt="" />
                    </div>
                  </div>
                </div>
                <div class="img-cricle">
                  <div
                    class="remove-profile-pic"
                    v-if="whatsapp_profile.photo != ''"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style="cursor: pointer;"
                      @click="remove_profile_image()"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                  </div>
                  <div class="no-image"></div>
                </div>
                <!-- profile-details -->
                <div class="profile-details">
                  <div class="all-basic-info">
                    <div class="user-email-details">
                      <div class="user-email" v-if="!edit_email">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-envelope-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"
                          />
                        </svg>
                        <span v-if="whatsapp_profile.email == ''">
                          Email Address</span
                        >
                        <span v-else>{{ whatsapp_profile.email }}</span>
                        <svg
                          v-if="
                            !edit_address && !edit_description && !edit_website
                          "
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pencil-fill"
                          viewBox="0 0 16 16"
                          @click="edit_email = true"
                          style="cursor: pointer;"
                        >
                          <path
                            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                          />
                        </svg>
                      </div>
                      <div class="edit-user-email" v-if="edit_email">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-envelope-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"
                          />
                        </svg>
                        <textarea
                          class="input ml-1"
                          id="user_email_address"
                          v-model="whatsapp_profile.email"
                          placeholder="Email Address"
                          @keydown="expand_textbox('#user_email_address')"
                        >
                        </textarea>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="22"
                          fill="currentColor"
                          class="bi bi-check2"
                          viewBox="0 0 16 16"
                          @click="update_profile_details()"
                          style="cursor: pointer;top:1vh !important;right:0 !important;
                          position: absolute;"
                        >
                          <path
                            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="user-address-details">
                      <div class="user-address" v-if="!edit_address">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-geo-alt"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"
                          />
                          <path
                            d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                          />
                        </svg>
                        <span v-if="whatsapp_profile.address == ''"
                          >Business Address</span
                        >
                        <span v-else>{{ whatsapp_profile.address }}</span>
                        <svg
                          v-if="
                            !edit_email && !edit_description && !edit_website
                          "
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pencil-fill"
                          viewBox="0 0 16 16"
                          @click="edit_address = true"
                          style="cursor: pointer;"
                        >
                          <path
                            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                          />
                        </svg>
                      </div>
                      <div class="edit-user-address" v-if="edit_address">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-geo-alt"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"
                          />
                          <path
                            d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                          />
                        </svg>
                        <textarea
                          class="input ml-1"
                          id="business_address"
                          v-model="whatsapp_profile.address"
                          placeholder="Business Address"
                          @keydown="expand_textbox('#business_address')"
                        ></textarea>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="22"
                          fill="currentColor"
                          class="bi bi-check2"
                          viewBox="0 0 16 16"
                          @click="update_profile_details()"
                          style="cursor: pointer;top:1vh !important;right:0 !important;
                          position: absolute;"
                        >
                          <path
                            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="description-details">
                      <div class="description" v-if="!edit_description">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-shop"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"
                          />
                        </svg>
                        <span v-if="whatsapp_profile.description == ''"
                          >Description</span
                        >
                        <span v-else>{{ whatsapp_profile.description }}</span>
                        <svg
                          v-if="!edit_address && !edit_email && !edit_website"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pencil-fill"
                          viewBox="0 0 16 16"
                          @click="edit_description = true"
                          style="cursor: pointer;"
                        >
                          <path
                            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                          />
                        </svg>
                      </div>
                      <div class="edit-description" v-if="edit_description">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-shop"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"
                          />
                        </svg>
                        <textarea
                          class="input ml-1"
                          v-model="whatsapp_profile.description"
                          placeholder=" Description"
                          id="user_description"
                          @keydown="expand_textbox('#user_description')"
                        ></textarea>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="22"
                          fill="currentColor"
                          class="bi bi-check2"
                          viewBox="0 0 16 16"
                          @click="update_profile_details()"
                          style="cursor: pointer;top:1vh !important;right:0 !important;
                          position: absolute;"
                        >
                          <path
                            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="website-details mb-1">
                      <div v-if="!edit_website">
                        <span v-if="whatsapp_profile.websites">
                          <div
                            v-if="whatsapp_profile.websites.length == 0"
                            class="website"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-globe"
                              viewBox="0 0 16 16"
                            >
                              <path
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"
                              />
                            </svg>
                            <span>Website Url</span>
                            <svg
                              v-if="
                                !edit_address &&
                                  !edit_email &&
                                  !edit_description
                              "
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-pencil-fill"
                              viewBox="0 0 16 16"
                              @click="edit_website_value(0)"
                              style="cursor: pointer;"
                            >
                              <path
                                d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                              />
                            </svg>
                          </div>
                          <div
                            v-else
                            v-for="(website,
                            index) in whatsapp_profile.websites"
                            :key="index"
                            class="website mb-2 mt-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-globe"
                              viewBox="0 0 16 16"
                            >
                              <path
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"
                              />
                            </svg>
                            <span>{{ website }}</span>
                            <svg
                              v-if="
                                !edit_address &&
                                  !edit_email &&
                                  !edit_description
                              "
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-pencil-fill"
                              viewBox="0 0 16 16"
                              @click="edit_website_value(index)"
                              style="cursor: pointer;"
                            >
                              <path
                                d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                              />
                            </svg>
                          </div>
                          <div
                            v-if="
                              whatsapp_profile.websites.length == 1 &&
                                !second_website
                            "
                          >
                            <span
                              class="add-another-website"
                              @click="edit_website_value(1)"
                              >ADD ANOTHER WEBSITE</span
                            >
                          </div>
                        </span>
                      </div>
                      <div class="edit-website" v-if="edit_website">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-globe"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"
                          />
                        </svg>
                        <textarea
                          class="input ml-1"
                          v-model="whatsapp_profile.websites[index_update]"
                          placeholder="Website URL"
                          id="business_website_url"
                          @keydown="expand_textbox('#business_website_url')"
                        ></textarea>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="22"
                          fill="currentColor"
                          class="bi bi-check2"
                          viewBox="0 0 16 16"
                          @click="update_profile_details()"
                          style="cursor: pointer;top:1vh !important;right:0 !important;
                          position: absolute;"
                        >
                          <path
                            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="webiste-vertical-details mb-3">
                      <div class="webiste-vertical d-flex" style="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          style="margin-right: 1rem;"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-tag-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                          />
                        </svg>
                        <multiselect
                          :options="vertical_types"
                          v-model="whatsapp_profile.vertical"
                          :searchable="false"
                          :allow-empty="false"
                          :show-labels="false"
                          :close-on-select="true"
                          placeholder="Pick a categories"
                          style="width: 80%;z-index:4000;"
                        >
                        </multiselect>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="22"
                          fill="currentColor"
                          class="bi bi-check2"
                          viewBox="0 0 16 16"
                          @click="update_profile_details()"
                          style="cursor: pointer;top:1vh !important;right:0 !important;
                          position: absolute;"
                        >
                          <path
                            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="about-phone">
                    <div class="mb-4">
                      <span class="abt-phone-title"
                        >About and Phone Number</span
                      >
                    </div>
                    <div class="whts-app-status">
                      <div class="d-flex whts-status" v-if="!edit_status">
                        <span v-if="whatsapp_profile.about == ''">{{
                          default_whatsapp_status
                        }}</span>
                        <span v-else>{{ whatsapp_profile.about }}</span>
                        <svg
                          v-if="
                            !edit_address &&
                              !edit_email &&
                              !edit_website &&
                              !edit_description
                          "
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pencil-fill"
                          viewBox="0 0 16 16"
                          @click="edit_status = true"
                          style="cursor: pointer;"
                        >
                          <path
                            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                          />
                        </svg>
                      </div>
                      <div class="edit-status" v-if="edit_status">
                        <textarea
                          class="input"
                          v-model="whatsapp_profile.about"
                          id="whtsapp_status"
                          @keydown="expand_textbox('#whtsapp_status')"
                        ></textarea>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="22"
                          fill="currentColor"
                          class="bi bi-check2"
                          viewBox="0 0 16 16"
                          @click="update_profile_details()"
                          style="cursor: pointer;  top: 1.6vh;right: 15px;
                          position: absolute;"
                        >
                          <path
                            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="whtsapp-no mt-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-telephone-fill"
                        viewBox="0 0 16 16"
                        style="color:#8696a0;"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                        />
                      </svg>
                      <span class="ml-3">{{
                        whatsapp_profile.whatsapp_phone_number
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-4 p-0" v-show="is_contact_list">
            <!-- whatsapp all contacts -->
            <div
              style="border-right: 1px solid rgba(0,0,0,0.2);align-items: center; justify-content: space-between; height: 550px;"
            >
              <div class="profile-top d-flex">
                <span
                  style=" margin:0 0 10px 17px;cursor: pointer;"
                  @click="show_all_contacts"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="22"
                    fill="currentColor"
                    class="bi bi-arrow-left left-arrow"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                </span>
                <span style="opacity:2;font-size:1.1rem;margin:0 0 8px 17px;"
                  >New chat</span
                >
                <span style="margin: 0 5px 13px auto;">
                  <button
                    style="border: none; cursor: pointer; font-size: 18px;"
                    type="button"
                    data-toggle="popover"
                    data-trigger="focus"
                  >
                    <i class="fa fa-question-circle"></i>
                  </button>
                </span>
              </div>
              <div class="contacts-list pr-0">
                <div class="search-contact">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      fill="currentColor"
                      class="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search or start new chat"
                      v-model="search_in_contact_list"
                    />
                  </div>
                </div>
                <div class="all-contact-list" @scroll="new_contact_list">
                  <ul
                    v-if="all_contact_list.length > 0"
                    id="all_contacts_scroll"
                  >
                    <li
                      class="d-flex"
                      style="cursor:pointer;"
                      @click="add_new_contact_modal()"
                    >
                      <!-- <div style="width: 15%;"><img src="/img/whatsapp-dp.png" alt=""
                        class="user-profile-picture rounded-circle">
                        </div> -->
                      <div class="user-name">
                        Add New Contact
                        <!-- <span v-if="contact.profile_name">{{ contact.profile_name }}</span>
                          <span v-else>{{ contact.whatsapp_phone_number }}</span> -->
                      </div>
                    </li>
                    <li
                      v-for="(contact, index) in all_contact_list"
                      :key="index"
                      class="d-flex"
                      style="cursor:pointer;"
                      @click="
                        get_history_data(
                          contact.whatsapp_phone_number,
                          contact.contact_name,
                          0,
                          contact
                        )
                      "
                    >
                      <div style="width: 15%;">
                        <img
                          src="/img/whatsapp-dp.png"
                          alt=""
                          class="user-profile-picture rounded-circle"
                        />
                      </div>
                      <div class="user-name">
                        <span>{{ get_contact_display_name(contact) }}</span>
                        <!-- <span v-if="contact.contact_name">{{ contact.contact_name }}</span>
                        <span v-else-if="contact.profile_name">{{ contact.profile_name }}</span>
                        <span v-else>{{ contact.whatsapp_phone_number }}</span> -->
                      </div>
                      <div
                        class="contact-verified-status ml-auto"
                        :class="contact.verify_status"
                        :title="contact.verify_status"
                      >
                        &#x25CF;
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-sm-8 p-0"
            style="height: 600px; background-color: #f0f2f5 !important;"
          >
            <div
              class="user-info-page"
              v-show="
                history.length == 0 && !start_new_conv_data.start_new_conv
              "
            >
              <div class="cense-whatsapp-image" v-show="!show_spinner">
                <img src="/img/cense_image.png" alt="" class="cense-image" />
                <img
                  src="@/portal/assets/img/WhatsApp-Logo-PNG6.png"
                  alt=""
                  class="whats-app-image"
                />
                <h4>Whatsapp-Web powered by Cense AI</h4>
                <div class="contacts-legend-preview">
                  <h6>Legends for Contacts:</h6>
                  <span style="color:#25af02;font-size: larger;">&#x25CF;</span>
                  <span> This contact is on whatsapp</span> <br />
                  <span style="color:#ff4747;font-size: larger;">&#x25CF;</span>
                  <span> This contact is not on whatsapp</span> <br />
                  <span style="color:#ffc347;font-size: larger;">&#x25CF;</span>
                  <span>
                    We don't know yet whether this contact is on whatsapp</span
                  >
                </div>
              </div>
            </div>
            <div class="col-sm-12 d-flex" v-if="history.length > 0">
              <img
                src="/img/whatsapp-dp.png"
                alt=""
                class="no-profile-image-conv rounded-circle my-2"
                height="40px"
                width="40px"
              />
              <div>
                <button
                  class="btn p-0 remove-border"
                  type="button"
                  id="dropdownMenuButtonOne"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <!-- <i class="fa fa-paperclip mr-2" aria-hidden="true"></i> -->
                  <p v-if="customer_name != ''" class="mt-3 ml-2 customer-name">
                    {{ customer_name }}
                  </p>
                  <p v-else class="mt-3 ml-2">{{ phoneno }}</p>
                </button>
                <div
                  class="dropdown-menu"
                  aria-labelledby="dropdownMenuButtonOne"
                >
                  <a class="dropdown-item" href="javascript:void(0);">
                    +{{ phoneno }}
                  </a>
                </div>
                <!-- <p v-if="customer_name != ''" class="mt-3 ml-2 customer-name">{{ customer_name }}</p>
                <p v-else class="mt-3 ml-2">{{ phoneno }}</p> -->
              </div>
              <div class="ml-auto mt-2 d-flex">
                <!-- <div>
                  <label style="cursor:pointer;" class="mb-0 mt-2">
                    <input type="file" hidden  name="send_attachment" id="send_attachment" :accept="file_extensions.all_allowed_file_extensions.toString()" @change="process_attachment_file" />
                      <i class="fa fa-paperclip mr-2" aria-hidden="true"></i>
                    Upload
                  </label>

                    <input type="file" name="send_attachment" id="send_attachment" @change="process_attachment_file"> -->
                <!-- </i> -->
                <!-- </div> -->
                <div class="dropdown mt-1 ">
                  <button
                    class="btn p-0 remove-border"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <!-- <i class="fa fa-paperclip mr-2" aria-hidden="true"></i> -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-three-dots-vertical"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                      />
                    </svg>
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a
                      class="dropdown-item"
                      href="javascript:void(0);"
                      @click="open_send_template_to_user"
                      >Send Template</a
                    >
                  </div>
                </div>
                <!-- <span class="d-flex">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor"
                    class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                    <path
                      d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                  </svg>
                </span> -->
              </div>
            </div>
            <div
              class="message-area"
              v-if="
                history.length > 0 &&
                  send_attachment_detail.show_preview == false
              "
            >
              <div
                class="message-table-scroll"
                id="scrolling-div-whatsapp"
                @scroll="chatScrollMessages"
              >
                <div v-if="scroll_spinner_chat">
                  <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
                <div class="d-flex flex-column" style="overflow: hidden; width: 100%">
                    <div v-for="(data, index) in history" :key="index">
                      <div class="m-2"
                        style="text-align: center;" 
                        v-if="![null,''].includes(data.bot_response_date) && check_previous_message_date_same(index)">
                        <span class="conversation-date">{{ data.bot_response_date}}</span>
                      </div>
                      <div class="col-sm-12" v-if="data.UserQuery!==''">
                        <td class="pt-2 pl-2 pb-0">
                          <p class="bg-white mb-0 shadow-sm text-black rounded user-msg" style="word-break: break-all; white-space: pre-line">
                            {{formatUserQuery(data.UserQuery)}}
                          </p>
                          <span class="user-msg-flag"><small></small></span>
                          <p class="text-black user-msg-time pr-2"><small>{{ formatUserQueryTime(data.UserQuery_DateTime) }}</small></p>
                        </td>
                      </div>
                      <div v-if="data.BOTResponse.length > 0">
                        <div v-for="(current_bot_response, response_index) in data.BOTResponse" :key="response_index">
                          <div class="row justify-content-end" v-if="current_bot_response.text">
                            <div class="col-auto">
                              <div class="col-sm" style="padding-right: 25px;">
                                <div v-for="(texts, index) in data.BOTResponse.filter(item => item.text!=null)" :key="index" class="mb-1">
                                  <p class=" mb-0 shadow-sm text-black pt-2 pr-2 pl-3 bot-resp-msg " style="word-break: break-all; white-space: pre-line;">
                                    {{ texts.text }}
                                  </p>
                                  <p class="text-black bot-resp-time pr-2"><small>{{ formatUserQueryTime(data.Chat_Datetime) }}</small></p>
                                  <p class="bot-resp-msg-flag"><small></small></p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="" v-if="current_bot_response.buttons" style="padding-right: 25px;">
                            <!-- <div class="row"> -->
                              <!-- <div class="col-sm" style="padding-right: 25px;"> -->
                              <div class="row justify-content-end" v-if="current_bot_response.buttons.length <= 3">
                                <div v-for="(btn, index) in current_bot_response.buttons" :key="index" class="col-sm-3 mb-1">
                                  <div class="preview-button-div" v-if="Boolean(btn.title) && Boolean(btn.value)">
                                    <a class="preview-button" type="button">
                                      {{ btn.title }}
                                    </a>
                                  </div>
                                </div>
                              </div> 
                              <div v-else>
                                <div class="row justify-content-end" >
                                <div class="preview-button-div col-sm-3">
                                  <a class="preview-button" type="button">
                                   <i class="fa fa-list"></i> Buttons
                                  </a>
                                </div>
                                </div>
                              </div>
                            <!-- </div> -->
                          </div>
                          <div v-if="current_bot_response.products">
                            <div class="row justify-content-end">
                            <div class="col-4 bot-resp">
                            <div class="col-sm" v-for="(product, index) in  product_variation(current_bot_response.products.products_list)"
                                  :key="index">
                                  
                              <div class="cards">
                              <img class="cards-img" v-if="product.img_url != null" :src="check_image_type(product.img_url)"/>
                              <img class="cards-img" v-else src="/img/blank_product_image.png"
                                alt="No Product Image" />
                              <div>
                                <label class="mb-0" style="line-height: 1.5;">
                                  {{ product.title }}
                                </label>
                                <br>
                                <label class="mb-0" style="line-height: 1.5;">
                                  {{ product.variation }}
                                </label>
                                <br>
                                <!-- <label class="mb-0" style="line-height: 1.5;">
                                  {{product.price}}
                                </label> -->
                                <label class="mb-0" style="line-height: 1.5;" v-html="whatsapp_message_formating(product.price)">
                                </label>
                              </div>
                              <p class="text-black" style="text-align: end !important; margin: 0;">
                                <small>{{ formatUserQueryTime(data.Chat_Datetime) }}</small>
                              </p>
                            <!-- </div> -->
                              </div>
                              <div class="d-flex" 
                                style="margin-top: 1px; max-width: 205px">
                                <div
                                  style="width: 100%"
                                >
                                  <div
                                    class="preview-button-div"
                                    style="text-align: center;"
                                  >
                                    <a
                                      class="preview-button"
                                      :href="product.url"
                                      target="_blank"
                                    >
                                      <span color="#0b67aa" class=""
                                      ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="17"
                                        height="17"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#0b67aa"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="mr-2"
                                      >
                                        <path
                                          d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                                        ></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line
                                          x1="10"
                                          y1="14"
                                          x2="21"
                                          y2="3"
                                        ></line></svg
                                        >Buy Now
                                      </span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <p class="bot-resp-msg-flag-card"><small></small></p>
                            </div>
                            </div>
                            </div>
                          </div>
                          <div v-if="current_bot_response.card != undefined">
                            <div div class="row justify-content-end">
                            <div class="col-4 bot-resp">
                                <div class="col-sm carousel_cards" style="" v-for="(carousel, index) in current_bot_response.card"
                                  :key="index">
                                <div class="cards">
                                  <div class="carousel_card_single">
                                    <div v-if="carousel.image">
                                      <img class="cards-img" :src=carousel.image alt="carousel Image">
                                    </div>
                                    <div v-if="carousel.video">
                                      <iframe :src="carousel.video" allowfullscreen allowtransparency
                                        allow="autoplay"></iframe>
                                    </div>
                                    <div class="pl-1">
                                      <p v-if="carousel.title">{{ carousel.title }}</p>
                                      <div>
                                        <div v-if="carousel.text">
                                          <p>{{ carousel.text }}</p>
                                        </div>
                                      </div>
                                    </div>
                                    <p class="text-black" style="text-align: end !important; margin: 0;">
                                      <small>{{ data.bot_response_time }}</small>
                                    </p>
                                  </div>
                                </div>
                                  <div v-for="(btn, indx) in carousel.buttons" :key="indx"
                                          class="d-flex" 
                                          style="margin-top: 1px; max-width: 205px">
                                    <div class="preview-button-div" v-if="Boolean(btn.title) && Boolean(btn.value)">
                                      <a class="preview-button" type="button" @click="custom_button_click(btn, item)" :key="index">
                                        {{ btn.title }}
                                      </a>
                                    </div>
                                  </div>
                                  <p class="bot-resp-msg-flag-card"><small></small></p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-if="Boolean(current_bot_response.template)">
                            <div div class="row justify-content-end">
                            <div class="col-4 bot-resp">
                            <div class="col-sm">
                            <div class="cards">
                          <!-- <div
                            v-for="(comp, name, index) in preview_template_data"
                            :key="index"
                          > -->
                            <div v-if="Boolean(current_bot_response.template['HEADER'])">
                              <div v-if="current_bot_response.template['HEADER'].type == 'IMAGE'">
                                <img class="cards-img" :src="current_bot_response.template['HEADER'].body">
                              </div>
                              <div v-else>
                                  <p>{{current_bot_response.template['HEADER'].body}}</p>
                              </div>
                            </div>
                            <div v-if="Boolean(current_bot_response.template['BODY'])">
                              <label v-if="current_bot_response.template['BODY'].type == 'text'"
                              style="line-height: 1.5; overflow-wrap: anywhere;">
                                {{ current_bot_response.template['BODY'].body }}
                              </label>
                            </div>
                            <div v-if="Boolean(current_bot_response.template['FOOTER'])">
                              <span 
                                v-if="current_bot_response.template['FOOTER'].type == 'text'"
                                style="font-size: 10px; line-height: 1.5; font-weight: 300;">
                                {{current_bot_response.template['FOOTER'].body}}
                              </span>
                            </div>
                            <p class="text-black" style="text-align: end !important; margin: 0;">
                              <small>{{ formatUserQueryTime(data.Chat_Datetime) }}</small>
                            </p>
                          <!-- </div> -->
                            </div>
                            <div class="d-flex" 
                              style="margin-top: 1px; max-width: 205px" 
                              v-if="Boolean(current_bot_response.template['BUTTON'])">
                              <div
                                v-for="(btn, index1) in current_bot_response.template['BUTTON'].body"
                                :key="index1" style="width: 100%"
                              >
                                <div
                                  v-if="btn['type'] === 'QUICK_REPLY'"
                                  class="preview-button-div"
                                  style="text-align: center;"
                                  :style="btn['text'] == 'Yes' ? 'margin-right: 1px;' : ''"
                                >
                                  <a
                                    class="preview-button"
                                  >
                                    <span color="rgba(11,103,170,1)" class=""
                                      >{{ btn['text'] }}
                                    </span>
                                  </a>
                                </div>
                                <div
                                  v-else-if="btn['type'] === 'URL'"
                                  class="preview-button-div"
                                  style="text-align: center;"
                                >
                                  <a
                                    :href="btn.url"
                                    target="_blank"
                                    class="preview-button"
                                  >
                                    <span color="#0b67aa" class=""
                                      ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="17"
                                        height="17"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#0b67aa"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="mr-2"
                                      >
                                        <path
                                          d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                                        ></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line
                                          x1="10"
                                          y1="14"
                                          x2="21"
                                          y2="3"
                                        ></line></svg
                                      >{{ btn['text'] }}</span
                                    >
                                  </a>
                                </div>
                              </div>
                              <p class="bot-resp-msg-flag-card">
                                <small></small>
                              </p>
                            </div>
                            <p class="bot-resp-msg-flag-card"><small></small></p>
                            </div>
                            </div>
                            </div>
                          </div>
                          <div v-if="is_response_image(current_bot_response)" class="pt-2 pl-2 pb-0">
                            <div v-if="typeof(current_bot_response.image) == 'string'" >
                              <div div class="row justify-content-end">
                                <div class="col-6 bot-resp">
                                  <div class="col-sm carousel_cards" style="" >
                                  <div class="cards image-custom">
                                    <div class="carousel_card_single" @click="show_image_fullscreen(current_bot_response.image)" style="cursor:pointer;">
                                        <img class="cards-img" :src=current_bot_response.image alt="carousel Image">
                                      <p class="text-black" style="text-align: end !important; margin: 0;">
                                        <small>{{ formatUserQueryTime(data.Chat_Datetime) }}</small>
                                      </p> 
                                    </div>
                                  </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div v-if="typeof(current_bot_response.image) == 'object'">
                              <div div class="row justify-content-end">
                                <div class="col-6 bot-resp">
                                  <div class="col-sm carousel_cards" style="" >
                                  <div class="cards image-custom">
                                    <div class="carousel_card_single" @click="show_image_fullscreen(current_bot_response.image.link)" style="cursor:pointer;">
                                      <img class="cards-img" :src=current_bot_response.image.link alt="carousel Image">
                                      <p class="text-black" style="margin: 0;word-break: break-all;" v-if="current_bot_response.image.caption">
                                      {{current_bot_response.image.caption}}
                                      </p>
                                      <p class="text-black" style="text-align: end !important; margin: 0;">
                                        <small>{{ formatUserQueryTime(data.Chat_Datetime) }}</small>
                                      </p> 
                                    </div>
                                  </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-if="is_response_document(current_bot_response)">
                            <div v-if="typeof(current_bot_response.attachment) == 'object'" class="" style="margin-bottom: 1rem;">
                              <div div class="row justify-content-end">
                                <div class="col-6 bot-resp">
                                  <div class="col-sm carousel_cards" style="" >
                                    <div class="cards image-custom">
                                      <!-- {{data.BOTResponse[0].attachment.filename}} -->
                                      <!-- <div class="carousel_card_single" @click="show_image_fullscreen(data.BOTResponse[0].image)" style="cursor:pointer;">
                                          <img class="cards-img" :src=data.BOTResponse[0].image alt="carousel Image">
                                        <p class="text-black" style="text-align: end !important; margin: 0;">
                                          <small>{{ data.bot_response_time }}</small>
                                        </p> 
                                      </div> -->
                                      <div class="carousel_cards" style="">
                                        <div class="">
                                          <div class="carousel_card_single">
                                            <div>
                                              <img style="filter: blur(2.2px);" class="cards-img" src=/img/pdf-placeholder-2.png alt="carousel Image">
                                            </div>
                                            <!-- <div v-if="carousel.video">
                                              <iframe :src="carousel.video" allowfullscreen allowtransparency
                                                allow="autoplay"></iframe>
                                            </div> -->
                                            <div class="pl-1">
                                              <p v-if="current_bot_response.attachment.filename" class="d-flex">
                                                <i style="cursor: pointer;" @click="show_image_fullscreen(current_bot_response.attachment.link)" class="fa fa-2x pt-1 fa-arrow-circle-down" aria-hidden="true"></i>
                                                <span class="ml-auto pt-1"> {{current_bot_response.attachment.filename}}</span>
                                              </p>
                                              <!-- <div>
                                                <div v-if="carousel.text">
                                                  <p>{{ carousel.text }}</p>
                                                </div>
                                              </div> -->
                                            </div>
                                            <p class="text-black" style="text-align: end !important; margin: 0;">
                                              <small>{{ formatUserQueryTime(data.Chat_Datetime) }}</small>
                                            </p>
                                          </div>
                                        </div>
                                          <!-- <div v-for="(btn, indx) in carousel.buttons" :key="indx"
                                                  class="d-flex" 
                                                  style="margin-top: 1px; max-width: 205px">
                                            <div class="preview-button-div" v-if="Boolean(btn.title) && Boolean(btn.value)">
                                              <a class="preview-button" type="button" @click="custom_button_click(btn, item)" :key="index">
                                                {{ btn.title }}
                                              </a>
                                            </div>
                                          </div> -->
                                          <p class="bot-resp-msg-flag-card"><small></small></p>
                                        </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="row justify-content-end" v-if="current_bot_response.order_template">
                            <div class="col-auto">
                              <div class="col-sm" style="padding-right: 25px;">
                                <div class="mb-1">
                                  <p class=" mb-0 shadow-sm text-black pt-2 pr-2 pl-3 bot-resp-msg " style="word-break: break-all; white-space: pre-line;">
                                   <label class="mb-0" style="line-height: 1.5;" v-html="get_order_template_formatted_text(current_bot_response.order_template)">
                                    </label>
                                  </p>
                                  <p class="text-black bot-resp-time pr-2"><small>{{ formatUserQueryTime(data.Chat_Datetime) }}</small></p>
                                  <p class="bot-resp-msg-flag"><small></small></p>
                                  <div class="preview-button-div" v-if="check_button_in_order_template(current_bot_response.order_template)">
                                    <a
                                      class="preview-button"
                                      :href="get_order_template_button_url(current_bot_response.order_template, 'url')"
                                      target="_blank"
                                    >
                                      <span color="#0b67aa" class=""
                                      ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="17"
                                        height="17"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#0b67aa"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="mr-2"
                                      >
                                        <path
                                          d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                                        ></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line
                                          x1="10"
                                          y1="14"
                                          x2="21"
                                          y2="3"
                                        ></line></svg
                                        >{{get_order_template_button_url(current_bot_response.order_template, 'text')}}
                                      </span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
                <!-- <div class="d-flex">
                  <input disabled type="text" placeholder="Type here to chat..." class="form-control" id="send_message_whatsapp">
                  <button
                    class="btn"
                    type="button"
                    id="send_btn"
                    @click="send_message_to_user"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="send_button"
                      style="fill: #8a8a8a63"
                      width="40"
                      height="25"
                      viewBox="0 0 24 24"
                    >
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      <path d="M0 0h24v24H0z" fill="none" />
                    </svg>
                  </button>
                </div> -->
              </div>
              <!-- <div v-else>
                  <div class="text-center">
                    <h3 class="mt-3">Welcome to Whatsapp Interface of Cense</h3>
                    <h6>Please select a contact or start a new chat</h6>
                  </div>
                </div> -->
            </div>
            <div
              class="start-new-conv"
              v-if="start_new_conv_data.start_new_conv"
            >
              <div class="col-sm-12 d-flex">
                <img
                  src="/img/whatsapp-dp.png"
                  alt=""
                  class="no-profile-image-conv rounded-circle my-2"
                  height="40px"
                  width="40px"
                />
                <div>
                  <p v-if="customer_name != ''" class="mt-3 ml-2 customer-name">
                    {{ customer_name }}
                  </p>
                  <p v-else class="mt-3 ml-2">{{ phoneno }}</p>
                </div>
                <div class="ml-auto mt-3">
                  <div class="dropdown">
                    <button
                      class="btn p-0"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <!-- <i class="fa fa-paperclip mr-2" aria-hidden="true"></i> -->
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        fill="currentColor"
                        class="bi bi-three-dots-vertical"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                        />
                      </svg>
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a
                        class="dropdown-item"
                        href="javascript:void(0);"
                        @click="open_send_template_to_user"
                        >Send Template</a
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="message-area">
                <div
                  class="message-table-scroll"
                  id="scrolling-div-whatsapp"
                  @scroll="chatScrollMessages"
                ></div>
              </div>

              <!-- <div class="user-info pb-2">
                <span class="w-25 d-flex">
                  <img src="/img/whatsapp-dp.png" alt="" class="profile-image rounded-circle">
                  <span>
                    <p v-if="customer_name != ''" class="mt-3 mb-0 pl-3 customer-name">{{ customer_name }}</p>
                    <p v-else class="mt-0 mb-1">{{ phoneno }}</p>
                  </span>
                </span>
                <span class="w-75">
                  <span class="float-right d-flex w-25"
                    style="align-items: center;padding-left:3rem;justify-content: space-around;margin-top: 5px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor"
                      class="bi bi-three-dots-vertical mr-4" viewBox="0 0 16 16">
                      <path
                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    </svg>
                  </span>
                </span>
              </div> -->
            </div>
            <div
              class="document-preview"
              v-show="
                send_attachment_detail.show_preview == true &&
                  file_extensions.image_file_extensions.includes(
                    send_attachment_detail.media_content_type
                  )
              "
            >
              <div class="image-preview-container">
                <div id="img-preview"></div>
                <button
                  type="button"
                  class="close"
                  @click="close_document_preview"
                >
                  <span aria-hidden="true" style="font-size: 2.5rem;"
                    >&times;</span
                  >
                </button>
              </div>
            </div>
            <div
              class="document-preview"
              v-show="
                send_attachment_detail.show_preview == true &&
                  file_extensions.document_file_extensions.includes(
                    send_attachment_detail.media_content_type
                  )
              "
            >
              <div class="document-preview-container">
                <!-- <div id="img-preview"></div> -->
                <!-- <div style="height:500px;display: flex;" v-if="send_attachment_detail.media_content_type == 'application/pdf'"> -->
                <div style="height:500px;">
                  <span
                    aria-hidden="true"
                    style="font-size: 2rem;color: aliceblue;"
                    >&times;</span
                  >
                  <div class="d-flex">
                    <img
                      style="max-height: 300px;text-align: center;margin-left: auto;margin-right: auto;"
                      src="/img/document-placeholder-1.png"
                      alt=""
                    />
                  </div>
                  <p class="text-center pt-4">
                    {{ send_attachment_detail.media_file_name }}
                  </p>
                </div>
              </div>
            </div>
            <div
              style="width:100%"
              class="send-message-to-user d-flex"
              v-if="show_send_message && !start_new_conv_data.start_new_conv"
            >
              <!-- <input type="text" ref="message_sending_textbox" style="padding: 21px !important;" class="form-control" :disabled="!contact_list[current_contact_index].is_message_sending_enabled"
                :placeholder="message_text_box_placeholder" v-model="message_to_send" @keypress.enter="send_message_to_user"> -->
              <div
                v-show="
                  contact_list[current_contact_index].is_message_sending_enabled
                "
              >
                <label style="cursor:pointer;" class="mb-0 mt-2 pl-2 ml-1">
                  <input
                    type="file"
                    hidden
                    name="send_attachment"
                    id="send_attachment"
                    :accept="
                      file_extensions.all_allowed_file_extensions.toString()
                    "
                    @change="process_attachment_file"
                  />
                  <i
                    class="fa fa-paperclip mr-2"
                    aria-hidden="true"
                    style="transform: rotate(-15deg); color:rgb(114 114 114); font-size:18px;margin-top:4px;"
                  ></i>
                  <!-- Upload -->
                </label>
                <!-- <input type="file" name="send_attachment" id="send_attachment" @change="process_attachment_file"> -->
                <!-- </i> -->
              </div>
              <textarea
                autofocus
                name=""
                id="whatsapp_text_input_box"
                cols="30"
                rows="10"
                :placeholder="message_text_box_placeholder"
                class="form-control-textarea"
                :disabled="
                  !contact_list[current_contact_index]
                    .is_message_sending_enabled
                "
                v-model="message_to_send"
                @keydown="textbox_height('#whatsapp_text_input_box')"
              ></textarea>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-send-fill ml-2 mt-2  mr-1"
                viewBox="0 0 16 16"
                style="color:2ead7e"
                @click="send_message_to_user"
                id="msg_send_btn"
                v-if="
                  contact_list[current_contact_index].is_message_sending_enabled
                "
              >
                <path
                  d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"
                />
              </svg>
              <!-- <button class="btn p-0" type="button" id="send_btn" @click="send_message_to_user" v-if="contact_list[current_contact_index].is_message_sending_enabled">
                  <svg xmlns="http://www.w3.org/2000/svg" id="send_button" style="fill: #8a8a8a63" width="40" height="25"
                    viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                </button> -->
              <a
                href="javascript:void(0);"
                id="enable-message-sending"
                @click="enable_sending_messages_for_user"
                v-if="
                  !contact_list[current_contact_index]
                    .is_message_sending_enabled
                "
                >Enable Message Sending</a
              >
            </div>
            <div
              style="width:100%"
              class="send-message-to-user d-flex"
              v-if="show_send_message && start_new_conv_data.start_new_conv"
            >
              <!-- <input type="text" ref="message_sending_textbox" style="padding: 21px !important;" class="form-control" :disabled="!start_new_conv_data.is_message_sending_enabled"
                :placeholder="message_text_box_placeholder" v-model="message_to_send" @keypress.enter="send_message_to_user"> -->
              <div v-show="start_new_conv_data.is_message_sending_enabled">
                <label style="cursor:pointer;" class="mb-0 mt-2 pl-2 ml-1">
                  <input
                    type="file"
                    hidden
                    name="send_attachment"
                    id="send_attachment"
                    :accept="
                      file_extensions.all_allowed_file_extensions.toString()
                    "
                    @change="process_attachment_file"
                  />
                  <i
                    class="fa fa-paperclip mr-2"
                    aria-hidden="true"
                    style="transform: rotate(-15deg); color:rgb(114 114 114); font-size:18px; margin-top:4px;"
                  ></i>
                  <!-- Upload -->
                </label>

                <!-- <input type="file" name="send_attachment" id="send_attachment" @change="process_attachment_file"> -->
                <!-- </i> -->
              </div>
              <textarea
                autofocus
                name=""
                id="whatsapp_text_new_input_box"
                cols="30"
                rows="10"
                :placeholder="message_text_box_placeholder"
                class="form-control-textarea"
                :disabled="!start_new_conv_data.is_message_sending_enabled"
                v-model="message_to_send"
                @keydown="textbox_height('#whatsapp_text_new_input_box')"
              ></textarea>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-send-fill ml-2 mt-2  mr-1"
                viewBox="0 0 16 16"
                style="color:2ead7e"
                @click="send_message_to_user"
                id="msg_send_btn"
                v-if="start_new_conv_data.is_message_sending_enabled"
              >
                <path
                  d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"
                />
              </svg>
              <!-- <button class="btn p-0" type="button" id="send_btn" @click="send_message_to_user" v-if="start_new_conv_data.is_message_sending_enabled">
                <svg xmlns="http://www.w3.org/2000/svg" id="send_button" style="fill: #8a8a8a63" width="40" height="25"
                  viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </button> -->
              <a
                href="javascript:void(0);"
                id="enable-message-sending"
                @click="enable_sending_messages_for_user"
                v-if="!start_new_conv_data.is_message_sending_enabled"
                >Enable Message Sending</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="showImageModal" class="modal fade dash-modal" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <button type="button" class="close" data-dismiss="modal">
            <span aria-hidden="true" style="font-size: 2rem;color: aliceblue;"
              >&times;</span
            >
          </button>
          <img
            class="modal-image-preview"
            :src="current_fullscreen_image_src"
          />
          <!-- <iframe :src="current_fullscreen_image_src" frameborder="0"></iframe> -->
        </div>
      </div>
    </div>
    <div id="addContactModal" class="modal fade dash-modal" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-head d-flex align-items-center m-2">
            <div class="head-icn">
              <img src="/img/msg-blue.png" alt />
            </div>
            <h3>Add Contact</h3>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              style="top: initial;"
            >
              <img src="/img/close-icn.png" alt />
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Number</label>
              <!-- <input
              type="text"
              v-model.trim="add_new_contact.phone_number"
              class="form-control"
              placeholder="Enter Phone Number"
              id="phone_number"
            /> -->
              <vue-phone-number-input
                v-model="add_new_contact.formattedNumber"
                :no-use-browser-locale="true"
                color="#53b9d0"
                valid-color="#ccc"
                @update="add_new_contact.phone_number = $event.formattedNumber"
              >
              </vue-phone-number-input>
              <label>Name</label>
              <input
                type="text"
                v-model.trim="add_new_contact.contact_name"
                class="form-control"
                placeholder="Enter Contact Name"
                id="contact_name"
              />
            </div>
          </div>
          <div class="modal-footer">
            <div
              class="mr-auto"
              @click="open_import_from_csv_modal"
              style="cursor:pointer;"
            >
              <i class="fa fa-paperclip mr-2" aria-hidden="true"></i> Import
              from CSV File
            </div>
            <div class="btn-wrap card-act text-right mt-0 py-0 border-top-0">
              <button type="button" class="btn btn-link" data-dismiss="modal">
                Cancel
              </button>
              <button
                type="submit"
                class="darkblue-btn"
                id="res_n_int_save"
                @click="save_new_contact"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="sendTemplateModal" class="modal fade dash-modal" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-head d-flex align-items-center m-2">
            <div class="head-icn">
              <img src="/img/msg-blue.png" alt />
            </div>
            <h3>Send Template</h3>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              style="top: initial;"
            >
              <img src="/img/close-icn.png" alt />
            </button>
          </div>
          <div class="modal-body">
            <div>
              <h6>Select Template:</h6>
              <!-- <div class="d-flex"> -->
              <table class="table" style="overflow-y: auto">
                <tr
                  v-for="(template, index) in whatsapp_templates.templates_list"
                  :key="index"
                >
                  <td scope="row" style="border:none; padding:0.25rem;">
                    <div class="form-check">
                      <input
                        type="radio"
                        name="dsdf"
                        :id="index"
                        :value="template.template_id"
                        v-model="whatsapp_templates.selected_template"
                      />
                      <label :for="index" class="ml-3">
                        {{ template.template_name }}</label
                      >
                    </div>
                  </td>
                </tr>
              </table>

              <!-- <div>
                <div
                      v-if="Boolean(whatsapp_templates.preview_template_data)"
                      class="cards"
                      style="width: 50%; margin: 0 auto"
                    >
                      <div v-if="Boolean(whatsapp_templates.preview_template_data['HEADER'])">
                        <div
                          v-if="whatsapp_templates.preview_template_data['HEADER'].type == 'IMAGE'"
                        >
                          <img
                            :src="preview_template_data['HEADER'].body"
                            width="100%"
                          />
                        </div>
                        <div v-else>
                          <p>{{ whatsapp_templates.preview_template_data["HEADER"].body }}</p>
                        </div>
                      </div>
                      <div
                        class="mt-4"
                        v-if="Boolean(whatsapp_templates.preview_template_data['BODY'])"
                      >
                        <label
                          v-if="whatsapp_templates.preview_template_data['BODY'].type == 'text'"
                          style="line-height: 1.5"
                        >
                          {{ whatsapp_templates.preview_template_data["BODY"].body }}
                        </label>
                      </div>
                      <div v-if="Boolean(whatsapp_templates.preview_template_data['FOOTER'])">
                        <span
                          v-if="whatsapp_templates.preview_template_data['FOOTER'].type == 'text'"
                          style="
                            font-size: 10px;
                            line-height: 1.5;
                            font-weight: 300;
                          "
                        >
                          {{ whatsapp_templates.preview_template_data["FOOTER"].body }}
                        </span>
                      </div>
                    </div>
                    <div
                      v-if="
                        Boolean(whatsapp_templates.preview_template_data) &&
                        Boolean(whatsapp_templates.preview_template_data['BUTTON'])
                      "
                    >
                      <div
                        v-for="(btn, index1) in whatsapp_templates.preview_template_data['BUTTON']
                          .body"
                        :key="index1"
                      >
                        <div
                          v-if="btn['type'] === 'QUICK_REPLY'"
                          class="preview-button-div"
                          style="width: 50%; margin: 0 auto"
                        >
                          <button
                            color="rgba(11,103,170,1)"
                            class="btn preview-button"
                          >
                            <span color="rgba(11,103,170,1)" class=""
                              >{{ btn["text"] }}
                            </span>
                          </button>
                        </div>
                        <div
                          v-else-if="btn['type'] === 'URL'"
                          class="preview-button-div"
                          style="width: 50%; margin: 0 auto"
                        >
                          <a
                            :href="btn.url"
                            target="_blank"
                            class="btn preview-button"
                          >
                            <span color="#0b67aa" class=""
                              ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="17"
                                height="17"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#0b67aa"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="mr-2"
                              >
                                <path
                                  d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                                ></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line
                                  x1="10"
                                  y1="14"
                                  x2="21"
                                  y2="3"
                                ></line></svg
                              >{{ btn["text"] }}</span
                            >
                          </a>
                        </div>
                      </div>
                    </div>
              </div> -->
              <!-- </div> -->
              <div class="modal-footer">
                <div
                  class="btn-wrap card-act text-right mt-0 py-0 border-top-0"
                >
                  <button
                    type="button"
                    class="btn btn-link"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="darkblue-btn"
                    id="res_n_int_save"
                    @click="send_template_to_customer()"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="importContactCSVModal" class="modal fade dash-modal" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-head d-flex align-items-center m-2">
            <div class="head-icn">
              <img src="/img/msg-blue.png" alt />
            </div>
            <h3>Import Contacts from CSV</h3>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              style="top: initial;"
            >
              <img src="/img/close-icn.png" alt />
            </button>
          </div>
          <div class="modal-body">
            <div>
              <form @submit.prevent="file_submit_upload_contacts">
                <div class="form-group">
                  <div class="custom-file">
                    <input
                      type="file"
                      accept=".csv"
                      class="custom-file-input"
                      @change="file_input_contacts_csv"
                      id="inputGroupUploadFilecsv"
                      aria-describedby="inputGroupFileAddoncsv"
                    />
                    <label
                      style="font-weight: 400; line-height: 15px"
                      class="custom-file-label form-control"
                      for="file"
                      >{{ contact_csv.file_label }}</label
                    >
                  </div>
                  <!-- <p class="mt-2" style="color: #fa0000; font-size: 0.85rem">
                  * Please Note that only Responses with only Text Response can
                  be added via CSV, API Endpoints and Responses with Image need
                  to be added from the portal.
                </p> -->
                </div>
                <div class="btn-wrap text-right">
                  <a
                    href="javascript:void(0)"
                    @click="download_sample_contact_file"
                  >
                    Download Sample CSV File
                    <!-- <i
                    class="fa fa-spinner fa-spin"
                  ></i> -->
                  </a>
                  <button
                    type="button"
                    class="btn btn-link"
                    @click="empty_upload_csv_contacts"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" class="darkblue-btn">Submit</button>
                </div>
              </form>

              <!-- <div class="modal-footer">
              <div class="btn-wrap card-act text-right mt-0 py-0 border-top-0">
                <button
                  type="button"
                  class="btn btn-link"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="darkblue-btn"
                  id="res_n_int_save"
                  @click="send_template_to_customer()"
                >
                  Send
                </button>
              </div>
           </div> -->
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
import { Socket, Presence } from "phoenix";
import moment from "moment";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import VuePhoneNumberInput from "vue-phone-number-input";
import swal from "sweetalert2";
export default {
  name: "WhatsAppChat",
  components: {
    Multiselect,
    VuePhoneNumberInput
  },
  data() {
    return {
      show_spinner: false,
      history: [],
      contact_list: [],
      phoneno: null,
      customer_name: "",
      chat_details: [],
      search_value: "",
      company_id: this.$session.get("UserInformation").company_id,
      company_name: this.$session.get("UserInformation").company_name,
      session_token: this.$session.get("UserInformation").tokens,
      initial_message_load: false,
      is_profile_setup: false,
      message_pagination: {
        is_scroll_up: false,
        per_page: 5,
        page_no: 1,
        total_records: 10,
        page_record_fetched: []
      },
      is_paginated_call: false,
      default_whatsapp_status: "Hey there! I am using whatsapp",
      edit_status: false,
      scroll_spinner_chat: false,
      show_send_message: false,
      is_message_sending_enabled: false,
      is_show_message_disabled: true,
      whatsapp_profile: "",
      edit_email: false,
      edit_address: false,
      edit_description: false,
      edit_website: false,
      email_address: "",
      business_address: "",
      description: "",
      website_url: "",
      whatsapp_phone_number: null,
      channel: null,
      chat_socket: null,
      support_channel: null,
      message_to_send: null,
      whatsapp_status: "",
      index_update: null,
      second_website: false,
      selected_files: "",
      mouse_hover_text: false,
      vertical_types: [
        "Automotive",
        "Beauty",
        "Spa and Salon",
        "Clothing and Apparel",
        "Education",
        "Entertainment",
        "Event Planning and Service",
        "Finance and Banking",
        "Food and Grocery",
        "Public Service",
        "Hotel and Lodging",
        "Medical and Health",
        "Non-profit",
        "Professional Services",
        "Shopping and Retail",
        "Travel and Transportation",
        "Restaurant",
        "Other"
      ],
      current_contact_number: null,
      is_contact_list: false,
      current_contact_index: null,
      search_in_contact_list: "",
      all_contact_list: [],
      start_new_conv_data: {
        start_new_conv: false,
        is_message_sending_enabled: false
      },
      all_contact_pagination: {
        per_page: 10,
        page_no: 1,
        total_records: 10
      },
      send_attachment_detail: {
        media_file_name: null,
        media_file: null,
        show_preview: false,
        media_content_type: null,
        media_type: null,
        send_media: true,
        document_content: null,
        media_caption: null
      },
      current_fullscreen_image_src: null,
      add_new_contact: {
        phone_number: null,
        is_add_contact: true,
        contact_name: null,
        formattedNumber: null
      },
      add_new_contact_formatted_phone_number: null,
      file_extensions: {
        all_allowed_file_extensions: [
          "image/png",
          "image/jpeg",
          "application/pdf",
          "text/plain",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-powerpoint",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/csv"
        ],
        image_file_extensions: ["image/png", "image/jpeg"],
        document_file_extensions: [
          "application/pdf",
          "text/plain",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-powerpoint",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/csv"
        ]
      },
      whatsapp_templates: {
        templates_list: [],
        pagination_data: {
          per_page: 10,
          page_no: 1,
          total_records: 10
        },
        selected_template: null,
        preview_template_data: null
      },
      contact_csv: {
        file_label: "Choose File",
        file_content: null,
        file_selected: false
      },
      whatsapp_format_dict: {
        "*": ["<strong>", "</strong>"],
        _: ["<i>", "</i>"],
        "~": ["<s>", "</s>"],
        "```": ["<tt>", "</tt>"]
      },
      whatsapp_formating_list: ["*", "_", "~", "```"]
    };
  },
  computed: {
    total_pages_loaded() {
      if (
        this.message_pagination.page_no * this.message_pagination.per_page >=
        this.message_pagination.total_records
      ) {
        return true;
      }
      return false;
    },
    message_text_box_placeholder() {
      return "Send a message to user";
    },
    total_contact_loaded() {
      if (
        this.all_contact_pagination.page_no *
          this.all_contact_pagination.per_page >=
        this.all_contact_pagination.total_records
      ) {
        return true;
      }
      return false;
    }
  },
  mounted() {
    this.get_contact_list(true);
    this.get_profile_details();
    const vm = this;
    $(window).bind("mousewheel", function(event) {
      if (event.originalEvent.wheelDelta >= 0) {
        vm.message_pagination.is_scroll_up = true;
      } else {
        vm.message_pagination.is_scroll_up = false;
      }
    });
    // var lastScrollTop = 0;
    // document.addEventListener(
    //   "scroll",
    //   function (ev) {
    //     if (ev.target.id === "scrolling-div-whatsapp") {
    //       console.log(ev)
    //       var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    //       if (st > lastScrollTop){
    //         vm.message_pagination.is_scroll_up = false;
    //       } else {
    //         console.log("Scrolling Up")
    //         vm.message_pagination.is_scroll_up = true;
    //       }
    //       lastScrollTop = st <= 0 ? 0 : st;

    //       // vm.scrollPosition = ev.target["scrollTop"];
    //     }
    //   },
    //   true
    // );
    $("#showImageModal").on("hidden.bs.modal", function(e) {
      vm.current_fullscreen_image_src = null;
    });
    $("#importContactCSVModal").on("hidden.bs.modal", function(e) {
      vm.empty_upload_csv_contacts();
    });
    $('[data-toggle="popover"]').popover({
      html: true,
      title: "Legend for Contacts",
      content: `<span style='color:#25af02;font-size: larger;'>&#x25CF;</span> <span>  This contact is on whatsapp</span> <br>
                <span style='color:#ff4747;font-size: larger;'>&#x25CF;</span> <span> This contact is not on whatsapp</span> <br>
                <span style='color:#ffc347;font-size: larger;'>&#x25CF;</span> <span> We don't know yet whether this contact is on whatsapp</span>`
    });
    axios.post(api_calls.initialize_whatsapp_topic(), 
    {
      company_id: this.company_id,
      whatsapp_phone_number: "100",
      test: btoa("test_paramater")
    }).then((response) => {
      // console.log(response)
      // this.chat_group_name = response.data.chat_group_name;
      // this.live_chat_token = response.data.token;
      // this.live_chat_on = true;
      this.chat_socket = new Socket(
        process.env.VUE_APP_LIVE_CHAT_WEBSOCKET_ENDPOINT,
        {
          params: {
            whatsapp: "true",
            elixir_token : response.data.elixir_token,
            token: this.session_token,
            username: this.$session.get("UserInformation").email
          },
        }
      );
      this.chat_socket.connect();
      this.channel = this.chat_socket.channel(
        "whatsapp:" + this.company_id
      );
      this.channel.join();
      this.channel.on("new_whatsapp_message", (res) => {
        if(res.company_id === this.company_id){
          // console.log(res)
          // if(!res.is_bot_conversation_realtime){
            // console.log("user bot conversation")
            let contact_index = this.contact_list.findIndex((item) => {return item.whatsapp_phone_number === res.whatsapp_phone_number});
            
            if(!res.is_bot_conversation_realtime){
            // let latest_message;
            // if(res.is_bot_conversation_realtime){
            //   let is_text =  res.BOTResponse.find((item) => item.text != null),
            //   is_product = res.BOTResponse.find((item) => (item.text == null && item.products));
            //   if(Boolean(is_text)) {
            //     latest_message = is_text.text;
            //   } else if(Boolean(is_product)) {
            //     latest_message = "Product bot response"
            //   } else {
            //     latest_message = null
            //   }
            // } else {
            // }
            // console.log(res, "else", contact_index)
              if (contact_index != -1){
                this.contact_list[contact_index].last_bot_response.text = res.whatsapp_message;
                this.contact_list[contact_index].is_new_notification = true;
                this.contact_list[contact_index].new_message_count = 1;
                this.contact_list = this.array_move(this.contact_list, contact_index, 0);
                // this.current_contact_index
              }
              if(this.check_current_number(res)){ 
                let current_timestamp = new Date(),
                current_date = moment().format('YYYY-MM-DD');
                let bot_response_date = current_date;
                if(this.history.map(item => item.bot_response_date == bot_response_date).length > 0){
                  bot_response_date = "";
                }
                this.history.push(
                {
                  "BOTResponse": [],
                  "UserQuery": res.whatsapp_message,
                  "bot_response_date": bot_response_date, 
                  "bot_response_time": current_timestamp, 
                  "user_query_date": current_date,
                  "user_query_time": current_timestamp,
                  "UserQuery_DateTime": current_timestamp.toISOString()
                }
              );
              }
            } else {
              let latest_message,
              is_text =  res.BOTResponse.find((item) => item.text != null),
              is_product = res.BOTResponse.find((item) => (item.text == null && item.products));
              if(Boolean(is_text)) {
                latest_message = is_text.text;
              } else if(Boolean(is_product)) {
                latest_message = "Product bot response"
              } else {
                latest_message = null
              }
              if (contact_index != -1){
                this.contact_list[contact_index].last_bot_response.text = latest_message;
                this.contact_list[contact_index].is_new_notification = true;
                this.contact_list[contact_index].new_message_count = 1;
                this.contact_list = this.array_move(this.contact_list, contact_index, 0);
                // this.current_contact_index
              };
              if(this.check_current_number(res)){ 
                let current_timestamp = new Date(),
                current_date = moment().format('YYYY-MM-DD');
                let bot_response_date = current_date;
                if(this.history.map(item => item.bot_response_date == bot_response_date).length > 0){
                  bot_response_date = "";
                }
                res["bot_response_date"] = bot_response_date; 
                res["bot_response_time"] = current_timestamp; 
                res["user_query_date"] = current_date;
                res["user_query_time"] = current_timestamp;
                this.history.push(res);
              }
            }
            this.scroll_down();
          // } else {
          //   console.log("realtime conversation")
          // }
        }
      })
    })
  },
  watch: {
    search_value(newValue) {
      if (newValue != "" && newValue.length > 2) {
        axios
          .post(
            api_calls.whatsapp_chat(),
            {
              company_id: this.company_id,
              company_name: this.company_name,
              is_search: true,
              search_string: newValue,
              is_get_contacts: true
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`
              }
            }
          )
          .then(response => {
            if (
              response.data == "No contacts found" ||
              response.data == "Data not found"
            ) {
              this.contact_list = [];
            } else {
              this.contact_list = response.data.contacts;
            }
          })
          .catch(e => {
            this.show_spinner = false;
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              this.$root.$emit("Session_Expired", e.response.data);
            }
          });
      } else {
        this.get_contact_list(false);
      }
    },
    search_in_contact_list(newValue) {
      if (newValue != "" && newValue.length > 2) {
        axios
          .post(
            api_calls.whatsapp_chat(),
            {
              company_id: this.company_id,
              company_name: this.company_name,
              is_search: true,
              search_string: newValue,
              is_get_all_contacts: true
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`
              }
            }
          )
          .then(response => {
            // console.log(response);
            if (response.data == "No contacts found") {
              this.all_contact_list = [];
            } else {
              this.all_contact_list = response.data.contacts;
            }
          })
          .catch(e => {
            this.show_spinner = false;
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              this.$root.$emit("Session_Expired", e.response.data);
            }
          });
      } else {
        this.get_all_contact_list();
      }
    },
    "whatsapp_templates.selected_template": {
      handler: function(newVal, oldVal) {
        if (Boolean(newVal)) {
          var current_template = this.whatsapp_templates.templates_list.find(
            item => item.template_id == newVal
          );
          var template_id = newVal;
          var variable_dict = current_template.variable_dict;
          var is_parent_template = false;
          axios
            .post(
              api_calls.whatsapp_template(),
              {
                company_id: this.company_id,
                company_name: this.company_name,
                is_notification: false,
                is_preview: true,
                is_parent_template: is_parent_template,
                template_id: template_id,
                variable_dict: variable_dict
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`
                }
              }
            )
            .then(response => {
              this.spinnerOn = false;
              if (response.data.status == "Success") {
                this.whatsapp_templates.preview_template_data =
                  response.data.body;
              }
            })
            .catch(e => {
              console.log(e);
            });
        }
      },
      deep: true
    }
  },
  methods: {
    empty_variable() {
      (this.history = []), (this.phoneno = null);
      this.customer_name = "";
      this.chat_details = [];
      this.message_pagination.per_page = 5;
      this.message_pagination.page_no = 1;
      this.message_pagination.total_records = 10;
      this.message_pagination.page_record_fetched = [];
      this.message_to_send = null;
      this.current_contact_index = null;
      this.all_contact_pagination.per_page = 10;
      this.all_contact_pagination.page_no = 1;
      this.all_contact_pagination.total_records = 10;
      this.send_attachment_detail = {
        media_file_name: null,
        media_file: null,
        show_preview: false,
        media_content_type: null,
        media_type: null,
        send_media: true,
        document_content: null,
        media_caption: null
      };
    },
    get_history_data(whatsapp_no, user_name, contact_index, contact) {
      this.empty_variable();
      this.show_spinner = true;
      this.customer_name = this.get_contact_display_name(contact);
      // this.customer_name = user_name;
      this.current_contact_number = whatsapp_no;
      this.show_send_message = false;
      this.current_contact_index = contact_index;
      this.contact_list[contact_index].is_new_notification = false;
      this.start_new_conv_data.start_new_conv = false;
      axios
        .post(
          api_calls.whatsapp_chat(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            get_by_whatsapp_phone_number: true,
            whatsapp_phone_number: whatsapp_no,
            per_page: this.message_pagination.per_page,
            page_no: 1
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          }
        )
        .then(response => {
          this.show_send_message = true;
          this.show_spinner = false;
          if (response.data != null) {
            if (response.data == "Data not found") {
              this.start_new_conv_data.start_new_conv = true;
              this.new_conv_contact_data = contact;
            } else {
              this.history = this.format_history_response(
                response.data.chat_history
              );
              this.phoneno = response.data.whatsapp_phone_number || whatsapp_no;
              // console.log(this.phoneno, this.contact_list);
              let contact_list_index = this.contact_list.findIndex(
                item => item.whatsapp_phone_number == this.phoneno
              );
              if (contact_list_index >= 1) {
                // this.contact_list = this.array_move(this.contact_list, contact_list_index, 0);
                this.current_contact_index = contact_list_index;
                this.current_contact_number = this.phoneno;
                // this.contact_list[contact_list_index].is_message_sending_enabled = false;
              }
              this.message_pagination.total_records =
                response.data.total_chat_history;
              setTimeout(() => {
                this.scroll_down();
                this.initial_message_load = true;
                this.message_pagination.is_scroll_up = true;
                this.chatScrollMessages(true);
              }, 400);
            }
          }
        })
        .catch(e => {
          this.show_spinner = false;
          console.log(e);
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    get_contact_list(enable_bot_responses) {
      this.show_spinner = true;
      axios
        .post(
          api_calls.whatsapp_chat(),
          {
            is_get_contacts: true,
            company_id: this.company_id,
            company_name: this.company_name,
            enable_bot_response_all: enable_bot_responses
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          }
        )
        .then(response => {
          if (
            response.data == "No contacts found" ||
            response.data == "Data not found"
          ) {
            this.contact_list = [];
          } else {
            this.contact_list = response.data.contacts;
          }
          this.show_spinner = false;
          // this.contact_list = response.data.contacts;
        })
        .catch(e => {
          this.show_spinner = false;
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    scroll_down() {
      var container = document.querySelector(".message-table-scroll");
      // console.log(container);
      if (Boolean(container)) {
        setTimeout(() => {
          container.scrollTop = container.scrollHeight;
        }, 100);
        // this.initial_message_load = true;
      }
    },
    scroll_down_effect() {
      var container = document.querySelector(".message-table-scroll");
      // console.log(container);
      if (Boolean(container)) {
        setTimeout(() => {
          container.scrollTop = 10;
        }, 0);
        // this.initial_message_load = true;
      }
    },
    product_variation(products_list) {
      let new_product_list = [];
      for (let i in products_list) {
        let components = products_list[i].template.components;
        let temp = {};
        try {
        
        for (let j in components) {
          if (j == 0) {
            temp["img_url"] = components[j].parameters[0].image.link;
          }
          if (j == 1) {

            temp["title"] = components[j].parameters[0].text;
            if(components[j].parameters.length == 2) {
              temp["price"] = components[j].parameters[1].text;
              temp["variation"] = components[j].parameters[1].text;
            } 
            if(components[j].parameters.length == 3) { 
              temp["variation"] = components[j].parameters[1].text; 
              temp["price"] = components[j].parameters[2].text
            }
            // components[j].parameters.length == 3 ? temp["variation"] = components[j].parameters[1].text; temp["price"] = components[j].parameters[1].text: null;
            
          }
          if (j == 2) {
            temp["url"] = components[j].parameters[0].text;
            temp["type"] = components[j].parameters.type;
          }
        }
        }
        catch (error) {
          debugger
        }
        new_product_list.push(temp);
      }
      return new_product_list;
    },
    check_image_type(image) {
      if (typeof image == "string") {
        return image;
      } else {
        if (image != null) {
          return image.src;
        } else {
          return "";
        }
      }
    },
    trim_card_description(text) {
      if (Boolean(text)) {
        if (text.length > 100) {
          let string_text = text.substring(0, 80) + "...";
          return string_text;
        }
        return text;
      }
    },
    latest_bot_text(text) {
      if (!Boolean(text)) {
        return "Custom bot Response";
      }
      if (text.length > 35) {
        return `${text.substring(0, 35)}...`;
      }
      return text;
    },
    search_contact_list() {
      if (this.search_value == "") {
        return this.contact_list;
      } else {
        let new_val = this.search_value;
        if (new_val != this.search_value) {
          // console.log(this.search_value);
          axios
            .post(
              api_calls.whatsapp_chat(),
              {
                company_id: this.company_id,
                company_name: this.company_name,
                is_get_all_contacts: true,
                is_search: true,
                search_string: this.search_value
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`
                }
              }
            )
            .then(response => {
              this.show_spinner = false;
              this.contact_list = response.data.contacts;
            })
            .catch(e => {
              this.show_spinner = false;
              if (
                e.response.status === 410 ||
                e.response.status === 440 ||
                e.response.status === 409
              ) {
                this.$root.$emit("Session_Expired", e.response.data);
              }
            });
        }
        return this.contact_list;
      }
    },
    chatScrollMessages(scroll_down) {
      // console.log(this.initial_message_load);
      if (this.initial_message_load === true) {
        let container_div_scroll_top = document.getElementsByClassName(
          "message-table-scroll"
        )[0].scrollTop;
        if (
          container_div_scroll_top < 50 &&
          this.message_pagination.is_scroll_up === true &&
          !this.is_paginated_call &&
          !this.total_pages_loaded
        ) {
          // console.log("api call paginated")
          this.is_paginated_call = true;
          this.scroll_spinner_chat = true;
          axios
            .post(
              api_calls.whatsapp_chat(),
              {
                company_id: this.company_id,
                company_name: this.company_name,
                get_by_whatsapp_phone_number: true,
                whatsapp_phone_number: this.current_contact_number,
                per_page: this.message_pagination.per_page,
                page_no: this.message_pagination.page_no + 1
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`
                }
              }
            )
            .then(response => {
              // console.log(response.data);
              this.scroll_spinner_chat = false;
              this.is_paginated_call = false;
              if (
                !this.message_pagination.page_record_fetched.includes(
                  response.data.page_no
                )
              ) {
                let new_data = this.format_history_response(
                  response.data.chat_history
                );
                this.history = new_data.concat(this.history);
                this.message_pagination.page_record_fetched.push(
                  response.data.page_no
                );
                // console.log(this.history);
                this.message_pagination.page_no += 1;
                if (scroll_down == true) {
                  this.scroll_down();
                } else {
                  // this.scroll_down_effect()
                }
              }
            })
            .catch(e => {
              console.log(e);
            });
        }
      }
    },
    show_profile_setup() {
      this.is_profile_setup = !this.is_profile_setup;
      this.get_profile_details();
    },
    show_all_contacts() {
      this.is_profile_setup = !this.is_profile_setup;
      this.is_contact_list = !this.is_contact_list;
      this.get_all_contact_list();
    },
    format_history_response(response) {
      let con_date = "";
      for (let i in response) {
        if (i == 0) {
          con_date = response[i].bot_response_date;
        }
        if (con_date == response[i].bot_response_date && i != 0) {
          response[i].bot_response_date = "";
        } else {
          con_date = response[i].bot_response_date;
        }
      }
      return response;
    },
    send_message_to_user() {
      if (
        Boolean(this.message_to_send) === false &&
        this.send_attachment_detail.show_preview == false
      )
        return false;
      let current_timestamp = new Date(),
        current_date = moment().format("YYYY-MM-DD");
      if (this.send_attachment_detail.show_preview == true) {
        this.send_attachment_detail.company_id = this.company_id;
        this.send_attachment_detail.company_name = this.company_name;
        this.send_attachment_detail.whatsapp_contact_number = this.current_contact_number;
        this.send_attachment_detail.document_content = null;
        this.send_attachment_detail.media_caption = this.message_to_send;
        this.show_spinner = true;
        axios
          .post(api_calls.whatsapp_chat(), this.send_attachment_detail, {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          })
          .then(response => {
            this.show_spinner = false;
            if (response.data.message === "Whatsapp media sent successfully") {
              let bot_response = [];
              if (
                this.file_extensions.image_file_extensions.includes(
                  this.send_attachment_detail.media_content_type
                )
              ) {
                bot_response = [
                  {
                    text: null,
                    recipient_id: this.current_contact_number,
                    image: {
                      caption: this.message_to_send,
                      link: response.data.file_link
                    }
                  }
                ];
              }
              if (
                this.file_extensions.document_file_extensions.includes(
                  this.send_attachment_detail.media_content_type
                )
              ) {
                bot_response = [
                  {
                    text: null,
                    recipient_id: this.current_contact_number,
                    image: `https://storage.cense.ai/${this.company_id}/WhatsappMedia/${this.send_attachment_detail.media_file_name}`
                  }
                ];
              }
              let bot_response_date = current_date;
              if (
                this.history.map(
                  item => item.bot_response_date == bot_response_date
                ).length > 0
              ) {
                bot_response_date = "";
              }
              this.history.push({
                BOTResponse: bot_response,
                user_query_time: current_timestamp,
                UserQuery: "",
                bot_response_date: bot_response_date,
                bot_response_time: current_timestamp,
                user_query_date: current_date,
                Chat_Datetime: current_timestamp.toISOString()
              });
              this.scroll_down();
              this.contact_list[
                this.current_contact_index
              ].last_bot_response.text = this.message_to_send;
              this.contact_list = this.array_move(
                this.contact_list,
                this.current_contact_index,
                0
              );
              this.message_to_send = null;
              this.current_contact_index = 0;
              this.send_attachment_detail.show_preview = false;
            } else if (response.data.message === "Tier specific user limit reached") {
              Swal({
                title: this.tlt('tier_specific_user_limit_reached'),
                text: this.tlt('tier_specific_user_limit_reached_msg'),
                type: "warning",
                showConfirmButton: false,
                timer: 4000,
              });
            } else if(response.data.message === "Whatsapp media send failure") {
              swal({
                title: "Some Error Occurred",
                text: "Please try again",
                showCancelButton: false,
                type: "error"
              });
            } else if (
              response.data.message === "Message Sending Limit Reached"
            ) {
              swal({
                type: "warning",
                text: "Message Sending Limit Reached",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                confirmButtonText: this.tlt("email_temp_swal_upgrade_now_msg"),
                cancelButtonText: this.tlt("email_temp_swal_upgrade_later_msg"),
                cancelButtonColor: "#d33"
              }).then(result => {
                if (result.value == true) {
                  this.$router.push({
                    name: "Settings",
                    params: { Subscription: true }
                  });
                }
              });
            }
            // console.log(response);
            return;
          })
          .catch(e => {
            console.log(e);
            return;
          });
        return false;
      }
      this.show_spinner = true;
      axios
        .post(
          api_calls.whatsapp_chat(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            send_message: true,
            text: this.message_to_send,
            whatsapp_contact_number: this.current_contact_number
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          }
        )
        .then(response => {
          this.show_spinner = false;
          if (response.data.message === "Whatsapp message sent successfully") {
            if (this.start_new_conv_data.start_new_conv) {
              this.current_contact_index = 0;
              this.new_conv_contact_data.chat_datetime = current_timestamp.toISOString();
              this.new_conv_contact_data.is_message_sending_enabled = true;
              this.new_conv_contact_data.last_bot_response = {
                text: this.message_to_send,
                chat_datetime: current_timestamp.toISOString(),
                date: current_date,
                time: `${current_timestamp.getUTCHours()}:${current_timestamp.getUTCMinutes()}`
              };
              this.contact_list.unshift(this.new_conv_contact_data);
              this.start_new_conv_data.start_new_conv = false;
            }
            let bot_response_date = current_date;
            if (
              this.history.map(
                item => item.bot_response_date == bot_response_date
              ).length > 0
            ) {
              bot_response_date = "";
            }
            this.history.push({
              BOTResponse: [
                {
                  text: this.message_to_send,
                  recipient_id: this.current_contact_number
                }
              ],
              "user_query_time":current_timestamp,
              "UserQuery": "",
              "bot_response_date": bot_response_date, 
              "bot_response_time": current_timestamp, 
              "user_query_date": current_date,
              "Chat_Datetime": current_timestamp.toISOString()
            }
          );
          this.scroll_down();
          this.contact_list[this.current_contact_index].last_bot_response.text = this.message_to_send;
          this.contact_list = this.array_move(this.contact_list, this.current_contact_index, 0);
          this.message_to_send = null;
          this.current_contact_index = 0;
        } else if ( response.data.message == "Tier specific user limit reached") {
            Swal({
              title: this.tlt('tier_specific_user_limit_reached'),
              text: this.tlt('tier_specific_user_limit_reached_msg'),
              type: "warning",
              showConfirmButton: false,
              timer: 4000,
            });
        } else if (response.data.message === "Message Sending Limit Reached") {
            Swal({
              type: "warning",
              text: "Message Sending Limit Reached",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              confirmButtonText: this.tlt("email_temp_swal_upgrade_now_msg"),
              cancelButtonText: this.tlt("email_temp_swal_upgrade_later_msg"),
              cancelButtonColor: "#d33"
            }).then(result => {
              if (result.value == true) {
                this.$router.push({
                  name: "Settings",
                  params: { Subscription: true }
                });
              }
            });
          }
        })
        .catch(e => {
          this.show_spinner = false;
          swal({
            title: "Oops",
            text: "Some Error Occurred",
            showCancelButton: false
          });
        });
    },
    edit_website_value(index) {
      this.index_update = index;
      this.edit_website = true;
    },
    get_profile_details() {
      this.show_spinner = true;
      this.edit_email = false;
      this.edit_address = false;
      this.edit_description = false;
      this.edit_website = false;
      this.edit_status = false;
      this.index_update = null;
      axios
        .post(
          api_calls.whatsapp_profile(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            is_get: true
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          }
        )
        .then(response => {
          this.show_spinner = false;
          this.whatsapp_profile = response.data.whatsapp_profile;
        })
        .catch(e => {
          this.show_spinner = false;
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    update_profile_details() {
      this.edit_email = false;
      this.edit_address = false;
      this.edit_description = false;
      this.edit_website = false;
      this.edit_status = false;
      this.index_update = null;
      if (this.whatsapp_profile.websites.length == 2) {
        this.second_website = true;
      }
      this.show_spinner = true;
      axios
        .post(
          api_calls.whatsapp_profile(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            is_edit: true,
            whatsapp_profile: this.whatsapp_profile
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          }
        )
        .then(response => {
          this.show_spinner = false;
          let resp = response.data.update_response;
          if (resp == "edit successful") {
            this.get_profile_details();
          } else {
            Swal({
              text: "Please entre valid data",
              toast: true,
              position: "top-end",
              type: "error",
              showConfirmButton: false,
              timer: 2000
            });
            this.get_profile_details();
          }
        })
        .catch(e => {
          console.log(e);
          this.show_spinner = false;
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    update_profile_image(e) {
      this.selected_files = e.target.files[0];
      if (
        this.selected_files.type == "image/png" ||
        this.selected_files.type == "image/jpg" ||
        this.selected_files.type == "image/jpeg"
      ) {
        if (this.selected_files.size > 5097152) {
          Swal({
            text: "Upload image with size should be less than 5MB",
            toast: true,
            position: "top-end",
            type: "error",
            showConfirmButton: false,
            timer: 2000
          });
          this.selected_files = "";
          return;
        }
        let file_to_upload = this.selected_files;
        var profile_img = {
          company_id: this.company_id,
          company_name: this.company_name,
          photo: file_to_upload,
          wa_phone_number: this.whatsapp_profile.whatsapp_phone_number
        };
        var json = JSON.stringify(profile_img);
        var blob = new Blob([json], {
          type: "application/json"
        });
        const fd = new FormData();
        fd.append("photo", this.selected_files);
        fd.append("json", blob);
        this.show_spinner = true;
        axios
          .post(api_calls.whatsapp_profile(), fd, {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          })
          .then(response => {
            this.show_spinner = false;
            let resp = response.data;
            if (resp == "Photo updating successful") {
              this.get_profile_details();
          } else if(resp == "Photo updating unsuccessful"){
            Swal({
              text: "Some error occurred, please try again!",
              type: "error",
              showConfirmButton: true,
              showCancelButton: false
            });
          } else if(resp == "Please upload JPG image of resolution greater than 192 pixel * 192 pixel"){
            Swal({
              text: "Please upload JPG image of resolution greater than 192 pixel * 192 pixel",
              type: "error",
              showConfirmButton: true,
              showCancelButton: false
            });
          } else if (resp == "Cannot update photo yet"){
              Swal({
                text: "Some error occurred, please try again!",
                type: "error",
                showConfirmButton: true,
                showCancelButton: false
              });
            } else if (resp == "Cannot update photo yet") {
              Swal({
                text:
                  "You cannot update the profile picture yet, please try again later",
                type: "warning",
                showConfirmButton: true,
                showCancelButton: false
              });
              this.get_profile_details();
            } else {
              this.get_profile_details();
            }
          })
          .catch(e => {
            console.log(e);
            this.show_spinner = false;
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              this.$root.$emit("Session_Expired", e.response.data);
            }
          });
      } else {
        Swal({
          text: "Upload image with specific formate(jpg jpeg png)",
          toast: true,
          position: "top-end",
          type: "error",
          showConfirmButton: false,
          timer: 2000
        });
      }
    },
    remove_profile_image() {
      this.show_spinner = true;
      axios
        .post(
          api_calls.whatsapp_profile(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            is_remove_photo: true
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          }
        )
        .then(response => {
          this.show_spinner = false;
          if (response.data === "Photo removed") {
            this.get_profile_details();
          }
          if (response.data === "Photo removal unsuccessful") {
            this.get_profile_details();
          }
        })
        .catch(e => {
          this.show_spinner = false;
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    connect_elixir_socket() {
      axios
        .post(api_calls.initialize_whatsapp_topic(), {
          company_id: this.company_id,
          whatsapp_phone_number: "100"
        })
        .then(response => {
          // console.log(response)
          // this.chat_group_name = response.data.chat_group_name;
          // this.live_chat_token = response.data.token;
          // this.live_chat_on = true;
          this.chat_socket = new Socket(
            process.env.VUE_APP_LIVE_CHAT_WEBSOCKET_ENDPOINT,
            {
              params: {
                whatsapp: "true",
                token: response.data.token
              }
            }
          );
          this.chat_socket.connect();
          this.channel = this.chat_socket.channel(
            "whatsapp:" + response.data.whatsapp_topic
          );
          this.channel.join();
          this.channel.on("new_whatsapp_message", res => {
            // console.log("new_whatsapp_message", res)
          });
        });
    },
    enable_sending_messages_for_user() {
      axios
        .post(
          api_calls.whatsapp_chat(),
          {
            update_bot_response: true,
            whatsapp_contact_number: this.current_contact_number,
            bot_response: false,
            company_name: this.company_name,
            company_id: this.company_id
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          }
        )
        .then(response => {
          // console.log(response);
          if (response.data.status === "Success") {
            if (this.start_new_conv_data.start_new_conv === true) {
              this.start_new_conv_data.is_message_sending_enabled = true;
            } else {
              this.contact_list[
                this.current_contact_index
              ].is_message_sending_enabled = true;
              this.$set(
                this.contact_list,
                this.current_contact_index,
                this.contact_list[this.current_contact_index]
              );
            }
            this.$nextTick(() => {
              // this.$refs["message_sending_textbox"].focus();
            });
          } else if (response.data.status === "Failure") {
          } else if (response.data.status === "Error") {
          } else if (
            response.data.message === "Message Sending Limit Reached"
          ) {
            Swal({
              type: "warning",
              text: "Message Sending Limit Reached",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              confirmButtonText: this.tlt("email_temp_swal_upgrade_now_msg"),
              cancelButtonText: this.tlt("email_temp_swal_upgrade_later_msg"),
              cancelButtonColor: "#d33"
            }).then(result => {
              if (result.value == true) {
                this.$router.push({
                  name: "Settings",
                  params: { Subscription: true }
                });
              }
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    expand_textbox(id, key) {
      if (id != "#business_address") {
        this.callsearch();
      } else {
        setTimeout(() => {
          var textarea = document.querySelector(id);
          textarea.addEventListener("keydown", e => {
            let scroll_height = e.target.scrollHeight;
            textarea.style.height = `${scroll_height}px`;
          });
        }, 10);
      }
    },
    callsearch() {
      if (event.keyCode === 13 && !event.shiftKey) {
        this.update_profile_details();
      }
    },
    check_current_number(res) {
      return res.whatsapp_phone_number === this.current_contact_number
        ? true
        : false;
    },
    format_user_query_date(user_query_date, index) {
      // console.log(Object.keys(this.history[index-1]))
      if (this.history[index - 1].user_query_date == user_query_date) {
        return "";
      }
      return user_query_date;
    },
    get_all_contact_list() {
      this.show_spinner = true;
      axios
        .post(
          api_calls.whatsapp_chat(),
          {
            is_get_all_contacts: true,
            company_id: this.company_id,
            company_name: this.company_name
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          }
        )
        .then(response => {
          this.show_spinner = false;
          this.all_contact_list = response.data.contacts;
          this.all_contact_pagination.total_records =
            response.data.total_contacts;
        })
        .catch(e => {
          this.show_spinner = false;
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    new_contact_list() {
      let scroller = document.getElementsByClassName("all-contact-list")[0]
        .scrollTop;
      if (
        scroller > 120 &&
        !this.is_paginated_call &&
        !this.total_contact_loaded
      ) {
        this.is_paginated_call = true;
        this.scroll_spinner_chat = true;
        axios
          .post(
            api_calls.whatsapp_chat(),
            {
              is_get_all_contacts: true,
              company_id: this.company_id,
              company_name: this.company_name,
              per_page: this.all_contact_pagination.per_page,
              page_no: this.all_contact_pagination.page_no + 1
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`
              }
            }
          )
          .then(response => {
            this.scroll_spinner_chat = false;
            this.is_paginated_call = false;
            this.all_contact_list = this.all_contact_list.concat(
              response.data.contacts
            );
            this.all_contact_pagination.page_no += 1;
          })
          .catch(e => {
            this.scroll_spinner_chat = false;
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              this.$root.$emit("Session_Expired", e.response.data);
            }
          });
      }
    },
    array_move(arr, old_index, new_index) {
      if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
          arr.push(undefined);
        }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return arr; // for testing
    },
    formatUserQueryTime(user_query_time) {
      return new Date(user_query_time).toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit"
      });
      // return user_query_time
    },
    is_active_chat(index) {
      if(index === this.current_contact_index) {
        return "background: #f0f8ff"
      } else if(this.contact_list[index].is_new_notification || false){
        return "background: #47a88433"
      }
      return "background: #ffffff"
    },
    formatContactLastMessageDate(date, time) {
      if (moment(date).isSame(Date.now(), "day")) {
        return new Date(`${date} ${time}Z`).toLocaleTimeString(
          navigator.language,
          {
            hour: "2-digit",
            minute: "2-digit"
          }
        );
      }
      return date;
    },
    check_previous_message_date_same(index) {
      // console.log(index)
      return true;
      // if(index == 0) {
      //   return true;
      // }
      // return this.history[index-1].bot_response_date == this.history[index].bot_response_date ? true : false;
    },
    process_attachment_file(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files[0].size > 2097152) {
        swal({
          text: "Upload image with size less than 2MB",
          toast: true,
          position: "top-end",
          type: "error",
          showConfirmButton: false,
          timer: 10000
        });
        return;
      }
      if (
        this.file_extensions.all_allowed_file_extensions.includes(files[0].type)
      ) {
        if (!files.length) return;
        this.send_attachment_detail.media_file_name = files[0].name;
        this.send_attachment_detail.media_content_type = files[0].type;
        this.send_attachment_detail.document_content = URL.createObjectURL(
          files[0]
        );
        this.send_attachment_detail.show_preview = true;
        this.send_attachment_detail.media_type = this.file_extensions.image_file_extensions.includes(
          files[0].type
        )
          ? "image"
          : "document";
        this.send_attachment_detail.media_caption = this.message_to_send;
        this.createAttachment(files[0]);
      } else {
        swal({
          title:
            "Please Select a proper document or image having the correct filetype",
          type: "error",
          showCancelButton: false
        });
      }
    },
    createAttachment(file, type) {
      let reader = new FileReader();

      reader.onload = e => {
        this.send_attachment_detail.media_file = e.target.result.split(
          "base64,"
        )[1];
      };
      reader.readAsDataURL(file);
      reader.addEventListener("load", function() {
        document.getElementById("img-preview").style.display = "flex";
        document.getElementById("img-preview").innerHTML =
          '<img class="custom-display-image" style="max-width:100%;height:500px; padding: 1rem;margin-left: auto; margin-right: auto;" src="' +
          this.result +
          '" />';
      });
    },
    is_response_image(data) {
      if (
        data.template == null &&
        data.text == null &&
        Boolean(data.image) != null
      ) {
        return true;
      }
      return false;
    },
    is_response_document(data) {
      if (
        data.template == null &&
        data.text == null &&
        data.image == null &&
        Boolean(data.attachment) != null
      ) {
        return true;
      }
      return false;
    },
    show_image_fullscreen(img_src) {
      $("#showImageModal").modal("show");
      this.current_fullscreen_image_src = img_src;
    },
    add_new_contact_modal() {
      // console.log("add new contact-addContactModal")
      $("#addContactModal").modal("show");
    },
    save_new_contact() {
      this.add_new_contact.company_id = this.company_id;
      this.add_new_contact.company_name = this.company_name;
      this.show_spinner = true;
      axios
        .post(api_calls.whatsapp_chat(), this.add_new_contact, {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`
          }
        })
        .then(response => {
          this.show_spinner = false;
          if (response.data.message == "Whatsapp Contact Added Successfully") {
            swal({
              title: "Success",
              text: "Contact Added Successfully",
              type: "success",
              showCancelButton: false
            });
            $("#addContactModal").modal("hide");
            this.clear_add_contact();
            this.get_all_contact_list();
          } else if (
            response.data.message ==
            "Provided number already exists in contacts"
          ) {
            swal({
              title: "Oops!",
              text: "Contact Already Exists",
              type: "error",
              showCancelButton: false
            });
          } else {
            swal({
              title: "Oops!",
              text: "Some Error Occurred. Please Try Again!",
              type: "error",
              showCancelButton: false
            });
          }
        })
        .catch(e => {
          swal({
            title: "Oops!",
            text: "Some Error Occurred. Please Try Again!",
            type: "error",
            showCancelButton: false
          });
          this.show_spinner = false;
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    clear_add_contact() {
      this.add_new_contact = {
        phone_number: null,
        is_add_contact: true,
        contact_name: null,
        formattedNumber: null
      };
    },
    download_document(attachment) {
      // console.log(attachment)
      var aTag = document.createElement("a");
      aTag.setAttribute("id", "abcdefg");
      aTag.setAttribute("download", "download");
      aTag.setAttribute("href", attachment.link);
      aTag.setAttribute("target", "_blank");
      aTag.click();

      // const blob = new Blob([attachment.link], { type: 'application/pdf' })
      // const link = document.createElement('a')
      // link.href = URL.createObjectURL(blob)
      // link.download = attachment.filename
      // link.click()
      // URL.revokeObjectURL(link.href)
      // link.click();
    },
    open_send_template_to_user() {
      this.retrieve_all_templates();
      $("#sendTemplateModal").modal("show");
    },
    retrieve_all_templates() {
      this.current_template = {};
      this.spinnerOn = true;
      axios
        .post(
          api_calls.whatsapp_template(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            is_get: true,
            is_notification: this.is_notification_template,
            page_no: this.page_no,
            per_page: this.per_page
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          }
        )
        .then(response => {
          this.spinnerOn = false;
          if (response.data != null) {
            this.whatsapp_templates.templates_list = [];
            if (response.data.message === "No Whatsapp Template in database") {
              this.whatsapp_templates.templates_list = [];
              return;
            } else if (response.data.templates != null) {
              this.whatsapp_templates.templates_list = response.data.templates;
              this.whatsapp_templates.pagination_data.number_of_rows =
                response.data.page_count;
              this.whatsapp_templates.pagination_data.total_pages = Math.ceil(
                this.number_of_rows / this.per_page
              );
              // if (this.whatsapp_templates.templates_list.length > 0) {
              //   this.show_template(0);
              // }
              // this.setpagination(this.page_no);
            } else if (response.data.message === "Internal Server Error") {
              Swal({
                type: "error",
                text: "Internal Server Error",
                timer: 2500
              });
            }
          } else {
            Swal({
              text: "Some error occured",
              type: "error",
              showConfirmButton: false,
              timer: 2500
            });
          }
        })
        .catch(e => {
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    send_template_to_customer() {
      axios
        .post(
          api_calls.whatsapp_template(),
          {
            company_name: this.company_name,
            company_id: this.company_id,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            subscription: this.$session.get("UserInformation").subscription,
            is_notification: false,
            template_id: this.whatsapp_templates.selected_template,
            contacts_list: [this.current_contact_number],
            publish_template: true
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
          }
        }
      )
      .then((response) => {
        if (response.data.message == "Selected template not found in db") {
          Swal({
            title: "Insufficient credits",
            text: "You have no credits left to send template to Non-US region, You can purchase Cense Add Ons to continue sending template",
            type: "warning",
            showConfirmButton: false,
          });
        } else if (
              response.data.message == "Tier specific user limit reached"
            ) {
              Swal({
                title: this.tlt('tier_specific_user_limit_reached'),
                text: this.tlt('tier_specific_user_limit_reached_msg'),
                type: "warning",
                showConfirmButton: false,
                timer: 4000,
              });
        } else if (
          response.data.message == "No credits left for template to non us"
        ) {
          Swal({
            title: "Insufficient credits",
            text: "You have no credits left to send template to Non-US region, You can purchase Cense Add Ons to continue sending template",
            type: "warning",
            showConfirmButton: false,
          });
        } else if (response.data.message == "template is being sent") {
          Swal({
            title: "Template is being sent",
            type: "success",
            showConfirmButton: false,
            timer: 2500
          });
          // const template =  this.whatsapp_templates.templates_list.find((item) => item.template_id == this.whatsapp_templates.selected_template);
          // console.log(this.whatsapp_templates.selected_template);
          // console.log(template.variable_dict, this.current_contact_number);
          
          let current_timestamp =  new Date(),
          current_date = moment().format('YYYY-MM-DD')
          let bot_response = [
            {
              "text": null, 
              "type": "template",
              "recipient_id": this.current_contact_number,
              "template": this.whatsapp_templates.preview_template_data
            }
          ];
          if(this.start_new_conv_data.start_new_conv){
            this.current_contact_index = 0;
            this.new_conv_contact_data.chat_datetime = current_timestamp.toISOString()
            // this.new_conv_contact_data.is_message_sending_enabled = true
            this.new_conv_contact_data.last_bot_response = {
              text: this.message_to_send, 
              chat_datetime: current_timestamp.toISOString(), 
              date: current_date, 
              time: `${current_timestamp.getUTCHours()}:${current_timestamp.getUTCMinutes()}`
            }
          }
          }
          }
        )
        .then(response => {
          if (response.data.message == "Selected template not found in db") {
            Swal({
              title: "Insufficient credits",
              text:
                "You have no credits left to send template to Non-US region, You can purchase Cense Add Ons to continue sending template",
              type: "warning",
              showConfirmButton: false
            });
          } else if (
            response.data.message == "No credits left for template to non us"
          ) {
            Swal({
              title: "Insufficient credits",
              text:
                "You have no credits left to send template to Non-US region, You can purchase Cense Add Ons to continue sending template",
              type: "warning",
              showConfirmButton: false
            });
          } else if (response.data.message == "template is being sent") {
            Swal({
              title: "Template is being sent",
              type: "success",
              showConfirmButton: false,
              timer: 2500
            });
            // const template =  this.whatsapp_templates.templates_list.find((item) => item.template_id == this.whatsapp_templates.selected_template);
            // console.log(this.whatsapp_templates.selected_template);
            // console.log(template.variable_dict, this.current_contact_number);

            let current_timestamp = new Date(),
              current_date = moment().format("YYYY-MM-DD");
            let bot_response = [
              {
                text: null,
                type: "template",
                recipient_id: this.current_contact_number,
                template: this.whatsapp_templates.preview_template_data
              }
            ];
            if (this.start_new_conv_data.start_new_conv) {
              this.current_contact_index = 0;
              this.new_conv_contact_data.chat_datetime = current_timestamp.toISOString();
              // this.new_conv_contact_data.is_message_sending_enabled = true
              this.new_conv_contact_data.last_bot_response = {
                text: this.message_to_send,
                chat_datetime: current_timestamp.toISOString(),
                date: current_date,
                time: `${current_timestamp.getUTCHours()}:${current_timestamp.getUTCMinutes()}`
              };
              this.contact_list.unshift(this.new_conv_contact_data);
              this.start_new_conv_data.start_new_conv = false;
            }
            // console.log(bot_response)
            let bot_response_date = current_date;
            if (
              this.history.map(
                item => item.bot_response_date == bot_response_date
              ).length > 0
            ) {
              bot_response_date = "";
            }
            this.history.push({
              BOTResponse: bot_response,
              user_query_time: current_timestamp,
              UserQuery: "",
              bot_response_date: bot_response_date,
              bot_response_time: current_timestamp,
              user_query_date: current_date,
              Chat_Datetime: current_timestamp.toISOString()
            });
            this.scroll_down();
            this.contact_list[
              this.current_contact_index
            ].last_bot_response.text = this.message_to_send;
            this.contact_list = this.array_move(
              this.contact_list,
              this.current_contact_index,
              0
            );
            this.message_to_send = null;
            this.current_contact_index = 0;
            this.send_attachment_detail.show_preview = false;
            this.whatsapp_templates.selected_template = null;
            $("#sendTemplateModal").modal("hide");
          } else if (
            response.data.message == "No credits left to send template"
          ) {
            Swal({
              title: "Insufficient credits",
              text:
                "You have no credits left to send template to US region, You can purchase Cense Add Ons to continue sending template",
              type: "warning",
              showConfirmButton: false
            });
          } else if (response.data.message === "Internal Server Error") {
            Swal({
              type: "error",
              text: "Internal Server Error",
              timer: 2500
            });
          } else if (
            response.data.message === "Message Sending Limit Reached"
          ) {
            Swal({
              type: "warning",
              text: "Message Sending Limit Reached",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              confirmButtonText: this.tlt("email_temp_swal_upgrade_now_msg"),
              cancelButtonText: this.tlt("email_temp_swal_upgrade_later_msg"),
              cancelButtonColor: "#d33"
            }).then(result => {
              if (result.value == true) {
                this.$router.push({
                  name: "Settings",
                  params: { Subscription: true }
                });
              }
            });
          } else {
            Swal({
              text: "Some error occured",
              type: "error",
              showConfirmButton: false,
              timer: 2500
            });
          }
        })
        .catch(e => {
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    get_contact_display_name(contact) {
      if (contact.contact_name) return contact.contact_name;
      if (contact.profile_name) return contact.profile_name;
      return contact.whatsapp_phone_number;
    },
    open_import_from_csv_modal() {
      $("#addContactModal").modal("hide");
      $("#importContactCSVModal").modal("show");
    },
    file_input_contacts_csv(e) {
      if (e.target.files[0].type == "text/csv") {
        this.contact_csv.file_label = e.target.files[0].name;
        this.contact_csv.file_content = e.target.files[0];
        this.contact_csv.file_selected = true;
      } else {
        swal({
          title: "Please select a proper document having CSV filetype",
          type: "error",
          showCancelButton: false
        });
      }
    },
    file_submit_upload_contacts() {
      if ($("#inputGroupUploadFilecsv").val() == "") {
        Swal.fire({
          title: "Oops!",
          text: "Please Select a CSV file",
          type: "warning",
          showConfirmButton: false,
          timer: 2500
        });
        return;
      }
      var user_details = {
        email: this.$session.get("UserInformation").email,
        companyname: this.companyname,
        companyid: this.companyid,
        license_key: this.$session.get("UserInformation").license_key
      };
      var json = JSON.stringify(user_details);
      var blob = new Blob([json], {
        type: "application/json"
      });
      const fd = new FormData();
      fd.append(
        "file",
        this.contact_csv.file_content,
        this.contact_csv.file_label
      );
      // fd.append("json", blob);
      fd.append("companyid", this.company_id);
      fd.append("companyname", this.company_name);
      fd.append("email", this.$session.get("UserInformation").email);
      axios
        .post(api_calls.whatsapp_import_contacts(), fd, {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`
          }
        })
        .then(response => {
          if (response.data.status === "Success") {
            swal({
              title: "Success",
              text:
                "Multiple contacts are being added. You will receive a mail when the processing is finished.",
              type: "success",
              showCancelButton: false
            });
          } else if (response.data.status === "Failure") {
            swal({
              title: "Incorrect File Format!",
              text:
                "Please try again with a different csv file which matches the sample file structure",
              showCancelButton: false,
              type: "error"
            });
          } else if (response.data.status === "Error") {
            swal({
              title: "Some Error Occurred!",
              text: "Please try again.",
              showCancelButton: false,
              type: "error"
            });
          } else {
            swal({
              title: "Some Error Occurred!",
              text: "Please try again.",
              showCancelButton: false,
              type: "error"
            });
          }
        })
        .catch(e => {
          swal({
            title: "Some Error Occurred!",
            text: "Please Try Again",
            showCancelButton: false,
            type: "error"
          });
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    empty_upload_csv_contacts() {
      this.contact_csv = {
        file_label: "Choose File",
        file_content: null,
        file_selected: false
      };
      $("#inputGroupUploadFilecsv").val("");
    },
    download_sample_contact_file() {
      axios({
        method: "post",
        url: api_calls.file_download(),
        responseType: "blob",
        data: {
          sample_file: "whatsapp_contacts",
          companyid: this.$session.get("UserInformation").company_id,
          company_name: this.$session.get("UserInformation").company_name,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          email: this.$session.get("UserInformation").email
        },
        headers: {
          Authorization: `Bearer ${this.$session.get("at")}`
        }
      })
        .then(response => {
          this.spinnerOnFileDownload = false;
          if (response.data.message === "Not able to download file") {
            Swal({
              title: "Some Error Occurred. Please Try Again",
              type: "error",
              timer: 2500
            });
          } else {
            var url = window.URL.createObjectURL(new Blob([response.data]));
            var link = document.createElement("a");
            link.href = url;
            // console.log(this.companyname)
            link.setAttribute("download", "test.csv");
            document.body.appendChild(link);
            link.click();
          }
        })
        .catch(e => {
          this.spinnerOnFileDownload = false;
          Swal({
            title: "Some Error Occurred. Please Try Again",
            type: "error",
            timer: 2500
          });
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },

    textbox_height(id, key) {
      if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault();
        this.send_message_to_user();
      } else {
        var textarea = document.querySelector(id);
        textarea.addEventListener("keydown", e => {
          let scroll_height = e.target.scrollHeight;
          if (scroll_height > 60) {
            textarea.style.overflow = "auto";
          } else {
            textarea.style.overflow = "hidden";
          }
        });
      }
    },
    close_document_preview() {
      this.send_attachment_detail = {
        media_file_name: null,
        media_file: null,
        show_preview: false,
        media_content_type: null,
        media_type: null,
        send_media: true,
        document_content: null,
        media_caption: null
      };
    },
    whatsapp_message_formating(a){
      for (let i= 0 ;i<this.whatsapp_formating_list.length;i++ ){
        let cnt = 0;
        let pos1 = -1;
        while(cnt < a.length){
          pos1 = a.indexOf(this.whatsapp_formating_list[i],pos1+1)
          if(pos1 == -1){
             break
          }
          var replace_first_char = a.substring(0, pos1) + this.whatsapp_format_dict[this.whatsapp_formating_list[i]][0] +
                                a.substring(pos1 + 1)
          a =replace_first_char;
          let pos2 = a.indexOf(this.whatsapp_formating_list[i])
          let replace_second_char = a.substring(0, pos2) + this.whatsapp_format_dict[this.whatsapp_formating_list[i]][1] +
                                a.substring(pos2 + 1);
          a = replace_second_char
          pos1 = pos2;
          cnt = pos2;
        }
      }
      return a;
    },
    formatUserQuery(UserQuery){
      if(UserQuery.startsWith('/')){
        try {
          let json_start = UserQuery.indexOf('{'),
          json_end = UserQuery.indexOf('}')+1,
          json_data = JSON.parse(UserQuery.substring(json_start, json_end));
          return `Id: ${json_data.order_id}`;
        } catch (error) {
          return UserQuery
        }
      }
      return UserQuery
    },
    get_order_template_formatted_text(current_bot_response){
      return this.whatsapp_message_formating(current_bot_response.template.components.find((item) => item.type =='BODY').text);
    },
    check_button_in_order_template(current_bot_response){
      let check_buttons = current_bot_response.template.components.find((item) => item.type == 'BUTTONS');
      if(Boolean(check_buttons)){
        return true;
      }
      return false;
    },
    get_order_template_button_url(current_bot_response, key){
      return current_bot_response.template.components.find((item) => item.type =='BUTTONS').buttons.find((item) => item.type == 'URL')[key]
    }

  },
  beforeDestroy() {
    this.channel.leave();
    this.chat_socket.disconnect();
  }
};
</script>

<style scoped>
.log-wrap {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(
    to bottom,
    #47a884 0%,
    #47a884 20%,
    #dedfdd 20%,
    #dedfdd 100%
  );
}
.container {
  /* height: 95vh; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.cards {
  /* margin-left: 150px; */
  background: rgb(255, 255, 255);
  border-radius: 6px 6px 0 0;
  position: relative;
  padding: 5px 5px 0 5px;
  /* min-height: 175px; */
  max-width: 205px;
  /* box-shadow: 0px 2px 8px rgba(12, 12, 13, 0.1); */
}
.cards-img {
  width: 100%;
  max-height: 195px;
  object-fit: contain;
}
.preview-button-div {
  display: grid;
  gap: 4px;
  width: 100%;
  text-align: center;
  grid-auto-columns: minmax(50%, 100%);
}
.preview-button {
  background: rgb(255, 255, 255);
  border-top: solid 1px #d3d3d3;
  border-radius: 0 0 6px 6px;
  padding: 0.375rem 0.75rem;
  position: relative;
  /* box-shadow: 0px 2px 8px rgba(12, 12, 13, 0.1); */
  color: #0b67aa;
  cursor: pointer;
}
.back-top {
  background: linear-gradient(
    #47a884 0%,
    #47a884 130px,
    #d9dbd5 30px,
    #d9dbd5 100%
  ) !important;
  height: 14vh !important;
}

.back-main {
  background-color: #dedfdd !important;
  height: 82vh !important;
}

.back-container {
  position: relative !important;
}

.search-chat {
  /* width: 100% !important; */
  height: 50px !important;
  background: #ffff !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  position: relative;
}

.search-chat div {
  width: 95% !important;
}

.search-chat div input {
  width: 100% !important;
  outline: none !important;
  border: none !important;
  background: #f0f2f5 !important;
  height: 35px !important;
  border-radius: 10px !important;
  font-size: 13px !important;
  padding-left: 50px !important;
}

.search-chat div svg {
  position: absolute !important;
  left: 1.7rem !important;
  top: 1.2rem !important;
}
.front-container {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
}
.front-container1 {
  padding: 2rem 0 1rem 0 !important;
  margin-left: auto !important;
  margin-right: auto !important;
  max-width: 75% !important;
  position: relative !important;
}
.chat-top {
  /* height: 89vh !important; */
  /* position: relative !important; */
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  background-color: #f0f2f5 !important;
  /* min-height: 40px !important; */
}
.contacts {
  width: 100% !important;
  height: inherit;
  /* background-color: #ffffff !important;
  border-right: 1px solid rgba(0,0,0,0.2) !important; */
}
.contact-table-scroll {
  overflow-y: scroll !important;
  height: 494px !important;
  background-color: white;
}
.message-area {
  background-color: #e4e1de !important;
  height: 492px;
}
.profile-image {
  height: 81% !important;
  width: 81% !important;
  margin-left: 15px !important;
}
.no-profile-image {
  height: 13% !important;
  width: 13% !important;
  margin-left: 15px !important;
}
/* .no-profile-image-conv{
  height: 70%!important;
  width: 13% !important;
  margin-left: 15px !important;
} */

.user-profile-picture {
  height: 40px !important;
  width: 40px !important;
  padding: 0 !important;
}

.message-table-scroll {
  position: relative !important;
  overflow-y: scroll !important;
  overflow-x: auto !important;
  width: 100% !important;
  height: 100% !important;
  background-image: url(/img/web-whatsapp-bg-2.png);
  background-color: #efeae2;
}

.conversation-date {
  font-size: 0.7em !important;
  border-radius: 5px !important;
  padding: 6px !important;
  background: #ffff !important;
  color: #757bb0 !important;
}

.bot-resp {
  position: relative !important;
}

.bot-resp-msg {
  max-width: 550px !important;
  min-width: 100px !important;
  text-align: justify !important;
  background: #dcf8c6 !important;
  font-size: 0.8em !important;
  border-radius: 10px 10px 0 0 !important;
  padding: 6px 6px 0 11px !important;
}

.bot-resp-time {
  width: 100% !important;
  text-align: end !important;
  background: #dcf8c6 !important;
  font-size: 0.8em !important;
  border-radius: 0 0 10px 10px !important;
}

.bot-resp-msg2 {
  margin-bottom: 0.5rem !important;
  width: 100% !important;
  text-align: end !important;
  background: #f0f2f5 !important;
  font-size: 0.8em !important;
  border-radius: 0 0 10px 10px !important;
  padding: 0 5px 2px 0 !important;
}

.bot-resp-msg3 {
  width: 100% !important;
  text-align: end !important;
  background: #f0f2f5 !important;
  font-size: 0.8em !important;
  border-radius: 0 0 10px 10px !important;
  padding: 0 5px 2px 0 !important;
}
.bot-resp-msg-flag-card ::after {
  content: "" !important;
  position: absolute !important;
  top: 0px !important;
  right: 5px !important;
  background: #ffffff !important;
  width: 16px !important;
  height: 20px !important;
  background: linear-gradient(
    135deg,
    #ffffff 0%,
    #ffffff 50%,
    transparent 50%,
    transparent
  ) !important;
}
.bot-resp-msg-flag ::after {
  content: "" !important;
  position: absolute !important;
  top: 0px !important;
  right: 14px !important;
  background: #dcf8c6 !important;
  width: 16px !important;
  height: 20px !important;
  background: linear-gradient(
    135deg,
    #dcf8c6 0%,
    #dcf8c6 50%,
    transparent 50%,
    transparent
  ) !important;
}

.user-msg {
  max-width: 550px !important;
  min-width: 100px !important;
  text-align: justify !important;
  font-size: 0.8em !important;
  border-radius: 0 10px 0 0 !important;
  padding: 6px 6px 0 11px !important;
}

.user-msg-flag ::after {
  content: "" !important;
  position: absolute !important;
  top: 8px !important;
  left: 10px !important;
  background: #dcf8c6 !important;
  width: 15px !important;
  height: 15px !important;
  background: linear-gradient(
    225deg,
    #fff 0%,
    #fff 50%,
    transparent 50%,
    transparent
  ) !important;
}

.user-msg-time {
  width: 100% !important;
  text-align: end !important;
  background: #ffff !important;
  font-size: 0.8em !important;
  border-radius: 0 0 10px 10px !important;
}

/* .user-info-page {
  height: 89vh !important;
  position: relative !important;
  background: #f8f8f8 !important;
} */
.cense-whatsapp-image {
  position: relative !important;
  height: 100% !important;
  text-align: center !important;
}
.cense-whatsapp-image .cense-image {
  width: 150px !important;
  margin-top: 26% !important;
}
.cense-whatsapp-image .whats-app-image {
  width: 150px !important;
  margin-top: 26% !important;
  position: relative !important;
  margin-left: 3rem !important;
}
.cense-whatsapp-image h4 {
  color: #41525d !important ;
}
.profile-info {
  height: 89vh !important;
  position: relative !important;
  min-height: 40px !important;
}

.profile-top {
  height: 10% !important;
  align-items: end !important;
  background: #f0f2f5 !important;
}
.profile-bottom {
  overflow: auto !important;
  height: 90% !important;
  background: #ffffff !important;
}
.profile-details {
  padding: 24px 24px 24px 24px !important;
  height: 49vh !important;
  position: relative !important;
  min-height: 40px !important;
  background: #ffffff !important;
}

.user-info {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  background: #f0f2f5 !important;
}

.user-info div p {
  font-size: 15px !important;
}

.image-container {
  position: relative !important;
}

.message-table-scroll {
  scroll-behavior: smooth !important;
}

.carousel_cards {
  /* min-width: 75% !important;
  margin-left: 0.9em !important;
  height: auto !important;
  margin-bottom: 0.8rem !important; */
}

.carousel_card_single {
  /* height: auto !important;
  min-width: 55% !important;
  border-radius: 0.25rem !important;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  background-color: #f0f2f5 !important;
  border-radius: 1.3rem !important; */
}

.carousel_card_single img {
  /* width: 100% !important;
  height: 8.7em !important;
  background-position: center center !important;
  background-size: cover !important;
  border-top-left-radius: 1.6em !important;
  border-top-right-radius: 1.6em !important;
  display: block !important; */
}

.carousel_card_single iframe {
  width: 100% !important;
  height: 10em !important;
  background-position: center center !important;
  background-size: cover !important;
  border-top-left-radius: 1.6em !important;
  border-top-right-radius: 1.6em !important;
  display: block !important;
}

.carousel_card_single p {
  /* font-family: var(--bot-font-style) !important;
  width: 100% !important;
  font-size: 0.8805rem !important;
  font-weight: 300 !important;
  line-height: 1em !important;
  text-align: initial !important;
  color: #4a4a4a !important;
  margin-bottom: 0.3em !important; */
}

.carousel_card_single h4 {
  /* font-family: var(--bot-font-style) !important;
  color: rgba(0, 0, 0, 1) !important;
  font-weight: 700 !important;
  font-size: 0.95rem !important;
  margin-bottom: 0.3em !important; */
}

.carousel_card_single a {
  /* width: 93% !important;
  font-family: var(--bot-font-style) !important;
  margin-bottom: 0.2em !important;
  border-radius: 8px !important;
  font-size: 14px !important;
  text-align: center !important;
  color: rgba(0, 0, 0, 1) !important;
  background: #e4e6eb !important;
  border: 1px solid #e4e6eb !important;
  padding: 6px 15px !important;
  font-weight: 550 !important;
  line-height: 1.9vh !important;
  display: inline-block !important;
  border-radius: 7px !important;
  cursor: pointer !important; */
}

.carousel_card_button {
  text-align: center !important;
}

.carousel_card_single a:hover {
  /* opacity: 0.8 !important;
  background: #c8cbce !important; */
}

.carousel_card_single a:active {
  /* transform: translateY(1px) !important;
  background: #a5cff1 !important; */
}

.single-product {
  margin-left: 100px;
  background: rgb(255, 255, 255);
  border-radius: 6px 6px 0 0;
  position: relative;
  padding: 10px;
  min-height: 175px;
}

.single-product img {
  width: 100% !important;
  height: 8.7em !important;
  background-position: center center !important;
  background-size: cover !important;
  border-top-left-radius: 1.6em !important;
  border-top-right-radius: 1.6em !important;
  display: block !important;
  border-bottom: 1px solid rgb(78, 77, 77) !important;
}

::-webkit-scrollbar {
  width: 6px !important;
  height: 6px !important;
}

::-webkit-scrollbar-thumb {
  background-color: #ced0d1 !important;
}

::-webkit-scrollbar-track {
  background: #ffff !important;
}

.user-name-date {
  justify-content: space-between !important;
}

.user-name-date .user-name {
  font-weight: 400 !important;
  color: black !important;
  font-size: 15px !important;
}

.user-info .customer-name {
  font-weight: 400 !important;
  color: black !important;
  font-size: 15px !important;
}

.contact-list-empty {
  /* position: absolute !important;
  text-align: center !important;
  padding-right: 2.3rem !important;
  padding-left: 4.3rem !important;
  padding-top: 4em !important;
  font-size: 0.9em !important; */
  color: #8696a0 !important;
}

.about-phone {
  margin-bottom: 30px !important;
}
.abt-phone-title {
  color: #008069 !important;
  font-weight: 400 !important;
  font-size: 14px !important;
}
.add-another-website {
  color: #008069 !important;
  font-weight: 400 !important;
  font-size: 12px !important;
  margin-left: 30px !important;
  cursor: pointer !important;
}
.whts-status {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
}
.edit-status {
  display: flex !important;
  align-content: center !important;
  position: relative !important;
}

.edit-status textarea {
  outline: 0 !important;
  border-width: 0 0 2px !important;
  border-color: #47a884 !important;
  padding: 5px !important;
  resize: none !important;
  width: 88% !important;
  height: 40px;
}

.whtsapp-no {
  display: flex !important;
  align-items: center !important;
  padding-bottom: 20px !important;
}
.user-email-details {
  padding: 5px !important;
  min-height: 3.1rem !important;
}
.user-email-details .user-email {
  display: flex !important;
  align-items: center !important;
}
.user-email-details .user-email span {
  margin-left: 1rem !important;
  width: 90% !important;
  margin-right: 1rem !important;
}
.user-email-details .edit-user-email {
  display: flex !important;
  align-items: center !important;
  position: relative !important;
}
.user-email-details .edit-user-email textarea {
  outline: 0 !important;
  border-width: 0 0 2px !important;
  border-color: #47a884 !important;
  padding: 5px !important;
  resize: none !important;
  width: 88% !important;
  height: 35px;
  overflow: hidden !important;
}
.user-address-details {
  padding: 5px !important;
  min-height: 3.1rem !important;
}
.user-address-details .user-address {
  display: flex !important;
  align-items: center !important;
}
.user-address-details .user-address span {
  margin-left: 1rem !important;
  width: 90% !important;
  margin-right: 1rem !important;
}
.user-address-details .edit-user-address {
  display: flex !important;
  align-items: center !important;
  position: relative !important;
}
.user-address-details .edit-user-address textarea {
  outline: 0 !important;
  border-width: 0 0 2px !important;
  border-color: #47a884 !important;
  padding: 5px !important;
  resize: none !important;
  width: 88% !important;
  height: 35px;
  overflow: hidden !important;
}
.description-details {
  padding: 5px !important;
  min-height: 3.1rem !important;
}
.description-details .description {
  display: flex !important;
  align-items: center !important;
}
.description-details .description span {
  margin-left: 1rem !important;
  width: 90% !important;
  margin-right: 1rem !important;
}
.description-details .edit-description {
  display: flex !important;
  align-items: center !important;
  position: relative !important;
}
.description-details .edit-description textarea {
  outline: 0 !important;
  border-width: 0 0 2px !important;
  border-color: #47a884 !important;
  padding: 5px !important;
  resize: none !important;
  width: 88% !important;
  height: 35px;
  overflow: hidden !important;
}
.website-details {
  padding: 5px !important;
  min-height: 3.1rem !important;
}
.website-details .website {
  display: flex !important;
  align-items: center !important;
}
.website-details .website span {
  margin-left: 1rem !important;
  width: 90% !important;
}
.website-details .edit-website {
  display: flex !important;
  align-items: center !important;
  position: relative !important;
}
.website-details .edit-website textarea {
  outline: 0 !important;
  border-width: 0 0 2px !important;
  border-color: #47a884 !important;
  padding: 5px !important;
  resize: none !important;
  width: 88% !important;
  height: 35px;
  overflow: hidden !important;
}
.webiste-vertical-details {
  padding: 5px !important;
  min-height: 3.1rem !important;
}
.webiste-vertical-details .webiste-vertical {
  display: flex !important;
  align-items: center !important;
  position: relative !important;
}
</style>
<style scoped>
.lds-ring {
  display: inline-block;
  position: absolute;
  width: 80px;
  height: 80px;
  left: 27vw;
}

.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 24px;
  height: 24px;
  margin: 8px;
  border: 3px solid rgb(105, 100, 100);
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: rgb(110, 109, 109) transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
.profile-pic {
  width: 100% !important;
  height: 150px !important;
  background: #eaf2f5 !important;
  position: relative !important;
}
.profile-pic .second-circle {
  position: absolute !important;
  width: 130px !important;
  height: 110px !important;
  background: #76848c !important;
  top: 150px !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  margin: auto !important;
  border-radius: 50% !important;
  z-index: 1000 !important;
  cursor: pointer;
  border: 5px solid #ffff;
}
.profile-pic .second-circle input {
  position: absolute !important;
  width: 128px !important;
  opacity: 0.01 !important;
  height: 110px !important;
  top: 0 !important;
  left: 3px !important;
  right: 0 !important;
  bottom: 0 !important;
  margin: auto !important;
  border-radius: 50% !important;
  z-index: 2000 !important;
  cursor: pointer;
}
.profile-pic .second-circle .img-circle-gry {
  width: 100% !important;
  height: 100% !important;
}
.profile-pic .second-circle .img-circle-gry .img-circle-title-cam {
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
  padding-top: 40px !important;
}
.profile-pic .second-circle .img-circle-gry .img-circle-title-cam span {
  font-size: 12px !important;
  color: #ffff !important;
}
.profile-pic .second-circle-image img {
  position: absolute !important;
  width: 128px !important;
  height: 120px !important;
  top: 150px !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  margin: auto !important;
  border-radius: 50% !important;
  z-index: 1000 !important;
  cursor: pointer;
  border: 5px solid #ffff;
}
.profile-pic .second-circle-image input {
  position: absolute !important;
  width: 128px !important;
  opacity: 0.01 !important;
  height: 110px !important;
  top: 150px !important;
  left: 3px !important;
  right: 0 !important;
  bottom: 0 !important;
  margin: auto !important;
  border-radius: 50% !important;
  z-index: 2000 !important;
  cursor: pointer;
}
.img-cricle {
  width: 100%;
  height: 49px;
  background: #ffff;
}
.img-cricle .no-image {
  width: 100%;
  height: 7vh;
  background: #ffff;
  text-align: center;
  position: relative;
}
.remove-profile-pic {
  padding-top: 28px;
  text-align: center;
  margin-left: 120px;
}
.remove-profile-pic:hover .remove-profile-pic-hover {
  visibility: visible;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

#send_message_whatsapp {
  width: 100%;
}

#enable-message-sending {
  position: absolute !important;
  right: 1vw !important;
  top: 31% !important;
  font-size: 14px !important;
}
.search-contact {
  width: 100% !important;
  height: 50px !important;
  background: #ffff !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  position: relative;
}
.search-contact div {
  width: 95% !important;
}
.search-contact div input {
  width: 100% !important;
  outline: none !important;
  border: none !important;
  background: #f0f2f5 !important;
  height: 35px !important;
  border-radius: 10px !important;
  font-size: 13px !important;
  padding-left: 50px !important;
}
.search-contact div svg {
  position: absolute !important;
  left: 1.7rem !important;
  top: 1.2rem !important;
}
.contacts-list {
  background-color: #ffffff !important;
}
.all-contact-list {
  overflow-y: scroll !important;
  height: 495px !important;
}
.all-contact-list ul {
  margin: 5px !important;
}
.all-contact-list li {
  margin-bottom: 10px !important;
  border-bottom: 1px solid #dee2e6 !important;
  padding-bottom: 8px !important;
  padding-left: 5px;
}
.all-contact-list li .user-name {
  font-weight: 400 !important;
  color: black !important;
  font-size: 15px !important;
  padding-bottom: 5px !important;
  padding-top: 4px !important;
  padding-left: 9px !important;
}
/* input#send_attachment{
  display: inline-block;
  width: 100%;
  padding: 120px 0 0 0;
  height: 10px;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background: url('https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png') center center no-repeat #e4e4e4;
  border-radius: 20px;
  background-size: 60px 60px;
} */
</style>

<style lang="scss" scoped>
.send-message-to-user {
  position: relative !important;
  height: 8.8% !important;
  outline: 0 !important;
  resize: none !important;
  overflow: hidden !important;
  padding: 5px !important;
}

// #img-preview {
//   display: none;
//   width: 155px;
//   border: 2px dashed #333;
//   margin-bottom: 20px;
// }
// #img-preview img {
//   width: 100%;
//   height: auto;
//   display: block;
// }
.image-preview-container {
  background-color: white;
}
.image-preview-container .close {
  position: absolute;
  top: 3rem;
  right: 0rem;
}
// .custom-display-image {
//   max-width: 100%;
//   max-height: 100%;
//   padding: 0.8rem;
// }
.image-custom {
  max-width: 100%;
}
#showImageModal > .modal-dialog {
  max-width: 75vw;
}
#showImageModal .close {
  right: -2.5%;
  top: 0%;
}
.form-check label {
  display: inline-block;
  width: auto;
}
.contact-verified-status {
  text-transform: capitalize;
  // border: 0.5px solid;
  padding: 0.2rem;
  // width: 20%;
  text-align: center;
  font-size: larger;
}
.contact-verified-status.pending {
  color: #ffc347;
}
.contact-verified-status.valid {
  color: #25af02;
}
.contacts-legend-preview {
  text-align: left;
  padding-top: 6rem;
  padding-left: 2rem;
}
.form-control-textarea {
  box-shadow: none;
  border: solid 1px #dbe2e8;
  font-size: 16px;
  line-height: 20px;
  padding: 8px 25px 8px 13px;
  height: auto;
  color: #9499ae;
  font-weight: 400;
  margin: 0;
  background-position: 15px 15px !important;
  outline: 0 !important;
  resize: none !important;
  overflow: hidden;
  width: 100% !important;
  border-radius: 10px;
}
.modal-image-preview {
  max-height: 90vh;
  width: 100%;
  object-fit: contain;
}
#msg_send_btn {
  transform: rotate(20deg);
  cursor: pointer;
}
.remove-border {
  border: none;
  background-color: #f0f2f5;
}
.remove-border:focus {
  outline: 0;

  border: none;
  box-shadow: none;
}
</style>
