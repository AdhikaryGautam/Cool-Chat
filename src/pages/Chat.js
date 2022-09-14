import { useContext } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import ChatList from "../components/ChatList";
import ChatDetail from "../components/ChatDetail";
import { UserContext } from "../context/context";

const Chat = ({ Component }) => {
  const { isChatLoading } = useContext(UserContext);
  return (
    <div className="chat-main">
      <Container fluid={true} className="p-0 h-100">
        <Row className="h-100">
          <Col lg={1} className="p-0">
            <Sidebar />
          </Col>
          <Col lg={3} className="p-0">
            <Component />
          </Col>
          <Col lg={8} className="p-0">
            {isChatLoading ? (
              <div className="loading">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <ChatDetail />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Chat;
