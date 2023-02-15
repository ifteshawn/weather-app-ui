import React from "react";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-root": {
      backgroundColor: "transparent",
      // backgroundColor: '#8186D5',
      backdropFilter: "blur(1px)",
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "84.5vh",
  },
  card: {
    width: "80%",
    height: "60%",
    // maxWidth: 700,
    minHeight: 300,
    display: "grid",
    alignContent: "stretch",
  },
}));

export default function ContainerCard() {
  const classes = useStyles();
  const [weather, setWeather] = useState("");

  const baseUrl =
    "https://localhost:7061/api/WeatherInformation/getWeatherInfo/";

  function handleSearch() {
    const city = document.getElementById("cityName").value;

    fetch(
      `${baseUrl}${city}`
      // , {
      //   headers: {
      //     "Authorization": "Bearer 8b7535b42fe1c551f18028f64e8688f7",
      //     "APIKey": "8b7535b42fe1c551f18028f64e8688f7"
      //   },
      // }
    )
      .then((res) => res.json())
      .then((data) => {
        const weather = {
          city: data.city,
          temp: data.temp,
          description: data.description,
          iconSrc:
            "http://openweathermap.org/img/wn/" + `${data.icon}` + "@2x.png",
        };
        // console.log(weather);
        setWeather(weather);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className={classes.root}>
      <Card variant="outlined" className={classes.card}>
        <CardContent
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <img src={weather.iconSrc} alt="Current weather icon." />
            <h3>{weather.temp}°C</h3>
            <h4>{weather.description}</h4>
            <strong>{weather.city}</strong>
          </div>
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
        </CardContent>
      </Card>
    </div>
  );
}
