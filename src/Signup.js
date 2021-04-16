import React, { useRef } from "react";
import "./Signup.css";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";
import logo from "./smurf.png";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";

function Signup() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);
  const conpasswordRef = useRef(null);
  const validpattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const history = useHistory();
  const dispatch = useDispatch();

  var actionCodeSettings = {
    url: "http://localhost:3000",
    iOS: {
      bundleId: "com.example.ios",
    },
    android: {
      packageName: "com.example.android",
      installApp: true,
      minimumVersion: "12",
    },
    handleCodeInApp: true,
    dynamicLinkDomain: "animerecs.page.link",
  };

  const register = (e) => {
    e.preventDefault();
    if (validpattern.test(emailRef.current.value)) {
      if(((passwordRef.current.value != null) && (conpasswordRef.current.value != null))&&(passwordRef.current.value===conpasswordRef.current.value)){
      auth
        .createUserWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        )
        .then((user) => {
          console.log("SIGNED IN");
          user.user.updateProfile({
            displayName: usernameRef.current.value
        })
        
            // dispatch(
            //     login({
            //         uname: usernameRef.current.value
            //     })
            // )
        //   user.user.displayName = usernameRef.current.value;
          auth.currentUser
            .sendEmailVerification(actionCodeSettings)
            .then(() => {
              history.push(`/${user.user.uid}`);
            })
            .catch((err) => {
              alert(err.message);
            });
        })
        .catch((err) => {
          alert(err.message);
        });
      }else{
        alert("CHECK YOUR PASSWORD")
      }
    } else {
      alert("INVALID EMAIL");
    }
  };

  return (
    <div className="signup">
      <form >
        <h1>
          <img src={logo} alt="Logo" id="logo" />
          Sign Up
        </h1>
        <input placeholder="Username" type="text" ref={usernameRef} />
        <input placeholder="Email" type="email" ref={emailRef} />
        <input placeholder="Password" type="password" ref={passwordRef} />
        <input placeholder="Confirm Password" type="password" ref={conpasswordRef} />
        <button type="submit" onClick={register}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
