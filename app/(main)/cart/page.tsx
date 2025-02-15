'use client'

import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import CartCheckout from '@/components/ui/homepage/cartCheckout';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function Page() {

    
    const cartContext = useCart();
    if (!cartContext) {
        throw new Error("useCart must be used within a CartProvider");
    }
    const { cart, setCart } = cartContext;

    // Calculate the total subtotal
    const subtotal = cart.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2);
    const totalAmount = parseFloat(subtotal) + 10; // Example tax amount

    const handleQuantityChange = (id: string, newQuantity: number) => {
        // Ensure the quantity stays between 1 and 10
        const validQuantity = Math.max(1, Math.min(10, newQuantity));
        setCart(prevCart =>
            prevCart.map(product =>
                product.id === id ? { ...product, quantity: validQuantity } : product
            )
        );
    };

    const handleProductRemove = (id: string) => {
        setCart(prevCart => prevCart.filter(product => product.id !== id));
    };

    return (
        <div className="mt-6 flow-root">
            <h1 className='text-3xl font-medium text-gray-700 pl-4 mb-4'>Cart</h1>
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-100 p-2 md:pt-0">
                    <div className="md:hidden">
                        {cart.length == 0 ? <p className='text-center'>No products to show</p> : (
                            <>
                                {cart?.map((product) => (
                                    <div
                                        key={product.id}
                                        className="mb-2 w-full rounded-md bg-white p-4"
                                    >
                                        <div className="flex items-center justify-between border-b pb-4">
                                            <div className="mb-2 flex w-full items-center justify-between">
                                                <Link href={`/product/${product.id}`}>
                                                    <div className="flex items-center gap-3 hover:text-sky-400 cursor-pointer">
                                                        <Image
                                                            src={product.image_url}
                                                            className="rounded-full"
                                                            alt={`${product.name}'s profile picture`}
                                                            width={35}
                                                            height={35}
                                                        />
                                                        <p>{product.name}</p>
                                                    </div>
                                                </Link>
                                                <p className="text-sm text-gray-500">
                                                    Rs. {product.price}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex w-full items-center justify-between border-b py-5">
                                            <div className="flex w-1/2 flex-col">
                                                <p className="text-xs">Quantity</p>
                                                <input
                                                    className='w-16'
                                                    type="number"
                                                    value={product.quantity}
                                                    onChange={(e) => handleQuantityChange(product.id, Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                                                    min='1'
                                                    max='20'
                                                />
                                            </div>
                                            <div className="flex w-1/2 flex-col">
                                                <p className="text-xs">Sub Total</p>
                                                <p className="font-medium">{(product.price * product.quantity).toFixed(2)}</p>
                                            </div>
                                            <button onClick={() => handleProductRemove(product.id)} className="rounded-md border p-2 hover:bg-red-300">
                                                <span className="sr-only">Delete</span>
                                                <TrashIcon className="w-5 text-red-500" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}

                    </div>


                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Product
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Price
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Quantity
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Sub Total
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {cart.length === 0 ? (
                                <p className='text-center'>No product to show.</p>
                            ) : (
                                <>
                                    {cart.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                        >
                                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                                <Link href={`/product/${product.id}`}>
                                                    <div className="flex items-center gap-3 hover:text-sky-400 cursor-pointer">
                                                        <Image
                                                            src={product.image_url}
                                                            className="rounded-full"
                                                            width={28}
                                                            height={28}
                                                            alt={product.name}
                                                        />
                                                        {product.name}
                                                    </div>
                                                </Link>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-3">
                                                {product.price}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-3">
                                                <input
                                                    type="number"
                                                    value={product.quantity}
                                                    onChange={(e) => handleQuantityChange(product.id, Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                                                />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-3">
                                                {(product.price * product.quantity).toFixed(2)}
                                            </td>
                                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                                <button onClick={() => handleProductRemove(product.id)} className="rounded-md border p-2 hover:bg-red-300">
                                                    <span className="sr-only">Delete</span>
                                                    <TrashIcon className="w-5 text-red-500" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>

            <CartCheckout subTotal={subtotal} totalAmount={totalAmount} />

        </div>
    )
}