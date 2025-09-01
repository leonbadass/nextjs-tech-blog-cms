'use client';
import React from "react";
import EditCategoriesModal from "./editCategoriesModal";
import { Category } from "../types/category";


interface EditCategoryButtonProps {
  category: Category;
}

export default function EditCategoryButton({category}: EditCategoryButtonProps): React.JSX.Element {
    const [isOpen, setIsOpen] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    
    
    
    
    return (
    <div>
      <button
        onClick={()=>setIsOpen(true)}
        disabled={isOpen}
        className="text-sm text-gray-900 hover:underline"
      >
        {isOpen? "Editing..." : "Edit"}
      </button>
      {error && <p className="text-red-500 text-sm ">{error}</p>}
        {isOpen && <EditCategoriesModal category={category} onClose={() => setIsOpen(false)} />}
    </div>
  );
}