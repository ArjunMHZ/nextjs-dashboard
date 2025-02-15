'use client'

import Image from "next/image";
import { useWishlist } from '@/app/context/WishlistContext';
import { useRouter } from 'next/navigation';
import { Product } from "@/app/lib/definitions";

const TrendingProducts = ({ products }: { products: Product[] }) => {
    const wishlistContext = useWishlist();

    // Ensure context is defined
    if (!wishlistContext) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    const { addToWishlist } = wishlistContext;

    const router = useRouter();

    const handleAddToWishlist = (product: Product) => {
        addToWishlist(product);
        router.push("/wishlist");
    }

    return (
        <>
            <div className='grid gap-6 grid-cols-2 lg:grid-cols-4 px-16 bg-gray-50 py-5'>
                {products.map((product) => (
                    <div className='flex flex-col relative group hover:scale-75' key={product.id}>
                        <Image src={product.image_url} width={300} height={200} alt={product.name} className="w-full h-[10rem] sm:h-[13rem] lg:w-auto" />
                        <button onClick={() => handleAddToWishlist(product)} className='absolute bottom-11 w-full p-1 text-gray-200 hover:text-white bg-gray-400 hover:bg-cyan-300 hidden group-hover:block'>Add to Wishlist</button>
                        <p className='text-sm font-medium text-gray-800 my-2'>{product.name}</p>
                        <p className='text-xs font-semibold'>Rs {product.price}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default TrendingProducts;