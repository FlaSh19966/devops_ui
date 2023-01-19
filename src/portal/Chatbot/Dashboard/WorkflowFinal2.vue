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
                                    <div id="Button" draggable="true" @dragstart="startdrag" class="form-control">
                                        <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="10.399" 
                                        height="10.833" 
                                        style="fill:#979797;margin-right:5%"
                                        viewBox="0 0 10.399 10.833">
                                            <g transform="translate(-506.513 -407)">
                                                <g transform="translate(506.513 407)">
                                                    <path class="a" d="M124.406,197c.029.01.058.022.088.029a1.2,1.2,0,0,1-.258,2.379q-4,0-8,0a1.2,1.2,0,0,1-.258-2.379c.03-.007.059-.019.088-.029Z" transform="translate(-115.035 -197)"/>
                                                    <path class="a" d="M116.011,510.373a1.367,1.367,0,0,1-.68-.363,1.2,1.2,0,0,1,.8-2.042c.054,0,.108,0,.162,0q3.893,0,7.785,0a1.217,1.217,0,0,1,1.156.637,1.2,1.2,0,0,1-.791,1.746c-.03.007-.058.019-.087.029Z" transform="translate(-114.981 -499.54)"/><path class="a" d="M120.3,355c-1.322,0-2.644,0-3.965,0a1.2,1.2,0,0,1-.111-2.4c.049,0,.1,0,.149,0h7.863a1.2,1.2,0,0,1,.138,2.4c-.373.019-.749.007-1.123.007Z" transform="translate(-115.099 -348.381)"/>
                                                </g>
                                            </g>
                                        </svg>
                                        Button
                                    </div>
                                    <div id="Text_Box" draggable="true" @dragstart="startdrag" class="form-control" title="Text Box">
                                        <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="13.169" 
                                        height="10.06" 
                                        style="fill:#979797;"
                                        viewBox="0 0 13.169 10.06">
                                            <g transform="translate(120 2)">
                                                <g transform="translate(-120 -2)">
                                                    <path class="a" d="M85.044,240.849H82.613c-.275,0-.386-.1-.385-.375.006-1.587-.029-3.175.019-4.761a7.627,7.627,0,0,1,.413-2.357,3.71,3.71,0,0,1,3.079-2.5,4.567,4.567,0,0,1,.855-.066c.231,0,.344.107.345.336q.005.786,0,1.573a.306.306,0,0,1-.289.337,1.34,1.34,0,0,0-1.4,1.321,7.624,7.624,0,0,0-.06,1.205c0,.128.079.122.165.122h2.126a.457.457,0,0,1,.214.029.334.334,0,0,1,.175.34q0,1.551,0,3.1,0,.641,0,1.281c0,.32-.093.411-.419.411h-2.4Z" transform="translate(-82.221 -230.79)"/>
                                                    <path class="a" d="M340.8,237.753c.014-.677-.03-1.517.033-2.356a8.181,8.181,0,0,1,.337-1.872,3.724,3.724,0,0,1,2.969-2.65,4.538,4.538,0,0,1,1.027-.1.305.305,0,0,1,.347.338q.007.786,0,1.572a.311.311,0,0,1-.337.337,1.25,1.25,0,0,0-1.3,1.034,5.572,5.572,0,0,0-.12,1.5c0,.12.085.109.163.109h2.155c.248,0,.357.107.358.354,0,.611,0,1.223,0,1.834q0,1.288,0,2.577c0,.3-.1.4-.4.4H341.2c-.3,0-.4-.1-.4-.4C340.8,239.594,340.8,238.755,340.8,237.753Z" transform="translate(-333.266 -230.777)"/>
                                                </g>
                                            </g>
                                        </svg>
                                        Text Box
                                    </div>
                                    <div id="Textarea" draggable="true" @dragstart="startdrag" class="form-control" title="Textarea">
                                        <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="14.839" 
                                        height="14.323" 
                                        style="fill:#979797;"
                                        viewBox="0 0 14.839 14.323">
                                            <g transform="translate(175.699 113.805)">
                                                <path class="a" d="M18.839-55.567H8.568a.193.193,0,0,1-.174-.059.175.175,0,0,1-.034-.193.174.174,0,0,1,.165-.1c.115,0,.23,0,.346,0H19.194v.1q0,5.411,0,10.822a.187.187,0,0,1-.177.214c-.109,0-.179-.083-.179-.213q0-2.44,0-4.88,0-2.256,0-4.512,0-.542,0-1.084Z" transform="translate(-181.214 -56.991)"/>
                                                <path class="a" d="M-101.054,43.377h10.2c.131,0,.2.064.2.177s-.078.178-.205.178h-10.558c0-.03-.005-.054,0-.079,0-.458,0-.917,0-1.375q0-1.837,0-3.674,0-2.375,0-4.75c0-.371,0-.742,0-1.113a.174.174,0,0,1,.225-.186.185.185,0,0,1,.133.192q0,1.975,0,3.95,0,2.617,0,5.234,0,.687,0,1.375C-101.057,43.325-101.055,43.346-101.054,43.377Z" transform="translate(-73.142 -144.104)"/>
                                                <path class="a" d="M-175.127-112.766a2.208,2.208,0,0,1,.3.169.527.527,0,0,1,.143.6.533.533,0,0,1-.541.325.521.521,0,0,1-.456-.386,1.081,1.081,0,0,1,.021-.494,2.727,2.727,0,0,1,.424-1.02,1.155,1.155,0,0,1,.158-.176.2.2,0,0,1,.235-.032c.081.04.081.115.076.192a.923.923,0,0,1-.135.371C-174.979-113.064-175.055-112.908-175.127-112.766Z" transform="translate(0 0)"/>
                                                <path class="a" d="M617.488,679.933a.582.582,0,0,1-.394-.224.529.529,0,1,1,.95-.271,2.688,2.688,0,0,1-.485,1.355.9.9,0,0,1-.147.156.194.194,0,0,1-.229.022c-.074-.038-.075-.108-.072-.18a.865.865,0,0,1,.127-.366C617.321,680.265,617.4,680.1,617.488,679.933Z" transform="translate(-780.502 -780.481)"/>
                                                <path class="a" d="M721.452,679.936a.587.587,0,0,1-.389-.218.529.529,0,0,1,.6-.82.526.526,0,0,1,.341.551,2.694,2.694,0,0,1-.465,1.323.958.958,0,0,1-.159.175.2.2,0,0,1-.235.027c-.075-.043-.076-.114-.071-.188a.913.913,0,0,1,.134-.371C721.29,680.259,721.368,680.1,721.452,679.936Z" transform="translate(-882.868 -780.484)"/>
                                                <path class="a" d="M-71.007-112.757a1.641,1.641,0,0,1,.278.14.514.514,0,0,1,.191.561.5.5,0,0,1-.41.38.523.523,0,0,1-.626-.516,2.6,2.6,0,0,1,.511-1.438.7.7,0,0,1,.131-.129.191.191,0,0,1,.217-.017c.074.037.078.105.076.178a.853.853,0,0,1-.125.366C-70.848-113.071-70.929-112.91-71.007-112.757Z" transform="translate(-102.525 -0.004)"/>
                                            </g>
                                        </svg>
                                        Textarea
                                    </div>
                                    <div id="Hyperlink" draggable="true" @dragstart="startdrag" class="form-control" title="Hyperlink">
                                        <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="15.629" 
                                        height="15.629" 
                                        style="fill:#979797;"
                                        viewBox="0 0 15.629 15.629">
                                            <g transform="translate(445 228)">
                                                <g transform="translate(-445 -228)">
                                                    <path class="a" d="M-162.923,91.849c.912-.912,1.82-1.827,2.736-2.734a1.736,1.736,0,0,1,2.872.7c.018.054.032.109.048.167a1.178,1.178,0,0,0,.71-.334c.2-.193.39-.391.587-.584a.068.068,0,0,0,.016-.094c-.081-.145-.152-.3-.243-.436a3.312,3.312,0,0,0-5.122-.517q-1.849,1.842-3.691,3.69a3.273,3.273,0,0,0-.93,1.752c-.024.13-.04.261-.059.392v.438c.02.133.035.267.061.4a3.3,3.3,0,0,0,2.878,2.673.546.546,0,0,1,.122.022h.5a.052.052,0,0,1,.037-.015,3.225,3.225,0,0,0,2.035-.94q1.879-1.867,3.747-3.745c.049-.048.094-.1.156-.167l-.083.017a3.793,3.793,0,0,1-1.968-.068.138.138,0,0,0-.161.043q-1.388,1.392-2.779,2.78a1.662,1.662,0,0,1-1.529.49,1.644,1.644,0,0,1-1.358-1.181,1.671,1.671,0,0,1,.437-1.769C-163.579,92.5-163.249,92.175-162.923,91.849Z" transform="translate(166 -81.754)"/>
                                                    <path class="a" d="M200.484-247.468c-.02.133-.036.267-.061.4a3.24,3.24,0,0,1-.912,1.727q-1.858,1.86-3.719,3.718a3.311,3.311,0,0,1-5.114-.533c-.09-.136-.158-.287-.239-.429a.071.071,0,0,1,.02-.1c.191-.188.379-.379.57-.568a1.161,1.161,0,0,1,.722-.344c.008.025.016.052.024.078a1.735,1.735,0,0,0,2.9.786q1.752-1.74,3.492-3.492a3.574,3.574,0,0,0,.46-.518,1.731,1.731,0,0,0-1.239-2.665,1.69,1.69,0,0,0-1.452.5q-1.392,1.387-2.778,2.78a.145.145,0,0,1-.168.046,3.883,3.883,0,0,0-2.049-.044c.027-.032.043-.053.061-.071q.628-.632,1.256-1.263c.839-.84,1.682-1.677,2.518-2.52a3.341,3.341,0,0,1,1.8-.966c.125-.023.252-.037.378-.056h.438c.121.017.243.03.362.052a3.294,3.294,0,0,1,2.673,2.651c.026.129.04.261.059.392Z" transform="translate(-184.855 251)"/>
                                                </g>
                                            </g>
                                        </svg>
                                        Hyperlink
                                    </div>
                                    <div id="Check_Box" draggable="true" @dragstart="startdrag" class="form-control" title="Button">
                                        <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="14.611" 
                                        height="12.369"
                                        style="fill:#979797;" 
                                        viewBox="0 0 14.611 12.369">
                                            <g transform="translate(188 -107)">
                                                <g transform="translate(-188 107)">
                                                    <path class="a" d="M231.954,174.87c.355-.357.686-.692,1.018-1.024l4.6-4.6a.714.714,0,0,1,1.135,0c.283.282.567.562.847.847a.7.7,0,0,1,0,1.1q-2.637,2.641-5.278,5.279l-1.748,1.749a.709.709,0,0,1-1.136.005l-3.649-3.649a.7.7,0,0,1-.009-1.114q.443-.448.891-.891a.7.7,0,0,1,1.058.008q1.071,1.069,2.139,2.14C231.868,174.758,231.9,174.805,231.954,174.87Z" transform="translate(-225.218 -168.389)"/>
                                                    <path class="a" d="M160.269,150.362h3.64a2.424,2.424,0,0,1,1,.2.283.283,0,0,1,.1.5,4.921,4.921,0,0,1-.4.4.4.4,0,0,1-.247.084c-.3-.009-.59-.054-.885-.055q-3.394-.007-6.788,0a1.386,1.386,0,0,0-1.461,1.454q-.006,3.624,0,7.249a1.38,1.38,0,0,0,1.4,1.4c1.28.005,2.56,0,3.84,0,1.152,0,2.3,0,3.455,0a1.382,1.382,0,0,0,1.4-1.226,6.986,6.986,0,0,0,.013-.782c0-.522-.005-1.044.006-1.566a.483.483,0,0,1,.115-.282c.157-.181.337-.343.506-.515a.276.276,0,0,1,.321-.075.269.269,0,0,1,.179.276c-.006,1.008.017,2.018-.024,3.024a2.461,2.461,0,0,1-2.162,2.245c-.462.042-.93.03-1.4.031q-3.125,0-6.251,0a2.508,2.508,0,0,1-2.389-1.7,2.772,2.772,0,0,1-.138-.842q-.016-3.655,0-7.31a2.5,2.5,0,0,1,2.408-2.5c.91-.029,1.822-.008,2.733-.009Z" transform="translate(-154.095 -150.356)"/>
                                                </g>
                                            </g>
                                        </svg>
                                        Check Box
                                    </div>
                                    <div id="Radio_Button" draggable="true" @dragstart="startdrag" class="form-control" title="Button">
                                        <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="16.122" 
                                        height="16.12" 
                                        style="fill:#979797;"
                                        viewBox="0 0 16.122 16.12">
                                            <g transform="translate(-708.017 101.974)">
                                                <path class="a" d="M716.072-85.854a8.048,8.048,0,0,1-8.055-8.123,8.058,8.058,0,0,1,8.059-8,8.07,8.07,0,0,1,8.063,8.126A8.069,8.069,0,0,1,716.072-85.854ZM709.6-93.96a6.452,6.452,0,0,0,6.492,6.524,6.468,6.468,0,0,0,6.461-6.436,6.456,6.456,0,0,0-6.5-6.519A6.445,6.445,0,0,0,709.6-93.96Z" transform="translate(0)"/>
                                                <path class="a" d="M744.984-69.06A3.994,3.994,0,0,1,748.955-65a4,4,0,0,1-4.019,3.954,3.989,3.989,0,0,1-4-4.1A3.987,3.987,0,0,1,744.984-69.06Z" transform="translate(-28.869 -28.862)"/>
                                            </g>
                                        </svg>
                                        Radio Button
                                    </div>
                                    <div id="Dropdown" draggable="true" @dragstart="startdrag" class="form-control" title="Button">
                                        <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="13.011" 
                                        height="13.01" 
                                        style="fill:#979797;"
                                        viewBox="0 0 13.011 13.01">
                                            <g transform="translate(122 -226)">
                                                <g transform="translate(-122 226)">
                                                    <path class="a" d="M143.989,227.558q2.5,0,5.007,0a1.429,1.429,0,0,1,1.463,1.111,1.722,1.722,0,0,1,.042.4q0,4.988,0,9.975a1.432,1.432,0,0,1-1.118,1.478,2.1,2.1,0,0,1-.476.044q-4.911,0-9.822,0a1.464,1.464,0,0,1-1.553-1.125,1.678,1.678,0,0,1-.039-.38q0-5,0-9.995a1.435,1.435,0,0,1,1.127-1.472,2.007,2.007,0,0,1,.438-.035Q141.524,227.556,143.989,227.558Zm-5.044,6.494c0,1.6,0,3.21,0,4.814,0,.185.033.251.238.25q4.824-.011,9.648,0c.173,0,.227-.042.226-.222q-.008-4.833,0-9.667c0-.185-.06-.22-.229-.219q-4.824.007-9.648,0c-.182,0-.237.045-.236.232C138.949,230.842,138.945,232.447,138.945,234.052Z" transform="translate(-137.492 -227.557)"/>
                                                    <path class="a" d="M217.409,343.722l2.572-2.578.979.982-3.557,3.557-3.558-3.555.985-.987Z" transform="translate(-210.915 -336.783)"/>
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
                                    </div> -->
                                </div>
                            </div>
                            <div class="workflow">
                                <div class="headings">
                                    <h5>WORKFLOW</h5>
                                </div>
                                <div id="addworkflownode" style="width:100%;postion:relative;min-height:90%" >
                                    <div class="level" :id="levels[level].id" v-for="(level, indextest) in selectedlevellist" :key="indextest" @drop="completedrop" @dragover="handledrop">
                                        <div :id="levels[level].id+'inner'" v-if="level!=null" style="display: -webkit-inline-box;">Level No. {{levels[level].levelno}}
                                            <p :id="levels[level].id+'innerinner'" v-if="level!=0">&nbsp; From: {{levels[selectedlevellist[indextest-1]].buttons[levels[level].previousnodeindex-1].name}}</p>
                                            <p :id="levels[level].id+'innerinner'" v-else>&nbsp; Root </p>
                                        </div>
                                        <div :id="'level'+node.id" v-for="(node, index2) in levels[level].nodes" :key="index2">
                                            <div style="width:30%;margin:2%;background:darkblue;padding:10px;" class="form-control" v-if="node.nodetype=='Button'" :id="node.id" @dblclick="resetpath(index2,indextest)" @click="selectnode(index2,indextest)">
                                                <div v-if="node.id!=levels[selectedlevel].nodes[selectednode].id" :id="node.id+'inner'" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;text-align:center">
                                                    {{node.name}}
                                                </div>
                                                <div v-if="node.id==levels[selectedlevel].nodes[selectednode].id" :id="node.id+'inner'" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;text-align:center">
                                                    {{name}}
                                                </div>
                                            </div>
                                            <div style="width:auto;margin:2%;display:flex;padding-left:15px" class="form-control" v-if="node.nodetype=='Text Box'" :id="node.id" @click="selectnode(index2,indextest)">
                                                <div :id="node.id+'inner'" style="margin-right:5%" v-html="node.svg"></div>
                                                <div :id="levels[level].id+'inner1'" v-if="node.id!=levels[selectedlevel].nodes[selectednode].id">{{node.placeholder}}</div>
                                                <div :id="levels[level].id+'inner2'" v-if="selectedlevel!=null&&node.id==levels[selectedlevel].nodes[selectednode].id">{{name}}</div>
                                            </div>
                                            <div style="width:auto;margin:2%;display:flex;padding-left:15px" class="form-control" v-if="node.nodetype=='TextArea'" :id="node.id" @click="selectnode(index2,indextest)">
                                                <div :id="node.id+'inner'" style="margin-right:5%" v-html="node.svg"></div>
                                                <div :id="node.id+'inner1'" v-if="node.id!=levels[selectedlevel].nodes[selectednode].id">{{node.placeholder}}</div>
                                                <div :id="node.id+'inner2'" v-if="selectedlevel!=null&&node.id==levels[selectedlevel].nodes[selectednode].id">{{name}}</div>
                                            </div>
                                            <div style="width:auto;margin:2%;display:flex;padding-left:15px" class="form-control" v-if="node.nodetype=='Hyperlink'" :id="node.id" @click="selectnode(index2,indextest)">
                                                <div :id="node.id+'inner'" style="margin-right:5%" v-html="node.svg"></div>
                                                <div :id="node.id+'inner1'" v-if="node.hyperlink==null&&hyperlink==null">{{node.nodetype}}</div>
                                                <a :id="node.id+'inner2'" v-if="node.id!=levels[selectedlevel].nodes[selectednode].id" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;text-align: center;" :href="node.hyperlink">{{node.hyperlink}}</a>
                                                <a :id="node.id+'inner2'" v-if="node.id==levels[selectedlevel].nodes[selectednode].id" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;text-align: center;" :href="hyperlink">{{hyperlink}}</a>
                                            </div>
                                            <div :id="node.id+'innermessage'" style="margin-left: 2%;" v-if="node.id==levels[selectedlevel].nodes[selectednode].id&&node.nodetype=='Check Box'">
                                                {{message}}
                                            </div>
                                            <div style="width:auto;margin:2%;display:flex;padding-left:15px" class="form-control" v-if="node.nodetype=='Check Box'" :id="node.id" @click="selectnode(index2,indextest)">
                                                <div :id="node.id+'inner'" style="display: flex;width: -webkit-fill-available;" v-if="node.id!=levels[selectedlevel].nodes[selectednode].id">
                                                    <div :id="node.id+'innerinner1'" style="margin-right:5%" v-html="node.svg"></div>
                                                    <div :id="node.id+'innerinner2'" style="padding-right: inherit;">{{node.nodetype}}</div>
                                                </div>
                                                <div :id="node.id+'inner1'" style="width: 100%;" v-if="node.id==levels[selectedlevel].nodes[selectednode].id">
                                                    <div :id="node.id+'innerinner1'" style="display:flex" v-for="(val,valindex) in value" :key="valindex">
                                                        <div :id="node.id+'innerinnerinner1'" style="margin-right:2%;width: 5%;" v-html="node.svg"></div>
                                                        <div :id="node.id+'innerinnerinner2'" style="width: 95%;">
                                                            {{val}}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div :id="node.id+'innermessage'" style="margin-left: 2%;" v-if="node.id==levels[selectedlevel].nodes[selectednode].id&&node.nodetype=='Radio Button'">
                                                {{message}}
                                            </div>
                                            <div style="width:auto;margin:2%;display:flex;padding-left:15px" class="form-control" v-if="node.nodetype=='Radio Button'" :id="node.id" @click="selectnode(index2,indextest)">
                                                <div :id="node.id+'inner'" style="display: flex;width: -webkit-fill-available;" v-if="node.id!=levels[selectedlevel].nodes[selectednode].id">
                                                    <div style="margin-right:5%" v-html="node.svg"></div>
                                                    <div style="padding-right: inherit;">{{node.nodetype}}</div>
                                                </div>
                                                <div :id="node.id+'inner1'" style="width: 100%;" v-if="node.id==levels[selectedlevel].nodes[selectednode].id">
                                                    <div style="display:flex" v-for="(val,valindex) in value" :key="valindex">
                                                        <div style="margin-right:2%;width: 5%;" v-html="node.svg"></div>
                                                        <div style="width: 95%;">
                                                            {{val}}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style="width:auto;margin:2%;display:flex;padding-left:15px" class="form-control" v-if="node.nodetype=='Dropdown'&&node.id!=levels[selectedlevel].nodes[selectednode].id" :id="node.id" @click="selectnode(index2,indextest)">
                                                <div style="display: flex;width: -webkit-fill-available;" v-if="node.id!=levels[selectedlevel].nodes[selectednode].id">
                                                    <div style="margin-right:5%" v-html="node.svg"></div>
                                                    <div style="padding-right: inherit;">{{node.nodetype}}</div>
                                                </div>
                                            </div>
                                            <div style="width:auto;margin:2%;display:flex;" class="input-group mb-3"  v-if="node.id==levels[selectedlevel].nodes[selectednode].id&&node.nodetype=='Dropdown'">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1" v-html="node.svg"></span>
                                                </div>
                                                <select style="width: 90%;display: flex;padding-left: 15px;" class="form-control" id="select_role_name">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="basic-addon1">@</span>
                                                    </div>
                                                    <option v-if="message!=null" >{{message}}</option>
                                                    <option v-if="message==null" >Enter Message Here</option>
                                                    <option v-for="(val,valindex) in value" :key="valindex">{{val}}</option>
                                                </select>
                                            </div>
                                            <div style="width:auto;margin:2%;display:flex;padding-left:15px" class="form-control" v-if="node.nodetype=='File Upload'" :id="node.id" @click="selectnode(index2,indextest)">
                                                <div style="margin-right:5%" v-html="node.svg"></div>
                                                <div>{{node.nodetype}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="setting">
                                <div class="headings">
                                    <h5>SETTING</h5>
                                </div>
                                <div style="height:90%">
                                    <div v-if="selected!=null" class="tagprops">
                                        <h4>Level No. {{levels[selectedlevel].levelno}}</h4>
                                        <div v-if="levels[selectedlevel].nodes[selectednode].nodetype=='Button'">
                                            Button Name
                                            <input type="text" class="tagname form-control" placeholder="Enter button name" v-model="name" v-on:keyup="saveval">
                                        </div>
                                        <div v-if="levels[selectedlevel].nodes[selectednode].nodetype=='Text Box'">
                                            Placeholder
                                            <input type="text" class="tagname form-control" placeholder="Enter display message" v-model="name" v-on:keyup="saveval">                                        
                                        </div>
                                        <div v-if="levels[selectedlevel].nodes[selectednode].nodetype=='TextArea'">
                                            Placeholder
                                            <input type="text" class="tagname form-control" placeholder="Enter display message" v-model="name" v-on:keyup="saveval">
                                        </div>
                                        <div v-if="levels[selectedlevel].nodes[selectednode].nodetype=='Hyperlink'">
                                            Link
                                            <input type="text" class="tagname form-control" placeholder="Enter link" v-model="hyperlink" v-on:keyup="saveval">    
                                        </div>
                                        <div v-if="levels[selectedlevel].nodes[selectednode].nodetype=='Check Box'">
                                            Check Box Message
                                            <input type="text" class="tagname form-control" placeholder="Checkbox message" v-model="message">
                                            CheckBox Values
                                            <button class="save_node_button" @click="andvalue" style="height: 29px;padding-top: 0px;padding-left: 10px;padding-right: 10px;padding-bottom: 0px;">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13.997" viewBox="0 0 14 13.997" >
                                                    <path id="Union_13" data-name="Union 13" d="M-12684,2058v-5h-5a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5v-5a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5h5a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5v5a1,1,0,0,1-1,1A1,1,0,0,1-12684,2058Z" transform="translate(12690.001 -2045.002)" fill="#fff" />
                                                </svg>
                                            </button>
                                            <div style="display: flex;margin-top: 5%;" v-for="(checkbox,index) in levels[selectedlevel].nodes[selectednode].values" :key="index">
                                                <input style="width: 75%;margin-right: 5%;margin-bottom: 0" type="text" class="tagname form-control" placeholder="Value" v-model="value[index]">
                                                <button class="save_node_button" style="height: 29px;padding-top: 0px;padding-left: 10px;padding-right: 10px;padding-bottom: 0px;background: #F23D3D;border: solid 1px #F23D3D;" @click="deletevalue(index)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
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
                                        <div v-if="levels[selectedlevel].nodes[selectednode].nodetype=='Radio Button'">
                                            Display Message
                                            <input type="text" class="tagname form-control" placeholder="Enter display message" v-model="message">
                                            RadioButton Values
                                            <button class="save_node_button" @click="andvalue" style="height: 29px;padding-top: 0px;padding-left: 10px;padding-right: 10px;padding-bottom: 0px;">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13.997" viewBox="0 0 14 13.997" >
                                                    <path id="Union_13" data-name="Union 13" d="M-12684,2058v-5h-5a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5v-5a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5h5a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5v5a1,1,0,0,1-1,1A1,1,0,0,1-12684,2058Z" transform="translate(12690.001 -2045.002)" fill="#fff" />
                                                </svg>
                                            </button>
                                            <div style="display: flex;margin-top: 5%;" v-for="(checkbox,index) in levels[selectedlevel].nodes[selectednode].values" :key="index">
                                                <input style="width: 75%;margin-right: 5%;margin-bottom: 0" type="text" class="tagname form-control" placeholder="Value" v-model="value[index]">
                                                <button class="save_node_button" style="height: 29px;padding-top: 0px;padding-left: 10px;padding-right: 10px;padding-bottom: 0px;background: #F23D3D;border: solid 1px #F23D3D;" @click="deletevalue(index)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
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
                                        <div v-if="levels[selectedlevel].nodes[selectednode].nodetype=='Dropdown'">
                                            <div>
                                                Display Message 
                                            </div>
                                            <input type="text" class="tagname form-control" placeholder="Enter display message" v-model="message">
                                            Dropdown Values
                                            <button class="save_node_button" @click="andvalue" style="height: 29px;padding-top: 0px;padding-left: 10px;padding-right: 10px;padding-bottom: 0px;">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13.997" viewBox="0 0 14 13.997" >
                                                    <path id="Union_13" data-name="Union 13" d="M-12684,2058v-5h-5a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5v-5a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5h5a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5v5a1,1,0,0,1-1,1A1,1,0,0,1-12684,2058Z" transform="translate(12690.001 -2045.002)" fill="#fff" />
                                                </svg>
                                            </button>
                                            <div style="display: flex;margin-top: 5%;" v-for="(checkbox,index) in levels[selectedlevel].nodes[selectednode].values" :key="index">
                                                <input style="width: 75%;margin-right: 5%;margin-bottom: 0" type="text" class="tagname form-control" placeholder="Value" v-model="value[index]">
                                                <button class="save_node_button" style="height: 29px;padding-top: 0px;padding-left: 10px;padding-right: 10px;padding-bottom: 0px;background: #F23D3D;border: solid 1px #F23D3D;" @click="deletevalue(index)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
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
                                        <div v-if="levels[selectedlevel].nodes[selectednode].nodetype=='File Upload'">
                                            Display Message
                                            <input type="text" class="tagname form-control" placeholder="Enter Message Here" v-model="message">
                                        </div>
                                        <div style="height: 30px;margin: inherit;">
                                            <button type="submit" class="delete_node_button" @click="deletenode">Delete</button>
                                            <button type="submit" class="save_node_button" @click="savenodevalue">Save</button>
                                        </div>
                                    </div>
                                    <div v-if="selected==null">
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
import Vue from 'vue';
import Swal from "sweetalert2";
export default {
    name: "Workflow",
    data(){
        return {
            companyid: "",
            location: "",
            company_name: "",
            company_id: "",
            levels:[],
            maxid:0,
            selectednode:null,
            selectedlevel:null,
            selectedlevellist:[],
            // selectednodetitle:null,
            name:null,
            message:null,
            hyperlink:null,
            value:[],
            testhyperlink:/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
            // testhyperlink:/\b((http|https):\/\/?)[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))/,
            selected:null,
        };
    },
    created(){
        this.levels.push({
            levelno:0,
            id:1,
            nodes:[],
            buttoncount:0,
            buttons:[],
        });
        this.selectedlevellist.push(0);
        this.maxid=1;
    },
    mounted() {
        $(".dropdown-toggle").dropdown();
    },
    methods:{
        startdrag(ev){
            ev.dataTransfer.setData("text", ev.target.id);
        },
        completedrop(ev){
            var checkid=null;
            console.log(ev.target.id);
            if(isNaN(Number(ev.target.id))||ev.target.id==null){
                console.log('getparent');
                checkid=document.getElementById(ev.target.id).parentNode.id;
                if(isNaN(Number(checkid))){
                    console.log('getparentagain');
                    checkid=document.getElementById(checkid).parentNode.id
                    if(isNaN(Number(checkid))){
                        console.log('getparentagainandagain');
                        checkid=document.getElementById(checkid).parentNode.id
                    }
                }
            } else {
                checkid=ev.target.id;
            }
            var droplevelindex=null;
            for(let i=0;i<this.levels.length;i++){
                if(checkid==this.levels[i].id){
                    droplevelindex=i;
                }
            }
            ev.preventDefault();
            var data = ev.dataTransfer.getData("text");
            // if(){
            //     this.createnode(data,droplevelindex);
            // }
            this.createnode(data,droplevelindex);
            // $("#1").sortable();
        },
        handledrop(ev){
            ev.preventDefault();
        },
        createnode(id,i){
            // isNaN(Number(x))
            if(id=='Button'){
                this.levels[i].nodes.push({
                    id:id+this.maxid+this.levels[i].nodes.length,
                    nodetype:'Button',
                    name:'Button'+(this.levels[i].buttoncount+1),
                    followinglevelid:null,
                    svg:'<svg xmlns="http://www.w3.org/2000/svg" width="10.399" height="10.833" style="fill:#979797;margin-right:5%" viewBox="0 0 10.399 10.833"> <g transform="translate(-506.513 -407)"> <g transform="translate(506.513 407)"> <path class="a" d="M124.406,197c.029.01.058.022.088.029a1.2,1.2,0,0,1-.258,2.379q-4,0-8,0a1.2,1.2,0,0,1-.258-2.379c.03-.007.059-.019.088-.029Z" transform="translate(-115.035 -197)"/> <path class="a" d="M116.011,510.373a1.367,1.367,0,0,1-.68-.363,1.2,1.2,0,0,1,.8-2.042c.054,0,.108,0,.162,0q3.893,0,7.785,0a1.217,1.217,0,0,1,1.156.637,1.2,1.2,0,0,1-.791,1.746c-.03.007-.058.019-.087.029Z" transform="translate(-114.981 -499.54)"/><path class="a" d="M120.3,355c-1.322,0-2.644,0-3.965,0a1.2,1.2,0,0,1-.111-2.4c.049,0,.1,0,.149,0h7.863a1.2,1.2,0,0,1,.138,2.4c-.373.019-.749.007-1.123.007Z" transform="translate(-115.099 -348.381)"/> </g> </g> </svg>',
                    buttonindex:this.levels[i].buttoncount,
                });
                this.levels[i].buttons.push({
                    id:id+this.maxid+this.levels[i].nodes.length,
                    nodetype:'Button',
                    name:'Button'+(this.levels[i].buttoncount+1),
                    followinglevelid:null,
                    svg:'<svg xmlns="http://www.w3.org/2000/svg" width="10.399" height="10.833" viewBox="0 0 10.399 10.833"><defs><style>.f{fill:#fff;}</style></defs><g transform="translate(-506.513 -407)"><g transform="translate(506.513 407)"><path class="a" d="M124.406,197c.029.01.058.022.088.029a1.2,1.2,0,0,1-.258,2.379q-4,0-8,0a1.2,1.2,0,0,1-.258-2.379c.03-.007.059-.019.088-.029Z" transform="translate(-115.035 -197)"/><path class="a" d="M116.011,510.373a1.367,1.367,0,0,1-.68-.363,1.2,1.2,0,0,1,.8-2.042c.054,0,.108,0,.162,0q3.893,0,7.785,0a1.217,1.217,0,0,1,1.156.637,1.2,1.2,0,0,1-.791,1.746c-.03.007-.058.019-.087.029Z" transform="translate(-114.981 -499.54)"/><path class="a" d="M120.3,355c-1.322,0-2.644,0-3.965,0a1.2,1.2,0,0,1-.111-2.4c.049,0,.1,0,.149,0h7.863a1.2,1.2,0,0,1,.138,2.4c-.373.019-.749.007-1.123.007Z" transform="translate(-115.099 -348.381)"/></g></g></svg>',
                    nodeindex:null,
                });
                this.levels[i].buttoncount=this.levels[i].buttoncount+1;
                this.levels[i].buttons[this.levels[i].buttoncount-1].nodeindex=this.levels[i].nodes.length-1;
                this.createlevel(i);
            } else if(id=='Text_Box'){
                this.levels[i].nodes.push({
                    id:id+this.maxid+this.levels[i].nodes.length,
                    nodetype:'Text Box',
                    placeholder:'Enter Placeholder',
                    svg:'<svg xmlns="http://www.w3.org/2000/svg" width="13.169" height="10.06" style="fill:#979797;" viewBox="0 0 13.169 10.06"> <g transform="translate(120 2)"> <g transform="translate(-120 -2)"> <path class="a" d="M85.044,240.849H82.613c-.275,0-.386-.1-.385-.375.006-1.587-.029-3.175.019-4.761a7.627,7.627,0,0,1,.413-2.357,3.71,3.71,0,0,1,3.079-2.5,4.567,4.567,0,0,1,.855-.066c.231,0,.344.107.345.336q.005.786,0,1.573a.306.306,0,0,1-.289.337,1.34,1.34,0,0,0-1.4,1.321,7.624,7.624,0,0,0-.06,1.205c0,.128.079.122.165.122h2.126a.457.457,0,0,1,.214.029.334.334,0,0,1,.175.34q0,1.551,0,3.1,0,.641,0,1.281c0,.32-.093.411-.419.411h-2.4Z" transform="translate(-82.221 -230.79)"/> <path class="a" d="M340.8,237.753c.014-.677-.03-1.517.033-2.356a8.181,8.181,0,0,1,.337-1.872,3.724,3.724,0,0,1,2.969-2.65,4.538,4.538,0,0,1,1.027-.1.305.305,0,0,1,.347.338q.007.786,0,1.572a.311.311,0,0,1-.337.337,1.25,1.25,0,0,0-1.3,1.034,5.572,5.572,0,0,0-.12,1.5c0,.12.085.109.163.109h2.155c.248,0,.357.107.358.354,0,.611,0,1.223,0,1.834q0,1.288,0,2.577c0,.3-.1.4-.4.4H341.2c-.3,0-.4-.1-.4-.4C340.8,239.594,340.8,238.755,340.8,237.753Z" transform="translate(-333.266 -230.777)"/> </g> </g> </svg>',
                });
            } else if(id=='Textarea'){
                this.levels[i].nodes.push({
                    id:id+this.maxid+this.levels[i].nodes.length,
                    nodetype:'TextArea',
                    placeholder:'Enter Placeholder',
                    svg:'<svg xmlns="http://www.w3.org/2000/svg" width="14.839" height="14.323" viewBox="0 0 14.839 14.323"><defs><svg:style>.f{fill:#fff;}</svg:style></defs><g transform="translate(175.699 113.805)"><path a" d="M18.839-55.567H8.568a.193.193,0,0,1-.174-.059.175.175,0,0,1-.034-.193.174.174,0,0,1,.165-.1c.115,0,.23,0,.346,0H19.194v.1q0,5.411,0,10.822a.187.187,0,0,1-.177.214c-.109,0-.179-.083-.179-.213q0-2.44,0-4.88,0-2.256,0-4.512,0-.542,0-1.084Z" transform="translate(-181.214 -56.991)"/><path class="a" d="M-101.054,43.377h10.2c.131,0,.2.064.2.177s-.078.178-.205.178h-10.558c0-.03-.005-.054,0-.079,0-.458,0-.917,0-1.375q0-1.837,0-3.674,0-2.375,0-4.75c0-.371,0-.742,0-1.113a.174.174,0,0,1,.225-.186.185.185,0,0,1,.133.192q0,1.975,0,3.95,0,2.617,0,5.234,0,.687,0,1.375C-101.057,43.325-101.055,43.346-101.054,43.377Z" transform="translate(-73.142 -144.104)"/><path class="a" d="M-175.127-112.766a2.208,2.208,0,0,1,.3.169.527.527,0,0,1,.143.6.533.533,0,0,1-.541.325.521.521,0,0,1-.456-.386,1.081,1.081,0,0,1,.021-.494,2.727,2.727,0,0,1,.424-1.02,1.155,1.155,0,0,1,.158-.176.2.2,0,0,1,.235-.032c.081.04.081.115.076.192a.923.923,0,0,1-.135.371C-174.979-113.064-175.055-112.908-175.127-112.766Z" transform="translate(0 0)"/><path class="a" d="M617.488,679.933a.582.582,0,0,1-.394-.224.529.529,0,1,1,.95-.271,2.688,2.688,0,0,1-.485,1.355.9.9,0,0,1-.147.156.194.194,0,0,1-.229.022c-.074-.038-.075-.108-.072-.18a.865.865,0,0,1,.127-.366C617.321,680.265,617.4,680.1,617.488,679.933Z" transform="translate(-780.502 -780.481)"/><path class="a" d="M721.452,679.936a.587.587,0,0,1-.389-.218.529.529,0,0,1,.6-.82.526.526,0,0,1,.341.551,2.694,2.694,0,0,1-.465,1.323.958.958,0,0,1-.159.175.2.2,0,0,1-.235.027c-.075-.043-.076-.114-.071-.188a.913.913,0,0,1,.134-.371C721.29,680.259,721.368,680.1,721.452,679.936Z" transform="translate(-882.868 -780.484)"/><path class="a" d="M-71.007-112.757a1.641,1.641,0,0,1,.278.14.514.514,0,0,1,.191.561.5.5,0,0,1-.41.38.523.523,0,0,1-.626-.516,2.6,2.6,0,0,1,.511-1.438.7.7,0,0,1,.131-.129.191.191,0,0,1,.217-.017c.074.037.078.105.076.178a.853.853,0,0,1-.125.366C-70.848-113.071-70.929-112.91-71.007-112.757Z" transform="translate(-102.525 -0.004)"/></g></svg>',
                });
            } else if(id=='Hyperlink'){
                this.levels[i].nodes.push({
                    id:id+this.maxid+this.levels[i].nodes.length,
                    nodetype:'Hyperlink',
                    hyperlink:null,
                    message:null,
                    svg:'<svg xmlns="http://www.w3.org/2000/svg" width="15.629" height="15.629" style="fill:#979797;"viewBox="0 0 15.629 15.629"> <g transform="translate(445 228)"> <g transform="translate(-445 -228)"> <path class="a" d="M-162.923,91.849c.912-.912,1.82-1.827,2.736-2.734a1.736,1.736,0,0,1,2.872.7c.018.054.032.109.048.167a1.178,1.178,0,0,0,.71-.334c.2-.193.39-.391.587-.584a.068.068,0,0,0,.016-.094c-.081-.145-.152-.3-.243-.436a3.312,3.312,0,0,0-5.122-.517q-1.849,1.842-3.691,3.69a3.273,3.273,0,0,0-.93,1.752c-.024.13-.04.261-.059.392v.438c.02.133.035.267.061.4a3.3,3.3,0,0,0,2.878,2.673.546.546,0,0,1,.122.022h.5a.052.052,0,0,1,.037-.015,3.225,3.225,0,0,0,2.035-.94q1.879-1.867,3.747-3.745c.049-.048.094-.1.156-.167l-.083.017a3.793,3.793,0,0,1-1.968-.068.138.138,0,0,0-.161.043q-1.388,1.392-2.779,2.78a1.662,1.662,0,0,1-1.529.49,1.644,1.644,0,0,1-1.358-1.181,1.671,1.671,0,0,1,.437-1.769C-163.579,92.5-163.249,92.175-162.923,91.849Z" transform="translate(166 -81.754)"/> <path class="a" d="M200.484-247.468c-.02.133-.036.267-.061.4a3.24,3.24,0,0,1-.912,1.727q-1.858,1.86-3.719,3.718a3.311,3.311,0,0,1-5.114-.533c-.09-.136-.158-.287-.239-.429a.071.071,0,0,1,.02-.1c.191-.188.379-.379.57-.568a1.161,1.161,0,0,1,.722-.344c.008.025.016.052.024.078a1.735,1.735,0,0,0,2.9.786q1.752-1.74,3.492-3.492a3.574,3.574,0,0,0,.46-.518,1.731,1.731,0,0,0-1.239-2.665,1.69,1.69,0,0,0-1.452.5q-1.392,1.387-2.778,2.78a.145.145,0,0,1-.168.046,3.883,3.883,0,0,0-2.049-.044c.027-.032.043-.053.061-.071q.628-.632,1.256-1.263c.839-.84,1.682-1.677,2.518-2.52a3.341,3.341,0,0,1,1.8-.966c.125-.023.252-.037.378-.056h.438c.121.017.243.03.362.052a3.294,3.294,0,0,1,2.673,2.651c.026.129.04.261.059.392Z" transform="translate(-184.855 251)"/> </g> </g> </svg>',
                });
            } else if(id=='Check_Box'){
                this.levels[i].nodes.push({
                    id:id+this.maxid+this.levels[i].nodes.length,
                    nodetype:'Check Box',
                    message: null,
                    values:[null],
                    svg:'<svg xmlns="http://www.w3.org/2000/svg" width="14.611" height="12.369" style="fill:#979797;"  viewBox="0 0 14.611 12.369"> <g transform="translate(188 -107)"> <g transform="translate(-188 107)"> <path class="a" d="M231.954,174.87c.355-.357.686-.692,1.018-1.024l4.6-4.6a.714.714,0,0,1,1.135,0c.283.282.567.562.847.847a.7.7,0,0,1,0,1.1q-2.637,2.641-5.278,5.279l-1.748,1.749a.709.709,0,0,1-1.136.005l-3.649-3.649a.7.7,0,0,1-.009-1.114q.443-.448.891-.891a.7.7,0,0,1,1.058.008q1.071,1.069,2.139,2.14C231.868,174.758,231.9,174.805,231.954,174.87Z" transform="translate(-225.218 -168.389)"/> <path class="a" d="M160.269,150.362h3.64a2.424,2.424,0,0,1,1,.2.283.283,0,0,1,.1.5,4.921,4.921,0,0,1-.4.4.4.4,0,0,1-.247.084c-.3-.009-.59-.054-.885-.055q-3.394-.007-6.788,0a1.386,1.386,0,0,0-1.461,1.454q-.006,3.624,0,7.249a1.38,1.38,0,0,0,1.4,1.4c1.28.005,2.56,0,3.84,0,1.152,0,2.3,0,3.455,0a1.382,1.382,0,0,0,1.4-1.226,6.986,6.986,0,0,0,.013-.782c0-.522-.005-1.044.006-1.566a.483.483,0,0,1,.115-.282c.157-.181.337-.343.506-.515a.276.276,0,0,1,.321-.075.269.269,0,0,1,.179.276c-.006,1.008.017,2.018-.024,3.024a2.461,2.461,0,0,1-2.162,2.245c-.462.042-.93.03-1.4.031q-3.125,0-6.251,0a2.508,2.508,0,0,1-2.389-1.7,2.772,2.772,0,0,1-.138-.842q-.016-3.655,0-7.31a2.5,2.5,0,0,1,2.408-2.5c.91-.029,1.822-.008,2.733-.009Z" transform="translate(-154.095 -150.356)"/> </g> </g> </svg>',
                });
            } else if(id=='Radio_Button'){
                this.levels[i].nodes.push({
                    id:id+this.maxid+this.levels[i].nodes.length,
                    nodetype:'Radio Button',
                    message: null,
                    values:[null],
                    svg:'<svg xmlns="http://www.w3.org/2000/svg" width="16.122" height="16.12" style="fill:#979797;" viewBox="0 0 16.122 16.12"> <g transform="translate(-708.017 101.974)"> <path class="a" d="M716.072-85.854a8.048,8.048,0,0,1-8.055-8.123,8.058,8.058,0,0,1,8.059-8,8.07,8.07,0,0,1,8.063,8.126A8.069,8.069,0,0,1,716.072-85.854ZM709.6-93.96a6.452,6.452,0,0,0,6.492,6.524,6.468,6.468,0,0,0,6.461-6.436,6.456,6.456,0,0,0-6.5-6.519A6.445,6.445,0,0,0,709.6-93.96Z" transform="translate(0)"/> <path class="a" d="M744.984-69.06A3.994,3.994,0,0,1,748.955-65a4,4,0,0,1-4.019,3.954,3.989,3.989,0,0,1-4-4.1A3.987,3.987,0,0,1,744.984-69.06Z" transform="translate(-28.869 -28.862)"/> </g> </svg>',
                });
            } else if(id=='Dropdown'){
                this.levels[i].nodes.push({
                    id:id+this.maxid+this.levels[i].nodes.length,
                    nodetype:'Dropdown',
                    message: null,
                    values:[null],
                    placeholder:null,
                    svg:'<svg xmlns="http://www.w3.org/2000/svg" width="13.011" height="13.01" style="fill:#979797;" viewBox="0 0 13.011 13.01"> <g transform="translate(122 -226)"> <g transform="translate(-122 226)"> <path class="a" d="M143.989,227.558q2.5,0,5.007,0a1.429,1.429,0,0,1,1.463,1.111,1.722,1.722,0,0,1,.042.4q0,4.988,0,9.975a1.432,1.432,0,0,1-1.118,1.478,2.1,2.1,0,0,1-.476.044q-4.911,0-9.822,0a1.464,1.464,0,0,1-1.553-1.125,1.678,1.678,0,0,1-.039-.38q0-5,0-9.995a1.435,1.435,0,0,1,1.127-1.472,2.007,2.007,0,0,1,.438-.035Q141.524,227.556,143.989,227.558Zm-5.044,6.494c0,1.6,0,3.21,0,4.814,0,.185.033.251.238.25q4.824-.011,9.648,0c.173,0,.227-.042.226-.222q-.008-4.833,0-9.667c0-.185-.06-.22-.229-.219q-4.824.007-9.648,0c-.182,0-.237.045-.236.232C138.949,230.842,138.945,232.447,138.945,234.052Z" transform="translate(-137.492 -227.557)"/> <path class="a" d="M217.409,343.722l2.572-2.578.979.982-3.557,3.557-3.558-3.555.985-.987Z" transform="translate(-210.915 -336.783)"/> </g> </g> </svg>',
                });
            } else if(id=='File_Upload'){
                this.levels[i].nodes.push({
                    id:id+this.maxid+this.levels[i].nodes.length,
                    nodetype:'File Upload',
                    message:null,
                    svg:'<svg xmlns="http://www.w3.org/2000/svg" width="12.785" height="13.14" style="fill:#fff;"viewBox="0 0 12.785 13.14"><g transform="translate(-31.42 -443.609)"><g transform="translate(31.42 443.609)"><path class="f" d="M3.094,456.552a2.594,2.594,0,0,1-.34-.175.685.685,0,0,1-.279-.592q0-1.952,0-3.9a.752.752,0,0,1,1.022-.709.718.718,0,0,1,.457.709c0,.623,0,1.245,0,1.868q0,.593,0,1.186v.121H13.8v-.124q0-1.506,0-3.012a.76.76,0,0,1,.25-.619.7.7,0,0,1,.725-.136.665.665,0,0,1,.467.579,5.064,5.064,0,0,1,.014.545q0,1.726,0,3.453a.709.709,0,0,1-.16.527,1.9,1.9,0,0,1-.3.223.762.762,0,0,1-.143.06Z" transform="translate(-2.474 -443.412)"/><path class="f" d="M134.647,84a1.536,1.536,0,0,1,.69.506q.727.725,1.453,1.452c.417.418.835.834,1.246,1.257a.683.683,0,0,1,.119.82.711.711,0,0,1-.833.364.954.954,0,0,1-.375-.214c-.539-.523-1.067-1.059-1.6-1.59-.021-.021-.044-.04-.09-.082v.159q0,3.059,0,6.119a.742.742,0,0,1-.159.508.723.723,0,0,1-1.274-.314,1.516,1.516,0,0,1-.017-.23q0-3.044,0-6.087V86.51l-.324.317c-.494.483-.982.973-1.486,1.446a.718.718,0,0,1-.984-1.037c.375-.391.762-.771,1.144-1.154.6-.6,1.2-1.2,1.8-1.8a1.152,1.152,0,0,1,.459-.28Z" transform="translate(-128.129 -84)"/></g></g></svg>',
                });
            }
            this.selectnode(this.levels[i].nodes.length-1,this.levels[i].levelno);
        },
        createlevel(levelindex){
            this.maxid=this.maxid+1;
            this.levels.push({
                levelno:this.levels[levelindex].levelno+1,
                id:this.maxid,
                nodes:[],
                buttons:[],
                buttoncount:0,
                previousnodeindex:this.levels[levelindex].buttoncount,
            });
            this.levels[levelindex].nodes[this.levels[levelindex].nodes.length-1].followinglevelid=this.maxid-1;
            this.levels[levelindex].buttons[this.levels[levelindex].buttons.length-1].followinglevelid=this.maxid-1;
            if(this.selectedlevellist[this.levels[this.levels.length-1].levelno]==undefined){
                this.selectedlevellist[this.levels[levelindex].levelno]=levelindex;
                this.selectedlevellist.push(this.levels.length-1);
            } else {
                this.selectedlevellist[this.levels[levelindex].levelno]=levelindex;
                this.selectedlevellist[this.levels[levelindex].levelno+1]=this.levels.length-1;
                while(this.selectedlevellist.length>levelindex+2){
                    this.selectedlevellist.pop();
                }
            }
        },
        selectnode(nodeindex,levelindex){
            if(levelindex!=null){
                this.selectedlevel=this.selectedlevellist[levelindex];
                this.selected=true;
            } else {
                this.selectedlevel=levelindex;
            }
            this.selectednode=nodeindex;
            // console.log(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype,'==Button','&&',this.selectedlevellist[this.selectedlevel],'==',undefined);
            // if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='Button'&&this.selectedlevellist[this.selectedlevel]==undefined){
            //     this.selectedlevellist.push(this.levels[this.selectedlevel].nodes[this.selectednode].followinglevelid-1,);
            // }
            if(this.selectedlevel!=null){
                this.setvalues();
            }
        },
        resetpath(nodeindex,levelindex){
            this.selectedlevellist[levelindex+1]=this.levels[this.selectedlevellist[levelindex]].nodes[nodeindex].followinglevelid;
            while(this.selectedlevellist.length>levelindex+2){
                this.selectedlevellist.pop();
            }
        },
        setvalues(){
            this.name=null;
            this.hyperlink=null;
            this.message=null;
            this.value=[];
            // this.levels[this.selectedlevel]
            if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='Button'){
                this.name=this.levels[this.selectedlevel].nodes[this.selectednode].name;
            }
            if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='Text Box'){
                this.name=this.levels[this.selectedlevel].nodes[this.selectednode].placeholder;
            }
            if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='TextArea'){
                this.name=this.levels[this.selectedlevel].nodes[this.selectednode].placeholder;
            }
            if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='Hyperlink'){
                this.hyperlink=this.levels[this.selectedlevel].nodes[this.selectednode].hyperlink;
            }
            if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='Check Box'){
                this.message=this.levels[this.selectedlevel].nodes[this.selectednode].message;
            }
            if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='Radio Button'){
                this.message=this.levels[this.selectedlevel].nodes[this.selectednode].message;
            }
            if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='Dropdown'){
                this.message=this.levels[this.selectedlevel].nodes[this.selectednode].message;
            }
            if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='File Upload'){
                this.message=this.levels[this.selectedlevel].nodes[this.selectednode].message;
            }
            if(this.levels[this.selectedlevel].nodes[this.selectednode].values!=undefined){
                this.value=[];
                for(let i=0;i<this.levels[this.selectedlevel].nodes[this.selectednode].values.length;i++){
                    this.value.push(this.levels[this.selectedlevel].nodes[this.selectednode].values[i]);
                }
            }
        },
        saveval() {
            if (event.keyCode === 13) {
                this.savenodevalue();
            }
        },
        savenodevalue(){
            if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='Button'){
                this.levels[this.selectedlevel].nodes[this.selectednode].name=this.name;
                this.levels[this.selectedlevel].buttons[this.levels[this.selectedlevel].nodes[this.selectednode].buttonindex].name=this.name;
            }
            if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='Text Box'){
                this.levels[this.selectedlevel].nodes[this.selectednode].placeholder=this.name;
            }
            if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='TextArea'){
                this.levels[this.selectedlevel].nodes[this.selectednode].placeholder=this.name;
            }
            if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='Hyperlink'){
                if(this.testhyperlink.test(this.hyperlink)){
                    if(this.hyperlink!=null){
                        this.levels[this.selectedlevel].nodes[this.selectednode].hyperlink=this.hyperlink;
                    }
                } else {
                    //toaster
                    console.log('galat hai');
                }
            }
            if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='Check Box'){
                this.levels[this.selectedlevel].nodes[this.selectednode].message=this.message;
            }
            if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='Radio Button'){
                this.levels[this.selectedlevel].nodes[this.selectednode].message=this.message;
            }
            if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='Dropdown'){
                this.levels[this.selectedlevel].nodes[this.selectednode].message=this.message;
            }
            if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='File Upload'){
                this.levels[this.selectedlevel].nodes[this.selectednode].message=this.message;
            }
            if(this.levels[this.selectedlevel].nodes[this.selectednode].values!=undefined){
                for(let i=0;i<this.levels[this.selectedlevel].nodes[this.selectednode].values.length;i++){
                    // this.value.push(this.levels[this.selectedlevel].nodes[this.selectednode].values[i]);
                    this.levels[this.selectedlevel].nodes[this.selectednode].values[i]=this.value[i];
                }
            }
        },
        deletenode(){
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete!!"
            }).then(result=>{
                console.log(this.levels);
                // console.log(result.value,this.selectedlevel,this.selectednode,this.levels);
                if (result.value) {
                    if(this.levels[this.selectedlevel].nodes[this.selectednode].nodetype=='Button'){
                        if(this.levels[this.levels[this.selectedlevel].nodes[this.selectednode].followinglevelid].buttoncount!=0){
                            //swal
                            console.log('not possible');
                        } else {
                            //delete
                            var index=this.levels[this.selectedlevel].nodes[this.selectednode].buttonindex;
                            // var buttonindexinparentlevel;
                            // var previouslevelindex ;
                            // console.log(this.levels[this.selectedlevel].nodes[this.selectednode]);

                            // this.levels[this.selectedlevel].nodes.splice(this.selectednode,1);
                            // this.levels[this.selectedlevel].buttons.splice(index,1);
                            
                            for(let i=index+1;i<this.levels[this.selectedlevel].buttons.length;i++){
                                var nodeindexofbutton=this.levels[this.selectedlevel].buttons[i].nodeindex;
                                this.levels[this.selectedlevel].nodes[nodeindexofbutton].buttonindex=this.levels[this.selectedlevel].nodes[nodeindexofbutton].buttonindex-1;
                                this.levels[this.selectedlevel].buttons[i].nodeindex=this.levels[this.selectedlevel].buttons[i].nodeindex-1;
                            }
                            this.selected=null;
                            this.clearall();
                            
                            // this.selected=null;
                            // console.log('start');
                            // this.clearall();
                            // console.log('end',this.selected);
                            
                            this.levels[this.selectedlevel].nodes.splice(this.selectednode,1);
                            while(this.selectedlevellist.length>this.levels[this.selectedlevel].levelno+1){
                                this.selectedlevellist.pop();
                            }
                            this.levels[this.selectedlevel].buttoncount=this.levels[this.selectedlevel].buttoncount-1;
                            this.levels[this.selectedlevel].buttons.splice(index,1);
                            if((this.selectednode-1)!=-1){
                                this.selectednode=0;
                                this.selectnode(this.selectednode,this.selectedlevel);
                            } else if(this.levels[this.selectedlevel].nodes.length>1){
                                this.selectednode=0;
                                this.selectnode(this.selectednode,this.selectedlevel);
                            } else {
                                this.selectedlevel=this.selectedlevel-1;
                                if(this.selectedlevel==-1){
                                    this.selectedlevel=null;
                                }
                                this.selectnode(0,this.selectedlevel);
                            }
                            // this.selectnode(this.selectedlevel,this.selectednode);
                        }
                    } else {
                        this.selected=null;
                        this.clearall();
                        this.levels[this.selectedlevel].nodes.splice(this.selectednode,1);
                        if((this.selectednode-1)!=-1){
                            this.selectednode=0;
                            this.selectnode(this.selectednode,this.selectedlevel);
                        } else if(this.levels[this.selectedlevel].nodes.length>=1){
                            this.selectednode=0;
                            this.selectnode(this.selectednode,this.selectedlevel);
                        } else {
                            // this.selectednode=this.selectednode+1;
                            this.selectedlevel=this.selectedlevel-1;
                            if(this.selectedlevel==-1){
                                this.selectedlevel=null;
                            }
                            this.selectnode(0,this.selectedlevel);
                        }
                    }
                }
            });
        },
        andvalue(){
            this.levels[this.selectedlevel].nodes[this.selectednode].values.push(null);
            this.value.push(null);
        },
        deletevalue(valueindex){
            // console.log(valueindex,this.selectednode);
            this.levels[this.selectedlevel].nodes[this.selectednode].values.splice(valueindex, 1);
            this.value.splice(valueindex, 1);
        },
        clearall(){
            if(this.levels[this.selectedlevel].nodes[this.selectednode].placeholder!=undefined){
                this.name=this.levels[this.selectedlevel].nodes[this.selectednode].placeholder;
                console.log('h1',this.name);
            } else {
                this.name=null;
                console.log('h2',this.name,this.selected);
            }
            this.hyperlink=null;
            this.message=null;
            this.value=[];
            // setTimeout(function(){ alert("After 5 seconds!"); }, 5000);
            // this.selectedlevel=null;
            // this.selectednode=null;
        }
    }
}
</script>

<style scoped>
.control{
    top: 0px;
    left: 0px;
    width: 25%;
    min-height: 530px;
    height: auto;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    opacity: 1;
}
.workflow{
    top: 0px;
    left: 252px;
    width: 50%;
    min-height: 530px;
    height: auto;
    opacity: 1;
}
.setting{
    top: 0px;
    left: 1105px;
    width: 25%;
    /* min-height: 100%; */
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    opacity: 1;
    float: right;
}
.testbutton{
    top: 296px;
    left: 16px;
    width: auto;
    height: 35px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 0px 4px #00000029;
    border-radius: 19px;
    margin-top: 5%;
}
.testbutton div{
    padding-left: 5%;
    padding-top: 5%;
}
.headings{
    height: 53px;
    display: flex;
    padding-left: 5%;
    /* border-bottom: 1px solid #dee2e6 */
}
.headings h5{
    align-self: center;
}
.tagprops h4{
    border-bottom: 1px solid #dee2e6
}
.tagprops{
    top: 79px;
    left: 1120px;
    width: 90%;
    height: auto;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 26px;
    opacity: 1;
    margin: 5%;
    padding: 0px 20px 20px;
}
.tagprops h4{
    align-self: center;
    text-align: center;
}
.tagname{
    top: 134px;
    left: 1134px;
    /* width: 202px; */
    height: 29px;
    background: #F1F5F8 0% 0% no-repeat padding-box;
    border-radius: 15px;
    opacity: 1;
    padding: 0;
    padding-left: 10%;
}
.tagcolor{
    top: 175px;
    left: 1134px;
    /* width: 202px; */
    height: 29px;
    background: #F1F5F8 0% 0% no-repeat padding-box;
    border-radius: 15px;
    opacity: 1;
}
.tagfont{
    top: 216px;
    left: 1134px;
    /* width: 202px; */
    height: 29px;
    background: #F1F5F8 0% 0% no-repeat padding-box;
    border-radius: 15px;
    opacity: 1;
}
.tagprops input{
    margin-bottom: 5%;
    padding-left: 15px;
}
.level{
    min-height: 100px;
    width: auto;
    margin: 2%;
    border: 1px solid #000;
}
.button{
    top: 102px;
    left: 318px;
    width: 60px;
    height: 50px;
    background: #1F66E1 0% 0% no-repeat padding-box;
    border-radius: 8px;
    opacity: 1;
    text-align: center;
    position: absolute;
}
.button1{
    top: 102px;
    left: 510px;
    width: 60px;
    height: 50px;
    background: #1EAAE1 0% 0% no-repeat padding-box;
    border-radius: 8px;
    opacity: 1;
    text-align: center;
    position: absolute;
}
.button2{
    top: 233px;
    left: 510px;
    width: 60px;
    height: 50px;
    background: #E1531E 0% 0% no-repeat padding-box;
    border-radius: 8px;
    opacity: 1;
    text-align: center;
    position: absolute;
}
.button3{
    top: 509px;
    left: 510px;
    width: 60px;
    height: 50px;
    background: #1F66E1 0% 0% no-repeat padding-box;
    border-radius: 8px;
    opacity: 1;
    text-align: center;
    position: absolute;
}
.button4{
    top: 508px;
    left: 911px;
    width: 60px;
    height: 50px;
    background: #007B00 0% 0% no-repeat padding-box;
    border-radius: 8px;
    opacity: 1;
    text-align: center;
    position: absolute;
}
.button5{
    top: 233px;
    left: 510px;
    width: 60px;
    height: 50px;
    background: #E1531E 0% 0% no-repeat padding-box;
    border-radius: 8px;
    opacity: 1;
    text-align: center;
    position: absolute;
}
.button6{
    top: 233px;
    left: 510px;
    width: 60px;
    height: 50px;
    background: #E1531E 0% 0% no-repeat padding-box;
    border-radius: 8px;
    opacity: 1;
    text-align: center;
    position: absolute;
}
.button7{
    top: 233px;
    left: 510px;
    width: 60px;
    height: 50px;
    background: #E1531E 0% 0% no-repeat padding-box;
    border-radius: 8px;
    opacity: 1;
    text-align: center;
    position: absolute;
}
.buttonname{
    /* top: 129px; */
    /* left: 340px; */
    /* width: 36px; */
    width: 100%;
    height: 50%;
    /* text-align: left; */
    font: Regular 12px/16px Segoe UI;
    letter-spacing: 0;
    color: #FFFFFF;
    opacity: 1;
    /* text-align: center; */
    font-size: small;
}
.symbols{
    /* background-color: lightskyblue; */
    height: 90%;
    margin: 5%;
    width: 90%;
}
.symbols div>div{
    width: 50%;
    height: auto;
}
.symbols div{
    height: 35px;
    width: auto;
    text-align: center;
    /**/
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 0px 4px #00000029;
    border-radius: 19px;
    margin: inherit;
    text-align: left;
    padding: 0%;
    padding-left: 10%;
}
.symbols2{
    /* background-color: lightskyblue; */
    height: 90%;
    margin: 5%;
    width: 90%;
    /**/
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 0px 4px #00000029;
    border-radius: 19px;
}
.symbols2 div>div{
    width: 50%;
    height: auto;
    padding: 5%;
}
.symbols2 div{
    height: 20%;
    width: auto;
    text-align: center;
    margin-bottom: -2.5%;
}
.save_node_button{
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
.delete_node_button{
    font-size: 14px;
    color: #fff;
    background: #F23D3D;
    border: solid 1px #F23D3D;
    padding: 6px 15px;
    font-weight: 400;
    line-height: 20px;
    /* display: inline-block; */
    border-radius: 4px;
    cursor: pointer;
    float: left;
}
</style>