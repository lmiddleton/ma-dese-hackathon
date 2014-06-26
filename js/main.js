$( document ).ready(function() {

  // parse districts json
  var districtsObj = jQuery.parseJSON(DISTRICTS);
  //console.log(districtsObj);

  $.each(districtsObj.objects.ma.geometries, function(key, value) {
    // print the district names
    //console.log(value.properties.DISTNAME);
  });

  // parse master data json
  var masterObj = jQuery.parseJSON(MASTER);
  console.log(masterObj);

  $.each(masterObj, function(key, value) {
    // print the district names
    console.log(value['School Name']);
    console.log(value['State District ID']);
  });

  generateMap(districtsObj);

});

function generateMap(districtsObj) {
  // script modified from http://techslides.com/mapping-town-boundaries-with-d3/

  var width = 960,
      height = 500;

  var tooltip = d3.select("body").append("div").attr("class", "tooltip hidden");

  function redraw() {
      var s = d3.event.scale;
      var t = d3.event.translate;
      svg.style("stroke-width", 1 / s).attr("transform", "translate(" + t + ")scale(" + s + ")");
  }

  var projection = d3.geo.albersUsa()
                     .scale(10000)
                     .translate([-2800, 1200]);

  var path = d3.geo.path().projection(projection);

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
      .call(d3.behavior.zoom()
      .on("zoom", redraw))
      .append("g")
      //.attr("viewBox", '0 0 960 500')

  var color = d3.scale.category10();

  // district map (Elementary School)
  // generated from SCHOOLDISTELEM_POLY shapefiles: http://www.mass.gov/anf/research-and-tech/it-serv-and-support/application-serv/office-of-geographic-information-massgis/datalayers/schooldistricts.html
  d3.json("js/topojson/ma-districts-elem-all.topo.json", function(error, ma) {

   var topo = topojson.feature(ma, ma.objects['ma-districts-elem-all.geo']).features;

   var district = svg.selectAll(".land").data(topo);

    district.enter().insert("path")
        .attr("class", "land")
        .attr("d", path)
        .attr("id", function(d,i) { return d.id; })
        //.style("fill", function(d,i) { return color(i) });
        .style("stroke", 'white')
        .style("fill", "blue");

    //tooltips
    district
      .on("mousemove", function(d,i) {
        var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );
          tooltip
            .classed("hidden", false)
            .attr("style", "left:"+(mouse[0])+"px;top:"+(mouse[1])+"px")
            .html(d.id + getDistCode8())
        })
        .on("mouseout",  function(d,i) {
          tooltip.classed("hidden", true)
        });
  });

  // district map (Middle School)
  // generated from SCHOOLDISTMID_POLY shapefiles: http://www.mass.gov/anf/research-and-tech/it-serv-and-support/application-serv/office-of-geographic-information-massgis/datalayers/schooldistricts.html
  d3.json("js/topojson/ma-districts-mid-all.topo.json", function(error, ma) {

   var topo = topojson.feature(ma, ma.objects['ma-districts-mid-all.geo']).features;

   var district = svg.selectAll(".land").data(topo);

    district.enter().insert("path")
        .attr("class", "land")
        .attr("d", path)
        .attr("id", function(d,i) { return d.id; })
        //.style("fill", function(d,i) { return color(i) });
        .style("stroke", 'white')
        .style("fill", "black");

    //tooltips
    district
      .on("mousemove", function(d,i) {
        var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );
          tooltip
            .classed("hidden", false)
            .attr("style", "left:"+(mouse[0])+"px;top:"+(mouse[1])+"px")
            .html(d.id + getDistCode8())
        })
        .on("mouseout",  function(d,i) {
          tooltip.classed("hidden", true)
        });
  });

  // district map (High School)
  // generated from SCHOOLDISTHIGH_POLY shapefiles: http://www.mass.gov/anf/research-and-tech/it-serv-and-support/application-serv/office-of-geographic-information-massgis/datalayers/schooldistricts.html
  d3.json("js/topojson/ma-districts-high-all.topo.json", function(error, ma) {

   var topo = topojson.feature(ma, ma.objects['ma-districts-high-all.geo']).features;

   var district = svg.selectAll(".land").data(topo);

    district.enter().insert("path")
        .attr("class", "land")
        .attr("d", path)
        .attr("id", function(d,i) { return d.id; })
        //.style("fill", function(d,i) { return color(i) });
        .style("stroke", 'white')
        .style("fill", "green");

    //tooltips
    district
      .on("mousemove", function(d,i) {
        var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );
          tooltip
            .classed("hidden", false)
            .attr("style", "left:"+(mouse[0])+"px;top:"+(mouse[1])+"px")
            .html(d.id + getDistCode8())
        })
        .on("mouseout",  function(d,i) {
          tooltip.classed("hidden", true)
        });
  });

  // school map (PK-High School)
  // generated from shapefiles: http://www.mass.gov/anf/research-and-tech/it-serv-and-support/application-serv/office-of-geographic-information-massgis/datalayers/schools.html
  d3.json("js/topojson/ma-schools-all.topo.json", function(error, ma) {

   var topo = topojson.feature(ma, ma.objects['ma-schools-all.geo']).features;

   var school = svg.selectAll(".land").data(topo);

    school.enter().insert("path")
        .attr("class", "land")
        .attr("d", path)
        .attr("id", function(d,i) { return d.id; })
        //.style("fill", function(d,i) { return color(i) });
        .style("stroke", 'black')
        .style("fill", "pink");

    //tooltips
    
    school
      .on("mousemove", function(d,i) {
        var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );
          tooltip
            .classed("hidden", false)
            .attr("style", "left:"+(mouse[0])+"px;top:"+(mouse[1])+"px")
            .html(d.id)
        })
        .on("mouseout",  function(d,i) {
          tooltip.classed("hidden", true)
        });

  });

  d3.select(self.frameElement).style("height", height + "px");

}

function getDistCode8(districtsObj, distName) {
  return "lauren";
}