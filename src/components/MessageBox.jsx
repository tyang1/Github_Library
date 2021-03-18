import React from 'react';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';

export default function MessageBox(props) {
  const { error, onClose } = props;

  return (
    <Modal show={error} onHide={() => onClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{error}</p>
      </Modal.Body>
    </Modal>
  );
}
