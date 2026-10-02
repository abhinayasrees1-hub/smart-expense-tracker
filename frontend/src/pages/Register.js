import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async () => {

        try {

            await axios.post("http://localhost:5000/api/auth/register", {
                email,
                password
            });

            navigate("/login");

        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    return (

        <div className="register-container">

            <div className="register-card">

                <h2>Register</h2>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleRegister}>
                    Register
                </button>

            </div>

        </div>

    );

}

export default Register;