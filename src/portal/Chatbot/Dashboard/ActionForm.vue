<template>
  <div>
    <div class="dash-cont">
      <div class="container-fluid" id="dashboard-chart">
        <div class="card dash-card">
          <div class="card-header d-flex flex-wrap justify-content-between">
            <h4 class="mab-3 mb-md-0">Action Form Creator</h4>
            <div class="card-act d-flex flex-wrap">
              <div class="form-group mb-0">
                <select v-model="newNodeType" class="form-control">
                  <option v-for="(item, index) in nodeCategory" :key="index" :value="index">{{item}}</option>
                </select>
              </div>
              <div class="form-group mb-0">
                <input
                  class="form-control"
                  type="text"
                  v-model="newNodeValue"
                  placeholder="Enter node value"
                >
              </div>
              <button type="submit" @click="addNode" class="darkblue-btn">Add</button>
              <button type="submit" @click="submit_template" class="darkblue-btn">Submit</button>
            </div>
          </div>
          <div class="card-body">
            <simple-flowchart
              :scene.sync="scene"
              @nodeClick="nodeClick"
              @nodeDelete="nodeDelete"
              @linkBreak="linkBreak"
              @linkAdded="linkAdded"
              @canvasClick="canvasClick"
              :height="800"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div id="app">
    <h1>simple flowchart</h1>
    <div class="tool-wrapper">
    </div>
  </div>-->
</template>

<script>
import SimpleFlowchart from "vue-simple-flowchart";
import "vue-simple-flowchart/dist/vue-flowchart.css";
import axios from "axios";
import api_calls from "@/portal/api_calls";
export default {
  name: "app",
  components: {
    SimpleFlowchart
  },
  data() {
    return {
      data_set: [],
      scene: {
        centerX: 1024,
        centerY: 140,
        scale: 1,
        nodes: [],
        links: []
      },
      level_count: 0,
      newNodeType: 0,
      newNodeValue: "",
      nodeCategory: ["Prompt", "Button", "Hyperlink", "Video", "Text", "User Reply"]
    };
  },
  methods: {
    data_management(node, parent_label, parent_type) {
      var level_count = this.nodes_level_count(node[0].id);
      if (this.data_set.length <= level_count) {
        this.data_set.push([]);
      }
      var isExists = this.data_set[level_count].filter(required_node => {
        return required_node.label == node[0].label;
      });
      if (isExists.length == 0) {
        this.data_set[level_count].push({
          label: node[0].label,
          type: node[0].type,
          parent_label: parent_label,
          parent_type: parent_type
        });
      }
    },
    data_filter(start_index, label, type) {},
    nodes_level_count(to) {
      var local_to = to;
      var branch;
      var level_count = 0;
      for (var i in this.scene.links) {
        branch = this.scene.links.filter(link => {
          return link.to == local_to;
        });
        if (branch.length >= 1) {
          level_count += 1;
          local_to = branch[0].from;
        } else {
        }
      }
      return level_count;
    },
    canvasClick(e) {
      // console.log("canvas Click, event:", e);
    },
    addNode() {
      if (this.newNodeValue == "") {
        toastr.error("Please enter a value.");
      } else {
        let maxID = Math.max(
          0,
          ...this.scene.nodes.map(link => {
            return link.id;
          })
        );
        this.scene.nodes.push({
          id: maxID + 1,
          x: -400,
          y: 50,
          type: this.nodeCategory[this.newNodeType],
          label: this.newNodeValue ? this.newNodeValue : `test${maxID + 1}`
        });
        this.newNodeValue = "";
      }
    },
    nodeClick(id) {
      // console.log("node click", id);
    },
    nodeDelete(id) {
      // console.log("node delete", id);
    },
    submit_template() {
      if (this.data_set.length == 0) {
        toastr.error("Please create a valid tree.");
      } else {
        axios
          .post(api_calls.submit_closed_form_url(), {
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
            email: this.$session.get("UserInformation").email,
            token: this.$session.get("UserInformation").tokens,
            license_key: this.$session.get("UserInformation").license_key,
            tree: this.data_set
          })
          .then(response => {
            this.data_set = [];
            if (response.data == "Query Executed Successfully") {
            }
          });
      }
    },
    linkBreak(id) {
      var child_node = this.scene.nodes.filter(node => {
        return node.id == id.to;
      });
      var children_count = this.scene.links.filter(link => {
        return link.from == id.to;
      });
      var level_count = this.nodes_level_count(id.to);
      if (
        child_node[0].type !== "Prompt" &&
        level_count == 0 &&
        children_count.length > 0
      ) {
        toastr.error("Only prompts can be root nodes.");
        this.scene.links.push(id);
      } else {
        this.data_filter(level_count, child_node[0].label, child_node[0].type);
      }
    },
    linkAdded(link) {
      var node = this.scene.nodes.filter(node => {
        return node.id == link.from;
      });
      var node_link = this.scene.links.filter(temp_link => {
        return temp_link.to == node[0].id;
      });
      if (node[0].type != "Prompt" && node_link.length == 0) {
        toastr.error("Only prompts can be root nodes.");
        this.scene.links = this.scene.links.filter(temp_link => {
          return temp_link.from != link.from;
        });
      } else {
        var parent_node = this.scene.nodes.filter(node => {
          return node.id == link.from;
        });
        var child_node = this.scene.nodes.filter(node => {
          return node.id == link.to;
        });
        this.data_management(parent_node, "Root", "Root");
        this.data_management(
          child_node,
          parent_node[0].label,
          parent_node[0].type
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  overflow: hidden;
  height: 800px;
  .tool-wrapper {
    position: relative;
  }
}
.node-main > .node-type {
  background: #293978 !important;
}
</style>
