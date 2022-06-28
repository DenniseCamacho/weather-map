"use strict";

$(document).ready(function () {

    $.get('https://api.openweathermap.org/data/2.5/onecall', {
        lat: 29.4252,
        lon: -98.4916,
        appid: WEATHER_TOKEN,
        exclude: 'minutely,hourly,current,alerts',
        units: 'imperial'
    }).done(function (data) {
        // console.log(data);
        for (let i = 0; i < 5; i++) {
            // console.log(data.daily[i]);
            let temperature_min     = data.daily[i].temp.min;
            let temperature_max     = data.daily[i].temp.max;
            let weather_date        = Date(data.daily[i].dt);
            let weather_description = data.daily[i].weather[0].description
            let weather_humidity    = data.daily[i].humidity;
            let weather_wind        = data.daily[i].wind_speed;
            let weather_pressure    = data.daily[i].pressure;

            let weatherContainers = document.getElementById('doDisplayWeatherHere');
            weatherContainers.innerHTML += `
                        ${weather_date} <br>
                      ${temperature_min}<br>
                      ${temperature_max}<br>
                      ${weather_description}<br>
                      ${weather_humidity}<br>
                      ${weather_wind}<br>
                      ${weather_pressure}

           `
        }
    }).fail(function (jqXhr, status, error) {
        console.log(jqXhr);
        console.log(status);
        console.log(error);
    });

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