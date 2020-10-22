import React, { useState, useEffect } from "react";
import "./App.css";
import RestaurantData from "./Components/RestaurantData";
import Pagination from "./Components/Pagination";
import { IconButton } from "@material-ui/core";
import ArrowDownwardIcon  from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon  from '@material-ui/icons/ArrowUpward';



function App() {
  const [restaurantData, setRestaurantData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const [isStateClicked, setIsStateClicked] = useState(false);
  const [isGenreClicked, setIsGenreClicked] = useState(false);
  const [isNameClicked, setIsNameClicked] = useState(false);
  const [isCityClicked, setIsCityClicked] = useState(false);
  const [isPhoneClicked, setIsPhoneClicked] = useState(false);


//fetch API info for table
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

//to resort table by state and genre when clicked
  const sortColumn = (sortedField) =>{
    if (sortedField !== null) {
      const newSortedColumn =[...restaurantData].sort((a, b) => {
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
     
      setRestaurantData(newSortedColumn)
    }
  }

  const sortDescending = (sortedField) =>{
    let descendedOrder = [...restaurantData].sort((a, b) => {
      let fa = a[sortedField].toLowerCase(),
        fb = b[sortedField].toLowerCase();

      if (fa > fb) {
        return -1;
      }
      if (fa < fb) {
        return 1;
      }
      return 0;
    });
    setRestaurantData(descendedOrder);
  }

  const handleStateClick = () =>{
    isStateClicked === true ? setIsStateClicked(false): setIsStateClicked(true);
    isStateClicked ? sortDescending('state'): sortColumn('state');

  }
  const handleGenreClick = () =>{
    isGenreClicked === true ? setIsGenreClicked(false): setIsGenreClicked(true);
    isGenreClicked ? sortDescending('genre'): sortColumn('genre') ;

  }
  const handleNameClick = () =>{
    isNameClicked === true ? setIsNameClicked(false): setIsNameClicked(true);
    isNameClicked ? sortDescending('name'): sortColumn('name') ;

  }
  const handlePhoneClick = () =>{
    isPhoneClicked === true ? setIsPhoneClicked(false): setIsPhoneClicked(true);
    isPhoneClicked ? sortDescending('telephone'): sortColumn('telephone') ;

  }
  const handleCityClick = () =>{
    isCityClicked === true ? setIsCityClicked(false): setIsCityClicked(true);
    isCityClicked ? sortDescending('city'): sortColumn('city') ;

  }





  //get current posts of restaurants
  const indexOfLastRestaurant = currentPage * postsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - postsPerPage;
  const currentPosts = [...restaurantData].slice(
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
            <th>Name
            <IconButton onClick={handleNameClick}>
              {isNameClicked ? <ArrowUpwardIcon /> : <ArrowDownwardIcon /> }
              </IconButton>
            </th>
            <th>City
            <IconButton onClick={handleCityClick}>
              {isCityClicked ? <ArrowUpwardIcon /> : <ArrowDownwardIcon /> }
              </IconButton>
            </th>
            <th>
                State
              <IconButton onClick={handleStateClick}>
              {isStateClicked ? <ArrowUpwardIcon /> : <ArrowDownwardIcon /> }
              </IconButton>
            </th>
            <th>Phone
            <IconButton onClick={handlePhoneClick}>
              {isPhoneClicked ? <ArrowUpwardIcon /> : <ArrowDownwardIcon /> }
              </IconButton>
            </th>
            <th>
             
                Genre
                <IconButton onClick={handleGenreClick}>
              {isGenreClicked ? <ArrowUpwardIcon /> : <ArrowDownwardIcon /> }
              </IconButton>
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
