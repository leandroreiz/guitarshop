import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../features/users/userLoginSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Message from '../common/components/Message';
import Loader from '../common/components/Loader';
import FormContainer from '../common/components/FormContainer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading, userData, error } = useAppSelector(
    (state) => state.userLogin
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
    dispatch(login({ email, password }));
  };

  // Type Guard
  const errorMessage =
    typeof error === 'string' ? error : 'Oh snap! You got an error!';

  return (
    <FormContainer>
      <>
        <h1>Sign In</h1>
        {isLoading && <Loader />}
        {error && <Message variant="danger">{errorMessage}</Message>}

        <Form onSubmit={submitHandler} autoComplete="off">
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

          <Button type="submit" variant="primary">
            Sign In
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            New Customer? &nbsp;
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Register
            </Link>
          </Col>
        </Row>
      </>
    </FormContainer>
  );
};

export default LoginPage;
