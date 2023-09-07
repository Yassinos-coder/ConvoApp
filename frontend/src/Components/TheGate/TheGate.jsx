import "./TheGate.css";
import appLogoNoBG from "../../Assets/Images/appLogoNoBG.png";
import { useState } from "react";
import SignupModal from "../../Modals/SignupModal";
import LoginModal from "../../Modals/LoginModal";
import { useDispatch } from "react-redux";
import { AddNewUser } from "../../Redux/UserReducer";

const TheGate = () => {
  const [newUser, setNewUser] = useState(new SignupModal());
  const [newLogin, SetNewLogin] = useState(new LoginModal());
  const dispatch = useDispatch();

  const CreateAccount = () => {
    dispatch(AddNewUser({ newUser: newUser }))
      .then((data) => {
        if (data.payload.message === "usernameTaken") {
          alert("Username Taken");
        } else if (data.payload.message === "ErrorTryAgain") {
          alert("Reload Page and Try Again !");
        } else {
          alert("User Created !");
          localStorage.setItem('uuid', data.payload.userData._id)
          localStorage.setItem('username', data.payload.userData.username)
        }
      })
      .catch((err) => {
        console.warn(`Error in LogIn Dispatch ${err}`);
      });
  };

  return (
    <div className="TheGate">
      <div className="appLogoGate">
        <img className="appLogoGateIMG" src={appLogoNoBG} alt="" />
      </div>
      <div className="userBox">
        <div className="signup">
          <h2>Sign Up</h2>
          <div className="input-group">
            <label className="label">Username</label>
            <input
              autoComplete="off"
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
              autoComplete="off"
              name="Email"
              className="input"
              type="email"
              onChange={(e) => {
                let date = new Date();
                setNewUser({ ...newUser, email: e.currentTarget.value, date_of_creation: date });
              }}
            />
          </div>
          <div className="input-group">
            <label className="label">Password</label>
            <input
              autoComplete="off"
              name="password"
              className="input"
              type="password"
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.currentTarget.value })
              }
            />
          </div>
          <button className="btnSignUp" onClick={() => CreateAccount()}>
            Create Account
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
          <button className="btnSignUp">Log In </button>
        </div>
      </div>
    </div>
  );
};

export default TheGate;
