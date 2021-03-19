









var APIKey = "8192203cac5ae6d369c41fb47e14d962";

// function to get current weather by city 
var getWeather = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
    fetch(apiUrl).then(function(response){
        // request was succesful
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                displayCurrent(data);
            });
        } else {
            alert("Error: " + response.status);
        }
    });
};

// function to display current weather
var displayCurrent = function(currentWeather) {
    var cityName = currentWeather.name;
    var currentDate = new Date(currentWeather.dt*1000);
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var year = currentDate.getFullYear();
    $("#city-name").text(cityName + " " + month + "/" + day + "/" + year);
    $("#current-icon").attr("src", "http://openweathermap.org/img/wn/" + currentWeather.weather[0].icon + "@2x.png");
    $("#temperature").text("Temperature: " + currentWeather.main.temp + " \xB0F");
    $("#humidity").text("Humidity: " + currentWeather.main.humidity + " %");
    $("#wind-speed").text("Wind Speed: " + currentWeather.wind.speed + " MPH");
    // getting lat and lon to call a different API for UV index
    var lat = currentWeather.coord.lat;
    var lon = currentWeather.coord.lon;
    GetUvIndex(lat, lon);
    
};
// function to get UV index API
var GetUvIndex = function (lat, lon) {
    var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;
    console.log(apiURL)
    fetch(apiURL).then(function(response) {
        // request was succesful
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                var UVIndex = data.current.uvi;
                UVIndexPrint(UVIndex);
            });
        } else {
            alert("Error: " + response.status);
        }
    });
};

// function to print UV index and show different collors depending if UV index (favorable-green moderate-yellow or severe-red)
var UVIndexPrint = function(index) {
    console.log(index);
    // clear any previous span on #UV-index p
    $("#UV-index").empty();
    $("#UV-index").text("UV Index: ");
    $("#UV-index").append("<span id='index' class='badge bg-danger p-1 text-light fs-6'></span>");
    $("#index").text(index);


};



getWeather("Midland");