export type Profile = {
    slug: string,
    id: string,
    created_at: string,
    bio: string,
    avatar_url: string | null,
    username: string,
    role : 'admin' | 'editor'

}