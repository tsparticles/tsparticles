import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function navbar() {
    return (
        <div className="navbar">
            NavBar

            <Link className="button" to="/" style={{ float: "left" }}>Home</Link>
            <Link className="button" to="/samples" style={{ float: "left" }}>Samples</Link>
        </div>
    );
}
