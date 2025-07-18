
import getAuthorById from '../getAuthorById';
import {describe, test, expect} from 'vitest'





describe('getAuthorById', () => {
  test('fetches profile of given author_id', async () => {

    const author  = await getAuthorById('1'); 
    if (author instanceof Error) {
  throw author; // or fail the test intentionally
}

    expect(author).toBeTruthy
    expect(typeof author).toBe('object');
    expect(author).toHaveProperty('id');
    expect(author).toHaveProperty('username');
    expect(author.username).toBe('Author');
    
   
     
    
    })
    

    
  

});