<template>
  <div>
    <div class="dash-cont">
      <div class="container-fluid">
        <div class="card dash-card">
          <div class="card-header d-block d-sm-flex flex-wrap justify-content-between">
            <div style="display: contents;">
              <div class="control">
                <div class="headings">
                  <h5>CONTROLS</h5>
                </div>
                <div class="symbols">
                  <div
                    id="Text_Box"
                    draggable="true"
                    @dragstart="startdrag"
                    class="form-control"
                    title="Text Box"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13.169"
                      height="10.06"
                      style="fill:#979797;margin-bottom: 2%;"
                      viewBox="0 0 13.169 10.06"
                    >
                      <g transform="translate(120 2)">
                        <g transform="translate(-120 -2)">
                          <path
                            class="a"
                            d="M85.044,240.849H82.613c-.275,0-.386-.1-.385-.375.006-1.587-.029-3.175.019-4.761a7.627,7.627,0,0,1,.413-2.357,3.71,3.71,0,0,1,3.079-2.5,4.567,4.567,0,0,1,.855-.066c.231,0,.344.107.345.336q.005.786,0,1.573a.306.306,0,0,1-.289.337,1.34,1.34,0,0,0-1.4,1.321,7.624,7.624,0,0,0-.06,1.205c0,.128.079.122.165.122h2.126a.457.457,0,0,1,.214.029.334.334,0,0,1,.175.34q0,1.551,0,3.1,0,.641,0,1.281c0,.32-.093.411-.419.411h-2.4Z"
                            transform="translate(-82.221 -230.79)"
                          />
                          <path
                            class="a"
                            d="M340.8,237.753c.014-.677-.03-1.517.033-2.356a8.181,8.181,0,0,1,.337-1.872,3.724,3.724,0,0,1,2.969-2.65,4.538,4.538,0,0,1,1.027-.1.305.305,0,0,1,.347.338q.007.786,0,1.572a.311.311,0,0,1-.337.337,1.25,1.25,0,0,0-1.3,1.034,5.572,5.572,0,0,0-.12,1.5c0,.12.085.109.163.109h2.155c.248,0,.357.107.358.354,0,.611,0,1.223,0,1.834q0,1.288,0,2.577c0,.3-.1.4-.4.4H341.2c-.3,0-.4-.1-.4-.4C340.8,239.594,340.8,238.755,340.8,237.753Z"
                            transform="translate(-333.266 -230.777)"
                          />
                        </g>
                      </g>
                    </svg>
                    Text Box
                  </div>
                  <div
                    id="Textarea"
                    draggable="true"
                    @dragstart="startdrag"
                    class="form-control"
                    title="Textarea"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14.839"
                      height="14.323"
                      style="fill:#979797;margin-bottom: 2%;"
                      viewBox="0 0 14.839 14.323"
                    >
                      <g transform="translate(175.699 113.805)">
                        <path
                          class="a"
                          d="M18.839-55.567H8.568a.193.193,0,0,1-.174-.059.175.175,0,0,1-.034-.193.174.174,0,0,1,.165-.1c.115,0,.23,0,.346,0H19.194v.1q0,5.411,0,10.822a.187.187,0,0,1-.177.214c-.109,0-.179-.083-.179-.213q0-2.44,0-4.88,0-2.256,0-4.512,0-.542,0-1.084Z"
                          transform="translate(-181.214 -56.991)"
                        />
                        <path
                          class="a"
                          d="M-101.054,43.377h10.2c.131,0,.2.064.2.177s-.078.178-.205.178h-10.558c0-.03-.005-.054,0-.079,0-.458,0-.917,0-1.375q0-1.837,0-3.674,0-2.375,0-4.75c0-.371,0-.742,0-1.113a.174.174,0,0,1,.225-.186.185.185,0,0,1,.133.192q0,1.975,0,3.95,0,2.617,0,5.234,0,.687,0,1.375C-101.057,43.325-101.055,43.346-101.054,43.377Z"
                          transform="translate(-73.142 -144.104)"
                        />
                        <path
                          class="a"
                          d="M-175.127-112.766a2.208,2.208,0,0,1,.3.169.527.527,0,0,1,.143.6.533.533,0,0,1-.541.325.521.521,0,0,1-.456-.386,1.081,1.081,0,0,1,.021-.494,2.727,2.727,0,0,1,.424-1.02,1.155,1.155,0,0,1,.158-.176.2.2,0,0,1,.235-.032c.081.04.081.115.076.192a.923.923,0,0,1-.135.371C-174.979-113.064-175.055-112.908-175.127-112.766Z"
                          transform="translate(0 0)"
                        />
                        <path
                          class="a"
                          d="M617.488,679.933a.582.582,0,0,1-.394-.224.529.529,0,1,1,.95-.271,2.688,2.688,0,0,1-.485,1.355.9.9,0,0,1-.147.156.194.194,0,0,1-.229.022c-.074-.038-.075-.108-.072-.18a.865.865,0,0,1,.127-.366C617.321,680.265,617.4,680.1,617.488,679.933Z"
                          transform="translate(-780.502 -780.481)"
                        />
                        <path
                          class="a"
                          d="M721.452,679.936a.587.587,0,0,1-.389-.218.529.529,0,0,1,.6-.82.526.526,0,0,1,.341.551,2.694,2.694,0,0,1-.465,1.323.958.958,0,0,1-.159.175.2.2,0,0,1-.235.027c-.075-.043-.076-.114-.071-.188a.913.913,0,0,1,.134-.371C721.29,680.259,721.368,680.1,721.452,679.936Z"
                          transform="translate(-882.868 -780.484)"
                        />
                        <path
                          class="a"
                          d="M-71.007-112.757a1.641,1.641,0,0,1,.278.14.514.514,0,0,1,.191.561.5.5,0,0,1-.41.38.523.523,0,0,1-.626-.516,2.6,2.6,0,0,1,.511-1.438.7.7,0,0,1,.131-.129.191.191,0,0,1,.217-.017c.074.037.078.105.076.178a.853.853,0,0,1-.125.366C-70.848-113.071-70.929-112.91-71.007-112.757Z"
                          transform="translate(-102.525 -0.004)"
                        />
                      </g>
                    </svg>
                    Textarea
                  </div>
                  <div
                    id="Check_Box"
                    draggable="true"
                    @dragstart="startdrag"
                    class="form-control"
                    title="Button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14.611"
                      height="12.369"
                      style="fill:#979797;margin-bottom: 2%;"
                      viewBox="0 0 14.611 12.369"
                    >
                      <g transform="translate(188 -107)">
                        <g transform="translate(-188 107)">
                          <path
                            class="a"
                            d="M231.954,174.87c.355-.357.686-.692,1.018-1.024l4.6-4.6a.714.714,0,0,1,1.135,0c.283.282.567.562.847.847a.7.7,0,0,1,0,1.1q-2.637,2.641-5.278,5.279l-1.748,1.749a.709.709,0,0,1-1.136.005l-3.649-3.649a.7.7,0,0,1-.009-1.114q.443-.448.891-.891a.7.7,0,0,1,1.058.008q1.071,1.069,2.139,2.14C231.868,174.758,231.9,174.805,231.954,174.87Z"
                            transform="translate(-225.218 -168.389)"
                          />
                          <path
                            class="a"
                            d="M160.269,150.362h3.64a2.424,2.424,0,0,1,1,.2.283.283,0,0,1,.1.5,4.921,4.921,0,0,1-.4.4.4.4,0,0,1-.247.084c-.3-.009-.59-.054-.885-.055q-3.394-.007-6.788,0a1.386,1.386,0,0,0-1.461,1.454q-.006,3.624,0,7.249a1.38,1.38,0,0,0,1.4,1.4c1.28.005,2.56,0,3.84,0,1.152,0,2.3,0,3.455,0a1.382,1.382,0,0,0,1.4-1.226,6.986,6.986,0,0,0,.013-.782c0-.522-.005-1.044.006-1.566a.483.483,0,0,1,.115-.282c.157-.181.337-.343.506-.515a.276.276,0,0,1,.321-.075.269.269,0,0,1,.179.276c-.006,1.008.017,2.018-.024,3.024a2.461,2.461,0,0,1-2.162,2.245c-.462.042-.93.03-1.4.031q-3.125,0-6.251,0a2.508,2.508,0,0,1-2.389-1.7,2.772,2.772,0,0,1-.138-.842q-.016-3.655,0-7.31a2.5,2.5,0,0,1,2.408-2.5c.91-.029,1.822-.008,2.733-.009Z"
                            transform="translate(-154.095 -150.356)"
                          />
                        </g>
                      </g>
                    </svg>
                    Check Box
                  </div>
                  <div
                    id="Radio_Button"
                    draggable="true"
                    @dragstart="startdrag"
                    class="form-control"
                    title="Button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16.122"
                      height="16.12"
                      style="fill:#979797;margin-bottom: 2%;"
                      viewBox="0 0 16.122 16.12"
                    >
                      <g transform="translate(-708.017 101.974)">
                        <path
                          class="a"
                          d="M716.072-85.854a8.048,8.048,0,0,1-8.055-8.123,8.058,8.058,0,0,1,8.059-8,8.07,8.07,0,0,1,8.063,8.126A8.069,8.069,0,0,1,716.072-85.854ZM709.6-93.96a6.452,6.452,0,0,0,6.492,6.524,6.468,6.468,0,0,0,6.461-6.436,6.456,6.456,0,0,0-6.5-6.519A6.445,6.445,0,0,0,709.6-93.96Z"
                          transform="translate(0)"
                        />
                        <path
                          class="a"
                          d="M744.984-69.06A3.994,3.994,0,0,1,748.955-65a4,4,0,0,1-4.019,3.954,3.989,3.989,0,0,1-4-4.1A3.987,3.987,0,0,1,744.984-69.06Z"
                          transform="translate(-28.869 -28.862)"
                        />
                      </g>
                    </svg>
                    Radio Button
                  </div>
                  <div
                    id="Dropdown"
                    draggable="true"
                    @dragstart="startdrag"
                    class="form-control"
                    title="Button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13.011"
                      height="13.01"
                      style="fill:#979797;margin-bottom: 2%;"
                      viewBox="0 0 13.011 13.01"
                    >
                      <g transform="translate(122 -226)">
                        <g transform="translate(-122 226)">
                          <path
                            class="a"
                            d="M143.989,227.558q2.5,0,5.007,0a1.429,1.429,0,0,1,1.463,1.111,1.722,1.722,0,0,1,.042.4q0,4.988,0,9.975a1.432,1.432,0,0,1-1.118,1.478,2.1,2.1,0,0,1-.476.044q-4.911,0-9.822,0a1.464,1.464,0,0,1-1.553-1.125,1.678,1.678,0,0,1-.039-.38q0-5,0-9.995a1.435,1.435,0,0,1,1.127-1.472,2.007,2.007,0,0,1,.438-.035Q141.524,227.556,143.989,227.558Zm-5.044,6.494c0,1.6,0,3.21,0,4.814,0,.185.033.251.238.25q4.824-.011,9.648,0c.173,0,.227-.042.226-.222q-.008-4.833,0-9.667c0-.185-.06-.22-.229-.219q-4.824.007-9.648,0c-.182,0-.237.045-.236.232C138.949,230.842,138.945,232.447,138.945,234.052Z"
                            transform="translate(-137.492 -227.557)"
                          />
                          <path
                            class="a"
                            d="M217.409,343.722l2.572-2.578.979.982-3.557,3.557-3.558-3.555.985-.987Z"
                            transform="translate(-210.915 -336.783)"
                          />
                        </g>
                      </g>
                    </svg>
                    Dropdown
                  </div>
                  <!-- <div id="File_Upload" draggable="true" @dragstart="startdrag" class="form-control" title="Button">
                                        <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="12.785" 
                                        height="13.14" 
                                        style="fill:#fff;"
                                        viewBox="0 0 12.785 13.14">
                                            <g transform="translate(-31.42 -443.609)">
                                                <g transform="translate(31.42 443.609)">
                                                    <path class="a" d="M3.094,456.552a2.594,2.594,0,0,1-.34-.175.685.685,0,0,1-.279-.592q0-1.952,0-3.9a.752.752,0,0,1,1.022-.709.718.718,0,0,1,.457.709c0,.623,0,1.245,0,1.868q0,.593,0,1.186v.121H13.8v-.124q0-1.506,0-3.012a.76.76,0,0,1,.25-.619.7.7,0,0,1,.725-.136.665.665,0,0,1,.467.579,5.064,5.064,0,0,1,.014.545q0,1.726,0,3.453a.709.709,0,0,1-.16.527,1.9,1.9,0,0,1-.3.223.762.762,0,0,1-.143.06Z" transform="translate(-2.474 -443.412)"/>
                                                    <path class="a" d="M134.647,84a1.536,1.536,0,0,1,.69.506q.727.725,1.453,1.452c.417.418.835.834,1.246,1.257a.683.683,0,0,1,.119.82.711.711,0,0,1-.833.364.954.954,0,0,1-.375-.214c-.539-.523-1.067-1.059-1.6-1.59-.021-.021-.044-.04-.09-.082v.159q0,3.059,0,6.119a.742.742,0,0,1-.159.508.723.723,0,0,1-1.274-.314,1.516,1.516,0,0,1-.017-.23q0-3.044,0-6.087V86.51l-.324.317c-.494.483-.982.973-1.486,1.446a.718.718,0,0,1-.984-1.037c.375-.391.762-.771,1.144-1.154.6-.6,1.2-1.2,1.8-1.8a1.152,1.152,0,0,1,.459-.28Z" transform="translate(-128.129 -84)"/>
                                                </g>
                                            </g>
                                        </svg>
                                        File Upload
                                    </div>
                                    <div id="Prompts" draggable="true" @dragstart="startdrag" class="form-control" title="Button">
                                        <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="15.921" 
                                        height="12.704" 
                                        viewBox="0 0 15.921 12.704">
                                            <defs>
                                                <svg:style>.a{fill:#979797;}.b{fill:#8b8b8b;}.c{fill:#1e8da9;}.d{fill:#fdfdfd;}.e{fill:#fefefe;}</svg:style>
                                            </defs>
                                            <g transform="translate(1446 -396)">
                                                <path class="a" d="M-1662,298.827q0,5.12,0,10.239c0,.1,0,.1-.1.1h-15.691c-.035,0-.07,0-.1,0-.012,0-.024-.009-.025-.024s0-.04,0-.06V298.895c0-.022,0-.045,0-.067l.1,0H-1662Zm-13.62,7.3a.265.265,0,0,0,.24-.094l2.022-2.022a.312.312,0,0,0,0-.469l-2.017-2.017a.309.309,0,0,0-.468,0c-.154.153-.3.308-.46.459a.3.3,0,0,0,0,.485c.357.351.7.712,1.064,1.058a.347.347,0,0,1,0,.5c-.367.354-.723.72-1.085,1.08a.3.3,0,0,0,0,.447c.165.162.327.327.491.49A.217.217,0,0,0-1675.616,306.128Zm3.8.137h1.464a.3.3,0,0,0,.31-.3c0-.241,0-.483,0-.724a.281.281,0,0,0-.15-.255.373.373,0,0,0-.185-.04h-2.845a.683.683,0,0,0-.089.005.3.3,0,0,0-.243.254c0,.261,0,.523,0,.784a.189.189,0,0,0,.021.1.324.324,0,0,0,.306.18C-1672.755,306.262-1672.284,306.265-1671.814,306.265Z" transform="translate(231.914 99.538)"/>
                                                <path class="b" d="M-1662.091,140.629c0,.189,0,.378,0,.567q0,.88,0,1.76c-.03,0-.06,0-.089,0h-15.734c-.03,0-.06,0-.09,0l0-1.5c0-.259,0-.518,0-.776,0-.053.016-.073.068-.066a.265.265,0,0,0,.037,0h15.716C-1662.157,140.614-1662.121,140.6-1662.091,140.629Z" transform="translate(232.012 255.389)"/>
                                                <path class="c" d="M-1677.845,297.593c.03,0,.06,0,.089,0h15.734c.03,0,.06,0,.089,0l0,.02h-15.812l-.1,0C-1677.846,297.606-1677.845,297.6-1677.845,297.593Z" transform="translate(231.848 100.753)"/>
                                                <path class="d" d="M-1577.25,477.084a.217.217,0,0,1-.213-.084c-.164-.163-.326-.328-.491-.49a.3.3,0,0,1,0-.447c.362-.359.718-.725,1.085-1.079a.347.347,0,0,0,0-.5c-.361-.346-.708-.707-1.064-1.058a.3.3,0,0,1,0-.485c.155-.151.306-.306.46-.459a.309.309,0,0,1,.468,0l2.017,2.017a.312.312,0,0,1,0,.469l-2.022,2.022A.265.265,0,0,1-1577.25,477.084Z" transform="translate(133.548 -71.418)"/>
                                                <path class="e" d="M-1384.392,709.762c-.471,0-.941,0-1.411,0a.324.324,0,0,1-.306-.18.188.188,0,0,1-.022-.1c0-.261,0-.523,0-.784a.3.3,0,0,1,.243-.254.683.683,0,0,1,.089-.005h2.845a.374.374,0,0,1,.185.04.281.281,0,0,1,.15.255c0,.241,0,.483,0,.724a.3.3,0,0,1-.31.3Z" transform="translate(-55.508 -303.96)"/>
                                            </g>
                                        </svg>
                                        Prompts
                                    </div>
                                    <div id="Tooltips" draggable="true" @dragstart="startdrag" class="form-control" title="Button">
                                        <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="12.286" 
                                        height="17.192" 
                                        viewBox="0 0 12.286 17.192">
                                            <defs>
                                                <svg:style>.ab{fill:#979797;}.bc{fill:#fafcfd;}</svg:style>
                                                </defs>
                                            <g transform="translate(-33.594 -563.652)">
                                                <path class="ab" d="M1344.071,405.021V392.528h12.286V405.07h-3.779l-2.284,4.65-2.836-4.678Z" transform="translate(-1310.477 171.124)"/>
                                                <path class="bc" d="M1538.3,618.747a1.228,1.228,0,0,1-.56-.133.638.638,0,0,1-.243-.7.628.628,0,0,1,.613-.455c.238-.019.476-.012.715-.012.057,0,.091-.009.091-.079,0-.645-.005-1.29-.007-1.934v-.209c0-.291,0-.582.007-.872,0-.09-.019-.119-.115-.119a3.767,3.767,0,0,1-.9-.041h0a.077.077,0,0,0-.061-.024.045.045,0,0,0-.046-.016l-.113-.091a.631.631,0,0,1,.039-.969,1.029,1.029,0,0,1,.6-.141l1.155,0,.094.007a.591.591,0,0,1,.622.625c.008.094.013.189.013.283q0,1.651,0,3.3c0,.087-.027.2.017.254s.17.021.259.022a1.835,1.835,0,0,1,.864.124h0a.651.651,0,0,1,0,1.047v0a1.192,1.192,0,0,1-.557.129h-.452Z" transform="translate(-1499.805 -44.659)"/>
                                                <path class="bc" d="M1551.179,501.227l-.168-.046v0c-.009-.032-.042-.029-.063-.044a.6.6,0,0,1-.235-.514,4.488,4.488,0,0,1,.014-.641.477.477,0,0,1,.418-.428,3.278,3.278,0,0,1,.912,0,.548.548,0,0,1,.336.2l.028.042h0c0,.013,0,.025.022.023h0l0,.021a.882.882,0,0,1,.056.3c0,.15,0,.3,0,.452a.607.607,0,0,1-.314.595l0,0a1.107,1.107,0,0,1-.36.049C1551.611,501.228,1551.4,501.228,1551.179,501.227Z" transform="translate(-1512.763 66.38)"/>
                                            </g>
                                        </svg>
                                        Tooltips
                  </div>-->
                </div>
              </div>
              <div class="workflow">
                <div class="headings">
                  <!-- <h5>WORKFLOW: {{bot_name}} ({{bot_type}})</h5> -->
                </div>
                <div
                  id="addworkflownode"
                  style="width:100%;postion:relative;min-height:90%;background-image: url(/img/sdk-background.png);"
                >
                  <div
                    :id="levels[level].id+'outer'"
                    v-for="(level, indextest) in selectedlevellist"
                    :key="indextest"
                  >
                    <div style="margin: 2%" v-if="level!=0">
                      <div
                        v-if="levels[selectedlevellist[indextest-1]].nodetype=='Button'"
                      >(On Clicking {{levels[selectedlevellist[indextest-1]].nodes[levels[level].previousnodeindex].name}})</div>
                    </div>
                    <div
                      class="level"
                      :id="levels[level].id"
                      @drop="completedrop"
                      @dragover="handledrop"
                    >
                      <div
                        style="width:auto;margin:2%;display:flex;padding-left:15px;border-radius: 8px;"
                        class="form-control"
                        v-if="selectedlevel==level&&levels[level].nodes.length!=0"
                      >{{displaymessage}}</div>
                      <div
                        style="width:auto;margin:2%;display:flex;padding-left:15px;border-radius: 8px;"
                        class="form-control"
                        v-else-if="levels[level].nodes.length!=0"
                      >{{levels[level].message}}</div>
                      <div
                        :id="'level'+node.id"
                        v-for="(node, index2) in levels[level].nodes"
                        :key="index2"
                        @click="selectnode(index2,indextest)"
                      >
                        <div
                          style="width:30%;margin:2%;background:#273679;padding:10px;color: white;"
                          class="form-control"
                          v-if="node.nodetype=='Button'"
                          :id="node.id"
                          @dblclick="resetpath(index2,indextest)"
                        >
                          <div
                            v-if="level!=selectedlevel"
                            :id="node.id+'inner'"
                            style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;text-align:center"
                          >{{node.name}}</div>
                          <div
                            v-if="level==selectedlevel"
                            :id="node.id+'inner'"
                            style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;text-align:center"
                          >{{singlevalue[index2]}}</div>
                        </div>
                        <div
                          style="width:auto;margin:2%;display:flex;padding-left:15px;border-radius: 8px;"
                          class="form-control"
                          v-if="node.nodetype=='Text Box'"
                          :id="node.id"
                          @dblclick="resetpath(index2,indextest)"
                        >
                          <!-- <div :id="node.id+'inner'" style="margin-right:5%" v-html="node.svg"></div> -->
                          <div
                            :id="node.id+'inner'"
                            style="margin-right:5%"
                            v-html="elementsvgs.textbox"
                          ></div>
                          <div
                            :id="levels[level].id+'inner1'"
                            v-if="level!=selectedlevel"
                          >{{node.placeholder}}</div>
                          <div
                            :id="levels[level].id+'inner2'"
                            v-if="selectedlevel!=null&&level==selectedlevel"
                          >{{singlevalue[index2]}}</div>
                        </div>
                        <div
                          style="width:auto;margin:2%;display:flex;padding-left:15px;border-radius: 8px;"
                          class="form-control"
                          v-if="node.nodetype=='TextArea'"
                          :id="node.id"
                          @dblclick="resetpath(index2,indextest)"
                        >
                          <!-- <div :id="node.id+'inner'" style="margin-right:5%" v-html="node.svg"></div> -->
                          <div
                            :id="node.id+'inner'"
                            style="margin-right:5%"
                            v-html="elementsvgs.textarea"
                          ></div>
                          <div
                            :id="node.id+'inner1'"
                            v-if="level!=selectedlevel"
                          >{{node.placeholder}}</div>
                          <div
                            :id="node.id+'inner2'"
                            v-if="selectedlevel!=null&&level==selectedlevel"
                          >{{singlevalue[index2]}}</div>
                        </div>
                        <div
                          style="width:auto;margin:2%;display:flex;padding-left:15px;border-radius: 8px;"
                          class="form-control"
                          v-if="node.nodetype=='Hyperlink'"
                          :id="node.id"
                          @dblclick="resetpath(index2,indextest)"
                        >
                          <!-- <div :id="node.id+'inner'" style="margin-right:5%" v-html="node.svg"></div> -->
                          <div
                            :id="node.id+'inner'"
                            style="margin-right:5%"
                            v-html="elementsvgs.hyperlink"
                          ></div>
                          <div
                            :id="node.id+'inner1'"
                            v-if="node.hyperlink==null&&singlevalue[index2]==null"
                          >{{node.nodetype}}</div>
                          <a
                            :id="node.id+'inner2'"
                            v-if="level!=selectedlevel"
                            style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;text-align: center;"
                            :href="node.hyperlink"
                          >{{node.hyperlink}}</a>
                          <a
                            :id="node.id+'inner2'"
                            v-if="level==selectedlevel"
                            style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;text-align: center;"
                            :href="singlevalue[index2]"
                          >{{singlevalue[index2]}}</a>
                        </div>
                        <div
                          :id="node.id+'innermessage'"
                          style="margin-left: 2%;"
                          v-if="level==selectedlevel&&node.nodetype=='Check Box'"
                        >{{message}}</div>
                        <div
                          style="width:auto;margin:2%;display:flex;padding-left:15px;border-radius: 8px;"
                          class="form-control"
                          v-if="node.nodetype=='Check Box'"
                          :id="node.id"
                          @dblclick="resetpath(index2,indextest)"
                        >
                          <div
                            :id="node.id+'inner'"
                            style="display: flex;width: -webkit-fill-available;"
                            v-if="level!=selectedlevel"
                          >
                            <!-- <div :id="node.id+'innerinner1'" style="margin-right:5%" v-html="node.svg"></div> -->
                            <div
                              :id="node.id+'innerinner1'"
                              style="margin-right:5%"
                              v-html="elementsvgs.checkbox"
                            ></div>
                            <div
                              :id="node.id+'innerinner2'"
                              style="padding-right: inherit;"
                            >{{node.nodetype}}</div>
                          </div>
                          <div
                            :id="node.id+'inner1'"
                            style="width: 100%;"
                            v-if="level==selectedlevel"
                          >
                            <div
                              :id="node.id+'innerinner1'"
                              style="display:flex"
                              v-for="(val,valindex) in value"
                              :key="valindex"
                            >
                              <!-- <div :id="node.id+'innerinnerinner1'" style="margin-right:2%;width: 5%;" v-html="node.svg"></div> -->
                              <div
                                :id="node.id+'innerinnerinner1'"
                                style="margin-right:2%;width: 5%;"
                                v-html="elementsvgs.checkbox"
                              ></div>
                              <div :id="node.id+'innerinnerinner2'" style="width: 95%;">{{val}}</div>
                            </div>
                          </div>
                        </div>
                        <div
                          :id="node.id+'innermessage'"
                          style="margin-left: 2%;"
                          v-if="level==selectedlevel&&node.nodetype=='Radio Button'"
                        >{{message}}</div>
                        <div
                          style="width:auto;margin:2%;display:flex;padding-left:15px;border-radius: 8px;"
                          class="form-control"
                          v-if="node.nodetype=='Radio Button'"
                          :id="node.id"
                          @dblclick="resetpath(index2,indextest)"
                        >
                          <div
                            :id="node.id+'inner'"
                            style="display: flex;width: -webkit-fill-available;"
                            v-if="level!=selectedlevel"
                          >
                            <!-- <div style="margin-right:5%" v-html="node.svg"></div> -->
                            <div style="margin-right:5%" v-html="elementsvgs.radiobutton"></div>
                            <div style="padding-right: inherit;">{{node.nodetype}}</div>
                          </div>
                          <div
                            :id="node.id+'inner1'"
                            style="width: 100%;"
                            v-if="level==selectedlevel"
                          >
                            <div
                              style="display:flex"
                              v-for="(val,valindex) in value"
                              :key="valindex"
                            >
                              <!-- <div style="margin-right:2%;width: 5%;" v-html="node.svg"></div> -->
                              <div
                                style="margin-right:2%;width: 5%;"
                                v-html="elementsvgs.radiobutton"
                              ></div>
                              <div style="width: 95%;">{{val}}</div>
                            </div>
                          </div>
                        </div>
                        <div
                          style="width:auto;margin:2%;display:flex;padding-left:15px;border-radius: 8px;"
                          class="form-control"
                          v-if="node.nodetype=='Dropdown'&&level!=selectedlevel"
                          :id="node.id"
                          @dblclick="resetpath(index2,indextest)"
                        >
                          <div
                            style="display: flex;width: -webkit-fill-available;"
                            v-if="level!=selectedlevel"
                          >
                            <!-- <div style="margin-right:5%" v-html="node.svg"></div> -->
                            <div style="margin-right:5%" v-html="elementsvgs.dropdown"></div>
                            <div style="padding-right: inherit;">{{node.nodetype}}</div>
                          </div>
                        </div>
                        <div
                          style="width:auto;margin:2%;display:flex;border-radius: 8px;"
                          class="input-group mb-3"
                          v-if="level==selectedlevel&&node.nodetype=='Dropdown'"
                        >
                          <div class="input-group-prepend">
                            <!-- <span class="input-group-text" id="basic-addon1" v-html="node.svg"></span> -->
                            <span
                              class="input-group-text"
                              id="basic-addon1"
                              v-html="elementsvgs.dropdown"
                            ></span>
                          </div>
                          <select
                            style="width: 90%;display: flex;padding-left: 15px;"
                            class="form-control"
                            id="select_role_name"
                          >
                            <div class="input-group-prepend">
                              <span class="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <option v-if="message!=null">{{message}}</option>
                            <option v-if="message==null">Enter Message Here</option>
                            <option v-for="(val,valindex) in value" :key="valindex">{{val}}</option>
                          </select>
                        </div>
                        <div
                          style="width:auto;margin:2%;display:flex;padding-left:15px"
                          class="form-control"
                          v-if="node.nodetype=='File Upload'"
                          :id="node.id"
                          @dblclick="resetpath(index2,indextest)"
                        >
                          <!-- <div style="margin-right:5%" v-html="node.svg"></div> -->
                          <div style="margin-right:5%" v-html="elementsvgs.fileupload"></div>
                          <div v-if="level!=selectedlevel">{{node.nodetype}}</div>
                          <div
                            v-if="level==selectedlevel&&singlevalue[index2]==null"
                          >{{node.nodetype}}</div>
                          <div
                            v-if="level==selectedlevel&&singlevalue[index2]!=null"
                          >{{singlevalue[index2]}}</div>
                        </div>
                        <div
                          style="width:auto;margin:2%;display:flex;padding-left:15px"
                          class="form-control"
                          v-if="node.nodetype=='Message'"
                          :id="node.id"
                          @dblclick="resetpath(index2,indextest)"
                        >
                          <!-- <div style="margin-right:5%" v-html="node.svg"></div> -->
                          <div style="margin-right:5%" v-html="elementsvgs.message"></div>
                          <div v-if="level!=selectedlevel&&node.message==null">{{node.nodetype}}</div>
                          <div v-if="level!=selectedlevel&&node.message!=null">{{node.message}}</div>
                          <div
                            v-if="level==selectedlevel&&singlevalue[index2]==null"
                          >{{node.nodetype}}</div>
                          <div
                            v-if="level==selectedlevel&&singlevalue[index2]!=null"
                          >{{singlevalue[index2]}}</div>
                        </div>
                        <div
                          style="width:auto;margin:2%;display:flex;padding-left:15px"
                          class="form-control"
                          v-if="node.nodetype=='Video'"
                          :id="node.id"
                          @dblclick="resetpath(index2,indextest)"
                        >
                          <!-- <div style="margin-right:5%" v-html="node.svg"></div> -->
                          <div style="margin-right:5%" v-html="elementsvgs.video"></div>
                          <div v-if="level!=selectedlevel&&node.imageurl==null">{{node.nodetype}}</div>
                          <div v-if="level!=selectedlevel&&node.imageurl!=null">{{node.imageurl}}</div>
                          <div
                            v-if="level==selectedlevel&&singlevalue[index2]==null"
                          >{{node.nodetype}}</div>
                          <div
                            v-if="level==selectedlevel&&singlevalue[index2]!=null"
                          >{{singlevalue[index2]}}</div>
                        </div>
                        <div
                          style="width:auto;margin:2%;display:flex;padding-left:15px"
                          class="form-control"
                          v-if="node.nodetype=='Image'"
                          :id="node.id"
                          @dblclick="resetpath(index2,indextest)"
                        >
                          <!-- <div style="margin-right:5%" v-html="node.svg"></div> -->
                          <div style="margin-right:5%" v-html="elementsvgs.image"></div>
                          <div v-if="level!=selectedlevel&&node.videourl==null">{{node.nodetype}}</div>
                          <div v-if="level!=selectedlevel&&node.videourl!=null">{{node.videourl}}</div>
                          <div
                            v-if="level==selectedlevel&&singlevalue[index2]==null"
                          >{{node.nodetype}}</div>
                          <div
                            v-if="level==selectedlevel&&singlevalue[index2]!=null"
                          >{{singlevalue[index2]}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="setting">
                <div class="headings">
                  <h5>SETTINGS</h5>
                </div>
                <div style="height:90%">
                  <!--  -->
                  <!-- <label class="switch">
                                    <input type="checkbox" checked>
                                    <span class="slider round"></span>
                  </label>-->

                  <!--  -->
                  <div v-if="selected!=null" class="tagprops">
                    Display Message
                    <input
                      type="text"
                      class="tagname form-control"
                      placeholder="Enter button name"
                      v-model="displaymessage"
                      v-on:keyup="saveval"
                    />
                    <div style="display: flex;">
                      Set as Last Node
                      <div>
                        <label class="switch">
                          <input
                            type="checkbox"
                            :checked="levels[selectedlevel].islastnode"
                            @click="setasleafnode"
                            :disabled="isDisabled"
                          />
                          <span
                            class="slider round"
                            style="border-radius: 50px;"
                            @click="whendisabbled"
                          ></span>
                        </label>
                        <!-- <clr-toggle-wrapper>
                                                    <input type="checkbox" clrToggle name="options" required value="option1" />
                                                    <label>Option 1</label>
                        </clr-toggle-wrapper>-->

                        <!-- <clr-toggle-container clrInline>
                                                    <label>Inline toggle switch example</label>
                                                    <clr-toggle-wrapper>
                                                        <input type="checkbox" clrToggle name="options" required value="option1"/>
                                                        <label>Option 1</label>
                                                    </clr-toggle-wrapper>
                                                    <clr-toggle-wrapper>
                                                        <input type="checkbox" clrToggle name="options" required value="option2"/>
                                                        <label>Option 2</label>
                                                    </clr-toggle-wrapper>
                        </clr-toggle-container>-->
                      </div>
                    </div>

                    <div
                      v-for="(node, elements) in levels[selectedlevel].nodes"
                      :key="elements"
                      style="margin-bottom: inherit;"
                    >
                      <div v-if="levels[selectedlevel].nodes[elements].nodetype=='Button'">
                        Button Name
                        <input
                          type="text"
                          class="tagname form-control"
                          placeholder="Enter button name"
                          v-model="singlevalue[elements]"
                          v-on:keyup="saveval"
                        />
                      </div>
                      <div v-if="levels[selectedlevel].nodes[elements].nodetype=='Text Box'">
                        Placeholder
                        <input
                          type="text"
                          class="tagname form-control"
                          placeholder="Enter display message"
                          v-model="singlevalue[elements]"
                          v-on:keyup="saveval"
                        />
                      </div>
                      <div v-if="levels[selectedlevel].nodes[elements].nodetype=='TextArea'">
                        Placeholder
                        <input
                          type="text"
                          class="tagname form-control"
                          placeholder="Enter display message"
                          v-model="singlevalue[elements]"
                          v-on:keyup="saveval"
                        />
                      </div>
                      <div v-if="levels[selectedlevel].nodes[elements].nodetype=='Hyperlink'">
                        Link
                        <input
                          type="text"
                          class="tagname form-control"
                          placeholder="Enter link"
                          v-model="singlevalue[elements]"
                          v-on:keyup="saveval"
                        />
                      </div>

                      <div v-if="levels[selectedlevel].nodes[elements].nodetype=='Check Box'">
                        <!-- Check Box Message
                        <input type="text" class="tagname form-control" placeholder="Checkbox message" v-model="message">-->
                        CheckBox Values
                        <button
                          class="save_node_button"
                          @click="andvalue(elements)"
                          style="height: 29px;padding-top: 0px;padding-left: 10px;padding-right: 10px;padding-bottom: 0px;"
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
                        </button>
                        <div
                          style="display: flex;margin-top: 5%;"
                          v-for="(checkbox,index) in levels[selectedlevel].nodes[elements].values"
                          :key="index"
                        >
                          <input
                            style="width: 75%;margin-right: 5%;margin-bottom: 0"
                            type="text"
                            class="tagname form-control"
                            placeholder="Value"
                            v-model="value[index]"
                          />
                          <button
                            v-if="value.length!=1"
                            class="save_node_button"
                            style="height: 29px;padding-top: 0px;padding-left: 10px;padding-right: 10px;padding-bottom: 0px;background: #F23D3D;border: solid 1px #F23D3D;"
                            @click="deletevalue(index)"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                            >
                              <path
                                id="trash-can-outline"
                                d="M8.375,3v.778H4V5.333h.875V15.444A1.661,1.661,0,0,0,6.625,17h8.75a1.661,1.661,0,0,0,1.75-1.556V5.333H18V3.778H13.625V3H8.375M6.625,5.333h8.75V15.444H6.625V5.333m1.75,1.556v7h1.75v-7H8.375m3.5,0v7h1.75v-7Z"
                                transform="translate(-4 -3)"
                                fill="#fff"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div v-if="levels[selectedlevel].nodes[elements].nodetype=='Radio Button'">
                        <!-- Display Message
                        <input type="text" class="tagname form-control" placeholder="Enter display message" v-model="message">-->
                        RadioButton Values
                        <button
                          class="save_node_button"
                          @click="andvalue(elements)"
                          style="height: 29px;padding-top: 0px;padding-left: 10px;padding-right: 10px;padding-bottom: 0px;"
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
                        </button>
                        <div
                          style="display: flex;margin-top: 5%;"
                          v-for="(checkbox,index) in levels[selectedlevel].nodes[selectednode].values"
                          :key="index"
                        >
                          <input
                            style="width: 75%;margin-right: 5%;margin-bottom: 0"
                            type="text"
                            class="tagname form-control"
                            placeholder="Value"
                            v-model="value[index]"
                          />
                          <button
                            v-if="value.length!=1"
                            class="save_node_button"
                            style="height: 29px;padding-top: 0px;padding-left: 10px;padding-right: 10px;padding-bottom: 0px;background: #F23D3D;border: solid 1px #F23D3D;"
                            @click="deletevalue(index)"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                            >
                              <path
                                id="trash-can-outline"
                                d="M8.375,3v.778H4V5.333h.875V15.444A1.661,1.661,0,0,0,6.625,17h8.75a1.661,1.661,0,0,0,1.75-1.556V5.333H18V3.778H13.625V3H8.375M6.625,5.333h8.75V15.444H6.625V5.333m1.75,1.556v7h1.75v-7H8.375m3.5,0v7h1.75v-7Z"
                                transform="translate(-4 -3)"
                                fill="#fff"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div v-if="levels[selectedlevel].nodes[elements].nodetype=='Dropdown'">
                        <div>Display Message</div>
                        <input
                          type="text"
                          class="tagname form-control"
                          placeholder="Enter display message"
                          v-model="singlevalue[elements]"
                        />
                        Dropdown Values
                        <button
                          class="save_node_button"
                          @click="andvalue(elements)"
                          style="height: 29px;padding-top: 0px;padding-left: 10px;padding-right: 10px;padding-bottom: 0px;"
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
                        </button>
                        <div
                          style="display: flex;margin-top: 5%;"
                          v-for="(checkbox,index) in levels[selectedlevel].nodes[selectednode].values"
                          :key="index"
                        >
                          <input
                            style="width: 75%;margin-right: 5%;margin-bottom: 0"
                            type="text"
                            class="tagname form-control"
                            placeholder="Value"
                            v-model="value[index]"
                          />
                          <button
                            v-if="value.length!=1"
                            class="save_node_button"
                            style="height: 29px;padding-top: 0px;padding-left: 10px;padding-right: 10px;padding-bottom: 0px;background: #F23D3D;border: solid 1px #F23D3D;"
                            @click="deletevalue(index)"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                            >
                              <path
                                id="trash-can-outline"
                                d="M8.375,3v.778H4V5.333h.875V15.444A1.661,1.661,0,0,0,6.625,17h8.75a1.661,1.661,0,0,0,1.75-1.556V5.333H18V3.778H13.625V3H8.375M6.625,5.333h8.75V15.444H6.625V5.333m1.75,1.556v7h1.75v-7H8.375m3.5,0v7h1.75v-7Z"
                                transform="translate(-4 -3)"
                                fill="#fff"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div v-if="levels[selectedlevel].nodes[elements].nodetype=='Message'">
                        <div>Display Message</div>
                        <input
                          type="text"
                          class="tagname form-control"
                          placeholder="Enter display message"
                          v-model="singlevalue[elements]"
                        />
                      </div>
                      <div v-if="levels[selectedlevel].nodes[elements].nodetype=='Image'">
                        <div>Display Message</div>
                        <input
                          type="text"
                          class="tagname form-control"
                          placeholder="Enter display message"
                          v-model="singlevalue[elements]"
                        />
                      </div>
                      <div v-if="levels[selectedlevel].nodes[elements].nodetype=='Video'">
                        <div>Display Message</div>
                        <input
                          type="text"
                          class="tagname form-control"
                          placeholder="Enter display message"
                          v-model="singlevalue[elements]"
                        />
                      </div>
                      <div style="height: 30px;margin: inherit;">
                        <button
                          type="submit"
                          class="delete_node_button"
                          @click="deletenode(elements)"
                        >Delete</button>
                        <button
                          v-if="elements==(levels[selectedlevel].nodes.length-1)"
                          type="submit"
                          class="save_node_button"
                          @click="savenodevalue"
                        >Save</button>
                      </div>
                    </div>
                  </div>
                  <div v-if="selected==null"></div>
                  <div style="right:4%;bottom: 50px;position: absolute;">
                    <!-- <button type="submit" class="delete_node_button" @click="deletenode">Delete</button> -->
                    <button type="submit" class="save_node_button" @click="finalsave">Save Form</button>
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
import Vue from "vue";
import axios from "axios";
import api_calls from "@/portal/api_calls";
import Swal from "sweetalert2";
export default {
  name: "Workflow",
  data() {
    return {
      companyid: "",
      location: "",
      company_name: "",
      company_id: "",
      bot_name: "",
      bot_type: "",
      levels: [],
      maxid: 0,
      selectednode: null,
      selectedlevel: null,
      selectedlevellist: [],
      // selectednodetitle:null,
      name: null,
      buttonsname: [],
      message: null,
      hyperlink: null,
      value: [],
      displaymessage: [],
      singlevalue: [],
      testhyperlink: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
      empty_string_validity: /^$/,
      // testhyperlink:/\b((http|https):\/\/?)[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))/,
      selected: null,
      elementsvgs: {
        button:
          '<svg xmlns="http://www.w3.org/2000/svg" width="10.399" height="10.833" style="fill:#979797;margin-right:5%" viewBox="0 0 10.399 10.833"> <g transform="translate(-506.513 -407)"> <g transform="translate(506.513 407)"> <path class="a" d="M124.406,197c.029.01.058.022.088.029a1.2,1.2,0,0,1-.258,2.379q-4,0-8,0a1.2,1.2,0,0,1-.258-2.379c.03-.007.059-.019.088-.029Z" transform="translate(-115.035 -197)"/> <path class="a" d="M116.011,510.373a1.367,1.367,0,0,1-.68-.363,1.2,1.2,0,0,1,.8-2.042c.054,0,.108,0,.162,0q3.893,0,7.785,0a1.217,1.217,0,0,1,1.156.637,1.2,1.2,0,0,1-.791,1.746c-.03.007-.058.019-.087.029Z" transform="translate(-114.981 -499.54)"/><path class="a" d="M120.3,355c-1.322,0-2.644,0-3.965,0a1.2,1.2,0,0,1-.111-2.4c.049,0,.1,0,.149,0h7.863a1.2,1.2,0,0,1,.138,2.4c-.373.019-.749.007-1.123.007Z" transform="translate(-115.099 -348.381)"/> </g> </g> </svg>',
        textbox:
          '<svg xmlns="http://www.w3.org/2000/svg" width="13.169" height="10.06" style="fill:#979797;" viewBox="0 0 13.169 10.06"> <g transform="translate(120 2)"> <g transform="translate(-120 -2)"> <path class="a" d="M85.044,240.849H82.613c-.275,0-.386-.1-.385-.375.006-1.587-.029-3.175.019-4.761a7.627,7.627,0,0,1,.413-2.357,3.71,3.71,0,0,1,3.079-2.5,4.567,4.567,0,0,1,.855-.066c.231,0,.344.107.345.336q.005.786,0,1.573a.306.306,0,0,1-.289.337,1.34,1.34,0,0,0-1.4,1.321,7.624,7.624,0,0,0-.06,1.205c0,.128.079.122.165.122h2.126a.457.457,0,0,1,.214.029.334.334,0,0,1,.175.34q0,1.551,0,3.1,0,.641,0,1.281c0,.32-.093.411-.419.411h-2.4Z" transform="translate(-82.221 -230.79)"/> <path class="a" d="M340.8,237.753c.014-.677-.03-1.517.033-2.356a8.181,8.181,0,0,1,.337-1.872,3.724,3.724,0,0,1,2.969-2.65,4.538,4.538,0,0,1,1.027-.1.305.305,0,0,1,.347.338q.007.786,0,1.572a.311.311,0,0,1-.337.337,1.25,1.25,0,0,0-1.3,1.034,5.572,5.572,0,0,0-.12,1.5c0,.12.085.109.163.109h2.155c.248,0,.357.107.358.354,0,.611,0,1.223,0,1.834q0,1.288,0,2.577c0,.3-.1.4-.4.4H341.2c-.3,0-.4-.1-.4-.4C340.8,239.594,340.8,238.755,340.8,237.753Z" transform="translate(-333.266 -230.777)"/> </g> </g> </svg>',
        textarea:
          '<svg xmlns="http://www.w3.org/2000/svg" width="14.839" height="14.323" viewBox="0 0 14.839 14.323"><defs><svg:style>.f{fill:#fff;}</svg:style></defs><g transform="translate(175.699 113.805)"><path a" d="M18.839-55.567H8.568a.193.193,0,0,1-.174-.059.175.175,0,0,1-.034-.193.174.174,0,0,1,.165-.1c.115,0,.23,0,.346,0H19.194v.1q0,5.411,0,10.822a.187.187,0,0,1-.177.214c-.109,0-.179-.083-.179-.213q0-2.44,0-4.88,0-2.256,0-4.512,0-.542,0-1.084Z" transform="translate(-181.214 -56.991)"/><path class="a" d="M-101.054,43.377h10.2c.131,0,.2.064.2.177s-.078.178-.205.178h-10.558c0-.03-.005-.054,0-.079,0-.458,0-.917,0-1.375q0-1.837,0-3.674,0-2.375,0-4.75c0-.371,0-.742,0-1.113a.174.174,0,0,1,.225-.186.185.185,0,0,1,.133.192q0,1.975,0,3.95,0,2.617,0,5.234,0,.687,0,1.375C-101.057,43.325-101.055,43.346-101.054,43.377Z" transform="translate(-73.142 -144.104)"/><path class="a" d="M-175.127-112.766a2.208,2.208,0,0,1,.3.169.527.527,0,0,1,.143.6.533.533,0,0,1-.541.325.521.521,0,0,1-.456-.386,1.081,1.081,0,0,1,.021-.494,2.727,2.727,0,0,1,.424-1.02,1.155,1.155,0,0,1,.158-.176.2.2,0,0,1,.235-.032c.081.04.081.115.076.192a.923.923,0,0,1-.135.371C-174.979-113.064-175.055-112.908-175.127-112.766Z" transform="translate(0 0)"/><path class="a" d="M617.488,679.933a.582.582,0,0,1-.394-.224.529.529,0,1,1,.95-.271,2.688,2.688,0,0,1-.485,1.355.9.9,0,0,1-.147.156.194.194,0,0,1-.229.022c-.074-.038-.075-.108-.072-.18a.865.865,0,0,1,.127-.366C617.321,680.265,617.4,680.1,617.488,679.933Z" transform="translate(-780.502 -780.481)"/><path class="a" d="M721.452,679.936a.587.587,0,0,1-.389-.218.529.529,0,0,1,.6-.82.526.526,0,0,1,.341.551,2.694,2.694,0,0,1-.465,1.323.958.958,0,0,1-.159.175.2.2,0,0,1-.235.027c-.075-.043-.076-.114-.071-.188a.913.913,0,0,1,.134-.371C721.29,680.259,721.368,680.1,721.452,679.936Z" transform="translate(-882.868 -780.484)"/><path class="a" d="M-71.007-112.757a1.641,1.641,0,0,1,.278.14.514.514,0,0,1,.191.561.5.5,0,0,1-.41.38.523.523,0,0,1-.626-.516,2.6,2.6,0,0,1,.511-1.438.7.7,0,0,1,.131-.129.191.191,0,0,1,.217-.017c.074.037.078.105.076.178a.853.853,0,0,1-.125.366C-70.848-113.071-70.929-112.91-71.007-112.757Z" transform="translate(-102.525 -0.004)"/></g></svg>',
        hyperlink:
          '<svg xmlns="http://www.w3.org/2000/svg" width="15.629" height="15.629" style="fill:#979797;"viewBox="0 0 15.629 15.629"> <g transform="translate(445 228)"> <g transform="translate(-445 -228)"> <path class="a" d="M-162.923,91.849c.912-.912,1.82-1.827,2.736-2.734a1.736,1.736,0,0,1,2.872.7c.018.054.032.109.048.167a1.178,1.178,0,0,0,.71-.334c.2-.193.39-.391.587-.584a.068.068,0,0,0,.016-.094c-.081-.145-.152-.3-.243-.436a3.312,3.312,0,0,0-5.122-.517q-1.849,1.842-3.691,3.69a3.273,3.273,0,0,0-.93,1.752c-.024.13-.04.261-.059.392v.438c.02.133.035.267.061.4a3.3,3.3,0,0,0,2.878,2.673.546.546,0,0,1,.122.022h.5a.052.052,0,0,1,.037-.015,3.225,3.225,0,0,0,2.035-.94q1.879-1.867,3.747-3.745c.049-.048.094-.1.156-.167l-.083.017a3.793,3.793,0,0,1-1.968-.068.138.138,0,0,0-.161.043q-1.388,1.392-2.779,2.78a1.662,1.662,0,0,1-1.529.49,1.644,1.644,0,0,1-1.358-1.181,1.671,1.671,0,0,1,.437-1.769C-163.579,92.5-163.249,92.175-162.923,91.849Z" transform="translate(166 -81.754)"/> <path class="a" d="M200.484-247.468c-.02.133-.036.267-.061.4a3.24,3.24,0,0,1-.912,1.727q-1.858,1.86-3.719,3.718a3.311,3.311,0,0,1-5.114-.533c-.09-.136-.158-.287-.239-.429a.071.071,0,0,1,.02-.1c.191-.188.379-.379.57-.568a1.161,1.161,0,0,1,.722-.344c.008.025.016.052.024.078a1.735,1.735,0,0,0,2.9.786q1.752-1.74,3.492-3.492a3.574,3.574,0,0,0,.46-.518,1.731,1.731,0,0,0-1.239-2.665,1.69,1.69,0,0,0-1.452.5q-1.392,1.387-2.778,2.78a.145.145,0,0,1-.168.046,3.883,3.883,0,0,0-2.049-.044c.027-.032.043-.053.061-.071q.628-.632,1.256-1.263c.839-.84,1.682-1.677,2.518-2.52a3.341,3.341,0,0,1,1.8-.966c.125-.023.252-.037.378-.056h.438c.121.017.243.03.362.052a3.294,3.294,0,0,1,2.673,2.651c.026.129.04.261.059.392Z" transform="translate(-184.855 251)"/> </g> </g> </svg>',
        checkbox:
          '<svg xmlns="http://www.w3.org/2000/svg" width="14.611" height="12.369" style="fill:#979797;"  viewBox="0 0 14.611 12.369"> <g transform="translate(188 -107)"> <g transform="translate(-188 107)"> <path class="a" d="M231.954,174.87c.355-.357.686-.692,1.018-1.024l4.6-4.6a.714.714,0,0,1,1.135,0c.283.282.567.562.847.847a.7.7,0,0,1,0,1.1q-2.637,2.641-5.278,5.279l-1.748,1.749a.709.709,0,0,1-1.136.005l-3.649-3.649a.7.7,0,0,1-.009-1.114q.443-.448.891-.891a.7.7,0,0,1,1.058.008q1.071,1.069,2.139,2.14C231.868,174.758,231.9,174.805,231.954,174.87Z" transform="translate(-225.218 -168.389)"/> <path class="a" d="M160.269,150.362h3.64a2.424,2.424,0,0,1,1,.2.283.283,0,0,1,.1.5,4.921,4.921,0,0,1-.4.4.4.4,0,0,1-.247.084c-.3-.009-.59-.054-.885-.055q-3.394-.007-6.788,0a1.386,1.386,0,0,0-1.461,1.454q-.006,3.624,0,7.249a1.38,1.38,0,0,0,1.4,1.4c1.28.005,2.56,0,3.84,0,1.152,0,2.3,0,3.455,0a1.382,1.382,0,0,0,1.4-1.226,6.986,6.986,0,0,0,.013-.782c0-.522-.005-1.044.006-1.566a.483.483,0,0,1,.115-.282c.157-.181.337-.343.506-.515a.276.276,0,0,1,.321-.075.269.269,0,0,1,.179.276c-.006,1.008.017,2.018-.024,3.024a2.461,2.461,0,0,1-2.162,2.245c-.462.042-.93.03-1.4.031q-3.125,0-6.251,0a2.508,2.508,0,0,1-2.389-1.7,2.772,2.772,0,0,1-.138-.842q-.016-3.655,0-7.31a2.5,2.5,0,0,1,2.408-2.5c.91-.029,1.822-.008,2.733-.009Z" transform="translate(-154.095 -150.356)"/> </g> </g> </svg>',
        radiobutton:
          '<svg xmlns="http://www.w3.org/2000/svg" width="16.122" height="16.12" style="fill:#979797;" viewBox="0 0 16.122 16.12"> <g transform="translate(-708.017 101.974)"> <path class="a" d="M716.072-85.854a8.048,8.048,0,0,1-8.055-8.123,8.058,8.058,0,0,1,8.059-8,8.07,8.07,0,0,1,8.063,8.126A8.069,8.069,0,0,1,716.072-85.854ZM709.6-93.96a6.452,6.452,0,0,0,6.492,6.524,6.468,6.468,0,0,0,6.461-6.436,6.456,6.456,0,0,0-6.5-6.519A6.445,6.445,0,0,0,709.6-93.96Z" transform="translate(0)"/> <path class="a" d="M744.984-69.06A3.994,3.994,0,0,1,748.955-65a4,4,0,0,1-4.019,3.954,3.989,3.989,0,0,1-4-4.1A3.987,3.987,0,0,1,744.984-69.06Z" transform="translate(-28.869 -28.862)"/> </g> </svg>',
        dropdown:
          '<svg xmlns="http://www.w3.org/2000/svg" width="13.011" height="13.01" style="fill:#979797;" viewBox="0 0 13.011 13.01"> <g transform="translate(122 -226)"> <g transform="translate(-122 226)"> <path class="a" d="M143.989,227.558q2.5,0,5.007,0a1.429,1.429,0,0,1,1.463,1.111,1.722,1.722,0,0,1,.042.4q0,4.988,0,9.975a1.432,1.432,0,0,1-1.118,1.478,2.1,2.1,0,0,1-.476.044q-4.911,0-9.822,0a1.464,1.464,0,0,1-1.553-1.125,1.678,1.678,0,0,1-.039-.38q0-5,0-9.995a1.435,1.435,0,0,1,1.127-1.472,2.007,2.007,0,0,1,.438-.035Q141.524,227.556,143.989,227.558Zm-5.044,6.494c0,1.6,0,3.21,0,4.814,0,.185.033.251.238.25q4.824-.011,9.648,0c.173,0,.227-.042.226-.222q-.008-4.833,0-9.667c0-.185-.06-.22-.229-.219q-4.824.007-9.648,0c-.182,0-.237.045-.236.232C138.949,230.842,138.945,232.447,138.945,234.052Z" transform="translate(-137.492 -227.557)"/> <path class="a" d="M217.409,343.722l2.572-2.578.979.982-3.557,3.557-3.558-3.555.985-.987Z" transform="translate(-210.915 -336.783)"/> </g> </g> </svg>',
        fileupload:
          '<svg xmlns="http://www.w3.org/2000/svg" width="12.785" height="13.14" style="fill:#979797;"viewBox="0 0 12.785 13.14"><g transform="translate(-31.42 -443.609)"><g transform="translate(31.42 443.609)"><path class="f" d="M3.094,456.552a2.594,2.594,0,0,1-.34-.175.685.685,0,0,1-.279-.592q0-1.952,0-3.9a.752.752,0,0,1,1.022-.709.718.718,0,0,1,.457.709c0,.623,0,1.245,0,1.868q0,.593,0,1.186v.121H13.8v-.124q0-1.506,0-3.012a.76.76,0,0,1,.25-.619.7.7,0,0,1,.725-.136.665.665,0,0,1,.467.579,5.064,5.064,0,0,1,.014.545q0,1.726,0,3.453a.709.709,0,0,1-.16.527,1.9,1.9,0,0,1-.3.223.762.762,0,0,1-.143.06Z" transform="translate(-2.474 -443.412)"/><path class="f" d="M134.647,84a1.536,1.536,0,0,1,.69.506q.727.725,1.453,1.452c.417.418.835.834,1.246,1.257a.683.683,0,0,1,.119.82.711.711,0,0,1-.833.364.954.954,0,0,1-.375-.214c-.539-.523-1.067-1.059-1.6-1.59-.021-.021-.044-.04-.09-.082v.159q0,3.059,0,6.119a.742.742,0,0,1-.159.508.723.723,0,0,1-1.274-.314,1.516,1.516,0,0,1-.017-.23q0-3.044,0-6.087V86.51l-.324.317c-.494.483-.982.973-1.486,1.446a.718.718,0,0,1-.984-1.037c.375-.391.762-.771,1.144-1.154.6-.6,1.2-1.2,1.8-1.8a1.152,1.152,0,0,1,.459-.28Z" transform="translate(-128.129 -84)"/></g></g></svg>',
        video:
          '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" style="fill: rgb(151, 151, 151);margin-bottom: 2%;" xml:space="preserve" width="15" height="15"><rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none"/><g class="currentLayer" style=""><title>Layer 1</title><path d="M14.287040869975606,2.164383191050649 H0.6992602153575042 C0.5653235203334106,2.164383191050649 0.4566212750964669,2.275933519171331 0.4566212750964669,2.4139364978083266 v10.980345497337789 c0,0.13800297863699543 0.10870224523694494,0.24955330675767742 0.24263894026103774,0.24955330675767742 h13.587780654618102 c0.13393669502409286,0 0.24263894026103774,-0.11155032812068182 0.24263894026103774,-0.24955330675767742 V2.4139364978083266 C14.529679810236644,2.275933519171331 14.420977564999697,2.164383191050649 14.287040869975606,2.164383191050649 zM2.883010677706842,13.144728688388437 H0.9418991556185419 v-2.2459797608190932 h1.9411115220883004 V13.144728688388437 zM2.883010677706842,10.39964231405399 H0.9418991556185419 v-2.2459797608190932 h1.9411115220883004 V10.39964231405399 zM2.883010677706842,7.654555939719543 H0.9418991556185419 v-2.2459797608190932 h1.9411115220883004 V7.654555939719543 zM2.883010677706842,4.909469565385097 H0.9418991556185419 V2.6634898045660034 h1.9411115220883004 V4.909469565385097 zM9.321920235413996,8.1147322373807 l-2.669028342871413,1.746873147303739 C6.613341745280031,9.88730937528048 6.56796826345122,9.900535700538637 6.522594781622405,9.900535700538637 c-0.040278064083332295,0 -0.08031348922640356,-0.010231685577064773 -0.1167093302655593,-0.030695056731194305 C6.328240990473316,9.825919261818091 6.279955841361367,9.742069350747512 6.279955841361367,9.65098239378096 V6.15723609917348 c0,-0.09108695696655221 0.048285149111946556,-0.17493686803713188 0.12592960999547861,-0.21885825002648304 c0.07764446088353207,-0.04367182868259355 0.17227364758533686,-0.04042763569474374 0.2472490801259976,0.008235259123003356 l2.669028342871413,1.746873147303739 C9.391800250209174,7.739404064017155 9.434262064754856,7.8187620155660955 9.434262064754856,7.904109246477221 S9.391800250209174,8.068814428937287 9.321920235413996,8.1147322373807 zM14.044401929714569,13.144728688388437 h-1.9411115220883004 v-2.2459797608190932 h1.9411115220883004 V13.144728688388437 zM14.044401929714569,10.39964231405399 h-1.9411115220883004 v-2.2459797608190932 h1.9411115220883004 V10.39964231405399 zM14.044401929714569,7.654555939719543 h-1.9411115220883004 v-2.2459797608190932 h1.9411115220883004 V7.654555939719543 zM14.044401929714569,4.909469565385097 h-1.9411115220883004 V2.6634898045660034 h1.9411115220883004 V4.909469565385097 z" id="svg_1" class=""/><g id="svg_2"></g><g id="svg_3"></g><g id="svg_4"></g><g id="svg_5"></g><g id="svg_6"></g><g id="svg_7"></g><g id="svg_8"></g><g id="svg_9"></g><g id="svg_10"></g><g id="svg_11"></g><g id="svg_12"></g><g id="svg_13"></g><g id="svg_14"></g><g id="svg_15"></g><g id="svg_16"></g></g></svg>',
        image:
          '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" style="fill: rgb(151, 151, 151);margin-bottom: 2%;" xml:space="preserve" width="15" height="15"><rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none" class="" style=""/><g class="currentLayer" style=""><title>Layer 1</title><g id="svg_1" class=""><path d="M14.57597422412875,1.7305933623734049 H0.5473161789080976 C0.40903369246235155,1.7305933623734049 0.29680442810058616,1.8474405684495352 0.29680442810058616,1.9919965079575879 v11.501738405704032 c0,0.1445559395080532 0.11222926436176554,0.26140314558418254 0.25051175080751165,0.26140314558418254 h14.028658045220652 c0.13828248644574673,0 0.25051175080751165,-0.11684720607612967 0.25051175080751165,-0.26140314558418254 V1.9919965079575879 C14.826485974936261,1.8474405684495352 14.714256710574492,1.7305933623734049 14.57597422412875,1.7305933623734049 zM14.325462473321238,13.232331768077437 H0.7978279297156092 V2.25339965354177 h13.527634543605629 V13.232331768077437 z" id="svg_2"/><path d="M4.304992441020772,7.517536199316037 c0.7693215867298686,0 1.3950999402470323,-0.6529850576692892 1.3950999402470323,-1.4554927146127288 C5.700092381267803,5.259013021468703 5.074314027750641,4.606027963799413 4.304992441020772,4.606027963799413 s-1.3950999402470323,0.6529850576692892 -1.3950999402470323,1.4557541177583124 C2.9098925007737417,6.86455114164675 3.5356708542909034,7.517536199316037 4.304992441020772,7.517536199316037 zM4.304992441020772,5.128834254967778 c0.49300712558918297,0 0.8940764386320093,0.4187678392258609 0.8940764386320093,0.9329478265899478 S4.797999566609955,6.994729908147672 4.304992441020772,6.994729908147672 s-0.8940764386320093,-0.4185064360802763 -0.8940764386320093,-0.9326864234443636 S3.81198531543159,5.128834254967778 4.304992441020772,5.128834254967778 z" id="svg_3"/><path d="M2.0503866837531675,12.186719185740706 c0.058619749688957876,0 0.11774052287953055,-0.02143505793790302 0.16533775553295785,-0.06508938325046147 l4.086598190922937,-3.7542719768800303 l2.580772056818985,2.6927138026626647 c0.0979500945657371,0.10220862992341544 0.256273521076085,0.10220862992341544 0.3542236156418219,0 s0.0979500945657371,-0.26741541793261936 0,-0.3696240478560346 l-1.2042099861317086,-1.2565649208231655 l2.299948384163764,-2.6281472257033713 l2.8210128258433884,2.6984646718655165 c0.10195828257865724,0.09750337330290022 0.2605322208398123,0.09018408522654306 0.3539731038910145,-0.01620699502621932 c0.09344088305120199,-0.10639108025276232 0.08667706577939896,-0.2718592714075501 -0.015531728550065745,-0.3693626447104505 l-3.0061410096901398,-2.875434601426008 c-0.04910030315827237,-0.04679116305956875 -0.11448387011903285,-0.07005604301656107 -0.1803684605814089,-0.06848762414305586 c-0.06638561396399072,0.003136837747010197 -0.12901355166586848,0.03372100578035962 -0.17385515506041324,0.08495602231485955 l-2.453512087408769,2.804071542681526 l-1.1881772340800278,-1.239835119505778 c-0.0936913948020095,-0.09750337330290022 -0.2434974217849019,-0.10247003306899963 -0.3427000751046762,-0.011501738405704058 L1.884798416469403,11.729002277822804 c-0.10396237658511752,0.09541214813822664 -0.11398284661741792,0.26061893614743015 -0.022546057572676095,0.3691012415648662 C1.911853685556613,12.156919227144112 1.9809949287794901,12.186719185740706 2.0503866837531675,12.186719185740706 z" id="svg_4"/></g><g id="svg_5" class=""></g><g id="svg_6" class=""></g><g id="svg_7" class=""></g><g id="svg_8" class=""></g><g id="svg_9" class=""></g><g id="svg_10" class=""></g><g id="svg_11" class=""></g><g id="svg_12" class=""></g><g id="svg_13" class=""></g><g id="svg_14" class=""></g><g id="svg_15" class=""></g><g id="svg_16" class=""></g><g id="svg_17" class=""></g><g id="svg_18" class=""></g><g id="svg_19" class=""></g></g></svg>',
        message:
          '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="15" height="15" style="fill: rgb(151, 151, 151);margin-bottom: 2%;" xml:space="preserve"><rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none" class="" style=""/><g class="currentLayer" style=""><title>Layer 1</title><g id="svg_1" class=""><g id="_x32__26_"><g id="svg_2"><path d="M9.824624752136963,7.964126070363899 h-4.6816121148658745 c-0.2584249887405969,0 -0.46816121148658785,0.20971451156759174 -0.46816121148658785,0.46811274903480304 s0.20973622274599127,0.46811274903480304 0.46816121148658785,0.46811274903480304 h4.6816121148658745 c0.2584249887405969,0 0.46816121148658785,-0.20971451156759174 0.46816121148658785,-0.46811274903480304 S10.083049740877557,7.964126070363899 9.824624752136963,7.964126070363899 zM10.760947175110138,5.155449576155084 h-6.554256960812225 c-0.2584249887405969,0 -0.46816121148658785,0.20971451156759174 -0.46816121148658785,0.46811274903480304 s0.20973622274599127,0.46811274903480304 0.46816121148658785,0.46811274903480304 h6.554256960812225 c0.2584249887405969,0 0.46816121148658785,-0.20971451156759174 0.46816121148658785,-0.46811274903480304 S11.019372163850736,5.155449576155084 10.760947175110138,5.155449576155084 zM7.483818694704026,0.006209336772252725 C3.3471584695173346,0.006209336772252725 -0.006760689081374238,2.9403278094805922 -0.006760689081374238,6.559787823259492 c0,2.0686055357870496 1.0978349810588484,3.9101427331272562 2.8089672689195258,5.111326166271465 V14.98581730588594 l3.281338871432293,-1.9908927003263701 c0.4541347344051857,0.07492251632917817 0.9213412642056055,0.11844170418715905 1.4002732434335825,0.11844170418715905 c4.137149805538572,0 7.490579383785401,-2.9341184727083394 7.490579383785401,-6.553578486487238 C14.974398078489427,2.9403278094805922 11.620968500242599,0.006209336772252725 7.483818694704026,0.006209336772252725 zM7.483818694704026,12.177140811677125 c-0.5468122950163341,0 -1.074898141573205,-0.06366333386873328 -1.582397134333463,-0.17180043845622406 l-2.204115223187651,1.324740722405785 l0.029497216200854368,-2.1710885726607074 C2.0372372800234646,10.142728923492772 0.9295617338917999,8.463152618197704 0.9295617338917999,6.559787823259492 c0,-3.1021740091722836 2.9344222340891335,-5.617352988417633 6.554256960812225,-5.617352988417633 c3.6198347267230924,0 6.554256960812225,2.515178979245349 6.554256960812225,5.617352988417633 S11.103653421427117,12.177140811677125 7.483818694704026,12.177140811677125 z" id="svg_3"/></g></g></g><g id="svg_4" class=""></g><g id="svg_5" class=""></g><g id="svg_6" class=""></g><g id="svg_7" class=""></g><g id="svg_8" class=""></g><g id="svg_9" class=""></g><g id="svg_10" class=""></g><g id="svg_11" class=""></g><g id="svg_12" class=""></g><g id="svg_13" class=""></g><g id="svg_14" class=""></g><g id="svg_15" class=""></g><g id="svg_16" class=""></g><g id="svg_17" class=""></g><g id="svg_18" class=""></g></g></svg>'
      }
    };
  },
  computed: {
    isDisabled() {
      // evaluate whatever you need to determine disabled here...
      if (this.levels[this.selectedlevel].nodetype == null) {
        return false;
      }
      return true;
    }
  },
  created() {
    this.levels.push({
      levelno: 0,
      id: 1,
      nodes: [],
      nodetype: null,
      message: "Display Message",
      islastnode: false
    });
    this.selectedlevellist.push(0);
    this.maxid = 1;
    // console.log(this.$route.params);
    // this.bot_name=this.$route.params.botdata.bot_name;
    // this.bot_type=this.$route.params.botdata.bot_type;
    // console.log(this.bot_name,this.bot_type,this.$route.params);
  },
  mounted() {
    $(".dropdown-toggle").dropdown();
  },
  methods: {
    startdrag(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
    },
    completedrop(ev) {
      var checkid = null;
      // console.log(ev.target.id);
      if (isNaN(Number(ev.target.id)) || ev.target.id == null) {
        // console.log('getparent');
        checkid = document.getElementById(ev.target.id).parentNode.id;
        if (isNaN(Number(checkid))) {
          // console.log('getparentagain');
          checkid = document.getElementById(checkid).parentNode.id;
          if (isNaN(Number(checkid))) {
            // console.log('getparentagainandagain');
            checkid = document.getElementById(checkid).parentNode.id;
          }
        }
      } else {
        checkid = ev.target.id;
      }
      var droplevelindex = null;
      for (let i = 0; i < this.levels.length; i++) {
        if (checkid == this.levels[i].id) {
          droplevelindex = i;
        }
      }
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      // if (
      //   (this.levels[droplevelindex].nodetype == null &&
      //     this.levels[droplevelindex].islastnode == false) ||
      //   (this.levels[droplevelindex].nodetype == "Button" &&
      //     data == "Button") ||
      //   data == "Message" ||
      //   data == "Video" ||
      //   data == "Image" ||
      //   data == "Hyperlink"
      // ) {
      this.createnode(data, droplevelindex);
      // } else {
      //   // swal
      //   if (this.levels[droplevelindex].nodetype != null) {
      //     Swal({
      //       type: "error",
      //       text: "Single level cannnot have more then 1 input elements",
      //       showConfirmButton: true
      //     }).then(result => {});
      //   } else {
      //     Swal({
      //       type: "error",
      //       text:
      //         "This is selected as last node, last node cannot have input type elements",
      //       showConfirmButton: true
      //     }).then(result => {});
      //   }
      //   // Swal({
      //   //     type: "error",
      //   //     text: "Single level cannnot have more then 1 input elements",
      //   //     showConfirmButton: true
      //   // }).then(result => {
      //   // });
      // }
      // this.createnode(data,droplevelindex);
      $("#1").sortable();
    },
    handledrop(ev) {
      ev.preventDefault();
    },
    createnode(id, i) {
      // console.log(this.levels[i]);
      if (id == "Button") {
        this.levels[i].nodes.push({
          id: id + this.maxid + this.levels[i].nodes.length,
          nodetype: "Button",
          name: "Button" + (this.levels[i].nodes.length + 1),
          followinglevelid: null
          // svg:'<svg xmlns="http://www.w3.org/2000/svg" width="10.399" height="10.833" style="fill:#979797;margin-right:5%" viewBox="0 0 10.399 10.833"> <g transform="translate(-506.513 -407)"> <g transform="translate(506.513 407)"> <path class="a" d="M124.406,197c.029.01.058.022.088.029a1.2,1.2,0,0,1-.258,2.379q-4,0-8,0a1.2,1.2,0,0,1-.258-2.379c.03-.007.059-.019.088-.029Z" transform="translate(-115.035 -197)"/> <path class="a" d="M116.011,510.373a1.367,1.367,0,0,1-.68-.363,1.2,1.2,0,0,1,.8-2.042c.054,0,.108,0,.162,0q3.893,0,7.785,0a1.217,1.217,0,0,1,1.156.637,1.2,1.2,0,0,1-.791,1.746c-.03.007-.058.019-.087.029Z" transform="translate(-114.981 -499.54)"/><path class="a" d="M120.3,355c-1.322,0-2.644,0-3.965,0a1.2,1.2,0,0,1-.111-2.4c.049,0,.1,0,.149,0h7.863a1.2,1.2,0,0,1,.138,2.4c-.373.019-.749.007-1.123.007Z" transform="translate(-115.099 -348.381)"/> </g> </g> </svg>',
          // buttonindex:this.levels[i].buttoncount,
        });
        // this.levels[i].buttons.push({
        //     id:id+this.maxid+this.levels[i].nodes.length,
        //     nodetype:'Button',
        //     name:'Button'+(this.levels[i].buttoncount+1),
        //     followinglevelid:null,
        //     svg:'<svg xmlns="http://www.w3.org/2000/svg" width="10.399" height="10.833" viewBox="0 0 10.399 10.833"><defs><style>.f{fill:#fff;}</style></defs><g transform="translate(-506.513 -407)"><g transform="translate(506.513 407)"><path class="a" d="M124.406,197c.029.01.058.022.088.029a1.2,1.2,0,0,1-.258,2.379q-4,0-8,0a1.2,1.2,0,0,1-.258-2.379c.03-.007.059-.019.088-.029Z" transform="translate(-115.035 -197)"/><path class="a" d="M116.011,510.373a1.367,1.367,0,0,1-.68-.363,1.2,1.2,0,0,1,.8-2.042c.054,0,.108,0,.162,0q3.893,0,7.785,0a1.217,1.217,0,0,1,1.156.637,1.2,1.2,0,0,1-.791,1.746c-.03.007-.058.019-.087.029Z" transform="translate(-114.981 -499.54)"/><path class="a" d="M120.3,355c-1.322,0-2.644,0-3.965,0a1.2,1.2,0,0,1-.111-2.4c.049,0,.1,0,.149,0h7.863a1.2,1.2,0,0,1,.138,2.4c-.373.019-.749.007-1.123.007Z" transform="translate(-115.099 -348.381)"/></g></g></svg>',
        //     nodeindex:null,
        // });
        // this.levels[i].buttoncount=this.levels[i].buttoncount+1;
        // this.levels[i].buttons[this.levels[i].buttoncount-1].nodeindex=this.levels[i].nodes.length-1;
        // this.createlevel(i);
      } else if (id == "Text_Box") {
        this.levels[i].nodes.push({
          id: id + this.maxid + this.levels[i].nodes.length,
          nodetype: "Text Box",
          placeholder: "Enter Placeholder",
          followinglevelid: null
          // svg:'<svg xmlns="http://www.w3.org/2000/svg" width="13.169" height="10.06" style="fill:#979797;" viewBox="0 0 13.169 10.06"> <g transform="translate(120 2)"> <g transform="translate(-120 -2)"> <path class="a" d="M85.044,240.849H82.613c-.275,0-.386-.1-.385-.375.006-1.587-.029-3.175.019-4.761a7.627,7.627,0,0,1,.413-2.357,3.71,3.71,0,0,1,3.079-2.5,4.567,4.567,0,0,1,.855-.066c.231,0,.344.107.345.336q.005.786,0,1.573a.306.306,0,0,1-.289.337,1.34,1.34,0,0,0-1.4,1.321,7.624,7.624,0,0,0-.06,1.205c0,.128.079.122.165.122h2.126a.457.457,0,0,1,.214.029.334.334,0,0,1,.175.34q0,1.551,0,3.1,0,.641,0,1.281c0,.32-.093.411-.419.411h-2.4Z" transform="translate(-82.221 -230.79)"/> <path class="a" d="M340.8,237.753c.014-.677-.03-1.517.033-2.356a8.181,8.181,0,0,1,.337-1.872,3.724,3.724,0,0,1,2.969-2.65,4.538,4.538,0,0,1,1.027-.1.305.305,0,0,1,.347.338q.007.786,0,1.572a.311.311,0,0,1-.337.337,1.25,1.25,0,0,0-1.3,1.034,5.572,5.572,0,0,0-.12,1.5c0,.12.085.109.163.109h2.155c.248,0,.357.107.358.354,0,.611,0,1.223,0,1.834q0,1.288,0,2.577c0,.3-.1.4-.4.4H341.2c-.3,0-.4-.1-.4-.4C340.8,239.594,340.8,238.755,340.8,237.753Z" transform="translate(-333.266 -230.777)"/> </g> </g> </svg>',
        });
      } else if (id == "Textarea") {
        this.levels[i].nodes.push({
          id: id + this.maxid + this.levels[i].nodes.length,
          nodetype: "TextArea",
          placeholder: "Enter Placeholder",
          followinglevelid: null
          // svg:'<svg xmlns="http://www.w3.org/2000/svg" width="14.839" height="14.323" viewBox="0 0 14.839 14.323"><defs><svg:style>.f{fill:#fff;}</svg:style></defs><g transform="translate(175.699 113.805)"><path a" d="M18.839-55.567H8.568a.193.193,0,0,1-.174-.059.175.175,0,0,1-.034-.193.174.174,0,0,1,.165-.1c.115,0,.23,0,.346,0H19.194v.1q0,5.411,0,10.822a.187.187,0,0,1-.177.214c-.109,0-.179-.083-.179-.213q0-2.44,0-4.88,0-2.256,0-4.512,0-.542,0-1.084Z" transform="translate(-181.214 -56.991)"/><path class="a" d="M-101.054,43.377h10.2c.131,0,.2.064.2.177s-.078.178-.205.178h-10.558c0-.03-.005-.054,0-.079,0-.458,0-.917,0-1.375q0-1.837,0-3.674,0-2.375,0-4.75c0-.371,0-.742,0-1.113a.174.174,0,0,1,.225-.186.185.185,0,0,1,.133.192q0,1.975,0,3.95,0,2.617,0,5.234,0,.687,0,1.375C-101.057,43.325-101.055,43.346-101.054,43.377Z" transform="translate(-73.142 -144.104)"/><path class="a" d="M-175.127-112.766a2.208,2.208,0,0,1,.3.169.527.527,0,0,1,.143.6.533.533,0,0,1-.541.325.521.521,0,0,1-.456-.386,1.081,1.081,0,0,1,.021-.494,2.727,2.727,0,0,1,.424-1.02,1.155,1.155,0,0,1,.158-.176.2.2,0,0,1,.235-.032c.081.04.081.115.076.192a.923.923,0,0,1-.135.371C-174.979-113.064-175.055-112.908-175.127-112.766Z" transform="translate(0 0)"/><path class="a" d="M617.488,679.933a.582.582,0,0,1-.394-.224.529.529,0,1,1,.95-.271,2.688,2.688,0,0,1-.485,1.355.9.9,0,0,1-.147.156.194.194,0,0,1-.229.022c-.074-.038-.075-.108-.072-.18a.865.865,0,0,1,.127-.366C617.321,680.265,617.4,680.1,617.488,679.933Z" transform="translate(-780.502 -780.481)"/><path class="a" d="M721.452,679.936a.587.587,0,0,1-.389-.218.529.529,0,0,1,.6-.82.526.526,0,0,1,.341.551,2.694,2.694,0,0,1-.465,1.323.958.958,0,0,1-.159.175.2.2,0,0,1-.235.027c-.075-.043-.076-.114-.071-.188a.913.913,0,0,1,.134-.371C721.29,680.259,721.368,680.1,721.452,679.936Z" transform="translate(-882.868 -780.484)"/><path class="a" d="M-71.007-112.757a1.641,1.641,0,0,1,.278.14.514.514,0,0,1,.191.561.5.5,0,0,1-.41.38.523.523,0,0,1-.626-.516,2.6,2.6,0,0,1,.511-1.438.7.7,0,0,1,.131-.129.191.191,0,0,1,.217-.017c.074.037.078.105.076.178a.853.853,0,0,1-.125.366C-70.848-113.071-70.929-112.91-71.007-112.757Z" transform="translate(-102.525 -0.004)"/></g></svg>',
        });
      } else if (id == "Hyperlink") {
        this.levels[i].nodes.push({
          id: id + this.maxid + this.levels[i].nodes.length,
          nodetype: "Hyperlink",
          hyperlink: null,
          followinglevelid: null
          // svg:'<svg xmlns="http://www.w3.org/2000/svg" width="15.629" height="15.629" style="fill:#979797;"viewBox="0 0 15.629 15.629"> <g transform="translate(445 228)"> <g transform="translate(-445 -228)"> <path class="a" d="M-162.923,91.849c.912-.912,1.82-1.827,2.736-2.734a1.736,1.736,0,0,1,2.872.7c.018.054.032.109.048.167a1.178,1.178,0,0,0,.71-.334c.2-.193.39-.391.587-.584a.068.068,0,0,0,.016-.094c-.081-.145-.152-.3-.243-.436a3.312,3.312,0,0,0-5.122-.517q-1.849,1.842-3.691,3.69a3.273,3.273,0,0,0-.93,1.752c-.024.13-.04.261-.059.392v.438c.02.133.035.267.061.4a3.3,3.3,0,0,0,2.878,2.673.546.546,0,0,1,.122.022h.5a.052.052,0,0,1,.037-.015,3.225,3.225,0,0,0,2.035-.94q1.879-1.867,3.747-3.745c.049-.048.094-.1.156-.167l-.083.017a3.793,3.793,0,0,1-1.968-.068.138.138,0,0,0-.161.043q-1.388,1.392-2.779,2.78a1.662,1.662,0,0,1-1.529.49,1.644,1.644,0,0,1-1.358-1.181,1.671,1.671,0,0,1,.437-1.769C-163.579,92.5-163.249,92.175-162.923,91.849Z" transform="translate(166 -81.754)"/> <path class="a" d="M200.484-247.468c-.02.133-.036.267-.061.4a3.24,3.24,0,0,1-.912,1.727q-1.858,1.86-3.719,3.718a3.311,3.311,0,0,1-5.114-.533c-.09-.136-.158-.287-.239-.429a.071.071,0,0,1,.02-.1c.191-.188.379-.379.57-.568a1.161,1.161,0,0,1,.722-.344c.008.025.016.052.024.078a1.735,1.735,0,0,0,2.9.786q1.752-1.74,3.492-3.492a3.574,3.574,0,0,0,.46-.518,1.731,1.731,0,0,0-1.239-2.665,1.69,1.69,0,0,0-1.452.5q-1.392,1.387-2.778,2.78a.145.145,0,0,1-.168.046,3.883,3.883,0,0,0-2.049-.044c.027-.032.043-.053.061-.071q.628-.632,1.256-1.263c.839-.84,1.682-1.677,2.518-2.52a3.341,3.341,0,0,1,1.8-.966c.125-.023.252-.037.378-.056h.438c.121.017.243.03.362.052a3.294,3.294,0,0,1,2.673,2.651c.026.129.04.261.059.392Z" transform="translate(-184.855 251)"/> </g> </g> </svg>',
        });
      } else if (id == "Check_Box") {
        this.levels[i].nodes.push({
          id: id + this.maxid + this.levels[i].nodes.length,
          nodetype: "Check Box",
          values: [{ title: null, payload: null }],
          followinglevelid: null
          // svg:'<svg xmlns="http://www.w3.org/2000/svg" width="14.611" height="12.369" style="fill:#979797;"  viewBox="0 0 14.611 12.369"> <g transform="translate(188 -107)"> <g transform="translate(-188 107)"> <path class="a" d="M231.954,174.87c.355-.357.686-.692,1.018-1.024l4.6-4.6a.714.714,0,0,1,1.135,0c.283.282.567.562.847.847a.7.7,0,0,1,0,1.1q-2.637,2.641-5.278,5.279l-1.748,1.749a.709.709,0,0,1-1.136.005l-3.649-3.649a.7.7,0,0,1-.009-1.114q.443-.448.891-.891a.7.7,0,0,1,1.058.008q1.071,1.069,2.139,2.14C231.868,174.758,231.9,174.805,231.954,174.87Z" transform="translate(-225.218 -168.389)"/> <path class="a" d="M160.269,150.362h3.64a2.424,2.424,0,0,1,1,.2.283.283,0,0,1,.1.5,4.921,4.921,0,0,1-.4.4.4.4,0,0,1-.247.084c-.3-.009-.59-.054-.885-.055q-3.394-.007-6.788,0a1.386,1.386,0,0,0-1.461,1.454q-.006,3.624,0,7.249a1.38,1.38,0,0,0,1.4,1.4c1.28.005,2.56,0,3.84,0,1.152,0,2.3,0,3.455,0a1.382,1.382,0,0,0,1.4-1.226,6.986,6.986,0,0,0,.013-.782c0-.522-.005-1.044.006-1.566a.483.483,0,0,1,.115-.282c.157-.181.337-.343.506-.515a.276.276,0,0,1,.321-.075.269.269,0,0,1,.179.276c-.006,1.008.017,2.018-.024,3.024a2.461,2.461,0,0,1-2.162,2.245c-.462.042-.93.03-1.4.031q-3.125,0-6.251,0a2.508,2.508,0,0,1-2.389-1.7,2.772,2.772,0,0,1-.138-.842q-.016-3.655,0-7.31a2.5,2.5,0,0,1,2.408-2.5c.91-.029,1.822-.008,2.733-.009Z" transform="translate(-154.095 -150.356)"/> </g> </g> </svg>',
        });
      } else if (id == "Radio_Button") {
        this.levels[i].nodes.push({
          id: id + this.maxid + this.levels[i].nodes.length,
          nodetype: "Radio Button",
          values: [{ title: null, payload: null }],
          followinglevelid: null
          // svg:'<svg xmlns="http://www.w3.org/2000/svg" width="16.122" height="16.12" style="fill:#979797;" viewBox="0 0 16.122 16.12"> <g transform="translate(-708.017 101.974)"> <path class="a" d="M716.072-85.854a8.048,8.048,0,0,1-8.055-8.123,8.058,8.058,0,0,1,8.059-8,8.07,8.07,0,0,1,8.063,8.126A8.069,8.069,0,0,1,716.072-85.854ZM709.6-93.96a6.452,6.452,0,0,0,6.492,6.524,6.468,6.468,0,0,0,6.461-6.436,6.456,6.456,0,0,0-6.5-6.519A6.445,6.445,0,0,0,709.6-93.96Z" transform="translate(0)"/> <path class="a" d="M744.984-69.06A3.994,3.994,0,0,1,748.955-65a4,4,0,0,1-4.019,3.954,3.989,3.989,0,0,1-4-4.1A3.987,3.987,0,0,1,744.984-69.06Z" transform="translate(-28.869 -28.862)"/> </g> </svg>',
        });
      } else if (id == "Dropdown") {
        this.levels[i].nodes.push({
          id: id + this.maxid + this.levels[i].nodes.length,
          nodetype: "Dropdown",
          values: [{ title: null, payload: null }],
          placeholder: null,
          followinglevelid: null
          // svg:'<svg xmlns="http://www.w3.org/2000/svg" width="13.011" height="13.01" style="fill:#979797;" viewBox="0 0 13.011 13.01"> <g transform="translate(122 -226)"> <g transform="translate(-122 226)"> <path class="a" d="M143.989,227.558q2.5,0,5.007,0a1.429,1.429,0,0,1,1.463,1.111,1.722,1.722,0,0,1,.042.4q0,4.988,0,9.975a1.432,1.432,0,0,1-1.118,1.478,2.1,2.1,0,0,1-.476.044q-4.911,0-9.822,0a1.464,1.464,0,0,1-1.553-1.125,1.678,1.678,0,0,1-.039-.38q0-5,0-9.995a1.435,1.435,0,0,1,1.127-1.472,2.007,2.007,0,0,1,.438-.035Q141.524,227.556,143.989,227.558Zm-5.044,6.494c0,1.6,0,3.21,0,4.814,0,.185.033.251.238.25q4.824-.011,9.648,0c.173,0,.227-.042.226-.222q-.008-4.833,0-9.667c0-.185-.06-.22-.229-.219q-4.824.007-9.648,0c-.182,0-.237.045-.236.232C138.949,230.842,138.945,232.447,138.945,234.052Z" transform="translate(-137.492 -227.557)"/> <path class="a" d="M217.409,343.722l2.572-2.578.979.982-3.557,3.557-3.558-3.555.985-.987Z" transform="translate(-210.915 -336.783)"/> </g> </g> </svg>',
        });
      } else if (id == "File_Upload") {
        this.levels[i].nodes.push({
          id: id + this.maxid + this.levels[i].nodes.length,
          nodetype: "File Upload",
          message: null,
          followinglevelid: null
          // svg:'<svg xmlns="http://www.w3.org/2000/svg" width="12.785" height="13.14" style="fill:#979797;"viewBox="0 0 12.785 13.14"><g transform="translate(-31.42 -443.609)"><g transform="translate(31.42 443.609)"><path class="f" d="M3.094,456.552a2.594,2.594,0,0,1-.34-.175.685.685,0,0,1-.279-.592q0-1.952,0-3.9a.752.752,0,0,1,1.022-.709.718.718,0,0,1,.457.709c0,.623,0,1.245,0,1.868q0,.593,0,1.186v.121H13.8v-.124q0-1.506,0-3.012a.76.76,0,0,1,.25-.619.7.7,0,0,1,.725-.136.665.665,0,0,1,.467.579,5.064,5.064,0,0,1,.014.545q0,1.726,0,3.453a.709.709,0,0,1-.16.527,1.9,1.9,0,0,1-.3.223.762.762,0,0,1-.143.06Z" transform="translate(-2.474 -443.412)"/><path class="f" d="M134.647,84a1.536,1.536,0,0,1,.69.506q.727.725,1.453,1.452c.417.418.835.834,1.246,1.257a.683.683,0,0,1,.119.82.711.711,0,0,1-.833.364.954.954,0,0,1-.375-.214c-.539-.523-1.067-1.059-1.6-1.59-.021-.021-.044-.04-.09-.082v.159q0,3.059,0,6.119a.742.742,0,0,1-.159.508.723.723,0,0,1-1.274-.314,1.516,1.516,0,0,1-.017-.23q0-3.044,0-6.087V86.51l-.324.317c-.494.483-.982.973-1.486,1.446a.718.718,0,0,1-.984-1.037c.375-.391.762-.771,1.144-1.154.6-.6,1.2-1.2,1.8-1.8a1.152,1.152,0,0,1,.459-.28Z" transform="translate(-128.129 -84)"/></g></g></svg>',
        });
      } else if (id == "Video") {
        this.levels[i].nodes.push({
          id: id + this.maxid + this.levels[i].nodes.length,
          nodetype: "Video",
          videourl: null,
          followinglevelid: null
          // svg:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" style="fill: rgb(151, 151, 151);margin-bottom: 2%;" xml:space="preserve" width="15" height="15"><rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none"/><g class="currentLayer" style=""><title>Layer 1</title><path d="M14.287040869975606,2.164383191050649 H0.6992602153575042 C0.5653235203334106,2.164383191050649 0.4566212750964669,2.275933519171331 0.4566212750964669,2.4139364978083266 v10.980345497337789 c0,0.13800297863699543 0.10870224523694494,0.24955330675767742 0.24263894026103774,0.24955330675767742 h13.587780654618102 c0.13393669502409286,0 0.24263894026103774,-0.11155032812068182 0.24263894026103774,-0.24955330675767742 V2.4139364978083266 C14.529679810236644,2.275933519171331 14.420977564999697,2.164383191050649 14.287040869975606,2.164383191050649 zM2.883010677706842,13.144728688388437 H0.9418991556185419 v-2.2459797608190932 h1.9411115220883004 V13.144728688388437 zM2.883010677706842,10.39964231405399 H0.9418991556185419 v-2.2459797608190932 h1.9411115220883004 V10.39964231405399 zM2.883010677706842,7.654555939719543 H0.9418991556185419 v-2.2459797608190932 h1.9411115220883004 V7.654555939719543 zM2.883010677706842,4.909469565385097 H0.9418991556185419 V2.6634898045660034 h1.9411115220883004 V4.909469565385097 zM9.321920235413996,8.1147322373807 l-2.669028342871413,1.746873147303739 C6.613341745280031,9.88730937528048 6.56796826345122,9.900535700538637 6.522594781622405,9.900535700538637 c-0.040278064083332295,0 -0.08031348922640356,-0.010231685577064773 -0.1167093302655593,-0.030695056731194305 C6.328240990473316,9.825919261818091 6.279955841361367,9.742069350747512 6.279955841361367,9.65098239378096 V6.15723609917348 c0,-0.09108695696655221 0.048285149111946556,-0.17493686803713188 0.12592960999547861,-0.21885825002648304 c0.07764446088353207,-0.04367182868259355 0.17227364758533686,-0.04042763569474374 0.2472490801259976,0.008235259123003356 l2.669028342871413,1.746873147303739 C9.391800250209174,7.739404064017155 9.434262064754856,7.8187620155660955 9.434262064754856,7.904109246477221 S9.391800250209174,8.068814428937287 9.321920235413996,8.1147322373807 zM14.044401929714569,13.144728688388437 h-1.9411115220883004 v-2.2459797608190932 h1.9411115220883004 V13.144728688388437 zM14.044401929714569,10.39964231405399 h-1.9411115220883004 v-2.2459797608190932 h1.9411115220883004 V10.39964231405399 zM14.044401929714569,7.654555939719543 h-1.9411115220883004 v-2.2459797608190932 h1.9411115220883004 V7.654555939719543 zM14.044401929714569,4.909469565385097 h-1.9411115220883004 V2.6634898045660034 h1.9411115220883004 V4.909469565385097 z" id="svg_1" class=""/><g id="svg_2"></g><g id="svg_3"></g><g id="svg_4"></g><g id="svg_5"></g><g id="svg_6"></g><g id="svg_7"></g><g id="svg_8"></g><g id="svg_9"></g><g id="svg_10"></g><g id="svg_11"></g><g id="svg_12"></g><g id="svg_13"></g><g id="svg_14"></g><g id="svg_15"></g><g id="svg_16"></g></g></svg>',
        });
      } else if (id == "Image") {
        this.levels[i].nodes.push({
          id: id + this.maxid + this.levels[i].nodes.length,
          nodetype: "Image",
          imageurl: null,
          followinglevelid: null
          // svg:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" style="fill: rgb(151, 151, 151);margin-bottom: 2%;" xml:space="preserve" width="15" height="15"><rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none" class="" style=""/><g class="currentLayer" style=""><title>Layer 1</title><g id="svg_1" class=""><path d="M14.57597422412875,1.7305933623734049 H0.5473161789080976 C0.40903369246235155,1.7305933623734049 0.29680442810058616,1.8474405684495352 0.29680442810058616,1.9919965079575879 v11.501738405704032 c0,0.1445559395080532 0.11222926436176554,0.26140314558418254 0.25051175080751165,0.26140314558418254 h14.028658045220652 c0.13828248644574673,0 0.25051175080751165,-0.11684720607612967 0.25051175080751165,-0.26140314558418254 V1.9919965079575879 C14.826485974936261,1.8474405684495352 14.714256710574492,1.7305933623734049 14.57597422412875,1.7305933623734049 zM14.325462473321238,13.232331768077437 H0.7978279297156092 V2.25339965354177 h13.527634543605629 V13.232331768077437 z" id="svg_2"/><path d="M4.304992441020772,7.517536199316037 c0.7693215867298686,0 1.3950999402470323,-0.6529850576692892 1.3950999402470323,-1.4554927146127288 C5.700092381267803,5.259013021468703 5.074314027750641,4.606027963799413 4.304992441020772,4.606027963799413 s-1.3950999402470323,0.6529850576692892 -1.3950999402470323,1.4557541177583124 C2.9098925007737417,6.86455114164675 3.5356708542909034,7.517536199316037 4.304992441020772,7.517536199316037 zM4.304992441020772,5.128834254967778 c0.49300712558918297,0 0.8940764386320093,0.4187678392258609 0.8940764386320093,0.9329478265899478 S4.797999566609955,6.994729908147672 4.304992441020772,6.994729908147672 s-0.8940764386320093,-0.4185064360802763 -0.8940764386320093,-0.9326864234443636 S3.81198531543159,5.128834254967778 4.304992441020772,5.128834254967778 z" id="svg_3"/><path d="M2.0503866837531675,12.186719185740706 c0.058619749688957876,0 0.11774052287953055,-0.02143505793790302 0.16533775553295785,-0.06508938325046147 l4.086598190922937,-3.7542719768800303 l2.580772056818985,2.6927138026626647 c0.0979500945657371,0.10220862992341544 0.256273521076085,0.10220862992341544 0.3542236156418219,0 s0.0979500945657371,-0.26741541793261936 0,-0.3696240478560346 l-1.2042099861317086,-1.2565649208231655 l2.299948384163764,-2.6281472257033713 l2.8210128258433884,2.6984646718655165 c0.10195828257865724,0.09750337330290022 0.2605322208398123,0.09018408522654306 0.3539731038910145,-0.01620699502621932 c0.09344088305120199,-0.10639108025276232 0.08667706577939896,-0.2718592714075501 -0.015531728550065745,-0.3693626447104505 l-3.0061410096901398,-2.875434601426008 c-0.04910030315827237,-0.04679116305956875 -0.11448387011903285,-0.07005604301656107 -0.1803684605814089,-0.06848762414305586 c-0.06638561396399072,0.003136837747010197 -0.12901355166586848,0.03372100578035962 -0.17385515506041324,0.08495602231485955 l-2.453512087408769,2.804071542681526 l-1.1881772340800278,-1.239835119505778 c-0.0936913948020095,-0.09750337330290022 -0.2434974217849019,-0.10247003306899963 -0.3427000751046762,-0.011501738405704058 L1.884798416469403,11.729002277822804 c-0.10396237658511752,0.09541214813822664 -0.11398284661741792,0.26061893614743015 -0.022546057572676095,0.3691012415648662 C1.911853685556613,12.156919227144112 1.9809949287794901,12.186719185740706 2.0503866837531675,12.186719185740706 z" id="svg_4"/></g><g id="svg_5" class=""></g><g id="svg_6" class=""></g><g id="svg_7" class=""></g><g id="svg_8" class=""></g><g id="svg_9" class=""></g><g id="svg_10" class=""></g><g id="svg_11" class=""></g><g id="svg_12" class=""></g><g id="svg_13" class=""></g><g id="svg_14" class=""></g><g id="svg_15" class=""></g><g id="svg_16" class=""></g><g id="svg_17" class=""></g><g id="svg_18" class=""></g><g id="svg_19" class=""></g></g></svg>',
        });
      } else if (id == "Message") {
        this.levels[i].nodes.push({
          id: id + this.maxid + this.levels[i].nodes.length,
          nodetype: "Message",
          message: null,
          followinglevelid: null
          // svg:'<svg xmlns="http://www.w3.org/2000/svg" width="12.785" height="13.14" style="fill:#979797;"viewBox="0 0 12.785 13.14"><g transform="translate(-31.42 -443.609)"><g transform="translate(31.42 443.609)"><path class="f" d="M3.094,456.552a2.594,2.594,0,0,1-.34-.175.685.685,0,0,1-.279-.592q0-1.952,0-3.9a.752.752,0,0,1,1.022-.709.718.718,0,0,1,.457.709c0,.623,0,1.245,0,1.868q0,.593,0,1.186v.121H13.8v-.124q0-1.506,0-3.012a.76.76,0,0,1,.25-.619.7.7,0,0,1,.725-.136.665.665,0,0,1,.467.579,5.064,5.064,0,0,1,.014.545q0,1.726,0,3.453a.709.709,0,0,1-.16.527,1.9,1.9,0,0,1-.3.223.762.762,0,0,1-.143.06Z" transform="translate(-2.474 -443.412)"/><path class="f" d="M134.647,84a1.536,1.536,0,0,1,.69.506q.727.725,1.453,1.452c.417.418.835.834,1.246,1.257a.683.683,0,0,1,.119.82.711.711,0,0,1-.833.364.954.954,0,0,1-.375-.214c-.539-.523-1.067-1.059-1.6-1.59-.021-.021-.044-.04-.09-.082v.159q0,3.059,0,6.119a.742.742,0,0,1-.159.508.723.723,0,0,1-1.274-.314,1.516,1.516,0,0,1-.017-.23q0-3.044,0-6.087V86.51l-.324.317c-.494.483-.982.973-1.486,1.446a.718.718,0,0,1-.984-1.037c.375-.391.762-.771,1.144-1.154.6-.6,1.2-1.2,1.8-1.8a1.152,1.152,0,0,1,.459-.28Z" transform="translate(-128.129 -84)"/></g></g></svg>',
        });
      }
      // console.log(id,i,this.levels[i]);
      // this.levels[i].nodetype=id;
      // if (
      //   id == "Message" ||
      //   id == "Video" ||
      //   id == "Image" ||
      //   id == "Hyperlink"
      // ) {
      // } else {
      // this.createlevel(i);
      this.levels[i].nodetype = id;
      // }
      // console.log(this.levels);
      this.selectnode(this.levels[i].nodes.length - 1, this.levels[i].levelno);
    },
    createlevel(levelindex) {
      this.maxid = this.maxid + 1;
      this.levels.push({
        levelno: this.levels[levelindex].levelno + 1,
        id: this.maxid,
        nodes: [],
        nodetype: null,
        message: "Display Message",
        previousnodeindex: this.levels[levelindex].nodes.length - 1,
        previouslevelindex: levelindex,
        img: null,
        flavor_text: null,
        pop_up: null,
        islastnode: false
      });
      this.levels[levelindex].nodes[
        this.levels[levelindex].nodes.length - 1
      ].followinglevelid = this.maxid - 1;
      // this.levels[levelindex].buttons[this.levels[levelindex].buttons.length-1].followinglevelid=this.maxid-1;
      // console.log('start',this.selectedlevellist);
      if (
        this.selectedlevellist[this.levels[this.levels.length - 1].levelno] ==
        undefined
      ) {
        this.selectedlevellist[this.levels[levelindex].levelno] = levelindex;
        this.selectedlevellist.push(this.levels.length - 1);
      } else {
        this.selectedlevellist[this.levels[levelindex].levelno] = levelindex;
        this.selectedlevellist[this.levels[levelindex].levelno + 1] =
          this.levels.length - 1;
        while (this.selectedlevellist.length > levelindex + 2) {
          this.selectedlevellist.pop();
        }
      }
      // console.log('end',this.selectedlevellist);
    },
    selectnode(nodeindex, levelindex) {
      var issetval = true;
      if (this.selectedlevel == this.selectedlevellist[levelindex]) {
        // this.savenodevalue();
        issetval = false;
      }
      if (levelindex != null) {
        this.selectedlevel = this.selectedlevellist[levelindex];
        this.selected = true;
      } else {
        this.selectedlevel = levelindex;
      }
      this.selectednode = nodeindex;
      // console.log(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype,'==Button','&&',this.selectedlevellist[this.selectedlevel],'==',undefined);
      // if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='Button'&&this.selectedlevellist[this.selectedlevel]==undefined){
      //     this.selectedlevellist.push(this.levels[this.selectedlevel].nodes[this.selectednode].followinglevelid-1,);
      // }
      if (this.selectedlevel != null) {
        this.setvalues();
      }
    },
    resetpath(nodeindex, levelindex) {
      this.selectedlevellist[levelindex + 1] = this.levels[
        this.selectedlevellist[levelindex]
      ].nodes[nodeindex].followinglevelid;
      while (this.selectedlevellist.length > levelindex + 2) {
        this.selectedlevellist.pop();
      }
      // this.setstraightpath();
    },
    setstraightpath() {
      var lastnodetype = this.levels[
        this.selectedlevellist[this.selectedlevellist.length - 1]
      ].nodetype;
      if (
        lastnodetype != "Button" &&
        lastnodetype != "Message" &&
        lastnodetype != "Hyperlink" &&
        lastnodetype != "Image" &&
        lastnodetype != "Video" &&
        lastnodetype != null
      ) {
        this.selectedlevellist.push(
          this.levels[this.selectedlevellist[this.selectedlevellist.length - 1]]
            .nodes[0].followinglevelid
        );
      }
    },
    setvalues() {
      this.singlevalue = [];
      this.value = [];
      this.displaymessage = this.levels[this.selectedlevel].message;
      for (let i = 0; i < this.levels[this.selectedlevel].nodes.length; i++) {
        if (this.levels[this.selectedlevel].nodes[i].nodetype == "Button") {
          this.singlevalue.push(this.levels[this.selectedlevel].nodes[i].name);
        }
        if (this.levels[this.selectedlevel].nodes[i].nodetype == "Text Box") {
          this.singlevalue.push(
            this.levels[this.selectedlevel].nodes[i].placeholder
          );
        }
        if (this.levels[this.selectedlevel].nodes[i].nodetype == "TextArea") {
          this.singlevalue.push(
            this.levels[this.selectedlevel].nodes[i].placeholder
          );
        }
        if (this.levels[this.selectedlevel].nodes[i].nodetype == "Hyperlink") {
          this.singlevalue.push(
            this.levels[this.selectedlevel].nodes[i].hyperlink
          );
        }
        if (this.levels[this.selectedlevel].nodes[i].nodetype == "Check Box") {
          // this.value.push(this.levels[this.selectedlevel].nodes[i].values);
          for (
            let j = 0;
            j < this.levels[this.selectedlevel].nodes[i].values.length;
            j++
          ) {
            this.value.push(
              this.levels[this.selectedlevel].nodes[i].values[j].title
            );
          }
        }
        if (
          this.levels[this.selectedlevel].nodes[i].nodetype == "Radio Button"
        ) {
          // this.value.push(this.levels[this.selectedlevel].nodes[i].values);
          for (
            let j = 0;
            j < this.levels[this.selectedlevel].nodes[i].values.length;
            j++
          ) {
            this.value.push(
              this.levels[this.selectedlevel].nodes[i].values[j].title
            );
          }
        }
        if (this.levels[this.selectedlevel].nodes[i].nodetype == "Dropdown") {
          this.singlevalue.push(
            this.levels[this.selectedlevel].nodes[i].placeholder
          );
          for (
            let j = 0;
            j < this.levels[this.selectedlevel].nodes[i].values.length;
            j++
          ) {
            this.value.push(
              this.levels[this.selectedlevel].nodes[i].values[j].title
            );
          }
        }
        if (
          this.levels[this.selectedlevel].nodes[i].nodetype == "File Upload"
        ) {
          this.singlevalue.push(
            this.levels[this.selectedlevel].nodes[i].message
          );
        }
        if (this.levels[this.selectedlevel].nodes[i].nodetype == "Image") {
          this.singlevalue.push(
            this.levels[this.selectedlevel].nodes[i].imageurl
          );
        }
        if (this.levels[this.selectedlevel].nodes[i].nodetype == "Message") {
          this.singlevalue.push(
            this.levels[this.selectedlevel].nodes[i].message
          );
        }
        if (this.levels[this.selectedlevel].nodes[i].nodetype == "Video") {
          this.singlevalue.push(
            this.levels[this.selectedlevel].nodes[i].videourl
          );
        }
        // if(this.levels[this.selectedlevel].nodes[i].nodetype=='Button'){
        //     this.value.push(this.levels[this.selectedlevel].nodes[i].name);
        // }
      }
      // console.log(this.value,this.singlevalue,this.displaymessage);
      // this.name=null;
      // this.hyperlink=null;
      // this.message=null;
      // this.value=[];
      // this.buttonsname=[];
      // this.displaymessage=this.levels[this.selectedlevel].message;
      // // this.levels[this.selectedlevel]
      // if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='Button'){
      //     for(let j=0;j<this.levels[this.selectedlevel].nodes.length;j++){
      //         this.buttonsname.push(this.levels[this.selectedlevel].nodes[j].name);
      //     }
      //     console.log(this.buttonsname);
      //     // this.name=this.levels[this.selectedlevel].nodes[this.selectednode].name;
      // }
      // if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='Text Box'){
      //     this.name=this.levels[this.selectedlevel].nodes[this.selectednode].placeholder;
      // }
      // if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='TextArea'){
      //     this.name=this.levels[this.selectedlevel].nodes[this.selectednode].placeholder;
      // }
      // if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='Hyperlink'){
      //     this.hyperlink=this.levels[this.selectedlevel].nodes[this.selectednode].hyperlink;
      // }
      // if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='Check Box'){
      //     this.message=this.levels[this.selectedlevel].nodes[this.selectednode].message;
      // }
      // if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='Radio Button'){
      //     this.message=this.levels[this.selectedlevel].nodes[this.selectednode].message;
      // }
      // if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='Dropdown'){
      //     this.message=this.levels[this.selectedlevel].nodes[this.selectednode].message;
      // }
      // if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='File Upload'){
      //     this.message=this.levels[this.selectedlevel].nodes[this.selectednode].message;
      // }
      // if(this.levels[this.selectedlevel].nodes[this.selectednode].values!=undefined){
      //     this.value=[];
      //     for(let i=0;i<this.levels[this.selectedlevel].nodes[this.selectednode].values.length;i++){
      //         this.value.push(this.levels[this.selectedlevel].nodes[this.selectednode].values[i].title);
      //     }
      // }
    },
    saveval() {
      if (event.keyCode === 13) {
        this.savenodevalue();
      }
    },
    savenodevalue() {
      this.levels[this.selectedlevel].message = this.displaymessage;
      for (let i = 0; i < this.levels[this.selectedlevel].nodes.length; i++) {
        if (this.levels[this.selectedlevel].nodes[i].nodetype == "Button") {
          // this.singlevalue.push(this.levels[this.selectedlevel].nodes[i].name);
          this.levels[this.selectedlevel].nodes[i].name = this.singlevalue[i];
        }
        if (this.levels[this.selectedlevel].nodes[i].nodetype == "Text Box") {
          // this.singlevalue.push(this.levels[this.selectedlevel].nodes[i].placeholder);
          this.levels[this.selectedlevel].nodes[
            i
          ].placeholder = this.singlevalue[i];
        }
        if (this.levels[this.selectedlevel].nodes[i].nodetype == "TextArea") {
          // this.singlevalue.push(this.levels[this.selectedlevel].nodes[i].placeholder);
          this.levels[this.selectedlevel].nodes[
            i
          ].placeholder = this.singlevalue[i];
        }
        if (this.levels[this.selectedlevel].nodes[i].nodetype == "Hyperlink") {
          // this.singlevalue.push(this.levels[this.selectedlevel].nodes[i].hyperlink);
          this.levels[this.selectedlevel].nodes[i].hyperlink = this.singlevalue[
            i
          ];
        }
        if (this.levels[this.selectedlevel].nodes[i].nodetype == "Check Box") {
          // this.value.push(this.levels[this.selectedlevel].nodes[i].values);
          for (
            let j = 0;
            j < this.levels[this.selectedlevel].nodes[i].values.length;
            j++
          ) {
            // this.value.push(this.levels[this.selectedlevel].nodes[this.selectednode].values[i].title);
            this.levels[this.selectedlevel].nodes[i].values[
              j
            ].title = this.value[j];
          }
        }
        if (
          this.levels[this.selectedlevel].nodes[i].nodetype == "Radio Button"
        ) {
          // this.value.push(this.levels[this.selectedlevel].nodes[i].values);
          for (
            let j = 0;
            j < this.levels[this.selectedlevel].nodes[i].values.length;
            j++
          ) {
            // this.value.push(this.levels[this.selectedlevel].nodes[this.selectednode].values[j].title);
            this.levels[this.selectedlevel].nodes[i].values[
              j
            ].title = this.value[j];
          }
        }
        if (this.levels[this.selectedlevel].nodes[i].nodetype == "Dropdown") {
          this.levels[this.selectedlevel].nodes[
            i
          ].placeholder = this.singlevalue[i];
          for (
            let j = 0;
            j < this.levels[this.selectedlevel].nodes[i].values.length;
            j++
          ) {
            // this.value.push(this.levels[this.selectedlevel].nodes[this.selectednode].values[j].title);
            this.levels[this.selectedlevel].nodes[i].values[
              j
            ].title = this.value[j];
          }
        }
        if (
          this.levels[this.selectedlevel].nodes[i].nodetype == "File Upload"
        ) {
          // this.singlevalue.push(this.levels[this.selectedlevel].nodes[i].message);
          this.levels[this.selectedlevel].nodes[i].message = this.singlevalue[
            i
          ];
        }
        if (this.levels[this.selectedlevel].nodes[i].nodetype == "Image") {
          // this.singlevalue.push(this.levels[this.selectedlevel].nodes[i].imageurl);
          this.levels[this.selectedlevel].nodes[i].imageurl = this.singlevalue[
            i
          ];
        }
        if (this.levels[this.selectedlevel].nodes[i].nodetype == "Message") {
          // this.value.push(this.levels[this.selectedlevel].nodes[i].name);
          this.levels[this.selectedlevel].nodes[i].message = this.singlevalue[
            i
          ];
        }
        if (this.levels[this.selectedlevel].nodes[i].nodetype == "Video") {
          // this.singlevalue.push(this.levels[this.selectedlevel].nodes[i].videourl);
          this.levels[this.selectedlevel].nodes[i].videourl = this.singlevalue[
            i
          ];
        }
      }
    },
    deletenode(deletenodeindex) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete!!"
      }).then(result => {
        if (result.value) {
          this.selected = null;
          this.clearall();
          if (
            this.levels[this.selectedlevel].nodes[this.selectednode].nodetype ==
              "Message" ||
            this.levels[this.selectedlevel].nodes[this.selectednode].nodetype ==
              "Image" ||
            this.levels[this.selectedlevel].nodes[this.selectednode].nodetype ==
              "Video" ||
            this.levels[this.selectedlevel].nodes[this.selectednode].nodetype ==
              "Hyperlink"
          ) {
            this.levels[this.selectedlevel].nodes.splice(deletenodeindex, 1);
            this.selectednode = 0;
          } else {
            while (
              this.selectedlevellist.length >
              this.levels[this.selectedlevel].levelno + 1
            ) {
              this.selectedlevellist.pop();
            }
            this.levels[this.selectedlevel].nodes.splice(deletenodeindex, 1);
            this.levels[this.selectedlevel].nodetype = null;
            // }
            this.selectedlevel = this.selectedlevellist[
              this.selectedlevellist.length - 2
            ];
            this.selectednode = 0;
            this.selectnode(
              this.selectednode,
              this.levels[this.selectedlevel].levelno
            );
          }
        }
      });
    },
    andvalue(index) {
      this.levels[this.selectedlevel].nodes[index].values.push({
        title: null,
        payload: null
      });
      this.value.push(null);
    },
    deletevalue(valueindex) {
      this.levels[this.selectedlevel].nodes[this.selectednode].values.splice(
        valueindex,
        1
      );
      this.value.splice(valueindex, 1);
    },
    clearall() {
      if (
        this.levels[this.selectedlevel].nodes[this.selectednode].placeholder !=
        undefined
      ) {
        this.name = this.levels[this.selectedlevel].nodes[
          this.selectednode
        ].placeholder;
        // console.log('h1',this.name);
      } else {
        this.name = null;
        // console.log('h2',this.name,this.selected);
      }
      this.hyperlink = null;
      this.message = null;
      this.value = [];
      // setTimeout(function(){ alert("After 5 seconds!"); }, 5000);
      // this.selectedlevel=null;
      // this.selectednode=null;
    },
    setasleafnode() {
      if (this.isDisabled) {
        Swal({
          type: "error",
          text:
            "Constains child level. Levels with child level cannot be last level of a branch.",
          showConfirmButton: true,
          timer:2000,
        }).then(result => {});
      } else {
        if (this.levels[this.selectedlevel].islastnode == true) {
          this.levels[this.selectedlevel].islastnode = false;
        } else {
          this.levels[this.selectedlevel].islastnode = true;
        }
      }
    },
    whendisabbled() {
      if (this.isDisabled) {
        Swal({
          type: "error",
          text:
            "Constains child level. Levels with child level cannot be last level of a branch.",
          showConfirmButton: true,
          timer:2000,
        }).then(result => {});
      }
    },
    finalsave() {
      console.log(this.levels);
    }
  }
};
</script>

<style scoped>
.control {
  top: 0px;
  left: 0px;
  width: 25%;
  min-height: 530px;
  height: auto;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  opacity: 1;
}
.workflow {
  top: 0px;
  left: 252px;
  width: 50%;
  min-height: 530px;
  height: auto;
  opacity: 1;
}
.setting {
  top: 0px;
  left: 1105px;
  width: 25%;
  /* min-height: 100%; */
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  opacity: 1;
  float: right;
}
.testbutton {
  top: 296px;
  left: 16px;
  width: auto;
  height: 35px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 4px #00000029;
  border-radius: 19px;
  margin-top: 5%;
}
.testbutton div {
  padding-left: 5%;
  padding-top: 5%;
}
.headings {
  height: 53px;
  display: flex;
  padding-left: 5%;
  /* border-bottom: 1px solid #dee2e6 */
}
.headings h5 {
  align-self: center;
}
.tagprops h4 {
  border-bottom: 1px solid #dee2e6;
}
.tagprops {
  top: 79px;
  left: 1120px;
  width: 90%;
  height: auto;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 26px;
  opacity: 1;
  margin: 5%;
  padding: 0px 20px 20px;
}
.tagprops h4 {
  align-self: center;
  text-align: center;
}
.tagname {
  top: 134px;
  left: 1134px;
  /* width: 202px; */
  height: 29px;
  background: #f1f5f8 0% 0% no-repeat padding-box;
  border-radius: 15px;
  opacity: 1;
  padding: 0;
  padding-left: 10%;
}
.tagcolor {
  top: 175px;
  left: 1134px;
  /* width: 202px; */
  height: 29px;
  background: #f1f5f8 0% 0% no-repeat padding-box;
  border-radius: 15px;
  opacity: 1;
}
.tagfont {
  top: 216px;
  left: 1134px;
  /* width: 202px; */
  height: 29px;
  background: #f1f5f8 0% 0% no-repeat padding-box;
  border-radius: 15px;
  opacity: 1;
}
.tagprops input {
  margin-bottom: 5%;
  padding-left: 15px;
}
.level {
  min-height: 100px;
  width: auto;
  margin: 2%;
  /* border: 1px solid #000; */
  /* webkit-box-shadow: 0px 0px 4px #00000029; */
  box-shadow: 0px 0px 4px #00000029;
  padding-top: 1%;
  padding-bottom: 1%;
  background-color: #f7f7f7;
}
.button {
  top: 102px;
  left: 318px;
  width: 60px;
  height: 50px;
  background: #1f66e1 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
  text-align: center;
  position: absolute;
}
.button1 {
  top: 102px;
  left: 510px;
  width: 60px;
  height: 50px;
  background: #1eaae1 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
  text-align: center;
  position: absolute;
}
.button2 {
  top: 233px;
  left: 510px;
  width: 60px;
  height: 50px;
  background: #e1531e 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
  text-align: center;
  position: absolute;
}
.button3 {
  top: 509px;
  left: 510px;
  width: 60px;
  height: 50px;
  background: #1f66e1 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
  text-align: center;
  position: absolute;
}
.button4 {
  top: 508px;
  left: 911px;
  width: 60px;
  height: 50px;
  background: #007b00 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
  text-align: center;
  position: absolute;
}
.button5 {
  top: 233px;
  left: 510px;
  width: 60px;
  height: 50px;
  background: #e1531e 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
  text-align: center;
  position: absolute;
}
.button6 {
  top: 233px;
  left: 510px;
  width: 60px;
  height: 50px;
  background: #e1531e 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
  text-align: center;
  position: absolute;
}
.button7 {
  top: 233px;
  left: 510px;
  width: 60px;
  height: 50px;
  background: #e1531e 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
  text-align: center;
  position: absolute;
}
.buttonname {
  /* top: 129px; */
  /* left: 340px; */
  /* width: 36px; */
  width: 100%;
  height: 50%;
  /* text-align: left; */
  font: Regular 12px/16px Segoe UI;
  letter-spacing: 0;
  color: #ffffff;
  opacity: 1;
  /* text-align: center; */
  font-size: small;
}
.symbols {
  /* background-color: lightskyblue; */
  height: 90%;
  margin: 5%;
  width: 90%;
}
.symbols div > div {
  width: 50%;
  height: auto;
}
.symbols div {
  height: 35px;
  width: auto;
  text-align: center;
  /**/
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 4px #00000029;
  border-radius: 19px;
  margin: inherit;
  text-align: left;
  padding: 0%;
  padding-left: 10%;
  padding-top: 1%;
}
.symbols2 {
  /* background-color: lightskyblue; */
  height: 90%;
  margin: 5%;
  width: 90%;
  /**/
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 4px #00000029;
  border-radius: 19px;
}
.symbols2 div > div {
  width: 50%;
  height: auto;
  padding: 5%;
}
.symbols2 div {
  height: 20%;
  width: auto;
  text-align: center;
  margin-bottom: -2.5%;
}
.save_node_button {
  font-size: 14px;
  color: #fff;
  background: #273679;
  border: solid 1px #273679;
  padding: 6px 15px;
  font-weight: 400;
  line-height: 20px;
  /* display: inline-block; */
  border-radius: 4px;
  cursor: pointer;
  float: right;
}
.delete_node_button {
  font-size: 14px;
  color: #fff;
  background: #f23d3d;
  border: solid 1px #f23d3d;
  padding: 6px 15px;
  font-weight: 400;
  line-height: 20px;
  /* display: inline-block; */
  border-radius: 4px;
  cursor: pointer;
  float: left;
}
/* .form-control{
    border-radius: 30px;
} */

.switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
  margin-left: 10px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 12px;
  width: 12px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
  border-radius: 20px;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
  border-radius: 20px;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(17px);
}
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>