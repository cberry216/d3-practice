var w = 300, // width
	h = 300, // height
	r = 150; // radius
color = d3.scaleOrdinal().range(['#fe5bde', '#5b63fe']); // built-in range of colors

data = [{ label: 'Female', value: 261 }, { label: 'Male', value: 233 }];

// Generator for angles
var pie = d3
	.pie()
	.value(d => d.value)
	.sort(null)
	.padAngle(0.025);

// Generator for arcs
var arc = d3
	.arc()
	.innerRadius(r * 0.66)
	.outerRadius(r);

var arcLabel = d3
	.arc()
	.innerRadius(r * 0.4)
	.outerRadius(r * 0.4);

var svg = d3
	.select('body')
	.append('svg')
	.attr('width', w)
	.attr('height', h)
	.attr('text-anchor', 'middle')
	.style('font', '18px sans-serif');

var g = svg.append('g').attr('transform', 'translate(' + r + ',' + r + ')');

g.selectAll('path')
	.data(pie(data))
	.enter()
	.append('path')
	.attr('d', arc)
	.attr('fill', d => {
		return color(d.data.label);
	})
	.attr('stroke', 'white')
	.append('title')
	.text(d => d.data.label);

var text = g
	.selectAll('text')
	.data(pie(data))
	.enter()
	.append('text')
	.attr('transform', d => {
		return 'translate(' + arcLabel.centroid(d) + ')';
	})
	.attr('dy', '0.35em');

text
	.append('tspan')
	.attr('x', 0)
	.attr('y', '-0.7em')
	.attr('fill-opacity', 0.7)
	.text(d => d.data.label);

text
	.append('tspan')
	.attr('x', 0)
	.attr('y', '0.7em')
	.attr('fill-opacity', 0.5)
	.text(d => '$' + d.data.value.toFixed(2));
