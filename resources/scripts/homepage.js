
// function checks the previous places the user has visited right now it is randomly generated

// get vaccinated function checks if user is in  healthy status if not notifies them when they could make an appoinment

// simple form for the appoinment

// request a test kit depending on the current health status the price varies

// later on a feature could be added where price varies per shipping location

function places(){

var places_qatar = [
	'Pearl Qatar','Sealine','Corniche, Doha', 'Souq Waqif',
	'Villagio Mall', 'Doha Festival City','Dukhan','Mall of Qatar',
	'Katara', 'Al Bidda Park', 'Msheireb', 'City Center Mall',
	'LandMark', 'Al Khor', 'Al Wakrah','Mesaieed','Lusail','Ras Laffan',
	'Al Ruwais','Al Dhakira','Zekreet', 'Abu Samra', 'Al Wukair', 'Industrial Area',
	'Hamad Airport', 'Education City', 'Simsimah','Fuwayrit', 'Al Ghariyah'
]

// random date generator

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


function color_gradient(risk_rate){

	let colorG1 = "rgb(0, 100, 0)"
    let colorG2 = "rgb(0, 171, 0)"
    let colorG3 = "rgb(0, 246, 0)"
    let colorG4 = "rgb(90, 255, 90)"
    let colorY1 = "rgb(203, 255, 58)"
    let colorY2 = "rgb(215, 250, 39)"
    let colorY3 = "rgb(255, 239, 0)"
    let colorMidpointColor = "rgb(255, 200, 0)"
    let colorO1 = "rgb(255, 179, 0)"
    let colorO2 = "rgb(255, 135, 0)"
    let colorR1 = "rgb(250, 97, 58)"
    let colorR2 = "rgb(228, 74, 35)"
    let colorR3 = "rgb(255, 0, 0)"
    let colorR4 = "rgb(222, 41, 41)"

	

	if (risk_rate >= 0 && risk_rate <6){
		return colorG1
	}
	else if (risk_rate >=6 && risk_rate <12){
		return colorG2
	}
	else if (risk_rate >=12 && risk_rate <18){
		return colorG3
	}
	else if (risk_rate >=18 && risk_rate <24){
		return colorG4
	}
	else if (risk_rate >=24 && risk_rate <30){
		return colorY1
	}
	else if (risk_rate >=30 && risk_rate <36){
		return colorY2
	}
	else if (risk_rate >=36 && risk_rate <42){
		return colorMidpointColor
	}
	else if (risk_rate >=42 && risk_rate <48){
		return colorO1
	}
	else if (risk_rate >=48 && risk_rate <54){
		return colorO2
	}
	else if (risk_rate >=54 && risk_rate <60){
		return colorR1
	}
	else if (risk_rate >=60 && risk_rate <66){
		return colorR2
	}
	else if (risk_rate >=66 && risk_rate <72){
		return colorR3
	}
	else if (risk_rate >=72 && risk_rate <78){
		return colorR4
	}


}

// depending on the risk rate the color forms a gradient with dark green being the lowest risk to dark red being the highest
for (i = 0;i < 10 ;i++ ){
	var location_visited = places_qatar[Math.floor(Math.random() * places_qatar.length)]

	var random_date = randomDate(new Date(2021, 0, 1), new Date());
	var date_visit = random_date.getDate()+'/'+(random_date.getMonth()+1)+'/'+random_date.getFullYear()
	var risk_rate = Math.round(Math.random() * 78)
	var element_id = 'location'+i
	var element_id_1 = 'risk'+i
	var element_id_2 = 'visited_place'+i
	color_gradient(risk_rate)
	document.getElementById(element_id).innerHTML = location_visited +'&nbsp&nbsp' + date_visit
	document.getElementById(element_id_1).innerHTML = `Risk Rate: <b>${risk_rate}<b>  %`
	document.getElementById(element_id_2).style.backgroundColor = color_gradient(risk_rate)
}


}


function covid_test(){
	var x = `<h1 class="prev-visit-h1">Covid Test</h1>
	<br>
	<div class="status_txt">
	<b class="x1">Current Status:</b> <span id="status_request"></span><br><br>
	<b class="x1">Ship Test Kit to:</b>
	<input type="text" placeholder="Enter Address" class="x1" id="ship_address"><br>
	<input type="checkbox" id="ship_home" class="x1" onclick="ship_to_home()">&nbsp<label style="font-size:0.7em;">Ship to Home Address</label>
	<br><br>
	<div class="calculated_price">
	<b style="font-size:1.35em;" class="x1">Calculated Price:</b><br><br>
	<div class="price x1" id="price_1"></div>
	<span><input type="button" value="Proceed" id="order-test" class="proceed_yes" onclick="request_test()"></span>
	<span><input type="button" value="Cancel" class="proceed_no" onclick="cancel()"></span>
	</div>
	</div>`
	document.getElementById('content-div').innerHTML = x
	data_div()
}

function vacinate(){
	var current_status = localStorage.getItem('status')
	if (current_status != 'healthy'){

		if (current_status == 'confirmed'){
		var msg = 'Sorry, it seems you have the COVID-19 virus. You cannot get vaccinated until you have recovered for 3 months.'
		}

		else if(current_status == 'suspected' || current_status == 'quarantined'){
			var msg = 'Sorry, it seems you are under quarantine. You cannot get vaccinated during your quarantine period. '
		}

		var xx = `<h1 class="prev-visit-h1">Vaccination</h1><br>
		<div class="status_txt">
		<b class="x1">Current Status:</b> <span id="status_request">Healthy</span><br><br>
		<div class="fail-appoinment">
		<b style="font-weight: bold;font-size: 1.3em;">Unable to create an appoinment</b><br><br>
		 ${msg}Please come back later!
		</div><br><button class="go-back" onclick="cancel()">Go Back</button></div> `

	}
	else{

		var already_requested = localStorage.getItem('vaccinate')
		if(already_requested == 'true'){
			var xx = `<h1 class="prev-visit-h1">Vaccination</h1><br>
			<div class="status_txt"><b class="x1">Current Status:</b> <span id="status_request">Healthy</span><br><br>
			<hr style="position: relative;left: -20px;top: -10px;">
			<div class="exist_appoinment">
			<h3>Appoinment Details</h3>
			<div class="details-vax x1">
			<b>Covid Center: </b><span id="covid_center_display"></span><br>
			<b>Appoinment Date: </b><span id="date_display_vax"></span><br>
			<b>Appoinment Time: </b><span id="time_display_vax"></span><br><br>
			<button class="cancel-vax" onclick="cancel_vax()">Cancel Appoinment</button>
			</div></div><br><button class="go-back" onclick="cancel()">Go Back</button></div>`
		}

		else {
	var xx = `<h1 class="prev-visit-h1">Vaccination</h1><br>
	<div class="status_txt">
	<b class="x1">Current Status:</b> <span id="status_request"></span><br><br>
	<label for="adddress" class="x1"> <b>Covid Center:</b></label>
	<p class="info_x x1">Please select the closest Covid Center for your appoinment!</p>
	
	<select name="address" id="address_covid" class="x1"  >
	<option hidden disabled selected value> -- select a center -- </option>
	<option value="Doha" class="white-background">Doha</option>
	<option value="Al Khor" class="white-background">Al Khor</option>
	<option value="Al Wakrah" class="white-background">Al Wakrah</option>
	<option value="Mesaieed" class="white-background">Mesaieed</option>
	<option value="Dukhan" class="white-background">Dukhan</option>
	<option value="Lusail" class="white-background">Lusail</option>
	<option value="Al Rayan" class="white-background">Al Rayan</option>
	<option value="Ras Laffan" class="white-background">Ras Laffan</option>
	<option value="Al Ruwais" class="white-background">Al Ruwais</option>
	<option value="Al Dhakira" class="white-background">Al Dhakira</option>
	</select><br><br>
	<label class="x1"><b>Please Select a Date:</b></label><br>
	<input type="date" name="" class="x1" width="50%;" id="appoinment-date"><br>
	<label class="x1"><b>Please Select the Time:</b></label><br>
	<input type="time" name="" class="x1" width="50%;" id="appoinment-time"><br>
		
	<span><input type="button" value="Proceed" id="order-test" class="proceed_yes" onclick="vaccinate()"></span>
	<span><input type="button" value="Cancel" class="proceed_no" onclick="cancel()"></span>
			
	</div> `}}
	document.getElementById('content-div').innerHTML = xx
	data_div()

	if(already_requested == 'true'){
		appoinment_details()
	}
}


function cancel_vax(){
	var ask_confirmation = confirm('Are you sure you want to cancel your appoinment.')
	if(ask_confirmation){
		localStorage.setItem('vaccinate', false)
		setTimeout(()=>{ alert('Your appoinment has been cancelled');vacinate()}, 1500)

	} 

	else{
		
	}
}

function cancel(){
	document.getElementById('content-div').style.backgroundColor = "rgb(255,210,180)"
	document.getElementById('content-div').innerHTML = old_data

}

function appoinment_details(){
	document.getElementById('covid_center_display').innerHTML = localStorage.getItem('covid_center')
	document.getElementById('date_display_vax').innerHTML = localStorage.getItem('appoinment_date')
	document.getElementById('time_display_vax').innerHTML = localStorage.getItem('appoinment_time')
}


places()



old_data = document.getElementById('content-div').innerHTML;

// places the data on the user such as home address etc
var time =  new Date();
console.log(time.getDate()+'/'+time.getMonth()+'/'+time.getFullYear())
document.getElementById('date').innerHTML =  time.getDate()+'/'+(time.getMonth()+1)+'/'+time.getFullYear()
document.getElementById('qid').innerHTML = localStorage.getItem('qid')
document.getElementById('phone').innerHTML = localStorage.getItem('phone')
document.getElementById('address').innerHTML = localStorage.getItem('address')
document.getElementById('name').innerHTML = localStorage.getItem('fullname')

var status = localStorage.getItem('status')
if (status == 'healthy'){
	document.getElementById('qr-code').src = 'qr-code/healthy.png'}
else if (status == 'confirmed'){
	document.getElementById('qr-code').src = 'qr-code/confirmed.png'}
else if (status == 'suspected'){
	document.getElementById('qr-code').src = 'qr-code/suspected.png'}
else if (status == 'unknown' || status == "quarantined"){
	document.getElementById('qr-code').src = 'qr-code/quarantined.png'}
function data_div(){
String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}
var status = localStorage.getItem('status')
if (status == 'healthy'){
	document.getElementById('status_request').innerHTML = status.capitalize();
}
else if (status == 'confirmed'){
	document.getElementById('status_request').innerHTML = status.capitalize();
}
else if (status == 'suspected'){
	document.getElementById('status_request').innerHTML = status.capitalize();
}
else if (status == 'unknown' || status == "quarantined"){
	document.getElementById('status_request').innerHTML = status.capitalize();
}

}



function request_test(){
	document.getElementById('ship_address').style.border="2px hidden red";
	var input_address = document.getElementById('ship_address').value
	if(input_address == '' || input_address == undefined){
		document.getElementById('ship_address').style.border="2px solid red";
		alert('Please fill in all the fields')
		return
	
	}

	var current_health_status = localStorage.getItem('status')
	
	function price_test(health){
		if (health == 'healthy' || health == 'confirmed'){

			return 20
	}

		else if(health == 'quarantined' || health == 'suspected'){
				return 0 
		}

		}

		// function for ordering the test kit
	function confirm_purchase(){
		var confirmPurchase = confirm(`Confirm purchase of Test Kit?\nPrice: ${price_test(current_health_status)} QAR`)

		if (confirmPurchase){
			document.getElementById('content-div').style.backgroundColor = "white"
xx = `	<h1 style="color: green;text-align: center;text-shadow: 2px 2px 10px lightgreen;position: relative;top: 10%;z-index: 1;font-size: 2.2em;">Purchase Completed</h1>
<img src="resources/images/success.webp" width="150%;" style="position: absolute;top: 60%;left: 50%;transform: translate(-50%, -50%);" height="110%;"><br>`
			document.getElementById('content-div').innerHTML = xx
			setTimeout(()=> {cancel()}, 5200);
			


		}

		else{

			xxx = `<h1 style="color: red;text-align: center;text-shadow: 2px 2px 10px salmon;position: relative;top: 20%;">Purchase Cancelled</h1>
		<img src="resources/images/icon/logo.png" class="loading-logo" width="30%;"><br>
		<p style="color:red; position: relative;top: 55%;text-align: center;font-size: 1.2em;" id="animate-cancel">Cancelling order</p>`
			document.getElementById('content-div').innerHTML = xxx
			for (i =0 ; i <2 ; i++){
				setTimeout(()=> {document.getElementById('animate-cancel').innerHTML = 'Cancelling order'}, 500)
				setTimeout(()=> {document.getElementById('animate-cancel').innerHTML = 'Cancelling order.'}, 1000)
				setTimeout(()=> {document.getElementById('animate-cancel').innerHTML = 'Cancelling order..'}, 2000)
				setTimeout(()=> {document.getElementById('animate-cancel').innerHTML = 'Cancelling order...'}, 3000)
				setTimeout(()=> {document.getElementById('animate-cancel').innerHTML = 'Cancelled Order'}, 4600)
				setTimeout(()=> {cancel()}, 5700)
				
			}
		}

	}


	document.getElementById('price_1').innerHTML = price_test(current_health_status) +'&nbspQAR'

	setTimeout(()=> {confirm_purchase()}, 1500)


}



function ship_to_home(){
	if(document.getElementById('ship_home').checked){
		document.getElementById('ship_address').value = localStorage.getItem('address')

	}

	else{
		document.getElementById('ship_address').value = ""
	}
}




function vaccinate(){
	document.getElementById('address_covid').style.border="2px hidden red";
	document.getElementById('appoinment-date').style.border="2px hidden red";
	document.getElementById('appoinment-time').style.border="2px hidden red";
	var covid_center = document.getElementById('address_covid').value
	var appoinment_date = document.getElementById('appoinment-date').value
	var appoinment_time = document.getElementById('appoinment-time').value

	var input_full = true

	if (covid_center == ""){

		document.getElementById('address_covid').style.border="2px solid red";
		input_full = false;
	}

	if (appoinment_date == ""){
		document.getElementById('appoinment-date').style.border="2px solid red";
		input_full = false;
	}

	if (appoinment_time == ""){
		document.getElementById('appoinment-time').style.border="2px solid red";
		input_full = false;

	}

	if(input_full == false){
		alert('Please fill in all the required fields')
		return
	}

	var CurrentDate = new Date();
	var GivenDate = new Date(appoinment_date);
	if(GivenDate < CurrentDate){
		alert('Please request a date starting from tomorrow onwards.')
		document.getElementById('appoinment-date').style.border="2px solid red";
		return
	}

	var confirmAppoinment = confirm(`Appoinment Confirmation\nCovid Center: ${covid_center}\nAppoinment Date: ${appoinment_date}
Appoinment Time: ${appoinment_time}`)

	if (confirmAppoinment){
		localStorage.setItem('vaccinate', true)
		localStorage.setItem('covid_center', covid_center)
		localStorage.setItem('appoinment_date',appoinment_date)
		localStorage.setItem('appoinment_time',appoinment_time)
		alert('Appoinment has been scheduled.')
		setTimeout(() => {cancel()},2000)
	}

	else{

		alert('Appoinment request has been cancelled.')

	}

	document.getElementById('address_covid').value = ""
	document.getElementById('appoinment-date').value = ""
	document.getElementById('appoinment-time').value = ""

}