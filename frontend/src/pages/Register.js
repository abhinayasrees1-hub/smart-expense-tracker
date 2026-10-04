import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async () => {

        console.log("REGISTER BUTTON CLICKED");

        try {

            await axios.post(
                "https://smart-expense-tracker-backend-8isf.onrender.com/api/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            alert("User Registered Successfully");
            navigate("/login");

        } catch (err) {

            console.log(err.response?.data || err.message);

            alert(
                err.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (

        <div className="register-container">

            <div className="register-card">

                <h2>Register</h2>

                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

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