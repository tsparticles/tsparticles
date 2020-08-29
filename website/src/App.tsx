import React from "react";
import "./App.css";
import { Switch, Route } from "react-router";
import Home from "./routes/home";
import Samples from "./routes/samples";
import Sample from "./routes/sample";
import NavBar from "./components/navbar/navbar";

function App() {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/samples' component={Samples}/>
                <Route exact path='/sample/:name' component={Sample}/>
            </Switch>
        </>
    );
}

export default App;
