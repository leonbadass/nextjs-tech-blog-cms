// ./admin/posts 

import React from "react";
import { JSX } from "react";
import RenderPostsTable from "@/app/component/RenderPostsTable"
import getPosts from "@/app/lib/getposts";
import getAuthorById from '@/app/lib/getAuthorById';

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
        const author = await getAuthorById(post.author_id);
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
      <RenderPostsTable posts = {postsWithAuthors}/>

    </div>
  );
}
