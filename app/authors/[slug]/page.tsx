import Banner from "@/app/component/banner";
import fetchCategories from "@/app/lib/fetchCategories";
import getAllAuthors from "@/app/lib/getAllAuthors";
import getPosts from "@/app/lib/getposts";
import Image from "next/image";
import type { Category } from '@/app/types/category';


export default async function AuthorPage({params}: any): Promise<React.JSX.Element> {

    const {slug} = await params;

    // Fetch author details 

    const authors = await getAllAuthors();

    if (!authors || authors instanceof Error) {
        return <div>Author not found</div>;
    }
    const author = authors.find((author) => author.slug === slug);

    if (!author) {
        return <div>Author not found</div>;
    }

    const posts = await getPosts();

    if (!posts || posts instanceof Error) {
        return <div>Error fetching posts</div>;
    }
    const authorPosts = posts.filter((post) => post.author_id === author.id);
//catgory
let catgories = await fetchCategories() as Category[];
if (!catgories || catgories instanceof Error) {
    catgories = [];
}


    
    return (<div>
        <Banner innerText={`About Author`}/>
        <div className = "flex max-w-4xl mx-auto p-6 gap-10  ">
            <div >
                <h1 className="text-3xl font-bold mb-4 ">{author.username}</h1>
                <div dangerouslySetInnerHTML={{__html: author.bio}} className="text-lg tracking-wide"/>

            </div>

            <div  >
                {author.avatar_url && <Image src={author.avatar_url} alt={author.username} width={1500} height={300} className="rounded-xl" />}

            </div>
        </div>
        <div className = "max-w-3xl mx-auto p-6 gap-6 flex-col items-center">
            <h2 className="text-2xl font-semibold mb-8 ">Posts by {author.username}</h2>
            <div>
                {authorPosts.length === 0 ? (
                    <p>No posts found for this author.</p>
                ) : (
                    <div>
                        {authorPosts.map((post) => (<div key={post.id} className="border-b border-gray-300 mb-4 pb-4 flex gap-4 bg-white p-4 rounded-sm">
                            <div className=" flex-1">
                                {post.featured_image_url &&<Image  src={post.featured_image_url} alt={post.title} width={400} height={200} className="mb-2 rounded" />}
                            </div>
                            <div className=" flex flex-2 flex-col gap-0.5">
                           {catgories.map((category) => (
                            category.id === post.category_id && (
                                <div key={category.id} className="">
                                  <a href={`/category/${category.slug}`}> 
                                  <p className="text-sm  text-[#007bff] font-bold hover:underline hover:text-lg cursor-pointer">{category.name}</p></a>
                                </div>
                            )
                        ))}

                            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                            <div dangerouslySetInnerHTML={{__html: post.excerpt as string}} className="text-gray-600 text-sm" />
                            <a href={`/posts/${post.slug}`} className="text-blue-500 hover:underline">Read</a>
                            </div>
                        </div>
                        ))}
                    </div>)}

            </div>
        </div>
    </div>)
}
