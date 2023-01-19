<template>
  <div>
    <div style="background-color: #fafafa; padding-top: 20px">
      <div
        class="modal-body"
        style="
          width: 900px;
          margin: auto;
          text-align: justify;
          border: 1px solid rgb(219, 219, 219);
          border-radius: 9px;
          background-color: #fff;
          height: 90vh;
        "
      >
        <div class="modal-head d-flex align-items-center pb-0">
          <h3>Cense AI</h3>
          <img
            src="/img/cense_image.png"
            style="width: 25%; margin-left: auto"
            alt
          />
        </div>
        <br />
        <div class="card-body" style="padding: 0px 10px">
          <div class="d-flex">
            <p class="mx-auto">
              Please wait while we redirect you back to our portal!!
            </p>
          </div>
          <div class="container-spinner mx-auto">
            <span class="circle"></span>
            <span class="circle"></span>
            <span class="circle"></span>
            <span class="circle"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api_calls from "@/portal/api_calls";
import { update_sidebar_menu, update_restriction_list} from "@/portal/mixins";

export default {
  name: "PaymentRedirect",
  data() {
    return {
      payment_status: null,
      cense_session: null,
      payment_type: null,
      subscription_types_check: ['subscription', 'Shopify']
    };
  },
  mixins: [
    update_sidebar_menu,
    update_restriction_list
  ],
  created() {
    this.payment_status = this.$route.query.status;
    this.cense_session = this.$route.query.cense_session;
    this.payment_type = this.$route.query.payment_type;
    if(Boolean(this.payment_status) && Boolean(this.cense_session) && Boolean(this.payment_type)){
      axios.post(api_calls.stripe_payment_gateway(), {
        store_payment_response: true,
        payment_response_cense_reference_id: this.cense_session,
        payment_response_data: this.payment_status,
        payment_type: this.payment_type
      }).then((response) => {
          if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE.MSG_CODE) {
            if (this.subscription_types_check.includes(this.payment_type)){
              if (response.data.data.UserMenu !== null) {
                  let message = response.data.data.UserMenu;
                  this.update_sidebar_menu(message)
                }
                // if (response.data.RestrictionList !== null) {
                  this.update_restriction_list(response.data.data.RestrictionList, response.data.data.SubscribedPlan)
                // }
            }
            setTimeout(() => {
            this.$router.push({
              name: "Dashboard",
              params: {
                stripe_payment_redirect: true,
                payment_response_data: this.payment_status,
                payment_response_cense_reference_id: this.cense_session,
                payment_type: this.payment_type
              },
            });
          }, 2000);
          }
          if (response.data.message.MSG_CODE === this.api_status_code.STATUS_SUCCESS.MSG_CODE) {
            setTimeout(() => {
            this.$router.push({
              name: "Dashboard",
              params: {
                stripe_payment_redirect: true,
                payment_response_data: this.payment_status,
                payment_response_cense_reference_id: this.cense_session,
                payment_type: this.payment_type
              },
            });
          }, 2000);
          }
        })
        .catch((e) => {
          console.log(e);
          this.$router.push({
            params: {
              stripe_payment_redirect: true,
              payment_response_data: "Failure",
              payment_response_cense_reference_id: this.cense_session,
              payment_type: this.payment_type
            },
            name: "Dashboard",
          });
        });
    } else {
      this.$router.push({
        params: {
          stripe_payment_redirect: true,
          payment_response_data: "Failure",
          payment_response_cense_reference_id: this.cense_session,
        },
        name: "Dashboard",
      });
    }
  },
};
</script>

<style scoped lang="scss">
.container-spinner {
  height: 15px;
  width: 105px;
  display: flex;
  position: relative;
  .circle {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #293677;
    animation: move 500ms linear 0ms infinite;
    margin-right: 30px;

    &:first-child {
      position: absolute;
      top: 0;
      left: 0;
      animation: grow 500ms linear 0ms infinite;
    }

    &:last-child {
      position: absolute;
      top: 0;
      right: 0;
      margin-right: 0;
      animation: grow 500ms linear 0s infinite reverse;
    }
  }
}

@keyframes grow {
  from {
    transform: scale(0, 0);
    opacity: 0;
  }
  to {
    transform: scale(1, 1);
    opacity: 1;
  }
}

@keyframes move {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(45px);
  }
}
</style>