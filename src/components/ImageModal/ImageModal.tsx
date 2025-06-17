import css from './ImageModal.module.css';
import Modal from 'react-modal';
import { JSX, MouseEventHandler } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import { Image } from '../../types';

interface ImageModalProps {
  image: Image;
  modalIsOpen: boolean;
  onClose: MouseEventHandler<HTMLButtonElement>;
}

export default function ImageModal({ image, modalIsOpen, onClose }: ImageModalProps): JSX.Element {
  Modal.setAppElement('#modal');
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        //   onAfterOpen={afterOpenModal}
        // onRequestClose={onClose}
        contentLabel="Full image Modal"
        className={css.Modal}
        overlayClassName={css.Overlay}>
        <p className={css.text}>Description: {image.description || image.alt_description}</p>
        <button className={css.closeBtn} onClick={onClose} aria-label="Close modal">
          x
        </button>
        <ImageCard
          image={image.urls.regular}
          alt={image.alt_description || image.description || ''}
        />
      </Modal>
    </>
  );
}
