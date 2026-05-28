import { createBrowserRouter, Navigate } from 'react-router';
import { NoteAppLayout } from './noteapp/layout/NoteAppLayout';
import { ActiveNotesPage } from './noteapp/pages/active-notes/ActiveNotesPage';
import { AuthLayout } from './auth/layout/AuthLayout';
import { LoginPage } from './auth/pages/login/LoginPage';
import { AuthenticatedRoute, NotAuthenticatedRoute } from './auth/routes/ProtectedRoutes';
import { ArchivedNotesPage } from './noteapp/pages/archived-notes/ArchivedNotesPage';

export const appRouter = createBrowserRouter([
  {
    path: '/',

    element: (
      <AuthenticatedRoute>
        <NoteAppLayout />
      </AuthenticatedRoute>
    ),
    children: [
      { index: true, element: <ActiveNotesPage /> },
      {
        path: 'archived',
        element: <ArchivedNotesPage />,
      },
    ],
  },

  //   AUTH routes
  {
    path: '/auth',
    element: (
      <NotAuthenticatedRoute>
        <AuthLayout />
      </NotAuthenticatedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },

  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);
