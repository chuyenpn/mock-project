import { Route, Routes, Navigate } from 'react-router-dom';

import { useAuthStore } from '@/stores/auth';

import { ImageList } from './ImageList';

export const ImageRoutes = () => {
  const { isLoggedIn } = useAuthStore();
  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Routes>
      <Route path="/" element={<ImageList />} />
    </Routes>
  );
};
