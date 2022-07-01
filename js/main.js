"use strict";
$(document).ready(function () {
    const weatherContainers = {
        doMakeWeatherContainers: function (data) {
            let divStart = `<div class="col-12 col-md-6 col-lg-2 text-center pb-2">`;
            let divEnd = `</div>`
            //RUN THROUGH WEATHER DATA, DISPLAYING EACH ITEM IN OBJECT
            data.daily.forEach((item, index, array) => {
                // console.log(item.weather[0].icon);
                // console.log(item.weather[0].description);
                //DISPLAY FORECAST FOR 6 DAYS
                if (index <= 5) {
                    let weatherIcon = item.weather[0].icon
                    //CONVERTING TO UNIX TIME:
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
                    //GET THE ELEMENT WITH THE ID OF 'doDisplayWeatherHere'
                    let weatherContainers = document.getElementById('doDisplayWeatherHere');
                    //MAKE ELEMENTS IN THAT ELEMENT
                    //https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
                    weatherContainers.insertAdjacentHTML("beforeend", `
                
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
                      
           
           `)//tic
                } //-if end
            }); //-foreach end
        }
    }
    const userSetsCoordinates = {
        doSetCoordinates: function () {
            //GRAB THE SEARCHBAR BY ID
            let theSearchBar = document.getElementById('searchbar');
            //GRAB THE BUTTON BY ID
            let theSearchButton = document.getElementById('doSearchOnClick');
            //ADD A FUNCTION TO EXECUTE UPON CLICKING TO THE BUTTON
            theSearchButton.addEventListener('click', (e) => {
                //PREVENT REFRESH
                e.preventDefault();
                //CHECK IF EVENT IS FUNCTIONING CORRECT.
                console.log('I\'ve been clicked!');
                //GRAB THE USERS TEXT IN THE SEARCHBAR
                let theUsersSearchText = theSearchBar.value;
                //  GEOCODE RETURNS THE COORDINATES.
                geocode(theUsersSearchText, MAPBOX_API_TOKEN)
                    .then((coordinateResults) => {
                        console.log(coordinateResults);
                        //what to do with the coordinates...
                        //use the users coordinates to set lat, lng on api call THEN
                        $.get('https://api.openweathermap.org/data/2.5/onecall', {
                            lat: coordinateResults.lat,
                            lon: coordinateResults.lng,
                            appid: WEATHER_TOKEN,
                            exclude: 'minutely,hourly,current,alerts',
                            units: 'imperial'
                        }).done(function (data) {
                            //CLEARS CURRENT CONTENT :)
                            let currentForecast = document.getElementById('doDisplayWeatherHere');
                            currentForecast.innerHTML = '';
                            //THEN MAKES THE CONTAINERS
                            weatherContainers.doMakeWeatherContainers(data);
                        }).fail(function (jqXhr, status, error) {
                            console.log(jqXhr, 'is jqxhr');
                            console.log(status, 'is status');
                            console.log(error, 'is error');
                        });
                    })//end of .then
            }); // end of event listener
        }//end of doSetCoordinates
    }//end of userSetsCoordinates
    userSetsCoordinates.doSetCoordinates();


    $.get('https://api.openweathermap.org/data/2.5/onecall', {
        lat: 29.4252,
        lon: -98.4916,
        appid: WEATHER_TOKEN,
        exclude: 'minutely,hourly,current,alerts',
        units: 'imperial'
    }).done(function (data) {
        //with this data, execute this function.
        //(make the containers)
        weatherContainers.doMakeWeatherContainers(data);
    }).fail(function (jqXhr, status, error) {
        console.log(jqXhr);
        console.log(status);
        console.log(error);
    });

    mapboxgl.accessToken = MAPBOX_API_TOKEN;
    let map = new mapboxgl.Map({
        container: 'map', // container ID
        center: [-98.493, 29.424], // starting position [lng, lat]
        zoom: 13, // starting zoom
        style: 'mapbox://styles/mapbox/streets-v11', // style URL or style object
        hash: true
    });
//DEFAULT MARKER IN SAN ANTONIO
    let marker = new mapboxgl.Marker({
        draggable: true
    })
        .setLngLat([-98.491, 29.425])
        .addTo(map);
});


//[] adjust map marker to change based on search value.
//[] adjust forecast to change based on map marker coordinates.
//[x] display 5-day forecast on window
//[x] display map on window
//[x] display map marker on map
//[x] adjust forecast to display search value coordinates.
//[x] take the coordinate from the users search value,
// place them in the get request to display data from users search value.

