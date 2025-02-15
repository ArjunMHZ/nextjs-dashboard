'use client'

import { useCart } from '@/app/context/CartContext';
import { useWishlist } from '@/app/context/WishlistContext';
import { XCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface Product {
    id: string;
    name: string;
    price: number;
    image_url: string;
    // description: string;
    // Add other product properties as needed
}

export function NoWishlist() {
    return (
        <div className="flex flex-col justify-start items-center md:w-[20%] mt-10 mb-7 pl-4">
            <Image src='/wishlist_empty.svg' alt="notebook skeleton" width={250} height={250} className="mb-8 mt-20"/>
            <span className="flex flex-col justify-center text-center">
                <p className="text-4xl font-semibold mb-2 text-gray-900">Your wishlist is empty</p>
                <p className="text-sm text-gray-700">Keep an eye on products you like by adding them to your wishlist.</p>
            </span>

        </div>
    )
}

export default function Page() {

    const wishlistContext = useWishlist();
    if (!wishlistContext) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    const { wishlist, setWishlist } = wishlistContext;

    const handleProductRemove = (id: string) => {
        // Remove the product with the specified id from the wishlist
        setWishlist(prevWishlist => prevWishlist.filter(product => product.id !== id));
    };

    const cartContext = useCart();

    // Ensure context is defined
    if (!cartContext) {
        throw new Error("useCart must be used within a CartProvider");
    }
    const { addToCart } = cartContext;
    const value = 1;
    const handleAddToCart = (product: Product) => {
        addToCart(product, value);
        alert("Added to cart successsfully");
    }


    return (
        <div>
            {wishlist.length === 0 ? (
                <NoWishlist />
            ) : (
                <>
                    <h2 className='text-xl font-semibold text-slate-600 px-4 py-5 mb-2'>Wishlist</h2>
                    <div className='grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 px-4'>
                        {wishlist.map((product, index) => (
                            <div key={index} className='flex flex-col relative group'>
                                <Image src={product.image_url} alt={product.name} width={500} height={500} className='sm:h-48'/>
                                <XCircleIcon
                                    className='absolute w-8 h-8 top-2 right-2 text-gray-400 hidden group-hover:block cursor-pointer'
                                    onClick={() => handleProductRemove(product.id)}
                                />
                                <button onClick={() => handleAddToCart(product)} className='absolute bottom-11 w-full p-1 text-gray-200 hover:text-white bg-cyan-400 hover:bg-cyan-300 hidden group-hover:block'>Add to Cart</button>
                                <p className='text-sm font-medium text-gray-800 my-2'>{product.name}</p>
                                <p className='text-xs font-semibold'>Rs {product.price}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}


