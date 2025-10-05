import fetchCategories from "../lib/fetchCategories"
import type { Category } from '../types/category';
import Link from "next/link";
import Banner from "../component/banner";
export default async function CategoryPage(): Promise<React.JSX.Element> {

    const categories = await fetchCategories() as Category[] | Error;

    if (categories instanceof Error) {
        return <div>Error: {categories.message}</div>;
    }   






    return (<div>
        <Banner innerText="Explore Category"/>
        
        <div className="flex flex-wrap w-screen gap-4 p-6 justify-center">
        {categories.map((category) => (
            <div key={category.id} className=" bg-white w-[calc(30%-0.5rem)] p-8 text-center h-100 mb-4 
            rounded-lg shadow-2xl hover:shadow-xl transition-shadow duration-300
            flex flex-col ">
                <div className="bg-gradient-to-r from-[#007bff] to-[#12283e] p-2 mb-4 rounded h-[15%] flex items-center justify-center">
                <h2 className="text-2xl font-semibold text-white">{category.name}</h2>
                </div>
<div
  className="text-lg text-gray-700 text-left mt-4 mb-4 leading-relaxed px-2"
  style={{ minHeight: "60px" }}
  dangerouslySetInnerHTML={{ __html: category.description }}
/>
                <div className="mt-auto pb-8">
               <Link href={`/category/${category.slug}`}>
  <p className="text-[#ff6b35] text-left text-xl font-semibold underline transition-all duration-200 rounded px-3 py-2 cursor-pointer hover:text-2xl hover:text-[#00ffc6] hover:bg-[#ff6b3520] focus:outline-none focus:ring-2 focus:ring-[#00ffc6]">
    Explore category
  </p>
</Link>
                </div>
            </div>
        ))}
        </div>

    </div>)
}