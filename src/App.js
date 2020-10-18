import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [restaurantData, setRestaurantData] = useState([]);
  const [sortDirection, setSortDirection] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");

      try {
        const res = await fetch(
          "https://code-challenge.spectrumtoolbox.com/api/restaurants/",
          {
            headers: {
              Authorization: "Api-Key q3MNxtfep8Gt",
            },
          }
        );
        const data = await res.json();
        console.log(data);
        setRestaurantData(data);
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
        <tbody id="tableData">
          {
            restaurantData.map(restaurant => (
              <tr key={restaurant.id}>
                <td>{restaurant.name}</td>
                <td>{restaurant.city}</td>
                <td>{restaurant.state}</td>
                <td>{restaurant.telephone}</td>
                <td>{restaurant.genre}</td>
              </tr>
            ))
            }
        </tbody>
      </table>
    </div>
  );
}

export default App;