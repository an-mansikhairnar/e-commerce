'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import useCart from '../context/CartContext';
import { useRouter } from 'next/navigation';
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart } = useCart();
  const router = useRouter();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');

        if (!res.ok) {
          throw new Error('Failed to load products');
        }

        const data = await res.json();
        setProducts(data.products ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const showDetails = (id: number) => {
    router.push(`/products/${id}`);
  };
  return (
    <main style={{ padding: '2rem' }}>
        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>Unable to load products right now.</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {products.map((product) => {
              const isInCart = cart.some((item) => item.id === product.id);

              return (
                <article key={product.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem' }}>
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    width={200}
                    height={200}
                    style={{
                      display: 'block',
                      margin: '0 auto',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }}
                  />

                  <h2>
                    <strong>Product: </strong>
                    {product.title}
                  </h2>

                  <p className='line-clamp-2'>
                    <strong>Description: </strong>
                    {product.description}
                  </p>

                  <p style={{ fontWeight: 600 }}>
                    <strong>Price: </strong>${product.price}
                  </p>

                  <div className='flex justify-end gap-2'>
                    <button className='p-1 px-3 rounded bg-blue-500 text-white' onClick={() => showDetails(product.id)}>
                      Show Details
                    </button>

                    <button
                      onClick={() => addToCart(product)}
                      className={`p-1 px-3 rounded ${isInCart ? 'bg-green-500 text-white' : 'bg-yellow-300'}`}
                    >
                      {isInCart ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
  );
}
