import * as d3 from "d3";
import { useEffect } from "react";

const Plot = (props) => {
	var margin = {
			top: 10,
			right: window.screen.availWidth * 0.2,
			bottom: 40,
			left: window.screen.availWidth * 0.2,
		},
		width = window.screen.availWidth - margin.left - margin.right,
		height = window.screen.availHeight * 0.6 - margin.top - margin.bottom;

	function draw(data) {
		// append the svg object to the body of the page
		var svg = d3.select("#svg");

		var x = d3.scaleLinear().domain([0, 350]).range([0, width]);
		svg
			.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x));

		// Add Y axis
		var y = d3.scaleLinear().domain([0, 12]).range([height, 0]);
		svg.append("g").call(d3.axisLeft(y));

		svg
			.append("text")
			.attr("text-anchor", "end")
			.attr("x", width)
			.attr("y", height + margin.top + 20)
			.text("Episodes");

		// Y axis label:
		svg
			.append("text")
			.attr("text-anchor", "end")
			.attr("transform", "rotate(-90)")
			.attr("y", -margin.bottom + 10)
			.attr("x", -margin.top)
			.text("Seasons");

		// Add dots
		svg
			.append("g")
			.selectAll("dot")
			.data(data)
			.enter()
			.append("circle")
			.attr("cx", function (d) {
				return x(d.episodes);
			})
			.attr("cy", function (d) {
				return y(d.seasons);
			})
			.attr("r", 7)
			.style("fill", "#FAA500");

		svg
			.selectAll("dot")
			.data(data)
			.enter()
			.append("text")
			.text((d) => d.name)
			.attr("x", function (d) {
				return x(d.episodes) + 10;
			})
			.attr("y", function (d) {
				return y(d.seasons) + 5;
			});
	}

	useEffect(() => {
		fetch(props.url)
			.then((result) => result.json())
			.then((result) => {
				draw(result);
			});
	}, []);

	return (
		<div className="m-3">
			<svg
				width={width + margin.left + margin.right}
				height={height + margin.top + margin.bottom}
			>
				<g
					id="svg"
					transform={"translate(" + margin.left + "," + margin.top + ")"}
				></g>
			</svg>
		</div>
	);
};

export default Plot;
