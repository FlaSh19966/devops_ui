import axios from 'axios'

export default {
  methods: {
    create_chat (message, type) {
      var currency_list = [];
      if (type == "istable") {
        axios
          .get("https://api.exchangeratesapi.io/latest", {
            params: {
              base: "AUD"
            }
          })
          .then(response => {
            for (var i in message.extras[0].TABLE) {
              if (message.extras[0].TABLE[i].PROP == "TR") {
                currency_list.push({
                  currency_title: message.extras[0].TABLE[i].TD,
                  currency_value: parseFloat(
                    Math.round(
                      response.data.rates[message.extras[0].TABLE[i]["TD_1"]] *
                      100
                    ) / 100
                  ).toFixed(4),
                  type: "TR"
                });
              } else if (
                message.extras[0].TABLE[i].PROP == "THEAD" &&
                !this.isexchange
              ) {
                currency_list.push({
                  country_name: message.extras[0].TABLE[i].TD,
                  currency_name: message.extras[0].TABLE[i].TD_1,
                  type: "THEAD"
                });
              }
            }
            ///
            this.currencyexchange_list = currency_list;
            ///
            this.chat.push({
              is_table: true,
              table_title: this.parse(message.title),
              table_list: currency_list
            });
            this.update_scrollbar();
            setTimeout(() => {
              document.querySelector(".typing-indicator").style.display =
                "none";
            }, 1000);
          });
      } else if (type == "isprompt") {
        if (message.level > 0) {
          this.chat.push(message);
          this.$session.set("BotResponse_Conversation", this.chat);
          this.level = message.level;
          this.update_scrollbar("upto_end", "response");
        } else {
          this.chat.push(message);
          this.first_click = true;
          this.level = message.level;
          this.update_scrollbar("upto_end", "response");
        }
      } else {
        this.chat.push(message);
      }
      this.$session.set("BotResponse_Conversation", this.chat);
    },
    FXPaymentMode () {
      this.to_send = "/Foreignxchange17491_payment_mode";
      this.send_message(
        "is_prompt",
        "/Foreignxchange17491_payment_mode",
        "Payment"
      );
    },
    FXTrackingParcel () {
      this.to_send = "/Foreignxchange17491_tracking_parcel";
      this.send_message(
        "is_prompt",
        "/Foreignxchange17491_tracking_parcel",
        "Track My Parcel"
      );
    },
    // ForeignExchangeConversion() {
    //   this.to_send = "/Foreignxchange17491_exchange_rate";
    //   this.send_message(
    //     "is_prompt",
    //     "/Foreignxchange17491_exchange_rate",
    //     "Exchange Rate"
    //   );
    // },
    ForeignExchangeConversion () {
      // this.to_send = "/Foreignxchange17491_exchange_rate";
      this.to_send = '/Foreignxchange17491_exchange_rate{"BUY_OR_SELL": "BUY"}';
      this.send_message(
        "is_prompt",
        '/Foreignxchange17491_exchange_rate{"BUY_OR_SELL": "BUY"}',
        "Exchange Rate"
      );
    },
    ex1 () {
      setTimeout(() => {
        if (document.getElementById("r1") != null) {
          $("#l1").val(1);
          for (let i = 0; i < this.currencyexchange_list.length; i++) {
            $("#country").append(
              `<option value="${this.currencyexchange_list[i].currency_value}">${this.currencyexchange_list[i].currency_title}</option>`
            );
          }
          $("#r1").text(document.getElementById("country").value);
          // document.getElementById("r1").addEventListener("keyup", function() {
          //   var x = document.getElementById("r1").innerText;
          //   var con = document.getElementById("country").value;
          //   x = x / con;
          //   x = x.toFixed(4);
          //   $("#l1").val(x);
          // });
          document.getElementById("l1").addEventListener("keyup", function () {
            var x = document.getElementById("l1").value;
            var con = document.getElementById("country").value;
            x = x * con;
            x = x.toFixed(4);
            $("#r1").text(x);
          });
          $(document).on("change", "#country", function () {
            // document.getElementById("country").addEventListener("keyup", function(){
            var x = document.getElementById("l1").value;
            var con = document.getElementById("country").value;
            x = x * con;
            x = x.toFixed(4);
            $("#r1").text(x);
          });
        }
      }, 100);
    },
    //sell function for foreign exchange
    // ex2() {
    //   setTimeout(() => {
    //     if (document.getElementById("r2") != null) {
    //       $("#l2").val(1);
    //       for (let i = 0; i < this.currencyexchange_list.length; i++) {
    //         $("#country2").append(
    //           `<option value="${this.currencyexchange_list[i].currency_value}">${this.currencyexchange_list[i].currency_title}</option>`
    //         );
    //       }
    //       $("#r2").val(document.getElementById("country2").value);
    //       document.getElementById("r2").addEventListener("keyup", function() {
    //         var x = document.getElementById("r2").value;
    //         var con = document.getElementById("country2").value;
    //         x = x / con;
    //         x = x.toFixed(4);
    //         $("#l2").val(x);
    //       });
    //       document.getElementById("l2").addEventListener("keyup", function() {
    //         var x = document.getElementById("l2").value;
    //         var con = document.getElementById("country2").value;
    //         x = x * con;
    //         x = x.toFixed(4);
    //         $("#r2").val(x);
    //       });
    //       $(document).on("change", "#country2", function() {
    //         // document.getElementById("country2").addEventListener("keyup", function(){
    //         var x = document.getElementById("l2").value;
    //         var con = document.getElementById("country2").value;
    //         x = x * con;
    //         x = x.toFixed(4);
    //         $("#r2").val(x);
    //       });
    //     }
    //   }, 3000);
    // }
  },
}
