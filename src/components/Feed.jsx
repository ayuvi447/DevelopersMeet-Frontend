// Feed.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { motion, AnimatePresence } from "framer-motion";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [visible, setVisible] = useState(true);

  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(BASE_URL + "feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.users));
    } catch (error) {
      console.log("Feed fetch error:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const handleRespond = () => {
    setVisible(false);
    setTimeout(() => setVisible(true), 300); // allow next card to show
  };

  if (!feed) return null;

  if (feed.length <= 0)
    return <h1 className="text-center mt-10">No more users to show in feed.</h1>;

  return (
    <div className="flex justify-center my-10">
      <AnimatePresence>
        {visible && (
          <motion.div
            key={feed[0]._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ x: -200, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <UserCard user={feed[0]} onRespond={handleRespond} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Feed;
