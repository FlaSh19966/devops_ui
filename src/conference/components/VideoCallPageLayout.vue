<template>
  <div
    class="container-fluid pl-0 pr-0"
    style="min-height: 580px; display:table"
  >
    <nav class="navbar navbar-light pt-0 pb-0">
      <div style="display:table-row; width: 100%">
        <div style="display:table-cell; width:12%"><a
            class="navbar-brand"
            style="font-weight: 600"
            href="javascript:void(0)"
          >COLLABORATION</a></div>
        <div class="navbar-text">
          <small>Amit's Meeting Room</small></div>
        <div
          class="top-bar-icon"
          style="width: 5%; height: 5%;"
        >
          <img
            src="./icons/home.svg"
            alt
            style="height: 19%"
          />
        </div>
        <div
          class="top-bar-icon"
          style="width: 5%; height: 5%;"
        >
          <!-- <i class="fa fa-comment-o" style="font-size: x-large"></i> -->
          <img
            src="./icons/msg.svg"
            alt
            style="height: 19%;"
          />
        </div>
        <div
          class="top-bar-icon"
          style="width: 5%; height: 5%;"
        >
          <!-- <i class="fa fa-heart-o" style="font-size: x-large"></i> -->
          <img
            src="./icons/heart.svg"
            alt
            style="height: 19%;"
          />
        </div>
        <div
          class="top-bar-icon"
          style="width: 5%; height: 5%;"
        >
          <!-- <i class="fa fa-music" style="font-size: x-large"></i> -->
          <img
            src="./icons/music.svg"
            alt
            style="height: 19%;"
          />
        </div>
        <div
          class="top-bar-icon"
          style="width: 5%; height: 5%;"
        >
          <!-- <i class="fa fa-clock-o" style="font-size: x-large"></i> -->
          <img
            src="./icons/time.svg"
            alt
            style="height: 19%;"
          />
        </div>
        <div
          class="top-bar-icon"
          style="width: 5%; height: 5%;"
        >
          <!-- <i class="fa fa-user-o" style="font-size: x-large"></i> -->
          <img
            src="./icons/user.svg"
            alt
            style="height: 19%;"
          />
        </div>
        <div class="top-bar-icon">
          <div style="float: right; height: 22px; margin-right: 10px; margin-bottom: 8px;">
            <!-- <i class="fa fa-stop-circle-o" aria-hidden="true" style="float: right;
            margin-right: 10px; font-size:44px"></i> -->
            <img
              src="./icons/Group 152.svg"
              alt
              style="height: 151%; margin-top: 6px;"
            />
          </div>
        </div>
      </div>
    </nav>
    <!-- <div class="vl"></div> -->
    <div class="container-fluid pt-0 pl-0 pr-0">
      <div
        class="row"
        style="height: 105vh; width:100%; margin-left: 0px;"
      >
        <div style="width:75%">
          <div style="display:flex; width:100%">
            <template v-for="(item,index) in video_call_receiver_list">
              <template v-if="index<2">
                <div
                  class="video-elements-wrap"
                  :key="index"
                >
                  <div class="video-box">
                    <video
                      max-width="100%"
                      width="100%"
                      max-height="455px"
                      height="455px"
                      :id="'remoteVideo'+item.feedId"
                      autoplay
                    ></video>
                  </div>
                </div>
              </template>
            </template>
          </div>
          <div style="display:flex; width:100%; height: 125px;">
            <div style="display:flex; width:100%; height: 125px;">
              <div style="height: 125px; width: 82%;">
                <!-- <div style="height:75px;">
                  <div
                    style="width:40px; height:40px; margin-left: 59%;"

                  >

                  </div>
                </div> -->
                <div style="height:50px; display:flex; width:100%">
                  <div style="display:flex; width:100%">
                    <div
                      class="blue-circle-icon"
                      style="width:44%"
                    >
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value="70"
                        id="videocallslider"
                        class="slider"
                        @mousemove="slideColorChange"
                        style="margin-left: 48px;"
                      >
                    </div>
                    <div
                      class="blue-circle-icon"
                      style="width:6%"
                    >
                      <div class="blue-circle">
                        <img
                          src="./icons/Path 123.svg"
                          alt
                          style="height: 46%; margin-top: 10px;"
                        />
                      </div>
                    </div>
                    <div
                      class="blue-circle-icon"
                      style="width:6%"
                    >
                      <div class="blue-circle">
                        <img
                          src="./icons/Group 100.svg"
                          alt
                          style="height: 46%;
                         margin-top: 10px;"
                        />
                      </div>
                    </div>
                    <div
                      class="blue-circle-icon"
                      style="width:6%"
                    >
                      <div class="blue-circle">
                        <img
                          src="./icons/Group 101.svg"
                          alt
                          style="height: 46%;
                         margin-top: 10px;"
                        />
                      </div>
                    </div>
                    <div
                      class="blue-circle-icon"
                      style="width:6%"
                      v-if="display_end_call_button()"
                    >
                      <div
                        class="blue-circle"
                        id="hangupButton"
                        @click="hangupAction"
                        style="background-color: rgb(214, 28, 28);"
                      >
                        <img
                          src="./icons/Group 102.svg"
                          alt
                          style="height: 46%;"
                        />
                      </div>
                    </div>
                    <div
                      class="blue-circle-icon"
                      style="width:6%"
                    >
                      <div
                        class="blue-circle"
                        @click="share_video"
                      >
                        <img
                          src="./icons/Path 73.svg"
                          alt
                          style="height: 46%;
                            margin-top: 10px;"
                        />
                      </div>
                    </div>
                    <div
                      class="blue-circle-icon"
                      style="width:6%"
                    >
                      <div
                        class="blue-circle"
                        @click="share_screen"
                      >
                        <img
                          src="./icons/Group 151.svg"
                          alt
                          style="height: 46%;
                            margin-top: 10px;"
                        />
                      </div>
                    </div>
                    <div
                      class="blue-circle-icon"
                      style="width:6%"
                    >
                      <div class="blue-circle">
                        <img
                          src="./icons/Path 109.svg"
                          alt
                          style="height: 46%; margin-top: 10px;"
                        />
                      </div>
                    </div>
                    <div
                      class="blue-circle-icon"
                      style="width:20%"
                    >
                    </div>
                  </div>
                </div>
              </div>
              <div style="display:table-cell; width:18%; height: 125px">
                <!-- <video width="80%" height="103" controls>
                  <source src="./product.mp4" type="video/mp4">
                </video> -->
                <video
                  max-width="80%"
                  width="80%"
                  height="103px"
                  id="localVideo"
                  autoplay
                  playsinline
                  muted
                ></video>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-md-3 pl-0 pr-0"
          style="width:25%; border-left: 1px solid #bfc8c5;"
        >
          <!-- <div class="right-side-bar"> -->
          <div
            class="right-side-bar"
            v-for="(item,index) in video_call_receiver_list"
            :key="index"
          >
            <template v-if="index>=2">
              <video
                style="height:131px;width:100px"
                autoplay
                draggable="true"
                @dragstart="video_drag_started"
                :id="'remoteVideo'+item.feedId"
              ></video>
            </template>
          </div>
          <div
            class="right-side-bar"
            v-if="video_call_receiver_list.length<=2"
          >
            <div
              class="right-side-box"
              @click="invite_user"
            >
              <div class="blue-right-box">
                <img
                  src="./icons/Group 154.svg"
                  alt
                  style="height: 64%; margin-top: 23px;"
                />
              </div>
            </div>
          </div>
          <div
            class="right-side-bar"
            v-if="video_call_receiver_list.length<=3"
          >
            <div
              class="right-side-box"
              @click="invite_user"
            >
              <div class="blue-right-box">
                <img
                  src="./icons/Group 154.svg"
                  alt
                  style="height: 64%; margin-top: 23px;"
                />
              </div>
            </div>
          </div>
          <div
            class="right-side-bar"
            v-if="video_call_receiver_list.length<=4"
          >
            <div
              class="right-side-box"
              @click="invite_user"
            >
              <div class="blue-right-box">
                <img
                  src="./icons/Group 154.svg"
                  alt
                  style="height: 64%; margin-top: 23px;"
                />
              </div>
            </div>
          </div>
          <div
            class="right-side-bar"
            v-if="video_call_receiver_list.length<=5"
          >
            <div
              class="right-side-box"
              @click="invite_user"
            >
              <div class="blue-right-box">
                <img
                  src="./icons/Group 154.svg"
                  alt
                  style="height: 64%; margin-top: 23px;"
                />
              </div>
            </div>
          </div>
          <!-- </div> -->
        </div>
      </div>
    </div>
    <custom-footer @invite_attendee="invite_user"></custom-footer>
  </div>
</template>
<script>
import 'adapter';
import CustomFooter from './CustomFooter.vue';
import { Socket } from 'phoenix-socket'

export default {
  data () {
    return {
      localvideoStream: null,
      videoSender: null,
      audioSender: null,
      localscreenStream: null,
      video_call_receiver_list: [{ video: 1, feedId: 0 }],
      localConnection: null,
      remoteConnection: {},
      janusConnection: null,
      phoenixConnection: null,
      sessionChannel: null,
      roomChannel: null,
      sessionId: null,
      handleId: null,
      roomId: null,
      room_joined: false,
      feedId: null,
      CONFIG: {
        audio: true,
        video: true,
        iceServers: [
          {
            urls: process.env.VUE_APP_TURN_SERVER_END_POINT,
            username: 'username1',
            credential: 'password1',
          },
        ],
      },
      process_id: null,
      session_process_id: null,
      room_creator: false
    };
  },
  components: {
    CustomFooter,
  },
  /* eslint-disable*/
  methods: {
    hangupAction () {
      // this.$conference_http.post('/cense-streaming/unpublish-feed', {
      //   unpublish_feed: true,
      //   pid: this.process_id
      // })
      this.$conference_http.post('/cense-streaming/leave-feed', {
        leave_feed: true,
        pid: this.process_id
      })
    },
    invite_user () {
      window.localConnectionData = {
        localConnection: this.localConnection,
        videoSender: this.videoSender,
        audioSender: this.audioSender,
        screenStream: this.localscreenStream
      }
      this.$router.push({
        name: 'Invitation',
        params: {
          roomId: this.roomId,
          feedId: this.feedId
        }
      })
    },
    slideColorChange () {
      const x = document.getElementById('videocallslider').value;
      const color = `linear-gradient(90deg, rgb(39, 60, 125) ${x}%, rgb(41, 38, 38) ${x}%)`;
      document.getElementById('videocallslider').style.background = color;
    },
    video_drag_started () {

    },
    share_video () {
      var camVideoTrack = this.localvideoStream.getVideoTracks()[0];
      camVideoTrack.enabled = true
      this.videoSender.replaceTrack(camVideoTrack)
    },
    share_screen () {
      var displayMediaOptions = {
        video: {
          cursor: "always"
        },
        audio: false
      };
      navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
        .then(stream => {
          this.localscreenStream = stream;
          var screenVideoTrack = this.localscreenStream.getVideoTracks()[0];
          screenVideoTrack.onended = () => {
            var localVideoTrack = this.localvideoStream.getVideoTracks()[0];
            this.videoSender.replaceTrack(localVideoTrack)
          }
          this.videoSender.replaceTrack(screenVideoTrack)
        })
    },
    create_session () {
      this.$conference_http.post('/cense-streaming/create-session', {
        create_new_session: true,
        create_room: this.roomId === null ? true : false,
        join_as_publisher: true
      }).then(({ data }) => {
        if (data.status === "Ok") {
          this.sessionId = data.message.session_id
          this.handleId = data.message.plugin_id
          this.process_id = data.message.pid
          this.session_process_id = data.message.sid
          if (data.message.room_id) {
            this.roomId = data.message.room_id
            this.room_creator = true
          }

          window.localStorage.setItem("sessionId", this.sessionId)
          window.localStorage.setItem("handleId", this.handleId)
          window.localStorage.setItem("session_pid", this.session_process_id)
          window.localStorage.setItem("handle_pid", this.process_id)
          window.localStorage.setItem("roomId", this.roomId)
          window.localStorage.setItem("room_creator", this.room_creator)
          this.initialize_websockets()
        }
      })
    },
    verify_session () {
      this.$conference_http.post('/cense-streaming/verify-state', {
        verify_session: true,
        sid: this.session_process_id,
        pid: this.process_id,
        room: this.roomId
      })
        .then(({ data }) => {
          if (data.status === "Ok") {
            this.initialize_websockets()
          } else if (data.status === "Error") {
            this.feedId = null
            if (data.message === "Invalid session") {
              this.roomId = null
              this.create_session()
            } else if (data.message === "Invalid handle") {
              this.create_handle('publish')
            } else if (data.message === "Invalid room") {
              this.roomId = data.new_room
              this.room_creator = true
              window.localStorage.setItem("roomId", this.roomId)
              window.localStorage.setItem("room_creator", this.room_creator)
              this.initialize_websockets()
            }
          }
        })
    },
    create_handle (type, feedId) {
      if (type === 'subscribe') {
        this.$conference_http.post('/cense-streaming/create-handle', {
          create_handle: true,
          create_room: false,
          pid: this.session_process_id
        }).then(({ data }) => {
          this.join_broadcast(feedId, data.pid)
        })
      } else if (type === 'publish') {
        this.$conference_http.post('/cense-streaming/create-handle', {
          create_handle: true,
          pid: this.session_process_id,
          create_room: true
        }).then(({ data }) => {
          this.roomId = data.room
          this.room_creator = true
          this.process_id = data.pid
          this.handleId = data.plugin_id
          window.localStorage.setItem("roomId", this.roomId)
          window.localStorage.setItem("handle_pid", this.process_id)
          window.localStorage.setItem("handleId", this.handleId)

          this.initialize_websockets()
        })
      }
    },
    create_feed () {
      this.$conference_http.post('/cense-streaming/create-feed', {
        create_feed: true,
        pid: this.process_id,
        room_id: this.roomId,
        ptype: "publisher",
        feed_id: null
      })
    },
    initialize_websockets () {
      this.sessionChannel = this.phoenixConnection.channel(`session_id:${this.sessionId}`)
      this.sessionChannel.join()

      this.sessionChannel.on("initialize_conference_now", ({ joined }) => {
        if (joined) {
          this.sessionChannel.on("feed_created", ({ feed_id }) => {
            window.localStorage.removeItem("feedId")
            window.localStorage.setItem("feedId", feed_id)
            this.feedId = feed_id
            this.start_broadcast()
          })

          this.sessionChannel.on("set_remote_description", ({ jsep }) => {
            this.localConnection.setRemoteDescription(new RTCSessionDescription(jsep));
            this.$conference_http.post('/cense-streaming/list-participants', {
              list_participants: true,
              pid: this.process_id,
              room_id: this.roomId
            }).then(({ data }) => {
              data.participants_list.forEach((participant) => {
                if (participant.id !== this.feedId) {
                  this.add_video_frame(participant.id)
                }
              })
            })
            setTimeout(() => {
              this.roomChannel.push("new_publisher_joined", { feed_id: this.feedId, sender: this.handleId })
            }, 500)
          })

          this.sessionChannel.on("unpublish_successful", () => {
            if (this.room_creator) {
              this.$conference_http.post('/cense-streaming/destroy-room', {
                destroy_room: true,
                pid: this.process_id,
                room: this.roomId
              })
            } else {
              this.clear_all_videos()
            }
          })

          this.sessionChannel.on("feed_left_successfully", ({ feed_id }) => {
            if (this.room_creator) {
              this.$conference_http.post('/cense-streaming/destroy-room', {
                destroy_room: true,
                pid: this.process_id,
                room: this.roomId
              })
            } else {
              this.clear_all_videos()
            }
          })

          this.sessionChannel.on("close_this_feed", ({ feed_id }) => {
            var temp_receivers_list = this.video_call_receiver_list
            if (this.remoteConnection[feed_id]) {
              this.remoteConnection[feed_id].close()
            }
            if (this.video_call_receiver_list.length === 1) {
              this.clear_all_videos()
            } else {
              this.video_call_receiver_list = temp_receivers_list.filter((video) => {
                return video.feedId !== feed_id
              })
            }
          })

          var vm = this
          this.sessionChannel.on("feed_joined", ({ feed_id, jsep, pid }) => {
            this.remoteConnection[feed_id].setRemoteDescription(new RTCSessionDescription(jsep));
            this.remoteConnection[feed_id].createAnswer().then(function (answer) {
              vm.remoteConnection[feed_id].setLocalDescription(answer);
              vm.$conference_http.post('/cense-streaming/subscribe-feed', {
                subscribe_feed: true,
                pid: pid,
                room_id: vm.roomId,
                feed_id: feed_id,
                jsep: answer
              })
            });
          })
          this.sessionChannel.on("room_created", ({ room_id }) => {
            this.roomId = room_id
            window.localStorage.setItem("roomId", this.roomId)
          })

          this.roomChannel = this.phoenixConnection.channel(`room_id:${this.roomId}`, {
            session: this.sessionId
          })
          this.roomChannel.join()

          this.roomChannel.on("initialize_room_now", ({ joined }) => {
            if (Boolean(joined) && !this.room_joined) {
              this.room_joined = true
              if (!this.feedId) {
                this.create_feed()
              } else {
                if (!this.$route.params.clear_global_variables) {
                  this.start_broadcast('feed_already_exists')
                }
              }

              this.roomChannel.on("add_this_feed", ({ feed_id, sender }) => {
                if (this.feedId && feed_id !== this.feedId && sender != this.handleId) {
                  this.add_video_frame(feed_id)
                }
              })

              this.roomChannel.on("room_destroyed", () => {
                this.clear_all_videos()
                this.roomId = null
                this.feedId = null
                this.disconnect_websockets()
                if (this.room_creator) {
                  this.create_session()
                }
              })
            }
          })


        }
      })
    },
    add_video_frame (feedId) {
      if (!document.getElementById(`remoteVideo${feedId}`)) {
        if (this.video_call_receiver_list.length === 1 && this.video_call_receiver_list[0].feedId === 0) {
          this.video_call_receiver_list[0].feedId = feedId
        } else {
          this.video_call_receiver_list.push({
            video: 1,
            feedId: feedId
          })
        }
        if (!this.remoteConnection[feedId]) {
          this.create_handle('subscribe', feedId)
        }
      }
    },
    clear_all_videos () {
      var local_receivers_list = this.video_call_receiver_list
      local_receivers_list.forEach((video, index) => {
        if (this.remoteConnection[video.feedId]) {
          this.remoteConnection[video.feedId].close()
        }
      })

      this.video_call_receiver_list = this.$options.data().video_call_receiver_list
      setTimeout(() => {
        const remoteVideo = document.getElementById('remoteVideo0');
        remoteVideo.pause()
        remoteVideo.srcObject.getTracks().forEach(track => {
          track.stop()
          remoteVideo.srcObject.removeTrack(track)
        })
        remoteVideo.load()
      }, 500)
      this.remoteConnection = {}
    },
    start_broadcast (msg) {
      var vm = this
      if (!this.audioSender) {
        var camAudioTrack = this.localvideoStream.getAudioTracks()[0];
        this.audioSender = this.localConnection.addTrack(camAudioTrack, this.localvideoStream);
        var camVideoTrack = this.localvideoStream.getVideoTracks()[0];
        this.videoSender = this.localConnection.addTrack(camVideoTrack, this.localvideoStream);
        camVideoTrack.enabled = false
      }

      this.localConnection.createOffer().then(function (offer) {
        vm.localConnection.setLocalDescription(offer);
        if (msg === 'feed_already_exists') {
          vm.$conference_http.post('/cense-streaming/configure-feed', {
            join_feed: true,
            pid: vm.process_id,
            room_id: vm.roomId,
            jsep: offer
          }).then(({ data }) => {
          })
        } else {
          vm.$conference_http.post('/cense-streaming/publish-feed', {
            join_feed: true,
            pid: vm.process_id,
            room_id: vm.roomId,
            jsep: offer
          }).then(({ data }) => {
          })
        }
      });
    },
    on_ice_candidate (event) {
      this.$conference_http.post('/cense-streaming/trickle', {
        pid: this.process_id,
        event: event.candidate
      })
    },
    on_track (event) {
      const localVideo = document.getElementById('localVideo');
      localVideo.srcObject = event.streams[0];
    },
    join_broadcast (feedId, pid) {
      this.remoteConnection[feedId] = new RTCPeerConnection(this.CONFIG);
      this.remoteConnection[feedId].onicecandidate = ((event) => {
        this.$conference_http.post('/cense-streaming/trickle', {
          pid: pid,
          event: event.candidate
        })
      });
      this.remoteConnection[feedId].ontrack = (event) => {
        const remoteVideo = document.getElementById(`remoteVideo${feedId}`);
        remoteVideo.srcObject = event.streams[0];
      }
      this.$conference_http.post('/cense-streaming/create-feed', {
        create_feed: true,
        pid: pid,
        room_id: this.roomId,
        ptype: "subscriber",
        feed_id: feedId
      })
    },
    display_end_call_button () {
      var attendees = this.video_call_receiver_list.filter(video => video.feedId !== 0)
      return attendees.length
    },
    disconnect_websockets (is_destroy) {
      this.sessionChannel.leave()
      this.roomChannel.leave()
      this.room_joined = false
      if (is_destroy) {
        this.phoenixConnection.disconnect()
      }
    }
  },
  mounted () {
    var vm = this
    navigator.mediaDevices.getUserMedia(this.CONFIG).then(function (stream) {
      const localVideo = document.getElementById('localVideo');
      localVideo.srcObject = stream.clone()
      if (vm.$route.params.clear_global_variables) {
        vm.localConnection = window.localConnectionData.localConnection
        vm.videoSender = window.localConnectionData.videoSender
        vm.audioSender = window.localConnectionData.audioSender
        vm.localscreenStream = window.localConnectionData.screenStream
        window.localConnectionData = null
      } else {
        vm.localConnection = new RTCPeerConnection(vm.CONFIG);
      }


      vm.localConnection.onicecandidate = vm.on_ice_candidate;
      vm.localConnection.ontrack = vm.on_track;
      vm.localvideoStream = stream

      if (window.localStorage.getItem("session_pid") && window.localStorage.getItem("handle_pid")) {
        vm.session_process_id = window.localStorage.getItem("session_pid")
        vm.process_id = window.localStorage.getItem("handle_pid")
        vm.sessionId = Number(window.localStorage.getItem("sessionId"))
        vm.roomId = Number(window.localStorage.getItem("roomId"))
        vm.handleId = Number(window.localStorage.getItem("handleId"))
        vm.feedId = Number(window.localStorage.getItem("feedId"))
        vm.room_creator = window.localStorage.getItem("room_creator") == "true" ? true : false
        vm.verify_session()
      } else {
        vm.create_session()
      }
    });
  },
  created () {
    this.phoenixConnection = new Socket(process.env.VUE_APP_VIDEO_CONFERENCING_WEBSOCKET_ENDPOINT, { params: { video_session: true } })
    this.phoenixConnection.connect()

    if (this.$route.query.roomId) {
      this.roomId = Number(this.$route.query.roomId);
      this.room_creator = false
      window.localStorage.setItem("roomId", this.roomId)
      window.localStorage.setItem("room_creator", false)
    } else if (this.$route.params.roomId) {
      this.roomId = this.$route.params.roomId;
      this.feedId = this.$route.params.feedId;
    }

    var vm = this
  },
  beforeDestroy () {
    this.disconnect_websockets(true)
  }
};
</script>

<style scoped>
.video-elements-wrap {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  height: 455px;
}
.box > * {
  flex: 1 1 10%;
}
.navbar-light {
  border-bottom: 1px solid #bfc8c5;
  height: 57px;
}
.top-bar-icon {
  height: 8px;
  display: table-cell;
}
.navbar-text {
  display: table-cell;
  width: 20%;
  text-align: left;
  padding-left: 1%;
}
.right-side-bar {
  height: 520 px;
  width: 100%;
}
.right-side-box {
  height: 145px;
  width: 100%;
  border: 1px solid white;
  cursor: pointer;
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
.video-box {
  /* display: table-cell; */
  width: 100%;
  height: 455px;
  /* border: 1px solid black; */
}
.blue-circle-icon {
  height: 50px;
  /* border: 1px solid black; */
  /* display: table-cell; */
  width: 10%;
}
.slideContainer {
  width: 75%;
  margin-top: 200px;
}
.slider::after {
  color: black;
  font-size: 2rem;
  position: absolute;
  left: 80%;
  top: 26%;
}
.slider::before {
  color: rgb(39, 60, 125);
  font-size: 2rem;
  position: absolute;
  left: 12%;
  top: 26%;
}
.slider {
  -webkit-appearance: none;
  width: 26%;
  height: 4px;
  background: linear-gradient(90deg, rgb(39, 60, 125) 70%, rgb(41, 38, 38) 70%);
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  float: left;
  margin-top: 23px;
  margin-left: 30px;
}
.slider:hover {
  opacity: 1;
}
.slider::-webkit-slider-thumb {
  -webkit-apperance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background: white;
  border-radius: 100%;
  border: 6px solid rgb(39, 60, 125);
  /* outline-style: solid;
  outline-color: rgb(39, 60, 125); */
  /* box-shadow: rgb(39, 60, 125); */
}
.slider::-moz-range-thumb {
  appearance: none;
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 100%;
  border: 6px solid rgb(39, 60, 125);
}
.blue-circle {
  border-radius: 50%;
  /* border: 1px solid black; */
  height: 70%;
  width: 78%;
  margin-left: 3px;
  background: rgb(39, 60, 125);
  cursor: pointer;
}
</style>
