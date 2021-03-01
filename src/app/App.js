import "./App.scss";
import { Router } from "@reach/router";
import React from "react";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import EditProfile from "../pages/EditProfile";
import Layout from "./layout";

function App() {
  return (
    <div className={"App"}>
      <Router style={{height: '100%'}}>
        <Layout path="/">
          <Landing path="/" />
          <Login path="/sign-in" />
          <EditProfile path="/profile-edit" />
        </Layout>
      </Router>
    </div>
  );
}

export default App;
