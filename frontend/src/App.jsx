import './App.css'
import axios from 'axios';
import {UserContextProvider } from './UserContext';
import Routes from './Routes';

function App() {
  const backendUrl = "https://vids-play-backend.vercel.app";
  axios.defaults.baseURL = backendUrl;
  axios.defaults.withCredentials = true;
  return (
      <UserContextProvider>
        <Routes />
      </UserContextProvider>
  )
}

export default App
