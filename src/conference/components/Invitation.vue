<template>
<div class="container-fluid pl-0 pr-0" style="min-height: 520px">
    <top-navbar></top-navbar>
  <div class="container-fluid pt-0">
    <div class="row" style="height: 520px;">
      <div class="col-md-9">
        <div class="row pt-5">
          <div class="col-sm-5" style="margin-left: 5%;">
            <div class="card text-center" style="height: 100%; width:100%'; margin-top: 25px;">
              <div class="card-body" style="height: 162px;">
                <span class="card-title">Invite Attendee</span>
                <div class="form-group" style="margin-top: 10px; margin-right: 8px;
                  margin-left: 8px; font-size: 14px; height: 40px;">
                  <!-- style="font-size: 14px; height: 40px;" -->
                  <input
                    v-model="attendee_email"
                    class="form-control"
                    placeholder="Attendee Email (Enter multiple addresses with a ','"
                    type="email"
                  />
                </div>
                <div class="form-group" style="margin-top: 10px; margin-right: 8px;
                  margin-left: 8px;">
                  <date-picker style="font-size: 14px; height: 40px;"
                    v-model="time"
                    type="datetime"
                    format="D MMMM YYYY hh:mm A"
                    placeholder="Select Date"
                    input-class="form-control"
                  ></date-picker>
                  <!-- <input
                class="form-control"
                placeholder="Select Date"
              /> -->
                </div>
                <button style="width: 28%; height: 34px; font-weight: 600;"
                 class="btn" @click="sendEmail">SEND</button>
              </div>
            </div>
          </div>
        <h6 style="margin-top:8rem;font-weight:550;margin-left: 3%;">OR</h6>
          <div class="col-sm-5">
            <div class="card text-center" style="height: 100%; width:100%; margin-left:8%;
            margin-top: 25px;">
              <div class="card-body" style="margin-top: 8%; height: 162px;">
                <span
                  class="card-title"
                  style="margin-top: 1.5rem;"
                >Join a Meeting Now</span>
                <div class="form-group" style="margin-top: 10px; margin-right: 8px;
                  margin-left: 8px;">
                  <input style="font-size: 14px; height: 40px;"
                    class="form-control"
                    type="text"
                    placeholder
                    readonly
                    v-model="link"
                    ref="invite_link"
                  />
                </div>
                <button style="width: 42%; height: 34px; font-weight: 600;" class="btn"
                @click="copy_invite_link">COPY LINK</button>
                <!-- <h5 class="card-title">Invite Attendee</h5> -->
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="col-md-3 pl-0 pr-0">
        <!-- <div class="right-side-bar"> -->
          <div class="right-side-bar">
            <div class="right-side-box">
              <div class="blue-right-box">
                <img src="./icons/Group 154.svg" alt style="height: 64%; margin-top: 23px;"/>
              </div>
            </div>
          </div>
          <div class="right-side-bar">
            <div class="right-side-box">
              <div class="blue-right-box">
                <img src="./icons/Group 154.svg" alt style="height: 64%; margin-top: 23px;"/>
              </div>
            </div>
          </div>
          <div class="right-side-bar">
            <div class="right-side-box">
              <div class="blue-right-box">
                <img src="./icons/Group 154.svg" alt style="height: 64%; margin-top: 23px;"/>
              </div>
            </div>
          </div>
          <div class="right-side-bar">
            <div class="right-side-box">
              <div class="blue-right-box">
                <img src="./icons/Group 154.svg" alt style="height: 64%; margin-top: 23px;"/>
              </div>
            </div>
          </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
  <custom-footer></custom-footer>
</div>
</template>

<script>
import { Socket, Presence } from 'phoenix';
import DatePicker from 'vue2-datepicker';
import TopNavbar from './TopNavbar.vue';
import CustomFooter from './CustomFooter.vue';

export default {
  data() {
    return {
      socket: null,
      channel: null,
      message: '',
      username: '',
      enterName: true,
      time: null,
      attendee_email: '',
      link: null,
    };
  },
  components: {
    DatePicker,
    TopNavbar,
    CustomFooter,
  },
  created() {
    if (this.$route.params.roomId) {
      this.link = `${window.location.origin}/conference?roomId=${this.$route.params.roomId}`;
    }
  },
  methods: {
    copy_invite_link() {
      this.$refs['invite_link'].select()
      this.$refs['invite_link'].setSelectionRange(0, 99999);
      document.execCommand("copy")
    },
    sendMessage() {
      this.channel.push('new_msg', { body: this.message });
      this.message = '';
    },
    connectToChat() {
      let presences = {};
      this.enterName = false;
      this.socket = new Socket('/socket', {
        params: { username: this.username },
      });
      this.socket.connect();

      this.channel = this.socket.channel('room:lobby', {});
      this.channel.on('new_msg', (payload) => {
        this.$store.commit('addMessage', { payload });
      });

      this.channel.on('presence_state', (state) => {
        presences = Presence.syncState(presences, state);
        this.assignUsers(presences);
      });

      this.channel.on('presence_diff', (diff) => {
        presences = Presence.syncDiff(presences, diff);
        this.assignUsers(presences);
      });

      this.channel
        .join()
        .receive('ok', (response) => {
          console.log('Joined successfully', response);
        })
        .receive('error', (response) => {
          console.log('Unable to join', response);
        });
    },
    assignUsers(presences) {
      const users = Presence
        .list(presences, (user, { metas }) => ({ name: user, online_at: metas[0].online_at }));
      this.$store.commit('addUsers', { users });
    },
    sendEmail() {
      const sendData = { to: this.attendee_email, date: this.time, link: this.link };
      if (this.attendee_email !== '') {
        this.$conference_http.post('/send-invite', sendData)
          .then((response) => {
            if (response.data.status === 'Ok') {
              this.$swal
                .fire({
                  text: 'Your Invite has been sent successfully',
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Okay',
                  icon: 'success',
                });
            }
          })
          .catch((error) => console.log(error));
      } else {
        this.$swal
          .fire({
            text: 'Please Enter Email Id',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Okay',
            icon: 'error',
          });
      }
    },
  },
};
</script>
<style scoped>
.right-side-bar {
  height: 520 px;
  width:100%;
  border-left: 1px solid #bfc8c5;
}
.right-side-box {
  height: 145px;
  width: 100%;
  border: 1px solid white;
}
.blue-right-box {
  height: 131px;
  margin-top: 6px;
  margin-bottom: 6px;
  border: 1px solid #ebf5f0;
  margin-left: 10px;
  margin-right: 10px;
  background-color: #ebf5f0;
}
</style>
