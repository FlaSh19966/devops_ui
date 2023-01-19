<template>
  <div class="dash-cont">
    <div class="container-fluid">
      <div class="card dash-card">
        <div class="card-body">
            <div class="msg-box">
              <h6>{{tlt('renewal_page_text1')}}</h6>
                <span v-if="isAfter" class="mt-2"><strong> {{tlt('your_text')}} {{previous_plan}} {{tlt('renewal_page_plan_expired')}} <span v-if="previous_plan_date != ''">on {{get_subscription_valid_till(this.previous_plan_date)}}.</span> </strong>{{tlt('upgrade_plan_service')}}</span>
                <span v-else><strong> You are on Free Plan </strong> {{tlt('upgrade_plan_service')}}</span>
                  <p> {{tlt('renewal_page_text1')}} – <a href = "mailto:support@cense.ai"> support@cense.ai</a> {{tlt('renewal_page_text1')}}</p>
                <button @click="relocate_account_page"
                  class="darkblue-btn mt-3"
                >
                    {{tlt('subscribe_btn')}}
                </button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
    name : 'SubscriptionRenewalPage',
    data(){
        return{
          previous_plan: '',
          previous_plan_date: '',
          isAfter: '',
        }
    },
    mounted(){
      this.$root.$emit("DashboardSidebarDisable",true);
      this.$session.set("SettingTopnavbarDisable",true);
      this.previous_plan = this.$session.get("UserInformation").previous_plan == null ? 'Free Trial': this.$session.get("UserInformation").previous_plan ;
      this.previous_plan_date = this.$session.get("UserInformation").previous_plan_expiry == null ?'':this.$session.get("UserInformation").previous_plan_expiry;
      var today = new Date()
      this.isAfter = moment(today).isAfter(this.previous_plan_date);  
    },
    methods : {
      relocate_account_page (){
        this.$router.push({
        name: 'Settings',params:{Subscription:true}
        
      })
      },
      get_subscription_valid_till(sub_date){
        return moment.utc(sub_date).format("Do MMMM YYYY");
      },

    }
}
</script>

<style scoped>
    .msg-box{
        align-items: center !important;
        text-align: center !important;
        margin-top: 6rem !important;
    }
    .msg-box h6 {
      font-size: 25px;
      margin-bottom: 2rem;
    }
    .msg-box span {
      font-size: 18px;
    }
    .msg-box a {
      font-size: 18px;
      color: #273679;
    }
</style>