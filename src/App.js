import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tabledata, setTableData] = useState("");
 

  useEffect(() => {
    const fetchData = async () => {
      
      console.log("fetching data");

      try {
        const res = await fetch(
          "https://cors-anywhere.herokuapp.com/https://code-challenge.spectrumtoolbox.com/api/restaurants/",
          {
            headers: {
              Authorization: "Api-Key q3MNxtfep8Gt",
            },
          }
        );
        const data = await res.json();
        console.log(data);
        setTableData(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Restaurant App</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>State</th>
            <th>Phone</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody id="tableData"></tbody>
      </table>
    </div>
  );
}

export default App;
