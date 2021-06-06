// import "./App.scss";
import {Router} from "@reach/router";
import React from "react";
import Filter from "../pages/Filter";
import Personal from "../pages/Personal";

function App() {
    return (
        <div className={"App"}>
            <Router style={{height: '100%'}}>
                <Personal path="/"/>
                <Filter path="/filter"/>
            </Router>
        </div>
    );
}

export default App;
