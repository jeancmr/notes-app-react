import { RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/components/ui/sonner';
import { appRouter } from './app.router';
import { CheckAuthProvider } from './auth/components/CheckAuthProvider';
import { AuthProvider } from './auth/context/AuthProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CheckAuthProvider>
          <RouterProvider router={appRouter} />;
          <Toaster />
        </CheckAuthProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
