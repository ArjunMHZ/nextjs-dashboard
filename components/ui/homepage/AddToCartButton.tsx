
// components/AddToCartButton.tsx
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddToCartButton() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!session) {
      router.push("/login");
    } else if (session.user?.role !== "user") {
      alert("Only users can add products to the cart.");
    } else {
      // Add product to cart logic
    }
  };

  return (
    <button onClick={handleAddToCart}>Add to Cart</button>
  );
}