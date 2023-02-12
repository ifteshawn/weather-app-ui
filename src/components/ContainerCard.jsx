import React from "react";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import { makeStyles } from "@mui/styles";

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
    display: 'grid',
    alignContent: 'stretch'
  },
}));

export default function ContainerCard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card variant="outlined" className={classes.card}>
        <CardContent
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <div style={{display:'flex', flexDirection: "column", justifyContent:'center'}}>
            <img src="http://openweathermap.org/img/wn/10d@2x.png" />
            <h3>-12°C</h3>
            <h4>Snow storm</h4>
            <strong>Rockhampton, QLD</strong>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <label>City: </label>
              <input type="text" placeholder="Enter a City name here."></input>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <label>Country: </label>
              <input
                type="text"
                placeholder="Enter a Country name here."
              ></input>
            </div>
            <button>Search</button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
