import React from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";
import "./MyVerticallyCenteredModal.scss";

export default function MyVerticallyCenteredModal(props) {
  const {
    modalBody,
    modalHeading,
    withModalFooter = false,
    withModalHeader = false,
    withModalTitle = false,
  } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdropClassName="modal-backdrop fixed-zIndex-modal-backdrop"
      centered
    >
      {withModalHeader ? (
        <Modal.Header closeButton>
          {withModalTitle ? (
            <Modal.Title id="contained-modal-title-vcenter">
              {modalHeading}
            </Modal.Title>
          ) : null}
        </Modal.Header>
      ) : null}
      <Modal.Body>{modalBody}</Modal.Body>
      {withModalFooter ? <Modal.Footer></Modal.Footer> : null}
    </Modal>
  );
}
