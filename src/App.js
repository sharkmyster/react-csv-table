import React, { Component } from 'react';
import axios from 'axios';
import './normalize.css';
import './skeleton.css';
import './App.css';

//var csv is the CSV file with headers
const csvJSON = (csv) => {

  let lines=csv.split("\n");

  let result = [];

  let headers = lines[0].split(',');

  lines.shift();

  lines.forEach(function(line){
    let obj = {}; 
    let currentline = line.split(',');

    headers.forEach(function(header, j){
      obj[header] = currentline[j];
    })
    result.push(obj);
  });

  return result; 
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    axios.get(this.props.url)
    .then(response => this.setState({data: response.data}))
  }

  render() {
    if(!this.state.data) {
      return <div>loading</div>
    }

    var json = csvJSON(this.state.data);

    return (

      <div className="App">
        <table className="u-full-width">
          <thead>
            <tr>
            {Object.keys(json[0]).map(key => <th key={key}>{key}</th>)}
            </tr>
          </thead>
          <tbody>
          {json.map((el,i) => {
            return (
              <tr key={i}>
                <td>{el.Position} </td>
                <td>{el.TeamName} </td>
                <td>{el.Pub} </td>
                <td>{el.Points} </td>
              </tr>
            )
          })}
          </tbody>
        </table> 
      </div>
    );
  }
}

export default App;
