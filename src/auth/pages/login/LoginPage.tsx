import { useLogin } from '@/auth/hooks/useLogin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const LoginPage = () => {
  const { isLoading, handleSignIn } = useLogin();

  return (
    <form
      onSubmit={handleSignIn}
      className="space-y-4 rounded-xl border border-border bg-paper p-6 shadow-paper"
    >
      <div className="space-y-1.5">
        <Label className="text-xs uppercase tracking-wide text-muted-foreground" htmlFor="email">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="johndoe@example.com"
          autoFocus
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs uppercase tracking-wide text-muted-foreground" htmlFor="password">
          Password
        </Label>
        <Input id="password" name="password" type="password" placeholder="••••••••" required />
      </div>

      <Button type="submit" className="w-full rounded-full" disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Sign in'}
      </Button>

      <p className="text-center text-[11px] text-muted-foreground">Check email in readme</p>
    </form>
  );
};
