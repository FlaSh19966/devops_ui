<template>
  <div>
    <div class="dash-cont">
      <div class="container-fluid" style="width: 50%; margin-left: 20%;">
        <div class="card dash-card">
          <div class="card dash-card" style="padding-left: 3%;padding-top: 3%;">
            <div class="row card-act d-flex flex-wrap">
              <div class="col-sm-6">
                <h5>Model Accuracy :</h5>
                <h5>Updated On :</h5>
                <h5>Status :</h5>
              </div>
              <div class="col-sm-6">
                <h5>100%</h5>
                <h5>24th July 2019</h5>
                <h5>Completed</h5>
              </div>
            </div>
            <div
              class="row card-act d-flex flex-wrap group"
              style="margin-left: 35%; margin-top: 5%; margin-bottom:5%"
            >
              <a href="#" class="darkblue-btn" style="margin-right: 5%;" @click="train_model">Train</a>
              <a href="#" class="red-btn">Revert</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api_calls from "@/portal/api_calls";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "TrainIntent",
  data() {
    return {
      company_name: this.$session.get("UserInformation").company_name,
      company_id: this.$session.get("UserInformation").company_id
    };
  },
  methods: {
    train_model() {
      axios
        .post(api_calls.train_intent_model(), {
          companyid: this.company_id,
          companyname: this.company_name,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          epochs: 100,
          update_model: true
        })
        .then(response => {
          console.log(response.data);
        });
    }
  }
};
</script>
