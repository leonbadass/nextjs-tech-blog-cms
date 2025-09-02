import { Category } from "@/app/types/category";
import Link from "next/link";
import { MdPostAdd } from "react-icons/md";
import DeleteCategories from "@/app/component/deleteCategories";
import EditCategoryButton from "@/app/component/editCategoryButton";


export default async function categoriesPage():Promise< React.JSX.Element > {

  // Fetch categories from your database or API
  const tags :Category[] = await fetch('http://localhost:3000/api/tags')
  .then(res => res.json());





  return (
    <div className="w-5/6  mx-auto my-8 py-4 px-8  text-gray-900 rounded-2xl ">
      

       <div >
        <Link href="/admin/posts/createtag" className="flex items-center gap-2 text-gray-900 font-semibold hover:underline mt-6">
            <MdPostAdd className="text-2xl"/>Create New Tag</Link>
            </div>
              <p className="text-lg font-semibold text-center text-gray-900 mb-4">Tags</p>
        <div  className="flex flex-wrap gap-8 justify-center w-100vw">
            {tags.map((tag) => (
                <div key={tag.id} className="bg-gray-100 p-4 rounded-xl shadow-md mb-4 flex-1 max-h-50 flex
               flex-col min-w-1/3"> <div className="mb-3" >
                    <p className="text-gray-900 font-bold mb-1">{tag.name}</p>
                   <div className=" flex gap-4">
                    
                  <EditCategoryButton tab='tags' category ={tag}  />
                    <DeleteCategories  name='tags' categoryId={tag.id}  />
                   </div>
                    </div>
                    <div  >
                      <p className="text-lg font-bold">Description</p>
                      <div
                    className="text-gray-600 prose prose-blue max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: tag.description.length > 70
                      ? `${tag.description.slice(0, 70)}...`
                      : tag.description
                       || "<p>No bio available.</p>",
                    }}
/>
                      </div>
                    
                    </div>
            ))}
            </div>

      
    </div>
  );
}