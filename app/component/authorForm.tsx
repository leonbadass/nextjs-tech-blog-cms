'use client';
import {JSX, useState} from "react";
import { Profile } from "../types/profiles";
import AuthorAvatar from "./authorAvatar";
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import { slugify } from "../lib/slugify";
import updateUserProfile from "../lib/updateUserProfile";


interface AuthorFormProps {
author: Profile;

}

export default function AuthorForm({author}: AuthorFormProps): JSX.Element {
    const [username, setUsername] = useState(author.username || '');
    const [bio, setBio] = useState(author.bio || '');
    const [avatarUrl, setAvatarUrl] = useState(author.avatar_url || '');
   

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const authorData: Profile = {
            id: author.id,
            username: username,
            bio: bio,
            avatar_url: avatarUrl,
            slug: author.slug? author.slug : slugify(username), 
            role: author.role,
            created_at: author.created_at,
        }
        updateUserProfile(authorData);       
};

    return (
        <form  className="flex flex-col gap-5 min-w-120"
            onSubmit={handleSubmit}
>
            <label htmlFor="username" className="font-xl font-semibold  tracking-wider leading-snug">
                <span className="text-blue-900">Username</span>
                <input
                    name="username"
                    id="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </label>
           
             <label htmlFor="bio">
                     <span className="font-xl font-semibold  tracking-wider leading-snug text-blue-900" >Bio </span>
                     
                      <SimpleEditor content={author.bio} name= "bio" onChange={(html)=>{setBio(html)}}/>
                </label>

            <AuthorAvatar setAvatarUrl = {setAvatarUrl} avatarUrl={avatarUrl} />
            <button
                className="bg-blue-900 text-white py-2 rounded hover:bg-blue-700 transition "
                type="submit"   
                onClick={handleSubmit}
            >
                Update Profile
            </button>
        </form>
    );
}
