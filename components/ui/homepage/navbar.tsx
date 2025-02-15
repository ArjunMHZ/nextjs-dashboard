'use client'

import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartIcon, MagnifyingGlassCircleIcon, ShoppingBagIcon, UserIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { signOut } from "next-auth/react";

const links = [
    { name: 'Earrings', href: '/product-category/Earrings' },
    {
        name: 'Bracelets',
        href: '/product-category/Bracelets'
    },
    { name: 'Necklace & Chains', href: '/product-category/Necklaces' },
    { name: 'Rings', href: '/product-category/Rings' },
    { name: 'Bangles', href: '/product-category/Bangles' },
    { name: 'Pendants', href: '/product-category/Pendants' },
]


export default function Navbar({username}: {username: string | null | undefined}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const pathname = usePathname();
    const menuRef = useRef<HTMLDivElement | null>(null);
    const burgerRef = useRef<HTMLButtonElement | null>(null);
    const profileRef = useRef<HTMLDivElement | null>(null);

    // Close the menu if clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
                burgerRef.current && !burgerRef.current.contains(event.target as Node) &&  // Clicking outside the burger icon) 
                profileRef.current && !profileRef.current.contains(event.target as Node)
            ) {
                setMenuOpen(false);
                setProfileOpen(false);
            }
        }

        // Add event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

       // Handle profile dropdown toggle
       const handleProfileClick = () => {
        setProfileOpen((prev) => !prev);
    };

    // Close the menu after clicking a link
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.stopPropagation();
        setMenuOpen(false);
        setProfileOpen(false);
    };

    return (
        <div className="relative z-30 mb-24">
                <div className="bg-white flex justify-between shadow-md px-8 py-4 fixed top-0 right-0 left-0">
                    <div className="hidden md:flex gap-5">
                        {links.map((link) => {
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={clsx(
                                        "flex h-full grow items-center justify-center text-sm font-semibold decoration-sky-500 hover:border-b-orange-500 ",
                                        {
                                            'text-blue-600': pathname === link.href,
                                        },
                                    )}>
                                    <p className="block ">{link.name}</p>
                                </Link>
                            )
                        })}
                    </div>

                    <div className="flex md:hidden items-center mr-6">
                        <button onClick={() => setMenuOpen(menuOpen => !menuOpen)} ref={burgerRef}>
                            <Bars3Icon className="w-6 h-6 text-gray-800" />
                        </button>
                    </div>

                    <div className="flex gap-2 justify-center items-center">
                        <div className="relative">
                            <input type="text" name="search" id="search"
                                placeholder="Search for Product"
                                className="peer block rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <MagnifyingGlassCircleIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        <ol className="flex flex-row gap-4 items-center ">
                        <div className="relative">
                            <button
                                className="flex flex-col items-center hover:text-sky-600 cursor-pointer"
                                onClick={handleProfileClick}
                            >
                                <UserIcon className="w-4 h-4" />
                                <p className="text-xs font-medium text-gray-800 hover:text-sky-600">Profile</p>
                            </button>

                            {/* Profile Dropdown Menu */}
                            {profileOpen && (
                                <div ref={profileRef} className="absolute right-0 mt-2 w-40 bg-white border shadow-md rounded-md z-30">
                                   {username ? <div className="p-3 flex flex-col">
                                        <p className="text-sm font-medium text-gray-800">Hi!{' '}{username}</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <button
                                                onClick={() => signOut({ callbackUrl: '/' })}
                                                className="w-full text-xs text-red-500 font-medium py-1 border-t border-gray-200 hover:bg-gray-100 text-center rounded-md"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    </div> : <p className="text-sm text-yellow-600 font-medium p-3">Please!{' '}Log in</p>} 
                                </div>
                            )}
                        </div>
                        
                            <Link href='/wishlist' className="">
                                <li className="flex flex-col items-center hover:text-sky-600">
                                    <HeartIcon className="w-4 h-4" />
                                    <p className="text-xs font-medium text-gray-800 hover:text-sky-600">Wishlist</p>
                                </li>
                            </Link>
                            <Link href='/cart' className="hover:text-sky-500">
                                <li className="flex flex-col items-center hover:text-sky-600">
                                    <ShoppingBagIcon className="w-4 h-4" />
                                    <p className="text-xs font-medium text-gray-800 hover:text-sky-600">Bag</p>
                                </li>
                            </Link>
                        </ol>
                    </div>


                    {/* Dropdown Menu for Mobile */}
                    {menuOpen && (
                        <div ref={menuRef} className="absolute z-30 top-16 left-0 right-0 bg-white shadow-lg md:hidden p-4 rounded-md">
                            <div className="flex flex-col gap-4">
                                {links.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={clsx(
                                            "text-sm font-semibold text-gray-800 hover:text-blue-600 hover:border-b-2 border-blue-500"
                                        )}
                                        onClick={handleLinkClick}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
        </div>
    );
}