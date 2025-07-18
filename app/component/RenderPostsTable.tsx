import React from 'react'
import type { Post } from "../types/posts";
import { JSX } from "react";

type Props ={
    posts: (Post & { authorName: string })[];
}


export default function RenderPostsTable ({posts} : Props) : JSX.Element {



  



    return (<div className="m-5">

         <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-200 divide-y divide-gray-200 text-sm">
      <thead className="bg-gray-100 text-left text-gray-700 uppercase text-xs">
        <tr>
          <th className ="px-4 py-3">Id</th>
          <th className ="px-4 py-3">Title</th>
          <th className ="px-4 py-3">Author</th>

          <th className ="px-4 py-3">Published</th>
          <th className ="px-4 py-3">Actions</th>
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-100">
        
       {posts.map( (post) => (
         <tr key={post.id}>
          <td className="px-4 py-3 font-medium">{post.id}</td>
          <td className="px-4 py-3 font-medium">{post.title}</td>
          <td className="px-4 py-3 font-medium">{post.authorName}</td>
          <td className="px-4 py-3 font-medium">
            {post.published? 'Published': 'Not Published'}
          </td>
           <td> <button className="text-blue-600 hover:underline ">Edit</button>
            <button className="text-red-600 hover:underline ml-4">Delete</button></td>
            </tr>
       ))}
        
        

      </tbody>
    </table>
  </div>
    </div>)

}