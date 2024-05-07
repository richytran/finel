import React, { Component } from "react";
import * as d3 from "d3";

class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: "A"
    };
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  renderChart() {
    const margin = { top: 10, right: 10, bottom: 30, left: 20 };
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const data = this.props.data1.filter(item => item.category === this.state.categories); 

    var container = d3
      .select(".child2_svg") 
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .select(".g_2") 
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    
    var x_data = data.map((item) => item.categories);
    const x_scale = d3
      .scaleLinear()
      .domain([0, d3.max(x_data)])
      .range([margin.left, width]);

    container
      .selectAll(".x_axis_g")
      .data([0])
      .join("g")
      .attr("class", 'x_axis_g')
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x_scale));

   
    var y_data = data.map((item) => item.length);
    const y_scale = d3
      .scaleLinear()
      .domain([0, d3.max(y_data)])
      .range([height, 0]);

    container
      .selectAll(".y_axis_g") 
      .data([0])
      .join('g')
      .attr("class", 'y_axis_g') 
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y_scale));

    container
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", function (d) {
        return x_scale(d.categories);
      })
      .attr("cy", function (d) {
        return y_scale(d.length);
      })
      .attr("r", 3)
      .style("fill", "#69b3a2");

  }

  render() {
    return (
      <div>
        <select onChange={(event) => this.setState({ categories: event.target.value })}>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
        <svg className="child2_svg">
          <g className="g_2"></g>
        </svg>
      </div>
    );
  }
}

export default Child2;
