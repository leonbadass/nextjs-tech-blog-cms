'use client'
import React from 'react';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import { slugify } from '@/app/lib/slugify';
import { useProfile } from "@/context/ProfileContext"
import { Category } from '@/app/types/category';
import { useRouter } from 'next/navigation';


interface EditCategoryModalProps {
  category: Category;
  onClose: () => void;
}


export default function EditCategoryModal({category , onClose}: EditCategoryModalProps): React.JSX.Element {
const router = useRouter();
  const [categoryName, setCategoryName] = React.useState(category.name );
  const [description, setDescription] = React.useState(category.description);
  const [categorySlug, setCategorySlug] = React.useState(category.slug);
  const [slugEdited, setSlugEdited] = React.useState(false);
  const [updating, setUpdating] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState<string | null>(null)
  const profile = useProfile();
  const userRole = profile?.role ; // default to 'user' if profile or role is undefined
  const categoryId = category.id;

  

React.useEffect(() => {
  if (!slugEdited) {
    setCategorySlug(slugify(categoryName))
  }
}, [categoryName, slugEdited])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    setError(null)
    setSuccess(null)

    try {
      const res = await fetch("http://localhost:3000/api/categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryId, categoryName, categorySlug, description }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong")
        return
      }

      setSuccess(`Category "${data.message.name}" updated successfully!`)
      
    } catch (err) {
      console.error("Submit failed:", err)
      setError("Failed to update category")
    } finally {
      setUpdating(false)
      onClose()
      alert('Category updated successfully')
      router.refresh();
      
    }
  }






  return (
     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[90vw] max-h-[90vh] overflow-y-auto p-6 relative">
    <div className="w-5/6  mx-auto my-8 py-4 px-8  text-gray-900 rounded-2xl ">
  <h1 className="text-xl font-bold text-center text-gray-900 mb-6">
    Edit {category.name} Category
  </h1>

  {userRole !== 'admin' && (<p className="text-red-600 text-center mb-4">You do not have permission to create categories.</p>)}

  <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
     {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}
    {/* Category Name Section */}
    <div className="bg-gray-100 p-6 rounded-xl shadow-md">
      
    <label htmlFor="categoryName" className="block text-sm font-medium mb-2">
        Category Name:
        <input
          type="text"
          id="categoryName"
          name="categoryName"
          value={categoryName}
          onChange={e => setCategoryName(e.target.value)}
          className="mt-1 max-h-4 block w-full text-sm rounded-lg p-3 bg-white  focus:outline-none focus:ring-2 focus:ring-blue-900"
          required 
          disabled = {userRole !== 'admin'}
        />
      </label>
      <label htmlFor="categorySlug" className="block text-sm font-medium mb-2">
        Category Slug:
        <input
  disabled = {userRole !== 'admin'}
  type="text"
  id="categorySlug"
  name="categorySlug"
  value={categorySlug}
  onChange={e => {
    setCategorySlug(e.target.value)
    setSlugEdited(true) // mark that user has overridden it
  }}
  className="mt-1 max-h-4 block w-full text-sm rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
  required
/>
      </label>

      <label htmlFor="description" className="block text-sm font-medium mb-2">
        Description:
        <div className="mt-1 block w-full text-sm rounded-lg p-3 bg-white  focus:outline-none focus:ring-2 focus:ring-blue-900 border border-gray-300">
        <SimpleEditor content= {description}
          name="description"
          onChange={(html) =>{setDescription(html)}}
           />
        </div>
       
      </label>
    </div>

    {/* Submit Button */}
    <div className="text-center">
      <button
       disabled = {userRole !== 'admin' || updating }
        type="submit"
        className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
      >
      {updating ? "Updating..." : "Update Category"}
      </button>
    </div>
  </form>
  <button onClick={onClose} className="absolute top-4 right-4 text-red-600 hover:underline">
    Close
</button>
</div>
</div>

</div>

  );
}
