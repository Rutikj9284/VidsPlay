import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import platform from "platform";
import bowser from "bowser";
function LoginAndRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUsername: setLoggedInUsername, setid } = useContext(UserContext);
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("register");

  async function handleSubmit(event) {
    event.preventDefault();
    const url = isLoginOrRegister === "register" ? "/register" : "/login";
    const browserInfo = bowser.parse(window.navigator.userAgent);
    // console.log("Browser Name:", browserInfo.browser.name);

    //Os name and version
    const osInfo = platform.os;
    // console.log("Operating System:", osInfo.family, osInfo.version);

    //Device type
    const windowWidth = window.innerWidth; // Use innerWidth instead of innerHeight for window width
// console.log(windowWidth);
let deviceType;
if (windowWidth >= 768) {
  deviceType = "Desktop";
} else if (windowWidth >= 480 && windowWidth < 768) {
  deviceType = "Tablet";
} else {
  deviceType = "Mobile";
}

    const { data } = await axios.post(url, { username, password, browser:browserInfo.browser.name, OS: osInfo.family, deviceType});
    //after posting user typed data through JWT we can sign in
    //now see context
    //browse name

    console.log("Device Type:", deviceType);
    setLoggedInUsername(username);
    setid(data.userId);
  }
  return (
    <div className="bg-green-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          className="block w-full rouded-sm p-2 mb-2 border"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="block w-full rouded-sm p-2 mb-2 border"
        />
        <button className="bg-green-500 text-white block w-full rouded-sm p-2">
          {isLoginOrRegister == "register" ? "Register" : "Login"}
        </button>

        <div className="text-center mt-2">
          {isLoginOrRegister === "register" && (
            <div>
              Already a member?
              <button
                className="ml-1 hover:text-blue-700"
                onClick={() => setIsLoginOrRegister("login")}
              >
                Login here
              </button>
            </div>
          )}
          {isLoginOrRegister === "login" && (
            <div>
              Dont have an account?
              <button
                className="ml-1 hover:text-blue-700"
                onClick={() => setIsLoginOrRegister("register")}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default LoginAndRegister;
