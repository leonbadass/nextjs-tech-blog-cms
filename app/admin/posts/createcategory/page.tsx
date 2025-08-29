'use client'
import React from 'react';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import { slugify } from '@/app/lib/slugify';


export default function CreateCategoryPage(): React.JSX.Element {
    const [categoryName, setCategoryName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [categorySlug, setCategorySlug] = React.useState('');
    const [slugEdited, setSlugEdited] = React.useState(false);
    const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState<string | null>(null)

    React.useEffect(() => {
  if (!slugEdited) {
    setCategorySlug(slugify(categoryName))
  }
}, [categoryName, slugEdited])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const res = await fetch("http://localhost:3000/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryName, categorySlug, description }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong")
        return
      }

      setSuccess(`Category "${data.message.name}" created successfully!`)
      setCategoryName("")
      setCategorySlug("")
      setDescription("")
    } catch (err) {
      console.error("Submit failed:", err)
      setError("Failed to create category")
    } finally {
      setLoading(false)
    }
  }






  return (
    <div className="w-5/6  mx-auto my-8 py-4 px-8  text-gray-900 rounded-2xl ">
  <h1 className="text-xl font-bold text-center text-gray-900 mb-6">
    Create a New Category
  </h1>

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
        />
      </label>
      <label htmlFor="categorySlug" className="block text-sm font-medium mb-2">
        Category Slug:
        <input
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
        <SimpleEditor content={description}
          name="description"
           />
        </div>
       
      </label>
    </div>

    {/* Submit Button */}
    <div className="text-center">
      <button
        type="submit"
        className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
      >
      {loading ? "Creating..." : "Create Category"}
      </button>
    </div>
  </form>
</div>
  );
}
