import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";  // 🔥 IMPORTANT FIX

function Home() {

    const navigate = useNavigate();

    return (
        <div className="home-container">

            <div className="home-card">

                {/* LOGO FROM SRC/ASSETS */}
                <img src={logo} alt="logo" className="home-logo" />

                <h1>Expense Tracker</h1>

                <p>Track your expenses easily</p>

                <div className="home-buttons">

                    <button onClick={() => navigate("/login")}>
                        Login
                    </button>

                    <button onClick={() => navigate("/register")}>
                        Register
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Home;