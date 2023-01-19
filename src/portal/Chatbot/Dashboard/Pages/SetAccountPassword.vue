<template>
  <div class="log-wrap d-flex align-items-center">
    <div class="container" style="min-width: 35%">
      <div class="log-blk">
        <div class="row no-gutters">
          <div class="col-lg-12">
            <div class="log-sec d-flex align-items-center">
              <div class="log-frm">
        <img src="/img/cense_image.png" alt="" style="width: 100%; padding: 0px 70px;">
                <h3 style="text-align: center">{{tlt('account_pwd_heading')}}</h3>
                <form @submit.prevent="submit_new_password">
                  <div class="form-group">
                    <!-- <input
                      type="password"
                      id="new_password"
                      v-model="new_password"
                      class="form-control pass"
                      placeholder="New Password"
                      required
                      autocomplete="new-password"
                    /> -->
                    <input
                      type="password"
                      v-model="new_password"
                      id="new_password"
                      class="form-control pass"
                      placeholder="Password"
                      style="
                        border-radius: 29px;
                        padding: 3px 0px 3px 43px;
                        font-size: 15px;
                      "
                      required
                      autocomplete="new-password"
                    />
                    <!-- <div
                      class="is-invalid"
                      style="color:red"
                      v-show="validPassword!=true && new_password!=''"
                    >{{ validPassword }}</div> -->

                    <a
                      href="#"
                      @click="password_toggle"
                      class="view-pass"
                      style="top: 7px"
                    >
                      <img src="/img/eye-icn.png" alt />
                    </a>
                  </div>
                  <password-validator
                    :testpassword="new_password"
                    @correctPassword="check_password"
                    style="padding: 0px"
                  ></password-validator>

                  <div class="form-group">
                    <!-- <input
                      type="password"
                      id="confirm_password"
                      v-model="confirm_password"
                      class="form-control pass"
                      placeholder="Re-enter New Password"
                      required
                      autocomplete="new-password"
                    /> -->
                    <input
                      type="password"
                      v-model="confirm_password"
                      id="confirm_password"
                      class="form-control pass"
                      placeholder="Re-enter Password"
                      required
                      style="
                        border-radius: 29px;
                        padding: 3px 0px 3px 43px;
                        font-size: 15px;
                      "
                      autocomplete="new-password"
                    />
                    <div
                      class="is-invalid"
                      style="color: red"
                      v-show="
                        validConfirmPassword != true && confirm_password != ''
                      "
                    >
                      {{ validConfirmPassword }}
                    </div>
                    <a
                      href="#"
                      @click="password_toggle"
                      class="view-pass"
                      style="top: 7px"
                    >
                      <img src="/img/eye-icn.png" alt />
                    </a>
                  </div>
                  <div class="btn-wrap">
                    <button type="submit" class="darkblue-btn">{{tlt('account_pwd_submit_btn')}}</button>
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
import PasswordValidator from "./PasswordValidator.vue";
import moment from "moment";

export default {
  components: {
    PasswordValidator,
  },
  data() {
    return {
      new_password: "",
      confirm_password: "",
      correct_password: false,
      reg_pwd:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}/,
      password_valid: null,
      password_match: null,
      // letter: document.getElementById("letter"),
      // capital: document.getElementById("capital"),
      // number: document.getElementById("number"),
      // special: document.getElementById("special"),
      // array: []
    };
  },
  computed: {
    validPassword() {
      if (this.reg_pwd.test(this.new_password)) {
        this.password_valid = true;
        return true;
      } else {
        this.password_valid = false;
        return this.tlt('account_pwd_condition_msg');
      }
    },
    validConfirmPassword() {
      if (this.confirm_password == this.new_password) {
        this.password_match = true;
        return true;
      } else {
        this.password_match = false;
        return this.tlt('account_pwd_condition_msg1');
      }
    },
  },
  methods: {
    check_password(correctPassword) {
      this.correct_password = correctPassword;
    },
    // check_value () {
    //   if (this.new_password != "") {
    //     document.getElementById("message").style.display = "block";
    //   } else {
    //     document.getElementById("message").style.display = "none";
    //   }
    //   var lowerCaseLetters = /[a-z]/g;
    //   if (this.new_password.match(lowerCaseLetters)) {
    //     letter.classList.remove("invalid");
    //     letter.classList.add("valid");
    //     this.array[0] = 1;
    //   } else {
    //     letter.classList.remove("valid");
    //     letter.classList.add("invalid");
    //     this.array[0] = 0;
    //   }

    //   // Validate capital letters
    //   var upperCaseLetters = /[A-Z]/g;
    //   if (this.new_password.match(upperCaseLetters)) {
    //     capital.classList.remove("invalid");
    //     capital.classList.add("valid");
    //     this.array[1] = 1;
    //   } else {
    //     capital.classList.remove("valid");
    //     capital.classList.add("invalid");
    //     this.array[1] = 0;
    //   }

    //   // Validate numbers
    //   var numbers = /[0-9]/g;
    //   if (this.new_password.match(numbers)) {
    //     number.classList.remove("invalid");
    //     number.classList.add("valid");
    //     this.array[2] = 1;
    //   } else {
    //     number.classList.remove("valid");
    //     number.classList.add("invalid");
    //     this.array[2] = 0;
    //   }

    //   // Special Character
    //   var specials = /[#@!%*?&$]/g;
    //   if (this.new_password.match(specials)) {
    //     special.classList.remove("invalid");
    //     special.classList.add("valid");
    //     this.array[3] = 1;
    //   } else {
    //     special.classList.remove("valid");
    //     special.classList.add("invalid");
    //     this.array[3] = 0;
    //   }
    //   // Validate length
    //   if (this.new_password.length >= 8) {
    //     var length = document.getElementById("length");
    //     length.classList.remove("invalid");
    //     length.classList.add("valid");
    //     this.array[4] = 1;
    //   } else {
    //     var length = document.getElementById("length");
    //     length.classList.remove("valid");
    //     length.classList.add("invalid");
    //     this.array[4] = 0;
    //   }
    //   var sum = this.array[0] + this.array[1] + this.array[2] + this.array[3] + this.array[4];
    //   if (sum == 5 || sum == 0) {
    //     document.getElementById("message").style.display = "none";
    //   } else {
    //     document.getElementById("message").style.display = "block";
    //   }
    // },
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
    submit_new_password() {
      // if (this.validPassword == true && this.password_match == true) {
      if (this.correct_password == true) {
        var token_id = this.$route.query.token;
        var email = this.$route.query.email;
        if (email && token_id) {
          this.call_api(token_id, email);
        }
      }
    },
    call_api(token_id, email) {
      swal({
        toast: true,
        text: this.tlt('account_pwd_submit_your_details'),
        showConfirmButton: false,
        type: "info",
      });
      axios
        .post(api_calls.validate_login(), {
          token: token_id,
          email: email,
          password: this.new_password,
          is_set_password: true
        })
        .then((response) => {
          if (response.data.message.MSG_CODE === this.api_status_code.EMAIL_VERIFICATION_UNSUCCESSFUL_1017.MSG_CODE) {
            swal({
              text: this.tlt('account_pwd_submit_your_details'),
              allowOutsideClick: false,
              allowEscapeKey: false,

            }).then((res) => {
              if(res.value === true) {
                this.$router.push({
                  name: "Login"
                })
              }
            });
          } else if (response.data.message.MSG_CODE === this.api_status_code.EMAIL_VERIFICATION_SUCCESSFUL_1016.MSG_CODE) {
            swal({
              type: "success",
              text: this.tlt('account_pwd_email_verified'),
               allowOutsideClick: false,
              allowEscapeKey: false,
            }).then((res) => {
              console.log(res)
              if(res.value === true) {
                this.$router.push({
                  name: "Login"
                })
              }
            });
          } else if (response.data.message.MSG_CODE === this.api_status_code.USER_DOES_NOT_EXIST_1027.MSG_CODE) {
            swal({
              text: this.tlt('account_pwd_user_dont_exist'),
              type: "error",
              allowOutsideClick: false,
              allowEscapeKey: false,              
            }).then((res) => {
              if(res.value === true) {
                this.$router.push({
                  name: "Login"
                })
              }
            });
          }
        });
      this.new_password = "";
      this.confirm_password = "";
    },
    
  },
};
</script>

<style>
</style>