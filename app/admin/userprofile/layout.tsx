// ./admin/posts/Layout.tsx


import React from "react";



const userprofileLayout = ({children,}: Readonly<{children: React.ReactNode}>)=>{
    return (<div className="w-vw min-h-screen flex justify-center items-start p-6 ">
        
      
        {children}
        
      
        
    </div>)

}
export default userprofileLayout;