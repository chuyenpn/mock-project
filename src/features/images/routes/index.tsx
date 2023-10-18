import { Route, Routes, Navigate } from 'react-router-dom';

import { useAuthStore } from '@/stores/auth';

import { Detail } from './Detail';
import { List } from './List';

export const ImageRoutes = () => {
  const { isLoggedIn } = useAuthStore();
  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Routes>
      <Route path="/:id" element={<Detail />} />
      <Route path="/" element={<List />} />
    </Routes>
  );
};
