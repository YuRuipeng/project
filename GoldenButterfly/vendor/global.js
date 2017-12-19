document.onreadystatechange=function(){
	if(document.readyState=="complete"){
		 $('body').addClass('loaded');
		 $('.loader').remove();
	}
}