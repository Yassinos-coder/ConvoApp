import "./Helpers.css";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AiFillCheckCircle, AiFillInfoCircle } from "react-icons/ai";
import { MdDangerous } from "react-icons/md";

const Notification = (props) => {
    const [visibility, setVisible] = useState(true)
    useEffect(() => {
        setInterval(() => {
             setVisible(false)
        }, 5000);
    },[])
  return (
    <div className="Notification" style={visibility ? {} : {display: 'none'}}>
      <div className="icon">
        {props.type === "success" ? (
          <AiFillCheckCircle  className="iconIcon" style={{color:'green'}}/>
        ) : props.type === "danger" ? (
          <MdDangerous className="iconIcon" style={{color: 'red'}}/>
        ) : (
          <AiFillInfoCircle className="iconIcon" style={{color:'grey'}}/>
        )}
      </div>
      <div className="messageBox">
        <p> {props.message} </p>
      </div>
    </div>
  );
};

export default Notification;
