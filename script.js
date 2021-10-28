var cityList = [];
var APIkey = "c6d0a2598a833c465f90853cbcfc28ec";
// stores searched cities to localStorage
function storeCity() {
    localStorage.setItem("city", JSON.stringify(cityList));
}
// creates a button to click to generate weather data for an entered city
function citylist() {
    $(".cityList").empty();
    cityList.forEach(function(city){
        $(".cityList").prepend($(`<button class="list-group-item list-group-item-action cityBtn" data-city="${city}">${city}</button>`));
    })
}
