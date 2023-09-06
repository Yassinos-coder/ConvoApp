import "./TheGate.css";
import appLogoNoBG from "../../Assets/Images/appLogoNoBG.png";

const TheGate = () => {
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
            />
          </div>
          <div className="input-group">
            <label className="label">Email address</label>
            <input
              autoComplete="off"
              name="Email"
              className="input"
              type="email"
            />
          </div>
          <div className="input-group">
            <label className="label">Password</label>
            <input
              autoComplete="off"
              name="password"
              className="input"
              type="password"
            />
          </div>
          <button className="btnSignUp">Create Account</button>
        </div>
        <hr className="hr"/>
        <div className="signin">
          <h2>Log In</h2>
          <div className="input-group">
            <label className="label">Email address</label>
            <input
              autoComplete="Email"
              name="Email"
              className="input"
              type="email"
            />
          </div>
          <div className="input-group">
            <label className="label">Password</label>
            <input
              autoComplete="current-password"
              name="password"
              className="input"
              type="password"
            />
          </div>
          <button className="btnSignUp">Log In </button>
        </div>
      </div>
    </div>
  );
};

export default TheGate;
