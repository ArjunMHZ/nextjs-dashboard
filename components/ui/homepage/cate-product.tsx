'use client'

import { ProductsCategoryList } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductsByCategories({ products }: { products: ProductsCategoryList[] }) {
    const router = useRouter();

    const selectProduct = (id: string) => {
        router.push(`/product/${encodeURIComponent(id)}`);
        // <Link href={`/frontend/product/${encodeURIComponent(id)}`}/>
    }


    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 px-4 m-5">
            {products.map((product) => (
                <div className="flex flex-col cursor-pointer" key={product.id} onClick={() => selectProduct(product.id)}>
                    <Image src={product.image_url} alt={product.name} width={500} height={500} className="sm:h-44" />
                    <p className='text-sm font-medium text-gray-800 my-2'>{product.name}</p>
                    <p className='text-xs font-semibold'>Rs {product.price}</p>
                </div>
            ))}
        </div>
    )
}