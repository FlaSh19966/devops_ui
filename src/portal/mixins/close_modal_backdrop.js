export default {
	methods: {
		close_modal(id){
            
              let btn =document.getElementById(id);
              btn.setAttribute("data-dismiss" , "modal");
              // $(`#${id}`).attr("data-dismiss","modal"); 
              setTimeout(()=>{
                  // $(`#${id}`).attr("data-dismiss","modal"); 
                  btn.removeAttribute("data-dismiss");
                  
              },0)
              
              
        }
	}
}