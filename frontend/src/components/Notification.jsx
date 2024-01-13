import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, type }) => {
  const [visible, setVisible] = useState(false);
  const timeoutId = useRef(null);

  useEffect(() => {
    if (message) {
      setVisible(true);
      timeoutId.current = setTimeout(() => setVisible(false), 7000);
    }

    // Side-effect cleanup;
    // On later renderings, before invoking the next side-effect callback,
    // useEffect() invokes the cleanup function from the previous side-effect execution
    // (to clean up everything after the previous side - effect), then invokes the current side-effect.
    // Source: https://dmitripavlutin.com/react-useeffect-explanation/
    return () => clearTimeout(timeoutId.current);
  }, [message]);

  if (!visible) return null;

  return (
    <div className={`notification ${type}`}>
      <span>{type}</span>
      {message}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};

export default Notification;
