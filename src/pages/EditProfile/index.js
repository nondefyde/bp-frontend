import { Label, Form, Input, Button, FormGroup } from "reactstrap";
import { connect } from "react-redux";
import { Formik } from "formik";
import { SyncLoader } from "react-spinners";
import { updateProfile } from "../../redux/actions";
import { get } from "lodash";

const EditProfile = (props) => {
  const { updatingProfile, updateProfile, profile } = props;
  const onSubmit = (values, setSubmitting) => {
    updateProfile(values, () => setSubmitting(false));
  };

  const firstName = get(profile, "firstName", "");
  const lastName = get(profile, "lastName", "");
  return (
    <div className="container">
      <main>
        <div className="py-5 text-center">
          <h2>Edit your profile</h2>
        </div>
        <Formik
          initialValues={{ lastName, firstName }}
          validate={(values) => {
            const errors = {};
            if (!values.lastName) {
              errors.lastName = "Please enter your last name";
            }
            if (!values.firstName) {
              errors.firstName = "Please enter your first name";
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
              <FormGroup className={"mb-3"}>
                <Label for="firstName" className={"mb-3"}>
                  First name
                </Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter your first name"
                  autoFocus
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastName" className={"mb-3"}>
                  Last name
                </Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter your last name"
                  autoFocus
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
              </FormGroup>
              <Button
                color={"primary"}
                className="w-100 mt-3 btn btn-lg btn-primary"
                type="submit"
                disabled={isSubmitting || updatingProfile}
              >
                <div>
                  {updatingProfile ? (
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
  updatingProfile: state.ui.loading["updateProfile"],
  profile: state.app?.user?.data?.user || {},
  user: state.app?.user?.data || {},
});
const dispatchToProps = {
  updateProfile,
};
export default connect(stateToProps, dispatchToProps)(EditProfile);
