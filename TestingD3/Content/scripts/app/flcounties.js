define(["require", "exports"], function(require, exports) {
    
    var map, svg, counties, legendControl, legendContainer;
    var countiesReq = $.getJSON('/Content/FLCounties.topo.js');
    exports.isLoading = ko.observable(true);
    function viewAttached(view) {
        map = new L.map(view, {
            center: new L.latLng(27.8, -83.75),
            zoom: 6,
            minZoom: 6,
            maxZoom: 9,
            maxBounds: new L.latLngBounds(new L.latLng(19.062118, -98.217773), new L.latLng(35.245619, -71.455078))
        });
        var tileLayer = new L.tileLayer('http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png', {
            key: 'cb9913802a4a4f22a59d13a2fbd73d70',
            styleId: '22677',
            minZoom: 6,
            maxZoom: 9
        });
        map.addLayer(tileLayer);
        svg = d3.select(map.getPanes().overlayPane).append('svg');
        counties = svg.append('g').attr('class', 'leaflet-zoom-hide').attr('id', 'counties');
        createLegend();
        countiesReq.then(drawCounties);
    }
    exports.viewAttached = viewAttached;
    function createLegend() {
        legendControl = new L.control();
        legendControl.onAdd = function (map) {
            legendContainer = L.DomUtil.create('div', 'info');
            updateLegend();
            return legendContainer;
        };
        legendControl.addTo(map);
    }
    function updateLegend(props) {
        legendContainer.innerHTML = '<h4>Florida Counties</h4>' + (props ? '<b>' + props.name + '</b><br />(' + props.county + ')' : 'Hover over a state');
    }
    function countyMouseOver(d) {
        updateLegend(d.properties);
    }
    function countyMouseOut() {
        updateLegend();
    }
    function drawCounties(fl) {
        var geoJson = topojson.object(fl, fl.objects.FLCounties), bounds = d3.geo.bounds(geoJson), path = d3.geo.path().projection(project);
        var feature = counties.selectAll("path").data(geoJson.geometries).enter().append('path').on('mouseover', countyMouseOver).on('mouseout', countyMouseOut);
        map.on('viewreset', reset);
        reset();
        function reset() {
            var bottomLeft = project(bounds[0]), topRight = project(bounds[1]);
            svg.attr('width', topRight[0] - bottomLeft[0]).attr('height', bottomLeft[1] - topRight[1]).style('margin-left', bottomLeft[0] + 'px').style('margin-top', topRight[1] + 'px');
            counties.attr('transform', 'translate(' + -bottomLeft[0] + ',' + -topRight[1] + ')');
            feature.attr('d', path);
        }
    }
    function project(x) {
        var point = map.latLngToLayerPoint(new L.LatLng(x[1], x[0]));
        return [
            point.x, 
            point.y
        ];
    }
    function createSlider() {
        var sliderControl = new L.control();
    }
})
//@ sourceMappingURL=flcounties.js.map
