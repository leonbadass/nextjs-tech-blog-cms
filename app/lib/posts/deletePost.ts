'use server'
import { revalidatePath } from "next/cache";
import { createClient  } from "@/utils/supabase/server";

export async function deletePost(postId: string) {
    const supabase = await createClient();
    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);  
    if (error) {
        console.error("Error deleting post:", error);
        throw new Error("Failed to delete post");
    }   
    // Revalidate the path to update the UI

    revalidatePath('/posts');
}