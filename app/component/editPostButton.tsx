'use client';
import React from "react";
import EditPostModal from "./editPostModal";
import { Post } from "../types/posts"


interface EditPostButtonProps {
  post: Post;
  
}

export default function EditPostButton({post}: EditPostButtonProps): React.JSX.Element {
    const [isOpen, setIsOpen] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    
    
    
    
    return (
    <div>
      <button
      type="button"
        onClick={()=>setIsOpen(true)}
        disabled={isOpen}
        className="text-sm text-gray-900 hover:underline"
      >
        {isOpen? "Editing..." : "Edit"}
      </button>
      {error && <p className="text-red-500 text-sm ">{error}</p>}
        {isOpen && <EditPostModal post={post} onClose={() => setIsOpen(false)} />}
    </div>
  );
}