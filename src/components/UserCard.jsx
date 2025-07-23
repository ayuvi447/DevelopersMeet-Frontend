// UserCard.jsx
import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user, onRespond }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, gender, photoUrl, about, age, _id } = user;

  const handleSendRequest = async (status) => {
    try {
      await axios.post(`${BASE_URL}request/send/${status}/${_id}`, {}, { withCredentials: true });
      onRespond(); // trigger exit animation in Feed.jsx
      setTimeout(() => {
        dispatch(removeFeed(_id));
      }, 300); // match Feed animation duration
    } catch (error) {
      console.log("Request error", error);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-md rounded-xl overflow-hidden">
      <figure className="bg-gray-200 p-4">
        <img
          src={photoUrl || "https://via.placeholder.com/150"}
          alt={`${firstName} ${lastName}`}
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-sm"
        />
      </figure>

      <div className="card-body text-center space-y-2">
        <h2 className="text-xl font-bold text-primary">
          {firstName} {lastName}
        </h2>
        <p className="text-sm text-gray-600">
          <strong>Age:</strong> {age || "Not provided"}{" "}
          <span className="ml-2">
            <strong>Gender:</strong> {gender || "Not specified"}
          </span>
        </p>
        <p className="text-sm text-gray-500 italic">
          {about || "No bio available."}
        </p>
        <div className="card-actions justify-center pt-4">
          <button className="btn btn-secondary" onClick={() => handleSendRequest("interested")}>
            Hustle along
          </button>
          <button className="btn btn-success text-black" onClick={() => handleSendRequest("ignored")}>
            Let them hustle alone
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
