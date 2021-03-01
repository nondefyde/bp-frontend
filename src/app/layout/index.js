import { Link, useLocation } from "@reach/router";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import "./styles.scss";
import authService from "../../services/auth";
import { connect } from "react-redux";
import { get, upperFirst } from "lodash";
import { logout } from "../../redux/actions";

const Layout = (props) => {
  const { children, profile, logout } = props;
  const location = useLocation();

  const isLoggedIn = authService.isLoggedIn();

  const firstname = get(profile, "firstName", "Not assigned");

  const isActive = (pathname) => {
    if (location.pathname === pathname) return true;
    else return false;
  };

  const onLogout = () => logout();

  return (
    <div className="d-flex h-100 text-white bg-dark">
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header className="mb-auto">
          <div>
            <h3 className="float-md-start mb-0">
              <i>l</i>andy
            </h3>
            <nav className="nav nav-masthead justify-content-center float-md-end">
              <Link
                to={"/"}
                className={`nav-link ${isActive("/") ? " active" : ""}`}
                aria-current="home"
                href="#"
              >
                Home
              </Link>
              {!isLoggedIn && (
                <Link
                  to={"/sign-in"}
                  className={`nav-link ${
                    isActive("/sign-in") ? " active" : ""
                  }`}
                  href="#"
                >
                  Sign In
                </Link>
              )}{" "}
              {isLoggedIn && (
                <a
                  className={`nav-link ${
                    isActive("/sign-in") ? " active" : ""
                  }`}
                  href="#"
                  onClick={onLogout}
                >
                  Logout
                </a>
              )}
              {isLoggedIn && (
                <UncontrolledDropdown>
                  <DropdownToggle
                    tag="a"
                    className="nav-link border-0"
                    href="#"
                  >
                    <span className={"d-flex align-items-center mx-3"}>
                      <i className="bi bi-person mx-2" />{" "}
                      {upperFirst(firstname)}
                    </span>
                  </DropdownToggle>
                  <DropdownMenu className={"custom-drop-color"}>
                    <DropdownItem>
                      <Link
                        to={"/profile-edit"}
                        className="nav-link border-0 text-white custom-drop-color-item"
                      >
                        <span className={"d-flex align-items-center"}>
                          <i className="bi bi-pen" />
                          <span className={"mx-3"}>Edit profile</span>
                        </span>
                      </Link>
                    </DropdownItem>
                    <DropdownItem
                      className="text-white custom-drop-color-item"
                      onClick={onLogout}
                    >
                      <span className={"d-flex align-items-center"}>
                        <i className="bi bi-arrow-return-left" />
                        <span className={"mx-3"}>Logout</span>
                      </span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </nav>
          </div>
        </header>

        {children}
        <footer className="mt-auto text-white-50"> </footer>
      </div>
    </div>
  );
};

const stateToProps = (state) => ({
  profile: state.app?.user?.data?.user || {},
  user: state.app?.user?.data || {},
});
const dispatchToProps = { logout };
export default connect(stateToProps, dispatchToProps)(Layout);
