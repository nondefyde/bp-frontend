import { Label, Form, Input, Button, FormGroup } from "reactstrap";

const EditProfile = () => {
  return (
    <div className="container">
      <main>
        <div className="py-5 text-center">
          <h2>Edit your profile</h2>
        </div>

        <Form>
          <FormGroup className={"mb-3"}>
            <Label for="firstName" className={"mb-3"}>
              First name
            </Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Jeremy"
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
              placeholder="Test"
            />
          </FormGroup>
          <Button
            color={"primary"}
            className="w-100 mt-3 btn btn-lg btn-primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </main>
    </div>
  );
};

export default EditProfile;
