/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import useCart from '../context/CartContext';

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
};

export default function Cart() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const { cart, removeFromCart } = useCart();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  // const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  // const removeItem = (id: number) => {
  //   const updatedCart = cartItems.filter((item) => item.id !== id);

  //   setCartItems(updatedCart);
  //   localStorage.setItem('cart', JSON.stringify(updatedCart));
  // };

  return (
    <div className='max-w-3xl mx-auto p-6'>
        <h1 className='text-2xl font-bold mb-6'>Shopping Cart</h1>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <div className='space-y-4'>
              {cart.map((item) => (
                <div key={item.id} className='flex justify-between items-center border rounded-lg p-4 shadow-sm'>
                  <div>
                    <h2 className='font-semibold'>{item.title}</h2>

                    <p className='text-gray-500'>₹{item.price}</p>
                  </div>

                  <div className='flex items-center gap-4'>
                    <span>Qty: 1</span>

                    <button onClick={() => removeFromCart(item.id)} className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-6 border-t pt-4 flex justify-between items-center'>
              <h2 className='text-xl font-bold'>Total: ₹{total}</h2>

              <button className='bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700'>Checkout</button>
            </div>
          </>
        )}
      </div>
  );
}

// /* eslint-disable react-hooks/set-state-in-effect */
// 'use client';

// import { useEffect, useState } from 'react';

// type Product = {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   thumbnail: string;
//   images: string[];
// };

// export default function Cart() {
//   const [cartItems, setCartItems] = useState<Product[]>([]);

//   useEffect(() => {
//     const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//     setCartItems(cart);
//   }, []);

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-5">
//         Shopping Cart
//       </h1>

//       {cartItems.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <div className="space-y-4">
//           {cartItems.map((item) => (
//             <div
//               key={item.id}
//               className="border rounded-lg p-4 shadow"
//             >
//               {/* <img
//                 src={item.images[0]}
//                 alt={item.title}
//                 width={150}
//                 height={150}
//               /> */}

//               <h2 className="font-bold">
//                 {item.title}
//               </h2>

//               <p className="text-gray-600">
//                 {item.description}
//               </p>

//               <p className="font-semibold">
//                 ${item.price}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
// //   const searchParams = useSearchParams();
// //   const id = searchParams.get('id');

// //   const [product, setProduct] = useState<Product | null>(null);

// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       try {
// //         const res = await fetch(`/api/products/${id}`);

// //         if (!res.ok) {
// //           throw new Error('Failed to fetch product');
// //         }

// //         const data = await res.json();
// //         setProduct(data);
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     };

// //     if (id) {
// //       fetchProduct();
// //     }
// //   }, [id]);

// //   if (!product) {
// //     return <p>Loading...</p>;
// //   }

// //   const cartItems = [
// //     {
// //       id: 1,
// //       title: 'Wireless Mouse',
// //       price: 599,
// //       quantity: 1,
// //     },
// //     {
// //       id: 2,
// //       title: 'Keyboard',
// //       price: 1299,
// //       quantity: 2,
// //     },
// //   ];

// //   const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

// //   return (
// //     <div className='max-w-3xl mx-auto p-6'>
// //       <h1 className='text-2xl font-bold mb-6'>Shopping Cart</h1>

// //       <p>Product ID: {id}</p>

// //       <div className='p-5'>
// //         <h1>{product.title}</h1>

// //         <p>{product.description}</p>

// //         <h2>${product.price}</h2>
// //       </div>

// //       <div className='space-y-4'>
// //         {cartItems.map((item) => (
// //           <div key={item.id} className='flex justify-between items-center border rounded-lg p-4 shadow-sm'>
// //             <div>
// //               <h2 className='font-semibold'>{item.title}</h2>
// //               <p className='text-gray-500'>₹{item.price}</p>
// //             </div>

// //             <div className='flex items-center gap-4'>
// //               <span>Qty: {item.quantity}</span>
// //               <button className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>Remove</button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       <div className='mt-6 border-t pt-4 flex justify-between items-center'>
// //         <h2 className='text-xl font-bold'>Total: ₹{total}</h2>

// //         <button className='bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700'>Checkout</button>
// //       </div>
// //     </div>
// //   );
// // }
