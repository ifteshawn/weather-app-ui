import { React, useState } from "react";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import WeatherInfoArea from "./WeatherInfoArea";
import SearchArea from "./SearchArea";
import ErrorInfo from "./ErrorInfo";
import { DotLoader } from "react-spinners";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiCard-root": {
      backgroundColor: "transparent",
      backdropFilter: "blur(1px)",
      width: "80%",
      height: "60%",
      maxWidth: "1000px",
      minWidth: "300px",
      minHeight: "300px",
      display: "grid",
      borderRadius: "30px",
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "84.5vh",
  },
}));

const envApiKeys = process.env.REACT_APP_API_KEYS;
const weatherApiKeys = envApiKeys.split(",");
const baseUrl = "https://localhost:7061/api/WeatherInformation/getWeatherInfo/";
let currentIndex = 0;

export default function ContainerCard() {
  const classes = useStyles();
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = weatherApiKeys[currentIndex];
  const [loading, setLoading] = useState(false);

  function search(city, country) {
    setWeather(null);
    setError(null);
    setLoading(true);
    const headers = { "x-api-key": `${apiKey}` };
    console.log(
      `Requesting weather info for ${city}/${country} using API key ${apiKey}`
    );
    fetch(`${baseUrl}${city}/${country}`, { headers })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 429) {
          if (currentIndex < weatherApiKeys.length - 1) {
            currentIndex++;
            console.log(
              `API key ${apiKey} has reached its request limit. Switching to API key ${weatherApiKeys[currentIndex]}`
            );
          } else {
            currentIndex = 0;
            throw new Error(
              "All API keys have reached their request limit. Please wait an hour to make another request."
            );
          }
          throw new Error(
            "Current API key has reached its request limit. Please try again to use another API key for your request."
          );
        } else if (res.status === 404) {
          throw new Error(
            "City not found. Please enter a valid City and Country"
          );
        } else {
          throw new Error("Unable to retrieve weather data. Please try again.");
        }
      })
      .then((data) => {
        setError(null);
        setWeather(data);

        console.log(weather);
        setLoading(false);
      })
      .catch((error) => {
        if (error instanceof TypeError) {
          setError(
            new Error("Problem connecting to server. Please try again later.")
          );
        } else {
          console.error(error);
          setWeather(null);
          setError(error);
        }
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className={classes.root}>
      <Card variant="outlined">
        <CardContent
          style={{ display: "flex", justifyContent: "space-evenly" }}
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
          <SearchArea onSearch={search} />
        </CardContent>
      </Card>
    </div>
  );
}
