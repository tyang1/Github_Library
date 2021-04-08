import React from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";

export default function MyVerticallyCenteredModal(props) {
  const {
    modalBody,
    modalHeading,
    withModalFooter = false,
    withModalHeader = false,
  } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {withModalHeader ? (
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {modalHeading}
          </Modal.Title>
        </Modal.Header>
      ) : null}
      <Modal.Body>{modalBody}</Modal.Body>
      {withModalFooter ? <Modal.Footer></Modal.Footer> : null}
    </Modal>
  );
}
