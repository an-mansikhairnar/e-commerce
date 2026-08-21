'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (formData.email) {
      localStorage.setItem('email', formData.email);
    }
  }, [formData.email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setMessage(data.error || 'Login failed. Please try again.');
      } else {
        localStorage.setItem('token', data.token);
        window.dispatchEvent(new Event('auth:updated'));
        setMessage('Login successful! Redirecting to products...');
        router.push('/products');
      }
    } catch (error) {
      console.error(error);
      setMessage('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 px-4'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-lg'>
        <h1 className='mb-2 text-center text-3xl font-bold'>Welcome Back</h1>
        <p className='mb-6 text-center text-gray-500'>Sign in to your account</p>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter your email'
              className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none'
              required
            />
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>Password</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter your password'
              className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none'
              required
            />
          </div>

          <div className='flex items-center justify-between text-sm'>
            <label className='flex items-center gap-2'>
              <input type='checkbox' />
              Remember me
            </label>

            <Link href='/reset-password' className='text-blue-600 hover:underline'>
              Forgot Password?
            </Link>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700 disabled:opacity-60'
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {message ? <p className='mt-4 text-center text-sm text-red-600'>{message}</p> : null}

        <p className='mt-6 text-center text-sm text-gray-600'>
          Dont have an account?{' '}
          <Link href='/auth/signup' className='font-medium text-blue-600 hover:underline'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
