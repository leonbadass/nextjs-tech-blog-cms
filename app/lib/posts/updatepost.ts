// lib/createPost.ts

'use server'
import { createClient } from "@/utils/supabase/server";
import type { Post } from "@/app/types/posts";
import {sanitizePost} from "@/app/lib/sanitize";
//import { redirect } from "next/navigation";

// postData.tags is an array of tag IDs
export type UpdatePostData = Partial<Post> & { tags?: string[] };

export async function updatePost(postData: UpdatePostData) {
  try {
  
    const supabase = await createClient()

/*    async function getAuthorId (){
    const { data , error} = await supabase.auth.getUser();
    
     if (error || !data?.user) {
        redirect('/login')
      }
      return data.user.id
    } */

    const sanitizedPost = postData.content? sanitizePost(postData.content) : '';

    //const authorId = await getAuthorId();

    // 1️⃣ Insert the main post
    const { data: post , error: postError } = await supabase
      .from("posts")
      .update([{
        
        title: postData.title,
        slug: postData.slug,
        content: sanitizedPost,
        excerpt: postData.excerpt || null,
        featured_image_url: postData.featured_image_url || null,
        featured_image_alt: postData.featured_image_alt || null,
        category_id: postData.category_id || null,
        meta_title: postData.meta_title || null,
        meta_description: postData.meta_description || null,
        canonical_url: postData.canonical_url || null,
        focus_keywords: postData.focus_keywords || [],
        og_title: postData.og_title || null,
        og_description: postData.og_description || null,
      
        
        updated_at: new Date(),

        language:  "en",
        status:  postData.status,
     published_at: postData.published_at,

      }]).eq('id',postData.id)
      
      .select()
      .single();
      

    if (postError || !post) {
      console.error("Error inserting post:", postError);
      return { success: false, error: postError };
    }

    // 2️⃣ Insert tags into post_tags join table (if any)
    if (postData.tags && postData.tags.length > 0) {
      const postTags = postData.tags.map(tagId => ({
        post_id: post.id,
        tag_id: tagId,
      }));

      const { error: tagError } = await supabase
        .from("post_tags")
        .upsert(postTags, { onConflict: "post_id,tag_id", ignoreDuplicates: true }).eq('post_id',post.id)

      if (tagError) {
        console.error("Error updating linked tags:", tagError);
        return { success: false, error: tagError };
      }
    }

    return { success: true, post };
  } catch (err) {
    console.error("Unexpected error updating post:", err);
    return { success: false, error: err };
  }
}
