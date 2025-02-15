import { fetchCategories } from "@/app/lib/data";
import Breadcrumbs from "@/components/ui/invoices/breadcrumbs";
import CreateProductForm from "@/components/ui/products/createProduct-form";

const CreateProduct = async () => {
    const categories = await fetchCategories();
    return (
        <div>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Products', href: '/dashboard/products' },
                    {
                        label: 'Create Product',
                        href: '/dashboard/products/create',
                        active: true,
                    },
                ]}
            />
            <CreateProductForm categories={categories} />
        </div>
    );
}

export default CreateProduct;