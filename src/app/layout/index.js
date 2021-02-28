import { Link } from "@reach/router";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import "./styles.scss";

const Layout = (props) => {
  const { children } = props;
  return (
    <div className="d-flex h-100 text-center text-white bg-dark">
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header className="mb-auto">
          <div>
            <h3 className="float-md-start mb-0">
              <i>l</i>andy
            </h3>
            <nav className="nav nav-masthead justify-content-center float-md-end">
              <Link
                to={"/"}
                className="nav-link active"
                aria-current="home"
                href="#"
              >
                Home
              </Link>
              {/*<Link to={"/features"} className="nav-link" href="#">*/}
              {/*  Features*/}
              {/*</Link>*/}
              <Link to={"/sign-in"} className="nav-link" href="#">
                Sign In
              </Link>
              <UncontrolledDropdown>
                <DropdownToggle tag="a" className="nav-link border-0" href="#">
                  <span className={"d-flex align-items-center mx-3"}>
                    <i className="bi bi-person mx-2" /> Jeremy
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
                  <DropdownItem className="text-white custom-drop-color-item">
                    <span className={"d-flex align-items-center"}>
                      <i className="bi bi-arrow-return-left" />
                      <span className={"mx-3"}>Logout</span>
                    </span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </nav>
          </div>
        </header>

        {children}
        <footer className="mt-auto text-white-50"> </footer>
      </div>
    </div>
  );
};

export default Layout;
