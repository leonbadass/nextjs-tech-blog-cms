import React from 'react';
import { JSX } from "react";
import Link from "next/link";
import Postcard from './component/postcard';
import getPosts from './lib/getposts';


export default async function Home(): Promise<JSX.Element> {
    const posts = await getPosts();
    if (posts instanceof Error) {
        return <div>Error: {posts.message}</div>;
    }

 return(
    <div className='w-full'>
       <div className="h-150 w-full px-16 bg-gradient-to-r from-[#0362c4] via-[#0a417a] to-[#12283e] text-[#fefefe] flex flex-col justify-center ">
                       <h1 className="text-3xl md:text-4xl font-extrabold   py-8 tracking-tight drop-shadow-lg">
            Code. Circuits. <span className='font-bold text-[#00ffc6]'>Creativity.</span>
               </h1>
               <p className='text-lg'><em>Discover full-stack development, IoT projects, 
                AI experiments, and engineering insights at <strong>Coding Ctrl</strong><br></br> — 
                a collaborative tech blog connecting code, data, and design.</em></p>
                <div className='h-12 w-48 bg-[#ff6b35] text-white text-center rounded-lg mt-6 flex items-center justify-center
                hover:bg-[#ff6b3520] hover:text-[#ff6b35] hover:border-2 hover:border-[#ff6b35] cursor-pointer
                transition-all duration-200'>
                    <Link href={"/posts"}>Explore Articles</Link>
                </div>
               
               </div>
               <div className='bg-white text-[#1e1e1e] flex flex-wrap justify-center gap-4 px-6 pt-8 mb-8 pb-8'>
                <h2 className='w-full text-3xl font-bold text-center mb-8'>Latest Articles</h2>
                {posts.map((post) => (<div key={post.id}>
                <Postcard post={post} />

                </div>))}
                
        
               </div>
    </div>
 )
}