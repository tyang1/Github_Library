import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

export default function Articles(props) {
  return (
    <InputGroup>
      <FormControl
        placeholder='Any articles you find interesting'
        aria-label='(ie. React hooks tutorial)'
        aria-describedby='basic-addon2'
      />
      <InputGroup.Append>
        <Button variant='outline-secondary'>Save</Button>
        <Button variant='outline-secondary'>Search</Button>
      </InputGroup.Append>
    </InputGroup>
  );
}
