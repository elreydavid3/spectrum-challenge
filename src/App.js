import React, { useState, useEffect } from "react";
import "./App.css";
import RestaurantData from "./Components/RestaurantData";
import Pagination from "./Components/Pagination";



function App() {
  const [restaurantData, setRestaurantData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [query, setQuery] = useState("");


  useEffect(() => {
    const fetchData = async () => {
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
        let sortedDataNames = data.sort((a, b) => {
          let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
        setRestaurantData(sortedDataNames);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);


  const reSort = (sortedField) =>{
    if (sortedField !== null) {
      const newSort =[...restaurantData].sort((a, b) => {
        let fa = a[sortedField].toLowerCase(),
            fb = b[sortedField].toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
        
      });
      setRestaurantData(newSort)
    }
   
    
  }





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

  //search with searchbar to to filter table by name, city, state & genre
  const search = (rows) =>{
    return rows.filter(
      (row) =>
        row.name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        row.city.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        row.genre.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        row.state.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }
  
 

  return (
    <div className="App">
      <h1>Restaurant App</h1>
      <br />

      <input
        placeholder="type name, city, or genre"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>
              <button onClick={() =>
                reSort('state')
                }>
                State
              </button>
            </th>
            <th>Phone</th>
            <th>
              <button onClick={() =>
                reSort('genre')
              }>
                Genre
                </button>
              </th>
          </tr>
        </thead>
        <tbody id="tableData">
          <RestaurantData
            restaurantData={search(currentPosts)}
          />
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
