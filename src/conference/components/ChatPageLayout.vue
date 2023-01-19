<template>
  <div class="container-fluid pl-0 pr-0" style="min-height: 580px; display:table">
    <nav class="navbar navbar-light pt-0 pb-0">
      <div style="display:table-row; width: 100%">
        <div style="display:table-cell; width:12%"><a
          class="navbar-brand" style="font-weight: 600"
          href="javascript:void(0)"
        >COLLABORATION</a></div>
        <div class="navbar-text">
          <small>Amit's Meeting Room</small></div>
        <div class="top-bar-icon" style="width: 5%; height: 5%;">
          <!-- <i class="fa fa-home" style="font-size: x-large; -webkit-text-stroke-width: 1px;
           -webkit-text-stroke-color: black; color: white;"></i> -->
          <img src="./icons/home.svg" alt style="height: 19%"/>
        </div>
        <div class="top-bar-icon" style="width: 5%; height: 5%;">
          <!-- <i class="fa fa-comment-o" style="font-size: x-large"></i> -->
          <img src="./icons/msg.svg" alt style="height: 19%;"/>
        </div>
        <div class="top-bar-icon" style="width: 5%; height: 5%;">
          <!-- <i class="fa fa-heart-o" style="font-size: x-large"></i> -->
          <img src="./icons/heart.svg" alt style="height: 19%;"/>
        </div>
        <div class="top-bar-icon" style="width: 5%; height: 5%;">
          <!-- <i class="fa fa-music" style="font-size: x-large"></i> -->
          <img src="./icons/music.svg" alt style="height: 19%;"/>
        </div>
        <div class="top-bar-icon" style="width: 5%; height: 5%;">
          <!-- <i class="fa fa-clock-o" style="font-size: x-large"></i> -->
          <img src="./icons/time.svg" alt style="height: 19%;"/>
        </div>
        <div class="top-bar-icon" style="width: 5%; height: 5%;">
          <!-- <i class="fa fa-user-o" style="font-size: x-large"></i> -->
          <img src="./icons/user.svg" alt style="height: 19%;"/>
        </div>
        <div class="top-bar-icon">
          <div style="float: right; height: 22px; margin-right: 10px; margin-bottom: 8px;">
            <!-- <i class="fa fa-stop-circle-o" aria-hidden="true" style="float: right;
            margin-right: 10px; font-size:44px"></i> -->
            <img src="./icons/Group 152.svg" alt style="height: 151%; margin-top: 6px;"/>
          </div>
        </div>
      </div>
    </nav>
    <div class="container-fluid pt-0 pl-0 pr-0">
      <div class="row" style="height: 580px; width:100%; margin-left: 0px;">
        <div style="width:75%; height: 530px">
            <div style="float: left; width: 5%; height: 40px; margin-left: 15px;
            margin-top: 15px; border-radius:50%">
            <button style="border-radius: 50%; height: 40px; background-color: white;
            border: 1px solid white; padding-left: 0; padding-right: 0;">
              <!-- <i class="fa fa-arrow-left"></i> -->
              <img src="./icons/left_arrow.svg" alt style="height: 100%;"/>
            </button>
            </div>
          <div style="display=flex; width:100%; height:280px">
              <div class="chat-pop-div">
                <div v-for="(item, index) in chat_popover_list" :key="index">
                  <div class="chat-pop-circle-name-bar">
                      <div class="chat-pop-circle">
                        <img src=""/>
                      </div>
                      <div class="chat-pop-name-bar">
                        <p data-toggle="popover" :id="'popover_id'+index" style="cursor:pointer;
                          font-size: 20px; margin-top: 14px; text-align: center" >{{item.name}}</p>
                      </div>
                  </div>
                </div>
              </div>
          </div>
          <div style="display=flex; width:100%; height:250px">
              <div class="muted-text">
                  <p style="font-size: 27px; margin-left: 30px; text-align: left;">Muted</p>
              </div>
              <div class="muted-div" id="muted-container">
                <div v-for="(item, index) in contact_list" :key="index">
                    <div class="photo-name-bar">
                      <div class="photo-circle">
                         <img src=""/>
                      </div>
                      <div class="name-bar">
                      <p style="font-size: 14px; margin-top: 14px; text-align: left">
                          {{item.name}} </p>
                      </div>
                    </div>
                </div>
              </div>
          </div>
          <div style="display:table; width:100%">
            <div style="display:table-row">
              <div style="display:table-cell; height: 50px">
                <div style="height:50px; display:flex; width:100%">
                  <div style="display:flex; width:100%">
                    <div class="blue-circle-icon" style="width:44%">
                      <input type="range" min="1" max="100" value="70" id="videocallslider"
                      class="slider" @mousemove='slideColorChange' style="margin-left: 48px;">
                    </div>
                    <div class="blue-circle-icon" style="width:6%">
                      <div class="blue-circle">
                        <!-- <i class="fa fa-thumbs-o-up" aria-hidden="true" style="color: white;
                        margin-top: 8px;"></i> -->
                        <img src="./icons/Path 123.svg" alt style="height: 46%; margin-top: 10px;"/>
                      </div>
                    </div>
                    <div class="blue-circle-icon" style="width:6%">
                      <div class="blue-circle">
                        <!-- <i class="fa fa-lightbulb-o" aria-hidden="true" style="color: white;
                        margin-top: 8px;"></i> -->
                        <img src="./icons/Group 100.svg" alt style="height: 46%;
                         margin-top: 10px;"/>
                      </div>
                    </div>
                    <div class="blue-circle-icon" style="width:6%">
                      <div class="blue-circle">
                        <!-- <i class="fa fa-microphone" aria-hidden="true" style="color: white;
                        margin-top: 8px;"></i> -->
                        <img src="./icons/Group 101.svg" alt style="height: 46%;
                         margin-top: 10px;"/>
                      </div>
                    </div>
                    <div class="blue-circle-icon" style="width:6%">
                      <div class="blue-circle">
                        <!-- <i class="fa fa-phone" aria-hidden="true" style="color: white;
                        margin-top: 8px;"></i> -->
                        <img src="./icons/Group 102.svg" alt style="height: 46%;
                         margin-top: 10px;"/>
                      </div>
                    </div>
                    <div class="blue-circle-icon" style="width:6%">
                      <div class="blue-circle" style="cursor: pointer;"
                       @click="share_screen_video_call_page">
                        <!-- <i class="fa fa-share-square" aria-hidden="true" style="color: white;
                        margin-top: 8px;"></i> -->
                        <img src="./icons/Group 151.svg" alt style="height: 46%;
                         margin-top: 10px;"/>
                      </div>
                    </div>
                    <div class="blue-circle-icon" style="width:6%">
                      <div class="blue-circle">
                        <!-- <i class="fa fa-thumbs-o-down" aria-hidden="true" style="color: white;
                        margin-top: 8px;"></i> -->
                        <img src="./icons/Path 109.svg" alt style="height: 46%; margin-top: 10px;"/>
                      </div>
                    </div>
                    <div class="blue-circle-icon" style="width:20%">
                    </div>
                  </div>
                </div>
              </div>
              <div style="display:table-cell; width:18%; height: 50px">
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 pl-0 pr-0" style="width:25%; border-left: 1px solid #bfc8c5;">
          <div style="height:530px">
            <div class="tabs">
            <div class="tab-2">
              <label for="tab2-1">Users</label>
              <input id="tab2-1" name="tabs-two" type="radio" checked="checked">
              <div style="display: block; overflow:auto;" >
              <!-- position: fixed; bottom: 20px;
                width: 25%;" -->
                <div class="chat-sender"></div>
                <div style="display:flex; width:100%">
                  <div class="receiver-photo">
                    <img src=""/>
                  </div>
                  <div class="chat-receiver"><p>users</p></div>
                </div>
              </div>
            </div>
            <div class="tab-2">
              <label for="tab2-2">Groups</label>
              <input id="tab2-2" name="tabs-two" type="radio">
              <div style="display: block; overflow:auto;">
                 <!-- position: fixed; bottom: 20px;
                width: 25%; margin-left: -8.2%;"> -->
                <div class="chat-sender"></div>
                <div style="display:flex; width:100%">
                  <div class="receiver-photo">
                    <img src=""/>
                  </div>
                  <div class="chat-receiver"><p>groups</p></div>
                </div>
              </div>
            </div>
            <div class="tab-2">
              <label for="tab2-3">All</label>
              <input id="tab2-3" name="tabs-two" type="radio">
              <div style="display: block; overflow:auto;">
                 <!-- position: fixed; bottom: 20px;
                width: 25%; margin-left:-16.4%"> -->
                <div class="chat-sender"></div>
                <div style="display:flex; width:100%">
                  <div class="receiver-photo">
                    <img src=""/>
                  </div>
                  <div class="chat-receiver"><p>all</p></div>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div class="chat-bar">
              <div class="message-circle">
                  <!-- <i class="fa fa-paper-plane" aria-hidden="true" style="margin-top: 7px;
                    margin-right: 4px; color: white;"></i> -->
                  <img src="./icons/Group 96.svg" alt style="height: 51%; margin-top: 8px;
                    margin-right: 2px;"/>
              </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div id="content" class="hidden">
      <p>hello</p>
      <button type="button">&times;</button>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div> -->
  </div>
</template>

<script>
import $ from 'jquery';
import 'bootstrap';

export default {
  data() {
    return {
      contact_list: [{ name: 'SpiderMan', photo: 'pic' },
        { name: 'IronMan', photo: 'pic' },
        { name: 'DeadPool', photo: 'pic' },
        { name: 'Thor', photo: 'pic' },
        { name: 'Thanos', photo: 'pic' }],
      chat_popover_list: [{ name: 'SpiderMan', photo: 'pic', recent_chat: 'recent_spiderman' },
        { name: 'IronMan', photo: 'pic', recent_chat: 'recent-chat Ironman' },
        { name: 'DeadPool', photo: 'pic', recent_chat: 'recent-chat deadpool' },
        { name: 'Thor', photo: 'pic', recent_chat: 'recent-chat thor' },
        { name: 'Thanos', photo: 'pic', recent_chat: 'recent-chat thanos' }],
    };
  },
  methods: {
    slideColorChange() {
      const x = document.getElementById('videocallslider').value;
      const color = `linear-gradient(90deg, rgb(39, 60, 125) ${x}%, rgb(41, 38, 38) ${x}%)`;
      document.getElementById('videocallslider').style.background = color;
      console.log('done');
    },
    scrollToEnd() {
      const container = document.querySelector('#muted-container');
      container.scrollTop = container.scrollHeight;
    },
    share_screen_video_call_page() {
      this.$router.push({ name: 'Video-Call', params: { startsharescreen: true } });
    },
  },
  /* eslint-disable */ 
  mounted() {
    const $elements = $('[data-toggle="popover"]');
    console.log($elements);
    for (let i = 0; i < this.chat_popover_list.length; i += 1) {
      console.log($('[data-toggle="popover"]')[i]);
      $(`#popover_id${i}`).popover({
        sanitize: false,
        placement: 'bottom',
        html: true,
        container: 'body',
        content: `<div style="background-color:#ebf5f0">
        <p style="margin-left:10px; margin-right:10px; margin-top: 10px">
        ${this.chat_popover_list[i].recent_chat}</p>
        <div style="height:30px;width:100%;border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
        background: rgb(39, 60, 125);display: flex">
          <div style="width: 30%;height: 25px;margin-bottom:5px;margin-left:5%;">
              <img src="./icons/Path 123.svg" alt style="height: 46%; margin-top: 10px;"/>
      </div>
          <div style="width: 30%;height: 25px;margin-bottom:5px">
              <img src="./icons/Group 102.svg" alt style="height: 46%; margin-top: 10px;"/>
      </div>
          <div style="width: 30%;height: 25px;margin-bottom:5px">
              <i class="fa fa-comment-o" aria-hidden="true"
              style="color: white;font-size: 18px; float: right; margin-top: 4px;
       margin-right:8%"></i>
      </div>
        </div>
        </div>`,
      });
    }
  },
};
</script>

<style scoped>
.receiver-photo {
  border-radius: 50%;
  border: 1px solid black;
  height: 32px;
  margin-left: 7px;
  width:10%;
}
.chat-sender {
  width: 65%;
  margin-right: 2%;
  float: right;
  height: 30px;
  background-color: lightgrey;
  color: black;
  margin-bottom: 20px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.chat-receiver {
  width: 65%;
  margin-left: 2%;
  float: left;
  height: 30px;
  background-color: black;
  color: white;
  margin-bottom: 20px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.tabs {
  display: block;
  display: -webkit-flex;
  display: -moz-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  flex-wrap: wrap;
  margin: 0;
  overflow: hidden;
}

.tabs [class^="tab"] label, .tabs [class*=" tab"] label {
  /* color: #efedef; */
  cursor: pointer;
  display: block;
  /* font-size: 1.1em; */
  font-weight: 300;
  line-height: 1em;
  /* padding: 2rem 0; */
  text-align: center;
  padding-top: 18px;
}

.tabs [class^="tab"] [type="radio"], .tabs [class*=" tab"] [type="radio"] {
  border-bottom: 2px solid rgba(192, 190, 192, 0.5);
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: block;
  width: 100%;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
} 

.tabs [class^="tab"] [type="radio"]:hover, .tabs [class*=" tab"] [type="radio"]:hover, .tabs [class*=" tab"] [type="radio"]:focus { border-bottom: 2px solid #757474; }

.tabs [class^="tab"] [type="radio"]:checked, .tabs [class*=" tab"] [type="radio"]:checked { border-bottom: 3px solid rgb(206, 201, 201); }

.tabs [class^="tab"] [type="radio"]:checked + div, .tabs [class*=" tab"] [type="radio"]:checked + div { opacity: 1; }

.tabs [class^="tab"] [type="radio"] + div, .tabs [class*=" tab"] [type="radio"] + div {
  display: block;
  opacity: 0;
  padding: 2rem 0;
  width: 100%;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.tabs .tab-2 { width: 33%; }

.tabs .tab-2 [type="radio"] + div {
  width: 300%;
  margin-left: 200%;
}

.tabs .tab-2 [type="radio"]:checked + div { margin-left: 0; }

.tabs .tab-2:last-child [type="radio"] + div { margin-left: 200%; }

.tabs .tab-2:last-child [type="radio"]:checked + div { margin-left: -200%; }

.tabs .tab-2:nth-child(2) [type="radio"] + div { margin-left: 100%; }

.tabs .tab-2:nth-child(2) [type="radio"]:checked + div { margin-left: -100%; }

.navbar-light {
  border-bottom: 1px solid #bfc8c5;
  height: 57px;
}
.top-bar-icon {
  height: 8px;
  display: table-cell
}
.navbar-text {
  display: table-cell;
  width: 20%;
  text-align: left;
  padding-left: 1%;
}
.right-side-bar {
  height: 520 px;
  width:100%;
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
.blue-circle-icon {
  height: 50px;
  /* border: 1px solid black; */
  /* display: table-cell; */
  width:10%;
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
  top: 26%
}
.slider::before {
  color:rgb(39, 60, 125);
  font-size: 2rem;
  position: absolute;
  left: 12%;
  top: 26%
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
}
.chat-bar {
  height: 40px;
  width:90%;
  margin-left: 5%;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}
.message-circle {
    height: 30px;
    width: 10%;
    float:right;
    margin-right: 10px;
    border-radius: 50%;
    margin-top: 5px;
    background-color: rgb(39, 60, 125);
}
.muted-text {
  height: 46px;
}
.photo-circle {
    height: 95%;
    width: 23%;
    border: 1px solid black;
    float:left;
    margin-left: 20px;
    border-radius: 50%;
}
.name-bar {
    height: 52px;
    width: 65%;
    float:right;
    margin-right: 0px;
}
.muted-div {
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    max-height: 200px;
    margin-left: 30px;
}
.muted-div>* {
    flex: 0 0 25%;
}
.photo-name-bar {
    height: 52px;
    width: 91%;
    margin-top: 24px;
    margin-bottom: 10px;
    margin-left: 20px;
}
.chat-pop-circle {
    height: 70%;
    width: 36%;
    border: 1px solid black;
    float:left;
    margin-left: 45px;
    border-radius: 50%;
}
.chat-pop-name-bar {
    height: 52px;
    width: 68%;
    float:right;
    margin-right: 60px;
}
.chat-pop-circle-name-bar {
    height: 116px;
    width: 100%;
    margin-top: 24px;
    margin-bottom: 15px;
    margin-top: 60px;
}
.chat-pop-div {
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    max-height: 280px;
    margin-left: 74px;
}
.chat-pop-div>* {
    flex: 0 0 25%;
}

</style>
