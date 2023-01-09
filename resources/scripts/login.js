// --------------------------------------------------------------------------------------------------------------------- 
// -----------------------------------------------------LOGIN HTML ----------------------------------------------------- 
// --------------------------------------------------------------------------------------------------------------------- 

function reset_login(){ //resets any errors
	document.getElementById('error-box').innerHTML = ""
	document.getElementById('error-box').style.color = "red"

}


function validation_login(signin_page){

	reset_login()

	var username = document.getElementById('username').value.toLowerCase()
	var password = document.getElementById('password').value


	if (username == "" || password == ""){
		document.getElementById('error-box').innerHTML = "Please input all the required fields"
		return
	}

	

	var stored_data = ['qid', 'email', 'phone']
	var user_pswd_valid = false
	var exist_user = false


//checks if account exists if not redirects to sign up
	for (data in stored_data){
		var check_exist_data = localStorage.getItem(stored_data[data])
		if (check_exist_data == username){
			exist_user = true
			
		}
	}

	if (exist_user == false){
		document.getElementById('error-box').innerHTML = 'Account does not exists. Please register to use the website.'
		setTimeout(() => {window.location.href = "signin.html"}, 3500);
		return	

	}

	var stored_password = localStorage.getItem('password')

	//if account exists checks if password inputted is correct

	if (password == stored_password){
		user_pswd_valid = true
	}
	//redirects to homepage / profile when login successful
	if (user_pswd_valid == true){
		document.getElementById('error-box').style.color = "green"
		document.getElementById('error-box').innerHTML = 'Login Successful'
		setTimeout(() => {

		localStorage.setItem('loggedin', true)
		redirect(signin_page, 'login')
		

		if(signin_page == 'base'){
			setTimeout(() => window.parent.location.href = '../resources/loading.html',2000 )
		}

		else if(signin_page == 'index'){
			setTimeout(() => window.parent.location.href = '../../resources/loading.html',2000 )
		}


		}, 0);
	}

	else{
		document.getElementById('error-box').innerHTML = 'Incorrect Password, Please try again'
	}



}

// --------------------------------------------------------------------------------------------------------------------- 
// --------------------------------------------------------------------------------------------------------------------- 
// --------------------------------------------------------------------------------------------------------------------- 




// --------------------------------------------------------------------------------------------------------------------- 
// ------------------------------------------------------REDIRECT------------------------------------------------------- 
// --------------------------------------------------------------------------------------------------------------------- 


function redirect(current_page, signup_or_login){ // redirects to the according page depending on wheter it was a login
													// or a sign up

		if (signup_or_login == 'signup'){
			localStorage.setItem('redirect',"../login-html/register-info.html")
		}
		else if(signup_or_login == 'login'){
			localStorage.setItem('redirect',"../homepage.html")
		}	
}


// --------------------------------------------------------------------------------------------------------------------- 
// --------------------------------------------------------------------------------------------------------------------- 
// --------------------------------------------------------------------------------------------------------------------- 




// --------------------------------------------------------------------------------------------------------------------- 
// -------------------------------------------------------Sign Up------------------------------------------------------- 
// --------------------------------------------------------------------------------------------------------------------- 

//reset error for signup page
function reset_validation(){
	document.getElementById('error-box').innerHTML = ""
	document.getElementById('password-error-box').innerHTML = ""
	var input_field = ['qid', 'phone-number', 'email', 'password', 're-password']
	for (input in input_field){
		document.getElementById(input_field[input]).style.border="1px hidden red";

	}
	document.getElementById('error-box').style.color = "red"
}


function validation_signin(signin_page){

	reset_validation()

	var qid = document.getElementById('qid').value 
	var phone_number = document.getElementById('phone-number').value 
	var email_address = document.getElementById('email').value.toLowerCase()
	var password = document.getElementById('password').value 
	var re_password = document.getElementById('re-password').value

	var valid_signup = true
	var password_good = true
	var store_data = false

	var list_input = [qid, phone_number, email_address, password, re_password]
	var input_field = ['qid', 'phone-number', 'email', 'password', 're-password']

	var error_message = ""

	let qid_regx = /^\d{11}$/
	let phonenum_regx = /^\d{8}$/
	let email_regx = /^([a-zA-Z0-9\._-]+)@([a-zA-Z0-9-]{0,30}).([a-z]{2,20})(.[a-z]{2,10})$/
	let pass_regx = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{8,30}$/

	// checks for any input not inputted
	var total_field_full_input = true
	for( input in list_input){
		var field_full_input = true
		if (list_input[input] == ""){
			error_message = "Please input all the required fields"
			document.getElementById('error-box').innerHTML = error_message
			field_full_input = false
			total_field_full_input = false
			document.getElementById(input_field[input]).style.border="1px solid red";

		}

		if (total_field_full_input==false && input == 4){
			error_message = "Please input all the required fields"
			document.getElementById('error-box').innerHTML = error_message
			return
		}	
	}

	// checks if input matches the regular expression
	if ( qid_regx.test(qid) == false){ 

		if (valid_signup == true){
			error_message = "Please enter a valid Qatar Id"
		}
		valid_signup = false
		document.getElementById("qid").style.border="1px solid red";
	}
	if ( phonenum_regx.test(phone_number) == false){

		if (valid_signup == true){
			error_message = "Please enter a valid Phone Number"
		}
		valid_signup = false
		document.getElementById("phone-number").style.border="1px solid red";
	}
	if ( email_regx.test(email_address) == false){

		if (valid_signup == true){
			error_message = "Please enter a valid Email Address"
		}
		valid_signup = false
		document.getElementById("email").style.border="1px solid red";
	}
	if (pass_regx.test(password)==false){
		if (valid_signup == true){
			error_message = "Please enter a more secure password (8 character +)"
			password_error = 'Password must contain a number, special character, a lowercase and an uppercase letter.'
			document.getElementById('password-error-box').innerHTML = password_error
		}
		valid_signup = false
		password_good = false
		document.getElementById("password").style.border="1px solid red";
	}

	document.getElementById('error-box').innerHTML = error_message 

	if (valid_signup == false || password_good == false){
		return
	}

	// First stage of validation complete checking if input in correct format


	if (password != re_password){
		document.getElementById('error-box').innerHTML = "Password and Confirm Password must be same."
		return
	}

	

	var stored_data = ['qid', 'email', 'phone']
	var exist_account = false
	for (data in stored_data){
		var check_exist_data = localStorage.getItem(stored_data[data])
		if (check_exist_data == qid || check_exist_data == phone_number || check_exist_data == email_address){
			exist_account = true
		}
	}
	// if account exists redirects to login page
	if (exist_account == true){
		document.getElementById('error-box').innerHTML = 'Account already exists. Please login to access ur profile'	
		setTimeout(() => {window.location.href = "login.html"}, 3200);
		return
	}



	localStorage.setItem('qid', qid)
	localStorage.setItem('email', email_address)
	localStorage.setItem('phone', phone_number)
	localStorage.setItem('password', password)

	store_data = true

	if (valid_signup == true && password_good == true && store_data == true){
		document.getElementById('error-box').style.color = "green"
		document.getElementById('error-box').innerHTML = 'Account has been created!'

	}

	document.getElementById('register-form').reset()

	//redirects to register personal info page
	setTimeout(() => {

		redirect(signin_page, 'signup')
		
		

		if(signin_page == 'base'){
			setTimeout(() => window.parent.location.href = '../resources/loading.html',2000 )
		}

		else if(signin_page == 'index'){
			setTimeout(() => window.parent.location.href = '../../resources/loading.html',2000 )
		}




},0);
}

//resets the register info error msg

function reset_register_info(){
	document.getElementById('error-box').style.color = "red"
	document.getElementById('error-box').innerHTML = ""

	var input_field = ['full-name', 'address', 'bday']

	for (input in input_field){
		document.getElementById(input_field[input]).style.border="1px hidden red";

	}

}

//registers personal info last part of signup 

function register_info(){

	reset_register_info()

	var full_name = document.getElementById('full-name').value
	var address_qatar = document.getElementById('address').value
	var b_day = document.getElementById('bday').value

	var list_input = [full_name, address_qatar, b_day]
	var total_field_full_input = true
	var input_field = ['full-name', 'address', 'bday']

	for( input in list_input){

		var field_full_input = true
		if (list_input[input] == ""){
			error_message = "Please input all the required fields"
			document.getElementById('error-box').innerHTML = error_message
			field_full_input = false
			total_field_full_input = false
			document.getElementById(input_field[input]).style.border="1px solid red";

		}

		if (total_field_full_input==false && input == 2){
			error_message = "Please input all the required fields"
			document.getElementById('error-box').innerHTML = error_message
			return

		}
	
	}

	var valid_register = true
	let name_regx = /^[a-zA-Z\sàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð-]+$/u

	var error_message = ""
	if (name_regx.test(full_name) == false){

		if (valid_register == true){
			error_message = "Please enter a valid Full Name"

		}

		valid_register = false
		document.getElementById('full-name').style.border = "1px solid red"

		
	}



	var CurrentDate = new Date();
	GivenDate = new Date(b_day);

	if(GivenDate > CurrentDate){
		if (valid_register == true){
			error_message = "Please enter a valid birthdate"
		}
		document.getElementById('bday').style.border = "1px solid red"
		valid_register = false
    	
	}else{
    	
	}

	document.getElementById('error-box').innerHTML = error_message

//checks if correct date has been inputted by checking if the date is in the past. simple regex for name 

	if (valid_register == false){
		return
	}



	valid_register = true;
	var set_data = false
	localStorage.setItem('birthday', b_day)
	localStorage.setItem('fullname', full_name)
	localStorage.setItem('address', address_qatar)
	localStorage.setItem('status', 'healthy')
	set_data = true
	if (valid_register == true && set_data == true){
		document.getElementById('error-box').style.color = "green"
		document.getElementById('error-box').innerHTML = 'Successful'

	}

	document.getElementById('register-form').reset()
	localStorage.setItem('loggedin', true)

	setTimeout(() => {

	localStorage.setItem('redirect', '../homepage.html')
	window.parent.location.href = "../resources/loading.html"}, 2000

	);    
}


// --------------------------------------------------------------------------------------------------------------------- 
// --------------------------------------------------------------------------------------------------------------------- 
// --------------------------------------------------------------------------------------------------------------------- 


// --------------------------------------------------------------------------------------------------------------------- 
// ---------------------------------------------------Forgot password--------------------------------------------------- 
// --------------------------------------------------------------------------------------------------------------------- 

// uses a code generated which is sent to email 
// used to change password of account
var email_api_success = true

function forgot_password(href_pass){

	var email = ""
	email += '<div class="email-forgotpass white-background "><input type="text" id="email-forgotpass" class="white-background email-input-forgotpswd" placeholder = "Email">'
	email += `<br><input type="button" value="Reset" class="white-background email-fpswd-btn" onclick = "email_sent_forgot_password('${href_pass}')"></div>`
	document.getElementById('forgot-password-box').innerHTML = email
}


function email_api(api_response, href_forgot){

	if (api_response.toLowerCase() == 'ok'){
		msg = '<span class="email-forgotpass-txt white-background">Password reset link has been sent to the email.</span>'
		email_api_success = true
		setTimeout(() => { 


			localStorage.setItem('redirect', '../login-html/reset-pass.html')

			if (href_forgot == 'base'){
			window.parent.location.href = "../resources/loading.html"}
			else{
				window.parent.location.href = "../../resources/loading.html"
			}
		},  3500);  
		return [msg, true]
	}

	else{
		msg = '<span class="email-forgotpass-txt white-background">There has been an error. Please try again later</span>'
		email_api_success = false
		
		setTimeout(() => {document.getElementById('forgot-password-box').innerHTML = ""}, 9000);
		return [msg, false]
	}


}

function email_sent_forgot_password(src_forgot){
	var msg = ""
	let email_requestregx = /^([a-zA-Z0-9\._-]+)@([a-zA-Z0-9-]{0,30}).([a-z]{2,20})(.[a-z]{2,10})$/
	var email_request = document.getElementById('email-forgotpass').value.toLowerCase()

	if (email_requestregx.test(email_request) == false){
		msg += '<span  class="white-background invalid-email-fpswd">Invalid Email Address</span>'
		document.getElementById('forgot-password-box').innerHTML = msg
		setTimeout(() => {forgot_password()}, 3000);
		return
	}

	var current_email_stored = localStorage.getItem('email')
	if(current_email_stored != email_request){
		msg = '<span  class="white-background invalid-email-fpswd" style="top:1%">Account not found</span><br><br>'
		msg += ' <span  class="white-background invalid-email-fpswd" style="top:1%;">Redirecting...</span>'
		document.getElementById('forgot-password-box').innerHTML = msg
		setTimeout(() => {window.location.href = 'signin.html'}, 3000);
		return
	}

	var password_reset_code = Math.floor(100000 +Math.random() * 900000)
	


	localStorage.setItem('forgot_code', password_reset_code)
	subject_email = 'From Qorona Team<br><br><br>Sorry to hear that you are having trouble logging into your account.<br>Here is the Qorona Guard code you will need to reset your accounts password'
	subject_email += '<br>\t\t'+password_reset_code 
	subject_email += '<br><br><img src ="https://i.imgur.com/TyPH3aR.jpg">'
	
	Email.send({

    Host : "smtp.gmail.com",
    Username : "info.qorona@gmail.com",
    Password : "vUA73nWFkTrAjdwU",
    To : email_request,
    From : "info.qorona@gmail.com",
    Subject : "Password Reset Qorona",
    
    Body: subject_email
	}).then(
	message => document.getElementById('forgot-password-box').innerHTML = email_api(message,src_forgot)[0]

	);


}




function reset_password(){

	document.getElementById('error-box').style.color = "red"


	var security_code = localStorage.getItem('forgot_code')

	var guard_code = document.getElementById('guard-code').value.toLowerCase()



	if (security_code != guard_code){
		document.getElementById('error-box').innerHTML = 'Invalid Guard Code'
		document.getElementById('reset_form').reset()
		return


	}

	var password = document.getElementById('password').value
	var repass = document.getElementById('re-password').value

	let pass_regx = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{8,30}$/

	if (pass_regx.test(password)==false){

	
		error_message = "Please enter a more secure password"
		document.getElementById('error-box').innerHTML = error_message
		return
	}

	if (password != repass){
		document.getElementById('error-box').innerHTML = "Password and Confirm Password must be same."
		return
	}


		
	localStorage.setItem('password', password)
	localStorage.setItem('forgot_code', '')
	
	document.getElementById('error-box').style.color = "green"
	document.getElementById('error-box').innerHTML = 'Success! Password has been reset'

	setTimeout(() => {
		localStorage.setItem('redirect', '../login-html/login.html')
		window.parent.location.href = "../resources/loading.html"
	},3200);
}
	
	




