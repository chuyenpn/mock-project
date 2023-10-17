import { useRoutes } from 'react-router-dom';

import { Home } from '@/features/home';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const commonRoutes = [{ path: '/', element: <Home /> }];

  const element = useRoutes([...publicRoutes, ...protectedRoutes, ...commonRoutes]);

  return <>{element}</>;
};
