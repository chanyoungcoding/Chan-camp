
mapboxgl.accessToken = 'pk.eyJ1IjoicGFya2NoYW55b3VuZyIsImEiOiJjbGIwOTQ3MGkwNGg1M29rOG16MDRjeXIwIn0.sbwLZwL_-ZCFaGhExiwEaA';
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v12', // style URL
center:campground.geometry.coordinates, // starting position [lng, lat]
zoom: 9, // starting zoom
});

new mapboxgl.Marker()
.setLngLat(campground.geometry.coordinates)
.addTo(map);