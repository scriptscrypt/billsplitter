import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Profile from './Profile';

export default function OffCanvasExample() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="mt-4">
        View Profile
      </Button>
      <Offcanvas  placement={"end"} show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Profile/>
        </Offcanvas.Body>
      </Offcanvas>

    
    </>
  );
}