import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import getAuthorById from "@/app/lib/getAuthorById";
import AuthorForm from "@/app/component/authorForm";

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

      <AuthorForm author={author} />
    </div>
  );
}
