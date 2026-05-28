import type { User } from '@/interfaces/user.interface';
import { useState, type PropsWithChildren } from 'react';
import { checkAuthAction } from '../actions/check-auth.action';
import { loginAction } from '../actions/login';
import { logoutAction } from '../actions/logout.action';
import { AuthContext, type AuthStatus } from './AuthContext';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('not-authenticated');
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const { data: user } = await loginAction(email, password);
      setUser(user);
      setAuthStatus('authenticated');
    } catch (error) {
      setUser(null);
      setAuthStatus('not-authenticated');
      throw new Error((error as Error).message, { cause: error });
    }
  };

  const logout = async () => {
    try {
      await logoutAction();
    } catch (error) {
      throw new Error((error as Error).message, { cause: error });
    } finally {
      setUser(null);
      setAuthStatus('not-authenticated');
    }
  };

  const checkAuthStatus = async () => {
    try {
      const user = await checkAuthAction();
      setUser(user);
      setAuthStatus('authenticated');
      return user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setUser(null);
      setAuthStatus('not-authenticated');
      return null;
    }
  };

  return (
    <AuthContext
      value={{
        authStatus,
        user,
        checkAuthStatus,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext>
  );
};
