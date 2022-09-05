import React from 'react';
import "../index.css"
import {Link, Outlet} from "react-router-dom"
import {Container, Row, Col, ListGroup} from "react-bootstrap"
import OffCanvasExample from "./RightSidebar"

export default function Dashboard() {
  return (
    <>
    <Container>
      <Row>
        <Col>
            <ListGroup className="w">
            <ListGroup.Item variant="dark" className="mt-4">Dashboard</ListGroup.Item>
            <ListGroup.Item variant="light" className=""><Link className="a" to="send">Send</Link></ListGroup.Item>
            <ListGroup.Item variant="light" className=""><Link className="a"  to="receive">Receive</Link></ListGroup.Item> 
            <ListGroup.Item variant="light" className=""><Link className="a" to="groups">Groups</Link></ListGroup.Item> 
            </ListGroup>
        </Col>
        <Col>
            <Outlet/>
        </Col>
        <Col>
            <OffCanvasExample/>
        </Col>
      </Row>
    </Container>
    </>
  )
}
