<template>
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
      "
    >
      <div class="modal-head d-flex align-items-center pb-0">
        <div class="head-icn">
          <img src="/img/msg-blue.png" alt />
        </div>
        <h3>Shopify Help</h3>
        <img
          src="/img/cense_image.png"
          style="width: 25%; margin-left: auto"
          alt
        />
      </div>
      <br />
      <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <img src="/img/close-icn.png" alt />
    </button> -->
      <div class="card-body" style="padding: 0px 10px">
        <!-- <ul>
          <li> -->
            <h5>Follow the steps:</h5>
            <!-- <p class="mb-0" style="font-weight: 500">Follow the steps</p> -->
            <!-- <ol style="padding-left: 1.2rem"> -->
             <div style="margin-top: 0%">
      <h6>
       1. Click on “Start Automation Process”. This will kick off the backend process of pulling store related data and this process will take about 1-2 hrs, depending on the products available on the store.
       Please make sure there are 2-4 products in the store for the best results. This process might take 1-2 hrs.
      </h6>
      <br />
      <img src="@/portal/assets/img/shopify_public_app/p1.png" style="width: 100%" />
       <br>
      <img :src="require('@/portal/assets/img/shopify_public_app/p2.png')" style="width: 100%;margin-top: 5%" />
       <br>
      <img src="@/portal/assets/img/shopify_public_app/p3.png" style="width: 100%;margin-top: 5%" />
    </div>
    <div style="margin-top: 5%">
      <h6>


       2. Once the Sync process is completed, click Next.
      </h6>
      <img src="@/portal/assets/img/shopify_public_app/p5a.png" style="width: 100%" />
       <br>
       <h6>
       3. In the Bot Configuration screen, user can configure their chatbot widget.
      </h6>
      <br />
      <img src="@/portal/assets/img/shopify_public_app/p5.png" style="width: 100%" />
    </div>
    <div style="margin-top: 5%">
      <h6>
       4. Click Next.
      </h6>
      <img src="@/portal/assets/img/shopify_public_app/p6.png" style="width: 100%" />
      <h6 class="mt-4">
        5. In Check Bot Response screen, automated testing scripts will run to check if data pull and our algorithms have run
        successfully and the set-up till this stage is fine. In case of any errors, Error message will appear. Cense AI support   staff will check the error and reach out to user as required.
      </h6>
      <br />
      <img src="@/portal/assets/img/shopify_public_app/p7.png" style="width: 100%" />
      <h6 class="mt-4">
        6. Click Next
      </h6>
      <h6>7. Follow these steps to activate the Cense Widget on your website :</h6>
      <ol>
        <li>
          From your Shopify admin, go to <strong>Online Store</strong> &gt;
          <strong>Themes</strong>.
        </li>
        <li>
          Find the theme that you want to edit, and then click
          <strong>Customize</strong>.
        </li>
        <li>Click <strong>Theme settings</strong>.</li>
        <li>Click the <strong>App embeds</strong> tab.</li>
        <li>
          You will see the <strong> Cense AI Assistant </strong> embed.
        </li>
        <li>
          Click on the expand icon besides the name of the App to open its settings where
          you'll have to enter <strong>License Key</strong>.
        </li>
        <li>
          Copy the <strong> License Key </strong> from below and paste it in the
          text box.
        </li>
        <li>
          To activate the Cense AI Assistant on your store website, click the
          <strong> toggle </strong> to activate it.
        </li>
        <li>
          You can deactivate the Cense AI Assistant on your store website anytime you wish, you just have to click the
          <strong> toggle </strong> again to deactivate it.
        </li>
      </ol>
      <h6>8. Click on Finish once you are done with the set-up process</h6>
      <!-- <h6>7. Click on Add Widget button which will insert the scripts in your liquid file.</h6>
      <img src="@/portal/assets/img/shopify_public_app/p8.png" style="width: 100%" />
       <br>
      <img src="@/portal/assets/img/shopify_public_app/p10.png" style="width: 100%" />
      <h6>8. Click on Finish once you are done with the set-up process.</h6> -->
    </div>
            <!-- </ol> -->
          <!-- </li> -->
          <!-- <hr />
          <li style="padding-top: 10px">
            <h5>For Shop API Keys</h5>
            <p class="mb-0" style="font-weight: 500">Follow the steps</p>
            <ol style="padding-left: 1.2rem">
              <li>
                From your Shopify Admin, go to
                <a
                  href="https://accounts.shopify.com/store-login?redirect=apps%3Fshpxid%3Dedb0847d-26EE-4B99-9D84-A1207E43E02F"
                  target="blank"
                  >Apps</a
                >
              </li>
              <li>
                You'll find Manage private apps at the bottom please click that.
              </li>
              <li>Click Create a new private app.</li>
              <li>Enter a Name in the App details section.</li>
              <li>
                In the Admin API section, give Read Access to Analytics,
                Assigned fulfillment orders, Customers, Discounts, Draft orders,
                Fulfillment services, Gift cards, Locations, Price rules,
                Products, Shipping , Shop locale, Store content options.
              </li>
              <li>
                In the same section, give Read & Write access to Orders option
              </li>
              <li>
                In the Storefront API section, click the checkbox to Allow this
                app to access your storefront data using the Storefront API
              </li>
              <li>
                After that select the following options in the Storefront API
                section:
                <ul>
                  <li>- Read products, variants, and collections</li>
                  <li>- Read and modify customer details</li>
                  <li>- Read and modify checkouts</li>
                  <li>- Read content like articles, blogs, and comments</li>
                </ul>
              </li>
              <li>
                Save these details and you will see your private app
                credentials.
              </li>
              <li>
                Copy the API key and paste it into the API Key field and copy
                the Password and paste it into the API Secret field.
              </li>
            </ol>
          </li> -->
        <!-- </ul> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
h6 {
    font-weight: inherit;
}
</style>