import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
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
      <Navbar
        className="py-2"
        bg="primary"
        variant="dark"
        expand="md"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src="/images/logo.jpg"
                className="d-inline-block align-top"
                alt="Guitar Shop logo"
                height="60"
              />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userData ? (
                <NavDropdown
                  title={userData.name}
                  id="username"
                  className="btn btn-primary"
                >
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
                    <Button variant="outline-light rounded-circle">
                      <FontAwesomeIcon icon={solid('user')} />
                    </Button>
                  </Nav.Link>
                </LinkContainer>
              )}

              <LinkContainer to="/cart">
                <Nav.Link>
                  <Button variant="outline-light rounded-circle">
                    <FontAwesomeIcon icon={solid('cart-shopping')} />
                  </Button>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
