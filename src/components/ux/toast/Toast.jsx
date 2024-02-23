import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Toast = ({ type, message, dismissError }) => {
  const typeToClassMap = {
    error: 'bg-red-100 border-l-4 border-red-500 text-red-700',
    success: 'bg-green-100 border-l-4 border-green-500 text-green-700 my-2',
  };
  return (
    <div
      className={`${typeToClassMap[type]} p-4 mb-4 flex justify-between`}
      data-testid="toast__outlet"
    >
      <p>{message}</p>
      <FontAwesomeIcon
        onClick={() => dismissError()}
        className="text-red-500 hover:text-red-700 ml-2"
        icon={faXmark}
        size="lg"
      />
    </div>
  );
};

export default Toast;
