import React, { useRef} from "react";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";
import "./Login.css";
import logo from "./smurf.png";

function Login() {
    const history = useHistory();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    

    const signin = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
            .then((user) => {
                history.push(`/${user.user.uid}`);
                console.log("LOGGED IN");
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <div className="login">
            <form>
                <h1>
                    <img src={logo} alt="Logo" id="logo" />
                    Sign In
                </h1>
                <input ref={emailRef} placeholder="Email" type="email" />
                <input
                    ref={passwordRef}
                    placeholder="Password"
                    type="password"
                />
                <button type="submit" onClick={signin}>
                    Sign In
                </button>
                <button type="submit" id="reg_btn" onClick={()=> history.push("/signup")}>
                    Sign Up
                </button>
            </form>
            
        </div>
    );
}

export default Login;
