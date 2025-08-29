import React from "react";
import Link from "next/link";
import {signout} from './actions'
import { JSX } from "react";
import { createClient } from '@/utils/supabase/server';
import getAuthorById from "../lib/getAuthorById";
import type { Profile } from "../types/profiles";
import { ProfileProvider } from "@/context/ProfileContext"


export default async function AdminLayout ({children,}: Readonly<{children: React.ReactNode}>):Promise<JSX.Element> {

   const supabase = await createClient( );
    const { data, error} = await supabase.auth.getUser();
    let Profile: Profile | null = null;

    if (error || !data?.user) {
        throw new Error('User not authenticated');
      }
      const userProfile: Profile | Error = await getAuthorById(data.user.id);
      if (userProfile instanceof Error) {
       Profile = null;
      } else {
        Profile = userProfile;
        }

    return (<div className= "flex min-h-screen w-full ">
         <aside className="w-64 bg-gray-900 text-white p-4 w-1/4">
        <nav>
          <ul>
            <li><Link href="/admin">Dashboard</Link></li>
            <li><Link href="/admin/posts">Posts</Link></li>
            <li><Link href="/admin/userprofile">User Profile</Link></li>
            <li><Link href="/admin/gallery">Gallery </Link></li>
          </ul>
          <button onClick={signout}>Logout</button>
        </nav>
      </aside>
      <div className="w-full">
        <ProfileProvider profile={Profile} >
        {children}
        </ProfileProvider>
      </div>
      
    </div>)

};
