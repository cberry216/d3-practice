// const d3 = require("d3");

// Set dimensions of the margins and the graph
var margin = { top: 40, right: 20, bottom: 70, left: 70 },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// Parse date / time
var parseTime = d3.timeParse("%d-%b-%y");

// Set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3
  .line()
  .x(d => x(d.date))
  .y(d => y(d.close));

// Append the 'svg' element to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("data.csv", (error, data) => {
  if (error) throw error;

  // Format data
  data.forEach(d => {
    d.date = parseTime(d.date);
    d.close = +d.close;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, d => d.date)); //.extent returns array of min and max
  y.domain([0, d3.max(data, d => d.close)]);

  // Add the valueline path
  svg
    .append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", valueline);

  // Add the scatter plot
  svg
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("cx", d => x(d.date))
    .attr("cy", d => y(d.close));

  // Add guide lines to points
  svg
    .selectAll(".guide")
    .data(data)
    .enter()
    .append("line")
    .attr("class", "guide")
    .attr("x1", d => x(d.date))
    .attr("y1", y(0))
    .attr("x2", d => x(d.date))
    .attr("y2", d => y(d.close) + 5);

  // Add the x-axis
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "axis")
    .call(d3.axisBottom(x));

  // Rotating the tick labels to fit
  // .selectAll("text")
  // .style("text-anchor", "end")
  // .attr("dx", "-.8em")
  // .attr("dy", ".15em")
  // .attr("transform", "rotate(-65)");

  // Add the x-axis label
  svg
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + "," + (height + margin.top + 20) + ")"
    )
    .style("text-anchor", "middle")
    .text("Date");

  // Add the y-axis
  svg
    .append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(y));

  // Add the y-axis label
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .attr("text-anchor", "middle")
    .text("Value");

  // Add a title to the graph
  svg
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + "," + (0 - margin.top / 2) + ")"
    )
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("text-decoration", "underline")
    .text("Value vs Data Graph");
});
