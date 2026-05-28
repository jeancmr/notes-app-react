import { use, type PropsWithChildren } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';

export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = use(AuthContext);

  if (authStatus === 'checking') return null;

  if (authStatus === 'not-authenticated') return <Navigate to="/auth" />;

  return children;
};

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = use(AuthContext);

  if (authStatus === 'checking') return null;

  if (authStatus === 'authenticated') return <Navigate to="/" />;

  return children;
};
