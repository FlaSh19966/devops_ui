<template>
  <div class="log-wrap d-flex align-items-center">
    <div class="container">
      <div class="log-blk">
        <div class="row no-gutters">
          <div class="col-lg-12">
            <div class="log-sec d-flex align-items-center">
              <div class="log-frm">
                <h4 style="text-align: center;">{{tlt('reset_pwd_heading')}}</h4>
                <form @submit="submit_reset_password">
                    <div class="form-group">
                        <input
                        type="password"
                        id="old_password"
                        v-model="old_password"
                        class="form-control pass"
                        :placeholder="tlt('old_password')"
                        />
                        <div
                        class="is-invalid"
                        style="color:red"
                        v-show="validOldPassword!=true && old_password!=''"
                        >{{ validOldPassword }}</div>
                        <a href="#" @click="password_toggle" class="view-pass">
                        <img src="/img/eye-icn.png" alt />
                        </a>
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      id="new_password"
                      v-model="new_password"
                      class="form-control pass"
                      placeholder="tlt('new_password')"
                    />
                    <div
                      class="is-invalid"
                      style="color:red"
                      v-show="validPassword!=true && new_password!=''"
                    >{{ validPassword }}</div>
                    <a href="#" @click="password_toggle" class="view-pass">
                      <img src="/img/eye-icn.png" alt />
                    </a>
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      id="confirm_password"
                      v-model="confirm_password"
                      class="form-control pass"
                      placeholder="tlt('enter_new_password')"
                    />
                    <div
                      class="is-invalid"
                      style="color:red"
                      v-show="validConfirmPassword!=true && confirm_password!=''"
                    >{{ validConfirmPassword }}</div>
                    <a href="#" @click="password_toggle" class="view-pass">
                      <img src="/img/eye-icn.png" alt />
                    </a>
                  </div>
                  <div class="btn-wrap">
                    <button type="submit" class="darkblue-btn">{{tlt('submit_btn')}}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert2";
import axios from "axios";
import api_calls from "@/portal/api_calls";

export default {
  data() {
    return {
      old_password: "",
      new_password: "",
      confirm_password: "",
      reg_pwd: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}/,
      password_valid: null,
      password_match: null
    };
  },
  computed: {
      validOldPassword() {
      if (this.reg_pwd.test(this.old_password)) {
        this.password_valid = true;
        return true;
      } else {
        return this.tlt('reset_pwd_condition');
      }
    },
    validPassword() {
      if (this.reg_pwd.test(this.new_password)) {
        this.password_valid = true;
        return true;
      } else {
        return this.tlt('confirm_pwd_condition');
      }
    },
    validConfirmPassword() {
      if (
        this.reg_pwd.test(this.confirm_password) ||
        this.confirm_password == ""
      ) {
        this.password_match = true;
        return true;
      } else {
        return this.tlt('confirm_pwd_condition');
      }
    }
  },
  methods: {
    password_toggle() {
      event.preventDefault();
      var password = event.target.parentElement.parentElement.children[0].id;
      var doc = document.getElementById(password);
      if (doc.type == "text") {
        doc.type = "password";
      } else if (doc.type == "password") {
        doc.type = "text";
      }
    },
    submit_reset_password() {
      event.preventDefault();
      if (this.password_valid == true && this.password_match == true) {
        var token_id = this.$route.query.token
        var email = this.$route.query.email;

        this.call_api(token_id, email);
      }
    },
    call_api(token_id, email) {
      var date = new Date();
      axios
        .post(api_calls.reset_password_update(), {
          token: token_id,
          email: email,
          newpassword: this.new_password,
          oldpassword: this.old_password,
          date: date,
        })
        .then(response => {
          if (response.data.includes("expired")) {
            swal({
              text: this.tlt('link_expired_msg'),
              timer:2000,
            });
          } else if (response.data == "Password Reset") {
            swal({
              text:
                this.tlt('password_updated_msg'),
              timer:3000,
            });
          } else if (response.data == "User Doesn't Exist") {
            swal({
              text: this.tlt('user_does_not_exist'),
              timer:2000,   
            });
          }
        });
      this.new_password = "";
      this.confirm_password = "";
    }
  }
};
</script>

<style scoped>
.container {
  width: auto
}
</style>
