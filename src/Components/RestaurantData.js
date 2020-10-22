import React from "react";

function RestaurantData({ restaurantData, loading }) {
  if (loading) {
    console.log("loading");
  }

  return (
    <>
      {[...restaurantData].map((restaurant) => (
        <tr key={restaurant.id}>
          <td>{restaurant.name}</td>
          <td>{restaurant.city}</td>
          <td>{restaurant.state}</td>
          <td>{restaurant.telephone}</td>
          <td>{restaurant.genre}</td>
        </tr>
      ))}
    </>
  );
}

export default RestaurantData;
