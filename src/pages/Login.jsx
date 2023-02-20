import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [users_email, setUsers_email] = useState("");
  const [users_password, setUsers_password] = useState("");

  const handleAuth = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("users_email", users_email);
    form.append("users_password", users_password);

    axios.post("http://127.0.0.1:8000/api/auth/login", form).then((res) => {
      console.log(res.data);

      if (res.data.status === "success") {
        window.sessionStorage.setItem("jwt", res.data.data.jwt);
        navigate("/chat");
      }
    });
  };

  useEffect(() => {
    if (location.pathname != "/auth/login") {
      navigate("/auth/login");
    }
  }, []);

  return (
    <Container>
      <div className="my-5">
        <Form onSubmit={handleAuth}>
          <Row>
            <Col
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={4}
              className="mx-auto border rounded p-3"
            >
              <Form.Group className="mb-3" controlId="users_email">
                <Form.Label>{"Email"}</Form.Label>

                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  autoComplete="off"
                  onChange={(e) => setUsers_email(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="users_password">
                <Form.Label>{"Password"}</Form.Label>

                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setUsers_password(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="success" type="submit">
                  Login
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
}

export default Login;
