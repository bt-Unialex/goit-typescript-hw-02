export interface GalleryState {
  quary: string;
  images: Image[];
  pagesLoaded: number;
  pagesAvailable: number;
}

export interface Image {
  id: string;
  description: string | null;
  alt_description: string | null;
  urls: { [key: string]: string };
}
