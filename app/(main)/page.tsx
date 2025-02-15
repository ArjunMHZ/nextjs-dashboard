import { cursive, lusitana } from '@/components/ui/fonts';
import Carousel from '@/components/ui/homepage/carousel';
import TrendingProducts from '@/components/ui/homepage/trendingProducts';
import { trendingProducts } from '../lib/data';


export default async function Page() {
    const products = await trendingProducts();
    return (
        <div>
            <h1 className={`${cursive.className} mb-4 text-2xl md:text-3xl m-3 text-amber-600 drop-shadow-lg`}>
                Feel The Moment
            </h1>
            <div className="mt-4">
                <Carousel />
                <TrendingProducts products={products} />

            </div>
        </div>
    );
}
