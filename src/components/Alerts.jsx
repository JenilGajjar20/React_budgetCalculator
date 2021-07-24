import React from "react";

const Alerts = ({ type, text }) => {
  return <div className={`alert alert-${type}`}>{text}</div>;
};

export default Alerts;
