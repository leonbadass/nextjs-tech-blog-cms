'use client'
import React from 'react';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import type {Image} from '@/app/types/image';
import PostFeaturedImage from '@/app/component/PostFeaturedImage';

export default function CreatePostPage(): React.JSX.Element {
    const [metaDescription, setMetaDescription] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [slug, setSlug] = React.useState('slug');
    const [ogTitle, setOgTitle] = React.useState('');
    const [ogDescription, setOgDescription] = React.useState('');
    const [category, setCategory] = React.useState('blog');
    const [tags, setTags] = React.useState<string[]>([]);
    const [selectedImage, setSelectedImage] = React.useState<Image | null>(null);

const categories = ['JavaScript', 'React', 'Next.js', 'CSS'];
const tagsList = ['Frontend', 'Backend', 'SEO', 'UI/UX', 'Tailwind', 'DevOps'];


  return (
    <div className="w-5/6  mx-auto my-8 py-4 px-8  text-blue-900 rounded-2xl ">
  <h1 className="text-xl font-bold text-center text-blue-900 mb-6">
    Create a New Post
  </h1>

  <form className="flex flex-col gap-6">
    {/* Meta Data Section */}
    <div className="bg-gray-100 p-6 rounded-xl shadow-md">
      <p className="text-lg font-semibold text-center text-blue-900 mb-4">Meta Data</p>

      <label htmlFor="title" className="block text-sm font-medium mb-2">
        Title (Max 60 chars):
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          maxLength={60}
          className="mt-1 max-h-4 block w-full text-sm rounded-lg p-3 bg-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-900"
          required 
        />
      </label>

      <label htmlFor="slug" className="block text-sm font-medium mb-2">
        Slug:
        <input
          type="text"
          id="slug"
          name="slug"
          value={slug}
          onChange={e => setSlug(e.target.value)}
          className="mt-1 block max-h-4 w-full rounded-lg p-3 bg-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-900"
        />
      </label>

      <label className="block text-sm font-medium mb-2">
        Meta Description (max 160 chars):
        <textarea
          value={metaDescription}
          maxLength={160}
          onChange={e => setMetaDescription(e.target.value)}
          className="mt-1 block w-full rounded-lg p-3 bg-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-900"
          required
        />
      </label>

      <label className="block text-sm font-medium mb-2">
        OG Title (optional):
        <input
          type="text"
          value={ogTitle}
          onChange={e => setOgTitle(e.target.value)}
          className="mt-1 block max-h-4 w-full rounded-lg p-3 bg-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-900"
        />
      </label>

      <label className="block text-sm font-medium mb-2">
        OG Description (optional):
        <textarea
          value={ogDescription}
          onChange={e => setOgDescription(e.target.value)}
          className="mt-1 block w-full rounded-lg p-3 bg-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-900"
        />
      </label>

      {/* Categories */}
      <div className="mt-4">
        <p className="text-sm font-semibold mb-2">Category:</p>
        <div className="flex flex-wrap gap-4">
          {categories.map(cat => (
            <label
              key={cat}
              className="flex items-center space-x-2 cursor-pointer text-sm"
            >
              <input
                type="radio"
                name="category"
                value={cat}
                checked={category === cat}
                onChange={e => setCategory(e.target.value)}
                className="text-blue-600 focus:ring-blue-900"
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4">
        <p className="text-sm font-semibold mb-2">Select Tags:</p>
        <div className="flex flex-wrap gap-4">
          {tagsList.map(tag => (
            <label
              key={tag}
              className="flex items-center space-x-2 cursor-pointer text-sm"
            >
              <input
                type="checkbox"
                name="tags"
                value={tag}
                onChange={e =>
                  setTags(prev => {
                    if (e.target.checked) {
                      return [...prev, tag];
                    } else {
                      return prev.filter(t => t !== tag);
                    }
                  })
                }
                className="text-blue-600 focus:ring-blue-900"
              />
              <span>{tag}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <PostFeaturedImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}/>
        </div>


    </div>

    {/* Content Editor */}
    <div className="bg-white p-6 rounded-xl shadow-md">
    
      <SimpleEditor content="Create a new post" name="content" />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full py-3 mt-4 text-lg font-semibold text-white bg-blue-900 rounded-xl shadow-md hover:bg-blue-800 transition duration-200"
    >
      Submit
    </button>
  </form>
</div>

  )
  }