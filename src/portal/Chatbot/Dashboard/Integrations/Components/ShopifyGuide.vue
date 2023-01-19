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
      <h3>Shopify Help</h3>
      <img src="/img/cense_image.png" style="width: 25%; margin-left: auto" alt />
    </div>
    <br>
    <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <img src="/img/close-icn.png" alt />
    </button> -->
    <div class="card-body" style="padding: 0px 10px">
      <ul>
        <li>
          <h5>For Shop Domain Name</h5>
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
            <li>In the sidebar, open Online Store and Go to Domains</li>
            <li>
              Copy the 'Domain Name' under Shopify-managed domains and paste it
              into Shop Domain Name(make sure it is in the format
              myshop.myshopify.com)
            </li>
          </ol>
        </li>
        <hr>
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
              In the Admin API section, give Read Access to Analytics, Assigned
              fulfillment orders, Customers, Discounts, Draft orders,
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
              Save these details and you will see your private app credentials.
            </li>
            <li>
              Copy the API key and paste it into the API Key field and copy the
              Password and paste it into the API Secret field.
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