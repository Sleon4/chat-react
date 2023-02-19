import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";
import { ReadyState } from "react-use-websocket";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import messages_re from "./../assets/undraw_messages_re_qy9x.svg";

function Chat() {
  const [socket, setSocket] = useState(null);
  const [jwt, setJwt] = useState(
    jwtDecode(window.sessionStorage.getItem("jwt"))
  );
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [actualChat, setActualChat] = useState({});

  const [users_name, setUsers_name] = useState("");
  const [messages_text, setMessages_text] = useState("");
  const [messages_user_receives, setMessages_user_receives] = useState("");

  const { sendMessage, readyState } = useWebSocket(
    "ws://127.0.0.1:8080",
    {
      onOpen: () => {
        console.log("WebSocket connection established.");
      },
      onMessage: (e) => {
        if (JSON.parse(e.data).idusers === actualChat.idusers) {
          handleReadMessages(actualChat);
        }
      },
      onClose: (e) => {
        console.log(e);
      },
    }
  );

  const handleReadUsers = () => {
    axios
      .get("http://127.0.0.1:8000/api/users/read", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + window.sessionStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        // console.log(res.data);
        setUsers(!res.data.status ? res.data : []);
      });
  };

  const handleReadMessages = (user) => {
    // console.log(user)
    setMessages([]);
    setActualChat(user);
    setMessages_user_receives(user.idusers);

    const form = new FormData();
    form.append("messages_user_receives", user.idusers);

    axios
      .post("http://127.0.0.1:8000/api/messages/read", form, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + window.sessionStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        // console.log(res.data);
        setMessages(!res.data.status ? res.data : []);
        setUsers_name(user.users_name);
      });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("messages_text", messages_text);
    form.append("messages_user_receives", messages_user_receives);

    axios
      .post("http://127.0.0.1:8000/api/messages/send", form, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + window.sessionStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        // console.log(res.data);
        setMessages_text("");
        handleReadMessages(actualChat);

        if (res.data.status === "success") {
          sendMessage(
            JSON.stringify({
              idusers: jwt.data.idusers,
              users_name: jwt.data.users_name,
            })
          );
        }
      });
  };

  useEffect(() => {
    handleReadUsers();
  }, []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <Container fluid>
      <div className="my-4">
        <Row>
          <Col xs={12} sm={12} md={4} lg={4} xl={3}>
            <h5>Users</h5>
            <hr />

            <ListGroup variant="flush">
              {users.map((user, index) => (
                <ListGroup.Item
                  key={index}
                  onClick={() => handleReadMessages(user)}
                  action
                >
                  {user.users_name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          <Col xs={12} sm={12} md={8} lg={8} xl={9}>
            {[null, ""].includes(users_name) ? (
              <div className="p-3 border rounded text-center">
                <img
                  src={messages_re}
                  className={"img-fluid"}
                  width={"500"}
                  height={"250"}
                />
              </div>
            ) : (
              <Card className="border rounded" style={{ height: "600px" }}>
                <Card.Header>{users_name}</Card.Header>

                <Card.Body className="overflow-auto">
                  {messages.map((message, index) => (
                    <Alert
                      key={index}
                      variant={
                        jwtDecode(window.sessionStorage.getItem("jwt")).data
                          .idusers === message.messages_user_sends
                          ? "primary"
                          : "secondary"
                      }
                    >
                      {message.messages_text}
                    </Alert>
                  ))}
                </Card.Body>

                <Card.Footer>
                  <Form onSubmit={handleSendMessage}>
                    <InputGroup>
                      <Form.Control
                        placeholder="Write a message..."
                        value={messages_text}
                        onChange={(e) => setMessages_text(e.target.value)}
                        required
                      />

                      <Button type="submit" variant="secondary">
                        <i className="bi bi-send"></i>
                      </Button>
                    </InputGroup>
                  </Form>
                </Card.Footer>
              </Card>
            )}
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Chat;
