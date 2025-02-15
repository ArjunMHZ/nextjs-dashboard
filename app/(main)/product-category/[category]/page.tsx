import { fetchProducts } from "@/app/lib/data";
import ProductsByCategories from "@/components/ui/homepage/cate-product";


export default async function Page({params}: {params: {category: string} }){
    const productCategory = params.category;
    const products = await fetchProducts(productCategory);

    return(
        <>
        <h1 className="text-3xl font-medium text-slate-600 m-5">{productCategory}</h1>
        <ProductsByCategories products={products}/>
        </>
    )
}