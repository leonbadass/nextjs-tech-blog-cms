'use client'
import{JSX, useState} from "react";
import { deletePost } from "../lib/posts/deletePost";

export default  function DeletePostButton({postId}:{postId:string | undefined}): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    


    return(<div>
        {/* delete warning modal */ 
        isOpen && <div className="fixed inset-0  bg-gray-900/90 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-lg font-semibold mb-4">Delete Post</h2>
                <p className="mb-4">Are you sure you want to delete this post? This action cannot be undone.</p>
                <div className="flex justify-end space-x-4">
                    <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={() => setIsOpen(false)}>Cancel</button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick= {()=> deletePost(postId as string) }
                    >Delete</button>
                </div>
            </div>
        </div>
        }
        <button
        type="button"
        onClick={()=>setIsOpen(true)}
        className="text-sm text-red-600 hover:underline"
      >
        Delete
      </button>



    </div>)
}