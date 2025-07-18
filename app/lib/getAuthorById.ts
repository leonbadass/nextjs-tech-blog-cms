import getAllAuthors from './getAllAuthors';
import type { Profile } from '../types/profiles';



export default async function getAuthorById(author_id: string): Promise <Profile | Error> {
    const author_Profiles  = await getAllAuthors();

   
 

    if(author_Profiles instanceof Error ){
        return new Error('Error fetching profiles');
    }

   const author = author_Profiles.find((profile: Profile ) => profile.id === author_id)

   

  return author ? author: new Error('Invalid author id')
}