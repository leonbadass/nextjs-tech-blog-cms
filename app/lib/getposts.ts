import { Post } from "@/app/types/posts";

export default async function getPosts (): Promise <Post[] | Error>{
let data: Post[] = [];
  //const homepage = process.env.NEXT_PUBLIC_SITE_URL!;


    const res = await fetch(`http://localhost:3000/api/posts`, { 
      cache: "no-store",
    }); // cache no-store for dev server 

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    data = await res.json();
  

return data;
}