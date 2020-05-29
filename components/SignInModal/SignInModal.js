import React from 'react';
import { Button, Image, Modal, Form } from 'semantic-ui-react';

const SignInModal = () => (
  <Modal trigger={<Button>Log In/Sign Up</Button>}>
    <Modal.Header>Log In</Modal.Header>
    <Modal.Content image>
      <Image wrapped size="medium" src="images/isabelle.png" />
      <Form>
        <Form.Input
          //   error={{ content: 'Please enter your first name', pointing: 'below' }}
          label="Email Address"
          placeholder="Email Address"
          id="form-input-email-address"
        />
        <Form.Input
          //   error="Please enter your last name"
          label="Password"
          placeholder="Password"
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Modal.Content>
  </Modal>
);

export default SignInModal;
