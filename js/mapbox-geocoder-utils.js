"use strict";

/***
 * geocode is a method to search for coordinates based on a physical address and return
 * @param {string} search is the address to search for the geocoded coordinates
 * @param {string} token is your API token for MapBox
 * @returns {Promise} a promise containing the latitude and longitude as a two element array
 *
 * EXAMPLE:
 *
 *  geocode("San Antonio", API_TOKEN_HERE).then(function(results) {
 *      // do something with results
 *  })
 *
 */

function geocode(search, token) {
	var baseUrl = 'https://api.mapbox.com';
	var endPoint = '/geocoding/v5/mapbox.places/';
	return fetch(baseUrl + endPoint + encodeURIComponent(search) + '.json' + "?" + 'access_token=' + token)
		.then(function(res) {
			return res.json();
			// to get all the data from the request, comment out the following three lines...
		}).then(function(data) {
			// return data.features[0].center;
			// return console.log(data.features[0].center);

			let newCoordinates = {
				lat: '',
				lng: ''
			};
			let theCoordinates = data.features[0].center;
			theCoordinates.forEach((item, index, array)=>{
				// console.log(index);
				// console.log(item.toFixed(3));
				if (index === 1 ) newCoordinates.lat = parseFloat(item.toFixed(3));
				if (index === 0 ) newCoordinates.lng = parseFloat(item.toFixed(3));
			});

			return newCoordinates;

		});
}

// function geocode(search, token) {
// 	let baseUrl = 'https://api.mapbox.com';
// 	let endPoint = '/geocoding/v5/mapbox.places/';
// 	return fetch(baseUrl + endPoint + encodeURIComponent(search) + '.json' + "?" + 'access_token=' + token)
// 		.then(function(res) {
// 			return res.json();
// 			// to get all the data from the request, comment out the following three lines...
// 		}).then(function(data) {
//
// 			return data.features[0].center;
//
// 			// return console.log(data.features[0].center);
// 			// let theCoordinates = data.features[0].center;
// 			// theCoordinates.forEach((item, index, array)=>{
// 			// 	// console.log(index);
// 			// 	console.log(item.toFixed(3));
// 			// });
//
// 			// function doAddNewCoordinates(){
// 			// 	//take the coordinates of the weather map,
// 			// 	// place them in map, }
//
// 		});
// }


/***
 * reverseGeocode is a method to search for a physical address based on inputted coordinates
 * @param {object} coordinates is an object with properties "lat" and "lng" for latitude and longitude
 * @param {string} token is your API token for MapBox
 * @returns {Promise} a promise containing the string of the closest matching location to the coordinates provided
 *
 * EXAMPLE:
 *
 *  reverseGeocode({lat: 32.77, lng: -96.79}, API_TOKEN_HERE).then(function(results) {
 *      // do something with results
 *  })
 *
 */
function reverseGeocode(coordinates, token) {
	let baseUrl = 'https://api.mapbox.com';
	let endPoint = '/geocoding/v5/mapbox.places/';
	return fetch(baseUrl + endPoint + coordinates.lng + "," + coordinates.lat + '.json' + "?" + 'access_token=' + token)
		.then(function(res) {
			return res.json();
		})
		// to get all the data from the request, comment out the following three lines...
		.then(function(data) {
			// return data.features[0].place_name;
			 return data.features[0].place_name;
		});

}