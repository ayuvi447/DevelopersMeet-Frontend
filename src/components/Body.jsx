import { useEffect } from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchProfile = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "getprofile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
      console.log("Profile api fetched ", res.data);
      
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div className="">
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default Body;
