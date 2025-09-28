'use client'
import React from 'react';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import type {Image} from '@/app/types/image';
import PostFeaturedImage from '@/app/component/PostFeaturedImage';
import { useProfile } from "@/context/ProfileContext"
import { Category } from '@/app/types/category';
import { slugify } from '@/app/lib/slugify';
import { useRouter } from 'next/navigation';
import { CreatePostData } from '@/app/lib/posts/createPost';
import { updatePost } from '../lib/posts/updatepost';
import { Post } from '../types/posts';

interface CreatePostFormProps {
  categories: Category[];
  tagList: Category[]
  post: Post
  postTags: string[]
  postfeaturedImage : Image| undefined
}


export default  function EditPostForm({categories, tagList,post,postTags, postfeaturedImage}: CreatePostFormProps): React.JSX.Element {
const profile = useProfile();
const userRole = profile?.role ; // default to 'user' if profile or role is undefined
const router = useRouter();

//form state for all post data
    const [metaTitle, setMetaTitle] = React.useState(post.meta_title);
    const [metaDescription, setMetaDescription] = React.useState(post.meta_description);
    const [title, setTitle] = React.useState(post.title);
    const [slug, setSlug] = React.useState(post.slug);
    const [ogTitle, setOgTitle] = React.useState(post.og_title);
    const [ogDescription, setOgDescription] = React.useState(post.og_description);
    const [category, setCategory] = React.useState(post.category_id);
    const [tags, setTags] = React.useState<string[]>([]);
    const [excerpt, setExcerpt] = React.useState(post.excerpt);
    const [canonicalUrl, setCanonicalUrl] = React.useState(post.canonical_url);
    const [focusKeywords, setFocusKeywords] = React.useState<string[]>(post.focus_keywords|| []);
    const [content, setContent] = React.useState(post.content)
    const [focusKeywordsComma, setFocusKeywordsComma] = React.useState([focusKeywords.join(', ')]);
    const [updatedPost, setUpdatedPost] = React.useState('')
    const [selectedImage, setSelectedImage] = React.useState<Image| undefined>(postfeaturedImage|| undefined)
    const [featuredImageAlt, setFeaturedImageAlt] = React.useState(post.featured_image_alt)
    

//categories and tags state
   
    



//set featured image url when selected


//slug and canonical Url
const baseUrl = "https://domain.com/blog/";

React.useEffect(() => {
  // auto-generate slug and canonicalUrl whenever title changes
  const newSlug = slugify(title);
  setSlug(newSlug);
  setCanonicalUrl(`${baseUrl}${newSlug}`);
}, [title]);


//set tags

React.useEffect(() => {
  setTags(prev => {
    const sortedTagDuplicate: string[] = [];

    for (let postTag of postTags) {  // ✅ use for...of to get values
      if (!prev.includes(postTag)) { // ✅ check against previous state
        sortedTagDuplicate.push(postTag);
      }
    }

    return [...prev, ...sortedTagDuplicate];
  });

  setSelectedImage(postfeaturedImage);
}, [postTags, postfeaturedImage]); // ✅ include postfeaturedImage if it changes





 const postId = post.id

//Handle create post
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  
  const postData: CreatePostData ={
    id:  postId,
    title: title,
    slug: slug,
    canonical_url: canonicalUrl,
    excerpt: excerpt,
    category_id: category,
    tags: tags,
    meta_title: metaTitle,
    meta_description: metaDescription,
    focus_keywords: focusKeywords,
    og_title: ogTitle,
    og_description: ogDescription,
    featured_image_url: selectedImage? selectedImage.url: ' ',
    featured_image_alt: featuredImageAlt,
    content: content
  }
  const { success, post, error} = await updatePost(postData);

  if(post && success){

    setUpdatedPost(post.title)
    alert(`Sucess: ${post.title} updated !!`)
    router.push('/admin/posts')
  }else{
    console.log(error)
  }
  
}

console.log("Tags:",tags)

// If the user is not an admin or editor, show a message and return early

if (userRole !== 'admin' && userRole !== 'editor') {  
  return (
    <div className="w-5/6  mx-auto my-8 py-4 px-8  text-blue-900 rounded-2xl ">
      <h1 className="text-xl font-bold text-center text-blue-900 mb-6">
        Create a New Post
      </h1>
      <p className="text-red-600 text-center">You do not have permission to create posts.</p>
    </div>
  )
}


  return (
    <div className="w-full  mx-auto  text-gray-900 ">
  <h1 className="text-lg font-bold text-center text-gray-900 mb-2">
    New Post
  </h1>

  {updatedPost && <p className='text-green-700'>{updatedPost} was updated successful</p>}

  <form  className="flex flex-col gap-2" 
  method='POST'
  onSubmit={handleSubmit}>
    {/* Meta Data Section */}
    <div className="bg-gray-200 m-2 rounded-sm  p-2 flex">
      {/*<p className="text-lg font-semibold text-center text-blue-900 mb-4">Meta Data</p>*/}

      <div className='p-2 w-1/2 '>
        

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

      <label htmlFor="canonicalUrl" className="block text-sm font-medium mb-2">
        Canonical URL:
        <input
          type="text"
          id="canonicalUrl"
          name="canonicalUrl"
          value={canonicalUrl}
          onChange={e => setCanonicalUrl(e.target.value)}
          className="mt-1 block max-h-4 w-full rounded-lg p-3 bg-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-900"
        />
      </label>

      <label className="block text-sm font-medium mb-2">
        Excerpt (max 160 chars):
        <textarea
          value={excerpt}
          maxLength={160}
          onChange={e => setExcerpt(e.target.value)}
          className="mt-1 block w-full rounded-lg p-3 bg-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-900"
          required
        />
      </label>


      <div>
        {/* Categories */}
      <div className="mt-4">
        <p className="text-sm font-semibold mb-2">Category:</p>
        <div className="flex flex-wrap gap-4">
          {categories.map(cat => (
            <label
              key={cat.id}
              className="flex items-center space-x-2 cursor-pointer text-sm"
            >
              <input
                type="radio"
                name="category"
                value={cat.id}
                checked={category === cat.id}
                onChange={e => setCategory(e.target.value)}
                className="text-blue-600 focus:ring-blue-900"
              />
              <span>{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

            {/* Tags */}
      <div className="mt-4">
        <p className="text-sm font-semibold mb-2">Select Tags:</p>
        <div className="flex flex-wrap gap-4">
          {tagList.map(tag => (
            <label
              key={tag.id}
              className="flex items-center space-x-2 cursor-pointer text-sm"
            >
              
              <input
                type="checkbox"
                name="tags"
    
                checked={tags.includes(tag.id)}
                value={tag.id}
                onChange={e =>
                  setTags(prev => {
                    if (e.target.checked) {
                      return [...prev, tag.id];
                    } else {
                      return prev.filter(t => t !== tag.id);
                    }
                  })
                }
                className="text-blue-600 focus:ring-blue-900"
              />
              <span>{tag.name}</span>
            </label>
          ))}
        </div>
      </div>
     


      </div>
      </div>{/*this div ends div1 for title, slug, category, tags, featured image */}
    
      <div className='p-2 bg-gray-200 w-1/2 rounded-lg '>
      <div>{/* SEO Fields */ }

          
       <label className="block text-sm font-medium mb-2">
        Meta Title:
        <input
          value={metaTitle}
          maxLength={160}
          onChange={e => setMetaTitle(e.target.value)}
         className="mt-1 block max-h-4 w-full rounded-lg p-3 bg-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-900"
        required
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
        Focus keywords(max 5, comma separated):
        <textarea
          value={focusKeywordsComma}
          maxLength={160}
          onChange={e => {
            setFocusKeywordsComma(e.target.value)
  const keywords = e.target.value
    .split(',')
    .map(k => k.trim())
    .filter(k => k.length > 0); // remove empties

  setFocusKeywords(keywords);
}}

          className="mt-1 block w-full rounded-lg p-3 bg-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-900"
          required
        />
      </label>
      </div>

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

      


      
        </div>


    </div>
    {/* Featured Image Section */}
    <div className='p-2'>
        <PostFeaturedImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          featuredImageAlt = {featuredImageAlt}
          setFeaturedImageAlt ={setFeaturedImageAlt}
          />
         
        </div>

    {/* Content Editor */}
    <div className='bg-gray-200 p-2 mx-2 rounded-sm'>
    <div className="bg-white p-6 rounded-xl shadow-md">
    
      <SimpleEditor content={content} name="content"
      onChange={(html)=>{setContent(html)}}
      />
    </div>
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className=
      "max-w-1/5 p-2 m-2 text-sm text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition duration-200"
    >
      Update Post
    </button>
  </form>
</div>

  )
  }