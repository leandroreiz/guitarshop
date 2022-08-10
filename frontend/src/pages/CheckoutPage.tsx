import { useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { calculateCheckoutPrices } from '../features/cart/cartSlice';
import { createOrder } from '../features/orders/ordersSlice';
import Message from '../common/components/Message';
import CheckoutSteps from '../common/components/CheckoutSteps';

const CheckoutPage = () => {
  const { cart, shippingAddress, paymentMethod } = useAppSelector(
    (state) => state.cart
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Calculate prices
  dispatch(calculateCheckoutPrices());

  const { order, isSuccess, error } = useAppSelector(
    (state) => state.orderCreate
  );

  console.log(order);
  const orderId = order._id;

  useEffect(() => {
    if (isSuccess) navigate(`/order/${orderId}`);
  }, [navigate, isSuccess, orderId]);

  // Fill out the order
  const checkoutHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  const errorMessage =
    typeof error === 'string' ? error : 'Oh snap! You got an error!';

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {`${shippingAddress?.address}, ${shippingAddress?.city},
                ${shippingAddress?.postalCode}, ${shippingAddress?.country}`}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong> {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty!</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, idx) => (
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
                  <Col>€{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>€{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>€{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>€{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error ? (
                  <Message variant="danger">{errorMessage}</Message>
                ) : (
                  ''
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <div className="d-grid">
                  <Button
                    disabled={cart.cartItems.length === 0}
                    type="button"
                    onClick={checkoutHandler}
                  >
                    Checkout
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CheckoutPage;
