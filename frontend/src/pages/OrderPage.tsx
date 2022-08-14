import { useEffect } from 'react';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getOrderDetails } from '../features/orders/orderDetailsSlice';
import Message from '../common/components/Message';
import Loader from '../common/components/Loader';

const OrderPage = () => {
  const { order, isLoading, error } = useAppSelector(
    (state) => state.orderDetails
  );

  const dispatch = useAppDispatch();
  const params = useParams();
  const orderId = params.id;
  const { shippingAddress, paymentMethod } = order;

  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId]);

  const errorMessage =
    typeof error === 'string' ? error : 'Oh snap! You got an error!';

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{errorMessage}</Message>
  ) : (
    <>
      <h1 className="text-success">Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping Address</h2>
              <p>{`${order.user?.name} <${order.user?.email}>`}</p>
              <p>
                {`${shippingAddress?.address}, ${shippingAddress?.city},
                ${shippingAddress?.postalCode}, ${shippingAddress?.country}`}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {`order.deliveredAt`}
                </Message>
              ) : (
                <Message variant="dark">
                  Your items will be dispatched after the payment is confirmed
                </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>{paymentMethod}</p>
              {order.isPaid ? (
                <Message variant="success">Paid on {`order.paidAt`}</Message>
              ) : (
                <Message variant="dark">Pending payment</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty!</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, idx) => (
                    <ListGroup.Item key={idx}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x €{item.price} = €
                          {item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>€{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>€{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>€{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>€{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error ? (
                  <Message variant="danger">{errorMessage}</Message>
                ) : (
                  ''
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
