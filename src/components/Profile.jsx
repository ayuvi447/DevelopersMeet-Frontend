import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  
  // console.log(user);

  if (!user) {
    return <div className="text-center mt-10 text-gray-600">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen to-pink-50 px-4 py-12">
      <EditProfile user={user} />
    </div>
  );
};

export default Profile;
