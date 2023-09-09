import { Outlet, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import React, { useState } from "react";
import nopp from "../../Assets/Images/nopp.png";
import { GoDotFill } from "react-icons/go";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import AxiosConfig from "../../Helpers/AxiosConfig";
import { BsPersonFillAdd } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import AddFriendModal from "../../Modals/AddFriendModal";
import { AddFriend } from "../../Redux/FriendsReducer";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [friendData, setFriendData] = useState(new AddFriendModal());
  const [AddFriendToggle, setAddFriendToggle] = useState(false);

  const logout = async () => {
    try {
      await AxiosConfig.post(`/users/changeStatus/${localStorage.uuid}`);
    } catch (err) {
      console.log(`Error in LogOut: ${err.message}`);
    }
    localStorage.removeItem("username");
    localStorage.removeItem("uuid");
    localStorage.removeItem("bigKey");
    localStorage.removeItem("user_status");
    localStorage.setItem("user_presence", "Offline");
    navigate("/");
  };

  const SendAddFriend = () => {
    dispatch(AddFriend({friendData: friendData})).then((data) => {
      
    });
  };

  return (
    <div className="Dashboard">
      <div
        className="AddFriend"
        style={AddFriendToggle ? {} : { display: "none" }}
      >
        <AiOutlineClose
          onClick={() => setAddFriendToggle(false)}
          className="AiOutlineClose"
        />
        <div className="addfriendInput">
          <input
            type="text"
            name="friendInput"
            placeholder="Ex: Yassinos"
            onChange={(e) => setFriendData({ ...friendData, owner: localStorage.uuid, friend: e.currentTarget.value})}
          />
        </div>
        <div className="addBtn">
          <button onClick={SendAddFriend}>Send Invite</button>
        </div>
      </div>
      <div className="Body">
        <div className="leftBar">
          <div className="LeftBarHeader">
            <div className="LeftBarheaderContent">
              <div className="userLogo">
                <img src={nopp} alt="" />
              </div>
              <div className="username">
                <p>
                  Welcome,{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {localStorage.username}
                  </span>{" "}
                </p>
              </div>
            </div>
            <div className="userDetailsData">
              <div className="onlineStatus">
                <p>
                  <GoDotFill
                    className="GoDotFill"
                    style={
                      localStorage.user_presence === "Online"
                        ? { color: "green" }
                        : { color: "red" }
                    }
                  />
                  {localStorage.user_presence === "Online"
                    ? "Online"
                    : "Offline"}
                </p>
              </div>
              <div className="settingsBtn">
                <FiSettings className="FiSettings" />
              </div>
              <div className="logout">
                <BiLogOut
                  className="BiLogOut"
                  onClick={() => {
                    logout();
                  }}
                />
              </div>
            </div>
          </div>
          <div className="FriendsList">
            <h3>
              Friends List :{" "}
              <BsPersonFillAdd
                className="BsPersonFillAdd"
                onClick={
                  AddFriendToggle ? undefined : () => setAddFriendToggle(true)
                }
                style={AddFriendToggle ? { cursor: "not-allowed" } : {}}
              />
            </h3>
          </div>
        </div>
        <div className="rightBar">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
