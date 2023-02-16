import React from "react";
import InputArea from "./InputArea";

export default function SearchArea(props) {
  function handleSearch() {
    const city = document.getElementById("cityName").value;
    props.onSearch(city);
    document.getElementById("cityName").value = "";
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <InputArea
        inputLabel="City:"
        inputId="cityName"
        inputPlaceholder="Enter City here..."
      />
      <InputArea
        inputLabel="Country:"
        inputId="countryName"
        inputPlaceholder="Enter Country here..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
