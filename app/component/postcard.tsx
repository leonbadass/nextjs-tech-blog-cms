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
        <div className="flex flex-col bg-[#f5f5f5] w-80 rounded-b-xl rounded-t-xl shadow-2xl hover:shadow-xl transition-shadow duration-300 h-110">
            <div className="h-3/5">

            <Image
    src={post.featured_image_url || '/default-image.jpg'}
    alt={post.featured_image_alt as string}
    width={320}
    height={50}
    
/>
            </div>
            <div className="px-4 flex gap-4 h-5">
                {categories.map((category) => (
                    category.id === post.category_id && (
                        <div key={category.id} className="bg-[#007bff] p-2 rounded-2xl  flex items-center justify-center">
                          <Link href={`/category/${category.slug}`}> 
                          <p className="text-sm  text-white  hover:underline hover:text-lg">{category.name}</p>
                        
                        </Link></div>
                    )
                ))}
                <div className="text-sm text-[#1e1e1e] ">
                    {new Date(post.created_at as string).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}
                </div>

            </div>

            <div className="px-4 py-2">
                <h2 className="font-bold text-xl">{post.title}</h2>

            </div>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt as string }} className="px-4 text-gray-700 text-left  text-sm leading-relaxed" />
            <div className="mb-6">
                <a href={`/posts/${post.slug}`} className="text-[#007bff] text-left text-sm  underline transition-all duration-200 rounded px-3 py-2 cursor-pointer hover:text-lg  ">Read More.. </a>
            </div>
        </div>
    )
}