<template>
 <div class="dash-cont">
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="container-fluid">
      <div class="card dash-card">
        <!-- <div class="card-header d-block d-sm-flex flex-wrap justify-content-between">
          <h4 class="mb-sm-0">Dashboard</h4>
        </div>-->
        <div class="card-body">
          <div class="col-sm-12" style="padding: 0.3rem;">
            <ul
              class="nav nav-tabs mb-3"
              id="myTab"
              role="tablist"
            >
              <li class="nav-item">
                <a
                  class="nav-link pl-5 pr-5 active"
                  id="bot_response-tab"
                  data-toggle="tab"
                  href="#bot_response"
                  role="tab"
                  aria-controls="bot_response"
                  @click="view_component_name='bot_response'"
                >{{tlt('bot_response_tab_name')}}</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link pl-5 pr-5"
                  id="bot_intent-tab"
                  data-toggle="tab"
                  href="#bot_intent"
                  role="tab"
                  aria-controls="bot_intent"
                  @click="view_component_name='bot_intent'"
                >{{tlt('bot_intent_tab_name')}}</a>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade active show"
                id="bot_response"
                role="tabpanel"
                aria-labelledby="bot_response-tab"
              >
                <template v-if="view_component_name==='bot_response'">
                    <bot-response/>
                </template>
              </div>
              <div class="tab-pane fade" id="bot_intent" role="tabpanel" aria-labelledby="bot_intent-tab">
                <template v-if="view_component_name==='bot_intent'">
                    <bot-intent/>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BotIntent from "./Chatscreen.vue";
import BotResponse from "./ResponseBot.vue";
import { bus } from "@/portal/main";

export default {
    name: "TestBot",
    components: {
        BotIntent,
        BotResponse,
    },
    data() {
        return {
        spinnerOn: false,
        view_component_name: "bot_response",
        keys: { 37: 1, 38: 1, 39: 1, 40: 1 },
        wheelOpt: null,
        sendname:"",
        wheelEvent: null,
        tabs_sequence: ['bot_response', 'bot_intent']
        };
    },
    watch: {
      view_component_name(newVal) {
        this.$session.set("CurrentActiveTabForHelp", newVal)
      }
    },
    mounted(){
      this.$session.set("CurrentActiveTabForHelp", this.view_component_name)
      bus.$on("CurrentActiveTab", (data) => {
        if(data === this.$route.fullPath) {
          return this.view_component_name;
          // bus.$emit("CurrrentActiveTabResponse", this.view_component_name)
        }
      });   
    },
    // methods:{
    //   componentName(){
    //   this.sendname = this.view_component_name;
    //   console.log(this.sendname,"name of component");
    //   bus.$emit("Emitting_data", this.sendname);
    //   } 
    // }
}
</script>