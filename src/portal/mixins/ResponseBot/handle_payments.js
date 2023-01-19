import axios from 'axios'

export default {
  methods: {
    transfer_payment (account, amount, currency, name) {
      axios
        .post('https://api.razorpay.com/1/transfers', {
          auth: {
            rzp_test_SnDTaPnncfliDt: 'llxEKbgABH8Lx4XApex9cGzj'
          },
          data: {
            account: account,
            amount: amount,
            currency: currency
          }
        })
        .then(response => {
          console.log(response.data)
          // if(this.user_data.api_key!='') {
          this.shopify_order_create(name)
          // }
        })
    }
  }
}
