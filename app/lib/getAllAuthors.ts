
import type { Profile } from '@/app/types/profiles';


export default async function getAllAuthors(): Promise <Profile[] | Error>{
let data: Profile [] = [];
  //const homepage = process.env.NEXT_PUBLIC_SITE_URL!;


    const res = await fetch(`http://localhost:3000/api/profiles`, { 
      cache: "no-store",
    }); // cache no-store for dev server 
    

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    data = await res.json();


return data;
}