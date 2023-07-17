import React from "react";
import { useNavigate } from 'react-router-dom';
import { invoke } from '@tauri-apps/api';
import ls from 'localstorage-slim';

const Check = () => {

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
                .catch((_) => navigate("/login"));
        } else {
            navigate("/login")
        }
    });


    return (<div />);
};

export default Check;
