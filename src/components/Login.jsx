import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice.js";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants.js";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoggedInForm, setIsLoggedInForm] = useState(true)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!emailId || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const res = await axios.post(
        BASE_URL + "login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setError(
        error?.response?.data?.message || "Invalid credentials or server error."
      );
    }
  };
  const handleSignup=async()=>{
    try {
      const res = await axios.post(BASE_URL + "register",{
        firstName, lastName, emailId, password
      },{
        withCredentials: true
      })
      dispatch(addUser(res.data.data))
      return navigate('/profile')
    } catch (error) {
      setError(error?.response?.data || "Something went wrong.")
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
         {isLoggedInForm ? "Login Form" : "Signup form"}
        </h2> 
        {
          !isLoggedInForm && <><div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            First Name
          </label>
          <input
            type="text"
            placeholder=""
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Last Name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        </>
        }
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={isLoggedInForm ? handleLogin : handleSignup}
          className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition duration-300 font-medium"
        >
          {isLoggedInForm?"Login":"Sign up"}
        </button>
        <p className="text-gray-800 cursor-pointer text-center" onClick={()=>setIsLoggedInForm((value)=>!value)}>
          {isLoggedInForm?"New user sign up here." :"Existing user sign in here."}
        </p>

        
      </div>
    </div>
  );
};

export default Login;
