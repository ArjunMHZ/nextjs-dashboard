'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the type for a product
interface Product {
    id: string;
    name: string;
    price: number;
    image_url: string;
    // Add other product properties as needed
}

// Define the type for the context
interface WishlistContextType {
    wishlist: Product[];
    addToWishlist: (product: Product) => void;
    setWishlist: React.Dispatch<React.SetStateAction<Product[]>>;
}

// Create the context with a default value
const wishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Custom hook to use the wishlist context
export const useWishlist = () => useContext(wishlistContext);


// WishlistProvider component
export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Load wishlist data from localStorage (if it exists)
    const loadWishlistFromLocalStorage = () => {
        if (typeof window !== 'undefined') {
            const savedWishlist = localStorage.getItem('wishlist');
            return savedWishlist ? JSON.parse(savedWishlist) : [];
        }
        return [];
    };

    const [wishlist, setWishlist] = useState<Product[]>(loadWishlistFromLocalStorage);

    // Function to save the wishlist to localStorage whenever it changes
    const saveWishlistToLocalStorage = (wishlist: Product[]) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
    };


    const addToWishlist = (product: Product) => {
        setWishlist((prev) => {
            // Prevent adding duplicate products to the wishlist
            if (prev.find(item => item.id === product.id)) {
                return prev; // Do nothing if product already exists
            }
            return [...prev, product];
        });
    };

    // Whenever the wishlist state changes, save it to localStorage
    useEffect(() => {
        saveWishlistToLocalStorage(wishlist);
    }, [wishlist]);

    return (
        <wishlistContext.Provider value={{ wishlist, addToWishlist, setWishlist }}>
            {children}
        </wishlistContext.Provider>
    );
};


