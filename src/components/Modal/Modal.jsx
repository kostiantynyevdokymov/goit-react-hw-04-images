import { OverlayStyled, ModalStyled } from './Modal.styled';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Modal = ({ onClose, src }) => {
  // componentDidMount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  //   window.removeEventListener('click', this.handleBackdropClick);
  // }
  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  //   window.removeEventListener('click', this.handleBackdropClick);
  // }
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };
  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleBackdropClick);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleBackdropClick);
    };
  });

  return (
    <OverlayStyled onClick={handleBackdropClick}>
      <ModalStyled>
        <img src={src} alt="" />
      </ModalStyled>
    </OverlayStyled>
  );
};

export default Modal;

Modal.propType = {
  src: PropTypes.string.isRequired,
};
