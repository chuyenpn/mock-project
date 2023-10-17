import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useAuthStore } from '@/stores/auth';

import { Layout } from '../components/Layout';
import { LoginForm } from '../components/LoginForm';

export const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/images');
    } else {
      navigate('/auth/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <Layout title="Log in to your account">
      <LoginForm onSuccess={() => navigate('/images')} />
    </Layout>
  );
};
