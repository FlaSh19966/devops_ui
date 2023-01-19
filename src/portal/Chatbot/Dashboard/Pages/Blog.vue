<template>
  <div>
    <div class="spinner" v-show="spinnerOn" id="spinner"></div>
    <div class="dash-cont">
      <div class="container-fluid">
        <div class="card dash-card">
          <div class="card-header d-block d-sm-flex flex-wrap justify-content-between">
            <h4 class="mb-sm-0">Create A Blog</h4>
            <div class="card-act d-flex flex-wrap">
              <a href="#" class="red-btn" @click="clear_all">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                  <path
                    d="M8.375,3v.778H4V5.333h.875V15.444A1.661,1.661,0,0,0,6.625,17h8.75a1.661,1.661,0,0,0,1.75-1.556V5.333H18V3.778H13.625V3H8.375M6.625,5.333h8.75V15.444H6.625V5.333m1.75,1.556v7h1.75v-7H8.375m3.5,0v7h1.75v-7Z"
                    transform="translate(-4 -3)"
                    fill="#fff"
                  />
                </svg>
                Clear
              </a>
              <a
                href="#"
                class="darkblue-btn"
                data-toggle="modal"
                data-target="#usermodel"
                @click="show_blogs"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13.997"
                  viewBox="0 0 14 13.997"
                >
                  <path
                    id="Union_13"
                    data-name="Union 13"
                    d="M-12684,2058v-5h-5a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5v-5a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5h5a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5v5a1,1,0,0,1-1,1A1,1,0,0,1-12684,2058Z"
                    transform="translate(12690.001 -2045.002)"
                    fill="#fff"
                  />
                </svg>
                Show Blogs
              </a>
            </div>
          </div>
          <div class="card-body">
            <form @submit="submit_blog">
              <div class="form-group">
                <label>Blog Title</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="blog.title"
                  :disabled="isEdit"
                  placeholder="Enter Blog Title"
                />
              </div>
              <div class="form-group">
                <label>Blog Type</label>
                <select class="form-control" v-model="blog.type">
                  <option value>Select a blog type</option>
                  <option :value="type" v-for="(type, index) in blog_types" :key="index">{{ type }}</option>
                </select>
              </div>
              <div class="form-group" style="width:25%">
                <label>Upload an image</label>
                <div class="custom-file">
                  <input
                    id="file"
                    class="custom-file-input form-control"
                    @change="fileinput"
                    type="file"
                  />
                  <label
                    style="font-weight:400"
                    class="custom-file-label form-control"
                    for="file"
                  >{{file_label}}</label>
                </div>
              </div>
              <div class="form-group">
                <div id="editor"></div>
              </div>
              <div class="btn-wrap text-right">
                <button type="submit" class="darkblue-btn">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade dash-modal"
      id="usermodel"
      tabindex="-1"
      role="dialog"
      aria-labelledby="usermodeltitle"
      aria-hidden="true"
      style="margin-left:-620px"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content" style="width:205%">
          <div class="modal-body" style="width:1220px">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/user-blue.png" alt />
              </div>
              <h3>Blogs</h3>
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <img src="/img/close-icn.png" alt />
            </button>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">
                    <div class="form-check checkbox checkbox-success">
                      <label class="form-check-label">
                        <input class="form-check-input" id="selectall" type="checkbox" />
                        <span class="icn"></span>
                      </label>
                    </div>
                  </th>
                  <th scope="col">Actions</th>
                  <th scope="col">BLOG TITLE</th>
                  <th scope="col">BLOG TYPE</th>
                  <th scope="col">IMAGE</th>
                  <th scope="col" style="width:35%">BLOG CONTENT</th>
                  <th scope="col" style="width:20%">BLOG DATE</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(blog, index) in blog_list" :key="index">
                  <th scope="col">
                    <div class="form-check checkbox checkbox-success">
                      <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" />
                        <span class="icn"></span>
                      </label>
                    </div>
                  </th>
                  <th scope="col">
                    <a href="#" @click="edit_blog(index)" style="margin-left: 22%;">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15.392"
                        height="15.392"
                        viewBox="0 0 15.392 15.392"
                        data-toggle="modal"
                        data-target="#usermodel"
                      >
                        <path
                          id="square-edit-outline"
                          d="M4.71,3A1.7,1.7,0,0,0,3,4.71V16.682a1.71,1.71,0,0,0,1.71,1.71H16.682a1.71,1.71,0,0,0,1.71-1.71V10.7h-1.71v5.986H4.71V4.71H10.7V3H4.71m10.928.855a.591.591,0,0,0-.41.171L14.185,5.061,16.322,7.2l1.043-1.035a.578.578,0,0,0,0-.812L16.04,4.026a.571.571,0,0,0-.4-.171M13.578,5.668l-6.3,6.311v2.138H9.413l6.3-6.311Z"
                          transform="translate(-3 -3)"
                          fill="#9499ae"
                        />
                      </svg>
                    </a>
                    <a href="#" @click="delete_blog(blog.title)" data-dismiss="modal">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                      >
                        <path
                          d="M8.375,3v.778H4V5.333h.875V15.444A1.661,1.661,0,0,0,6.625,17h8.75a1.661,1.661,0,0,0,1.75-1.556V5.333H18V3.778H13.625V3H8.375M6.625,5.333h8.75V15.444H6.625V5.333m1.75,1.556v7h1.75v-7H8.375m3.5,0v7h1.75v-7Z"
                          transform="translate(-4 -3)"
                          fill="#ff0000"
                        />
                      </svg>
                    </a>
                  </th>
                  <th scope="col">{{blog.title}}</th>
                  <th scope="col">{{blog.type}}</th>
                  <th scope="col">
                    <img :src="blog.img_src" alt="..." height="60" width="60" />
                  </th>
                  <th scope="col" v-html="blog.short_desc">{{blog.short_desc}}...</th>
                  <th scope="col">{{blog.date}}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { setTimeout } from "timers";
import api_calls from "@/portal/api_calls";
export default {
  components: {},
  data() {
    return {
      quill: "",
      blog_text: "",
      blog: {
        title: "",
        type: "",
        content: "",
        img_file: ""
      },
      file_label: "Choose file",
      blog_types: ["Marketing", "Technology", "Consultancy", "Finance"],
      blog_list: [],
      isEdit: false,
      old_file_name: null,
      spinnerOn: false,
      image_edit: false,
      blog_submit_url: process.env.BLOG_CREATE_URL,
      show_blogs_url: process.env.SHOW_BLOGS_URL,
      blog_update_url: process.env.BLOG_UPDATE_URL
    };
  },
  mounted() {
    this.quill = new Quill("#editor", {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["image", "code-block"]
        ]
      },
      theme: "snow"
    });
    this.quill.on("text-change", () => {
      this.$emit(
        "input",
        this.quill.getText() ? this.quill.root.innerHTML : ""
      );
      this.blog_text = this.quill.getText() ? this.quill.root.innerHTML : "";
    });
  },
  methods: {
    submit_blog() {
      event.preventDefault();
      if (
        this.blog.title != "" &&
        this.blog.type != "" &&
        this.blog_text != "" &&
        this.file_label != "Choose file"
      ) {
        this.spinnerOn = true;
        if (this.isEdit == false) {
          axios
            .post(api_calls.blog_submit_url(), {
              token: this.$session.get("UserInformation").tokens,
              email: this.$session.get("UserInformation").email,
              blog_title: this.blog.title,
              blog_type: this.blog.type,
              blog_content: this.blog_text,
              blog_image: this.blog.img_file,
              image_name: this.file_label
            })
            .then(response => {
              if (response.data == "blog added") {
                toastr.success("Your blog has been added successfully");
                this.clear_all();
              } else if (response.data == "Duplicate Blog Name") {
                toastr.error(
                  "This blog title already exists. Please enter another title."
                );
              } else if (response.data == "Duplicate image") {
                toastr.error(
                  "Image already exists. Please upload a unique image"
                );
              }
              this.clear_all();
            });
        }
        if (this.isEdit == true) {
          this.spinnerOn = true;
          document.getElementById("spinner").parentElement.style.opacity = 0.5;
          axios
            .post(api_calls.blog_update_url(), {
              token: this.$session.get("UserInformation").tokens,
              email: this.$session.get("UserInformation").email,
              blog_title: this.blog.title,
              blog_type: this.blog.type,
              blog_content: this.blog_text,
              blog_image: this.blog.img_file,
              image_name: this.file_label,
              isImageEdit: this.image_edit ? "True" : "False",
              old_image_name: this.old_file_name
            },{
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            })
            .then(response => {
              if (response.data == "blog updated") {
                toastr.success("Your blog has been updated successfully");
                this.clear_all();
              } else if (response.data == "Duplicate Blog Name") {
                toastr.error(
                  "This blog title already exists. Please enter another title."
                );
              } else if (response.data == "Duplicate image") {
                toastr.error(
                  "Image already exists. Please upload a unique image"
                );
              }
              this.clear_all();
            });
        }
      } else {
        toastr.error("Please enter all the required details");
      }
    },
    clear_all() {
      this.blog.title = "";
      this.blog.type = "";
      this.blog.content = "";
      this.file_label = "Choose file";
      this.quill.root.innerHTML = "";
      this.isEdit = false;
      this.image_edit = false;
      setTimeout(() => {
        this.spinnerOn = false;
        this.$router.go();
      }, 1500);
    },
    show_blogs() {
      axios
        .post(api_calls.show_blogs_url(), {
          token: this.$session.get("UserInformation").tokens,
          email: this.$session.get("UserInformation").email,
          getAll: "True"
        })
        .then(response => {
          this.blog_list = [];
          for (var i in response.data[0]) {
            this.blog_list.push({
              title: response.data[0][i],
              type: response.data[1][i],
              img_src: response.data[2][i],
              content: response.data[3][i],
              short_desc: response.data[3][i].slice(
                0,
                response.data[3][i].length * 0.01
              ),
              date: response.data[4][i]
            });
          }
        });
    },
    delete_blog(title) {
      axios
        .post(api_calls.show_blogs_url(), {
          blog_title: title,
          isDelete: "True",
          email: this.$session.get("UserInformation").email,
          token: this.$session.get("UserInformation").tokens
        })
        .then(response => {
          if (response.data == "Query Executed Successfully") {
            toastr.success("Deleted Successfully");
            this.clear_all();
          }
        });
    },
    edit_blog(index) {
      this.blog.title = this.blog_list[index].title;
      this.blog.type = this.blog_list[index].type;
      this.quill.root.innerHTML = this.blog_list[index].content;
      this.file_label = String(
        this.blog_list[index].img_src.match(
          /[a-zA-Z0-9\-]{0,}\.[a-zA-Z0-9]{0,}$/
        )
      );
      this.isEdit = true;
      $("#usermodel").modal("hide");
    },
    fileinput(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (this.file_label != "Choose file") {
        this.old_file_name = this.file_label;
        this.image_edit = true;
      }
      if (!files.length) return;
      this.file_label = files[0].name;
      this.createImage(files[0]);
    },
    createImage(file, type) {
      let reader = new FileReader();

      reader.onload = e => {
        this.blog.img_file = e.target.result.split("base64,")[1];
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style scoped>
</style>
