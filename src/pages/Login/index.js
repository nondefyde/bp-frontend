import { Form, Label, Input, Button } from "reactstrap";
import "./styles.scss";

const Login = () => {
  return (
    <div className={"Sign-In"}>
      <main className="form-signin">
        <Form>
          <h1 className="h4 mb-4 fw-normal fs-5">Please sign in</h1>
          <Label for="inputEmail" className="visually-hidden">
            Email address
          </Label>
          <Input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required
            autoFocus
          />
          <Label for="inputPassword" className="visually-hidden">
            Password
          </Label>
          <Input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required
          />
          <Button
            color={"primary"}
            className="w-100 mt-3 btn btn-lg btn-primary"
            type="submit"
          >
            Sign in
          </Button>
        </Form>
      </main>
    </div>
  );
};

export default Login;
