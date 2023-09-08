import "./ConvoDash.css";
import React from "react";
import nopp from "../../Assets/Images/nopp.png";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";
import { BsSendFill, BsUpload } from "react-icons/bs";

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
      <div className="ConvoBody">
        <div className="messages">
          <div className="logo">
            <img src={nopp} alt="" />
          </div>
          <div className="textMessage">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus
              faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Leo
              a diam sollicitudin tempor id eu nisl nunc mi. Id aliquet risus
              feugiat in ante metus dictum at. Purus sit amet luctus venenatis
              lectus magna. Pellentesque diam volutpat commodo sed egestas.
              Natoque penatibus et magnis dis parturient montes nascetur
              ridiculus. Facilisis sed odio morbi quis commodo. Sit amet dictum
              sit amet justo donec enim diam vulputate. Magna etiam tempor orci
              eu. Eu tincidunt tortor aliquam nulla facilisi cras fermentum
              odio. Dignissim sodales ut eu sem integer vitae. Senectus et netus
              et malesuada fames ac turpis egestas integer. Vulputate ut
              pharetra sit amet. Diam sit amet nisl suscipit adipiscing
              bibendum.
            </p>
          </div>
        </div>
      </div>
      <div className="ConvoFooter">
        <div className="inputArea">
          <div className="textInput">
            <input
              type="text"
              name="message"
              placeholder="Type your message..."
            />
          </div>
          <div className="messageActions">
            <BsSendFill className="BsSendFill" />
            <BsUpload className="BsUpload" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvoDash;
