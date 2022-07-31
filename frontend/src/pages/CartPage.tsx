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
import { addToCart } from '../features/cart/cartSlice';
import Message from '../common/components/Message';

const CartPage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cartItems);
  console.log('CART:', cart);

  const productId: string = String(params.id);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const quantity: number = Number(urlParams.get('qty'));

  useEffect(() => {
    dispatch(addToCart({ productId, quantity }));
  }, [productId, quantity, dispatch]);

  return <div>CartPage</div>;
};

export default CartPage;
