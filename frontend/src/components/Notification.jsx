import PropTypes from 'prop-types';

const Notification = ({ message, type }) => {
  const className = `notification ${type}`;

  return (
    message !== null && (
      <div className={className}>
        <span>{type}</span>
        {message}
      </div>
    )
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};

export default Notification;
