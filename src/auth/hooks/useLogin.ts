import { use, useState, type SubmitEvent } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'sonner';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = use(AuthContext);

  const handleSignIn = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await login(email, password);
      toast.success('Successfully signed in');
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleSignIn,
  };
};
