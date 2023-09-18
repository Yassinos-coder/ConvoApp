import "./AccountSettings.css";
import React, { useRef, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { useSelector } from "react-redux";
import nopp from "../../Assets/Images/nopp.png";
import { FaPenToSquare } from "react-icons/fa6";
import AxiosConfig from "../../Helpers/AxiosConfig";
import Notification from "../../Helpers/Notification";

const AccountSettings = () => {
  const dataFromRedux = useSelector((state) => state.UserReducer.userData)
  const userData = dataFromRedux ? dataFromRedux : sessionStorage.getItem('userData') 
  const [modifyUsername, setUsernameModify] = useState(false);
  const [modifyEmail, setEmailModify] = useState(false);
  const [modifyPassword, setPasswordModify] = useState(false);
  let inputFile = useRef();
  const [deleteAvatarFail, setDeleteAvatarFail] = useState(false);
  const [deleteFriendsFail, setDeleteFriendsFail] = useState(false);

  const OpenFileUploader = () => {
    inputFile.click();
  };

  const captureUploadedFile = (e) => {
    const file = e.currentTarget.files[0];
  };

  const TriggerAvatarDelete = () => {
    AxiosConfig.get(`/users/DeleteAvatar/${localStorage.uuid}`)
      .then((response) => {
        if (response.data.message === "opSuccess") {
          window.location.reload();
        } else if (response.data.message === "opFail") {
          setDeleteAvatarFail(true);
        }
      })
      .catch((err) => console.warn(`Error in DeleteAvatar API CALL ${err}`));
  };

  const TriggerFriendsDelete = () => {
    AxiosConfig.get(`/friends/DeleteAllFriends/${localStorage.uuid}`)
      .then((response) => {
        if (response.data.message === "opSuccess") {
          window.location.reload();
        } else if (response.data.message === "opFail") {
          setDeleteFriendsFail(true);
        }
      })
      .catch((err) => console.warn(`Error in DeleteAvatar API CALL ${err}`));
  };

  return (
    <div className="AccountSettings">
      {deleteAvatarFail ? (
        <Notification
          message="Operation Failed, Try Again Later !"
          type="danger"
        />
      ) : (
        ""
      )}

      {deleteFriendsFail ? (
        <Notification
          message="Operation Failed, Try Again Later !"
          type="danger"
        />
      ) : (
        ""
      )}

      <div className="AccountSettingsHeader">
        <h2>
          <FiSettings className="FiSettings" /> Settings
        </h2>
      </div>
      <div className="panel">
        <div className="userLogoPanel">
          <img
            className="userLogoPanelIMG"
            src={
              userData.avatar === "none"
                ? nopp
                : `https://192.168.3.194:8009/userData/${userData.username}/${userData.username}`
            }
            alt=""
          />
        </div>
        <div className="userActionsPanel">
          <div className="action1">
            <button onClick={OpenFileUploader}>Upload an avatar</button>
            <input
              type="file"
              accept=".jpg, .png, .jpeg, .gif"
              style={{ display: "none" }}
              ref={(input) => {
                inputFile = input;
              }}
              onChange={(e) => {
                captureUploadedFile(e);
              }}
            />
            <button onClick={TriggerAvatarDelete}>Delete the avatar</button>
          </div>
          <div className="action2">
            {modifyUsername ? (
              <input
                className="inputsSettingsPanel"
                type="text"
                name="new-username"
                placeholder="Enter a username"
              />
            ) : (
              <input
                className="inputsSettingsPanel"
                type="text"
                name="username"
                disabled
                value={userData.username}
              />
            )}
            <span>
              <FaPenToSquare
                className="FaPenToSquare"
                onClick={() => setUsernameModify(!modifyUsername)}
              />
              : Modify Username
            </span>
          </div>
          <div className="action3">
            {modifyEmail ? (
              <input
                className="inputsSettingsPanel"
                type="email"
                name="email"
                placeholder="Enter an email"
              />
            ) : (
              <input
                className="inputsSettingsPanel"
                type="email"
                name="email"
                disabled
                value={userData.email}
              />
            )}{" "}
            <span>
              <FaPenToSquare
                className="FaPenToSquare"
                onClick={() => setEmailModify(!modifyEmail)}
              />
              : Modify Email
            </span>
          </div>
          <div className="action4">
            {modifyPassword ? (
              <input
                className="inputsSettingsPanel"
                type="password"
                name="new-password"
                placeholder="Enter a password"
              />
            ) : (
              <input
                className="inputsSettingsPanel"
                type="password"
                name="current-password"
                disabled
                value="123456"
              />
            )}{" "}
            <span>
              <FaPenToSquare
                className="FaPenToSquare"
                onClick={() => setPasswordModify(!modifyPassword)}
              />
              : Modify Password
            </span>
          </div>
          <div className="action5">
            <button onClick={TriggerFriendsDelete}>Remove All Friends</button>
            <button>Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
