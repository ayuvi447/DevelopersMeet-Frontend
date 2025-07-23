import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
const EditProfile = ({user}) => {
  
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [about, setAbout] = useState(user.about || "");
  const [age, setAge] = useState(user.age || "");
  const [skills, setskills] = useState(user.skills || "");
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState("");


  const dispatch = useDispatch();
  const saveProfile = async () => {
    setError(""); // clear any previous errors
    const nameRegex = /^[A-Za-z]+$/;

    // 🔒 Client-side validations
    if (!firstName.trim() || !nameRegex.test(firstName.trim())) {
      setError("First name must contain only letters and cannot be empty.");
      return;
    }

    if (!lastName.trim() || !nameRegex.test(lastName.trim())) {
      setError("Last name must contain only letters and cannot be empty.");
      return;
    }

    if (gender && !["male", "female"].includes(gender.toLowerCase())) {
      setError("Gender must be either 'male' or 'female'.");
      return;
    }

    if (skills && skills.length > 10) {
      setError("Not allowed more than 10 skills.");
      return;
    }

    try {
      const res = await axios.patch(
        BASE_URL + "updateprofile",
        { firstName, lastName, gender, age, about, skills, photoUrl },
        { withCredentials: true }
      );
    
      
      dispatch(addUser(res?.data?.data));
      setError(""); // success, clear error
      setIsSaved(true);
      setTimeout(()=>{
        setIsSaved(false)
      }, 3000)
      console.log("users vicky",user);
      
    } catch (err) {
      const msg = err?.response?.data?.message || "Something went wrong.";
      setError(msg);
    }
  };

  return (
    <div className="flex justify-center items-center gap-8  ">
     {
      isSaved ?  <div className="toast toast-top toast-center mt-15">
        <div className="alert alert-success">
          <span className="text-bold text-black">Profile updated successfully.</span>
        </div>
      </div>:""
     }
      <div className=" flex justify-center items-center  p-4 w-[700px]">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Edit profile
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              FistName:
            </label>
            <input
              type="text"
              placeholder="you@example.com"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              LastName
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Gender
            </label>
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              About
            </label>
            <textarea
              type="textarea"
              rows="3" cols="30"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              PhotoUrl
            </label>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Age
            </label>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
            />
          </div>
          <p className="text-red-500">{error}</p>
          <button
            className="w-full cursor-pointer bg-purple-600 mt-5 text-white py-2 rounded-xl hover:bg-purple-700 transition duration-300 font-medium"
            onClick={saveProfile}
          >
            Save changes
          </button>
         
        </div>
      </div>
     {
      user && (
         <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
      )
     }
    </div>
  );
};

export default EditProfile;
