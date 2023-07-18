import React from "react";
import { useNavigate } from 'react-router-dom';
import { invoke } from '@tauri-apps/api';
import ls from 'localstorage-slim';
import './Loading.css'
const Loading = () => {

    const navigate = useNavigate();

    type User = {
        email: string,
        password: string,
        username: string
    }

    function isUser(obj: any): obj is User {
        return (
            typeof obj === 'object' &&
            obj !== null &&
            'email' in obj &&
            'password' in obj &&
            'username' in obj
        );
    }

    React.useLayoutEffect(() => {
        if (ls.get("Username") && ls.get("Password")) {
            invoke("login", { usernameEmail: ls.get("Username"), password: ls.get("Password") })
                .then((result) => {
                    if (isUser(result)) {
                        ls.set("Guest", false);
                        navigate("/homepage");
                    }
                })
                .catch((error) => {
                    if (error == "wSError") {
                        navigate("/offline");
                    } else {
                        console.log(error)
                        navigate("/login");
                    }
                });
        } else {
            navigate("/login")
        }
    });


    return (
        <div id="loading">
            <div className="spinner-container">
                <div className="loading-spinner">
                </div>
            </div>
        </div>
    );
};

export default Loading;
