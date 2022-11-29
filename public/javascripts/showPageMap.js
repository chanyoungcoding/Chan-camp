
mapboxgl.accessToken = 'pk.eyJ1IjoicGFya2NoYW55b3VuZyIsImEiOiJjbGIwOTQ3MGkwNGg1M29rOG16MDRjeXIwIn0.sbwLZwL_-ZCFaGhExiwEaA';
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/light-v10', // style URL
center:campground.geometry.coordinates, // starting position [lng, lat]
zoom: 9, // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3>`
            )
    )
    .addTo(map);