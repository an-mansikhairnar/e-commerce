'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Signup() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    token: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
          password: formData.password,
          token: formData.token,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert('Account Created Successfully!');
      } else {
        alert(data.message || 'Failed to create account');
      }

      console.log(data);
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 px-4'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-lg'>
        <h1 className='mb-2 text-center text-3xl font-bold'>Create Account</h1>

        <p className='mb-6 text-center text-gray-500'>Sign up to continue shopping</p>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Name */}
          <div>
            <label className='mb-2 block text-sm font-medium'>Full Name</label>
            <input
              type='text'
              name='name'
              placeholder='John Doe'
              value={formData.name}
              onChange={handleChange}
              className='w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500'
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className='mb-2 block text-sm font-medium'>Email</label>
            <input
              type='email'
              name='email'
              placeholder='john@example.com'
              value={formData.email}
              onChange={handleChange}
              className='w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500'
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className='mb-2 block text-sm font-medium'>Phone Number</label>
            <input
              type='tel'
              name='contact'
              placeholder='9876543210'
              value={formData.contact}
              onChange={handleChange}
              className='w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500'
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className='mb-2 block text-sm font-medium'>Password</label>
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

          <button type='submit' className='w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700 transition'>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className='mt-6 text-center text-sm text-gray-600'>
          Already have an account?{' '}
          <Link href='/auth/login' className='font-medium text-blue-600 hover:underline'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
