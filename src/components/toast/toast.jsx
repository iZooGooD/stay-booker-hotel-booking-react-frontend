import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Toast({ type, message, dismissError }) {
  const cls =
    type === 'error'
      ? 'bg-red-100 border-l-4 border-red-500 text-red-700'
      : 'bg-green-100 border-l-4 border-green-500 text-green-700 my-2';
  return (
    <div className={`${cls} p-4 mb-4 flex justify-between`}>
      <p>{message}</p>
      <FontAwesomeIcon
        onClick={() => dismissError()}
        className="text-red-500 hover:text-red-700 ml-2"
        icon={faXmark}
        size="lg"
      />
    </div>
  );
}
