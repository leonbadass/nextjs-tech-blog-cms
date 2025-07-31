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
      <div className="w-2/4  rounded-2xl shadow-lg bg-white p-6 space-y-6 mt-20">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xl">
            {author.username[0]?.toUpperCase()}
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">
            {author.username}
          </h2>
          <p className="text-sm text-gray-500">{data.user.email?.toLocaleLowerCase()}</p>
          <p className="text-sm text-gray-500">{author.role?.toUpperCase()}</p>
          <Link href="/admin/userprofile/editprofile" className="text-sm text-gray-500">Edit Profile</Link>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Bio</h3>
          <p className="text-gray-600">{author.bio || "No bio available."}</p>
        </div>
      </div>
      
    </div>
  );
}
