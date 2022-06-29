"use strict";

$(document).ready(function () {

    mapboxgl.accessToken = MAPBOX_API_TOKEN;
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-98.4936, 31.4241],
        zoom: 5
    });

    let div1 = `<div class="col-12 col-md-2 col-lg-2">`;
    let divEnd = `</div>`

    let weatherCoordinates = [
        29.4252,
        -98.4916
    ];


    $.get('https://api.openweathermap.org/data/2.5/onecall', {
        lat: weatherCoordinates[0],
        lon: weatherCoordinates[1],
        appid: WEATHER_TOKEN,
        exclude: 'minutely,hourly,current,alerts',
        units: 'imperial'
    }).done(function (data) {
       console.log(data.daily.forEach((item, index, array)=>{
           console.log(item.weather[0].description);

           if (index <= 5) {
               let w_date = new Date(item.dt);
               let w_tempMin = item.temp.min;
               let w_tempMax = item.temp.max;
               let w_Description = item.weather[0].description;
               let w_Humidity = item.humidity;
               let w_Wind = item.wind_speed;
               let w_Pressure = item.pressure;


               let weatherContainers = document.getElementById('doDisplayWeatherHere');
               weatherContainers.innerHTML += `
           ${div1}
           ${w_date}
           ${w_tempMin}
           ${w_tempMax}
           ${w_Description}
           ${w_Humidity}
           ${w_Wind}
           ${w_Pressure}
           ${divEnd}
           `
           }
       }));
        // console.log(data);
        // for (let i = 0; i < 6; i++) {
        //     console.log(data);
        //     let temperature_min = data.daily[i].temp.min;
        //     let temperature_max = data.daily[i].temp.max;
        //     let weather_date = Date(data.daily[i].dt);
        //     let weather_description = data.daily[i].weather.description
        //     let weather_humidity = data.daily[i].humidity;
        //     let weather_wind = data.daily[i].wind_speed;
        //     let weather_pressure = data.daily[i].pressure;
        //
        //     let weatherContainers = document.getElementById('doDisplayWeatherHere');
        //     weatherContainers.innerHTML += `
        //               <div class="col-sm-12 col-md-4 col-lg-2 text-center mt-3">
        //                 <h3 class="bg-light">${weather_date}</h3>
        //               <label for=""></label>${temperature_min}<br>
        //               <label for=""></label>${temperature_max}<br>
        //               <label for="">
        //               Description:
        //               </label> ${weather_description}<br>
        //               <details class="">
        //               <label for=""></label>${weather_humidity}<br>
        //               <label for=""></label>${weather_wind}<br>
        //               <label for=""></label>${weather_pressure}
        //               </details>
        //               </div>
        //
        //    `
        // }
    }).fail(function (jqXhr, status, error) {
        console.log(jqXhr);
        console.log(status);
        console.log(error);
    });

    // mapboxgl.accessToken = MAPBOX_API_TOKEN;
    // const map = new mapboxgl.Map({
    //     container: 'map', // container ID
    //     style: 'mapbox://styles/mapbox/streets-v11', // style URL
    //     center: [-98.4916, 29.4252], // starting position [lng, lat]
    //     zoom: 9 // starting zoom
    // });

    // "use strict";
    // $('#clickme').onclick(function () {
    //     $('#user_display').html($('#user_input').val());
    // });
    // mapboxgl.accessToken = MAPBOX_API_TOKEN;
    // const map = new mapboxgl.Map({
    //     container: 'map', // container ID
    //     style: 'mapbox://styles/mapbox/streets-v11', // style URL
    //     center: [-98.4916, 29.4252], // starting position [lng, lat]
    //     zoom: 9 // starting zoom
    // });
    // // Create a default Marker and add it to the map.
    // const marker1 = new mapboxgl.Marker({
    //     draggable: true
    // })
    //     .setLngLat([-98.4916, 29.4252])
    //     .addTo(map);
    // marker1.on('drag', (e) => {
    //
    //     let newMarkerLat = parseFloat((marker1._lngLat.lat).toFixed(3));
    //     let newMarkerLng = parseFloat((marker1._lngLat.lng).toFixed(3));
    //     console.log(newMarkerLng, newMarkerLat)
    //     map.setLngLat([newMarkerLng, newMarkerLat]);
    // });
    // //weather data code below;
    // $.get('https://api.openweathermap.org/data/2.5/onecall', {
    //     lat: parseFloat((marker1._lngLat.lat).toFixed(3)),
    //     lon: parseFloat((marker1._lngLat.lng).toFixed(3)),
    //     appid: WEATHER_TOKEN,
    //     exclude: 'minutely,hourly,current,alerts',
    //     units: 'imperial'
    // }).done(function (data) {
    //     console.log(data);
    //     var html = "";
    //     for (var i = 0; i < 5; i++) {
    //         const date1 = Date(data.daily[i].dt);
    //         // const date2 = date1.toUTCString();
    //
    //         html +=
    //             "<section class='everyCard'>" +
    //             "<span>" + date1 + "</span>" +
    //             "<span>" + "Temperature: " + "</span>" + "<b>" + parseInt(data.daily[i].temp.max) + "<span>" +
    //             "º / " +
    //             "</span>" +
    //             parseInt(data.daily[i].temp.min)
    //             + "º</b><br>" +
    //             "Description: " + "<b>" + data.daily[i].weather[0].description
    //             + "</b><br>" +
    //             "<details>" +
    //             "Humidity: " + "<b>" + data.daily[i].humidity
    //             + "</b><br>" +
    //             "Wind: " + "<b>" + data.daily[i].wind_speed
    //             + "</b><br>" +
    //             "Pressure: " + "<b>" + data.daily[i].pressure
    //             + "</b>" +
    //             "</details>" +
    //             "</section>"
    //     }
    //     $("#allWeatherContainers").html(html);
    //
    // }).fail(function (jqXhr, status, error) {
    //     console.log(jqXhr);
    //     console.log(status);
    //     console.log(error);
    // });
});