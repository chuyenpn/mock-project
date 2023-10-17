import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useAuthStore } from '@/stores/auth';

export const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/images');
    } else {
      navigate('/auth/login');
    }
  }, [isLoggedIn, navigate]);

  return <div> Home Page </div>;
};
