<template>
  <div id="pwd_vld_msg" v-show="show_password_validator">
    <h6>Password must contain the following:</h6>
    <p id="letter" :class="letter_class_list" style="margin-left: 16%">
      A lower case letter
    </p>
    <p id="capital" :class="capital_class_list" style="margin-left: 16%">
      A capital (uppercase) letter
    </p>
    <p id="number" :class="number_class_list" style="margin-left: 16%">
      A number
    </p>
    <p id="special" :class="special_class_list" style="margin-left: 16%">
      A special character
    </p>
    <p id="length" :class="length_class_list" style="margin-left: 16%">
      Minimum 8 characters
    </p>
  </div>
</template>
<script>
export default {
  name: "PasswordValidator",
  data() {
    return {
      array: [],
      correct_password: false,
      show_password_validator: false,
      letter_class_list: "invalid",
      capital_class_list: "invalid",
      number_class_list: "invalid",
      special_class_list: "invalid",
      length_class_list: "invalid",
    };
  },
  props: {
    testpassword: {
      type: String,
      default: "",
    },
  },
  watch: {
    testpassword() {
      if (this.testpassword != "") {
        this.show_password_validator = true;
      } else {
        this.show_password_validator = false;
      }
      var lowerCaseLetters = /[a-z]/g;
      if (this.testpassword.match(lowerCaseLetters)) {
        this.letter_class_list = "valid";
        this.array[0] = 1;
      } else {
        this.letter_class_list = "invalid";
        this.array[0] = 0;
      }

      // Validate capital letters
      var upperCaseLetters = /[A-Z]/g;
      if (this.testpassword.match(upperCaseLetters)) {
        this.capital_class_list = "valid";
        this.array[1] = 1;
      } else {
        this.capital_class_list = "invalid";
        this.array[1] = 0;
      }

      // Validate numbers
      var numbers = /[0-9]/g;
      if (this.testpassword.match(numbers)) {
        this.number_class_list = "valid";
        this.array[2] = 1;
      } else {
        this.number_class_list = "invalid";
        this.array[2] = 0;
      }

      // Special Character
      // var specials = /[#@!%*?&$]/g;
      var specials = /[#@!%*?&$^()+~|'{}:;.?~_+=<>/-]/g;
      if (this.testpassword.match(specials)) {
        this.special_class_list = "valid";
        this.array[3] = 1;
      } else {
        this.special_class_list = "invalid";
        this.array[3] = 0;
      }
      // Validate length
      if (this.testpassword.length >= 8) {
        this.length_class_list = "valid";
        this.array[4] = 1;
      } else {
        this.length_class_list = "invalid";
        this.array[4] = 0;
      }
      var sum =
        this.array[0] +
        this.array[1] +
        this.array[2] +
        this.array[3] +
        this.array[4];
      if (sum == 5 || sum == 0) {
        this.show_password_validator = false;
        this.correct_password = true;
        this.$emit("correctPassword", this.correct_password);
        // console.log(this.correct_password);
      } else {
        this.show_password_validator = true;
        this.correct_password = false;
        this.$emit("correctPassword", this.correct_password);
        // console.log(this.correct_password);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#pwd_vld_msg {
  // display: none;
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