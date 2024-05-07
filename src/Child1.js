import React, { Component } from "react";
import * as d3 from "d3";

class Child1 extends Component {
  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  renderChart() {
    const margin = { top: 10, right: 10, bottom: 40, left: 20 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const data = this.props.data1;

    const temp_data = d3.rollup(
      data,
      (d) => d.length,
      (d) => d.category
    );

    const svg = d3
      .select(".child1_svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const container = svg
      .select(".g_1")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x_data = Array.from(temp_data.keys());
    const x_scale = d3
      .scaleBand()
      .domain(x_data)
      .range([0, width])
      .padding(0.2);

    const y_scale = d3
      .scaleLinear()
      .domain([0, d3.max(temp_data.values())])
      .range([height, 0]);

    container
      .selectAll(".x_axis_g")
      .data([null]) // dummy data to ensure it's entered only once
      .join("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x_scale));

    container.selectAll(".y_axis_g").call(d3.axisLeft(y_scale));

    container
      .selectAll(".bar")
      .data(Array.from(temp_data))
      .join("rect")
      .attr("class", "bar")
      .attr("x", ([category]) => x_scale(category))
      .attr("y", ([, value]) => y_scale(value))
      .attr("width", x_scale.bandwidth())
      .attr("height", ([, value]) => height - y_scale(value))
      .attr("fill", "#69b3a2");

    container
      .selectAll(".bar-label")
      .data(Array.from(temp_data))
      .join("text")
      .attr("class", "bar-label")
      .attr("x", ([category]) => x_scale(category) + x_scale.bandwidth() / 2)
      .attr("y", ([, value]) => y_scale(value) + 20)
      .attr("text-anchor", "middle")
      .text(([, value]) => value);
    svg
      .append("text")
      .attr(
        "transform",
        `translate(${width / 2 + margin.left}, ${height + margin.top + 40})`
      )
      .style("text-anchor", "middle")
      .text("categories");
  }

  render() {
    return (
      <svg className="child1_svg">
        <g className="g_1"></g>
      </svg>
    );
  }
}

export default Child1;
