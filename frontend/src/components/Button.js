import React from "react";

export default function Button(props) {
  return (
    <div
      className="button"
      style={{
        background: props.bg,
        padding: props.bPad,
        borderRadius: props.bRad,
        color: props.color,
      }}
      onClick={props.onClick}>
      {props.icon} {props.name}
    </div>
  );
}
