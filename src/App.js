import React, { Component } from 'react';
import './normalize.css';
import './skeleton.css';
import './App.css';

let json = [
 {
   "Position": 1,
   "TeamName": "Funny Guys",
   "Pub": " The Barge",
   "Points": 300
 },
 {
   "Position": 2,
   "TeamName": "Smarties",
   "Pub": " The Duck",
   "Points": 209
 },
 {
   "Position": 3,
   "TeamName": "Banjos",
   "Pub": " The Rose",
   "Points": 201
 },
 {
   "Position": 4,
   "TeamName": "Boffins",
   "Pub": " The Crown",
   "Points": 100
 }
];

class App extends Component {
  render() {
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
