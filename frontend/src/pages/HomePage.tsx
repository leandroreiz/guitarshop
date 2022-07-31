import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { fetchProducts } from '../features/products/productListSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Product from '../features/products/Product';
import Loader from '../common/components/Loader';
import Message from '../common/components/Message';

const Home = () => {
  const { isLoading, products, error } = useAppSelector(
    (state) => state.productList
  );

  const dispatch = useAppDispatch();

  // Type Guard
  const errorMessage =
    typeof error === 'string' ? error : 'Oh snap! You got an error!';

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Guitars</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{errorMessage}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Home;
