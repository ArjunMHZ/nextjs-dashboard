'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the type for a product
interface Product {
    id: string;
    name: string;
    price: number;
    image_url: string;
    // description: string
    // Add other product properties as needed
}
interface CartProduct extends Product {
    quantity: number; // Add quantity property
}

// Define the type for the context
interface CartContextType {
    cart: CartProduct[];
    addToCart: (product: Product, quantity: number) => void;
    setCart: React.Dispatch<React.SetStateAction<CartProduct[]>>;
}

// Create the context with a default value
const cartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use the cart context
export const useCart = () => useContext(cartContext);


// CartProvider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Load cart data from localStorage (if it exists)
    const loadCartFromLocalStorage = () => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    };
    const [cart, setCart] = useState<CartProduct[]>(loadCartFromLocalStorage);

    // Function to save the cart to localStorage whenever it changes
    const saveCartToLocalStorage = (cart: CartProduct[]) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    };

    const addToCart = (product: Product, quantity: number) => {
        // const cartProduct: CartProduct = { ...product, quantity };
        // setCart((prev) => [...prev, cartProduct]);
        // Check if the product is already in the cart
        setCart((prev) => {
            const existingProduct = prev.find(item => item.id === product.id);
            if (existingProduct) {
                // Update quantity if it already exists
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            // Otherwise, add a new product
            const cartProduct: CartProduct = { ...product, quantity };
            return [...prev, cartProduct];
        });
    };

    // Whenever the cart state changes, save it to localStorage
    useEffect(() => {
        saveCartToLocalStorage(cart);
    }, [cart]);

    return (
        <cartContext.Provider value={{ cart, addToCart, setCart }}>
            {children}
        </cartContext.Provider>
    );
};


