import { ImageGalleryItemStyled } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
import ImageGalleryItemImg from './ImageGalleryItemImg';
import Modal from 'components/Modal/Modal';
import { useState } from 'react';

const ImageGalleryItem = ({ onClick, galleryList, imageURL }) => {
  // state = {
  //   showModal: false,
  // };
  const [showModal, setShowModal] = useState(false);

  const showModalOnClick = () => {
    setShowModal(prevState => !prevState);
  };

  // const openGalleryItemModal = id => {
  //   this.showModal();
  //   const galleryItem = this.props.galleryList.filter(item => item.id === id);
  //   this.setState({ largeImage: galleryItem[0].largeImageURL });
  // };

  // const { galleryList } = this.props;
  return (
    <>
      {galleryList.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItemStyled
            key={id}
            onClick={() => {
              onClick(largeImageURL);
              showModalOnClick();
            }}
          >
            <ImageGalleryItemImg src={webformatURL} />
          </ImageGalleryItemStyled>
        );
      })}
      {showModal && <Modal src={imageURL} onClose={showModalOnClick} />}
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propType = {
  galleryList: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
