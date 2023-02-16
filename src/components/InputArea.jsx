import React from "react";

export default function InputArea(props) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <label>{props.inputLabel} </label>
      <input
        id={props.inputId}
        type="text"
        placeholder={props.inputPlaceholder}
      ></input>
    </div>
  );
}
