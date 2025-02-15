import { fetchCategoryByName, fetchProductByName } from "@/app/lib/data";
import ProductDetail from "@/components/ui/homepage/productDetail";
import Breadcrumbs from "@/components/ui/invoices/breadcrumbs";

export default async function Page({ params }: { params: { id: string } }) {

  const id = params.id;
  const product = await fetchProductByName(id);
  const categoryLabel = await fetchCategoryByName(product.category_id);
  const productLabel = product.name;


  return (
    <>
    <div className="px-5 my-6">
    <Breadcrumbs
            breadcrumbs={[
              { label: `${categoryLabel.name}`, href: `/product-category/${categoryLabel.name}` },
              {
                label: `${productLabel}`,
                href: `/product/${product.id}`,
                active: true,
              },
            ]}
          />
    </div>

      <ProductDetail product={product} />
    </>

  )
}