import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Spinner } from '@/components/Elements';
import { ImagesList } from '@/features/images';
import { useAuthStore } from '@/stores/auth';

const App = () => {
  const { isLoggedIn } = useAuthStore();
  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Suspense
      fallback={
        <div className="h-full w-full flex items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <Outlet />
    </Suspense>
  );
};

export const protectedRoutes = [
  {
    path: '/images',
    element: <App />,
    children: [
      { path: '/', element: <ImagesList /> },
      { path: '*', element: <Navigate to="/images" /> },
    ],
  },
];
