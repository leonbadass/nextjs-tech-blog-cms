import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import getAuthorById from "@/app/lib/getAuthorById";
import { updateUserProfile } from "./actions";

export default async function EditProfile() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const author_id = data.user.id;
  const author = await getAuthorById(author_id);

  if (author instanceof Error) {
    return <p>Unauthorized user</p>;
  }

  return (
    <div className="w-full min-h-100 flex flex-col items-center justify-center gap-20">
      <div className="flex  w-full justify-between p-4 ">
        <h4><span className="font-xl font-semibold  tracking-wider leading-snug text-blue-900" >Email: {data.user.email} </span></h4>
        <h4><span className="font-xl font-semibold  tracking-wider leading-snug text-blue-900" >Role: {author.role.toLocaleUpperCase()}</span></h4>
      </div>

      <form action={updateUserProfile} className="flex flex-col gap-5 min-w-120">
        <label htmlFor="username" className="font-xl font-semibold  tracking-wider leading-snug" >
         <span className="text-blue-900">Username</span>
          <input
            name="username"
            id="username"
            type="text"
            required
            defaultValue={author.username}
            className ="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label htmlFor="bio">
         <span className="font-xl font-semibold  tracking-wider leading-snug text-blue-900" >Bio </span>
          <textarea
            name="bio"
            id="bio"
            required
            defaultValue={author.bio}
            className= "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-50"
          />
        </label>

       <label htmlFor="avatar" className="flex flex-col gap-2 cursor-pointer">
  <span className="text-xl font-semibold tracking-wide text-blue-900">
    Upload Avatar
  </span>

  <input
    name="avatar"
    id="avatar"
    type="file"
    className="block w-full text-sm text-gray-700
               file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700
               hover:file:bg-blue-100
               focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</label>
        <button
          className="bg-blue-900 text-white py-2 rounded hover:bg-blue-700 transition w-20"
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
}
