import './Modal.css';

const Modal = ({ isVisible, children }) => {
  if (!isVisible) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
