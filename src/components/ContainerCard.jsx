import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { makeStyles } from "@mui/styles";
import { DotLoader } from "react-spinners";
import WeatherInfoArea from "./WeatherInfoArea";
import SearchArea from "./SearchArea";
import ErrorInfo from "./ErrorInfo";
import { fetchWeather } from "../utils/WeatherUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiCard-root": {
      backgroundColor: "transparent",
      backdropFilter: "blur(1px)",
      borderRadius: "30px",
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "84.5vh",
  },
  card: {
    width: "80%",
    height: "60%",
    maxWidth: "1000px",
    minWidth: "300px",
    minHeight: "300px",
    display: "grid",
  },
  content: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

export default function ContainerCard() {
  const classes = useStyles();
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(city, country) {
    setWeather(null);
    setError(null);
    setLoading(true);

    try {
      const data = await fetchWeather(city, country);
      setWeather(data);
    } catch (error) {
      if (error instanceof TypeError) {
        setError(
          new Error("Problem connecting to server. Please try again later.")
        );
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={classes.root}>
      <Card variant="outlined" className={classes.card}>
        <CardContent
          data-testid="cardcontent"
          className={classes.content}
        >
          {weather && weather.weather && weather.weather[0].iconSource && (
            <WeatherInfoArea
              imgSrc={weather.weather[0].iconSource}
              temp={weather.main.temp}
              description={weather.weather[0].description}
              city={weather.name}
              countryCode={weather.sys.country}
            />
          )}
          {error !== null && <ErrorInfo message={error.message} />}
          {loading && (
            <div className="div-response-info">
              <DotLoader color={"#474e68"} loading={loading} size={80} />
            </div>
          )}
          <SearchArea onSearch={handleSearch} />
        </CardContent>
      </Card>
    </div>
  );
}
