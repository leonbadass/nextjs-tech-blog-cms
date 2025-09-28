'use Client'
import React from "react"
import fetchCategories from "../lib/fetchCategories"
import fetchTags from "../lib/fetchTags"
import { Category } from "../types/category"
import { Post } from "../types/posts"
import fetchPostTags from "../lib/posts/fetchPostTags"
import { Image } from "../types/image"
import EditPostForm  from "./editPostForm"
import fetchImageUsingUrl from "../lib/fetchImageUsingUrl"

interface EditPostModalProp {
    post: Post
    onClose: ()=> void
}

export default function EditPostModal ({post, onClose}: EditPostModalProp): React.JSX.Element{
const [categories, setCategories] = React.useState<Category[]>([])
const [tagList, setTagList] = React.useState<Category[]>([])
const [postTags, setPostTags] = React.useState<string []>([])
const [postFeaturedImage, setPostFeaturedImage] = React.useState<Image>()


React.useEffect(() => {
    async function loadData() {
      try {
        const categories = (await fetchCategories()) as Category[]
        const tagList = (await fetchTags()) as Category[]
        const postTags = await fetchPostTags(post.id || "")
        if(!post.featured_image_url|| post.featured_image_url === undefined) return;
        const postFeaturedImage = (await fetchImageUsingUrl(
          post.featured_image_url))
        
          console.log("post tags:", postTags )
        setCategories(categories)
        setTagList(tagList)
        setPostTags(postTags)
        setPostFeaturedImage(postFeaturedImage)
      } catch (err) {
        console.error("Error loading post data:", err)
      }
    }

    loadData()
  }, [post.id, post.featured_image_url])






    return(<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-[90vw] max-h-[90vh] overflow-y-auto p-6 relative">
    <div className="w-5/6  mx-auto my-8 py-4 px-8  text-gray-900 rounded-2xl ">
  <p className="text-xl font-bold text-center text-gray-900 mb-6">
    Edititing: {post.title} 
  </p>

    <EditPostForm categories={categories}
    tagList = {tagList}
    post = {post}
    postTags = {postTags}
    postfeaturedImage={postFeaturedImage}
    />
      <button onClick={onClose} className="absolute top-4 right-4 text-red-600 hover:underline">
    Close
</button>
</div>    
</div>
    </div>)
}