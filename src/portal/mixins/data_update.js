import sidebaritems from "@/portal/Chatbot/Dashboard/Layout/SideBarItem";

export default {
	methods: {
		update_sidebar_menu(message) {
			let menu = {};
			let main_menu_list = message.filter(
				(arr) => arr.IsMasterMenu == true && arr.Enabled == true
			);
			let main_menu_list_filtered = [];
			let sub_menu_list = message.filter(
				(arr) =>
					arr.HasSubMenus == false &&
					arr.Enabled == true &&
					arr.IsSubMenu == true
			);

			for (let i = 0, n = main_menu_list.length; i < n; i += 1) {
				let menuFilter = sidebaritems.filter((sidebar) => {
					return (
						sidebar.name === main_menu_list[i].MenuItem &&
						Boolean(sidebar.svg_html)
					);
				});
				if (menuFilter.length > 0) {
					main_menu_list_filtered.push(menuFilter[0]);
					menu[menuFilter[0].name] = {
						main_menu: menuFilter[0],
						sub_menu_list: [],
					};
				}
			}
			try {
				for (let i = 0, n = sub_menu_list.length; i < n; i += 1) {
					for (var j in sidebaritems) {
						if (
							sidebaritems[j].name === sub_menu_list[i].MenuItem &&
							Boolean(sidebaritems[j].page_path && sidebaritems[j].master_menu === sub_menu_list[i].MasterMenu)
						) {
							menu[sub_menu_list[i].MasterMenu].sub_menu_list.push(
								sidebaritems[j]
							);
						}
					}
				}
			} catch (e) {
				console.log(e);
				// debugger;
			}
			menu = Object.values(menu);
			this.$session.set("ChatbotMenu", menu);

		},
		update_restriction_list(list, subscription_name){
			this.$session.set(
				"RestrictionList",
				list
			);
			try {
				let session_user_info = this.$session.get("UserInformation");
				session_user_info.subscription = subscription_name;
				this.$session.set("UserInformation", session_user_info);
			} catch (error) {
				console.log(error);
			}
		}
	}
}