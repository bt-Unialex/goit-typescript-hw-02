import { JSX } from 'react';
import css from './LoadMoreBtn.module.css';
import { GalleryState } from '../../types';

interface LoadMoreBtnProps {
  gallery: GalleryState;
  onClick: (quary: string, currentPage: number) => void;
}

export default function LoadMoreBtn({ gallery, onClick }: LoadMoreBtnProps): JSX.Element {
  return (
    <button
      className={css.button}
      type="button"
      onClick={() => {
        onClick(gallery.quary, gallery.pagesLoaded + 1);
      }}>
      Load more
    </button>
  );
}
