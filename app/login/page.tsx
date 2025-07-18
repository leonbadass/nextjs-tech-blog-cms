import React from 'react';
import { login } from './actions'
//<-<button formAction={signup}>Sign up</button>->

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
    <form className="flex flex-col gap-6 p-6 border border-gray-300 bg-white shadow-md rounded w-80">
      <p className="text-center text-gray-700" >You must be a valid user to login</p>
      <label className="flex flex-col text-sm text-gray-700" htmlFor="email">Email:
      <input id="email" name="email" type="email" required className="mt-1 px-3 py-2 border rounded border-gray-300" />
      </label>
      <label className="flex flex-col text-sm text-gray-700" htmlFor="password">Password:
      <input id="password" name="password" type="password" required className="mt-1 px-3 py-2 border rounded border-gray-300"/>
      </label>
      <button  className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" type='submit' formAction= {login}>Log in</button>
     
    </form>
    </div>
  )
}