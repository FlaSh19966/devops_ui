<template>
   <div class="dash-cont">
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="container-fluid">
        <div class="card dash-card">
            <div class="card-body">
                <div class="col-sm-12" style="padding: 0.3rem">
                    <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a
                            class="nav-link pl-5 pr-5 active"
                            id="email_templates-tab"
                            data-toggle="tab"
                            href="#email_templates"
                            role="tab"
                            aria-controls="email_templates"
                            aria-selected="true"
                            @click="view_component_name = 'email_templates'"
                            >{{tlt('mailers_tab_name')}}</a
                            >
                        </li>
                        <li class="nav-item">
                            <a
                            class="nav-link pl-5 pr-5"
                            id="message_templates-tab"
                            data-toggle="tab"
                            href="#message_templates"
                            role="tab"
                            aria-controls="message_templates"
                            aria-selected="false"
                            @click="view_component_name = 'message_templates'"
                            >{{tlt('sms_tab_name')}}</a
                            >
                        </li>
                        <li class="nav-item">
                            <a
                            class="nav-link pl-5 pr-5"
                            id="banner_template-tab"
                            data-toggle="tab"
                            href="#banner_template"
                            role="tab"
                            aria-controls="banner_template"
                            aria-selected="false"
                            @click="view_component_name = 'banner_template'"
                            >{{tlt('banner_tab_name')}}</a
                            >
                        </li>
                        <li class="nav-item">
                            <a
                            class="nav-link pl-5 pr-5"
                            id="whatsapp_templates-tab"
                            data-toggle="tab"
                            href="#whatsapp_templates"
                            role="tab"
                            aria-controls="whatsapp_templates"
                            aria-selected="false"
                            @click="view_component_name = 'whatsapp_templates'"
                            >{{tlt('whatsapp_tab_name')}}</a
                            >
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div
                        class="tab-pane fade show active"
                        id="email_templates"
                        role="tabpanel"
                        aria-labelledby="email_templates"
                        >
                        <template v-if="view_component_name === 'email_templates'">
                            <email-templates/>
                        </template>
                        </div>
                    </div>
                    <div
                        class="tab-pane fade"
                        id="message_templates"
                        role="tabpanel"
                        aria-labelledby="message_templates"
                    >
                        <template v-if="view_component_name === 'message_templates'">
                            <sms-templates />
                        </template>
                    </div>
                    <div
                        id="banner_template"
                        class="tab-pane fade"
                        role="tabpanel"
                        aria-labelledby="banner_template"
                    >
                        <template v-if="view_component_name === 'banner_template'">
                            <banner-template/>
                        </template>
                    </div>
                    <div
                        id="whatsapp_templates"
                        class="tab-pane fade"
                        role="tabpanel"
                        aria-labelledby="whatsapp_templates"
                    >
                        <template v-if="view_component_name === 'whatsapp_templates'">
                            <whatsapp-template/>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
   </div>
</template>
<script>
import EmailTemplates from './EmailTemplates.vue'
import SmsTemplates from './SmsTemplates.vue'
import BannerTemplate from './BannerTemplate.vue'
import WhatsappTemplate from './WhatsappTemplate.vue'
import { bus } from "@/portal/main";
export default {
    name:"TemplateLayout",
    components: {
        "email-templates": EmailTemplates,
        "sms-templates": SmsTemplates,
        "banner-template": BannerTemplate,
        "whatsapp-template": WhatsappTemplate,
        
    },
    data() {
        return {
        spinnerOn: false,
        view_component_name: "email_templates",
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
    if (this.$route.params.modal_open_switch_tab === true) {
      // this.view_component_name = "user_responses";
      // $("#user_responses-tab").click();
      $("#product_setting-tab").click();
       this.view_component_name = "product_setting";
    }
    }
}
</script>
