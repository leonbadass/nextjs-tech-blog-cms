'use client';
import ImageSelectorModal from "./ImageSelectorModal";
import { JSX, useState } from "react";
import type { Image } from "@/app/types/image";

interface AuthorAvatarProps {
    avatarUrl: string;
    setAvatarUrl: (url: string) => void;
}

export default function AuthorAvatar({ avatarUrl, setAvatarUrl}: AuthorAvatarProps): JSX.Element {
    const [isModalOpen, setIsModalOpen] = useState(false);
    

    return (
        <div className="flex flex-col gap-2 cursor-pointer">
            <div className="flex gap-4 w-full justify-between">
            <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="text-[#ff6b35] text-xl hover:underline cursor-pointer"
                
                >{avatarUrl? "Update Avatar": "Select an Avatar"}</button>
            {avatarUrl && (
                <img
                    src={avatarUrl}
                    alt="Author Avatar"
                    className="w-32 h-32 object-cover rounded-full border-2 border-blue-900"
                />
            )}</div>
            {isModalOpen && (
                <ImageSelectorModal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSelect={(image: Image) => {
                        setAvatarUrl(image.url);
                        
                    }}
                />
            )}
                </div>
    );
}
