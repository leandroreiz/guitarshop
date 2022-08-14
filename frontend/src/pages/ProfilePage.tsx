import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { getProfile } from '../features/users/userProfileSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateProfile } from '../features/users/userProfileUpdateSlice';
import { getActiveUserOrders } from '../features/orders/orderMyListSlice';

import Message from '../common/components/Message';
import Loader from '../common/components/Loader';
import { LinkContainer } from 'react-router-bootstrap';

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

  const {
    orders,
    isLoading: isMyOrdersListLoading,
    error: isMyOrdersListError,
  } = useAppSelector((state) => state.orderMyList);

  const { success } = useAppSelector((state) => state.userProfileUpdate);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userLoginData) {
      navigate('/login');
    } else {
      if (!userProfileData || !userProfileData?.name) {
        dispatch(getProfile('profile'));
        dispatch(getActiveUserOrders());
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
      dispatch(
        updateProfile({ _id: userLoginData?._id, name, email, password })
      );
    }
  };

  // Type Guard
  const errorMessage =
    typeof error === 'string' ? error : 'Oh snap! You got an error!';

  const isMyOrdersErrorMessage =
    typeof isMyOrdersListError === 'string'
      ? isMyOrdersListError
      : 'Oh snap! You got an error!';

  return (
    <Row>
      <Col md={3}>
        <>
          <h2>User Profile</h2>
          {isLoading && <Loader />}
          {error && <Message variant="danger">{errorMessage}</Message>}
          {message && <Message variant="danger">{message}</Message>}
          {success && <Message variant="success">Profile Updated!</Message>}

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
        {isMyOrdersListLoading ? (
          <Loader />
        ) : isMyOrdersListError ? (
          <Message variant="danger">{isMyOrdersErrorMessage}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Id</th>
                <th className="text-center">Date</th>
                <th className="text-center">Total</th>
                <th className="text-center">Paid?</th>
                <th className="text-center">Delivered?</th>
                <th className="text-center">Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td className="text-center">
                    {order.createdAt.toLocaleString().substring(0, 10)}
                  </td>
                  <td className="text-center">{order.totalPrice}</td>
                  <td className="text-center">
                    {order.isPaid ? (
                      <span className="text-success">
                        {order.paidAt.toLocaleString().substring(0, 10)}
                      </span>
                    ) : (
                      <FontAwesomeIcon
                        icon={solid('xmark')}
                        style={{ color: 'red' }}
                      />
                    )}
                  </td>
                  <td className="text-center">
                    {order.isDelivered ? (
                      order.deliveredAt.toLocaleString().substring(0, 10)
                    ) : (
                      <FontAwesomeIcon
                        icon={solid('xmark')}
                        style={{ color: 'red' }}
                      />
                    )}
                  </td>
                  <td className="text-center">
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="secondary" size="sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
