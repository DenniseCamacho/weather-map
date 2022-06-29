"use strict";
$(document).ready(function () {

    mapboxgl.accessToken = MAPBOX_API_TOKEN;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: [-122.420679, 37.772537], // starting position [lng, lat]
        zoom: 13, // starting zoom
        style: 'mapbox://styles/mapbox/streets-v11', // style URL or style object
        hash: true
    });

    $.get('https://api.openweathermap.org/data/2.5/onecall', {
        lat: 29.4252,
        lon: -98.4916,
        appid: WEATHER_TOKEN,
        exclude: 'minutely,hourly,current,alerts',
        units: 'imperial'
    }).done(function (data) {

        function doSearchForecast(){
            let theSearchBar = document.getElementById('searchbar');
            let theSearchButton = document.getElementById('doSearchOnClick');
            theSearchButton.addEventListener('click', (e)=>{
                e.preventDefault();
                console.log('I\'ve been clicked!');
                let theUsersSearchText = theSearchBar.value;

               let theCoordinates = geocode(theUsersSearchText, MAPBOX_API_TOKEN); //returns coordinates
                console.log(theCoordinates);

                // reverseGeocode(theCoordinates, MAPBOX_API_TOKEN);
            });
            //take the value from the searchbar,
            //use the value to display a new forecast based on the city, state.
        }
        doSearchForecast();




        function doMakeWeatherContainers(){
            let divStart = `<div class="col-12 col-md-6 col-lg-2 text-center pb-2">`;
            let divEnd = `</div>`
            data.daily.forEach((item, index, array) => {
                // console.log(item.weather[0].icon);
                // console.log(item.weather[0].description);
                if (index <= 5) {
                    let weatherIcon = item.weather[0].icon
                    let unixTime = item.dt;
                    let w_date = new Date(unixTime * 1000);
                    let w_date2 = w_date.toLocaleString("en-US");
                    let w_date3 = w_date2.split(',').join('');
                    let w_tempMin = item.temp.min;
                    let w_tempMax = item.temp.max;
                    let w_Description = item.weather[0].description;
                    let w_Humidity = item.humidity;
                    let w_Wind = item.wind_speed;
                    let w_Pressure = item.pressure;


                    let weatherContainers = document.getElementById('doDisplayWeatherHere');
                    weatherContainers.innerHTML += `
           ${divStart}
           <h1 class="fs-5 text-break bg-light">${w_date3}</h1>
           <img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${w_Description}"><br>
           ${w_tempMin}/
           ${w_tempMax}<br>
           ${w_Description}<br>
           <details class="bg-light">
           Humidity: ${w_Humidity}<br>
           Wind: ${w_Wind}<br>
           Pressure: ${w_Pressure}
           </details>
           ${divEnd}
           ` //tic
                } //-if end
            }); //-foreach end
        }
        doMakeWeatherContainers(data);


    }).fail(function (jqXhr, status, error) {
        console.log(jqXhr);
        console.log(status);
        console.log(error);
    });

});