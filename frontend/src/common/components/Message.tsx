import Alert from 'react-bootstrap/Alert';

interface MessageProps {
  variant: string;
  message: string;
}

const Message: React.FC<MessageProps> = ({ variant, message }) => {
  return <Alert variant={variant}>{message}</Alert>;
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
