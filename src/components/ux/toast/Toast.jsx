import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Toast Component
 * Displays a toast message with a dismiss button.
 *
 * @param {Object} props - Props for the component.
 * @param {string} props.type - The type of toast message.
 * @param {string} props.message - The message to display in the toast.
 * @param {Function} props.dismissError - The function to dismiss the toast message.
 */
const Toast = ({ type, message, dismissError }) => {
  const typeToClassMap = {
    error: 'bg-red-100 border-l-4 border-red-500 text-red-700',
    success: 'bg-green-100 border-l-4 border-green-500 text-green-700 my-2',
    warning: 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700',
  };
  return (
    <div
      className={`${typeToClassMap[type]} p-4 mb-4 flex justify-between`}
      data-testid="toast__outlet"
    >
      <p data-testid="toast__message">{message}</p>
      <FontAwesomeIcon
        onClick={() => dismissError()}
        className="text-red-500 hover:text-red-700 ml-2"
        icon={faXmark}
        size="lg"
        data-testid="toast__dismiss"
      />
    </div>
  );
};

export default Toast;
