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

    map.setTerrain({source: 'maptiler3D', exaggeration: 1.3});

// // Terrain Control
// map.addControl(
//     new maplibregl.TerrainControl({
//         source: 'maptiler3D',
//         exaggeration: 1
//     })
// );

});