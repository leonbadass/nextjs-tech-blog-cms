"use client"
import { Profile } from "@/app/types/profiles";
import { createContext, useContext } from "react"

type ProfileContextType = Profile | null


const ProfileContext = createContext<ProfileContextType>(null)

type ProfileProviderProps = {
  profile: Profile | null ; 
    children: React.ReactNode;
}

export function ProfileProvider({ profile, children }: ProfileProviderProps): React.JSX.Element {
  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  return useContext(ProfileContext)
}
