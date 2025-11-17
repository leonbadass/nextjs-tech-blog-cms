import React from 'react'
import type { Post } from "../types/posts";
import EditPostButton from './editPostButton';
import DeletePostButton from './deletePostButton';


type Props ={
    posts: (Post & { authorName: string })[];
}


export default function RenderPostsTable ({posts} : Props) : React.JSX.Element {



  



    return (<div className="m-5">

         <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-200 divide-y divide-gray-200 text-sm">
      <thead className="bg-gray-100 text-left text-gray-700 uppercase text-xs">
        <tr>
          
          <th className ="px-4 py-3">Title</th>
          <th className ="px-4 py-3">Author</th>
          <th className ="px-4 py-3">Category</th>
        
          <th className ="px-4 py-3">Published</th>
          <th className ="px-4 py-3">Actions</th>
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-100">
        
       {posts.map( (post) => (
         <tr key={post.id}>
          <td className="px-4 py-3 font-medium">{post.title}</td>
          <td className="px-4 py-3 font-medium">{post.authorName}</td>
          <td className="px-4 py-3 font-medium">{post.category_id}</td>
          <td className="px-4 py-3 font-medium">
            {post.status}
          </td>
           <td> <div className='flex gap-1'>
            <EditPostButton post={post}/>
            <DeletePostButton postId={post.id}/>
            </div></td>
            </tr>
       ))}
        
        

      </tbody>
    </table>
  </div>
    </div>)

}