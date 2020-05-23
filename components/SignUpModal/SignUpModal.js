import React from './node_modules/react';
import { Button, Image, Modal, Form } from './node_modules/semantic-ui-react';

const SignUpModal = () => (
  <Modal trigger={<Button>Sign Up</Button>}>
    <Modal.Header>Sign Up</Modal.Header>
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

export default SignUpModal;
