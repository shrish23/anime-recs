import { Avatar, Fab, Input } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { auth, storage } from "./firebase";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Nav from "./Nav";
import "./ProfileScreen.css";

function ProfileScreen() {
  const user = useSelector(selectUser);
  const [imageAsFile, setImageAsFile] = useState("");

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      setImageAsFile(file);
    }
  };

  const createurl = (e) => {
    e.preventDefault();
    if (imageAsFile) {
      const imageupload = storage
        .refFromURL(
          `gs://anime-recommendation-c040c.appspot.com/images/${user.uid}/${imageAsFile.name}`
        )
        .put(imageAsFile);

      imageupload.on(
        "state_changed",
        (snapShot) => {
          console.log(snapShot);
        },
        (err) => {
          console.log(err);
        },
        () => {
          // gets the functions from storage refences the image storage in firebase by the children
          // gets the download url then sets the image from firebase as the value for the imgUrl key:
          storage
            .refFromURL(
              `gs://anime-recommendation-c040c.appspot.com/images/${user.uid}/${imageAsFile.name}`
            )
            .getDownloadURL()
            .then((fireBaseUrl) => {
              setImageAsFile("");
              auth.currentUser.updateProfile({
                photoURL: fireBaseUrl,
              });
            });
        }
      );
      window.location.reload();
    } else {
      alert("Please Select A Image File");
    }
  };

  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen_body">
        <h1>Edit Profile</h1>
        <div className="profileScreen_info">
          <Avatar src={auth.currentUser.photoURL} />
          <div className="profileScreen_details">
            <h2>Email :       {user.email}</h2>
            <h2>UserName:       {user.usname}</h2>
            <h2>Upload Your Profile Picture Here</h2>
            <Input type="file" accept="image/*" placeholder="Upload Your Profile Picture" onChange={handleImageUpload} />
            {/* <button type="submit" onClick={createurl}>
              UPLOAD
            </button> */}
            <Fab variant="extended" size="small" onClick={createurl} className="upload_button">
              <CloudUploadIcon>UPLOAD</CloudUploadIcon>
            </Fab>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
