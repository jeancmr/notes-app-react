import { Outlet } from 'react-router';

export const AuthLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="font-display text-5xl tracking-tight">NoteApp</h1>
          <p className="mt-2 text-sm text-muted-foreground">The best place to keep your notes.</p>
        </div>

        <Outlet />
      </div>
    </div>
  );
};
