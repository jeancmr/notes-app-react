import { CustomFooter } from '@/components/custom/CustomFooter';
import { CustomHeader } from '@/components/custom/CustomHeader';
import { Outlet } from 'react-router';

export const NoteAppLayout = () => {
  return (
    <div className="min-h-screen">
      <CustomHeader />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>

      <CustomFooter />
    </div>
  );
};
