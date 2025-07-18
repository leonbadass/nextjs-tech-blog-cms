// vitest.setup.ts
import '@testing-library/jest-dom';
// app/admin/posts.tsx
import {beforeAll , afterAll , afterEach} from 'vitest'
import { cleanup } from '@testing-library/react';
import {rest } from 'msw';
import {setupServer} from 'msw/node';


const  posts = [{id: 1, title: 'POST TITLE'},{id:1 ,title: 'Post2 Title'}]
const author = [{id:'1' , username:'Author'}]
export const restHandlers = [
    
    rest.get('http://localhost:3000/api/posts', (req,res, ctx)=>{
    return res(ctx.json(posts))
}),


    rest.get('http://localhost:3000/api/profiles', (req,res, ctx)=>{
    return res(ctx.json(author))
})
]


const server = setupServer(...restHandlers);

beforeAll(() => server.listen({onUnhandledRequest: 'error'}))

afterAll(()=> server.close())

afterEach(()=>{
    server.resetHandlers();
    cleanup()
})