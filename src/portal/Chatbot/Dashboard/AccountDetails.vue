<template>
  <div>
    <div class="spinner" v-show="show_loader" id="spinner"></div>
    <div class="dash-cont">
      <div class="container-fluid">
        <div class="card dash-card">
          <div class="card-header d-block d-sm-flex flex-wrap justify-content-between">
            <h4 class="mb-sm-0">Account Details</h4>
            <div class="card-act d-flex flex-wrap"></div>
          </div>
          <div class="card-body">
            <div
              class="modal fade dash-modal"
              id="intentmodel"
              tabindex="-1"
              role="dialog"
              aria-labelledby="intentmodeltitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-body">
                    <div class="modal-head d-flex align-items-center">
                      <div class="head-icn">
                        <img src="/img/msg-blue.png" alt />
                      </div>
                      <h3>Add Intent</h3>
                    </div>
                    <button
                      type="button"
                      @click="new_intents=''"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <img src="/img/close-icn.png" alt />
                    </button>
                    <form @submit="add_intents">
                      <div class="form-group">
                        <label>Add Intent</label>
                        <input
                          type="text"
                          v-model="new_intents"
                          class="form-control"
                          placeholder="Enter intent"
                        />
                      </div>
                      <div class="form-group">
                        <label>Add Intent</label>
                        <input
                          type="text"
                          v-model="new_intents"
                          class="form-control"
                          placeholder="Enter intent"
                        />
                      </div>
                      <div class="form-group">
                        <label>Add Intent</label>
                        <input
                          type="text"
                          v-model="new_intents"
                          class="form-control"
                          placeholder="Enter intent"
                        />
                      </div>
                      <div class="form-group">
                        <label>Add Intent</label>
                        <input type="text" v-model="new_intents" class="form-control" placeholder />
                      </div>
                      <div class="btn-wrap text-right">
                        <button
                          type="button"
                          class="btn btn-link"
                          @click="clear_fields"
                          data-dismiss="modal"
                        >Cancel</button>
                        <button type="submit" class="darkblue-btn" id="save_account_details">Save</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show_loader: false,
      account: {
        bank_name: "",
        branch: "",
        ifsc: "",
        account_no: ""
      }
    };
  }
};
</script>

<style scoped>
.input_heading {
  padding: 10px 15px 10px 50px;
  background-position: 12px 12px !important;
  background-size: 26px !important;
  line-height: 30px;
}
.col-md-5 {
  display: grid;
}
/* .spinner {
  z-index: 1;
  position: fixed;
  left: 50%;
  top: 50%;
  height: 60px;
  width: 60px;
  margin: 0px auto;
  -webkit-animation: rotation 1s infinite linear;
  -moz-animation: rotation 1s infinite linear;
  -o-animation: rotation 1s infinite linear;
  animation: rotation 1s infinite linear;
  border-left: 6px solid #283879;
  border-right: 6px solid #283879;
  border-bottom: 6px solid #283879;
  border-top: 6px solid #ffffff;
  border-radius: 100%;
} */

@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
  }
}
@-moz-keyframes rotation {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(359deg);
  }
}
@-o-keyframes rotation {
  from {
    -o-transform: rotate(0deg);
  }
  to {
    -o-transform: rotate(359deg);
  }
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
