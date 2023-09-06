import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './Components/HomePage/HomePage';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    localStorage.setItem('app_name', 'ConvoChat')
    localStorage.setItem('user_status', 'disconnected')
    localStorage.setItem('uuid', 'none')
    localStorage.setItem('username', 'none')
    localStorage.setItem('user_agent', navigator.userAgent)
  },[])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
