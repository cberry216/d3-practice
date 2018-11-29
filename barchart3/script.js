// Set dimensions
var margin = { top: 20, right: 30, bottom: 30, left: 50 };
var width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

// Set scale ranges
var x = d3
	.scaleBand() // make scale of bands (good for bar charts)
	.range([0, width]) // sets the range of values
	.padding(0.1); // adds padding to each band
var y = d3.scaleLinear().rangeRound([height, 0]);

// Add svg to body
var svg = d3
	.select('body')
	.append('svg')
	.attr('height', height + margin.top + margin.bottom)
	.attr('width', width + margin.left + margin.right)
	.attr('class', 'chart')
	.append('g') // adds space for margins
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

d3.csv('data.csv', (error, data) => {
	if (error) throw error;

	data.forEach(d => {
		d.freq = +d.freq;
	});
	// Set scale domains
	x.domain(data.map(d => d.letter));
	y.domain([0, d3.max(data, d => Math.max(d.freq))]);

	// Set bar width
	barWidth = width / data.length;

	// Enter data into 'svg'
	var bar = svg
		.selectAll('g')
		.data(data)
		.enter()
		.append('g')
		.attr('class', 'bar')
		.attr('transform', d => 'translate(' + x(d.letter) + ',0)')
		// Change color on mouseover
		.on('mouseover', function(d, i) {
			d3.select('#rect-' + d.letter).style('fill', 'orange');
			d3.select('#text-' + d.letter).style('opacity', 100);
		})
		// Change color on mouseout
		.on('mouseout', function(d, i) {
			d3.select('#rect-' + d.letter).style('fill', 'steelblue');
			d3.select('#text-' + d.letter).style('opacity', 0);
		});

	// Add x-axis
	svg
		.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,' + height + ')')
		.call(d3.axisBottom(x));

	// Add y-axis
	svg
		.append('g')
		.attr('class', 'y axis')
		.call(d3.axisLeft(y).ticks(10, '%'))
		.selectAll('text')
		.attr('dx', '-.75em');

	// Add y-axis label
	svg
		.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('x', -(height / 2))
		.attr('y', -35)
		.style('text-anchor', 'middle')
		.style('font', '10px sans-serif')
		.text('Frequency');

	bar
		.append('rect')
		.attr('y', d => y(d.freq))
		.attr('height', d => height - y(d.freq))
		.attr('width', x.bandwidth())
		.attr('id', d => 'rect-' + d.letter);

	bar
		.append('text')
		.attr('y', d => y(d.freq) - 1)
		.attr('dx', '1.75em')
		.attr('id', d => 'text-' + d.letter)
		.style('opacity', 0)
		.text(d => Math.round(d.freq * 1000) / 10 + '%');
});

function comp(a, b) {
	return a.freq > b.freq ? a : b;
}
