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

const Table = ({data, className}) => {
  return (
    <table className={className}>
      <thead>
        <tr>
        {Object.keys(data[0]).map(key => <th key={key}>{key}</th>)}
        </tr>
      </thead>
      <tbody>
      {data.map((el,i) => {
        return (
          <tr key={i}>
            <td>{el.Index} </td>
            <td>{el.Company} </td>
            <td>{el.Address} </td>
            <td>{el.Value} </td>
          </tr>
        )
      })}
      </tbody>
    </table> 
  )
}

Table.propTypes = {
  data: React.PropTypes.array
};


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

    var tableData = csvJSON(this.state.data);

    return (

      <div className="App">
        <Table data={tableData} className="u-full-width"/>
      </div>
    );
  }
}

export default App;
