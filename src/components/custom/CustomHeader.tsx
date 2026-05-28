import { AuthContext } from '@/auth/context/AuthContext';
import { use } from 'react';
import { Link, useLocation } from 'react-router';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';

export const CustomHeader = () => {
  const { pathname } = useLocation();
  const { user, logout } = use(AuthContext);

  const tabs = [
    { to: '/', label: 'Active' },
    { to: '/archived', label: 'Archived' },
  ];

  return (
    <header className="border-b border-border bg-paper/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-3xl italic tracking-tight">Note App</span>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            — a quiet place for notes
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-1 rounded-full border border-border bg-background p-1">
            {tabs.map((t) => {
              const active = pathname === t.to;
              return (
                <Link
                  key={t.to}
                  to={t.to}
                  className={`rounded-full px-4 py-1.5 text-sm transition ${
                    active
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t.label}
                </Link>
              );
            })}
          </nav>
          {user && (
            <div className="flex items-center gap-2 border-l border-border pl-4">
              <span className="hidden text-xs capitalize text-muted-foreground md:inline">
                {user.name}
              </span>
              <Button variant="ghost" size="sm" onClick={logout} className="rounded-full">
                <LogOut className="mr-1 h-3.5 w-3.5" /> Log out
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
