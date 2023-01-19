<template>
  <div>
    <header>
      <nav class="navbar navbar-light">
        <a
            class="navbar-brand" style="font-weight: 600"
            href="javascript:void(0)"
        >COLLABORATION</a>
        <small class="navbar-text">Amit's Meeting Room</small>
      </nav>
        <!-- <div class="vl"></div> -->
    </header>
    <div style="width:100%">
      <div style="display:flex; width: 100%">
        <div class="left-side-contact-name">
          <div v-for="(item, index) in contact_list" :key="index">
            <div style="height: 52px; width: 95%; margin-top: 24px; margin-left: 12px;">
              <div class="left-side-photo-circle">
                <img src=""/>
              </div>
              <div class="name-bar">
                <p style="font-size: 14px; margin-top: 14px; text-align: left;
                margin-left: 5px;"> {{item.name}} </p>
              </div>
            </div>
          </div>
          <!-- <div style="height: 52px; width: 100%; margin-top: 24px;">
            <div class="photo-circle"></div>
            <div class="name-bar">
              <p style="font-size: 14px; margin-top: 14px; text-align: left"> Iron Man </p>
            </div>
          </div>
          <div style="height: 52px; width: 100%; margin-top: 24px;">
            <div class="photo-circle"></div>
            <div class="name-bar">
              <p style="font-size: 14px; margin-top: 14px; text-align: left"> Dead Pool </p>
            </div>
          </div> -->
        </div>
        <div style="width:60%; height:580px">
          <div style="width:100%; height:80px; background-color: rgb(39, 60, 125);
          border: 1px solid rgb(39, 60, 125);">
            <div style="height: 52px; width: 40%; margin-top: 14px; float:left">
              <div class="receiver-photo-circle">
                <img src=""/>
              </div>
              <div class="receiver-name-bar">
                <p style="font-size: 14px; margin-top: 14px; text-align: left;
                color: white;"> {{ receiver_info.name }} </p>
              </div>
            </div>
            <div style="width:34%; height:52px; float:right; margin-top: 12px;">
              <div class="icon-circle" style="margin-left: 30px; background-color: white">
                <button id="startButton" style="margin-top: 1px; margin-left: 2px; height:100%;
                 border-radius: 50%;border: 1px solid white; background-color: white;"
                 @click="videoCall">
                  <!-- <i class="fa fa-video-camera fa-2x" style="-webkit-text-stroke-width: 1px;
                    -webkit-text-stroke-color: black;
                    color: white;"></i> -->
                    <img src="./icons/Path 73.svg" alt style="height: 40%;
                      margin-bottom: 4px;"/>
                </button>
              </div>
              <div class="icon-circle" style="background-color: white">
                <!-- <i class="fa fa-phone fa-2x" style="color: black; margin-top: 10px;
                   margin-left: 2px;"></i> -->
                  <img src="./icons/Group 83.svg" alt style="height: 45%; margin-top: 14px;
                    margin-left: 1px;"/>
              </div>
              <div class="icon-circle" style="background-color: white">
                  <!-- <i class="fa fa-user-plus fa-2x" style="color: black; margin-top: 8px;
                   margin-left: 8px;"></i> -->
                  <img src="./icons/Group 84.svg" alt style="height: 57%; margin-top: 10px;
                    margin-left: 3px;"/>
              </div>
            </div>
          </div>
          <div style="border-right: 1px solid #bfc8c5; border-left: 1px solid #bfc8c5;
          height: 500px">
            <div style="height: 410px; width:100%;"></div>
            <div class="chat-bar">
              <div class="message-circle">
                  <!-- <i class="fa fa-paper-plane fa-2x" aria-hidden="true"
                   style="margin-top: 14px; margin-right: 4px; color: white;"></i> -->
                  <img src="./icons/Group 96.svg" alt style="height: 51%; margin-top: 15px;
                    margin-right: 3px;"/>
              </div>
            </div>
          </div>
        </div>
        <div style="width:20%; height:580px">
          <div style="width:100%; height:80px; border-bottom: 1px solid #bfc8c5">
            <p style="position: absolute; font-size: 21px; margin-top: 23px; margin-left: 15px;
            font-weight: bold; color: black;"> ADD USERS </p>
          </div>
          <div class="add-user-wrap">
            <div v-for="(item, index) in add_user_list" :key="index">
              <div class="add-user-by-photo">
                <div style="width:22px; height:22px; border-radius:50%;
                  margin-left: 69px; margin-top: 27px; z-index: 10; position:absolute;
                  margin-bottom: 58px;">
                  <img src="./icons/Group 85.svg" alt style="height: 100%; margin-bottom: 5px;"/>
                </div>
                <div class="right-side-photo-circle">
                  <img src=""/>
                </div>
              </div>
            </div>
            <!-- <div class="right-side-photo-circle"></div>
            <div class="right-side-photo-circle"></div>
            <div class="right-side-photo-circle"></div>
            <div class="right-side-photo-circle"></div>
            <div class="right-side-photo-circle"></div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { bus } from '@/main';

export default {
  data() {
    return {
      contact_list: [{ name: 'SpiderMan', photo: 'pic' },
        { name: 'IronMan', photo: 'pic' },
        { name: 'DeadPool', photo: 'pic' },
        { name: 'Thor', photo: 'pic' },
        { name: 'Thanos', photo: 'pic' },
        { name: 'SpiderMan', photo: 'pic' },
        { name: 'IronMan', photo: 'pic' },
        { name: 'DeadPool', photo: 'pic' },
        { name: 'Thor', photo: 'pic' },
        { name: 'Thanos', photo: 'pic' },
        { name: 'SpiderMan', photo: 'pic' },
        { name: 'IronMan', photo: 'pic' },
        { name: 'DeadPool', photo: 'pic' },
        { name: 'Thor', photo: 'pic' },
        { name: 'Thanos', photo: 'pic' }],
      add_user_list: [{ photo: 'pic' },
        { photo: 'pic' },
        { photo: 'pic' },
        { photo: 'pic' },
        { photo: 'pic' },
        { photo: 'pic' },
        { photo: 'pic' },
        { photo: 'pic' },
      ],
      receiver_info: { name: 'SpiderMan', photo: 'pic' },
      localPeerConnection: null,
    };
  },
  methods: {
    videoCall() {
      console.log('video-call');
      // bus.$emit('startAction');
      const startButton = document.getElementById('startButton');
      this.$router.push({ name: 'Video-Call', params: { startvideo: startButton } });
      // const data = 'Video Calling';
      // bus.$emit('Start-Video-Call', startButton);
      // this.$router.push('/conference/video-call');
      console.log('after bus');
    },
  },
};
</script>

<style scoped>
.add-user-wrap {
  width:100%;
  height:500px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  max-height: 580px;
}
.add-user-wrap>* {
    flex: 0 0 50%;
}
.add-user-by-photo {
  max-height: 100px;
  position: relative;
}
.navbar-light {
  border-bottom: 1px solid #bfc8c5;
}
.chat-bar {
  height: 75px;
  width:90%;
  margin-left: 5%;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}
.left-side-contact-name {
    width:20%;
    height:580px;
    overflow-y: auto;
}
.icon-circle {
    height: 100%;
    width: 20%;
    /* border: 1px solid black; */
    float:left;
    margin-left: 20px;
    border-radius: 50%;
}
.name-bar {
    height: 52px;
    width: 68%;
    float:right;
    margin-right: 10px;
}
.right-side-photo-circle {
    height: 75px;
    width: 58%;
    border: 1px solid black;
    float:left;
    margin-left: 15px;
    border-radius: 50%;
    margin-top: 20px;
    margin-right: 26px;
}
.message-circle {
    height: 64px;
    width: 9%;
    float:right;
    margin-right: 10px;
    border-radius: 50%;
    margin-top: 6px;
    background-color: rgb(39, 60, 125);
}
.left-side-photo-circle {
  height: 100%;
  width: 22%;
  border: 1px solid black;
  float:left;
  margin-left: 10px;
  border-radius: 50%;
}
.receiver-photo-circle {
  height: 100%;
  width: 17%;
  border: 1px solid black;
  float:left;
  margin-left: 20px;
  border-radius: 50%;
}
.receiver-name-bar {
  height: 52px;
  width: 68%;
  float:right;
  margin-right: 18px;
}
</style>
