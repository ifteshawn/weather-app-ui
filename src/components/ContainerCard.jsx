import React from "react";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-root": {
      backgroundColor: 'transparent',
      // backgroundColor: '#8186D5',
      backdropFilter: 'blur(1px)'
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '84.5vh',
  },
  card: {
    width: '80%',
    maxWidth: 700,
  },
}));

export default function ContainerCard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card
        variant="outlined"
        className={classes.card} >
        <CardContent >
          <p>This is a sample card with a backdrop filter effect applied to its
            container.</p>
        </CardContent>
      </Card>
    </div>
  );
}
