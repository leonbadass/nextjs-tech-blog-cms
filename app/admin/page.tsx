
import React from "react";
import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation";
//import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'




export default async function admin (): Promise<React.JSX.Element>{
 const supabase = await createClient( );
  const { data, error} = await supabase.auth.getUser();

 if (error || !data?.user) {
    redirect('/login')
  }
  
    return (
      <div className="w-full  h-[100vh] overflow-auto bg-red-200">
        <h1>This the Admin page: Logged in as: {data.user.email }</h1>
        <h1>{data.user.id}</h1>
        <div className="h-[100vh]  mx-10 mt-10 bg-white rounded-lg shadow-lg p-4">
          
  
        </div>
         
    
        
        
        </div>
    )

}
