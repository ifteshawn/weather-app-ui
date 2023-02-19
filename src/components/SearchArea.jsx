import { React, useState } from "react";
import InputArea from "./InputArea";
import countries from "../countries";

export default function SearchArea(props) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  function handleSearch() {
    const city = document.getElementById("cityName").value;
    const country = document.getElementById("countriesMenu").value;
    props.onSearch(city, country);
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label>City: </label>
        <input
          id="cityName"
          type="text"
          placeholder="Enter City here..."
        ></input>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label>Country: </label>
        <select id="countriesMenu" value={value} onChange={handleChange} style={{marginLeft: "10px"}}>
          <option value="" disabled selected hidden>
            Select a Country..
          </option>
          {countries.map((country) => (
            <option value={country.code}>{country.name}</option>
          ))}
        </select>
      </div>  
          
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
