import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { API_URL } from "../../../api/apiurl";
import { GlobalState } from "../../../GlobalState";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const state = useContext(GlobalState);
  
  // check token and setToken from GlobalState
const [token,setToken] = state.token
const [userRole] = state.userAPI.userRole


  const [responsedata, setreponsedata] = useState("");

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("login clicked");

      const res = await axios.post(`/user/login`, { ...user });

setToken(res.data.accesstoken)
localStorage.setItem('token',res.data.accesstoken)


      localStorage.setItem("firstLogin", true);
      



   

        window.location.href = "/";
    } catch (err) {
        console.log(err)
     // alert(err?.response?.data?.msg);
    }
  };

  return (
    <div className="login-page">
        {userRole}
      <form onSubmit={loginSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={user.email}
          onChange={onChangeInput}
        />

        <input
          type="password"
          name="password"
          required
          autoComplete="on"
          placeholder="Password"
          value={user.password}
          onChange={onChangeInput}
        />

        <div className="row">
          <button type="submit">Login</button>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
