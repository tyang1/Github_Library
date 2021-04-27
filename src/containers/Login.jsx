import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import UserForm from "../views/UserForm.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "./Login.css";

export default function Login(props) {
  const { submitHandler, setRedirect } = props;
  const [mode, setMode] = useState(null);

  async function handleSubmit({ event, email, password, setModalShow }) {
    //todo: figuring out why the /login is being called twice, and there's no cookie sent with response
    event.preventDefault();
    if (mode === "logIn") {
      const success = await submitHandler({ email, password });
      if (success) {
        setRedirect("/home");
        return true;
      } else {
        setModalShow("The credentials provided is incorrect");
        return false;
      }
    } else {
      setRedirect("/signup");
    }
  }

  return (
    <UserForm
      mode={mode}
      setMode={setMode}
      setRedirect={setRedirect}
      handleSubmit={handleSubmit}
      buttonText={"Log in"}
    >
      {({ setMode }) => (
        <Button
          block
          size="lg"
          type="submit"
          disabled={false}
          onClick={() => {
            setMode("signUp");
          }}
        >
          Create User Account
        </Button>
      )}
    </UserForm>
  );
}
