<template>
<div style="background-color: #FAFAFA; padding-top: 20px;">
  <div class="modal-body" style="width: 900px; margin: auto; 
  text-align: justify; 
  border: 1px solid rgb(219, 219, 219);
  border-radius: 9px;
  background-color: #FFF;
">
    <div class="modal-head d-flex align-items-center pb-0">
      <div class="head-icn">
        <img src="/img/msg-blue.png" alt />
      </div>
      <h3>{{tlt('magento_help_header')}}</h3>
      <img src="/img/cense_image.png" style="width: 25%; margin-left: auto" alt />
    </div>
    <br>
    <div class="card-body" style="padding: 0px 10px">
          <h5>{{tlt('magento_access_token_label')}}</h5>
          <p class="mb-0" style="font-weight: 500">{{tlt('magento_steps_header')}}:</p>
          <br>
          <ol style="padding-left: 1.2rem">
            <li>
              {{tlt('magento_instruct_one')}}
              <br>
              <br>
              <img src="/img/Magento1.png" style="width: 100%" alt="">
            </li>
            <br>
            <li>
              {{tlt('magento_instruct_two')}}.
              <br>
              <br>
              <img src="/img/Magento2.png" style="width: 100%" alt="">
            </li>
            <br>
            <li>{{tlt('magento_instruct_three')}}.
              <br>
              <br>
              <img src="/img/Magento3.png" style="width: 100%" alt="">
            </li>
            <br>
            <li>{{tlt('magento_instruct_four')}}
              <br>
              <br>
              <img src="/img/Magento4.png" style="width: 100%" alt="">
            </li>
            <br>
            <li>
              {{tlt('magento_instruct_five')}}.
              <br>
              <br>
              <img src="/img/Magento5.png" style="width: 100%" alt="">
            </li>
            <br>
            <li>
              {{tlt('magento_instruct_six')}}.
              <br>
              <br>
              <img src="/img/Magento6.png" style="width: 100%" alt="">
            </li>
            <br>
            <li>
              {{tlt('magento_instruct_seven')}}.
              <br>
              <br>
              <img src="/img/Magento7.png" style="width: 100%" alt="">
            </li>
            <br>
            <li>
              {{tlt('magento_instruct_eight')}}. 
            </li>
          </ol>
    </div>
  </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>