import { Button } from "reactstrap";
import React from "react";
import { useNavigate } from "@reach/router";
import { connect } from "react-redux";
import authService from "../../services/auth";

const Landing = () => {
  const navigate = useNavigate();
  const isLoggedIn = authService.isLoggedIn();
  const onSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <main className="px-3 text-center">
      <h1>An expert search engine optimization</h1>
      <p className="lead my-3">
        Start working with Landy that can provide everything you need to
        generate awareness, drive traffic, connect.
      </p>

      <div
        className={"d-flex align-items-center justify-content-center lead mt-2"}
      >
        <Button
          size={"lg"}
          className="btn btn-lg btn-secondary border-white bg-white ml-4"
        >
          Get started
        </Button>
        {!isLoggedIn && (
          <div className={"mx-3"}>
            <Button
              size={"lg"}
              outline
              className="btn btn-secondary border-white bg-transparent text-white"
              onClick={onSignIn}
            >
              Sign in
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

const stateToProps = (state) => ({});
const dispatchToProps = {};
export default connect(stateToProps, dispatchToProps)(Landing);
