
var map = L.map('map').setView([45, 15], 3);

var baseLayer = L.tileLayer('https://mapbox.geointservices.io/v4/mapbox.light/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
});
baseLayer.addTo(map);

L.geoPackageTileLayer({
    geoPackageUrl: 'http://ngageoint.github.io/GeoPackage/examples/rivers.gpkg',
    layerName: 'rivers_tiles'
}).addTo(map);

L.geoPackageFeatureLayer([], {
    geoPackageUrl: 'http://ngageoint.github.io/GeoPackage/examples/rivers.gpkg',
    layerName: 'rivers',
    onEachFeature: function (feature, layer) {
      var string = "";
      for (var key in feature.properties) {
        string += '<div class="item"><span class="label">' + key + ': </span><span class="value">' + feature.properties[key] + '</span></div>';
      }
      layer.bindPopup(string);
    }
}).addTo(map);
