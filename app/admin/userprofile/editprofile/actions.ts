'use server';

import uploadImage from "@/app/lib/uploadImage";
import { createClient } from "@/utils/supabase/server";
import  {revalidatePath} from "next/cache"

export async function updateUserProfile(formData: FormData) {
  const file = formData.get("avatar") as File | null;

  // If there's a file, upload it and replace it with its URL
  if (file && file instanceof File && file.size > 0) {
    const uploadResult = await uploadImage(file);

    if (uploadResult instanceof Error) {
      return { error: uploadResult.message };
    }

    // Replace the file with the image URL in the formData
    formData.set("avatar", uploadResult.url);
  } else {
    // Remove empty file input (so it doesn't overwrite existing image)
    formData.delete("avatar");
  }

  // Send formData to your API route
 const supabase = await createClient();

 const { data: {user} } = await supabase.auth.getUser();
 
  
   
     if (!user) {
       return ('unauthorized Access 401!');
     }
  
 
   const { error } = await supabase.from('profile')
   .update({username: formData.get('username'), 
    bio: formData.get('bio'),
     avatar_url: formData.get('avatar')
    })
   .eq('id', user.id)
 
 
    
  if (error){
    console.log(error.message)
    return { error: error.message };
  }
  revalidatePath('/admin/userprofile/editprofile', 'layout')

  return 
 
 
/*
  const res = await fetch("http://localhost:3000/api/profiles", {
    method: "POST",
    body: formData,
   credentials: 'include'
  });

  if (!res.ok) {
    return { error: "Failed to update profile" };
  }

  const result = await res.json();
 return result*/
}
