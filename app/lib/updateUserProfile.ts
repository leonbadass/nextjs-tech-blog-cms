'use server'
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { Profile } from "@/app/types/profiles";


export default async function updateUserProfile (authorData: Profile): Promise<{success: boolean; message: string;}> {
    const supabase = await createClient();
    // function to handle form submission
    try{
  const  { error }  = await supabase.from('profile')
    .update({username: authorData.username, bio: authorData.bio, avatar_url: authorData.avatar_url})
    .eq('id', authorData.id)
  
   if (error){
      
      return { success: false, message: error.message };
    }
    revalidatePath('/admin/userprofile/editprofile', 'layout')
  
        return { success: true, message: "Profile updated successfully." };
  
}catch (error) {
         return {success: false, message: "Unexpected error occurred."};
    }
  }