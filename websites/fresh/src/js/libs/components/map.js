export function initMapBox() {

    const token = 'pk.eyJ1IjoiY3NzbmluamEiLCJhIjoiY2toZW1nYm0zMDAxODJycXFzZ3g4cnZ6diJ9.9ebfrGREuwkauRr_afDTgA';
    const markerOptions = {
        color: 'red',
    };

    const map1 = document.getElementById('mapbox-1');
    const map2 = document.getElementById('mapbox-2');
    const map3 = document.getElementById('mapbox-3');
    const map4 = document.getElementById('mapbox-4');
    const map5 = document.getElementById('mapbox-5');
    const map6 = document.getElementById('mapbox-6');

    if (typeof (map1) != 'undefined' && map1 != null) {
        mapboxgl.accessToken = token;
        const mapbox1 = new mapboxgl.Map({
            container: 'mapbox-1',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [12.550343, 55.665957],
            zoom: 8
            });

        const marker1 = new mapboxgl.Marker(markerOptions)
            .setLngLat([12.550343, 55.665957])
            .addTo(mapbox1);
    }

    if (typeof (map2) != 'undefined' && map2 != null) {
        mapboxgl.accessToken = token;
        const mapbox2 = new mapboxgl.Map({
            container: 'mapbox-2',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [12.550343, 55.665957],
            zoom: 8
            });

        const marker2 = new mapboxgl.Marker(markerOptions)
            .setLngLat([12.550343, 55.665957])
            .addTo(mapbox2);
    }

    if (typeof (map3) != 'undefined' && map3 != null) {
        mapboxgl.accessToken = token;
        const mapbox3 = new mapboxgl.Map({
            container: 'mapbox-3',
            style: 'mapbox://styles/mapbox/light-v10',
            center: [12.550343, 55.665957],
            zoom: 8
            });

        const marker3 = new mapboxgl.Marker(markerOptions)
            .setLngLat([12.550343, 55.665957])
            .addTo(mapbox3);
    }

    if (typeof (map4) != 'undefined' && map4 != null) {
        mapboxgl.accessToken = token;
        const mapbox4 = new mapboxgl.Map({
            container: 'mapbox-4',
            style: 'mapbox://styles/mapbox/light-v10',
            center: [12.550343, 55.665957],
            zoom: 8
            });

        const marker4 = new mapboxgl.Marker(markerOptions)
            .setLngLat([12.550343, 55.665957])
            .addTo(mapbox4);
    }

    if (typeof (map5) != 'undefined' && map5 != null) {
        mapboxgl.accessToken = token;
        const mapbox5 = new mapboxgl.Map({
            container: 'mapbox-5',
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [12.550343, 55.665957],
            zoom: 8
            });

        const marker5 = new mapboxgl.Marker(markerOptions)
            .setLngLat([12.550343, 55.665957])
            .addTo(mapbox5);
    }

    if (typeof (map6) != 'undefined' && map6 != null) {
        mapboxgl.accessToken = token;
        const mapbox6 = new mapboxgl.Map({
            container: 'mapbox-6',
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [12.550343, 55.665957],
            zoom: 8
            });

        const marker6 = new mapboxgl.Marker(markerOptions)
            .setLngLat([12.550343, 55.665957])
            .addTo(mapbox6);
    }
}