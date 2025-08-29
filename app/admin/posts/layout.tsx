// ./admin/posts/Layout.tsx


import React from "react";
import Link from "next/link";



const postsLayout = ({children,}: Readonly<{children: React.ReactNode}>)=>{
    return (<div>
       
        
      
        {children}
        
      
        
    </div>)

}
export default postsLayout;