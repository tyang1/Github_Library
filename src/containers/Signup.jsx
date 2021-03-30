import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import UserForm from "../components/UserForm.jsx";
import "bootstrap/dist/css/bootstrap.css";

export default function Signup(props) {
  const { submitHandler, setRedirect } = props;
  const [mode, setMode] = useState(null);

  function handleSubmit({ event, email, password, setModalShow }) {
    event.preventDefault();
    submitHandler({ email, password })
      .then((success) => {
        if (success) {
          setRedirect("/home");
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        setModalShow("The credentials provided is incorrect");
        return false;
      });
  }

  return (
    <UserForm
      mode={mode}
      setMode={setMode}
      setRedirect={setRedirect}
      handleSubmit={handleSubmit}
      buttonText={"Sign Up"}
    />
  );
}
