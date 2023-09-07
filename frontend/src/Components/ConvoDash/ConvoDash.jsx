import "./ConvoDash.css";
import React from "react";
import nopp from "../../Assets/Images/nopp.png";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { MdVideoCall } from 'react-icons/md'

const ConvoDash = () => {
  return (
    <div className="ConvoDash">
      <div className="headerConvoDash">
        <div className="friendLogo">
          <img src={nopp} alt="Logo" />
        </div>
        <div className="friendName">
          <h3>mbennani</h3>
        </div>
        <div className="friendActions">
          <div className="voiceCall">
            <IoIosCall className="IoIosCall" />
          </div>
          <div className="videoCall">
            <MdVideoCall className="MdVideoCall" />
          </div>
          <div className="deleteFriend">
            <FaTrashAlt className="FaTrashAlt" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvoDash;
