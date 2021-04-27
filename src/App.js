import React, { useEffect } from "react";

import "./App.css";
import Login from "./Login";
import Home from "./Home";

import ProfileScreen from "./ProfileScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./Signup";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import Page from "./Page";
import Nav from "./Nav";
import Pages from "./Pages";

function App() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((userAuth) => {
            if (userAuth) {
                // console.log(userAuth);
                // userAuth.updateProfile({
                //   displayName: user.uname
                // }).then(() => (
                //   dispatch(login({
                //     uid: userAuth.uid,
                //     email: userAuth.email,
                //     usname: userAuth.displayName
                //   }))
                // )).catch(err => console.log(err.message))
                console.log(userAuth.displayName);
                dispatch(
                    login({
                        uid: userAuth.uid,
                        email: userAuth.email,
                        usname: userAuth.displayName,
                    })
                );
            } else {
                console.log("No USER");
                dispatch(logout());
            }
        });
        return unsubscribe;
    }, [dispatch]);

    return (
        <div className="app">
            <Router>
                {!user ? (
                    <Switch>
                        <Route path="/signup">
                            <Signup />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                    </Switch>
                ) : (
                    <Switch>
                        <Route path="/pages">
                            <Pages username={user?.usname} />
                        </Route>
                        <Route path="/page">
                            <Page username={user?.usname} />
                        </Route>
                        <Route path="/profile">
                            <ProfileScreen />
                        </Route>
                        <Route path="/">
                            <Home username={user?.usname} />
                        </Route>
                    </Switch>
                )}
            </Router>
        </div>
    );
}

export default App;
