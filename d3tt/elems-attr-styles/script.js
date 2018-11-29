// Setting size of 'svg'
holder = d3
  .select("body")
  .append("svg")
  .attr("width", 449)
  .attr("height", 249);

// // Add circle to 'svg'
// holder
//   .append("circle")
//   .attr("cx", 200)
//   .attr("cy", 100)
//   .attr("r", 50);

// // Add ellipse to 'svg'
// holder
//   .append("ellipse")
//   .attr("cx", 200)
//   .attr("cy", 100)
//   .attr("rx", 100)
//   .attr("ry", 50);

// // Add rectangle to 'svg'
// holder
//   .append("rect")
//   .attr("x", 100)
//   .attr("y", 50)
//   .attr("height", 100)
//   .attr("width", 200)
//   .attr("rx", 10)
//   .attr("ry", 10);

// // Add line to 'svg'
// holder
//   .append("line")
//   .style("stroke", "black")
//   .attr("x1", 100)
//   .attr("y1", 50)
//   .attr("x2", 300)
//   .attr("y2", 150);

// // Add polyline to 'svg'
// holder
//   .append("polyline")
//   .style("stroke", "black")
//   .style("fill", "none")
//   .attr("points", "100,50 200,150 300,50");

// // Add polygon to 'svg'
// holder
//   .append("polygon")
//   .style("stroke", "black")
//   .style("fill", "none")
//   .attr("points", "100,50 200,150 300,50");

// // Add path to 'svg'
// holder
//   .append("path")
//   .style("stroke", "black")
//   .style("fill", "none")
//   .attr("d", "M 100,50 L 200,150 L 300,50");

// Add clipped path to 'svg'
holder
  .append("clipPath")
  .attr("id", "ellipse-clip")
  .append("ellipse")
  .attr("cx", 175)
  .attr("cy", 100)
  .attr("rx", 100)
  .attr("ry", 50);

// Draw clipped path on 'svg'
holder
  .append("rect")
  .attr("x", 125)
  .attr("y", 75)
  .attr("clip-path", "url(#ellipse-clip)")
  .style("fill", "lightgrey")
  .attr("height", 100)
  .attr("width", 200);
