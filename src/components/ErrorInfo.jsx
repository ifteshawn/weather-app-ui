import React from "react";
import "../styles.css"

export default function ErrorInfo(props) {
  return (
    <div className="div-response-info" style={{alignItems:"center"}}>
      <img src="./error.png" alt="Failure icon" className="img-error" />
      <h4>{props.message}</h4>
    </div>
  );
}
