import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { useAuthStore } from '@/stores/auth';
import { useNotificationStore } from '@/stores/notifications';

const schema = z.object({
  username: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
});

type LoginValues = {
  username: string;
  password: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login, isLoading } = useAuthStore();
  const { addNotification } = useNotificationStore();

  const handleLogin = async (values: LoginValues) => {
    try {
      await login(values.username, values.password);
      onSuccess();
    } catch (e) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Invalid username or password',
      });
    }
  };

  return (
    <div>
      <Form<LoginValues, typeof schema> onSubmit={handleLogin} schema={schema}>
        {({ register, formState }) => (
          <>
            <InputField
              type="text"
              label="Username"
              error={formState.errors['username']}
              registration={register('username')}
            />
            <InputField
              type="password"
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <div>
              <Button isLoading={isLoading} type="submit" className="w-full">
                Log in
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};
