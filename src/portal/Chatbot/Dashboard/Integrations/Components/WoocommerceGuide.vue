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
      <h3>{{tlt('woo_help_header')}}</h3>
      <img src="/img/cense_image.png" style="width: 25%; margin-left: auto" alt />
    </div>
    <br>
    <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <img src="/img/close-icn.png" alt />
    </button> -->
    <div class="card-body" style="padding: 0px 10px">
      <ul>
        <li>
          <h5>{{tlt('for_rest_api_header')}}</h5>
          <p class="mb-0" style="font-weight: 500">{{tlt('woo_help_follow_steps_label')}}</p>
          <ol style="padding-left: 1.2rem">
            <li>
              {{tlt('woo_help_instruction_one')}}
            </li>
            <li>{{tlt('woo_help_first_instruction_one')}} <strong>{{tlt('woo_help_first_instruction_two')}}</strong> {{tlt('woo_help_instruction_three')}}
             <strong>{{tlt('woo_help_instruction_four')}}</strong> {{tlt('woo_help_instruction_five')}} <strong>{{tlt('woo_help_instruction_six')}}</strong>.
            <br>
            <img src="/img/Woocommerce_help_1.jpeg" width="100%" alt="">
            </li>
            <br>
            <li>
              {{tlt('woo_help_second_instruction_one')}}
              <ul>
                <li>- {{tlt('woo_help_second_instruction_two')}}</li>
                <li>- {{tlt('woo_help_second_instruction_three')}}</li>
                <li>- {{tlt('woo_help_second_instruction_four')}} <strong>{{tlt('woo_help_second_instruction_five')}}</strong> {{tlt('woo_help_second_instruction_six')}}</li>
              </ul>
              <ul>{{tlt('woo_help_second_instruction_seven')}}</ul>
            <img src="/img/Woocommerce_help_2.png" width="100%" alt="">
            </li>
            <br>
            <li>
            {{tlt('woo_help_third_instruction_one')}}
            <br>
            <img src="/img/Woocommerce_help_3.jpeg" width="100%" alt="">
            </li>
            <br>
            <li>
            {{tlt('woo_help_fourth_instruction_one')}}
            </li>
          </ol>
        </li>
        <hr>
        <li style="padding-top: 10px">
          <h5>{{tlt('woo_help_second_instruct_header')}}</h5>
          <p class="mb-0" style="font-weight: 500">{{tlt('woo_help_second_instruct_help')}}</p>
          <ol style="padding-left: 1.2rem">
            <li>
               {{tlt('woo_help_second_instruct_one')}} <strong>{{tlt('woo_help_second_instruct_two')}}</strong>
                <br>
              <img src="/img/Wordpress1.png" alt="">
            </li>
            <br>
            <li>
              {{tlt('woo_help_second_instruct_three')}}
                <br>
              <img src="/img/Wordpress2.png" alt="">
            </li>
            <br>
            <li>{{tlt('woo_help_second_instruct_four')}} <strong>{{tlt('woo_help_second_instruct_five')}}</strong> {{tlt('woo_help_second_instruct_six')}}.
                <br>
              <img src="/img/Wordpress3.png" alt="">
            </li>
            <br>
            <li>{{tlt('woo_help_second_instruct_seven')}} 
              <strong>{{tlt('woo_help_second_instruct_eight')}}</strong>
              <br>
              <img src="/img/Wordpress4.png" alt="">
            </li>
            <br>
            <li>
              {{tlt('woo_help_second_instruct_nine')}} 
              <a href="https://portal.cense.ai/bot/miscellaneous-settings">{{tlt('woo_help_second_instruct_tenth')}}</a> 
              <br>
              <img src="/img/Wordpress5.png" alt="">
            </li>
            <br>
            <li>
              {{tlt('woo_help_second_instruct_eleven')}}
            </li>
          </ol>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>