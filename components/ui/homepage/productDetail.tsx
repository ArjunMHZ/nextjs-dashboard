'use client'

import { HeartIcon } from "@heroicons/react/24/outline"
import { useCart } from "@/app/context/CartContext";
import { Product } from "@/app/lib/definitions";
import Link from "next/link";
import ActionButton from "./actionButton";
import { useState } from "react";
import { useWishlist } from "@/app/context/WishlistContext";
import Image from "next/image";

export default function ProductDetail({ product }: { product: Product }) {
    const [value, setValue] = useState(1);

    const cartContext = useCart();

    // Ensure context is defined
    if (!cartContext) {
        throw new Error("useCart must be used within a CartProvider");
    }
    const { addToCart } = cartContext;

    const handleAddToCart = () => {
        addToCart(product, value);
    }


    const wishlistContext = useWishlist();
    // Ensure context is defined
    if (!wishlistContext) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }

    const { addToWishlist } = wishlistContext;

    const handleAddToWishlist = () => {
        addToWishlist(product);
    }

    return (
        <div className="grid md:grid-cols-2 px-5 gap-4 my-8">
            <Image src={product.image_url} alt={product.name} width={1000} height={1000} className="md:h-3/4"/>
            <div className="py-6">
                <h1 className="text-2xl">{product.name}</h1>
                <p className="my-4 text-gray-900">NPR {product.price}</p>
                <hr className="w-full h-[2px] mx-auto my-4 bg-gray-300 border-0 rounded dark:bg-gray-700" />
                <div className="flex flex-col my-8 gap-3">
                    {product.description}

                    <div className="flex gap-5">
                        <ActionButton value={value} setValue={setValue} />
                        <Link href={'/cart'}>
                            <button onClick={handleAddToCart} className="bg-red-800 text-white px-4 py-2 font-light hover:bg-red-700">Add to cart</button>
                        </Link>
                    </div>
                </div>
                <button onClick={handleAddToWishlist} className="flex items-center text-gray-700 hover:text-cyan-600 my-8 w-36">
                    <Link href={'/wishlist'} className="flex items-center"><HeartIcon className="w-4 h-4 mr-2" />Add to wishlist</Link>
                </button>

            </div>
        </div>
    )

}

