import App from "next/app"
import CreatePostForm from "@/app/component/createPostForm"
import fetchTags from '@/app/lib/fetchTags';
import fetchCategories from '@/app/lib/fetchCategories';
import { Category } from "@/app/types/category";


export default async function CreatePostPage():Promise <React.JSX.Element>{

  const categories = await fetchCategories() as Category[];
  const tagList  = await fetchTags() as Category[];

  return(
    <>
    <CreatePostForm categories={categories} tagList={tagList}/>

    </>
  )
}