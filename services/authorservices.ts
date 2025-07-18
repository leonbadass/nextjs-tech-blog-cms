// services/authorService.ts

import getAllAuthors from '@/app/lib/getAllAuthors';
import type { Profile } from '@/app/types/profiles';

/**
 * Fetch a single author by their ID.
 * 
 * @param id - The ID of the author to retrieve.
 * @returns A `Profile` if found, or an `Error` object if not found or fetch failed.
 */
export async function getAuthorById(id: string): Promise<Profile | Error> {
  const authorProfiles = await getAllAuthors();

  if (authorProfiles instanceof Error) {
    return new Error('Error fetching profiles');
  }

  const author = authorProfiles.find((profile: Profile) => profile.id === id);

  return author ?? new Error('Invalid author id');
}
