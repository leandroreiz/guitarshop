import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addToCart, removeFromCart } from '../features/cart/cartSlice';
import Message from '../common/components/Message';

const CartPage = () => {
  const { cart } = useAppSelector((state) => state.cart);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get product ID
  const productId = String(params.id);

  // Get the quantity from URL query params
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const quantity = urlParams ? Number(urlParams.get('qty')) : 0;

  useEffect(() => {
    dispatch(addToCart({ productId, quantity }));
  }, [productId, quantity, dispatch]);

  // Handlers
  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate(`/login?redirect=/shipping`);
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cart.cartItems.length === 0 ? (
          <Message>
            Your cart is empty — <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cart.cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>€{item.price}</Col>
                  <Col md={2}>
                    <Form.Select
                      aria-label="Select quantity"
                      value={item.quantity}
                      onChange={(evt) =>
                        dispatch(
                          addToCart({
                            productId: item.product,
                            quantity: +evt.target.value,
                          })
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((val) => (
                        <option key={val + 1} value={val + 1}>
                          {val + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <FontAwesomeIcon icon={solid('trash')} />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cart.cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                items
              </h2>
              €
              {cart.cartItems
                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid">
                <Button
                  disabled={cart.cartItems.length === 0}
                  type="button"
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
