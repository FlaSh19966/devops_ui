import moment from 'moment'

export default {
  methods: {
    generate_time () {
      return moment().format('hh:mm A');
    }
  },
}
