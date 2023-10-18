import { AxiosResponse } from 'axios';
import create, { SetState } from 'zustand';

import { API_KEY } from '@/config';
import { axios } from '@/lib/axios';
import { Image } from '@/types/index';

type DataResponse = {
  total: number;
  totalHits: number;
  hits: Image[];
};

interface ImageDetail {
  isLoading: boolean;
  imageDetail: Image | null;
  getImageDetail: (id: string) => Promise<void>;
}

export const useImageDetail = create<ImageDetail>((set: SetState<ImageDetail>) => ({
  isLoading: false,
  imageDetail: null,
  getImageDetail: async (id: string) => {
    set({ isLoading: true });
    const data: AxiosResponse<DataResponse> = await axios.get<
      DataResponse,
      AxiosResponse<DataResponse>
    >(`?id=${id}&key=${API_KEY}`);
    set({
      imageDetail: data?.data?.hits[0],
      isLoading: false,
    });
  },
}));
