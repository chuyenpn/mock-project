import { AxiosResponse } from 'axios';
import create, { SetState } from 'zustand';

import { API_KEY } from '@/config';
import { axios } from '@/lib/axios';
import { Image, OrderBy } from '@/types/index';

type DataResponse = {
  total: number;
  totalHits: number;
  hits: Image[];
};

interface ImageStore {
  isLoading: boolean;
  isSearching: boolean;
  images: Image[];
  searchTerm: string;
  orderBy: OrderBy;
  page: number;
  perPage: number;
  totalPages: number;
  total: number;
  setSearchTerm: (term: string) => void;
  setPage: (page: number) => void;
  setOrderBy: (orderBy: OrderBy) => void;
  getImages: () => Promise<void>;
}

export const useImageStore = create<ImageStore>((set: SetState<ImageStore>) => ({
  isLoading: false,
  isSearching: false,
  images: [],
  searchTerm: '',
  page: 1,
  perPage: 9,
  totalPages: 0,
  total: 0,
  orderBy: OrderBy.popular,
  setSearchTerm: (term) => set(() => ({ searchTerm: term, page: 1, isSearching: true })),
  setPage: (page) => set(() => ({ page, isSearching: false })),
  setOrderBy: (orderBy) => set(() => ({ orderBy, page: 1, isSearching: false })),
  getImages: async () => {
    set({ isLoading: true });
    const { searchTerm, page, perPage, orderBy } = useImageStore.getState();
    let data: AxiosResponse<DataResponse> | null = null;
    try {
      data = await axios.get<DataResponse, AxiosResponse<DataResponse>>(
        `?q=${encodeURIComponent(searchTerm)}&page=${page}&per_page=${perPage}&order=${orderBy}&key=${API_KEY}`
      );

      set({
        images: data?.data?.hits,
        totalPages:
          Math.ceil(data?.data?.total / perPage) > 50 ? 50 : Math.ceil(data?.data?.total / perPage),
        total: data?.data?.total > 450 ? 450 : data?.data?.total,
        isLoading: false,
      });
    } catch (error) {
      set({
        images: [],
        totalPages: 0,
        total: 0,
        isLoading: false,
      });
    }
  },
}));
