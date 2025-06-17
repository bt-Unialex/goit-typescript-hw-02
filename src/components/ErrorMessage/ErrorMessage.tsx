import { JSX } from 'react';
import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
}
export default function ErrorMessage({ message }: ErrorMessageProps): JSX.Element {
  return <p className={css.text}>{message || 'No images yet!'}</p>;
}
