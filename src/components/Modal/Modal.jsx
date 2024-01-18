import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal');

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const listener = event => {
      if (event.code === 'Escape' || event.target.id === 'modal-overlay') {
        onClose();
      }
    };

    window.addEventListener('keydown', listener);
    window.addEventListener('click', listener);

    return () => {
      window.removeEventListener('keydown', listener);
      window.removeEventListener('click', listener);
    };
  }, [onClose]);

  return createPortal(
    <div id="modal-overlay" className={styles.overlay}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
