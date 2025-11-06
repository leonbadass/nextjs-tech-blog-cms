import fetchCategories from "../lib/fetchCategories"
import type { Category } from '../types/category';
import fetchTags from "../lib/fetchTags"

import Link from "next/link";
export default async function Footer(): Promise<React.JSX.Element> {

    const categories = await fetchCategories() as Category[] | Error;
    if (categories instanceof Error) {
        return <div>Error: {categories.message}</div>;
    }
    const tags = await fetchTags() as Category[] | Error;
    if (tags instanceof Error) {
        return <div>Error: {tags.message}</div>;
    }





    return (
        <footer className="bg-[#1e1e1e] text-white py-4 mt-4 h-60 flex flex-col justify-between">
            <div className="flex flex-wrap  mb-6 px-6">
                <div className="w-1/3 flex flex-col justify-center">
                    <h3 className="text-xl text-[#007bff] font-bold">Coding Control</h3>
                    <p className='text-sm text-[#f5f5f5]'><em>A collaborative tech blog connecting code, data, and design.</em></p>
                </div>
                <div className="w-2/3 flex justify-evenly">
                    <div>
                        <h4 className="text-lg font-bold"> Categories</h4>
                        {categories.map((category) => (
                            <div key={category.id} className="mt-2 text-[#007bff] font-semibold">
                                <Link className="hover:underline" href={`/category/${category.slug}`}>{category.name}</Link>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h4 className="text-lg font-bold"> Tags</h4>
                        {tags.map((tag) => (
                            <div key={tag.id} className="mt-2 text-[#007bff] text-md font-semibold">
                                <Link className="hover:underline" href={`/tags/${tag.slug}`}>{tag.name}</Link>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h4 className="text-lg font-bold"> Quick Links</h4>
                        <div className="mt-2 text-[#007bff] text-md font-semibold">
                            <Link className="hover:underline" href={"/"}>Home</Link>
                        </div>
                        
                        <div className="mt-2 text-[#007bff] text-md font-semibold">
                            <Link className="hover:underline" href={"/about"}>About</Link>  
                        </div>
                        <div className="mt-2 text-[#007bff] text-md font-semibold">
                            <Link className="hover:underline" href={"/contact"}>Contact</Link>  
                        </div>
                    </div>
                </div>
            </div>
{/*   copywrite div  */}
            <div className="border-t-4 border-gray-800 text-gray-500 w-7/10 mx-auto">
                <p className="text-center  text-sm mt-2">© 2025 Coding Control. All rights reserved.</p>
            </div>

                </footer>
    )
}
