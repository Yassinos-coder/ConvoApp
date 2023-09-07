import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import { useEffect } from "react";
import TheGate from "./Components/TheGate/TheGate";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "./Components/Dashboard/Dashboard";
import ConvoDash from "./Components/ConvoDash/ConvoDash";

function App() {
  useEffect(() => {
    localStorage.setItem("app_name", "ConvoChat");
    localStorage.setItem("user_agent", navigator.userAgent);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/TheGate" element={<TheGate />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/Dashboard/:uuid/" element={<Dashboard />}>
              <Route index element={<ConvoDash />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
