import React from "react";
import Loader from "./Loader"; 

export default function Button(props) {
  return (
    <div
      className="button"
      style={{
        background: props.bg,
        padding: props.bPad,
        borderRadius: props.bRad,
        color: props.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: props.loading ? 'not-allowed' : 'pointer', // Change cursor if loading
        opacity: props.loading ? 0.7 : 1, // Reduce opacity if loading
      }}
      onClick={props.loading ? null : props.onClick} disabled={props.loading || props.disabled}>
      {props.loading ? <Loader /> : <>{props.icon} {props.name}</>}
    </div>
  );
}
