import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import Nav from "./Nav";
import "./ProfileScreen.css";

function ProfileScreen() {
  const user = useSelector(selectUser);

  // const history = useHistory();

  // const handleImageUpload = e => {
  //   const [file] = e.target.files;
  //   if (file) {
  //     auth.currentUser.updateProfile({
  //       photoURL:file
  //     })
  //   }
  // };

  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen_body">
        <h1>Edit Profile</h1>
        <div className="profileScreen_info">
        <Avatar
              src=""
              alt="https://img.pngio.com/free-anime-logo-maker-anime-logo-designs-creator-anime-logo-anime-logo-png-1000_1000.png"
            />
          <div className="profileScreen_details">
            <h2>{user.email}</h2>
            {/* <input type="file" accept="image/*" onChange={handleImageUpload} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
