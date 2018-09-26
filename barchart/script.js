// const d3 = require("d3");

var width = 420,
  barHeight = 20;

var scaleX = d3.scaleLinear().range([0, width]);

var chart = d3.select(".chart").attr("width", width);

d3.tsv("data.tsv", type).then(data => {
  scaleX.domain([0, d3.max(data, d => d.value)]);

  chart.attr("height", barHeight * data.length);

  var bar = chart
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", (d, i) => "translate(0," + i * barHeight + ")");

  bar
    .append("rect")
    .attr("width", d => scaleX(d.value))
    .attr("height", barHeight - 1);

  bar
    .append("text")
    .attr("x", d => scaleX(d.value) - 3)
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(d => d.value);
});

// Convert each value to number
function type(d) {
  d.value = +d.value;
  return d;
}
