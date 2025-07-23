import React from "react";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "request/review/" + status + "/" + _id,{},{
          withCredentials: true
        }
      );
      dispatch(removeRequest(_id))
    } catch (error) {}
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
      console.log(requests?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests || requests.length === 0) {
    return (
      <div className="text-center my-10 text-gray-500">
        <h1 className="text-2xl font-semibold">No Request Found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg- px-4  py-8">
      <h1 className="text-3xl font-bold text-center text-primary mb-10">
        Your Requests
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {requests.map((request, index) => {
          const { firstName, lastName, photoUrl, gender, age, about } =
            request.fromUserId;
          return (
            <div
              key={index}
              className="bg-base-200 cursor-pointer rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col items-center text-center"
            >
              <div className="w-32 h-32 mb-4">
                <img
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                  className="w-full h-full object-cover rounded-full border-4 border-primary shadow-sm"
                />
              </div>
              <h2 className="text-xl font-semibold text-primary">
                {firstName} {lastName}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Gender:</strong> {gender || "Not specified"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Age:</strong> {age || "Not provided"}
              </p>
              <p className="text-sm text-gray-500 italic mt-2">
                {about || "No about info available."}
              </p>
              <div className="mt-4 flex gap-3">
                <button className="btn btn-primary" onClick={()=>reviewRequest("accepted", request._id)}>Accept</button>
                <button className="btn btn-secondary" onClick={()=>reviewRequest("rejected", request._id)}>Reject</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
