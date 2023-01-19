<template>
  <div>
    <div class="dash-cont">
      <div class="container-fluid">
        <div class="table-box">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th
                    style="width:auto;text-align:center;cursor:pointer"
                    id="train_dialogue"
                    @click="toggle_component('TrainDialogue')"
                  >Train Dialogue Model</th>
                  <th
                    style="width:auto;text-align:center;cursor:pointer"
                    id="train_intent"
                    @click="toggle_component('TrainIntent')"
                  >Train Intent Model</th>
                  <th
                    style="width:auto;text-align:center;cursor:pointer"
                    id="train_ner_model"
                    @click="toggle_component('TrainNERModel')"
                  >Train NER Model</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        <div>
          <component :is="load_page"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TrainDialogue from "./TrainDialogue";
import TrainIntent from "./TrainIntent";
import TrainNERModel from "./TrainNERModel";
import api_calls from "@/portal/api_calls";
import $ from "jquery";
export default {
  data() {
    return {
      load_page: ""
    };
  },
  components: {
    TrainDialogue,
    TrainIntent,
    TrainNERModel
  },
  created() {
    this.load_page = "TrainDialogue";
    this.toggle_component(this.load_page)
  },
  mounted() {
    $("#train_dialogue").css("border-bottom", "0px");
  },
  methods: {
    toggle_component(type) {
      if (type == "TrainDialogue") {
        $("#train_intent").css("border-bottom", "solid");
        $("#train_ner_model").css("border-bottom", "solid");
        $("#train_dialogue").css("border-bottom", "none");
      } else if (type == "TrainIntent") {
        $("#train_dialogue").css("border-bottom", "solid");
        $("#train_ner_model").css("border-bottom", "solid");
        $("#train_intent").css("border-bottom", "none");
      }
      else if (type == "TrainNERModel") {
        $("#train_intent").css("border-bottom", "solid");
        $("#train_dialogue").css("border-bottom", "solid");
        $("#train_ner_model").css("border-bottom", "none");
      }
      this.load_page = type;
    }
  }
};
</script>
