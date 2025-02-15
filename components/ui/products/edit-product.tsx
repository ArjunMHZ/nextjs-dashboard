'use client';

import { CategoryField, Product } from '@/app/lib/definitions';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { z } from "zod";
import { CameraIcon, TagIcon, DocumentTextIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import Image from 'next/image';

// ✅ Define Zod Schema for validation
const FormSchema = z.object({
    name: z.string().min(1, "Product name is required."),
    price: z.coerce.number().gt(0, "Price must be greater than 0."),
    description: z.string().min(1, "Product description is required."),
    categoryId: z.string().min(1, "Category selection is required."),
    image: z.instanceof(File, { message: "Please upload a valid image file." }).optional(),
});

export default function EditProductForm({ product, categories }: { product: Product, categories: CategoryField[] }) {
    const [formData, setFormData] = useState({
        name: product.name,
        price: product.price.toString(),
        description: product.description,
        categoryId: product.category_id,
        image: null as File | null,
    });

    const [existingImage, setExistingImage] = useState(product.image_url || '');

    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const [message, setMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setFormData((prev) => ({ ...prev, image: files[0] }));
            setExistingImage(''); // Clear existing image preview when user selects a new one
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setMessage(null);

        const validation = FormSchema.safeParse(formData);
        if (!validation.success) {
            const formattedErrors: { [key: string]: string[] } = {};
            Object.entries(validation.error.format()).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    formattedErrors[key] = value;
                } else if (typeof value === "object" && value !== null && "_errors" in value) {
                    formattedErrors[key] = value._errors;
                }
            });
            setErrors(formattedErrors);
            return;
        }

        const form = new FormData();
        form.append("name", formData.name);
        form.append("price", formData.price);
        form.append("description", formData.description);
        form.append("categoryId", formData.categoryId);
        if (formData.image) {
            form.append("image", formData.image);
        }

        try {
            const response = await fetch(`/api/update-product/${product.id}`, {
                method: "PUT",
                body: form,
            });
            const result = await response.json();
            if (response.ok) {
                setMessage("Product updated successfully!");
                setErrors({});
            } else {
                setMessage(result.message || "An error occurred.");
                setErrors(result.errors || {});
            }
        } catch (error) {
            setMessage("An error occurred while updating the product.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <div className="mb-4">
                    <label htmlFor="categoryId" className="mb-2 block text-sm font-medium">Choose category</label>
                    <div className='relative'>
                        <select id="categoryId" name="categoryId" value={formData.categoryId} onChange={handleChange} className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2">
                            <option value="" disabled>Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                    {errors.categoryId && <p className="text-sm text-red-500">{errors.categoryId[0]}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">Product Name</label>
                    <div className="relative">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                    {errors.name && <p className="text-sm text-red-500">{errors.name[0]}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="mb-2 block text-sm font-medium">Product Description</label>
                    <div className="relative">
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter product description"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <DocumentTextIcon className="pointer-events-none absolute left-3 top-4 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                    {errors.description && <p className="text-sm text-red-500">{errors.description[0]}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="mb-2 block text-sm font-medium">Price</label>
                    <div className="relative">
                        <input
                            id="price"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter product price"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                    {errors.price && <p className="text-sm text-red-500">{errors.price[0]}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="image" className="mb-2 block text-sm font-medium">Product Image</label>
                        {existingImage && (
                            <Image src={`${existingImage}`} alt="Current Product" className="mb-2 object-cover" width={150} height={150}/>
                        )}
                    <div className="relative">
                        <input
                            id="image"
                            name="image"
                            type="file"
                            onChange={handleFileChange}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <CameraIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                    {errors.image && <p className="text-sm text-red-500">{errors.image[0]}</p>}
                </div>

                {message && <p className="text-sm text-red-500">{message}</p>}
            </div>

            <div className="mt-6 flex justify-end gap-4">
                <Link href="/dashboard/products" className="btn-cancel">Cancel</Link>
                <Button type="submit">Update Product</Button>
            </div>
        </form>
    );
}
