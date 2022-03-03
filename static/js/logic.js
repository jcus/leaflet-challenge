// create the title layer for the background of the map
map.attributionControl.setPrefix(false)

var defaulMap = L.titleLayer('https://{s}.title.openstreetmap.org/{z}/{x}/{y}.png',{
	maxzoom: 19, atribution: '&copy';
	<a href= 'https://www.openstreetmap.org/copyright'> OpenStreetMap</a> 
//	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

//https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
//https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php),{(x)}
//

// greyscale layer
var greyscale = L.tileLayer('https://stamen-titles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map titles by <a href="http://stamen.com">Stamen Design</a>,
	<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; 
	<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd', minZoom: 0, maxZoom: 20, ext: 'png'
});

// watercolor layer
var waterColor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, 
	<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; 
	<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', 
	subdomains: 'abcd', minZoom: 1, maxZoom: 16, ext: 'jpg'
});

//topography
let topoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap
	</a>
	contributors,
	<a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; 
	<a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)
});

//make a basemaps object
let basemaps = {
	Greyscale: greyscale, Watercolor: waterColor, Topography: topoMap, Default: defaultMap
};

// create a map object
var myMap = L.map("map", {
    center: [36.7783, -119.4179], zoom: 5,
	layers: [greyscale, waterColor, topoMap, defaultMap]
});
// add the default map to the map
defaultMap.addTo(myMap);

// get data for the tectonic plates and draw on the map
// variable to hold the tectonic plates layer
let tectonicplates = new L.layerGroup();

// call the api tp get the info for the tectonic plates
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json")
.then(function(plateData){
	// console log to make sure the data loaded
	// console.log(plateData)
	
	// load the data using geojson and add to the tectonic layer group
	L.geoJson(plateData,{
		// add styling to make the lines visible
		color: "yellow", weight: 1
	}).addTo(tectonicplates);
});

// add the tectonic plates to the map
tectonicplates.addTo(myMap);

// variable to hold the earthquake layer
let earthquakes = new L.layerGroup();

// retrieve the data for the earthquakes and populate the layergroup
// call the USGS GeoJson API
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
.then(
	function(earthquakeData){
		// console log to make sure the data is loaded
		console.log(earthquakeData);
		// plot circles, where the radius is dependent on the magnitude
		// color is dependent on the depth
		
		// make a function that chooses the color of the data point
		function dataColor(depth){
			if (depth > 90)
				return "red"
			else if(depth > 70)
				return "#fc4903"
			else if(depth > 50)
				return "#fc8403"
			else if(depth > 30)
				return "#fcad03"
			else if(depth > 10)
				return "#cafc03"
			else
			return "green";
		}

		// make a function that determines the size of the radius
		function radiusSize(mag){
			if (mag == 0)
				return 1; // makes sure a 0 mag earthquake shows up
			else
				return mag * 5; // makes sure the circle is on the map
		}
		
		// add on to the style for each data point
		function dataStyle(feature)
		{
			return {
				opacity: 0.5,
				fillOpacity: 0.5,
				fillColor: dataColor(feature.geometry.coordinates[2]), // use index 2 for depth
				color: "000000", // black outline
				radius: radiusSize(feature.properties.mag), // grabs the magnitude
				weight: 0.5,
				stroke: true
			}
		}

		// add the geojson data to the earthquake layer group
		L. geoJson(earthquakeData, {
			// make each feature that is on the map, each marker is a circle
			pointToLayer: function(feature, latlng) {
				return L.circleMarker(latlng);
			},
			// set the style for each marker
			style: dataStyle, // calls the data style function and passes in the earthquake data
			// add popups
			onEachFeature: function(feature, layer){
				layer.bindPopup(`Magnitude: <b>${feature.properties.mag}</b><br>
								Depth: <b>${feature.geometry.coordinates[2]}</b><br>
								Location: <b>${feature.properties.place}</b>`);
			}
		}).addTo(earthquakes);
	}
);

// add the earthquake layer to the map
earthquakes.addTo(myMap);

// add the overlay for the tectonic plates and for the earthquakes
let overlays = {
	"Tectonic Plates": tectonicplates,
	"Earthequake Data": earthquakes
};

// add the layer control
L.control
	.layers(basemaps, overlays)
	.addTo(myMap);

// add the legend to the map
let legend = L.control({
	position: "bottomright"
});

// add the properties for the legend
legend.onAdd = function() {
	// make a div for the legend to appear on the page
	let div = L.DomUtil.create("div", "info legend");

	// set up the intervals
	let intervals = [-10, 10, 30, 50, 70, 90];
	//set the colors for the intervals
	let colors = [
		"green", "#cafc03", "#fcad03", "#fc8403", "#fc4903",
		"red"
	];

	// loop through the intervals and the colors to generate a label
	// with a colored square for each interval
	for(var i = 0; i < intervals.length; i++)
	{
		// inner html that sets the square for each interval and label
		div.innerHTML += "<i style='background: "
		+ colors[i]	+ "'></i> "
		+ intervals[i]
		+ (intervals[i + 1] ? "km &ndash km;" + intervals[i + 1] + "km<br>" : "+");
	}
	
	return div;
};

// add the legend to the map
legend.addTo(myMap);
