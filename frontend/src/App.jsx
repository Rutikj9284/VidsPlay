import './App.css'
import axios from 'axios';
import {UserContextProvider } from './UserContext';
import Routes from './Routes';

function App() {
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://vidsplay8.onrender.com";
  axios.defaults.baseURL = backendUrl;
  axios.defaults.withCredentials = true;
  return (
      <UserContextProvider>
        <Routes />
      </UserContextProvider>
  )
}

export default App
