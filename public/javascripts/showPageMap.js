
mapboxgl.accessToken = 'pk.eyJ1IjoicGFya2NoYW55b3VuZyIsImEiOiJjbGIwOTQ3MGkwNGg1M29rOG16MDRjeXIwIn0.sbwLZwL_-ZCFaGhExiwEaA';
const map = new mapboxgl.Map({
container: 'map', 
style: 'mapbox://styles/mapbox/light-v10', 
center:campground.geometry.coordinates, 
zoom: 10, 
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3>`
            )
    )
    .addTo(map);