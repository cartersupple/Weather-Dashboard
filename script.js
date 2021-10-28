var cityList = [];
var APIkey = "c6d0a2598a833c465f90853cbcfc28ec";
// stores searched cities to localStorage
function storeCity() {
    localStorage.setItem("city", JSON.stringify(cityList));
}
// creates a button to click to generate weather data for an entered city
function makeCityList() {
    $(".cityList").empty();
    cityList.forEach(function(city){
        $(".cityList").prepend($(`<button class="list-group-item list-group-item-action cityBtn" data-city="${city}">${city}</button>`));
    })
}
// grabs cityList from localStorage, calls owAPI to load data for the searched city if it exists (spelled correctly and is a real city) 
function grabCity(){
    var searchedCities = JSON.parse(localStorage.getItem("cities"));

    if (searchedCities !== null){
        cityList = searchedCities;
    }
}
makeCityList();

if(cityList) {
    var cityName = cityList[cityList.length - 1]
    currentWeather(cityName, id);
    cityForecast(cityName, id);
}
// grabs weather data from Open Weather API for entered city
function currentWeather(cityName, id) {
    var APIURL = "https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${id}`;"
    var latitude;
    var longitude;

}

