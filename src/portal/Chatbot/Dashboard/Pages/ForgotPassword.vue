<template>
  <div class="log-wrap d-flex align-items-center">
    <div class="container" style="min-width: 35%;">
      <div class="log-blk">
        <div class="row no-gutters">
          <div class="col-lg-12">
            <div class="log-sec d-flex align-items-center">
              <div class="log-frm">
                <h4 style="text-align: center;">{{tlt('reset_pwd_heading')}}</h4>
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
                       :placeholder="tlt('new_password')"
                        style="border-radius: 29px; padding:3px 0px 3px 43px; font-size: 15px;"
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
                        style="top: 7px;"
                    >
                      <img
                        src="/img/eye-icn.png"
                        alt
                      />
                    </a>
                  </div>
                  <password-validator
                                    :testpassword="new_password"
                                    @correctPassword="check_password"
                                    style="padding: 0px;"
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
                        :placeholder="tlt('retype_password')"
                        required
                        style="border-radius: 29px; padding:3px 0px 3px 43px; font-size: 15px;"
                        autocomplete="new-password"
                      />
                    <div
                      class="is-invalid"
                      style="color:red"
                      v-show="validConfirmPassword!=true && confirm_password!=''"
                    >{{ validConfirmPassword }}</div>
                    <a
                      href="#"
                      @click="password_toggle"
                      class="view-pass"
                        style="top: 7px;"
                    >
                      <img
                        src="/img/eye-icn.png"
                        alt
                      />
                    </a>
                  </div>
                  <div class="btn-wrap">
                    <button
                      type="submit"
                      class="darkblue-btn"
                    >{{tlt('submit_btn')}}</button>
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
import PasswordValidator from '../Pages/PasswordValidator.vue';
import moment from "moment";

export default {
  components: {
    PasswordValidator,
  },
  data () {
    return {
      new_password: "",
      confirm_password: "",
      correct_password: false,
      reg_pwd: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}/,
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
    validPassword () {
      if (this.reg_pwd.test(this.new_password)) {
        this.password_valid = true;
        return true;
      } else {
        this.password_valid = false;
        return this.tlt('reset_pwd_condition');
      }
    },
    validConfirmPassword () {
      if (this.confirm_password == this.new_password) {
        this.password_match = true;
        return true;
      } else {
        this.password_match = false;
        return this.tlt('confirm_pwd_condition');
      }
    }
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
    password_toggle () {
      event.preventDefault();
      var password = event.target.parentElement.parentElement.children[0].id;
      var doc = document.getElementById(password);
      if (doc.type == "text") {
        doc.type = "password";
      } else if (doc.type == "password") {
        doc.type = "text";
      }
    },
    submit_new_password () {
      // if (this.validPassword == true && this.password_match == true) {
        if(this.correct_password == true){
        var token_id = this.$route.query.token
        var email = this.$route.query.email
        this.call_api(token_id, email);
      }
    },
    call_api (token_id, email) {
      swal({
        toast: true,
        text: this.tlt('submit_your_details_msg'),
        showConfirmButton: false,
        type: 'info'
      })
      axios
        .post(api_calls.forgot_password_update(), {
          token: token_id,
          email: email,
          password: this.new_password,
          date: moment().toISOString(),
        })
        .then(response => {
          if (response.data === "The link you used has expired") {
            swal({
              text: this.tlt('link_expired_msg'),
              timer:2000,
            });
          } else if (response.data == "Password Reset") {
            swal({
              text:
                this.tlt('password_updated_msg'),
              allowOutsideClick: false
            }).then(value =>{
               this.$router.push("/bot/login");
            })
          } else if (response.data == "User Doesn't Exist") {
            swal({
              text: this.tlt('user_does_not_exist'),
              timer:2000,
            });
          } else if(response.data.MSG === "Password Is Similar"){
            swal({
              text: this.tlt('set_new_pwd_msg'),
              timer:3000,
            });
          } else {
            swal({
              text: this.tlt('some_error_occurred_msg'),
              timer:2500,
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
  width: auto;
}
#message {
  display: none;
  background: #fff;
  color: #000;
  position: relative;
  padding: 20px;
  margin-top: 10px;
}

.valid {
  color: green;
}

.valid:before {
  position: relative;
  left: -35px;
  content: "✔";
}

/* Add a red text color and an "x" when the requirements are wrong */
.invalid {
  color: red;
}

.invalid:before {
  position: relative;
  left: -35px;
  content: "✖";
}
.is-invalid {
  color: red;
}
</style>
