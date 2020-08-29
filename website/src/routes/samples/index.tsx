import React from "react";
import { Link } from "react-router-dom";

export default function () {
    return (
        <div>
            <Link className="button" to="/sample/basic" style={{ float: "left" }}>Default</Link>
        </div>
    );
}
