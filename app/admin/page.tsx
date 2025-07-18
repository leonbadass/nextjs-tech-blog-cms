import React from "react";
import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation";

export default async function admin (): Promise<React.JSX.Element>{
 const supabase = await createClient( );
  const { data, error} = await supabase.auth.getUser();

 if (error || !data?.user) {
    redirect('/login')
  }
  
    return (
        <div className="w-full">
        <h1>This the Admin page: Logged in as: {data.user.email }</h1>
        <h1>{data.user.id}</h1>
        
        </div>
    )

}
