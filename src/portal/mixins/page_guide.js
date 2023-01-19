import { bus } from "@/portal/main";
import {modal_help_data} from "../mixins";

export default{
    data(){
        return{
            pathValue: "",
            setup_page: false,
        }
    },
    mixins:[
        modal_help_data
    ],
    beforeDestroy() {
        this.$root.$off("setup_page_botdeployment");
    },
    mounted(){
        this.$root.$on("setup_page_botdeployment", (data) => {
         this.setup_page = true;
        });
        bus.$on('Emitting_data', (data) => {
            this.pathValue = data;
            let datafile = this.help_modal_data
            for(var i in datafile){
                if(this.setup_page){
                }
                else if(this.pathValue === datafile[i].page_path){
                    if(datafile[i].is_multiple_tabs === true) {
                        let current_active_tab = this.$session.get("CurrentActiveTabForHelp");
                        let current_active_tab_data = datafile.find(item => item.name === current_active_tab);
                        if(current_active_tab_data != undefined && current_active_tab === current_active_tab_data.name){
                            for(var j in datafile){
                                if(datafile[j].name === current_active_tab){
                                    bus.$emit('LayoutHelpData',datafile[j].data.calldata);
                                    return;
                                }
                            }
                        }else {
                            for(var i in datafile) {
                                if(datafile[i].name == 'support-help') bus.$emit('LayoutHelpData',datafile[i].data.calldata);
                            }
                            return;
                        }
                        //bus.$emit('LayoutHelpData',current_active_tab_data);
                        //return; 
                    }
                    bus.$emit('LayoutHelpData',datafile[i].data.calldata);
                }
                const found = datafile.some(el => el.page_path === this.pathValue);
                if (!found || this.setup_page) {
                    for(var i in datafile) {
                        if(datafile[i].name == 'support-help') bus.$emit('LayoutHelpData',datafile[i].data.calldata);
                    }
                }
            }
            

        }) 
    },
    methods:{
        page_guide(){
            var check_component = this.$vnode.tag;
            //console.log(check_component);
            // if(this.name === check_component){
            //     Swal({
            //         title: "Success",
            //         text: "intent display",
            //         type: "success",
            //     });
            // }
            // if (this.setData != undefined) {
            //     if (check_component.includes("NewIntentsPage")){
                    
            //         console.log("the success");
            //         //var a = document.getElementsByClassName();
            //         // full_page_freeze
            //         // Swal({
            //         //     title: "Subscripton expired",
            //         //     text: this.swal_text,
            //         //     type: "warning",
            //         // });
            //         // var x = document.getElementById("products_ranking_radio");
            //         // x.style.pointerEvents = "none"
            //         // // x.style.cursor = "not-allowed";
            //         // x.title = this.hover_title;
            //     }
            // }
            },
    },
}
