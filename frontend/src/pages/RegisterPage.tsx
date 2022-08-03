import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../features/users/userRegisterSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Message from '../common/components/Message';
import Loader from '../common/components/Loader';
import FormContainer from '../common/components/FormContainer';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { isLoading, userData, error } = useAppSelector(
    (state) => state.userRegister
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const redirect = window.location.search
    ? window.location.search.split('=')[1]
    : '/';

  useEffect(() => {
    if (userData) navigate(redirect);
  }, [userData, navigate, redirect]);

  const submitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  // Type Guard
  const errorMessage =
    typeof error === 'string' ? error : 'Oh snap! You got an error!';

  return (
    <FormContainer>
      <>
        <h1>Sign Up</h1>
        {isLoading && <Loader />}
        {error && <Message variant="danger">{errorMessage}</Message>}
        {message && <Message variant="danger">{message}</Message>}

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(evt) => setName(evt.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirm-password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password confirmation"
              value={confirmPassword}
              onChange={(evt) => setConfirmPassword(evt.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Sign In
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Have an account? &nbsp;
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </Col>
        </Row>
      </>
    </FormContainer>
  );
};

export default RegisterPage;
