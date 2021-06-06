// import "./App.scss";
import {Router} from "@reach/router";
import React from "react";
import Personal from "../pages/Personal";

function App() {
    return (
        <div className={"App"}>
            <Router style={{height: '100%'}}>
                <Personal path="/"/>
            </Router>
        </div>
    );
}

export default App;
