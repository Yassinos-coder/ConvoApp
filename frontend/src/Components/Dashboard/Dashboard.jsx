/* eslint-disable react-hooks/exhaustive-deps */
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import React, { useEffect, useState } from "react";
import nopp from "../../Assets/Images/nopp.png";
import { GoDotFill } from "react-icons/go";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import AxiosConfig from "../../Helpers/AxiosConfig";
import { BsPersonFillAdd } from "react-icons/bs";
import { AiFillHome, AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import AddFriendModal from "../../Modals/AddFriendModal";
import { AddFriend, GetFriends } from "../../Redux/FriendsReducer";
import Loader from "../../Helpers/Loader";
import { GetAllUsers } from "../../Redux/UserReducer";
import { GetLastUserDMS } from "../../Redux/MessageReducer";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [friendData, setFriendData] = useState(new AddFriendModal());
  const [AddFriendToggle, setAddFriendToggle] = useState(false);
  const AllUserData = useSelector((state) => state.UserReducer.AllUserData);
  const FriendList = useSelector(
    (state) => state.FriendsReducer.userFriendList
  );
  const dataFromRedux = useSelector((state) => state.UserReducer.userData);
  const LastDM = useSelector((state) => state.MessageReducer.allLastDMS);

  const userData =
    JSON.parse(localStorage.getItem("userData")) === "{}"
      ? dataFromRedux
      : JSON.parse(localStorage.getItem("userData"));
  const [friendListArrival, setFriendListArrival] = useState(true);
  const [UserAvatarSetter, setUserAvatarSetter] = useState(nopp);

  useEffect(() => {
    TriggerGetFriends();
    setUserAvatarSetter(
      userData.avatar === "none"
        ? nopp
        : `http://192.168.3.194:8009/userData/${userData.username}/${userData.avatar}`
    );
    setInterval(() => {
      dispatch(GetAllUsers());
    }, 1000);
    dispatch(GetLastUserDMS({ uuid: localStorage.uuid }));
  }, []);

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
    dispatch(AddFriend({ friendData: friendData })).then((data) => {
      if (data.length > 0) {
      }
    });
    setAddFriendToggle(false);
  };

  const TriggerGetFriends = () => {
    dispatch(GetFriends({ uuid: localStorage.uuid })).then((data) => {
      if (data.payload.message === "opSuccess") {
        setFriendListArrival(false);
      } else if (data.payload.message === "opFail") {
        setFriendListArrival(true);
      }
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
            onChange={(e) =>
              setFriendData({
                ...friendData,
                owner: localStorage.uuid,
                friend: e.currentTarget.value,
              })
            }
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
                <img src={UserAvatarSetter} alt="" />
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
              <div className="HomeBtn">
                <Link to={`/Dashboard/${localStorage.uuid}`}>
                  <AiFillHome className="AiFillHome" />
                </Link>
              </div>
              <div className="settingsBtn">
                <Link to={`AccountSettings/${localStorage.uuid}`}>
                  <FiSettings className="FiSettings" />
                </Link>
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
            <div className="loadingFriends">
              {friendListArrival ? <Loader /> : <></>}
            </div>
            <div className="friends">
              {FriendList.map((friend, index) => {
                const matchedFriend = AllUserData.find(
                  (user) => user._id === friend.friend
                );

                return (
                  <Link
                    to={`ConvoDash/${friend.friend}`}
                    key={index}
                    state={{ data: friend, matchedFriend: matchedFriend }}
                  >
                    <div className="friendCard" key={index}>
                      <div className="friendAvatar">
                        <img
                          src={
                            friend.friendAvatar === "none"
                              ? nopp
                              : `http://192.168.3.194:8009/userData/${friend.friendUsername}/${friend.friendAvatar}`
                          }
                          alt=""
                        />
                        <GoDotFill
                          className={`GoDotFillFriendList`}
                          style={
                            matchedFriend &&
                            matchedFriend.user_presence === "Online"
                              ? { color: "green" }
                              : { color: "red" }
                          }
                        />
                      </div>
                      <div className="friendUsername">
                        <h3> {friend.friendUsername} </h3>
                        <p>
                          
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
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
