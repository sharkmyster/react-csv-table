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

  lines.forEach((line) => {
    let obj = {}; 
    let currentline = line.split(',');

    headers.forEach((header, j) => {
      obj[header] = currentline[j];
    })
    result.push(obj);
  });

  return result; 
}

const TableRow = ({rowData}) => {
  let headers = Object.keys(rowData);

  return (
    <tr>
      {headers.map((header, i) => <td key={i}>{rowData[header]} </td>)}
    </tr>
  )
}

const Table = ({data, className, limit}) => {

  let rows = data.slice(0, limit);
  let headers = Object.keys(rows[0]);


  return (
    <table className={className}>
      <thead>
        <tr>
        {headers.map(key => <th key={key}>{key}</th>)}
        </tr>
      </thead>
      <tbody>
      {rows.map((el,i) => {
        return (
          <TableRow key={i} headers={headers} rowData={el} />
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
    this.state = {
      filter: '',
      data: []
    };
  }

  componentWillMount() {
    console.log("running");
    axios.get(this.props.url)
    .then(response => {
      this.setState({data: csvJSON(response.data)})
    })
  }

  filterRows(e) {
    this.setState({filter: e.target.value})
  }

  render() {
    var tableData = this.state.data.filter(el => {
      return el["Company Name"].toLowerCase().includes(this.state.filter.toLowerCase())
    });

    if(!tableData.length) {
      return <h1>No data</h1>
    }

    return (

      <div className="App">
        <h1>Table</h1>
        <input type="text" onKeyUp={this.filterRows.bind(this)} />
        <Table data={tableData} className="u-full-width" limit="10"/>
      </div>
    );
  }
}

export default App;
