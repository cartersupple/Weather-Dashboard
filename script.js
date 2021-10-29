var cityList = [];
var id = "c6d0a2598a833c465f90853cbcfc28ec";
// stores searched cities to localStorage
function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cityList));
    console.log(cityList)
}
// creates a button to click to generate weather data for an entered city
function makeCityList() {
    $(".cityList").empty();
    cityList.forEach(function(city){
        $(".cityList").prepend($(`<button class="list-group-item list-group-item-action cityButton" data-city="${city}">${city}</button>`));
    })
}
// grabs cityList from localStorage, calls owAPI to load data for the searched city if it exists (spelled correctly and is a real city) 
function init(){
    var searchedCities = JSON.parse(localStorage.getItem("cities"));

    if (searchedCities !== null){
        cityList = searchedCities;
    }
}
makeCityList();

if(cityList) {
    var cityName = "Oakland"
    cityList[cityList.length - 1]
    currentWeather(cityName, id);
    cityForecast(cityName, id);
}

// grabs current weather data from Open Weather API for entered city
function currentWeather(cityName, id) {
    var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${id}`;
    var cityLatitude;
    var cityLongitude;

    $.ajax ({
        url: weatherURL,
        method: "GET"
    }).then(function (data){
        $(".cityNow").append(
            `<div class="row ml-1">
            <h3 class="mr-3">${data.name} (${(new Date(1000 * data.dt).getUTCMonth()) + 1}/${(new Date(1000 * data.dt).getUTCDate()) - 1}/${new Date(1000 * data.dt).getUTCFullYear()})</h3>
            <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
        </div>`
        )
        $(".cityNow").append(`<p>Temperature: ${data.main.temp} &degF</p>`)
        $(".cityNow").append(`<p>Humidity: ${data.main.humidity} %</p>`)
        $(".cityNow").append(`<p>Wind: ${data.wind.speed} mph</p>`)
        cityLatitude = data.coord.lat;
        cityLongitude = data.coord.lon;
        getUVI(id, cityLatitude, cityLongitude);
    })
}

function getFiveDay(cityName, id) {
    var fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${thisCity}&units=imperial&appid=${id}`;

    $.ajax({
        url: fiveDayURL,
        method: "GET"
    }).then(function(data) {
        for (i = 0; i < data.list.length; i++){
            if(data.list[i].dt_txt.search("15:00:00") != -1) {
                var weatherDate = data.list[i];
                $(".forecast").append(
                    `<div class="card bg-primary shadow m-4">
                    <div class="card-body">
                        <h4 class="card-title">${(new Date(1000 * forecastDate.dt).getUTCMonth()) + 1}/${new Date(1000 * forecastDate.dt).getUTCDate()}/${new Date(1000 * forecastDate.dt).getUTCFullYear()}</h4>
                        <div class="card-text">
                            <img src="http://openweathermap.org/img/w/${forecastDate.weather[0].icon}.png">
                            <p class="card-text">Temp: ${forecastDate.main.temp} &degF</p>
                            <p class="card-text">Humidity: ${forecastDate.main.humidity} %</p>
                        </div>
                    </div>
                </div>`
                );
            }
        }
    })
}

init();