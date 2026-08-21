'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    async function logout() {
      localStorage.removeItem('token');
      window.dispatchEvent(new Event('auth:updated'));

      await fetch('/api/auth/logout', {
        method: 'POST',
      });

      router.push('/auth/login');
    }

    logout();
  }, [router]);

  return (
    <div>
      <h1>You have been logged out.</h1>
      <p>Redirecting to login page...</p>
    </div>
  );
}
