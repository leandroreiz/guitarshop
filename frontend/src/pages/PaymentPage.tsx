import { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { savePaymentMethod } from '../features/cart/cartSlice';
import FormContainer from '../common/components/FormContainer';
import CheckoutSteps from '../common/components/CheckoutSteps';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const cart = useAppSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!shippingAddress) navigate(`/shipping`);

  const submitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    navigate(`/checkout`);
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              className="mb-3"
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paypalMethod"
              value="PayPal"
              checked
              onChange={(evt) => setPaymentMethod(evt.target.value)}
            ></Form.Check>
            <Form.Check
              className="mb-3"
              type="radio"
              label="Stripe (available soon)"
              id="Stripe"
              name="paypalMethod"
              value="Stripe"
              disabled
              onChange={(evt) => setPaymentMethod(evt.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue to Checkout
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
