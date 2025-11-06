import getAuthorById from "@/app/lib/getAuthorById";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function UserProfile() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const author_id = data.user.id;
  const author = await getAuthorById(author_id);

  if (author instanceof Error) return new Error("Unauthorized user");

  return (
    <div className="flex items-center justify-center px-4 w-full">
      <div className="w-3/4  rounded-2xl shadow-lg bg-white p-12 space-y-6 mt-20">
        <div className="flex flex-col items-center">
          <div >
             {author.avatar_url && (
                <img
                    src={author.avatar_url? author.avatar_url: "/genericavatar.svg"}
                    alt="Author Avatar"
                    className="w-32 h-32 object-cover rounded-full border-2 border-blue-900"
                />
            )}
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">
            {author.username}
          </h2>
          <p className="text-sm text-gray-500">Email: {data.user.email?.toLocaleLowerCase()}</p>
          <p className="text-sm text-gray-500">Role: {author.role?.toUpperCase()}</p>
          <Link href="/admin/userprofile/editprofile" className="text-sm text-[#ff6b35] hover:underline">Edit Profile</Link>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Bio</h3>
          <div
  className="text-gray-600 prose prose-blue max-w-none "
  dangerouslySetInnerHTML={{
    __html: author.bio || "<p>No bio available.</p>",
  }}
/>
        </div>
      </div>
      
    </div>
  );
}
