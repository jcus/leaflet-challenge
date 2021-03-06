# Leaflet - Visualizing Data with Leaflet 

## Summary :signal_strength:

USGS Earthquake Data Visualization with Leaflet

Welcome to the United States Geological Survey, or USGS for short. The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

### Preparing Ahead 

1. In theis project, the folder `leaflet-challenge` correspond to the challenges: **Leaflet-Step-1** and **Leaflet-Step-2**, these will be the main files to run for analysis.

2. This project uses both **html** and **JavaScript** 


## Task :signal_strength:

### Level 1: Basic Visualization

![2-BasicMap](Images/2-BasicMap.png)

Your first task is to visualize an earthquake data set.

1. **Get the data set**

   ![3-Data](Images/3-Data.png)

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and pick a data set to visualize. When you click on a data set, for example "All Earthquakes from the Past 7 Days", you will be given a JSON representation of that data. You will use the URL of this JSON to pull in the data for our visualization.

   ![4-JSON](Images/4-JSON.png)

2. **Import & Visualize the Data**

   Create a map using Leaflet that plots all of the earthquakes from the data set based on their longitude and latitude.

   * Data markers could reflect the magnitude of the earthquake by their size and and depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.

   * ** The depth of the earth can be found as the third coordinate for each earthquake.

   * Include popups that provide additional information about the earthquake when a marker is clicked.

   * Create a legend that will provide context for your map data.

   * The visualization looks like the map above.

- - -

### Level 2: More Data

![5-Advanced](Images/5-Advanced.png)

The USGS wants to plot a second data set on the map to illustrate the relationship between tectonic plates and seismic activity. By pulling in a second data set and visualize it alongside the original set of data. Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.

In this step:

* Plot a second data set on our map.

* Add a number of base maps to choose from as well as separate out our two different data sets into overlays that can be turned on and off independently.

* Add layer controls to our map.

- - -

### Assessment  :signal_strength:

Your final product will be assessed:

The rendered leaflet map has all of the following: 
* TileLayer loads without error
* Connects to geojson API using D3 without error
* Markers with size corresponding to earthquake magnitude
* A legend showing the depth and their corresponding color

The data points do all of the following:
* Data points scale with magnitude level
* Data points colors change with depth level
* Each point has a tooltip with the Magnitude, the location and depth
* All data points load in the correct locations

The leaflet map has all of the following: 
* Control to change basemap
* Control to add/remove layers
* Tectonic plate lines on map



![1-Logo](Images/1-Logo.png)

___
?? 2021  Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.	
