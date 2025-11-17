import { JSX } from "react";
import getAuthorById from "../lib/getAuthorById";
import type { Profile } from "../types/profiles";
import Image from "next/image";
import Link from "next/link";

interface AboutAuthorCardProps {
    authorId: string;
}


export default async function AboutAuthorCard({authorId}: AboutAuthorCardProps): Promise<JSX.Element> {

    const author: Profile | Error = await getAuthorById(authorId);
    if (author instanceof Error) {

    return (<div>
        <p>Error: {author.message}</p>
    </div>)

    }



    return (<div className="border-y-2 border-[#ff6b35] py-10">
        <h2 className="text-xl font-bold mb-6 tracking-wider">About the Author</h2>
        <div className="flex flex-col md:flex-row gap-6">
        <div className="hidden md:block">
           {author.avatar_url &&<Image src={author.avatar_url as string}
             alt={author.username} width={1000} height={100} className=""/>}

        </div>      
          {/* author avatra for mobile*/}
         <div className="md:hidden">
           {author.avatar_url &&<Image src={author.avatar_url as string}
             alt={author.username} width={300} height={100} className=""/>}

        </div>
        <div>
            <h3 className="text-lg font-semibold tracking-wide">About {author.username}</h3>
            <div dangerouslySetInnerHTML={{__html:author.bio}} className="md:text-lg pb-2"/>
            <Link href={`/authors/${author.slug}`}
            className="font-semibold text-sm md:text-lg text-[#007bff] tracking-wide hover:underline hover:text-[#ff6b35] "
            
            ><p >
                View all posts by {author.username}
            </p>
            </Link>


            </div>
            </div>

        </div>
    )
};