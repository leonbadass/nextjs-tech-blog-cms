import Banner from "../component/banner"
import Postcard from "../component/postcard";
import getPosts from "../lib/getposts"
import Image from "next/image"

export default async function BlogPosts(): Promise<React.JSX.Element> {

    const posts = await getPosts();
    if (posts instanceof Error) {
        return <div>Error: {posts.message}</div>;
    }


    return(
        <div>
        <Banner innerText="Articles"/>
        <div className="flex flex-wrap w-screen gap-4 p-6 ">
        {posts.map((post) => ( 
            <Postcard key={post.id} post={post} />
        ))}
        </div>

        </div>
    )

}