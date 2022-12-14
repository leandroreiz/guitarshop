import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
  return (
    <Spinner
      animation="grow"
      variant="primary"
      role="status"
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className="visually-hidden">Loading product list...</span>
    </Spinner>
  );
};

export default Loader;
