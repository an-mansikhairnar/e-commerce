'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
};
export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className='p-8'>
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
        <h1>Name: {product.title}</h1>
        <p>Description: {product.description}</p>
        <p>Price: ${product.price}</p>
      </div>
  );
}
