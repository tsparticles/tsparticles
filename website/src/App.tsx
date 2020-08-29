import React from "react";
import "./App.css";
import { Switch, Route } from "react-router";
import Home from "./routes/home";
import NavBar from "./components/navbar";

function App() {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route exact path='/' component={Home}/>
            </Switch>
        </>
    );
}

export default App;
