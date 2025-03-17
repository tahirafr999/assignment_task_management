import React, { useState } from "react";
import { loginUser } from "./api";

const Login = ({ setToken }) => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await loginUser(credentials);
        setToken(res.data.access);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
            <input type="password" placeholder="Password" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;