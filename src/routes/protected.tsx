import { ImageRoutes } from '@/features/images';

export const protectedRoutes = [
  {
    path: '/images/*',
    element: <ImageRoutes />,
  },
];
