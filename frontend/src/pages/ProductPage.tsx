import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProduct } from '../features/products/productSlice';
import Rating from '../common/components/Rating';
import Loader from '../common/components/Loader';
import Message from '../common/components/Message';
import { useNavigate } from 'react-router-dom';

const ProductPage: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);

  const params = useParams();
  const navigate = useNavigate();

  const { isLoading, product, error } = useAppSelector(
    (state) => state.productDetails
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProduct(params.id!.toString()));
  }, [dispatch, params]);

  // Adding items to cart
  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${quantity}`);
  };

  // Type Guard
  const errorMessage =
    typeof error === 'string' ? error : 'Oh snap! You got an error!';

  return (
    <>
      <Link className="btn btn-outline-dark my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" message={errorMessage} />
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product?.image} alt={product?.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product?.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product!.rating}
                  text={`${product?.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: €{product?.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product?.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>€{product?.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product!.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product!.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Select
                          aria-label="Select quantity"
                          value={quantity}
                          onChange={(evt) => setQuantity(+evt.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map(
                            (val) => (
                              <option key={val + 1} value={val + 1}>
                                {val + 1}
                              </option>
                            )
                          )}
                        </Form.Select>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      disabled={product?.countInStock === 0}
                      type="button"
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductPage;
