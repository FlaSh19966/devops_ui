<template>
  <div class="dash-cont">
    <div class="container-fluid">
      <div class="card dash-card">
        <div class="card-header d-block d-sm-flex flex-wrap justify-content-between">
          <h4 class="mb-sm-0">Accounts List</h4>
          <div class="card-act d-flex flex-wrap">
           
            <a
              href="#"
              @click="add_edit='true'"
              class="darkblue-btn"
              data-toggle="modal"
              data-target="#exampleModalCenter"
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
                ></path>
              </svg>
              Add Accounts
            </a>
             <a href="javascript:void(0)" class="red-btn" @click="delete_selected">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                <path
                  id="trash-can-outline"
                  d="M8.375,3v.778H4V5.333h.875V15.444A1.661,1.661,0,0,0,6.625,17h8.75a1.661,1.661,0,0,0,1.75-1.556V5.333H18V3.778H13.625V3H8.375M6.625,5.333h8.75V15.444H6.625V5.333m1.75,1.556v7h1.75v-7H8.375m3.5,0v7h1.75v-7Z"
                  transform="translate(-4 -3)"
                  fill="#fff"
                ></path>
              </svg>
              Delete
            </a>
          </div>
        </div>
        <div class="card-body" id="page">
          <div class="table-box">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">
                      <div class="form-check checkbox checkbox-success">
                        <label class="form-check-label">
                          <input
                            class="form-check-input"
                            id="selectall"
                            type="checkbox"
                            @change="selected_questions('all')"
                          >
                          <span class="icn"></span>
                        </label>
                      </div>
                    </th>
                    <th scope="col">ACTION</th>
                    <th scope="col">ACCOUNT NAME</th>
                    <th scope="col">RESPONSE</th>
                    <th scope="col">SOURCES</th>
                    <th scope="col">INTENT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in show_superadmin_data" :key="index" id="list-group">
                    <th scope="row">
                      <div class="form-check checkbox checkbox-success">
                        <label class="form-check-label">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            @change="selected_questions(index)"
                          >
                          <span class="icn"></span>
                        </label>
                      </div>
                    </th>
                    <td class="action">
                      <a href="#" @click="edit_question(index)">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15.392"
                          height="15.392"
                          viewBox="0 0 15.392 15.392"
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                        >
                          <path
                            id="square-edit-outline"
                            d="M4.71,3A1.7,1.7,0,0,0,3,4.71V16.682a1.71,1.71,0,0,0,1.71,1.71H16.682a1.71,1.71,0,0,0,1.71-1.71V10.7h-1.71v5.986H4.71V4.71H10.7V3H4.71m10.928.855a.591.591,0,0,0-.41.171L14.185,5.061,16.322,7.2l1.043-1.035a.578.578,0,0,0,0-.812L16.04,4.026a.571.571,0,0,0-.4-.171M13.578,5.668l-6.3,6.311v2.138H9.413l6.3-6.311Z"
                            transform="translate(-3 -3)"
                            fill="#9499ae"
                          ></path>
                        </svg>
                      </a>
                      <a href="#" @click="delete_question(index)">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13.682"
                          height="15.392"
                          viewBox="0 0 13.682 15.392"
                        >
                          <path
                            id="trash-can-outline"
                            d="M8.276,3v.855H4v1.71h.855V16.682a1.71,1.71,0,0,0,1.71,1.71h8.551a1.71,1.71,0,0,0,1.71-1.71V5.565h.855V3.855H13.406V3H8.276M6.565,5.565h8.551V16.682H6.565V5.565m1.71,1.71v7.7h1.71v-7.7H8.276m3.42,0v7.7h1.71v-7.7Z"
                            transform="translate(-4 -3)"
                            fill="#f23d3d"
                          ></path>
                        </svg>
                      </a>
                    </td>
                    <td>{{row.question}}</td>
                    <td
                      class="red-tooltip"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      :title="row.response"
                    >{{row.short}}...</td>
                    <td>{{row.source}}</td>
                    <td>{{row.intent}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade dash-modal"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div class="modal-head d-flex align-items-center">
                <div class="head-icn">
                  <img src="/img/msg-blue.png" alt>
                </div>
                <h3>Add Account</h3>
              </div>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="empty_variable"
              >
                <img src="/img/close-icn.png" alt>
              </button>
              <form @submit="add_edit_question">
                <div class="form-group">
                  <label>Account Number</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter your Account Number"
                    v-model="question"
                  >
                </div>
                <div class="form-group">
                  <label>Account Details</label>
                  <textarea class="form-control" placeholder="Details" rows="5" v-model="response"></textarea>
                </div>
                <div class="form-group">
                  <label>Select Intent</label>
                  <select class="form-control" v-model="intents">
                    <option
                      v-for="(intent, index) in intentlist"
                      :key="index"
                      :value="intent"
                    >{{ intent }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Account Source</label>
                  <select class="form-control" v-model="source">
                    <option
                      v-for="(option, index) in options"
                      :key="index"
                      :value="option"
                    >{{ option }}</option>
                  </select>
                </div>
                <div class="btn-wrap text-right">
                  <button
                    type="button"
                    class="btn btn-link"
                    data-dismiss="modal"
                    @click="empty_variable"
                  >Cancel</button>
                  <button type="submit" class="darkblue-btn">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="pagin-table" style="margin-top:2%;margin-bottom:4%">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item">
              <a class="page-link" href="#" @click="page_require(page_no-1)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8.667"
                  height="15.204"
                  viewBox="0 0 8.667 15.204"
                >
                  <g id="arrow-point-to-left" transform="translate(105.806 15.204) rotate(180)">
                    <path
                      id="Path_1136"
                      data-name="Path 1136"
                      d="M105.493,8.354l-6.537,6.537a1.065,1.065,0,1,1-1.506-1.506L103.235,7.6,97.45,1.817A1.065,1.065,0,0,1,98.956.312l6.537,6.537a1.065,1.065,0,0,1,0,1.505Z"
                      transform="translate(0 0)"
                      fill="#9499ae"
                    ></path>
                  </g>
                </svg>
              </a>
            </li>
            <li
              :class="'page-item '+pagination_class(page_number)"
              v-for="page_number in total_pages"
              :key="page_number"
            >
              <a class="page-link" href="#" @click="page_require(page_number)">{{page_number}}</a>
            </li>

            <li class="page-item">
              <a class="page-link" href="#" @click="page_require(page_no+1)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8.667"
                  height="15.204"
                  viewBox="0 0 8.667 15.204"
                >
                  <g id="arrow-point-to-right" transform="translate(-97.139 0)">
                    <path
                      id="Path_1136"
                      data-name="Path 1136"
                      d="M105.493,8.354l-6.537,6.537a1.065,1.065,0,1,1-1.506-1.506L103.235,7.6,97.45,1.817A1.065,1.065,0,0,1,98.956.312l6.537,6.537a1.065,1.065,0,0,1,0,1.505Z"
                      transform="translate(0 0)"
                      fill="#9499ae"
                    ></path>
                  </g>
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
