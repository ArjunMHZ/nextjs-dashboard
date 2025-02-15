import { fetchCategories, fetchCategoryByName, fetchProductByName } from "@/app/lib/data";
import Breadcrumbs from "@/components/ui/invoices/breadcrumbs";
import EditProduct from "@/components/ui/products/edit-product";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
    const id = params.id;
    const [product, categories] = await Promise.all([
        fetchProductByName(id),
        fetchCategories()
    ]);

    if (!product) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Products', href: '/dashboard/products' },
                    {
                        label: 'Create Product',
                        href: `/dashboard/products/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <EditProduct product={product} categories={categories} />
        </main>
    );
}

export default Page;