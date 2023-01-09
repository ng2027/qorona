

function post_json_data(
	date,
	today_confirmed, 
	today_death, 
	today_recovered,
	t_confirmed,
	t_death, 
	t_recovered, 
	active_case, 
	recovery_rate, 
	death_rate)
{
	document.getElementById('date-placeholder').innerHTML = date;
	document.getElementById('today-confirm').innerHTML = today_confirmed;
	document.getElementById('today-death').innerHTML = today_death;
	document.getElementById('today-recover').innerHTML = today_recovered;
	document.getElementById('total-confirm').innerHTML = t_confirmed;
	document.getElementById('total-death').innerHTML = t_death;
	document.getElementById('total-recover').innerHTML = t_recovered;
	document.getElementById('active-cases').innerHTML = active_case;
	document.getElementById('recovery-rate').innerHTML = recovery_rate.toFixed(3)+'%';
	document.getElementById('death-rate').innerHTML = death_rate.toFixed(3)+'%';
	
	// posts the obtained data into the html container

}

// function used to get data from endpoint

// requests a get request from the endpoint in the form of a json file

const xhr = new XMLHttpRequest();

var time =  new Date();
var today_hour = time.getHours()

var today_date = time.getDate()+'/'+(time.getMonth()+1)+'/'+time.getFullYear()


xhr.open('GET', 'https://corona-api.com/countries/qa');
xhr.send()
xhr.responseType - "json"
xhr.onload = () => {



	// parses through data
	const base_response = JSON.parse(xhr.response);
	response = base_response['data']

	var rate = response['latest_data']['calculated']
	var death_rate = rate['death_rate']
	var recovery_rate = rate['recovery_rate']

	var total_confirmed = response['latest_data']['confirmed']
	var total_death = response['latest_data']['deaths']
	var total_recovered = response['latest_data']['recovered']
	var active_cases = response['latest_data']['critical']

	let today_data_test = response['today']
	var today_confirmed_test = today_data_test['confirmed']

	// updates page according to current time, so fit the request from the endpoint
	if ((today_hour >= 16 || today_hour < 5) && today_confirmed_test != 0){
		let today_data = response['today']
		var today_confirmed = today_data['confirmed']
		var today_death = today_data['deaths']
		var today_recovered = today_confirmed - ( active_cases - response['timeline'][0]['active'])




	}

	else if (today_hour >= 5 && today_hour <= 21){


		let today_data = response['timeline'][0]
		var today_confirmed = today_data['new_confirmed']
		var today_death = today_data['new_deaths']
		var today_recovered = today_data['new_recovered']
		var active_cases = today_data['active']


	}

	

	post_json_data(
		today_date,
		today_confirmed,
		today_death,
		today_recovered,
		total_confirmed,
		total_death,
		total_recovered,
		active_cases,
		recovery_rate,
		death_rate
		)


			

}


