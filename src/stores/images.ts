import create, { SetState } from 'zustand';

import { axios } from '@/lib/axios';

interface ImageStore {
  isLoading: boolean;
  images: any[];
  getImages: () => Promise<void>;
}

export const useImageStore = create<ImageStore>((set: SetState<ImageStore>) => ({
  images: [],
  isLoading: false,
  getImages: async () => {
    set({ isLoading: true });
    const data = await axios.get<any[]>('/images');
    console.log('data ======== ', data);
    set({ images: data.documents, isLoading: false });
  },
}));
