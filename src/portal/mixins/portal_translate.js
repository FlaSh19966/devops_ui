import translations from "@/portal/assets/js/language_data.js";
import axios from "axios";
import api_calls from "@/portal/api_calls";
import { mapGetters } from "vuex";

export default {
	computed: {
		...mapGetters({ db_translations: "getLanguageData" })
	},
	methods: {
		tlt(text, type) {
			if (type === "code") {
				let language = this.$session.get("PreferredLanguage");
				if (language == undefined) {
					language = 'en';
					this.$session.set('PreferredLanguage', language);
				}
				return translations[language][text]
			}
			if(this.db_translations[text] === undefined){
				return text;
			}else{
				return this.db_translations[text];
			}
		},
		change_locale_language(lang) {
			this.$session.set('PreferredLanguage', lang);
			axios.get(api_calls.portal_language_data(), {
				params: {
					required_language: lang
				  }
			}).then(({ data }) => {
				if (this.api_status_code.DATA_AVAILABLE.MSG_CODE === data.message.MSG_CODE) {
					this.$store.commit('setLanguageData', data.data);
					if(this.$router.currentRoute.name === 'Dashboard') {
						this.$root.$emit('call_dashboard_details', true);
					}
					//console.log(data, "result");
					this.$forceUpdate();
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
	}
}