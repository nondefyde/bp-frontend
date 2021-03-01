import { Form, Label, Input, Button } from "reactstrap";
import { Formik } from "formik";
import "./styles.scss";
import { connect } from "react-redux";
import { login } from "../../redux/actions";
import { SyncLoader } from "react-spinners";

const Login = (props) => {
  const { loggingIn, login } = props;
  const onSubmit = (values, setSubmitting) => {
    login(values, () => setSubmitting(false));
  };
  return (
    <div className={"Sign-In text-center"}>
      <main className="form-signin">
        <Formik
          initialValues={{ username: "admin", password: "one.admin.two.three" }}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = "Please enter your username";
            }
            if (!values.password) {
              errors.password = "Please enter your password";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values, setSubmitting);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <Form onSubmit={handleSubmit}>
              <h1 className="h4 mb-4 fw-normal fs-5">Please sign in</h1>
              <Label for="username" className="visually-hidden">
                Username
              </Label>
              <Input
                type="text"
                id="username"
                name="username"
                className="form-control"
                placeholder="Username"
                required={true}
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              {/*<FormFeedback>Oh noes! that name is already taken</FormFeedback>*/}

              <Label for="password" className="visually-hidden">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                required={false}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {/*{errors.password && touched.password && errors.password}*/}
              {/*{errors.email && touched.email && errors.email}*/}
              <Button
                color={"primary"}
                className="w-100 mt-3 btn btn-lg btn-primary"
                type="submit"
                disabled={isSubmitting || loggingIn}
              >
                <div>
                  {loggingIn ? (
                    <SyncLoader loading color={"#fff"} />
                  ) : (
                    "Sign in"
                  )}
                </div>
              </Button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
};

const stateToProps = (state) => ({
  loggingIn: state.ui.loading["login"],
});
const dispatchToProps = {
  login,
};
export default connect(stateToProps, dispatchToProps)(Login);
