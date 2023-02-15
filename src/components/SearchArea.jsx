import React from "react";

export default function SearchArea(props) {
  function handleSearch() {
    const city = document.getElementById("cityName").value;
    props.onSearch(city);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label>City: </label>
        <input
          id="cityName"
          type="text"
          placeholder="Enter a City name here."
        ></input>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label>Country: </label>
        <input
          id="countryName"
          type="text"
          placeholder="Enter a Country name here."
        ></input>
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
