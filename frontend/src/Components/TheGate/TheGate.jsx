import "./TheGate.css";
import appLogoNoBG from "../../Assets/Images/appLogoNoBG.png";
import { useState } from "react";
import SignupModal from "../../Modals/SignupModal";
import LoginModal from "../../Modals/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { AddNewUser, GetAllUsers, UserLogin } from "../../Redux/UserReducer";
import { useNavigate } from "react-router-dom";
import Loader from "../../Helpers/Loader";
import Notification from "../../Helpers/Notification";
import { GetFriends } from "../../Redux/FriendsReducer";
import wrongPassEffect from "../../Assets/Sounds/wrongPass.mp3";

const TheGate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState(new SignupModal());
  const [newLogin, SetNewLogin] = useState(new LoginModal());
  const [userCreatedSuccess, setCreationResult] = useState(false);
  const [wrongPass, setNotifWrongPass] = useState(false);
  const [systemError, setSysError] = useState(false);
  const requestStatus = useSelector((state) => state.UserReducer.status);

  const CreateAccount = () => {
    dispatch(AddNewUser({ newUser: newUser }))
      .then((data) => {
        if (data.payload.message === "usernameTaken") {
          alert("Username Taken");
        } else if (data.payload.message === "ErrorTryAgain") {
          alert("Reload Page and Try Again !");
        } else {
          setCreationResult(true);
          localStorage.setItem("uuid", data.payload.userData._id);
          localStorage.setItem("username", data.payload.userData.username);
        }
      })
      .catch((err) => {
        console.warn(`Error in CreateAccount Dispatch ${err}`);
      });
  };

  const Login = () => {
    dispatch(UserLogin({ loginData: newLogin }))
      .then((data) => {
        if (data.payload.giveAccess === true) {

          localStorage.setItem("user_status", "connected");
          localStorage.setItem("bigKey", data.payload.userToken);
          localStorage.setItem("uuid", data.payload.userData._id);
          localStorage.setItem("username", data.payload.userData.username);
          localStorage.setItem("user_presence", "Online");
          navigate(`/Dashboard/${localStorage.getItem("uuid")}`);
          dispatch(GetAllUsers());
          dispatch(GetFriends({ uuid: localStorage.uuid }));
        } else if (data.payload.message === "wrongPass!") {
          setNotifWrongPass(true);
          const audioElement = document.getElementById("wrongPassAudio");
          if (audioElement) {
            audioElement.play();
          }
        } else if (data.payload.message === "ErrorTryAgain") {
          setSysError(true);
        }
      })
      .catch((err) => {
        console.warn(`Error in LogIn Dispatch ${err}`);
      });
  };

  return (
    <div className="TheGate">
      <audio id="wrongPassAudio">
        <source src={wrongPassEffect} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {userCreatedSuccess ? (
        <Notification message="Account Created Successfuly !" type="success" />
      ) : (
        ""
      )}
      {wrongPass ? (
        <Notification message="Wrong Password Try Again!" type="danger" />
      ) : (
        ""
      )}
      {systemError ? (
        <Notification
          message="Please Reload Page and Try Again!"
          type="danger"
        />
      ) : (
        ""
      )}
      <div className="appLogoGate">
        <img className="appLogoGateIMG" src={appLogoNoBG} alt="" />
      </div>
      <div className="userBox">
        <div className="signup">
          <h2>Sign Up</h2>
          <div className="input-group">
            <label className="label">Username</label>
            <input
              autoComplete="username"
              name="Username"
              className="input"
              type="text"
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.currentTarget.value })
              }
            />
          </div>
          <div className="input-group">
            <label className="label">Email address</label>
            <input
              autoComplete="email"
              name="Email"
              className="input"
              type="email"
              onChange={(e) => {
                let date = new Date();
                setNewUser({
                  ...newUser,
                  email: e.currentTarget.value,
                  date_of_creation: date,
                });
              }}
            />
          </div>
          <div className="input-group">
            <label className="label">Password</label>
            <input
              autoComplete="new-password"
              name="password"
              className="input"
              type="password"
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.currentTarget.value })
              }
            />
          </div>
          <button className="btnSignUp" onClick={() => CreateAccount()}>
            {requestStatus === "creationPending" ? (
              <Loader />
            ) : (
              "Create Account"
            )}
          </button>
        </div>
        <hr className="hr" />
        <div className="signin">
          <h2>Log In</h2>
          <div className="input-group">
            <label className="label">Username</label>
            <input
              autoComplete="username"
              name="UsernameLogin"
              className="input"
              type="text"
              onChange={(e) =>
                SetNewLogin({ ...newLogin, username: e.currentTarget.value })
              }
            />
          </div>
          <div className="input-group">
            <label className="label">Password</label>
            <input
              autoComplete="current-password"
              name="passwordLogin"
              className="input"
              type="password"
              onChange={(e) =>
                SetNewLogin({ ...newLogin, password: e.currentTarget.value })
              }
            />
          </div>
          <button
            className="btnSignUp"
            onClick={() => {
              Login();
            }}
          >
            {requestStatus === "loginPending" ? <Loader /> : "Log In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TheGate;
