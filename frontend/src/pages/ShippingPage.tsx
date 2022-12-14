import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { saveShippingAddress } from '../features/cart/cartSlice';
import FormContainer from '../common/components/FormContainer';
import CheckoutSteps from '../common/components/CheckoutSteps';

const ShippingPage = () => {
  const cart = useAppSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate(`/payment`);
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping Details</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(evt) => setAddress(evt.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(evt) => setCity(evt.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(evt) => setPostalCode(evt.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(evt) => setCountry(evt.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue to Payment
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
