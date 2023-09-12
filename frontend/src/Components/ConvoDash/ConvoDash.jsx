import "./ConvoDash.css";
import React, { useEffect, useState } from "react";
import nopp from "../../Assets/Images/nopp.png";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";
import { BsSendFill, BsUpload } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetMessages, SendMessage } from "../../Redux/MessageReducer";
import MessageModal from "../../Modals/MessageModal";

const ConvoDash = () => {
  const today = new Date();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayIndex = today.getDay();
  const dayName = daysOfWeek[dayIndex];
  const location = useLocation();
  const friendData = location.state.data;
  const friendPresence = location.state.matchedFriend;
  const dispatch = useDispatch();
  const [newMassage, setNewMessage] = useState(new MessageModal());
  const userMessages = useSelector(
    (state) => state.MessageReducer.userMessages
  );

  useEffect(() => {
    let fetchData = {
      from: friendData.owner,
      to: friendData.friend,
    };
    dispatch(GetMessages({ fetchData }));
  });

  const TriggerSendMessage = () => {
    dispatch(SendMessage({ dataDM: newMassage }));
  };

  return (
    <div className="ConvoDash">
      <div className="headerConvoDash">
        <div className="friendLogo">
          <img
            src={
              friendData.friendAvatar === "none"
                ? nopp
                : `https://192.168.3.194:8009/userData/${friendData.friendUsername}/${friendData.friendAvatar}`
            }
            alt="Logo"
          />
        </div>
        <div className="friendName">
          <h3>
            {friendData.friendUsername}
            <GoDotFill
              className="GoDotFill"
              style={
                friendPresence.user_presence === "Online"
                  ? { color: "green" }
                  : { color: "red" }
              }
            />
          </h3>
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
        <p>{`${dayName}, ${hours}:${minutes}`}</p>
        <div className="mainDivMessages">
          {userMessages.map((message, index) => {
            return (
              <>
                <div
                  key={index}
                  className={
                    message.from === localStorage.uuid
                      ? "messageDIVFromMe"
                      : "messageDIVFromOther"
                  }
                >
                  <img
                    src={
                      friendData.friendAvatar === "none"
                        ? nopp
                        : `https://192.168.3.194:8009/userData/${friendData.friendUsername}/${friendData.friendAvatar}`
                    }
                    className="logo"
                    alt=""
                  />
                  <p>{message.message}</p>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="ConvoFooter">
        <div className="inputArea">
          <div className="textInput">
            <input
              type="text"
              name="message"
              placeholder="Type your message..."
              onChange={(e) => {
                setNewMessage({
                  ...newMassage,
                  from: localStorage.uuid,
                  to: friendData.friend,
                  message: e.currentTarget.value,
                  date_of_message: `${dayName}, ${hours}:${minutes}`,
                });
              }}
            />
          </div>
          <div className="messageActions">
            <BsSendFill className="BsSendFill" onClick={TriggerSendMessage} />
            <BsUpload className="BsUpload" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvoDash;
