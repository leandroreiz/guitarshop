import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

interface ICheckoutStepsComponentProps {
  step1?: any;
  step2?: any;
  step3?: any;
  step4?: any;
}

const CheckoutSteps: React.FC<ICheckoutStepsComponentProps> = ({
  step1,
  step2,
  step3,
  step4,
}) => {
  return (
    <Nav className="justify-content-center fs-6 mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>1. Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>1. Sign In</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>2. Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>2. Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>3. Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>3. Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/checkout">
            <Nav.Link>4. Checkout</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>4. Checkout</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
