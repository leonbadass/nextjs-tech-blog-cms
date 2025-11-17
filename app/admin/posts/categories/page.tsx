import { Category } from "@/app/types/category";
import Link from "next/link";
import { MdPostAdd } from "react-icons/md";
import DeleteCategories from "@/app/component/deleteCategories";
import EditCategoryButton from "@/app/component/editCategoryButton";
import fetchCategories from "@/app/lib/fetchCategories";

export default async function categoriesPage():Promise< React.JSX.Element > {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;



  
  // Fetch categories from your database or API
  const categories :Category[] = await fetch(`${baseUrl}/api/categories`)
  .then(res => res.json());
//delete category from db
 const fetchedCategory = async (categoryId: string): Promise<Category> => {
  const category = await fetchCategories(categoryId);
  return category as Category;
};


  return (
    <div className="w-5/6  mx-auto my-8 py-4 px-8  text-gray-900 rounded-2xl ">
      

       <div >
        <Link href="/admin/posts/createcategory" className="flex items-center gap-2 text-gray-900 font-semibold hover:underline mt-6">
            <MdPostAdd className="text-2xl"/>Create New Category</Link>
            </div>
              <p className="text-lg font-semibold text-center text-gray-900 mb-4">Categories</p>
        <div  className="flex flex-wrap gap-8 justify-center w-100vw">
            {categories.map((category) => (
                <div key={category.id} className="bg-gray-100 p-4 rounded-xl shadow-md mb-4 flex-1 max-h-50 flex
               flex-col min-w-1/3"> <div className="mb-3" >
                    <p className="text-gray-900 font-bold mb-1">{category.name}</p>
                   <div className=" flex gap-4">
                    
                  <EditCategoryButton category ={category}  />
                    <DeleteCategories categoryId={category.id}  />
                   </div>
                    </div>
                    <div  >
                      <p className="text-lg font-bold">Description</p>
                      <div
                    className="text-gray-600 prose prose-blue max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: category.description.length > 70
                      ? `${category.description.slice(0, 70)}...`
                      : category.description
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