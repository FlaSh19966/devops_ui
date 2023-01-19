<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
        <div class="card-icon">
          <md-icon>info</md-icon>
        </div>
        <h4 class="title" style="font-weight:bold">Referral Status<small></small></h4>
      </md-card-header>
      <md-card-content>
             <md-progress-spinner :md-diameter="30" v-if="show_loader" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
        <div class="md-layout">
          <div class="md-layout-item md-size-33">
            <h5 style="font-weight:400">Company Name</h5>
          </div>
          <div class="md-layout-item md-size-33">
            <h5 style="font-weight:400">Email Address</h5>
          </div>
          <!-- <div class="md-layout-item md-size-25">
            <h5 style="font-weight:400">Registration Status</h5>
          </div> -->
          <div class="md-layout-item md-size-33">
            <h5 style="font-weight:400">Status</h5>
          </div>
        </div>
        <div class="md-layout" v-for="(referral, index) in display_list" :key="index">
          <div class="md-layout-item md-size-33">
            <p>{{ referral.company_name }}</p>
          </div>
          <div class="md-layout-item md-size-33">
            <p>{{ referral.email }}</p>
          </div>
          <div class="md-layout-item md-size-33">
            <p>{{ referral.Status }}</p>
          </div>
        </div>
      </md-card-content>
      </md-card>
    </div>
    <!-- <div class="md-layout-item md-size-100">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
        <div class="card-icon">
          <md-icon>info</md-icon>
        </div>
        <h4 class="title" style="font-weight:bold">Registered/Approved<small></small></h4>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-size-33">
            <h5 style="font-weight:400">Company Name</h5>
          </div>
          <div class="md-layout-item md-size-33">
            <h5 style="font-weight:400">Email Address</h5>
          </div>
          <div class="md-layout-item md-size-33">
            <h5 style="font-weight:400">Approval Status</h5>
          </div>
        </div>
       <div class="md-layout" v-for="(referral, index) in display_approved_list" :key="index">
          <div class="md-layout-item md-size-33">
            <p>{{ referral.company_name }}</p>
          </div>
          <div class="md-layout-item md-size-33">
            <p>{{ referral.email }}</p>
          </div>
          <div class="md-layout-item md-size-33">
            <p>{{ referral.Status }}</p>
          </div>
        </div>
      </md-card-content>
      </md-card>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios'
import { bus } from '@/portal/main'
import api_calls from "@/portal/api_calls";
export default {
  data () {
    return {
      display_list: [],
      show_loader: false
    }
  },
  updated () {
    bus.$on('invite_update', data=>{
      if(data=="loader_on") {
        this.show_loader = true
        axios.post(api_calls.display_referrals_url(), {
      companyname: this.$session.get('UserInformation').company_name,
      companyid: this.$session.get('UserInformation').company_id,
      email: this.$session.get('UserInformation').email,
      token: this.$session.get('UserInformation').tokens,
      license_key: this.$session.get('UserInformation').license_key
    },
    {
      headers: {
        Authorization: `Bearer ${this.$session.get("at")}`,
      },
    }).then(response=>{
        this.display_list = []
      for(var i in response.data) {
        if(response.data[i].Registered==true && response.data[i].Status=="Pending") {
          this.display_list.push({
            company_name: response.data[i].CompanyId,
            email: response.data[i].Email,
            Status: "Pending Approval",
          })
        }
        else{
          this.display_list.push({
            company_name: response.data[i].CompanyId,
            email: response.data[i].Email,
            Status: "Invitation Sent",
          })
        }
      }
    }).catch(err=>{
      this.display_list= []
    })
    setTimeout(()=>{
        this.show_loader = false
      }, 1500)
      }
})
  },
  created () {
    axios.post(api_calls.display_referrals_url(), {
      company_name: this.$session.get('UserInformation').company_name,
      company_id: this.$session.get('UserInformation').company_id,
      email: this.$session.get('UserInformation').email,
      token: this.$session.get('UserInformation').tokens,
      license_key: this.$session.get('UserInformation').license_key
    },
    {
      headers: {
        Authorization: `Bearer ${this.$session.get("at")}`,
      },
    }).then(response=>{
      if(response.data=="User Doesn't Exist") {
        this.$session.destroy()
       this.$router.push('login')
      }
      else {
      for(var i in response.data) {
        if(response.data[i].Registered==true && response.data[i].Status=="Pending") {
          this.display_list.push({
            company_name: response.data[i].CompanyId,
            email: response.data[i].Email,
            Status: "Pending Approval",
          })
        }
        else{
          this.display_list.push({
            company_name: response.data[i].CompanyId,
            email: response.data[i].Email,
            Status: "Invitation Sent",
          })
        }
      }
      }
    })
  }
}
</script>
