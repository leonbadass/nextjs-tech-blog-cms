import type { Post } from "../types/posts"
import Image from "next/image"
import fetchCategories from "../lib/fetchCategories";
import type { Category } from '../types/category';
import Link from "next/link";

interface PostcardProps {
    post: Post;
}
export default async function Postcard({post}: PostcardProps): Promise<React.JSX.Element> {

    const categories = await fetchCategories() as Category[] | Error;
    if (categories instanceof Error) {
        return <div>Error: {categories.message}</div>;
    }



    return (
        <div className="flex flex-col bg-[#f5f5f5] w-100 rounded-xl shadow-2xl hover:shadow-xl transition-shadow duration-300 rounded-lg h-140">
            <div>

            <Image
    src={post.featured_image_url || '/default-image.jpg'}
    alt={post.featured_image_alt as string}
    width={100 }
    height={50}
    className=" w-full"
/>
            </div>
            <div className="px-4 py-2 flex gap-4 h-10">
                {categories.map((category) => (
                    category.id === post.category_id && (
                        <div key={category.id} className="bg-[#007bff] p-2 rounded-2xl  flex items-center justify-center">
                          <Link href={`/category/${category.slug}`}> <p className="text-sm  text-white font-bold hover:underline hover:text-lg">{category.name}</p>
                        
                        </Link></div>
                    )
                ))}
                <div className="text-lg text-[#1e1e1e] font-semibold ">
                    {new Date(post.created_at as string).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}
                </div>

            </div>

            <div className="px-4">
                <h2 className="text-lg font-bold ">{post.title}</h2>

            </div>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt as string }} className="px-4 py-2 text-gray-700 text-left leading-relaxed" />
            <div className="px-4 py-2 mb-4">
                <a href={`/posts/${post.slug}`} className="text-[#007bff] text-left text-lg font-semibold underline transition-all duration-200 rounded px-3 py-2 cursor-pointer hover:text-xl   focus:outline-none focus:ring-2 focus:ring-[#00ffc6]">Read More.. </a>
            </div>
        </div>
    )
}