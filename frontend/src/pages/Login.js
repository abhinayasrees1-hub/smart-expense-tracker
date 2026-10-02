import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            );

            // SAVE TOKEN
            localStorage.setItem(
                "token",
                response.data.token
            );

            // MOVE TO DASHBOARD
            navigate("/dashboard");

        }
        catch (error) {

            console.log("LOGIN ERROR:", error);

            if (error.response) {

                console.log(
                    "STATUS:",
                    error.response.status
                );

                console.log(
                    "DATA:",
                    error.response.data
                );

                alert(
                    error.response.data.message ||
                    JSON.stringify(error.response.data)
                );

            }
            else {

                console.log(
                    "NO RESPONSE FROM SERVER"
                );

                alert(
                    "Cannot connect to backend. Make sure the backend is running."
                );

            }

        }

    };

    return (

        <div className="login-container">

            <div className="login-card">

                <h2>Login</h2>

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;