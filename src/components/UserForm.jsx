import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MessageBox from "../components/MessageBox.jsx";
import "bootstrap/dist/css/bootstrap.css";

export default function UserForm(props) {
  const { handleSubmit, mode, setMode, buttonText } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setModalShow] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  return (
    <div className="Login">
      <Form
        noValidate
        onSubmit={(e) => handleSubmit({ event, email, password, setModalShow })}
      >
        <Form.Group size="lg" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          block
          size="lg"
          type="submit"
          disabled={!validateForm()}
          onClick={() => {
            setMode("logIn");
          }}
        >
          {buttonText}
        </Button>
        {typeof props.children == "function"
          ? props.children({ mode, setMode })
          : null}
      </Form>
      {error ? <MessageBox error={error} onClose={setModalShow} /> : null}
    </div>
  );
}
