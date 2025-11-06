import Banner from "@/app/component/banner";
import fetchTags from "@/app/lib/fetchTags";
import type { Category } from '@/app/types/category';
import getPosts from "@/app/lib/getposts";
import type { Post } from '@/app/types/posts';
import Postcard from "@/app/component/postcard";

export default async function CategoryPage({params}: any): Promise<React.JSX.Element> {
    const {slug} = await params;
    const tags = await fetchTags() as Category[] | Error;
    if (   tags instanceof Error) {
        return <div>Error fetching tags</div>;
    }

    const tag = tags.find(t => t.slug === slug);
    if (!tag) {
        return <div>Category not found</div>;
    }
 const allPosts = await getPosts() as Post[] | Error;
 if (allPosts instanceof Error) {
     return <div>Error: {allPosts.message}</div>;
 }
    //const tagPosts: Post[] = allPosts.filter(post => post.category_id === category.id);




   


    return (<div>
        <Banner innerText= {tag.name}/>
        <div>
            <div dangerouslySetInnerHTML={{ __html: tag.description }} className="max-w-4xl mx-auto text-xl font-semibold leading-relaxed p-4 mb-5 mt-5"/>
                
            <div>
                <h2 className="text-xl font-bold text-center mt-4 mb-2">Posts in {tag.name} Tag</h2>
                {/*categoryPosts.length === 0 ? (
                    <p className="text-center text-xl mt-8">No posts available in this category.</p>
                ) : (categoryPosts.map((post) => (
                    <div key= {post.id} className=" mx-auto mb-6 flex gap-4 px-8">
                        <Postcard post={post} />
                    </div>
                )))*/}
            </div>
        </div>
        
    </div>)
}