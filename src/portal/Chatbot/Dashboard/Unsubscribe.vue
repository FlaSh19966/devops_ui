<template>
  <div class="max-resolution d-flex" style=" min-height:80vh">
    <div class="col-sm-12 my-auto">
      <div class="col-sm-7 mx-auto book-demo-border-box py-3">
        <div>
          <div
            style="background-color: #F3F5F8;        border: 1px solid #2222222b;        border-radius: 5px;      "
          >
            <div style="text-align: center; padding: 10px 0px 0px 0px;">
              <div class="text-center pb-1">
                <img style="min-width: 13vh; max-height:13vh"  :src="company_logo_url" alt="" />
              </div>
            </div>
            <div
              style="background-color: #FFFFFF; max-width: 605px; margin: 0 auto; padding: 45px 47px"
            >
               <div>
                <div class="col-sm-12 mx-auto my-2 text-center mt-4" v-show="!unsubscribe && !unsubscribe_fail">
                    <p style="text-align: center;font: normal normal 600 21px/31px Poppins, arial;letter-spacing: 0px;
                            ;margin: 0;padding-top: 8px;" >
                        {{tlt('unsubscribe_alert_msg')}}
                    </p>
                    <p style="text-align: center;font: normal normal 590 21px/31px Poppins, arial;letter-spacing: 0px;
                              ;margin: 11px;padding-top: 8px;" >
                        {{tlt('stop_promotional_email_msg')}}
                    </p>
                    <button @click="unsubscribe_plan" class="mt-3 text-center darkblue-btn col-sm-3">
                      {{tlt('unsubscribe_btn')}}
                    </button>
                </div>
                <div class="col-sm-12 mx-auto my-2 text-center mt-4" v-show="unsubscribe && !unsubscribe_fail">
                    <p style="text-align: center;font: normal normal 600 21px/31px Poppins, arial;letter-spacing: 0px;
                            ;margin: 0;padding-top: 8px;" >
                        {{tlt('thank_you_msg')}}                
                    </p>
                    <p style="text-align: center;font: normal normal 590 21px/31px Poppins, arial;letter-spacing: 0px;
                              ;margin: 11px;padding-top: 8px;" >
                        {{tlt('would_not_receive_emails')}}
                    </p>
                 </div>
                 <div class="col-sm-12 mx-auto my-2 text-center mt-4" v-show="unsubscribe_fail && !unsubscribe">
                    <p style="text-align: center;font: normal normal 600 21px/31px Poppins, arial;letter-spacing: 0px;
                            ;margin: 0;padding-top: 8px;" >
                       {{tlt('something_went_wrong_msg')}}              
                    </p>
                    <p style="text-align: center;font: normal normal 590 21px/31px Poppins, arial;letter-spacing: 0px;
                              ;margin: 11px;padding-top: 8px;" >
                        {{tlt('try_again_msg')}}
                    </p>
                 </div>
              </div>
              <div
                style="text-align: left;  font: normal normal normal 14px/24px Roboto, arial; letter-spacing: 0px; color: #3A3A3A;"
              >      
                <br />
                <br />
              </div>
            </div>
            <div style="text-align: center;padding: 29px 0px 24px;">
              
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
export default {
  data() {
    return {
      unsubscribe: false,
      email: NaN,
      token_id: NaN,
      company_id: NaN,
      unsubscribe_fail: false,
      company_logo_url : ''
    };
  },
  beforeMount() {
    this.email = this.$route.query.email;
    this.token_id = this.$route.query.token;
    this.company_id = this.$route.query.c_id;
  },
  mounted() {
    this.company_logo();
  },
  methods: {
    unsubscribe_plan() {
      axios
        .post(api_calls.unsubscribe_promotional_email(), {
          company_id: this.company_id,
          email: this.email,
          token: this.token_id,
          unsubscribe: true
        })
        .then(response => {
          if (response.data === "Successfully unsubscribed") {
            this.unsubscribe = true;
          } else if (response.data === "User Doesn't Exist") {
            this.unsubscribe_fail = true;
          }
        })
        .catch(e => {
          toastr.error(e.message);
        });
    },
     company_logo() {
      axios
        .post(api_calls.unsubscribe_promotional_email(), {
          company_id: this.company_id,
          email: this.email,
          get_company_logo: true,
          token: this.token_id
        })
        .then(response => {
          console.log(response);
          if (response.data.url !== null) {
            this.company_logo_url = response.data.url;
            console.log(this.company_logo_url);
          }   
        })
        .catch(e => {
          toastr.error(e.message);
        });
    }
  }
};
</script>
