import React from "react";

export default function WeatherInfoArea(props) {
//   const [weather, setWeather] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <img src={props.imgSrc} alt="Current weather icon." />
      <h3>{props.temp}°C</h3>
      <h4>{props.description}</h4>
      <strong>{props.city}</strong>
    </div>
  );
}
