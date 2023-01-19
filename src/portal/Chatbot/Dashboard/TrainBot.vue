<template>
    <div>
            <div class="md-layout-item md-size-75">
      <md-card>
        <md-card-header class="md-card-header-text md-card-header-green">

        </md-card-header>

        <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item md-size-15">
              <p>Epoch</p>
            </div>
            <div class="md-layout-item md-size-30">
              <md-field>
                  <label>Enter the epoch here</label>
                <md-input v-model="epoch" type="text"></md-input>
                <span class="md-helper-text"></span>
              </md-field>
            </div>
          </div>
          <md-button class="md-success" @click="submit_train">Train Model</md-button>
        </md-card-content>
      </md-card>
      <div>
          <footer>
            <p style="margin-top: 50px;">
              Ⓒ {{new Date().getFullYear()}} CodeArray Technologies Pvt Ltd. All rights reserved.
              <a
                href="https://cense.ai/privacy-policy"
              >Privacy Policy</a>
            </p>
          </footer>
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
import api_calls from "@/portal/api_calls";
export default {
    data () {
        return {
          epoch: null,
          user_role: this.$session.get('UserInformation').role,
          companyid: this.$session.get('CompanyId'),
          companyname: this.$session.get('CompanyName')
        }
    },
    methods: {
      submit_train () {
     if(!this.$session.has('CompanyId') && this.$session.get('UserInformation').role=='SuperAdmin') {
     toastr.warning("Please select a company name from the dropdown")
      }
      else if (this.epoch=='' || this.epoch==null) {
        toastr.warning("Please enter a valid epoch value")
      }
        else {
        axios.post(api_calls.train_model_url(), {
          company_id: this.companyid,
          company_name: this.companyname,
          // superadmincompanyname: this.$session.get('UserInformation').company_name,
          // superadmincompanyid: this.$session.get('UserInformation').company_id,
          epochs: this.epoch,
          // role: this.$session.get('UserInformation').role,
          email: this.$session.get('UserInformation').email,
          license_key: this.$session.get('UserInformation').license_key,
          token: this.$session.get('UserInformation').tokens
        })
        .then( response => {
          if(typeof(response.data)=="number") {
            swal({
              text: "The model has accuracy of "+response.data,
              type: 'success',
              timer:3000,
            })
            this.epoch = null
          }
          else if(response.data=="model save") {
            swal({
              text: "The model has been trained successfully",
              type: 'success',
              timer:2500,
            })
            this.epoch = null
          }
        })
        .catch (e =>{
          toastr.error(e.message)
        })
        }
      }
    }
}
</script>
