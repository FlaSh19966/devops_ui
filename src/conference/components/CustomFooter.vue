<template>
  <footer
    class="fixed-footer"
    style="display:table"
  >
    <div
      class="container text-center"
      style="display:table-row;"
    >
      <!-- <small>Copyright &copy; Your Website</small> -->
      <div
        class="footer-icon"
        style="width: 22%;"
      >
        <input
          type="range"
          min="1"
          max="100"
          value="70"
          id="myRange"
          class="slider"
          @mousemove='slideColorChange'
        >
        <!-- <input type="range"/> -->
      </div>
      <div
        class="footer-icon"
        style="width: 10%;"
        @click="invite_user"
      >
        <img
          src="./icons/Group 1.svg"
          alt
          style="height: 26px; width: 28%;
           margin-bottom: 4px;"
        />
        <p style="color: white; font-size: x-small">Invite Attendee</p>
      </div>
      <div
        class="footer-icon"
        style="width: 10%;"
        @click="return_to_chat"
      >
        <!-- <i class="fa fa-users" style="color:white; font-size:30px;
           -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: white; color: rgb(39, 60, 125);"></i> -->
        <img
          src="./icons/Group 3.svg"
          alt
          style="height: 26px; width: 28%;
           margin-bottom: 4px;"
        />
        <p style="color: white; font-size: x-small">Attendees</p>
      </div>
      <div
        class="footer-icon"
        style="width: 10%;"
      >
        <!-- <i class="fa fa-envelope" style="color:white; font-size:30px;
          -webkit-text-stroke-width: 1px; -webkit-text-stroke-color: white;
           color: rgb(39, 60, 125);"></i> -->
        <img
          src="./icons/Group 5.svg"
          alt
          style="height: 26px; width: 35%;
           margin-bottom: 4px;"
        />
        <p style="color: white; font-size: x-small">Chat</p>
      </div>
      <!-- <div
        class="footer-icon"
        style="width: 10%; cursor:pointer;"
        @click="share_screen_video_call_page"
      >
        <img
          src="./icons/Group 6.svg"
          alt
          style="height: 26px; width: 28%;
           margin-bottom: 4px;"
        />
        <p style="color: white; font-size: x-small">Start Sharing</p>
      </div> -->
      <div
        class="footer-icon"
        style="width: 10%;"
      >
        <!-- <i class="fa fa-lock" style="color:white; font-size:30px;
           -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: white; color: rgb(39, 60, 125);"></i> -->
        <img
          src="./icons/Group 8.svg"
          alt
          style="height: 26px; width: 28%;
           margin-bottom: 4px;"
        />
        <p style="color: white; font-size: x-small">Lock meeting</p>
      </div>
      <div
        class="footer-icon"
        style="width: 10%;"
      >
        <!-- <i class="fa fa-microphone" style="color:white; font-size:30px;
            -webkit-text-stroke-width: 1px; -webkit-text-stroke-color: white;
            color: rgb(39, 60, 125);"></i> -->
        <img
          src="./icons/Group 10.svg"
          alt
          style="height: 26px; width: 28%;
           margin-bottom: 4px;"
        />
        <p style="color: white; font-size: x-small">Start Recording</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      value: null,
    };
  },
  methods: {
    slideColorChange () {
      const x = document.getElementById('myRange').value;
      const color = `linear-gradient(90deg, rgb(255,255,255) ${x}%, rgb(19, 176, 204) ${x}%)`;
      document.getElementById('myRange').style.background = color;
    },
    share_screen_video_call_page () {
      this.$router.push({
        name: 'Video-Call',
        params: {
          startsharescreen: true,
        }
      });
    },
    invite_user () {
      this.$emit('invite_attendee')
    },
    return_to_chat () {
      if (window.localStorage.sessionId && this.$route.name!=='Video-Call') {
        this.$router.push({
          name: 'Video-Call',
          params: {
            roomId: window.localStorage.roomId,
            feedId: window.localStorage.feedId,
            clear_global_variables: true
          }
        })
      }
    }
  },
};
</script>

<style scoped>
.fixed-footer {
  background-color: rgb(39, 60, 125);
  height: 60px;
  width: 75%;
  position: fixed;
  bottom: 0;
}
.footer-icon {
  height: 50px;
  /* border: 1px solid black; */
  display: inline-block;
  cursor: pointer;
}
.slideContainer {
  width: 75%;
  margin-top: 200px;
}
.slider::after {
  color: white;
  font-size: 2rem;
  position: absolute;
  left: 80%;
  top: 26%;
}
.slider::before {
  color: white;
  font-size: 2rem;
  position: absolute;
  left: 12%;
  top: 26%;
}
.slider {
  -webkit-appearance: none;
  width: 40%;
  height: 4px;
  background: linear-gradient(
    90deg,
    rgb(255, 255, 255) 70%,
    rgb(19, 176, 204) 70%
  );
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  float: left;
  margin-top: 30px;
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
  background: rgb(39, 60, 125);
  border-radius: 100%;
  border: 6px solid white;
  /* outline-style: solid;
  outline-color: rgb(39, 60, 125); */
  /* box-shadow: rgb(39, 60, 125); */
}
.slider::-moz-range-thumb {
  appearance: none;
  width: 6px;
  height: 6px;
  background: rgb(39, 60, 125);
  border-radius: 100%;
  border: 6px solid white;
}
</style>
