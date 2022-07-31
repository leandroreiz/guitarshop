import { useEffect } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ActionAttributes, addToCart } from '../features/cart/cartSlice';
import Message from '../common/components/Message';

const CartPage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cartItems);
  console.log('CART:', cart);

  useEffect(() => {
    dispatch(addToCart({ id: '62e1a298c821ac4b525e5c2e', quantity: 3 }));
  }, [params.id, params.qty, dispatch]);

  return <div>CartPage</div>;
};

export default CartPage;
