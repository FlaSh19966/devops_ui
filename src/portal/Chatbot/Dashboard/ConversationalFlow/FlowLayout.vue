<template>
  <div class="dash-cont">
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="container-fluid">
      <div class="card dash-card">
        <div class="d-flex card-header">
          <img src="/img/demo_assistant_bot_icn.png" alt="">
          <h5 style="margin-left: 10px; margin-top: 5px; margin-bottom: 0px">{{tlt('conversation_flow_page_header')}}</h5>
        </div>
        <div class="card-body">
          <div class="col-sm-12 p-0" style="padding: 0.3rem">
            <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link pl-5 pr-5 active"
                  id="intents_component-tab"
                  data-toggle="tab"
                  href="#intents_component"
                  role="tab"
                  aria-controls="intents_component"
                  aria-selected="true"
                  @click="view_component_name = 'intents_component'"
                  >{{tlt('conversation_flow_objective_tab_name')}}</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link pl-5 pr-5"
                  id="entities_component-tab"
                  data-toggle="tab"
                  href="#entities_component"
                  role="tab"
                  aria-controls="entities_component"
                  aria-selected="false"
                  @click="view_component_name = 'entities_component'"
                  >{{tlt('conversation_flow_entities_tab_name')}}</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link pl-5 pr-5"
                  id="dialog_component-tab"
                  data-toggle="tab"
                  href="#dialog_component"
                  role="tab"
                  aria-controls="dialog_component"
                  aria-selected="false"
                  @click="view_component_name = 'dialog_component'"
                  >{{tlt('conversation_flow_dialogs_tab_name')}}</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link pl-5 pr-5"
                  id="webhook_component-tab"
                  data-toggle="tab"
                  href="#webhook_component"
                  role="tab"
                  aria-controls="webhook_component"
                  aria-selected="false"
                  @click="view_component_name = 'webhook_component'"
                  >{{tlt('conversation_flow_webhooks_tab_name')}}</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link pl-5 pr-5"
                  id="email_templates-tab"
                  data-toggle="tab"
                  href="#email_templates"
                  role="tab"
                  aria-controls="email_templates"
                  aria-selected="false"
                  @click="view_component_name = 'email_templates'"
                  >{{tlt('conversation_flow_notification_tab_name')}}</a
                >
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="intents_component"
                role="tabpanel"
                aria-labelledby="intents_component"
              >
              <template v-if="view_component_name === 'intents_component'">
                <intents-component/>
              </template>
              </div>
              <div
                class="tab-pane fade"
                id="entities_component"
                role="tabpanel"
                aria-labelledby="entities_component"
              >
              <template v-if="view_component_name === 'entities_component'">
                <entities-component/>
              </template>
              </div>
              <div
                class="tab-pane fade"
                id="dialog_component"
                role="tabpanel"
                aria-labelledby="dialog_component"
              >
              <template v-if="view_component_name === 'dialog_component'">
                <dialog-component/>
              </template>
              </div>
              <div
                class="tab-pane fade"
                id="webhook_component"
                role="tabpanel"
                aria-labelledby="webhook_component"
              >
              <template v-if="view_component_name === 'webhook_component'">
                <webhook-component/>
              </template>
              </div>
              <div
                  class="tab-pane fade"
                  id="email_templates"
                  role="tabpanel"
                  aria-labelledby="email_templates"
                >
                <template v-if="view_component_name === 'email_templates'">
                  <email-templates
                  v-bind:is_notification_template="true"
                  >
                  </email-templates>
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
import Intents from './Intents.vue'
import Entities from './Entities.vue'
import Dialog from './Dialog.vue'
import EmailTemplates from '../Templates/EmailTemplates.vue'
import Webhook from './Webhook.vue'
import { bus } from "@/portal/main";

export default {
  name: "FlowLayout",
  components: {
    "intents-component": Intents,
    "entities-component": Entities,
    "dialog-component": Dialog,
    "webhook-component": Webhook,
    "email-templates": EmailTemplates,
  },
  data() {
    return {
      spinnerOn: false,
      view_component_name: "intents_component",
    };
  },
  watch:{
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
  }
};
</script>

<style scoped>
.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
    color: #273679;
    background-color: #fff;
    border-bottom-color: #273679;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}
.nav-tabs .nav-link {
    border: 4px solid transparent;
    color: #9B9B9B;
}
.nav-tabs .nav-item {
    margin-bottom: -0.13rem;
}
</style>