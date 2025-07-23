import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();

  // Extract initials if user exists and photo is not available
  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return (
        user.firstName.charAt(0).toUpperCase() +
        user.lastName.charAt(0).toUpperCase()
      );
    }
    return "U"; // fallback
  };

  const handlelogout = async () => {
    try {
      await axios.post(BASE_URL + "logout", {}, { withCredentials: true });

      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="navbar  shadow-sm"
      style={{
        backgroundColor: "#9810fa",
      }}
    >
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          ❤️ JobSeekers Connect
        </Link>
      </div>
     
      <div className="flex gap-2">
        {user ? (
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black font-bold text-lg">
                {user.photoUrl ? (
                  <img
                    alt="userphoto"
                    src={user.photoUrl}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span>{getUserInitials()}</span>
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link className="justify-between" to="/profile">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link onClick={handlelogout}>Logout</Link>
              </li>
            </ul>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
