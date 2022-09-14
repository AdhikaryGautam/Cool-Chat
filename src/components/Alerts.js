import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const Alerts = ({ message, setErr }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setErr(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className="alert-message">
      <div className="icon">
        <FaTimes />
      </div>
      <div className="text">
        <h5>Error</h5>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Alerts;
