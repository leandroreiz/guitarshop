import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Col className="text-center py-3">
          Developed by{' '}
          <a href="https://www.linkedin.com/in/leandrofreis/">Leandro Reis</a>{' '}
          &copy; 2022
        </Col>
      </Container>
    </footer>
  );
};

export default Footer;
