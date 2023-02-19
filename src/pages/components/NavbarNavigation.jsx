import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function NavbarNavigation() {
  return (
    <Navbar bg="light" expand="lg" className="border-bottom shadow-sm">
      <Container>
        <Navbar.Brand href="#">{"Chat"}</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to={"/"}>
              <Nav.Link>
                <i className="bi bi-bell-fill text-success"></i>
              </Nav.Link>
            </LinkContainer>
          </Nav>

          <Nav className="ms-auto">
            <LinkContainer to={"/"}>
              <Nav.Link>{"Home"}</Nav.Link>
            </LinkContainer>

            <LinkContainer to={"/chat"}>
              <Nav.Link>{"Chat"}</Nav.Link>
            </LinkContainer>

            <LinkContainer to={"/auth/login"}>
              <Nav.Link>{"Login"}</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarNavigation;
