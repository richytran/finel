import './App.css';
import sample from'./SampleDataset.csv'
import * as d3 from 'd3'
import React, { Component } from "react"
import Child1 from './Child1.js'
import Child2 from './Child2.js'
class App extends Component { 

  constructor(props) { 
    super(props); 
    this.state = {data:[]}; 
  }

  componentDidMount(){ 
    var self=this 

    d3.csv(sample, function(d){ // Use d3.csv to load the tips.csv file
      return { // Return an object with the following properties
        x: d.x,
        y: d.y,
        category: d.category
      }
    }).then(function(csv_data){ // When the CSV data is loaded successfully
      self.setState({data:csv_data}) // Update the state with the loaded data
      console.log(csv_data) 
    })
    .catch(function(err){ // If there's an error loading the CSV data
      console.log(err) // Log the error to the console
    })
  }

  render() { // Define the render method
    return <div className="parent"> 
      <div className="child1"><Child1 data1={this.state.data}></Child1></div> 
      <div className="child2"><Child2 data1={this.state.data}></Child2></div> 
    </div>;
  }
}

export default App;
