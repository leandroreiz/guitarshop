import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../features/users/userProfileSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Message from '../common/components/Message';
import Loader from '../common/components/Loader';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const {
    isLoading,
    userData: userProfileData,
    error,
  } = useAppSelector((state) => state.userProfile);

  const { userData: userLoginData } = useAppSelector(
    (state) => state.userLogin
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userLoginData) {
      navigate('/login');
    } else {
      if (!userProfileData?.name) {
        dispatch(getProfile('profile'));
      } else {
        setName(userProfileData.name);
        setEmail(userProfileData.email);
      }
    }
  }, [userLoginData, userProfileData, navigate, dispatch]);

  const submitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
    } else {
      // dispatch updateProfile
    }
  };

  // Type Guard
  const errorMessage =
    typeof error === 'string' ? error : 'Oh snap! You got an error!';

  return (
    <Row>
      <Col md={3}>
        <>
          <h2>User Profile</h2>
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
              Update
            </Button>
          </Form>
        </>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfilePage;
