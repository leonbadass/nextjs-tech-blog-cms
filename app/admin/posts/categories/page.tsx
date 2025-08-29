import Link from "next/link";
import { MdPostAdd } from "react-icons/md";
export default function categoriesPage(): React.JSX.Element {


    const categories = ['JavaScript', 'React', 'Next.js', 'CSS'];


  return (
    <div className="w-5/6  mx-auto my-8 py-4 px-8  text-blue-900 rounded-2xl ">
      <h1 className="text-xl font-bold text-center text-gray-900">
        Manage Categories
      </h1>
       <div >
        <Link href="/admin/posts/createcategory" className="flex items-center gap-2 text-gray-900 font-semibold hover:underline mt-6">
            <MdPostAdd className="text-xl"/>Create New Category</Link>
            </div>
              <p className="text-lg font-semibold text-center text-gray-900 mb-4">Categories</p>
        <div  className="flex flex-wrap gap-8 justify-center">
            {categories.map((category, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-xl shadow-md mb-4 w-40 h-40">
                    <p className="text-green-400">number of posts:</p>
                    <p className="text-green-400">published:</p>

                   
                    <p className="text-blue-900">{category}</p>
                    <Link href="#" className="text-sm text-blue-600 hover:underline">Edit</Link>
                    <Link href="#" className="text-sm text-red-600 hover:underline ml-4">Delete</Link>
                    </div>
            ))}
            </div>

      
    </div>
  );
}