import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { Row, Col } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';
import { RootState } from '../store/store';
import Product from '../components/Product';

const Home = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: RootState) => state.productList);

  useEffect(() => {
    // @TODO fix type for listProducts action
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Guitars</h1>
      <Row>
        {state.products?.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
