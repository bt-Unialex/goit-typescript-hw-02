import './App.css';
import { JSX, useRef, useState } from 'react';
import { searchImage } from '../../searchImage.js';

import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ImageGallery from '../ImageGallery/ImageGallery';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import { GalleryState, Image } from '../../types';

function App(): JSX.Element {
  const [gallery, setGallery] = useState<GalleryState | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [imgForModal, setImgForModal] = useState<Image | null>(null);
  const [requestError, setRequestError] = useState<string>('');
  const galleryRef = useRef<HTMLUListElement>(null);
  const [isLoadMoreBtnVisible, setIsLoadMoreBtnVisible] = useState<boolean>(false);

  function toggleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  async function loadImg(quary: string, page: number = 1) {
    try {
      if (page === 1) {
        setGallery(null);
      }
      setRequestError('');
      setIsLoading(true);

      const newGallery = await searchImage(quary, page);
      // console.log("Page:",newGallery.pagesLoaded, ' =of= ', newGallery.pagesAvailable);

      if (newGallery.images.length === 0) throw new Error('No image for your request');

      if (newGallery.pagesLoaded < newGallery.pagesAvailable) {
        setIsLoadMoreBtnVisible(true);
      } else setIsLoadMoreBtnVisible(false);

      setGallery((prevGallery) => ({
        ...newGallery,
        images: [...(prevGallery?.images || []), ...newGallery.images],
      }));

      setTimeout(() => {
        if (galleryRef.current !== null) {
          window.scrollTo({
            top: galleryRef.current.scrollHeight,
            behavior: 'smooth',
          });
        }
      }, 300);
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      setRequestError(message);
    } finally {
      setIsLoading(false);
    }
  }

  function showImg(img: Image) {
    setImgForModal(img);
    setModalIsOpen(true);
  }

  return (
    <>
      <SearchBar onSubmit={loadImg} />
      <main>
        {!requestError && gallery ? (
          <ImageGallery ref={galleryRef} images={gallery.images} showImg={showImg} />
        ) : (
          <ErrorMessage message={requestError} />
        )}
        {isLoading && <Loader />}
        {!requestError && isLoadMoreBtnVisible && gallery && (
          <LoadMoreBtn gallery={gallery} onClick={loadImg} />
        )}
        {imgForModal && (
          <ImageModal modalIsOpen={modalIsOpen} image={imgForModal} onClose={toggleModal} />
        )}
      </main>
    </>
  );
}

export default App;
