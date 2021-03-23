import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MessageBox from "../components/MessageBox.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "./Login.css";

export default function Login(props) {
  const { setRedirect, submitHandler } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setModalShow] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    //todo: figuring out why the /login is being called twice, and there's no cookie sent with response
    event.preventDefault();
    await submitHandler({ email, password })
      .then((success) => {
        if (success) {
          setRedirect("/home");
          return true;
        }
      })
      .catch((err) => {
        setModalShow("The credentials provided is incorrect");
      });
    return false;
  }

  return (
    <div className="Login">
      <Form noValidate onSubmit={handleSubmit}>
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
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
      {error ? <MessageBox error={error} onClose={setModalShow} /> : null}
    </div>
  );
}
