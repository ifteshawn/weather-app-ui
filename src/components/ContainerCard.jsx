import React from "react";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import WeatherInfoArea from "./WeatherInfoArea";
import SearchArea from "./SearchArea";

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

  function search(city) {
    // const city = document.getElementById("cityName").value;

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
          <WeatherInfoArea
            imgSrc={weather.iconSrc}
            temp={weather.temp}
            description={weather.description}
            city={weather.city}
          />
          <SearchArea onSearch={search} />
        </CardContent>
      </Card>
    </div>
  );
}
