
import getAllAuthors from '../getAllAuthors';
import {describe, test, expect} from 'vitest'


describe('getAllAuthors()', () => {
  test('fetches profile of all authors', async () => {

    const author  = await getAllAuthors(); //   server component
    if (author instanceof Error) {
  throw author; // or fail the test intentionally
}


    expect(author).toBeTruthy
        expect(Array.isArray(author)).toBe(true);
        expect(author.length).toBeGreaterThan(0);
        expect(author[0]).toHaveProperty('id');
        expect(author[0]).toHaveProperty('username');

        
    
    })
    

    
  

});