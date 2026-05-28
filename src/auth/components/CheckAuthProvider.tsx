import { use, type PropsWithChildren } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { AuthContext } from '../context/AuthContext';

export const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { checkAuthStatus, user } = use(AuthContext);

  const { isLoading } = useQuery({
    queryKey: ['auth', { user }],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 1.5,
  });

  if (isLoading) return <CustomFullScreenLoading />;

  return children;
};
