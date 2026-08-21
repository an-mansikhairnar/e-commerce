'use client';

import { useState } from 'react';
import type { ChangeEvent } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    email: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='max-w-xl mx-auto mt-10 rounded-xl bg-white p-8 shadow-lg border'>
        <h1 className='text-3xl font-bold text-center mb-6'>Contact Us</h1>

        <form className='space-y-5' onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>Full Name</label>
            <input
              type='text'
              name='name'
              placeholder='John Doe'
              value={formData.name}
              onChange={handleChange}
              className='w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>Email Address</label>
            <input
              type='email'
              name='email'
              placeholder='john@example.com'
              value={formData.email}
              onChange={handleChange}
              className='w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>Message</label>
            <textarea
              name='message'
              rows={5}
              placeholder='Write your message...'
              value={formData.message}
              onChange={handleChange}
              className='w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none'
              required
            />
          </div>

          {/* Button */}
          <button type='submit' className='w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700'>
            Send Message
          </button>
        </form>
      </div>
  );
}
