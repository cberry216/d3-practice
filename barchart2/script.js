// const d3 = require("d3");
var margin = { top: 20, right: 30, bottom: 30, left: 40 },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var xScale = d3
  .scaleBand()
  .rangeRound([0, width])
  .paddingInner(0.01);

var yScale = d3.scaleLinear().range([height, 0]);

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

var chart = d3
  .select(".chart")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g") // add a "g" element
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", type).then(data => {
  xScale.domain(data.map(d => d.name));
  yScale.domain([0, d3.max(data, d => d.value)]);

  chart
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  chart
    .append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "middle")
    .text("Frequency");

  // Since the range of the scale is reverse, a small number will results in a large scaled number
  chart
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.name))
    .attr("y", d => yScale(d.value)) // Sets the bars to appear on the bottom axis
    .attr("height", d => height - yScale(d.value))
    .attr("width", xScale.bandwidth());
});

function type(d) {
  d.value = +d.value;
  return d;
}
