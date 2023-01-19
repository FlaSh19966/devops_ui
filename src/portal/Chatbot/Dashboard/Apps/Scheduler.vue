<template>
  <div class="dash-cont">
    <div
      class="spinner"
      id="spinner"
      v-show="show_spinner"
    ></div>
    <div class="container-fluid scheduler-page">
      <div class="card dash-card">
        <div class="card-header d-block d-sm-flex flex-wrap justify-content-between">
          <p class="mb-sm-0">Appointments</p>
          <div class="card-act d-flex flex-wrap">
            <div class="custom-scheduler-select">
              <select v-model="current_calendar_view">
                <option value="">Select View</option>
                <option
                  value="day"
                  id="option_daily"
                >Daily</option>
                <option
                  value="week"
                  id="option_week"
                >Weekly</option>
                <option
                  value="month"
                  id="option_month"
                >Month</option>
              </select>
            </div>
            <div>
              <a
                href="#"
                class="darkblue-btn text-uppercase"
                data-toggle="modal"
                id="change_status_btn"
                @click="new_schedule"
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
                New Schedule
              </a>

            </div>
            <div
              class="form-group"
              style="cursor:pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 20 20"
                data-toggle="modal"
                data-target="#scheduling_modal"
                @click="open_scheduling_modal"
              >
                <path
                  fill="none"
                  d="M0 0h20v20H0V0z"
                />
                <path d="M15.95 10.78c.03-.25.05-.51.05-.78s-.02-.53-.06-.78l1.69-1.32c.15-.12.19-.34.1-.51l-1.6-2.77c-.1-.18-.31-.24-.49-.18l-1.99.8c-.42-.32-.86-.58-1.35-.78L12 2.34c-.03-.2-.2-.34-.4-.34H8.4c-.2 0-.36.14-.39.34l-.3 2.12c-.49.2-.94.47-1.35.78l-1.99-.8c-.18-.07-.39 0-.49.18l-1.6 2.77c-.1.18-.06.39.1.51l1.69 1.32c-.04.25-.07.52-.07.78s.02.53.06.78L2.37 12.1c-.15.12-.19.34-.1.51l1.6 2.77c.1.18.31.24.49.18l1.99-.8c.42.32.86.58 1.35.78l.3 2.12c.04.2.2.34.4.34h3.2c.2 0 .37-.14.39-.34l.3-2.12c.49-.2.94-.47 1.35-.78l1.99.8c.18.07.39 0 .49-.18l1.6-2.77c.1-.18.06-.39-.1-.51l-1.67-1.32zM10 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" />
              </svg>
            </div>
          </div>
        </div>
        <div
          class="card-body"
          id="page"
        >
          <div class="d-flex justify-content-between">
            <div
              class="prev-button"
              style="cursor:pointer;color: #283877;font: 14px/19px 'Segoe UI Semibold';"
              @click="switch_calendar('prev')"
            ><img src="/img/Path 190.svg">&nbsp;Previous</div>
            <div
              class="text-uppercase"
              id="renderRange"
              style="color: #283877;font: 16px/21px 'Segoe UI Semibold';"
            ></div>
            <div
              class="next-button"
              @click="switch_calendar('next')"
              style="cursor:pointer;color: #283877;font: 14px/19px 'Segoe UI Semibold';"
            >Next&nbsp;<img src="/img/Path 230.svg"></div>
          </div>
          <div
            id="menu"
            style="margin-bottom:15px"
          >
            <div
              class="d-inline-flex w-100 justify-content-between"
              v-if="current_calendar_view=='day'"
              style="overflow-x:auto"
            >
              <div
                v-for="(day, index) in daysInMonth"
                :key="index"
                class="text-center day-list-box"
              >
                <div class="day-box">{{day.day}}</div>
                <div
                  class="date-box active"
                  v-if="day.is_active"
                >
                  {{day.date}}
                </div>
                <div
                  class="date-box"
                  v-else
                  @click="switch_calendar('custom', day.date)"
                >
                  {{day.date}}
                </div>
              </div>
            </div>
          </div>
          <div id="calendar"></div>
        </div>
      </div>
    </div>
    <div
      class="modal fade dash-modal"
      id="scheduling_modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered justify-content-center"
        role="document"
      >
        <div class="modal-content scheduler-settings-modal">
          <div class="modal-head d-flex align-items-center mb-0">
            <p class="scheduler-modal-title">Scheduler Settings &nbsp;
              &nbsp;
            </p>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <img
                src="/img/Scheduler_Close.svg"
                alt
              />
            </button>
          </div>
          <div
            class="modal-body"
            style="width: inherit;"
          >
            <form @submit.prevent="send_scheduling">
              <!-- <br /> -->
              <div class="row">
                <div class="col">
                  <h5 class="time-slots-title">Phone Number</h5>
                  <div class="form-group create-schedule-settings">
                    <input
                      class="form-control mr-0 ml-0"
                      placeholder="Phone Number"
                      v-model="scheduling_contact_number"
                    />
                  </div>
                  <div
                    class="is-invalid"
                    style="color:red"
                    v-if="validPhoneNumber!=true && scheduling_contact_number!=''"
                  >
                    {{ validPhoneNumber }}
                  </div>
                </div>
                <div
                  class="col"
                  style="padding-right:23px;"
                >
                  <h5 class="time-slots-title">Time Slots</h5>
                  <div class="time-slots-block d-flex justify-space-between">
                    <div
                      class="time-slot"
                      :class="{'active': selected_time_slot===30}"
                      @click="selected_time_slot=30"
                    >30 minutes</div>
                    <div
                      class="time-slot"
                      :class="{'active': selected_time_slot===60}"
                      @click="selected_time_slot=60"
                    >1 hour</div>
                    <div
                      class="time-slot"
                      :class="{'active': selected_time_slot===120}"
                      @click="selected_time_slot=120"
                    >2 hours</div>
                    <div
                      class="time-slot"
                      :class="{'active': selected_time_slot===180}"
                      @click="selected_time_slot=180"
                    >3 hours</div>
                  </div>
                </div>
              </div>
              <div
                class="container"
                style="margin-top:20px"
              >
                <div class="row justify-content-center working-hrs-row">
                  <h4 class="w-100 working-hrs-title">
                    Working Hours
                  </h4>
                  <div
                    class="workday-box"
                    v-for="(days,index) in week_days"
                    :key="index"
                  >
                    <span class="workday-box-title">{{days}}</span>
                    <div
                      class="d-flex"
                      style="justify-content: space-evenly"
                    >
                      <div>
                        From
                        <div
                          class="form-group create-schedule-settings d-flex select-id-from"
                          style="width:120px;height:36px"
                        >
                          <select
                            class="form-control"
                            :id="'from_'+days"
                          >
                            <option
                              v-for="(time, index) in timeSlotsList"
                              :key="index"
                              :value="time.value"
                            >{{time.display}}</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        To
                        <div
                          class="form-group create-schedule-settings d-flex select-id-to"
                          style="width:120px;height:36px"
                        >
                          <select
                            class="form-control"
                            :id="'to_'+days"
                          >
                            <option
                              v-for="(time, index) in timeSlotsList"
                              :key="index"
                              :value="time.value"
                            >{{time.display}}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="custom-settings-box"
                  style="height: 125px;margin-top:37px;width:103%;margin-left:-15px"
                >
                  <span class="workday-box-title" style="top: -10px;">Voice Greetings</span>
                  <textarea
                    v-model="sch_voice_greetings"
                    type="text"
                    class="form-control"
                    resize:none
                  ></textarea>
                </div>
                <div
                  class="custom-settings-box"
                  style="height: 125px;margin-top:37px;width:103%;margin-left:-15px"
                >
                  <span class="workday-box-title" style="top: -10px;">Scheduling SMS</span>
                  <div class="form-group">
                    <textarea
                      v-model="sch_sms_greetings"
                      type="text"
                      class="form-control"
                      resize:none
                    ></textarea>
                  </div>
                </div>
                <div
                  class="row"
                  style="margin-top: 37px;justify-content:space-evenly"
                >

                  <div class="custom-settings-box ml-0 my-auto">
                    <span class="workday-box-title" style="top: -10px;">Holiday List</span>
                    <div class="custom-file">
                      <input
                        type="file"
                        accept=".csv"
                        @change="fileinput"
                        class="custom-file-input"
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                      />
                      <label
                        class="custom-file-label form-control"
                        for="inputGroupFile01"
                      >{{file_label}}</label>
                    </div>
                    <div class="custom-file">
                      <a
                        href="#"
                        @click="sample_holiday"
                        style="color: #5090FF !important;margin-left:20px;font:10px 'Segoe UI'"
                      >
                        Download Sample File
                        <i
                          class="fa fa-spinner fa-spin"
                          v-show="spinnerOn"
                        ></i>
                      </a>
                    </div>
                  </div>

                  <div class="custom-settings-box mr-0 my-auto">
                    <span class="workday-box-title" style="top: -10px;">Call Reminder in</span>
                    <div
                      class="form-group pl-0 d-flex"
                      style="justify-content: space-around"
                    >
                      <div class="form-group create-schedule-settings d-flex">
                        <input
                          type="number"
                          class="form-control"
                          max="24"
                          min="0"
                          placeholder="Hours"
                          v-model="call_reminder_hrs"
                          style="width:70px"
                        />
                      </div>
                      <div class="form-group create-schedule-settings d-flex">
                        <input
                          type="number"
                          max="60"
                          min="0"
                          placeholder="Minutes"
                          class="form-control"
                          v-model="call_reminder_mins"
                          style="width:70px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="btn-wrap text-right d-flex"
                style="border-top:none"
              >
                <button
                  type="submit"
                  class="darkblue-btn text-uppercase mx-auto"
                >Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade dash-modal"
      id="schedule_details"
      tabindex="-1"
      role="dialog"
      aria-labelledby="title"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered justify-content-center"
        role="document"
      >
        <div class="modal-content scheduler-modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center justify-content-center">
              <div class="title-box">
                <p class="title-txt">{{createModalTitle}}</p>
              </div>
            </div>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <img
                src="/img/Scheduler_Close.svg"
                alt
              />
            </button>
            <div>
              <p class="appointment-title">{{patient_name}}</p>
            </div>
            <form @submit="create_appointment">
              <div class="container">
                <div class="row scheduler-row">
                  <div class="col scheduler-col">
                    <div class="card">
                      <h5 class="card-title">Phone No.</h5>
                      <h6 class="card-subtitle mb-2 text-muted">{{visitor_number}}</h6>
                    </div>
                  </div>
                  <div class="col scheduler-col">
                    <div class="card">
                      <h5 class="card-title">Reason For Visit</h5>
                      <h6 class="card-subtitle mb-2 text-muted">{{visit_reason}}</h6>
                    </div>
                  </div>
                </div>
                <div class="row scheduler-row">
                  <div class="col scheduler-col">
                    <div class="card">
                      <h5 class="card-title">Symptoms</h5>
                      <h6 class="card-subtitle mb-2 text-muted">{{visitor_symptoms}}</h6>
                    </div>
                  </div>
                  <div class="col scheduler-col">
                    <div class="card">
                      <h5 class="card-title">Appointment Date</h5>
                      <h6 class="card-subtitle mb-2 text-muted">{{temp_appointment_date}}</h6>
                    </div>
                  </div>
                </div>
                <div class="row scheduler-row">
                  <div class="col scheduler-col">
                    <div class="card">
                      <h5 class="card-title">Appointment Time</h5>
                      <h6 class="card-subtitle mb-2 text-muted">{{display_selected_time}}</h6>
                    </div>
                  </div>
                  <div class="col scheduler-col">
                    <div class="card">
                      <h5 class="card-title">Appointment Status</h5>
                      <h6 class="card-subtitle mb-2 text-muted">{{convert_casing(appointmentStatus)}}</h6>
                    </div>
                  </div>
                </div>
                <div class="row scheduler-row">
                  <div class="col scheduler-col">
                    <div
                      class="card"
                      style="flex-direction: inherit"
                    >
                      <div class="radio text-center">
                        <label style="vertical-align: text-top;">
                          <input
                            type="radio"
                            value="visited"
                            v-model="visitStatus"
                            @change="changeSingleVisitStatus"
                          />
                          <span
                            class="icn"
                            id="radio"
                          ></span>
                        </label>
                      </div>
                      <div>
                        <h5 class="card-title">Visited</h5>
                      </div>
                    </div>
                  </div>
                  <div class="col scheduler-col">
                    <div
                      class="card"
                      style="flex-direction: inherit"
                    >
                      <div class="radio text-center">
                        <label style="vertical-align: text-top;">
                          <input
                            type="radio"
                            value="not-visited"
                            @change="changeSingleVisitStatus"
                            v-model="visitStatus"
                          />
                          <span
                            class="icn"
                            id="radio"
                          ></span>
                        </label>
                      </div>
                      <div style="cursor:pointer;">
                        <h5 class="card-title">Not Visited</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="form-group" v-if="appointmentStatus=='confirmed'">
                <label>Appointment Status</label>
                <input
                  type="text"
                  value="Confirmed"
                  class="form-control"
                  disabled
                />
              </div> -->
              <div
                class="btn-wrap text-right d-flex"
                style="border-top:none;justify-content:space-around"
              >
                <button
                  class="reminder-btn"
                  type="click"
                  @click="send_reminder(AppointmentID)"
                  v-if="appointmentStatus == 'confirmed' || visitStatus == 'visited'"
                >Send Reminder</button>
              </div>
              <div
                class="btn-wrap text-right d-flex"
                style="border-top:none"
              >
                <!-- <a
                  href="#"
                  v-show="isReschedule"
                  @click="cancel_reschedule"
                  class="darkblue-btn"
                >Cancel
                </a> -->
                <button
                  v-if="isEdit"
                  type="submit"
                  class="darkblue-btn"
                >Update</button>
                <!-- <p v-if="appointmentStatus=='confirmed'" style="float:left"> This Appointment Has Been Confirmed </p> -->
                <button
                  class="green-btn text-uppercase ml-auto mr-auto"
                  @click="confirmAppointment"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  v-show="!isReschedule"
                  @click="isReschedule = !isReschedule"
                  class="darkblue-btn text-uppercase ml-auto mr-auto"
                >Reschedule</button>
                <button
                  type="button"
                  v-show="isReschedule"
                  @click="get_time_slots(temp_data, '#schedule_create', selected_time, 'is_rescheduling')"
                  class="darkblue-btn text-uppercase ml-auto mr-auto"
                >Reschedule</button>
                <button
                  type="button"
                  v-if="isReschedule"
                  @click="delete_appointment"
                  class="delete-btn btn text-uppercase ml-auto mr-auto"
                >Delete
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade dash-modal"
      id="schedule_create"
      tabindex="-1"
      role="dialog"
      aria-labelledby="title"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div
        class="modal-dialog modal-dialog-centered justify-content-center"
        role="document"
      >
        <div class="modal-content scheduler-create-modal">
          <div class="modal-head d-flex align-items-center">
            <p
              class="scheduler-modal-title"
              v-if="!edit_scheduling"
            > &nbsp; Create Schedule </p>
            <p
              class="scheduler-modal-title"
              v-if="edit_scheduling"
            > &nbsp; Reschedule </p>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <img
                src="/img/Scheduler_Close.svg"
                alt
              />
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group create-schedule-input d-flex">
              <input
                type="text"
                v-model="patient_name"
                class="form-control required"
                placeholder="Patient Name"
                required
                :disabled="edit_scheduling"
              />
              <div
                class="required-box "
                :class="{'disabled':edit_scheduling}"
              >
                <span class="required-text">*</span>
              </div>
            </div>
            <div class="form-group create-schedule-input d-flex">
              <input
                v-model="visitor_number"
                class="form-control"
                placeholder="Phone Number"
                required
                :disabled="edit_scheduling"
              />
              <div
                class="required-box "
                :class="{'disabled':edit_scheduling}"
              >
                <span class="required-text">*</span>
              </div>
            </div>
            <div class="form-group create-schedule-input d-flex">
              <input
                type="text"
                v-model="visit_reason"
                class="form-control"
                placeholder="Reason For Visit"
                :disabled="edit_scheduling"
              />
              <div
                class="required-box "
                :class="{'disabled':edit_scheduling}"
              >
              </div>
            </div>
            <div class="form-group create-schedule-input d-flex">
              <input
                type="text"
                v-model="visitor_symptoms"
                class="form-control"
                placeholder="Symptoms"
                :disabled="edit_scheduling"
              />
              <div
                class="required-box "
                :class="{'disabled':edit_scheduling}"
              >
              </div>
            </div>
            <div class="form-group create-schedule-input d-flex">
              <input
                type="text"
                class="form-control"
                id="datepicker-input"
                aria-label="Date-Time"
                autocomplete="off"
                required
              />
              <div
                id="datepicker"
                style="margin-top: -1px;"
              ></div>
            </div>
            <div class="form-group create-schedule-input d-flex">
              <select
                v-model="selected_time"
                class="form-control"
                required
              >
                <option v-if="time_slots.length > 0" value>Select Time Slot</option>
                <option v-else value> No Time Slot Availabe</option>
                <option
                  :value="time.value"
                  v-for="(time, index) in time_slots"
                  :key="index"
                >{{time.text}}</option>
              </select>
              <div class="required-box">
                <span class="required-text">*</span>
              </div>
            </div>
            <span style="color:red">*</span>
            <span>- Required</span>
            <div class="btn-wrap d-flex justify-content-between">
              <button
                @click="create_appointment"
                class="darkblue-btn ml-auto mr-auto text-uppercase"
                v-show="!edit_scheduling"
              >Save</button>
              <button
                type="button"
                @click="confirmReschedule"
                class="darkblue-btn ml-auto mr-auto text-uppercase"
                v-show="edit_scheduling"
              >Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade dash-modal"
      id="patientdatamodel"
      tabindex="-1"
      role="dialog"
      aria-labelledby="patientdatamodeltitle"
      aria-hidden="true"
      data-keyboard="false"
      data-backdrop="static"
    >
      <div class="modal-dialog modal-dialog-centered justify-content-center">
        <div class="modal-content scheduler-modal-content">

          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <p class="scheduler-modal-title"> &nbsp; Change Status for Visit on {{ daily_date }} </p>
            </div>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <img
                src="/img/Scheduler_Close.svg"
                alt
              />
            </button>
            <div class="title-box">
              <p class="title-txt">{{patient_name.slice(0, 1)}}</p>
            </div>
            <form @submit="changeVisitStatus">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        style="text-align: left;"
                      > Name </th>
                      <th
                        scope="col"
                        style="text-align: center;"
                      > Time Slot </th>
                      <th
                        scope="col"
                        style="text-align: center;"
                      >Visited</th>
                      <th
                        scope="col"
                        style="text-align: center;"
                      >Not Visited</th>
                      <th
                        scope="col"
                        style="text-align: center;"
                      >Appointment Status</th>
                      <th
                        scope="col"
                        style="text-align: center;"
                      >Send Reminder</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(person,index) in visit_status_data"
                      :key="index"
                    >
                      <td
                        style="text-align: left;"
                        :v-model="person.VisitorName"
                      > {{ person.VisitorName }} </td>
                      <td
                        style="text-align:center"
                        :v-model="person.VisitSlot"
                      > {{ person.VisitSlot }} </td>
                      <td>
                        <div class="radio text-center">
                          <label style="vertical-align: text-top;">
                            <input
                              type="radio"
                              v-model="person.VisitStatus"
                              :name="person.name"
                              value="visited"
                            />
                            <span
                              class="icn"
                              id="radio"
                            ></span>
                          </label>
                        </div>
                      </td>
                      <td>
                        <div class="radio text-center">
                          <label style="vertical-align: text-top;">
                            <input
                              type="radio"
                              v-model="person.VisitStatus"
                              value="not-visited"
                              :name="person.name"
                            />
                            <span
                              class="icn"
                              id="radio"
                            ></span>
                          </label>
                        </div>
                      </td>
                      <td style="text-align:center"> {{ convert_casing(person.AppointmentStatus) }} </td>
                      <td style="text-align:center">
                        <button
                          class="darkblue-btn"
                          @click="send_reminder(person.AppointmentID)"
                          :disabled="person.AppointmentStatus == 'confirmed' || person.VisitStatus == 'visited' "
                        >
                          Send
                        </button>
                      </td>
                    </tr>
                    <!-- <tr>
                      <td colspan="5" style="text-align:center;" > No Record Found </td>
                    </tr> -->
                  </tbody>
                </table>
              </div>
              <div class="btn-wrap text-right">
                <button
                  type="submit"
                  class="darkblue-btn"
                >Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api_calls from "@/portal/api_calls";
import axios from "axios";
import moment from "moment";
import swal from "sweetalert2";
// import TimePicker from "ant-design-vue/lib/time-picker";
import Calendar from "../../../../../public/js/tui-calendar.min.js";
import DatePicker from "tui-date-picker";
import "tui-date-picker/dist/tui-date-picker.css";
import "../../../../../public/css/segoe-ui.css"
import "../../../../../public/css/tui-calendar.min.css";
export default {
  name: "Scheduler",
  data () {
    return {
      calendarInstance: null,
      current_calendar_view: 'day',
      show_spinner: false,
      selected_time: "",
      display_selected_time: "",
      scheduled_time: "",
      selected_date: "",
      patient_name: "",
      visitor_number: "",
      visit_reason: "",
      visitor_symptoms: "",
      schedule_list: [],
      selected_schedule_id: "",
      selected_schedule_visit_slot: "",
      isEdit: false,
      spinnerOn: false,
      phone_number_validity: /\+[0-9]{9,14}$/,
      full_time_slots: [],
      time_slots: [],
      selected_time_slot: "",
      user_role: this.$session.get("UserInformation").role,
      scheduling_contact_number: "",
      file_label: "Choose File",
      week_days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      daysInMonth: [],
      activeMonthYear: '',
      csv_file: "",
      sch_voice_greetings: "",
      sch_sms_greetings: "",
      show_check_and_change_status: true,
      user_type: null,
      visit_status_data: null,
      visit_status_comparison_data: [],
      daily_date: "",
      isReschedule: true,
      datepickerInstance: null,
      new_selected_date: "",
      call_reminder_hrs: Number,
      call_reminder_mins: Number,
      edit_scheduling: false,
      temp_data: "",
      isAppointmentConfirmed: false,
      appointmentStatus: "",
      visitStatus: "",
      AppointmentID: '',
      isRescheduletime: false,
      temp_name: "",
      temp_reason: "",
      temp_symptoms: "",
      temp_appointment_date: "",
      temp_appointment_time: "",
      temp_time_slots: [],
      companyid: "",
      companyname: "",
      support_numbers_list: [],
      filled_time_slots_selected_date:[]
    };
  },
  components: {
    // TimePicker
  },
  computed: {
    validPhoneNumber () {
      if (this.phone_number_validity.test(this.scheduling_contact_number.replace(/\s+/g, ''))) {
        return true;
      } else {
        return "Please enter a valid phone number in the format: +CountryCode Number";
      }
    },
    createModalTitle () {
      return this.patient_name.split(' ').slice(0, 1).map(word => word.charAt(0)).join('').toUpperCase()
    },
    timeSlotsList () {
      let list = [];
      for (let i = 0; i <= 23; i += 1) {
        list.push({
          display: moment(i, ['h']).format('h:mm A'),
          value: moment(i, ['h']).format('H:mm')
        })
      }
      return list;
    }
  },
  watch: {
    current_calendar_view (newVal) {
      this.toggle_view(newVal)
    }
  },
  created () {
    if (
      !this.$session.has("CompanyId") &&
      this.$session.get("UserInformation").role == "SuperAdmin"
    ) {
      toastr.warning("Please select a company name from the dropdown");
      axios
        .post(api_calls.load_support_url(), {
          companyname: this.companyname,
          companyid: this.companyid,
          show_superadmin: "True",
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          isShow: "True"
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          }
        })
        .then(response => {
          this.support_numbers_list = response.data[0].map(number => number["ContactNumber"]);
        });
    } else if (this.$session.get("UserInformation").role == "SuperAdmin") {
      this.companyid = this.$session.get("CompanyId");
      this.companyname = this.$session.get("CompanyName");
    } else {
      this.companyid = this.$session.get("UserInformation").company_id;
      this.companyname = this.$session.get("UserInformation").company_name;
    }
    if (
      this.$session.has("CompanyId") ||
      this.$session.get("UserInformation").role != "SuperAdmin"
    ) {
      axios
        .post(api_calls.load_support_url(), {
          companyid: this.companyid,
          companyname: this.companyname,
          email: this.$session.get("UserInformation").email,
          token: this.$session.get("UserInformation").tokens,
          license_key: this.$session.get("UserInformation").license_key,
          isShow: "True"
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          }
        })
        .then(response => {
          this.support_numbers_list = response.data[0].map(number => number["ContactNumber"]);
        });
    }
  },
  mounted () {
    this.show_spinner = true;
    var vm = this;
    this.calendarInstance = new Calendar("#calendar", {
      defaultView: "day",
      taskView: false,
      scheduleView: ["time"],
      theme: {
        'month.dayname.textAlign': 'center',
        'month.dayname.textTransform': 'uppercase',
        'week.dayname.borderLeft': '1px solid #DFDFDF',
        'month.schedule.borderRadius': '2px',
        'month.schedule.marginTop': '2px',
        'month.schedule.marginLeft': '8px',
        'month.schedule.marginRight': '8px',
        'week.daygrid.backgroundColor': 'none',
        'week.dayname.textAlign': 'center',
        'week.dayname.textTransform': 'uppercase',
        'week.timegridHorizontalLine.borderBottom': '1px dashed #F1F1F1',
        'week.timegrid.borderRight': '1px solid #DFDFDF',
      },
      template: {
        monthGridHeader: function (dayModel) {
          var date = moment(dayModel.date, ['YYYY-MM-DD']).format('DD');
          var classNames = ['tui-full-calendar-weekday-grid-date '];

          if (dayModel.isToday) {
            classNames.push('tui-full-calendar-weekday-grid-date-decorator');
          }

          return '<span class="' + classNames.join(' ') + '">' + date + '</span>';
        },
        monthDayname: function (model) {
          return `<span style="color:#959595">${(model.label).toString().toLocaleUpperCase()}</span>`;
        },
        weekDayname: function (model) {
          return '<span class="tui-full-calendar-dayname-date"></span>&nbsp;&nbsp;<span class="tui-full-calendar-dayname-name">' + model.dayName.toLocaleUpperCase() + '</span>';
        },
      },
      useCreationPopup: false,
      useDetailPopup: false
    });
    this.current_calendar_view = "day"
    this.calendarInstance.on("clickDayname", function (e) {
      if (vm.calendarInstance.getViewName() === "week") {
        vm.calendarInstance.setDate(new Date(e.date));
        vm.calendarInstance.changeView("day", true);
        this.current_calendar_view = "day"
        vm.setRenderRangeText();
      }
    });
    this.calendarInstance.on("afterRenderSchedule", function (e) {
    });
    this.setRenderRangeText();
    this.calendarInstance.on("beforeCreateSchedule", e => {
      this.new_schedule(e.start._date);
      e.guide.clearGuideElement();
    });
    this.calendarInstance.on("clickSchedule", function (event) {
      if (event.schedule.raw.isHoliday) {
        toastr.error(
          "You cannot enter a schedule for this date. \n Reason: " +
          event.schedule.raw.reason
        );
      } else {
        var schedule = event.schedule;
        vm.patient_name = schedule.title;
        vm.visit_reason = schedule.raw.reason;
        vm.visitor_symptoms = schedule.raw.symptoms;
        vm.visitor_number = schedule.raw.phone_number;
        let selected_time =
          schedule.raw.start + "-" + schedule.raw.end;
        let selected_time_start = moment(schedule.raw.start, ['HH:mm']).format('hh:mm A');
        let selected_time_end = moment(schedule.raw.end, ['HH:mm']).format('hh:mm A');
        vm.display_selected_time = `${selected_time_start} - ${selected_time_end}`;
        vm.selected_schedule_id = schedule.id;
        vm.selected_schedule_visit_slot = schedule.raw.visit_slot;
        vm.get_time_slots(
          schedule.start._date,
          "#schedule_details",
          selected_time
        );
        vm.appointmentStatus = schedule.raw.appointment_status;
        vm.AppointmentID = schedule.raw.appointment_id;
        vm.visitStatus = schedule.raw.visit_status
        vm.openCheckAndChangeStatusModal(schedule.raw.appointment_id, schedule.start._date)
      }
    });

    this.update_schedules_list()

    $("#schedule_details").on("hidden.bs.modal", () => {
      if (!vm.edit_scheduling) {
        vm.patient_name = "";
        vm.visit_reason = "";
        vm.visitor_symptoms = "";
        vm.visitor_number = "";
        vm.selected_time = "";
        vm.isEdit = false;
        vm.selected_schedule_id = "";
        vm.selected_schedule_visit_slot = "";
        vm.isRescheduletime = false;
        vm.edit_scheduling = false;
      }
    });
    $("#schedule_create").on("hidden.bs.modal", () => {
      vm.patient_name = "";
      vm.visit_reason = "";
      vm.visitor_symptoms = "";
      vm.visitor_number = "";
      vm.selected_time = "";
    });
    $("#scheduling_modal").on("hidden.bs.modal", () => {
      vm.scheduling_contact_number = "";
      vm.sch_voice_greetings = "";
      vm.sch_sms_greetings = "";
      vm.csv_file = "";
      vm.file_label = "Choose File";
    });

    var x, i, j, l, ll, selElmnt, a, b, c, vm = this;
    /*look for any elements with the class "custom-scheduler-select":*/
    x = document.getElementsByClassName("custom-scheduler-select");
    l = x.length;
    for (i = 0; i < l; i++) {
      selElmnt = x[i].getElementsByTagName("select")[0];
      ll = selElmnt.length;
      /*for each element, create a new DIV that will act as the selected item:*/
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);
      /*for each element, create a new DIV that will contain the option list:*/
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      for (j = 1; j < ll; j++) {
        /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function (e) {
          /*when an item is clicked, update the original select box,
          and the selected item:*/
          var y, i, k, s, h, sl, yl;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.previousSibling;
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
          vm.current_calendar_view = selElmnt.value
        });
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", function (e) {
        /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }
    function closeAllSelect (elmnt) {
      /*a function that will close all select boxes in the document,
      except the current select box:*/
      var x, y, i, xl, yl, arrNo = [];
      x = document.getElementsByClassName("select-items");
      y = document.getElementsByClassName("select-selected");
      xl = x.length;
      yl = y.length;
      for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i)
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }
      for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add("select-hide");
        }
      }
    }
    /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);
  },
  methods: {
    open_scheduling_modal () {
      this.show_spinner = true;
      this.edit_scheduling = false;
      axios
        .post(api_calls.scheduling_settings_url(), {
          company_name: this.$session.get("UserInformation").company_name,
          company_id: this.$session.get("UserInformation").company_id,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          getSchedulingInfo: true
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          }
        })
        .then(response => {
          this.show_spinner = false;
          if (
            response.data != null &&
            response.data.Scheduling_info != undefined
          ) {
            this.scheduling_contact_number =
              response.data.Scheduling_info.phone_number;
            this.sch_voice_greetings = response.data.Scheduling_info.voice_text;
            this.sch_sms_greetings = response.data.Scheduling_info.sms_text;
            if (response.data.Scheduling_info.eta_to_call == null) {
              this.call_reminder_mins =
                15;
              this.call_reminder_hrs =
                0;
            }
            else {
              this.call_reminder_mins =
                response.data.Scheduling_info.eta_to_call.minutes;
              this.call_reminder_hrs =
                response.data.Scheduling_info.eta_to_call.hours;
            }
            this.selected_time_slot = response.data.Scheduling_info.time_slot !== null ? response.data.Scheduling_info.time_slot : ""
            if (
              response.data.Scheduling_info.Holiday_list_file_name == "" ||
              response.data.Scheduling_info.Holiday_list_file_name == null
            ) {
            } else {
              // this.file_label =
              //   response.data.Scheduling_info.Holiday_list_file_name;
            }
            for (var i in response.data.Scheduling_info.working_hrs) {
              document.querySelector("#from_" + i).value =
                response.data.Scheduling_info.working_hrs[i].StartTime;
              document.querySelector("#to_" + i).value =
                response.data.Scheduling_info.working_hrs[i].EndTime;
            }
            $("#scheduling_modal").modal("show");
          }
        })
        .catch(err => {
          // console.log(err);
          this.show_spinner = false;
          $("#scheduling_modal").modal("hide");
          toastr.error("Internal Server Error");
        });
    },
    get_time_slots (start_date, type, selected_time, is_rescheduling) {
      this.show_spinner = true;
      this.edit_scheduling = is_rescheduling === "is_rescheduling";
      if (is_rescheduling === "is_rescheduling") {
        this.hide_modal("schedule_details")
      }
      axios
        .post(api_calls.schedule_url(), {
          company_name: this.$session.get("UserInformation").company_name,
          company_id: this.$session.get("UserInformation").company_id,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          Date: moment(start_date).format('YYYY-MM-D'),
          appointment_date: moment(start_date).format('YYYY-MM-DD')
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          }
        })
        .then(response => {
          this.show_spinner = false;
          if (response.data == null) {
          } else if (
            response.data.msg == "Please update your scheduler settings"
          ) {
            toastr.error("Please update your scheduler settings");
          } else if (response.data.msg == "Internal Server Error") {
            toastr.error("Internal Server Error");
          } else {
            if (response.data.full_time_slots != undefined) {
              var dt = new Date();
              this.full_time_slots = [];
              var get_full_slot_list = true;
              var temp_start_date = new Date(start_date);
              if (temp_start_date.getFullYear() > dt.getFullYear()) {
              } else if (temp_start_date.getFullYear() == dt.getFullYear()) {
                if (temp_start_date.getMonth() > dt.getMonth()) {
                } else if (temp_start_date.getMonth() == dt.getMonth()) {
                  if (temp_start_date.getDate() > dt.getDate()) {
                  } else if (temp_start_date.getDate() == dt.getDate()) {
                    get_full_slot_list = false;
                  }
                }
              }
              // if (moment(start_date).diff(moment(), "day") <= 0) {
              //   get_full_slot_list = false;
              // }
              if (get_full_slot_list) {
                for (var i in response.data.full_time_slots) {
                  this.full_time_slots.push({
                    value: response.data.full_time_slots[i],
                    text: this.generate_time(
                      response.data.full_time_slots[i].split("-")[0],
                      response.data.full_time_slots[i].split("-")[1]
                    )
                  });
                }
              } else {
                  for (var i in response.data.full_time_slots) {
                    if (
                      dt.getHours() <
                      Number(
                        response.data.full_time_slots[i].split("-")[0].split(":")[0]
                      )
                    ) {               
                      this.full_time_slots.push({
                        value: response.data.full_time_slots[i],
                        text: this.generate_time(
                          response.data.full_time_slots[i].split("-")[0],
                          response.data.full_time_slots[i].split("-")[1]
                        )
                      });
                    }
                  }
                // for (var i in response.data.available_time_slots) {
                //   this.full_time_slots.push({
                //     value: response.data.available_time_slots[i],
                //     text: this.generate_time(
                //       response.data.available_time_slots[i].split("-")[0],
                //       response.data.available_time_slots[i].split("-")[1]
                //     )
                //   });
                // }
              }
              if (Boolean(selected_time)) {
                this.isEdit = false;
                this.selected_time = selected_time;
                this.scheduled_time = this.generate_time(
                  selected_time.split("-")[0],
                  selected_time.split("-")[1]
                );
                this.time_slots = [];
                // this.time_slots.push({
                //   value: selected_time,
                //   text: this.generate_time(
                //     selected_time.split("-")[0],
                //     selected_time.split("-")[1]
                //   )
                // })
                for (var i in this.full_time_slots) {
                  if (
                    response.data.filled_time_slots.indexOf(
                      this.full_time_slots[i].value
                    ) == -1 || this.selected_time == this.full_time_slots[i].value
                  ) {
                    this.time_slots.push(this.full_time_slots[i]);
                  }
                }
                // for (var i in this.full_time_slots) {
                //   this.time_slots.push(this.full_time_slots[i]);
                // }
              } else if (!Boolean(selected_time)) {
                if (response.data.filled_time_slots.length == 0) {
                  this.time_slots = this.full_time_slots;
                }
                else {
                  this.time_slots = [];
                  for (var i in this.full_time_slots) {
                    if (
                      response.data.filled_time_slots.indexOf(
                        this.full_time_slots[i].value
                      ) == -1
                    ) {
                      this.time_slots.push(this.full_time_slots[i]);
                    }
                  }
                  //  this.time_slots = response.data.available_time_slots;
                }
              }
              if (this.time_slots.length === 0 && type == 'schedule_details') {
                toastr.error('No Free Slots for this Date')
              } else {
                $(type).modal("show");
                this.temp_name = this.patient_name;
                this.temp_reason = this.visit_reason;
                this.temp_symptoms = this.visitor_symptoms;
                this.temp_appointment_time = this.selected_time;
                this.isReschedule = true;
                var nDate = new Date(
                  start_date.getFullYear() +
                  "-" +
                  (start_date.getMonth() < 9
                    ? "0" + (start_date.getMonth() + 1)
                    : start_date.getMonth() + 1) +
                  "-" +
                  start_date.getDate()
                );
                this.temp_data = nDate;
                this.previous_visit_date = nDate;
                this.temp_appointment_date = moment(nDate).format("MM-DD-YYYY");
                var midate = new Date();
                this.datepickerInstance = new DatePicker("#datepicker", {
                  date: nDate,
                  minDate: midate,
                  input: {
                    element: "#datepicker-input",
                    format: "yyyy-MM-dd"
                  },
                  setRanges: ([
                    [new Date(), new Date(2050, 12, 12)],
                  ])
                });
                var vm = this;
                this.datepickerInstance.on("close", function () {
                  //var x= nDate
                  vm.checkdate();
                  // $("#datepicker-input")[0].value
                });
              }

              // }, 1000);
            }
          }
        })
        .catch(error => {
          this.show_spinner = false;
          // console.log(error);
          toastr.error("Internal Server Error");
        });
    },
    sample_holiday () {
      event.preventDefault();
      this.spinnerOn = true;
      this.show_spinner = true;
      axios({
        method: "post",
        url: api_calls.holiday_file_download(),
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${this.$session.get("at")}`,
        },
        data: {
          isHolidayFile: true,
          company_id: this.$session.get("UserInformation").company_id,
          company_name: this.$session.get("UserInformation").company_name,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          email: this.$session.get("UserInformation").email
        }
      }).then(response => {
        this.show_spinner = false;
        this.spinnerOn = false;
        if(response.data.message === "Not able to download file"){
          swal.fire({
            title: "Some Error Occurred. Please Try Again",
            type: "error",
            timer: 2500
          });
        } else {
        var url = window.URL.createObjectURL(new Blob([response.data]));
        var link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "holidaySampleFile.csv");
        document.body.appendChild(link);
        link.click();
        }
      }).catch((e)=> {
        this.show_spinner = false;
        this.spinnerOn = false;
        swal.fire({
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
    fileinput (e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files[0].size < 1000000) {
        if (files[0].name.includes("csv")) {
          this.file_label = files[0].name;
          this.createCSV(files[0]);
        }
      } else {
        toastr.error("Upload only .csv file with size less than 1MB");
      }
      if (!files.length) return;
    },
    createCSV (file, type) {
      let reader = new FileReader();
      reader.onload = e => {
        this.csv_file = e.target.result.split("base64,")[1];
      };
      reader.readAsDataURL(file);
    },
    send_scheduling () {
      var working_hrs = {};
      for (var i in this.week_days) {
        working_hrs[this.week_days[i]] = {
          StartTime: document.querySelector("#from_" + this.week_days[i]).value,
          EndTime: document.querySelector("#to_" + this.week_days[i]).value
        };
      }
      // if (this.user_role == "Admin") {
      if (
        this.sch_voice_greetings != "" &&
        this.sch_sms_greetings != "" &&
        this.selected_time_slot != "" &&
        this.scheduling_contact_number != "" && 
        this.validPhoneNumber == true
      ) {
        this.show_spinner = true;
        axios
          .post(api_calls.scheduling_settings_url(), {
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            getSchedulingInfo: false,
            isupdate: true,
            // updateContact: true,
            ContactNumber: this.scheduling_contact_number,
            timeslot: Number(this.selected_time_slot),
            working_hrs: working_hrs,
            isupdateHoliday: this.csv_file != "" ? true : false,
            holiday_list_file_name: this.file_label,
            holiday_list_file_data:
              this.csv_file == "" ? null : this.csv_file,
            voicetext: this.sch_voice_greetings,
            smstext: this.sch_sms_greetings,
            eta_to_call: {
              hours: Number(this.call_reminder_hrs),
              minutes: Number(this.call_reminder_mins)
            }
          },{
                    headers: {
          Authorization: `Bearer ${this.$session.get("at")}`,
        },
          })
          .then(response => {
            this.show_spinner = false;
            this.hide_modal("scheduling_modal")
            if (
              response.data != null &&
              response.data.msg == "Scheduling info updated"
            ) {
              toastr.success(
                "Your scheduling information has been updated successfully"
              );
              this.update_schedules_list()
            } else if (response.data.msg == "Invalid Header") {
              toastr.error(
                "Please enter your headers as provided in the sample file below."
              );
            } else if (response.data.msg == "") {
            } else if (response.data == null) {
              $("#scheduling_modal").modal("hide");
            } else {
              toastr.error("Internal Server Error");
              $("#scheduling_modal").modal("hide");
            }
          });
      } else {
        if (this.validPhoneNumber != true  && this.scheduling_contact_number != ""){
          toastr.error("Mobile number is invalid, please enter in format: + CountryCode Number");
        }else{
          toastr.error("Please enter all the required fields.");
        }
      }
      // }
      // else if (this.user_role == "SuperAdmin") {
      //   this.show_spinner = true;
      //   axios
      //     .post(api_calls.scheduling_settings_url(), {
      //       company_name: this.company_name,
      //       company_id: this.companyid,
      //       email: this.$session.get("UserInformation").email,
      //       license_key: this.$session.get("UserInformation").license_key,
      //       token: this.$session.get("UserInformation").tokens,
      //       getSchedulingInfo: false,
      //       isupdate: true,
      //       voicetext: this.sch_voice_greetings,
      //       smstext: this.sch_sms_greetings,
      //       updateContact: true,
      //       ContactNumber: this.scheduling_contact_number,
      //       eta_to_call: {
      //         hours: Number(this.call_reminder_hrs),
      //         minutes: Number(this.call_reminder_mins)
      //       }
      //     })
      //     .then(response => {
      //       this.show_spinner = false;
      //       this.hide_modal("scheduling_modal")
      //       if (response.data.msg == "Scheduling info updated") {
      //         toastr.success(
      //           "Your scheduling greetings has been updated successfully"
      //         );
      //         this.update_schedules_list()
      //       }
      //     });
      // }
    },
    generate_time (start_time, end_time) {
      var start = moment(start_time, ["hh:mm"]).format("hh:mm A")
      var end = moment(end_time, ["hh:mm"]).format("hh:mm A")

      return `${start}-${end}`;
    },
    new_schedule (startDate) {
      let scheduleDate = ''
      if (moment(startDate, 'YYYY-MM-DD', true).isValid()) {
        scheduleDate = startDate
      } else {
        scheduleDate = this.calendarInstance.getDate()
      }

      let holiday_date = this.schedule_list.filter(schedule => {
        return (
          moment(schedule.start).format("YYYY MMMM DD") ==
          moment(scheduleDate).format("YYYY MMMM DD") &&
          schedule.raw.isHoliday == true
        );
      });
      let today_time = new Date();
      let start_time = scheduleDate;
      this.selected_date = start_time;
      start_time.setHours(0, 0, 0, 0);
      if (
        this.date_condition(today_time, start_time) &&
        holiday_date.length == 0 &&
        moment(start_time).format("dddd") != "Sunday"
      ) {
        this.get_time_slots(scheduleDate, "#schedule_create");
      } else if (holiday_date.length > 0) {
        toastr.error(
          "You cannot enter a schedule for this date. \n Reason: " +
          holiday_date[0].raw.reason
        );
      } else {
      }
    },
    create_appointment () {
      const regex = /\+[0-9]{9,14}$/;
      const x = this.visitor_number.replace(/\s+/g, '');
      event.preventDefault();
      if (
        // this.visit_reason == "" ||
        // this.visitor_symptoms == "" ||
        this.patient_name == "" ||
        this.visitor_number == "" ||
        this.selected_time == ""
      ) {
        toastr.error("Please enter all the required fields.");
        return;
      }
      if (!regex.test(x)) {
        toastr.error("Mobile number is invalid, please enter in format: + CountryCode Number");
      } else if (this.isEdit) {
        let appointment_payload = {
          VisitorName: this.patient_name,
          VisitReason: this.visit_reason,
          Symptoms: this.visitor_symptoms,
          VisitSlot: this.selected_time,
          PhoneNumber: this.visitor_number,
          VisitDate: this.selected_schedule_visit_slot.split(" ")[0]
        };
        this.show_spinner = true;
        axios
          .post(api_calls.schedule_edit_delete_url(), {
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            date: this.selected_schedule_visit_slot.split(" ")[0],
            is_edit: this.isEdit,
            appointment_id: this.selected_schedule_id,
            appointment_info: appointment_payload
          },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          }
        })
          .then(response => {
            this.show_spinner = false;
            if (
              response.data.msg != undefined &&
              response.data.msg == "Edit Appointment"
            ) {
              toastr.success("Your appointment has been edited successfully.");
              this.hide_modal("schedule_create")
              this.update_schedules_list()
            } else if (response.data.msg == "Internal Server Error") {
              toastr.error("Internal Server Error");
              this.hide_modal("schedule_details")
            }
          })
          .catch(e => {
            toastr.error("Internal Server Error");
            this.hide_modal("schedule_details")
          });
      } else {
        this.show_spinner = true;
        axios
          .post(api_calls.schedule_appointment_url(), {
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            phone_number: this.visitor_number,
            visitor_name: this.patient_name,
            visit_reason: this.visit_reason,
            symptoms: this.visitor_symptoms,
            visit_slot: this.selected_time,
            visit_date: $("#datepicker-input")[0].value
          },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          }
        })
          .then(response => {
            this.show_spinner = false;
            if (
              response.data.msg != undefined &&
              response.data.msg == "Appointment Added Successfully"
            ) {
              toastr.success("Your appointment has been created successfully.");
              this.hide_modal("schedule_create")
              this.update_schedules_list()
            } else if (response.data.msg == "Internal Server Error") {
              toastr.error("Internal Server Error");
              this.hide_modal("schedule_create")
            }
          })
          .catch(e => {
            toastr.error("Internal Server Error");
            this.hide_modal("schedule_create")
            this.show_spinner = false;
          });
      }
    },
    delete_appointment () {
      event.preventDefault();
      swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete!!"
        })
        .then(result => {
          if (result.value) {
            this.show_spinner = true;
            axios
              .post(api_calls.schedule_edit_delete_url(), {
                company_name: this.$session.get("UserInformation").company_name,
                company_id: this.$session.get("UserInformation").company_id,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                is_delete: true,
                date: this.selected_schedule_visit_slot.split(" ")[0],
                appointment_id: this.selected_schedule_id
              },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          }
        })
              .then(response => {
                this.show_spinner = false;
                this.hide_modal("schedule_details")
                if (response.data.msg == "Deleted Successfully") {
                  toastr.success(
                    "Your appointment has been deleted successfully."
                  );
                  this.update_schedules_list()
                } else if (response.data.msg == "Internal Server Error") {
                  toastr.error("Internal Server Error");
                  this.hide_modal("schedule_details")
                }
              })
              .catch(e => {
                toastr.error("Internal Server Error");
                this.hide_modal("schedule_details")
              });
          }
        });
    },
    render_schedule (data) {
      let schedule = [];
      for (var i in data) {
        for (var j in data[i]) {
          if (j == "Holiday") {
            schedule.push({
              id: j,
              calendarId: "1",
              title: "Holiday",
              category: "time",
              dueDateClass: "",
              raw: {
                reason: data[i][j].Reason,
                isHoliday: true
              },
              start: this.set_time_intervals(i, "00:00"),
              end: this.set_time_intervals(i, "23:59")
            });
          } else {
            schedule.push({
              id: j,
              calendarId: "1",
              title: data[i][j].VisitorName,
              //title: this.calendarInstance.template(),
              category: "time",
              dueDateClass: "",
              raw: {
                phone_number: data[i][j].PhoneNumber,
                reason: data[i][j].VisitReason,
                symptoms: data[i][j].Symptoms,
                visit_slot: data[i][j].VisitSlot,
                start: data[i][j].VisitSlot.split(" ")[1].split("-")[0],
                end: data[i][j].VisitSlot.split(" ")[1].split("-")[1],
                isHoliday: false,
                appointment_status: data[i][j].AppointmentStatus,
                visit_status: data[i][j].VisitStatus,
                appointment_id: j
              },
              start: this.set_time_intervals(
                data[i][j].VisitSlot.split(" ")[0],
                data[i][j].VisitSlot.split(" ")[1].split("-")[0]
              ),
              end: data[i][j].VisitSlot.split(" ")[1].split("-")[1] == "00:00"
              ? this.set_time_intervals(
                  data[i][j].VisitSlot.split(" ")[0],
                  "23:59"
                ):this.set_time_intervals(
                  data[i][j].VisitSlot.split(" ")[0],
                  data[i][j].VisitSlot.split(" ")[1].split("-")[1]
                )
            });
          }
        }
      }
      this.schedule_list = schedule;
      this.calendarInstance.clear()
      this.calendarInstance.createSchedules(schedule);
      this.calendarInstance.render();
    },
    setRenderRangeText () {
      this.show_spinner = false;
      var renderRange = document.getElementById("renderRange");
      var options = this.calendarInstance.getOptions();
      var viewName = this.calendarInstance.getViewName();
      var html = [];
      if (
        (viewName === "month" &&
          (!options.month.visibleWeeksCount ||
            options.month.visibleWeeksCount > 4)
          || viewName === "day")
      ) {
        html.push(
          moment(this.calendarInstance.getDate().getTime()).format(
            "MMMM YYYY"
          )
        );
      } else {
        let startDate = this.calendarInstance.getDateRangeStart().getTime()
        let endDate = this.calendarInstance.getDateRangeEnd().getTime()

        if (moment(endDate).subtract(startDate, 'year')) {
          html.push(
            `${moment(startDate).format("D MMMM YYYY")} to ${moment(endDate).format("D MMMM YYYY")}`
          );
        } else if (moment(endDate).subtract(startDate, 'month')) {
          html.push(
            `${moment(startDate).format("D MMMM")} to ${moment(endDate).format("D MMMM YYYY")}`
          );
        } else {
          html.push(
            `${moment(startDate).format("D")} to ${moment(endDate).format("D MMMM YYYY")}`
          );
        }

      }
      this.generate_days_in_month(moment(this.calendarInstance.getDate().getTime()).format('D'), moment(this.calendarInstance.getDate().getTime()).format('MMMM'), moment(this.calendarInstance.getDate().getTime()).format("YYYY"))
      renderRange.innerHTML = html.join("");
      this.daily_date = renderRange.innerHTML;
    },
    date_condition (from_object, to_object) {
      if (from_object !== null && to_object !== null) {
        if (to_object.getFullYear() > from_object.getFullYear()) {
          return true;
        } else if (to_object.getFullYear() == from_object.getFullYear()) {
          if (to_object.getMonth() > from_object.getMonth()) {
            return true;
          } else if (to_object.getMonth() == from_object.getMonth()) {
            if (Number(to_object.getDate()) >= Number(from_object.getDate())) {
              return true;
            } else return false;
          } else return false;
        } else return false;
      } else if (from_object === null && to_object === null) {
        return true;
      } else return false;
    },
    toggle_view (type) {
      if (type == "day") {
        this.show_check_and_change_status = true;
      } else {
        this.show_check_and_change_status = false;
      }
      this.calendarInstance.changeView(type, true);
      this.setRenderRangeText();
    },
    switch_calendar (type, date) {
      if (type == "today") {
        this.current_calendar_view = "day";
        this.calendarInstance.today();
        // this.setRenderRangeText();
      } else if (
        this.calendarInstance._viewName == "week" ||
        this.calendarInstance._viewName == "day"
      ) {
        if (type == "next") {
          this.calendarInstance.next();
        } else if (type == "prev") {
          this.calendarInstance.prev();
        }
        else if (type == "custom") {
          this.calendarInstance.setDate(new Date(this.calendarInstance.getDate().setDate(date)))
        }
        // this.setRenderRangeText();
      } else if (this.calendarInstance._viewName == "month") {
        this.show_spinner = true;
        if (type == "next") {
          this.calendarInstance.next();
        } else if (type == "prev") {
          this.calendarInstance.prev();
        }
      }
      this.show_spinner = true;
      axios
        .post(api_calls.schedule_info_url(), {
          company_name: this.$session.get("UserInformation").company_name,
          company_id: this.$session.get("UserInformation").company_id,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          first_day: this.month_range("start_time"),
          last_day: this.month_range("end_time")
        },
      {
        headers: {
          Authorization: `Bearer ${this.$session.get("at")}`,
        }
      })
        .then(response => {
          this.show_spinner = false;
          this.render_schedule(response.data.Scheduling_info);
        });
      this.setRenderRangeText();
      this.show_spinner = false;
    },
    month_range (type) {
      let time = moment(this.calendarInstance.getDate().getTime());
      time = moment(time).daysInMonth();
      if (type == "start_time") {
        let start_time = null;
        if(this.calendarInstance._viewName == "week"){
          start_time = this.calendarInstance._renderRange.start._date
        }else {
          start_time = new Date(
            this.calendarInstance.getDate()._date.getFullYear(),
            this.calendarInstance.getDate()._date.getMonth(),
            1
          );
        }
        start_time =
          start_time.getFullYear() +
          "-" +
          (start_time.getMonth() < 9
            ? "0" + (start_time.getMonth() + 1)
            : start_time.getMonth() + 1) +
          "-" +
          (start_time.getDate() < 10
            ? "0" + start_time.getDate()
            : start_time.getDate());
        return start_time;
      } else if (type == "end_time") {
        let end_time = null;
        if(this.calendarInstance._viewName == "week"){
          end_time = this.calendarInstance._renderRange.end._date
        }else {
            end_time = new Date(
            this.calendarInstance.getDate()._date.getFullYear(),
            this.calendarInstance.getDate()._date.getMonth(),
            time
          );
        }
        end_time =
          end_time.getFullYear() +
          "-" +
          (end_time.getMonth() < 9
            ? "0" + (end_time.getMonth() + 1)
            : end_time.getMonth() + 1) +
          "-" +
          (end_time.getDate() < 10
            ? "0" + end_time.getDate()
            : end_time.getDate());
        return end_time;
      }
    },
    generate_days_in_month (day, month, year) {
      let total_days = moment(`${month} ${year}`, ['MMMM YYYY']).daysInMonth()
      this.daysInMonth = []
      for (let i = 1, n = total_days; i <= n; i++) {
        this.daysInMonth.push({
          day: moment(`${i} ${month} ${year}`, ['D MMMM YYYY']).format('dd'),
          date: i,
          is_active: moment(`${day} ${month} ${year}`, ['D MMMM YYYY']).isSame(moment(`${i} ${month} ${year}`, ['D MMMM YYYY']), 'day')
        })
      }
    },
    set_time_intervals (year, time) {
      var vm = new Date(
        year.split("-")[0],
        year.split("-")[1] - 1,
        year.split("-")[2],
        time.split(":")[0],
        time.split(":")[1]
      );
      vm = moment(vm).format();
      return vm;
    },
    openCheckAndChangeStatusModal (AppointmentID, scheduleDate) {
      this.show_spinner = true;
      // var dateToSend = moment(this.calendarInstance.getDate().getTime()).format(
      //   "YYYY-MM-DD"
      // );

      var dateToSend = moment(scheduleDate).format(
        "YYYY-MM-DD"
      );

      // var dateobj = new Date(moment(this.calendarInstance.getDate().getTime()).format("MMMM DD, YYYY"));
      axios
        .post(api_calls.visit_status_info(), {
          company_name: this.$session.get("UserInformation").company_name,
          company_id: this.$session.get("UserInformation").company_id,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          date: dateToSend,
          is_get: true
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          }
        })
        .then(response => {
          this.show_spinner = false;
          if (response.data.data.length != 0) {
            let appointmentFilter = response.data.data.filter(appt => {
              return appt["AppointmentID"] == AppointmentID
            })

            if (appointmentFilter.length === 1) {
              this.visitStatus = appointmentFilter[0]["VisitStatus"]
            }

            this.visit_status_data = response.data.data;
            var confirmed_appt = [];
            var none_appt = [];
            var reschedule_appt = [];
            var deleted_appt = [];

            // this.visit_status_comparison_data = this.visit_status_data.slice();
            for (let i = 0; i < this.visit_status_data.length; i++) {
              for (let j = 0; j < this.schedule_list.length; j++) {
                // this.visit_status_data[i]["CompareVisitStatus"] =
                //   response.data.data[i].VisitStatus;
                if (this.visit_status_data[i].AppointmentID === this.schedule_list[j].id) {
                  this.visit_status_data[i]["AppointmentStatus"] = this.schedule_list[j].raw.appointment_status
                  if (this.visit_status_data[i]["AppointmentStatus"] === 'confirmed') {
                    confirmed_appt.push(this.visit_status_data[i])
                  }
                  if (this.visit_status_data[i]["AppointmentStatus"] === 'none') {
                    none_appt.push(this.visit_status_data[i])
                  }
                  if (this.visit_status_data[i]["AppointmentStatus"] === 'rescheduled') {
                    reschedule_appt.push(this.visit_status_data[i])
                  }
                  if (this.visit_status_data[i]["AppointmentStatus"] === 'deleted') {
                    deleted_appt.push(this.visit_status_data[i])
                  }

                  //  this.visit_status_data = [];
                  //  this.visit_status_data += none_appt;
                  //  this.visit_status_data += confirmed_appt;
                  //  this.visit_status_data += reschedule_appt;
                  //  this.visit_status_data += deleted_appt;

                }
                // this.visit_status_comparison_data.push(response.data.data[i]);
                this.visit_status_data[i]["CompareVisitStatus"] =
                  response.data.data[i].VisitStatus;

              }
            }
            this.visit_status_data = [];
            this.visit_status_data = this.visit_status_data.concat(none_appt, confirmed_appt, reschedule_appt, deleted_appt);
            //  this.visit_status_data.concat( confirmed_appt);
            //  this.visit_status_data.concat(reschedule_appt);
            //  this.visit_status_data.concat(deleted_appt);

            // $('#patientdatamodel').modal('show');
          }
          else if (response.data.msg === 'No Appointments Scheduled' || response.data.data.length === 0) {
            this.visit_status_data = [];
            swal
              .fire({
                text: "No Appointments have been scheduled for " + " " + this.daily_date,
                type: "warning",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Okay"
              })
              .then(result => {
                this.hide_modal('patientdatamodel');
              });
          }

        })
        .catch(err => {
          this.show_spinner = false;
          toastr.error("Internal Server Error")
        })
        ;
    },
    changeSingleVisitStatus(){
      this.show_spinner = true;
      event.preventDefault();
      var dateToSend = $("#datepicker-input")[0].value;
      var formLength = this.visit_status_data.length;
      var array = [];
      for (let i = 0; i < formLength; i++) {
        if(this.visit_status_data[i].AppointmentID === this.AppointmentID){
        array.push({
            AppointmentID: this.visit_status_data[i].AppointmentID,
            VisitorName: this.visit_status_data[i].VisitorName,
            VisitSlot: this.visit_status_data[i].VisitSlot,
            AppointmentStatus: this.visit_status_data[i].AppointmentStatus,
            VisitStatus: this.visitStatus
          });
        }
      }
      if (array.length > 0) {
        axios
          .post(api_calls.visit_status_info(), {
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            response_visit_status: array,
            is_edit: true,
            date: dateToSend
          },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          }
        })
          .then(response => {
            this.show_spinner = false;
            if (response.data.msg == "Visit Status Edited") {
              toastr.success("Visit Status Changed Successfully")
              this.hide_modal('patientdatamodel');
            }
            else {
              this.show_spinner = false;
              toastr.error("Some Error Occurred")
            }
          })
          .catch(error => {
            this.show_spinner = false;
            toastr.error("Some Error Occurred")
          });
      }
    },
    changeVisitStatus () {
      this.show_spinner = true;
      event.preventDefault();
      var dateToSend = $("#datepicker-input")[0].value;
      var formLength = this.visit_status_data.length;
      var array = [];
      for (let i = 0; i < formLength; i++) {
        if (
          this.visit_status_data[i].CompareVisitStatus ===
          this.visitStatus
          // this.visit_status_data[i].VisitStatus
        ) {
        } else {
          array.push({
            AppointmentID: this.visit_status_data[i].AppointmentID,
            VisitorName: this.visit_status_data[i].VisitorName,
            VisitSlot: this.visit_status_data[i].VisitSlot,
            AppointmentStatus: this.visit_status_data[i].AppointmentStatus,
            VisitStatus: this.visitStatus
            // VisitStatus: this.visit_status_data[i].VisitStatus
          });
        }
      }
      if (array.length > 0) {
        axios
          .post(api_calls.visit_status_info(), {
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            response_visit_status: array,
            is_edit: true,
            date: dateToSend
          },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          }
        })
          .then(response => {
            this.show_spinner = false;
            if (response.data.msg == "Visit Status Edited") {
              toastr.success("Visit Status Changed Successfully")
              this.hide_modal('patientdatamodel');
            }
            else {
              this.show_spinner = false;
              toastr.error("Some Error Occurred")
            }
          })
          .catch(error => {
            this.show_spinner = false;
            toastr.error("Some Error Occurred")
          });
      }
    },
    confirmReschedule () {
      const is_invalid = (moment(this.temp_appointment_date, ['MM-DD-YYYY'])
        .diff(moment($("#datepicker-input")[0].value, ['YYYY-MM-DD']), "day") === 0)
        && (this.temp_appointment_time == this.selected_time);
      if (is_invalid) {
        swal
          .fire({
            type: "warning",
            text: "It looks like you have not made any change to the appointment date and appointment time",
            showConfirmButton: true,
            timer:9000,
          }).then(result => {
          });
      }
      if (
        this.filled_time_slots_selected_date.includes(this.selected_time) || this.selected_time == ""
      ) {
        toastr.error("Please enter all the required fields.");
        return;
      }
      else {
        this.show_spinner = true;
        var dateSelected = document.getElementById("datepicker-input").value;
        var previousDate = moment(this.temp_appointment_date, ['MM-DD-YYYY']).format('YYYY-MM-DD');
        axios
          .post(api_calls.reschedule_appointment(), {
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
            phone_number: this.visitor_number,
            visitor_name: this.patient_name,
            visit_reason: this.visit_reason,
            visit_slot: this.selected_time,
            symptoms: this.visitor_symptoms,
            visit_date: dateSelected,
            previous_visit_date: previousDate,
            token: this.$session.get("UserInformation").tokens,
            appointment_id: this.selected_schedule_id
          },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          }
        })
          .then(response => {
            // this.hide_modal("scheduling_modal")
            this.edit_scheduling = false
            this.hide_modal("schedule_create")
            if (response.data.msg == "Appointment Rescheduled Successfully") {
              this.show_spinner = false;
              toastr.success("Appointment Has Been Rescheduled Successfully");
              this.update_schedules_list()
            }
            else {
              this.show_spinner = false;
              toastr.error("Something Went Wrong");
              setTimeout(() => {
                this.$router.go();
              }, 1000);
            }
          })
          .catch(error => {
            this.show_spinner = false;
            toastr.error("Some Error Occurred");
          });
      }
    },
    keepcheckingdate () {
      var vm = this;
      this.show_spinner = true;
      this.datepickerInstance.on("close", function () {
        // vm.show_spinner = true;
        vm.checkdate();
      });
    },
    checkdate () {
      //event.preventDefault();
      var dt = new Date();
      if (this.date_condition(dt, new Date($("#datepicker-input")[0].value))) {
        this.selected_date = $("#datepicker-input")[0].value;
        var start_date = $("#datepicker-input")[0].value;
        var selected_time = this.selected_time
        var time =
          dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
        axios
          .post(api_calls.schedule_url(), {
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            phone_number: this.visitor_number,
            Date: this.selected_date,
            appointment_date: this.selected_date,
            email: this.$session.get("UserInformation").email
          },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          }
        })
          .then(response => {
            this.new_selected_date = $("#datepicker-input")[0].value;
            //  $("#datepicker-input")[0].value = this.selected_date;

            if (response.data == null) {
            } else if (
              response.data.msg == "Please update your scheduler settings"
            ) {
              toastr.error("Please update your scheduler settings");
            } else if (response.data.msg == "Internal Server Error") {
              toastr.error("Internal Server Error");
            } else {
              // if (response.data.FullTimeSlot != undefined) {
              //   var dt = new Date();
              //   this.full_time_slots = [];
              //   this.time_slots = [];
              //   // for (var i in this.full_time_slots) {
              //   //     this.full_time_slots.push({
              //   //     value: response.data.FullTimeSlot[i],
              //   //     text: this.generate_time(
              //   //       response.data.FullTimeSlot[i].split("-")[0],
              //   //       response.data.FullTimeSlot[i].split("-")[1]
              //   //     )
              //   //     });
              //   //   if (
              //   //     response.data.AvailableTimeSlot.indexOf(
              //   //       this.full_time_slots[i].value
              //   //     ) == -1
              //   //   ) {
              //   //     this.time_slots.push(this.full_time_slots[i]);
              //   //   }
              //   // }
              //     for(var i in response.data.available_time_slots){
              //       this.full_time_slots.push({
              //         value: response.data.available_time_slots[i],
              //         text: this.generate_time(
              //         response.data.available_time_slots[i].split("-")[0],
              //         response.data.available_time_slots[i].split("-")[1]
              //         )
              //       })
              //     }
              //     $("#datepicker-input")[0].value = this.selected_date

              // }

              this.isRescheduletime = true;
              this.full_time_slots = [];
              this.time_slots = [];
              if (response.data.full_time_slots != undefined) {
                var dt = new Date();
                this.full_time_slots = [];
                var get_full_slot_list = true;
                var temp_start_date = new Date(start_date);
                if (temp_start_date.getFullYear() > dt.getFullYear()) {
                } else if (temp_start_date.getFullYear() == dt.getFullYear()) {
                  if (temp_start_date.getMonth() > dt.getMonth()) {
                  } else if (temp_start_date.getMonth() == dt.getMonth()) {
                    if (temp_start_date.getDate() > dt.getDate()) {
                    } else if (temp_start_date.getDate() == dt.getDate()) {
                      get_full_slot_list = false;
                    }
                  }
                }
                if (get_full_slot_list) {
                  for (var i in response.data.full_time_slots) {
                    this.full_time_slots.push({
                      value: response.data.full_time_slots[i],
                      text: this.generate_time(
                        response.data.full_time_slots[i].split("-")[0],
                        response.data.full_time_slots[i].split("-")[1]
                      )
                    });
                  }
                } else {
                  for (var i in response.data.full_time_slots) {
                    if (
                      dt.getHours() <
                      Number(
                        response.data.full_time_slots[i].split("-")[0].split(":")[0]
                      )
                    ) {
                      this.full_time_slots.push({
                        value: response.data.full_time_slots[i],
                        text: this.generate_time(
                          response.data.full_time_slots[i].split("-")[0],
                          response.data.full_time_slots[i].split("-")[1]
                        )
                      });
                    }
                  }
                }
                // if (selected_time != undefined) {
                //   this.isEdit = false;
                //   this.selected_time = selected_time;
                //   this.scheduled_time = this.generate_time(
                //     selected_time.split("-")[0],
                //     selected_time.split("-")[1]
                //   );
                // } else if (selected_time == undefined) {

                this.filled_time_slots_selected_date = response.data.filled_time_slots;

                if (response.data.filled_time_slots.length == 0) {
                  this.time_slots = this.full_time_slots;
                } else {
                  this.time_slots = [];
                  for (var i in this.full_time_slots) {
                    if (
                      response.data.filled_time_slots.indexOf(
                        this.full_time_slots[i].value
                      ) == -1
                    ) {
                      this.time_slots.push(this.full_time_slots[i]);
                    }
                  }
                  // this.time_slots = response.data.available_time_slots;
                }
                //}
              }
            }
            this.show_spinner = false;
          });
      } else {
         toastr.error("Please Select A Valid Date");
        this.datepickerInstance.open();
        $("#datepicker-input")[0].value = this.new_selected_date;
      }
    },
    send_reminder (AppointmentID) {
      event.preventDefault();
      swal
        .fire({
          title: "Are you sure?",
          text: " You want to Send the Reminder",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Send!!"
        })
        .then(result => {
          if (result.value) {
            this.show_spinner = true;
            // var todays_date = this.daily_date;
            var d = new Date(this.temp_appointment_date);
            var previousDate =
              d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
            axios
              .post(api_calls.send_reminder(), {
                company_name: this.$session.get("UserInformation").company_name,
                company_id: this.$session.get("UserInformation").company_id,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                appointment_id: AppointmentID,
                date: previousDate,
                visit_slot: this.display_selected_time
              },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          }
        })
              .then(response => {
                this.show_spinner = false;
                if (response.data.success == true) {
                  toastr.success("Notification Has been sent")
                }
                else if (response.data.success == false) {
                  toastr.error("Could Not Send Notification")
                }
              })
              .catch(error => {
                this.show_spinner = false;
                toastr.error("Internal Server Error");
              });
          }
        });
    },
    confirmAppointment () {
      event.preventDefault();
      const is_invalid = moment().diff(moment(`${this.temp_appointment_time} ${this.temp_appointment_date}`, ['HH:mm MM-DD-YYYY']), "minute") >= 0;
      // if ((this.temp_appointment_date != $("#datepicker-input")[0].value) || this.temp_appointment_time != this.selected_time) {
      if (is_invalid) {
        swal
          .fire({
            type: "warning",
            text: "It looks like you have made change to the appointment date and appointment time, so please reschedule the appointment first",
            showConfirmButton: true,
            timer:5000,
          }).then(result => {
          });
      }
      else {
        swal
          .fire({
            title: "Are you sure?",
            text: " You want to Confirm the Apppointment? This will send a message to the patient",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm!"
          })
          .then(result => {
            if (result.value) {
              if ((this.temp_name != this.patient_name) || (this.temp_reason != this.visit_reason) || (this.temp_symptoms != this.visitor_symptoms)) {
                // alert("Hi");
                let appointment_payload = {
                  VisitorName: this.patient_name,
                  VisitReason: this.visit_reason,
                  Symptoms: this.visitor_symptoms,
                  VisitSlot: this.selected_time,
                  PhoneNumber: this.visitor_number,
                  VisitDate: this.selected_schedule_visit_slot.split(" ")[0]
                };
                this.show_spinner = true;
                axios
                  .post(api_calls.schedule_edit_delete_url(), {
                    company_name: this.$session.get("UserInformation").company_name,
                    company_id: this.$session.get("UserInformation").company_id,
                    email: this.$session.get("UserInformation").email,
                    license_key: this.$session.get("UserInformation").license_key,
                    token: this.$session.get("UserInformation").tokens,
                    date: this.selected_schedule_visit_slot.split(" ")[0],
                    is_edit: true,
                    appointment_id: this.selected_schedule_id,
                    appointment_info: appointment_payload
                  },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          }
        })
                  .then(response => {
                    this.show_spinner = false;
                    if (
                      response.data.msg != undefined &&
                      response.data.msg == "Edit Appointment"
                    ) {
                      toastr.success("Your appointment has been edited successfully.");
                    } else if (response.data.msg == "Internal Server Error") {
                      toastr.error("Internal Server Error");
                      $("#schedule_details").modal("hide");
                    }
                  })
                  .catch(e => {
                    toastr.error("Internal Server Error");
                    $("#schedule_details").modal("hide");
                  });
              }
              this.show_spinner = true;
              var dateSelected = moment(this.temp_appointment_date, ['MM-DD-YYYY']).format('YYYY-MM-DD');
              var Date1 = this.previous_visit_date;
              var previousDate = moment(Date1).format('YYYY-MM-DD');
              axios
                .post(api_calls.confirm_appointment(), {
                  company_name: this.$session.get("UserInformation").company_name,
                  company_id: this.$session.get("UserInformation").company_id,
                  phone_number: this.visitor_number,
                  visitor_name: this.patient_name,
                  visit_reason: this.visit_reason,
                  visit_slot: this.selected_time,
                  symptoms: this.visitor_symptoms,
                  visit_date: dateSelected,
                  token: this.$session.get("UserInformation").tokens,
                  appointment_id: this.selected_schedule_id,
                },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          }
        })
                .then(response => {
                  this.hide_modal("schedule_details")
                  if (response.data.msg == "Appointment Confirmed Successfully") {
                    this.show_spinner = false;
                    toastr.success("Appointment has been Confirmed");
                    this.update_schedules_list()
                  }
                  else if (response.data.msg == "Appointment Confirmation Failed") {
                    this.show_spinner = false;
                    toastr.success("Appointment Confirmation Failed");
                    this.update_schedules_list()
                  }
                  else if (response.data.msg == "An Error Occurred") {
                    this.show_spinner = false;
                    toastr.error("Something Went Wrong");
                    this.update_schedules_list()
                  }
                })
                .catch(error => {
                  this.show_spinner = false;
                  toastr.error("Internal Server Error");
                });
            }
          })
      }
    },
    cancel_reschedule () {
      this.isReschedule = !this.isReschedule;
      //  $("#datepicker-input")[0].value = this.temp_data;

    },
    convert_casing (text) {
      if (text === 'none') {
        text = 'scheduled'
      }
      text = text.toString();
      return text.replace(/\w\S*/g,
        function (txt) {
          return txt.charAt(0).toUpperCase() +
            txt.substr(1).toLowerCase();
        });
      return txt;
    },
    hide_modal (id) {
      $(`#${id}`).modal('hide')
    },
    update_schedules_list () {
      axios
        .post(api_calls.schedule_info_url(), {
          company_name: this.$session.get("UserInformation").company_name,
          company_id: this.$session.get("UserInformation").company_id,
          token: this.$session.get("UserInformation").tokens,
          license_key: this.$session.get("UserInformation").license_key,
          email: this.$session.get("UserInformation").email,
          first_day: this.month_range("start_time"),
          last_day: this.month_range("end_time")
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          }
        })
        .then(response => {
          this.render_schedule(response.data.Scheduling_info);
        })
        .catch(e => {
          // console.log(e);
        });
      axios
        .post(api_calls.scheduling_settings_url(), {
          getTimeSlot: true,
          company_name: this.$session.get("UserInformation").company_name,
          company_id: this.$session.get("UserInformation").company_id,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          }
        })
        .then(response => {
          // getSchedulingInfo: true,
          if (response.data != null) {
            this.full_time_slots = []
            for (var i in response.data) {
              let split_strings = response.data[i].split("-");
              this.full_time_slots.push({
                value: response.data[i],
                text: this.generate_time(
                  response.data[i].split("-")[0],
                  response.data[i].split("-")[1]
                )
              });
            }
          }
        })
        .catch(e => {
          toastr.error("Internal Server Error");
        });
    }
  }
};
</script>

<style>
.tui-full-calendar-weekday-grid-more-schedules {
  color: #000000 !important;
}
</style>
<style scoped>
.modal {

  overflow-y: scroll !important;
}

.close>img {
    width: 24px;
    height: 24px;
}

.card-header > p {
  font: 20px/27px "Segoe UI Bold";
  letter-spacing: 0px;
  color: #283877;
  text-transform: uppercase;
  opacity: 1;
}

.col-md-6 {
  text-align: center;
}
.spinner {
  z-index: 100000000000;
}
.calendar-icon {
  width: 14px;
  height: 14px;
  display: inline-block;
  vertical-align: middle;
}
.delete-btn {
  background-color: #e30000;
  color: #ffffff;
  border: solid 1px #f23d3d;
  padding: 5px 20px;
  font-size: 14px;
}
.ic-arrow-line-left {
  background: url(/img/ic-arrow-line-left.png) no-repeat;
}
.ic-arrow-line-right {
  background: url(/img/ic-arrow-line-right.png) no-repeat;
}
.move-today,
.move-day {
  background-color: #ffffff;
}

.green-btn {
  font-size: 14px;
  color: #fff;
  background: #009900;
  border: solid 1px #009900;
  padding: 6px 15px;
  font-weight: 400;
  line-height: 20px;
  display: inline-block;
  border-radius: 4px;
  cursor: pointer;
}
.green-btn:hover {
  background: none;
  color: #009900;
}
</style>
