// e86b2b02a3aa4998b50154503241506 api key
const Days = ['Saturday' , 'Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' ,'Friday']
const Months = ['Jan' , 'Feb' ,'Mar' , 'Apr' ,'May' ,'Jun' ,'Jul' ,'Aug' ,'Sep' ,'Oct' ,'Nov' ,'Dec' ,]
	




async function Api(loc){
	let load = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e86b2b02a3aa4998b50154503241506&q=${loc}&days=3`)
	
	if (load.ok && 400!=load.status){
		let FinalLoad = await load.json();
		displayCurrentWeather(FinalLoad.location, FinalLoad.current),
		DisplayOtherTwoDaysWeather(FinalLoad.forecast.forecastday)
	}
}


document.querySelector('.myInput').addEventListener("keyup", loc=>{
    Api(loc.target.value)
})


function displayCurrentWeather(x,y){
	if (y!=null){
	let date = new Date(y.last_updated)
	let Data = 
	`	
						<div class="col-md-4">
							<div class="card MyCard">
								<div class="card-header myCardHeader text-center d-flex justify-content-between">
									<span class="text-secondary">${Days[date.getDay()]}</span>
									<span class="text-secondary">${date.getDate()+Months[date.getMonth()]}</span>
								  </div>
								  <div class="card-body myCardBody p-5 ">
									  <span class="text-secondary">${x.name}</span>
										<div class="ftSize">${y.temp_c}<sup>O</sup>C</div>
										
										<img class="w-25" src="https:${y.condition.icon}" alt="">
										<p class="card-text clearText">${y.condition.text}</p>
								  </div>
							  </div>
						</div>
`
document.getElementById('Weather').innerHTML=Data
	}
}



function DisplayOtherTwoDaysWeather(x){
	let date = new Date (x.date)
	let z = ``;
	//start from one to make sure it will skip the first day
	for(let i = 1 ; i < x.length;i++){
		z=`

						<div class="col-md-4">
							<div class="card MyCard">
								<div class="card-header myCardHeader text-center">
									<span class="text-secondary">${Days[new Date(x[i].date.replace(" ", "T")).getDay()]}</span>
								  </div>
								  <div class="card-body myCardBody p-5 ">
									  <img class="w-15" src="https:${x[i].day.condition.icon}" alt="">
										<h1 class="card-title">${x[i].day.maxtemp_c}</h1>
										<p class="text-secondary">${x[i].day.mintemp_c}</p>
										<p class="card-text clearText">${x[i].day.condition.text}</p>
								  </div>
							  </div>
						</div>
						`
						document.getElementById('Weather').innerHTML+=z				
					}
}

// Add Cairo As Default Value.
Api('Cairo');

