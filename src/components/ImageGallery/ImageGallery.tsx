import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';
import { JSX, Ref } from 'react';
import { Image } from '../../types';

interface ImageGalleryProps {
  images: Image[];
  showImg: (imageObj: Image) => void;
  ref: Ref<HTMLUListElement>;
}

export default function ImageGallery({ images, showImg, ref }: ImageGalleryProps): JSX.Element {
  return (
    <ul ref={ref} className={css.wrapper}>
      {images.map((image, index) => (
        <li key={image.id + '-' + index} className={css.item} onClick={() => showImg(image)}>
          <ImageCard
            image={image.urls.thumb}
            alt={image.alt_description || image.description || ''}
          />
        </li>
      ))}
    </ul>
  );
}
