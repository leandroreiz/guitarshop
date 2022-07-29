import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';

interface IRatingProps {
  value: number;
  text: string;
  color?: string;
}

const Rating: React.FC<IRatingProps> = ({ value, text, color }) => {
  return (
    <div className="rating">
      <span style={{ color }}>
        <FontAwesomeIcon
          icon={
            value >= 1
              ? solid('star')
              : value >= 0.5
              ? solid('star-half-alt')
              : regular('star')
          }
        />
      </span>
      <span style={{ color }}>
        <FontAwesomeIcon
          icon={
            value >= 2
              ? solid('star')
              : value >= 1.5
              ? solid('star-half-alt')
              : regular('star')
          }
        />
      </span>
      <span style={{ color }}>
        <FontAwesomeIcon
          icon={
            value >= 3
              ? solid('star')
              : value >= 2.5
              ? solid('star-half-alt')
              : regular('star')
          }
        />
      </span>
      <span style={{ color }}>
        <FontAwesomeIcon
          icon={
            value >= 4
              ? solid('star')
              : value >= 3.5
              ? solid('star-half-alt')
              : regular('star')
          }
        />
      </span>
      <span style={{ color }}>
        <FontAwesomeIcon
          icon={
            value >= 5
              ? solid('star')
              : value >= 4.5
              ? solid('star-half-alt')
              : regular('star')
          }
        />
      </span>
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: '#f0c106',
};

export default Rating;
