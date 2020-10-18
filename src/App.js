import React, { useState, useEffect } from "react";
import "./App.css";
import RestaurantData from "./Components/RestaurantData";
import Pagination from "./Components/Pagination";

function App() {
  const [restaurantData, setRestaurantData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      setLoading(true);
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
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  //get current posts of restaurants
  const indexOfLastRestaurant = currentPage * postsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - postsPerPage;
  const currentPosts = restaurantData.slice(
    indexOfFirstRestaurant,
    indexOfLastRestaurant
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
          <RestaurantData restaurantData={currentPosts} loading={loading} />
        </tbody>
      </table>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={restaurantData.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
