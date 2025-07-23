import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const dispatch = useDispatch();
  const usersConnections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.error("Failed to fetch connections", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!usersConnections || usersConnections.length === 0) {
    return (
      <div className="text-center my-10 text-gray-500">
        <h1 className="text-2xl font-semibold">No Connections Found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-primary mb-10">
        Your Connections
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {usersConnections.map((connection, index) => {
          const { firstName, lastName, photoUrl, gender, age, about } = connection;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col items-center text-center"
            >
              <div className="w-32 h-32 mb-4">
                <img
                  src={photoUrl || "https://via.placeholder.com/150"}
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
