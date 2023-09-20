import "./AccountSettings.css";
import React, { useRef, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import nopp from "../../Assets/Images/nopp.png";
import { FaPenToSquare } from "react-icons/fa6";
import AxiosConfig from "../../Helpers/AxiosConfig";
import Notification from "../../Helpers/Notification";
import {
  UpdateEmail,
  UpdatePassword,
  UpdateUsername,
  uploadProfilePicture,
} from "../../Redux/UserReducer";
import { useNavigate } from "react-router-dom";
import { BsFillCheckSquareFill } from "react-icons/bs";

const AccountSettings = () => {
  const dataFromRedux = useSelector((state) => state.UserReducer.userData);
  const userData =
    JSON.parse(localStorage.getItem("userData")) === "{}"
      ? dataFromRedux
      : JSON.parse(localStorage.getItem("userData"));
  const [modifyUsername, setUsernameModify] = useState(false);
  const [modifyEmail, setEmailModify] = useState(false);
  const [modifyPassword, setPasswordModify] = useState(false);
  let inputFile = useRef();
  const [deleteAvatarFail, setDeleteAvatarFail] = useState(false);
  const [deleteFriendsFail, setDeleteFriendsFail] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newUsername, setNewUsername] = useState();
  const [newEmail, setNewEmail] = useState();
  const [newPassword, setNewPassword] = useState();

  const OpenFileUploader = () => {
    inputFile.click();
  };

  const captureUploadedFile = (e) => {
    const file = e.currentTarget.files[0];
    const picture = new FormData();
    picture.append("picture", file);
    dispatch(
      uploadProfilePicture({ uuid: localStorage.uuid, picture: picture })
    );
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

  const TriggerDeleteAccount = () => {
    AxiosConfig.get(`/users/DeleteAccount/${localStorage.uuid}`).then(
      (response) => {
        if (response.data.message === "opSuccess") {
          navigate("/TheGate");
        } else {
          alert("Something went wrong ! Try Again ");
        }
      }
    );
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
                : `http://192.168.3.194:8009/userData/${userData.username}/${userData.avatar}`
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
                onChange={(e) => setNewUsername({username: e.currentTarget.value})}
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
              :{" "}
              <BsFillCheckSquareFill
                className="FaPenToSquare save"
                onClick={() => {
                  console.log(newUsername)
                  dispatch(
                    UpdateUsername({
                      username: newUsername,
                      uuid: userData._id,
                    })
                  );
                }}
              />
            </span>
          </div>
          <div className="action3">
            {modifyEmail ? (
              <input
                className="inputsSettingsPanel"
                type="email"
                name="email"
                placeholder="Enter an email"
                onChange={(e) => setNewEmail({email: e.currentTarget.value})}
              />
            ) : (
              <input
                className="inputsSettingsPanel"
                type="email"
                name="email"
                disabled
                value={dataFromRedux.email}
              />
            )}{" "}
            <span>
              <FaPenToSquare
                className="FaPenToSquare"
                onClick={() => setEmailModify(!modifyEmail)}
              />
              :{" "}
              <BsFillCheckSquareFill
                className="FaPenToSquare save"
                onClick={() => {
                  dispatch(
                    UpdateEmail({
                      email: newEmail,
                      uuid: userData._id,
                    })
                  );
                }}
              />
            </span>
          </div>
          <div className="action4">
            {modifyPassword ? (
              <input
                className="inputsSettingsPanel"
                type="password"
                name="new-password"
                placeholder="Enter a password"
                onChange={(e) => setNewPassword({password: e.currentTarget.value})}
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
              :{" "}
              <BsFillCheckSquareFill
                className="FaPenToSquare save"
                onClick={() => {
                  dispatch(
                    UpdatePassword({
                      password: newPassword,
                      uuid: userData._id,
                    })
                  );
                }}
              />
            </span>
          </div>
          <div className="action5">
            <button onClick={TriggerFriendsDelete}>Remove All Friends</button>
            <button onClick={TriggerDeleteAccount}>Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
