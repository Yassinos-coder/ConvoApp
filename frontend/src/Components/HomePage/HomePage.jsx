import "./HomePage.css";
import React from "react";
import appLogo from "../../Assets/Images/appLogo.png";

const HomePage = () => {
  return (
    <div className="HomePage">
      <div className="header">
        <div className="headerContent">
          <div className="title">
            <img className="appLogoHeader" src={appLogo} alt="" />
            <p className="pHeader">Convo Chat</p>
          </div>
          <div className="actions">
            {localStorage.getItem("user_status") === "connected" ? (
              <>
                <button className="btn btnDashHeader"></button>
              </>
            ) : (
              <>
                <button className="btn btnGateHeader"></button>
              </>
            )}
            <button className="btn2">Report Bugs</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
