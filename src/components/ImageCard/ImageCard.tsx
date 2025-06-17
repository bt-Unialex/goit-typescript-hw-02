import css from './ImageCard.module.css';
import { JSX } from 'react';

interface ImageCardProps {
  image: string;
  alt: string;
}
export default function ImageCard({ image, alt = '' }: ImageCardProps): JSX.Element {
  return (
    <div className={css.wrapper}>
      <img className={css.image} src={image} alt={alt} />
    </div>
  );
}
