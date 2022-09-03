import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import ChatList from "../components/ChatList";

const Chat = () => {
  return (
    <div className="chat-main">
      <Container fluid={true} className="p-0 h-100">
        <Row className="h-100">
          <Col lg={1} className="p-0">
            <Sidebar />
          </Col>
          <Col lg={3} className="p-0">
            <ChatList />
          </Col>
          <Col lg={6} className="p-0"></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Chat;
