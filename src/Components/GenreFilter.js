import React, { useState } from "react";

function GenreFilter({restaurantData}) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSubmit = (event) => {
    alert(`Your favorite flavor is: " + ${selectedValue}`);
    event.preventDefault();
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSelectedValue(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Filter by genre:
        <select value={selectedValue} onChange={handleChange}>
          {restaurantData.map(item =>{
              return <option value={item.genre}>{item.genre}</option>
          })}
        </select>
      </label>
      <input type="submit" value="Submit Genre" />
    </form>
  );
}

export default GenreFilter;
