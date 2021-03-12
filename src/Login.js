import React, { useRef } from "react";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";
import "./Login.css";

function Login() {
  const history = useHistory();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const validpattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;


  var actionCodeSettings = {
    url: 'http://localhost:3000',
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    handleCodeInApp: true,
    dynamicLinkDomain: "animerecs.page.link"
  };

  const register = (e) => {
    e.preventDefault();
    if (validpattern.test(emailRef.current.value)) {
      auth
        .createUserWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        )
        .then((user) => {
            
          console.log("SIGNED IN");
          auth.currentUser.sendEmailVerification(actionCodeSettings)
          .then(() => {
            history.push("/");
          })
          .catch(err => {
              alert(err.message);
          })
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("INVALID EMAIL");
    }
  };

  const signin = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    ).then(() => {
        history.push("/");
        console.log("LOGGED IN");
    }).catch((err) => {
        alert(err.message);
    });
  };

  return (
    <div className="login">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} placeholder="Password" type="password" />
        <button type="submit" onClick={signin}>
          Sign In
        </button>
        <button type="submit" onClick={register}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Login;
