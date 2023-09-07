import "./HomePage.css";
import React from "react";
import appLogo from "../../Assets/Images/appLogo.png";
import appLogoFull from "../../Assets/Images/appLogoFull.png";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <div className="HomePage">
      <div className="header">
        <div className="headerContent">
          <div className="title">
            <img className="appLogoHeader" src={appLogo} alt="" />
            <p className="pHeader">
              Convo <span className="spanChat">CHAT</span>
            </p>
          </div>
          <div className="actions">
            {localStorage.getItem("user_status") === "connected" ? (
              <>
                <button className="btn btnDashHeader" onClick={()=> {navigate(`/Dashboard/${localStorage.uuid}`)}}></button>
              </>
            ) : (
              <>
                <button className="btn btnGateHeader" onClick={()=> {navigate('./TheGate')}}></button>
              </>
            )}
            <button className="btn2">Report Bugs</button>
          </div>
        </div>
      </div>
      <div className="main">
        <img className="appLogoHomePage" src={appLogoFull} alt="" />
        <div className="text">
          <h2>1- What is Convo ?</h2>
          <p>
            - Welcome to convoChat, where safety, security, and seamless
             performance come together in one powerful chat app.
          </p>
          <p>
            - Built with the cutting-edge MERN stack, convoChat ensures your
            conversations
            remain private, your data stays secure, and your chats flow
            effortlessly.
          </p>
        </div>
      </div>
      <footer>
        <h1>Developed with ❤️ by <a href="https://github.com/Yassinos-coder">Yassinos-Coder</a></h1>
      </footer>
    </div>
  );
};

export default HomePage;
