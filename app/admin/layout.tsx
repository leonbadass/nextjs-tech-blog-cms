import React from "react";
import Link from "next/link";
import {signout} from './actions'
import { JSX } from "react";

const adminLayout = ({children,}: Readonly<{children: React.ReactNode}>): JSX.Element=>{
    return (<div className= "flex min-h-screen w-full ">
         <aside className="w-64 bg-gray-900 text-white p-4 w-1/4">
        <nav>
          <ul>
            <li><Link href="/admin">Dashboard</Link></li>
            <li><Link href="/admin/posts">Posts</Link></li>
            <li><Link href="/admin/createpost">Create New Post</Link></li>
            <li><Link href="/admin/userprofile">User Profile</Link></li>
            <li><Link href="/admin/gallery">Gallery </Link></li>
          </ul>
          <button onClick={signout}>Logout</button>
        </nav>
      </aside>
      <div className="w-full">
        {children}
      </div>
      
    </div>)

}
export default adminLayout;