import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import api_calls from "@/portal/api_calls";
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		currentLanguageData: []
	},
	mutations: {
		setLanguageData(state, payload) {
			state.currentLanguageData = payload;
		}
	},
	actions: {
		changeLanguageData(state, language) {
			axios.get(api_calls.portal_language_data(), {
				params: {
					required_language: language
				}
			}).then(({ data }) => {
				if (data.message.MSG_CODE === 10000001) {
					state.commit("setLanguageData", data.data);
				}else {
					Swal({
					  title: data.message.MSG_CODE,
					  text: data.message.MSG,
					  showCancelButton: false,
					  showConfirmButton: false,
					  type: "error"
					})
				  }
			}).catch((e) => {
				console.log(e);
			})
		}
	},
	modules: {

	},
	getters: {
		getLanguageData: state => state.currentLanguageData
	}
});
