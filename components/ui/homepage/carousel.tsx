import Image from "next/image"
import { lusitana } from '@/components/ui/fonts';

export default function Carousel(){
    return(
        <div className='flex flex-col items-center my-4'>
        <Image
            src="/shop-cover.png"
            width={1000} 
            height={400}
            className='md:block w-full relative hidden'
            alt='Kriar Shop board'
        />
        <Image
            src="/shop-cover.png"
            width={1000} 
            height={400}
            className='block w-full relative h-[15rem] md:hidden'
            alt='Kriar Shop board'
        />
        <div className='relative flex flex-col justify-center items-center p-7 text-sm rounded-md bg-slate-100 md:w-[80%] border border-slate-300 md:mt-[-25px]'>
            <p className={`${lusitana.className} text-2xl font-medium `}>Our Speciality</p>
            <p className={`${lusitana.className} md:text-3xl text-xl font-semibold mt-2`}>Finest Gems, Diamond & Silver Jwellery</p>
            <p className='text-gray-700 mt-3'>Established in 2010, Kriar & Co Jewellers has become the benchmark for quality and designs of jewellery in Nepal. We guarantee all our 
                <span> products to be of the top most purity and the finest craftsmanship. Visit our store to explore our exquisite Diamond, Gold and Silver collections</span>
            </p>
        </div>
    </div>
    )
}