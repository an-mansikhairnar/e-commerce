'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        await fetch('/api/reset-password');
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmail();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem('email'),
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert('Password Updated Successfully!');
        router.push('/auth/login');
      } else {
        alert(data.message || 'Failed to update password');
      }

      console.log(data);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 px-4'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-lg'>
        <h1 className='mb-2 text-center text-3xl font-bold'>Create New Password</h1>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Password */}
          <div>
            <label className='mb-2 block text-sm font-medium'>New Password</label>
            <input
              type='password'
              name='password'
              placeholder='********'
              value={formData.password}
              onChange={handleChange}
              className='w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500'
              required
            />
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium'>Confirm Password</label>
            <input
              type='password'
              name='confirmPassword'
              placeholder='********'
              value={formData.confirmPassword}
              onChange={handleChange}
              className='w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500'
              required
            />
          </div>

          <button type='submit' className='w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700 transition'>
            Save New Password
          </button>
        </form>
      </div>
    </div>
  );
}
