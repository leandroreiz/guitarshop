import {
  Container,
  Navbar,
  Nav,
  Offcanvas,
  NavDropdown,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/users/userLoginSlice';

const Header = () => {
  const { userData } = useAppSelector((state) => state.userLogin);

  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    localStorage.removeItem('userData');
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src="/images/logo.jpg"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
                height="40"
              />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                <img
                  src="/images/logo_inverse.jpg"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                  height="60"
                />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="ms-auto">
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <FontAwesomeIcon icon={solid('cart-shopping')} />
                    &nbsp;Cart
                  </Nav.Link>
                </LinkContainer>

                {userData ? (
                  <NavDropdown title={userData.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FontAwesomeIcon icon={solid('user')} />
                      &nbsp;Sign In
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
