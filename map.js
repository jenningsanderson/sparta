// Build our map.
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/0196ab08-0202-76bd-b28b-5d0afde56b85/style.json?key=lKNWNcFzZ8CaRdTSSYvy', // example style
    center: [-112.042782, 46.579397], // starting position [lng, lat] - Helena, Montana
    bearing: -101.3,
    zoom: 15.5,
    pitch: 60,
    hash: true,
});

// Add navigation controls
map.addControl(new maplibregl.NavigationControl({
    visualizePitch: true
}));

map.on('style.load', function(){
    // 3D terrain
    map.addSource("maptiler3D", {
      "type": "raster-dem",
      "url": "https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=lKNWNcFzZ8CaRdTSSYvy",
    });

    // Turn on Terrain
    map.setTerrain({source: 'maptiler3D', exaggeration: 1.1});

    // Add all of our GeoJSON Sources
    map.addSource("federal", {
        "type": "geojson",
        "data": "data/federal_land.geojson",
    });

    map.addSource("city", {
        "type": "geojson",
        "data": "data/city_of_helena.geojson",
    });

    map.addSource("private", {
        "type": "geojson",
        "data": "data/private_land.geojson",
    });

    // Add Fills
    map.addLayer({
        "id": "federal",
        "type": "fill",
        "source": "federal",
        "layout": {},
        "paint": {
            "fill-color": "#darkgreen",
            "fill-opacity": 0.1,
        }
    }, "Path");

    map.addLayer({
        "id": "city",
        "type": "fill",
        "source": "city",
        "layout": {},
        "paint": {
            "fill-color": "lightgreen",
            "fill-opacity": 0.1,
        }
    }, "Path");

    map.addLayer({
        "id": "private",
        "type": "fill",
        "source": "private",
        "layout": {},
        "paint": {
            "fill-color": "steelblue",
            "fill-opacity": 0.5,
        }
    }, "Path");

    // Add outlines
    map.addLayer({
        "id": "private-outline",
        "type": "line",
        "source": "private",
        "layout": {},
        "paint": {
            "line-color": "#FFF",
            "line-width": 1
        }
        }, "Path");

    // Add individual plots
    map.addLayer({
        'id':'anderson',
        'type':'fill',
        'source':{
            'type':'geojson',
            'data':'data/anderson.geojson'
        },
        'layout':{},
        'paint':{
            'fill-color':'steelblue',
            'fill-opacity':0.5
        }
    },'Path');

    map.addLayer({
        'id':'murray',
        'type':'fill',
        'source':{
            'type':'geojson',
            'data':'data/murray.geojson'
        },
        'layout':{},
        'paint':{
            'fill-color':'orange',
            'fill-opacity':1
        }
    });

    // Terrain Control
    map.addControl(
        new maplibregl.TerrainControl({
            source: 'maptiler3D',
            exaggeration: 1
        })
    );
});