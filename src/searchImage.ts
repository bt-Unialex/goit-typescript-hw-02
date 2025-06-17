import axios from 'axios';
import { GalleryState } from './types';

export function searchImage(request: string, page = 1, per_page = 20): Promise<GalleryState> {
  const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

  const BASE_URL = 'https://api.unsplash.com/search/photos';
  const param: URLSearchParams = new URLSearchParams({
    client_id: API_KEY,
    query: encodeURIComponent(request),
    // orientation: 'landscape',
    // content_filter: "high",
    page: String(page),
    per_page: String(per_page),
  });

  const URL = `${BASE_URL}?${param}`;

  const response = axios.get(URL).then((response) => {
    // console.log(response);
    return {
      quary: request,
      images: response.data.results,
      pagesLoaded: page,
      pagesAvailable: response.data.total_pages,
    };
  });
  return response;
}
