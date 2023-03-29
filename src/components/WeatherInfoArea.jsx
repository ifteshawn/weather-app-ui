import React from "react";
import "../styles.css";

export default function WeatherInfoArea(props) {
  return (
    <div
    data-testid="weather-info-area"
      className="div-response-info"
    >
      <img src={props.imgSrc} alt="Current weather icon." />
      <h3>{props.temp}°C</h3>
      <h4>{props.description}</h4>
      <strong>
        {props.city}, {props.countryCode}
      </strong>
    </div>
  );
}
