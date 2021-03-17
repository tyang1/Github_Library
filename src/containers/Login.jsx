import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { signUp } from './actions/API.js';
import 'bootstrap/dist/css/bootstrap.css';
import './Login.css';

export default function Login(props) {
  const { setRedirect } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    //TODO: change the email
    console.log('handleSubmit', event);
    await signUp({ email, password });
    setRedirect('/home');
  }

  return (
    <div className='Login'>
      <Form onSubmit={handleSubmit}>
        <Form.Group size='lg' controlId='formBasicEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size='lg' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size='lg' type='submit' disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}
