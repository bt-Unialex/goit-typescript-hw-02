import { FormEvent, JSX } from 'react';
import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

interface SearchBarProps {
  onSubmit: (searchQuary: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps): JSX.Element {
  async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const form: HTMLFormElement = evt.currentTarget;
    const formData = new FormData(form);
    const quary = formData.get('search') as string;

    if (quary.trim() === '') {
      toast.error('Please enter search term!');
      return;
    }
    onSubmit(quary);
    form.reset();
  }

  return (
    <header>
      <form onSubmit={handleSubmit} className={css.wrapper}>
        <input
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={css.input}
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            border: '2px solid #20b2aa',
            background: 'transparent',
            color: '#fafafa',
          },
          iconTheme: {
            primary: '#ff0000',
            secondary: '#fafafa',
          },
        }}
      />
    </header>
  );
}
