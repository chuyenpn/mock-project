import { axios } from '@/lib/axios';

import { Image } from '../types';

export const getImages = (): Promise<Image[]> => {
  return axios.get('/images');
};

// type QueryFnType = typeof getImages;

// type UseImagesOptions = {
//   config?: QueryConfig<QueryFnType>;
// };

// export const useImages = ({ config }: UseImagesOptions = {}) => {
//   return useQuery<ExtractFnReturnType<QueryFnType>>({
//     ...config,
//     queryKey: ['images'],
//     queryFn: () => getImages(),
//   });
// };
