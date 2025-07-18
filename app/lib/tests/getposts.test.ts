
import getPosts from '../getposts';
import {describe, test, expect} from 'vitest'

describe('getPosts', () => {
  test('fetches and returns posts', async () => {

    const posts  = await getPosts(); //   server component
    if (posts instanceof Error) {
  throw posts; // or fail the test intentionally
}


    expect(posts).toBeTruthy
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toHaveProperty('title');
    expect(posts[1]).toHaveProperty('title');
    

    })
    

    
  

});