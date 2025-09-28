// ./admin/posts 

import React from "react";
import { JSX } from "react";
import RenderPostsTable from "@/app/component/RenderPostsTable"
import getPosts from "@/app/lib/getposts";
import getAuthorById from '@/app/lib/getAuthorById';
import Link from "next/link";
import { MdCategory, MdPostAdd } from "react-icons/md";
import { FaTags } from "react-icons/fa";


export default async function Posts(): Promise<JSX.Element> {
  const data = await getPosts();
 if ( data instanceof Error) {
    return (
      <div>
        <h2>Error fetching posts</h2>
        <p>{ Error.arguments}</p>
      </div>
    );
  }

   const postsWithAuthors = await Promise.all(
      data.map(async (post) => {
        const author = await getAuthorById(post?.author_id||'');
        return {
          ...post,
          authorName: author instanceof Error ? "Unknown" : author.username,
        };
      })
    );

  return (
    <div className="w-full">
      <div className="flex justify-between border-b border-solid border-black p-4 w-full">
        <h1 className="font-bold">Manage Posts</h1>
        <p>Search box and filter </p>
      </div>
      <div className="p-4 border-b border-solid border-black"> <nav>
          <ul className="flex justify-evenly">
            <li><Link href="/admin/posts/createpost" className="flex items-center gap-2 text-gray-900 font-semibold hover:underline ">
            <MdPostAdd className="text-xl"/>Create New Post</Link></li> 
            <li><Link href="/admin/posts/categories" className="flex items-center gap-2 text-gray-900 font-semibold hover:underline ">
            <MdCategory className="text-xl"/>Manage Categories</Link></li>     
            <li><Link href="/admin/posts/tags" className="flex items-center gap-2 text-gray-900 font-semibold hover:underline ">
            <FaTags className="text-xl"/>Manage Tags</Link></li>      
          </ul>
        </nav></div>
      <RenderPostsTable posts = {postsWithAuthors}/>

    </div>
  );
}
