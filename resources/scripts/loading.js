

function redirect_webpage(){
	var src_redirect = localStorage.getItem('redirect')


	if (src_redirect == '' || src_redirect == null){
		console.log('src error')
		
		setTimeout(() => {window.location.href = "../index.html"}, 4000);

	}

	else{
		var time_out = Math.floor((Math.random() * 1000) + parseInt(localStorage.getItem('redirect_time')))
		console.log(time_out)
		setTimeout(() => {window.parent.location.href = src_redirect},time_out) ;

	}
}



redirect_webpage()