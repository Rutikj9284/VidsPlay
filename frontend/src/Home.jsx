import React, { useContext, useState, useLayoutEffect, useEffect } from "react";
import Video from "./Video";
import axios from "axios";
import { UserContext } from "./UserContext";
import { layout } from "platform";

const Home = () => {
  const { username, userid } = useContext(UserContext);
  const { setUsername, setid } = useContext(UserContext);
  const [userData, setUserData] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState('');

  function logout() {
    axios.post("/logout").then(() => {
      setUsername(null);
      setid(null);
    });
  }

  async function showHistory() {
    try {
      const response = await axios.get(`/userProfile?username=${username}`);
      const data = response.data;
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user history:", error);
    }
  }

  function goBack() {
    window.location.reload(true);
  }

  useEffect(() => {
    const updateBackgroundColor = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 6 && currentHour < 12) {
        setBackgroundColor("#316d67"); // Light background color for morning
      } else if (currentHour >= 12 && currentHour < 18) {
        setBackgroundColor("#ffe6cc"); // Light background color for afternoon
      } else if (currentHour >= 18 && currentHour < 24) {
        setBackgroundColor("#152238"); // Light background color for evening
      } else {
        setBackgroundColor("#7a2d59"); // Dark background color for night
      }
    };

    updateBackgroundColor();
    document.body.style.backgroundColor = backgroundColor; // Set background color immediately

    // Note: You may want to use localStorage to persist the background color across page reloads

  }, [backgroundColor]);
  
  const userDataArr = [...userData];

  if (userDataArr.length > 0) {
    return (
      <>
        <h1 className="m-4 text-xl font-bold text-white shadow">User:- {username}</h1>
        <h3 className="m-4 text-lg font-bold text-white shadow">Login Information...</h3>
        <div>
          {userDataArr.map((user) => {
            return (
              <div className="m-4">
                <p className="text-white text-lg shadow">Operating System :- {user.OS}</p>
                <p className="text-white text-lg shadow">Browser :- {user.browser}</p>
                <p className="text-white text-lg shadow">Device Type :- {user.deviceType}</p>
                <p className="text-white text-lg shadow">Logged in At :- {user.updatedAt.split("T")}</p>
                <hr />
                <button onClick={goBack} className="mt-2 font-bold text-lg text-blue-500 hover:underline">Go Back...</button>

                <footer className="mt-8 text-center fixed bottom-0 left-0 right-0 bg-gray-200 p-4">
                  <p className="text-gray-700">
                    © 2023 Rutik Jaybhaye. All rights reserved.
                  </p>
                </footer>
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    return (
      <div>
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="https://cdn.dribbble.com/users/108457/screenshots/4928361/video-player-icon.gif"
              width="90rem"
              height="90rem"
              alt="logo.png"
            />
            <h1 className="ml-1 text-white shadow font-bold transition duration-300 hover:font-bold text-xl">
              VidsPlay
            </h1>
          </div>
          <div className="flex items-center">
            <button onClick={showHistory} className="font-bold text-lg  text-white shadow text-base hover:text-xl">
              {username}
            </button>
            <button onClick={showHistory} className="ml-3  text-white shadow text-base hover:text-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8 hover:cursor-pointer text-base hover:w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        <Video videoURL="https://res.cloudinary.com/aremusmog/video/upload/v1668090866/WeTube/TRAILER_qurlei.mp4" />

        <div className="mt-3 flex justify-center items-center">
          <button
            className="bg-green-500 p-2 font-bold hover:text-base text-lg"
            onClick={logout}
          >
            Log Out
          </button>
        </div>

        <footer className="mt-8 text-center fixed bottom-0 left-0 right-0 bg-gray-200 p-4 hover: text-xl">
          <p className="text-gray-500">
            © 2023 Rutik Jaybhaye. All rights reserved.
          </p>
        </footer>
      </div>
      </div>
    );
  }
};

export default Home;
