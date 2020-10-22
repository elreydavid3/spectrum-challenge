import React, { useState, useEffect } from "react";
import "./App.css";
import RestaurantData from "./Components/RestaurantData";
import Pagination from "./Components/Pagination";
import { IconButton } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import StateFilter from "./Components/StateFilter";
import GenreFilter from "./Components/GenreFilter";
require("dotenv").config();

function App() {
  const [isClicked, setIsClicked] = useState({
    name: false,
    state: false,
    genre: false,
    city: false,
    telephone: false,
  });

  const [restaurantData, setRestaurantData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  //fetch API info for table
  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://code-challenge.spectrumtoolbox.com/api/restaurants/",
          {
            headers: {
              Authorization: `${api_key}`,
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
  const sortColumn = (sortedField) => {
    if (sortedField !== null) {
      const newSortedColumn = [...restaurantData].sort((a, b) => {
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

      setRestaurantData(newSortedColumn);
    }
  };

  const sortDescending = (sortedField) => {
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
  };

  const handleSort = (column) => {
    switch (column) {
      case "name":
        setIsClicked({ name: !isClicked.name });
        isClicked["name"] ? sortDescending("name") : sortColumn("name");
        break;
      case "state":
        setIsClicked({ state: !isClicked.state });
        isClicked["state"] ? sortDescending("state") : sortColumn("state");
        break;
      case "city":
        setIsClicked({ city: !isClicked.city });
        isClicked["city"] ? sortDescending("city") : sortColumn("city");
        break;
      case "telephone":
        setIsClicked({ telephone: !isClicked.telephone });
        isClicked["telephone"]
          ? sortDescending("telephone")
          : sortColumn("telephone");
        break;
      case "genre":
        setIsClicked({ genre: !isClicked.genre });
        isClicked["genre"] ? sortDescending("genre") : sortColumn("genre");
        break;
      default:
        console.log("Invalid operator");
        break;
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

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
  const search = (rows) => {
    return rows.filter(
      (row) =>
        row.name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        row.city.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        row.genre.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        row.state.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  return (
    <div className="App">
      <h1>Restaurant App</h1>
      <br />
      <StateFilter restaurantData={restaurantData}/>
      <GenreFilter restaurantData={restaurantData}/>
      <form>
      <label>Search:</label>
      <input
        className="searchBar"
        placeholder="type name, city, or genre"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <input type="submit" value="Submit Search" />
      </form>
      <table>
        <thead>
          <tr>
            <th>
              Name
              <IconButton onClick={() => handleSort("name")}>
                {isClicked["name"] ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                )}
              </IconButton>
            </th>
            <th>
              City
              <IconButton onClick={() => handleSort("city")}>
                {isClicked["city"] ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                )}
              </IconButton>
            </th>
            <th>
              State
              <IconButton onClick={() => handleSort("state")}>
                {isClicked["state"] ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                )}
              </IconButton>
            </th>
            <th>
              Phone
              <IconButton onClick={() => handleSort("telephone")}>
                {isClicked["telephone"] ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                )}
              </IconButton>
            </th>
            <th>
              Genre
              <IconButton onClick={() => handleSort("genre")}>
                {isClicked["genre"] ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                )}
              </IconButton>
            </th>
          </tr>
        </thead>
        <tbody id="tableData">
          <RestaurantData restaurantData={search(currentPosts)} />
        </tbody>
      </table>
      <div className="footer">
        <Button
          style={{
            display: "flex",
            flexWrap: "wrap",
            backgroundColor: "cornflowerblue",
            height: "40px",
          }}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Rows per page: {postsPerPage}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={() => setPostPerPage(5)}>5</MenuItem>
          <MenuItem onClick={() => setPostPerPage(10)}>10</MenuItem>
          <MenuItem onClick={() => setPostPerPage(15)}>15</MenuItem>
        </Menu>

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={restaurantData.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default App;
