'use client';

import useCart from '@/app/context/CartContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [count, setCount] = useState(0);

  const { cart } = useCart();
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCount(cart.length);
    };

    updateCartCount();

    // window.addEventListener('cartUpdated', updateCartCount);

    // return () => {
    //   window.removeEventListener('cartUpdated', updateCartCount);
    // };
  }, []);
  return (
    <nav className='bg-gray-800 p-4 flex items-center justify-between text-white'>
      <div className='flex gap-x-6 text-[15px] font-medium'>
        <Link href='/products'>Home</Link>
        <Link href='/category'>Categories</Link>
        <Link href='/contact'>Contact Us</Link>
      </div>

      <div className='flex items-center gap-6'>
        <Link href='/cart' className='relative'>
          🛒 Cart
          {count > 0 && (
            <span className='absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full px-2'>
              {cart.length}
            </span>
          )}
        </Link>

        <Link href='/logout' className='hover:text-red-400'>
          Logout
        </Link>
      </div>
    </nav>
  );
}
