'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function signout( ){
    const supabase = await createClient()

    await supabase.auth.signOut()
    revalidatePath('./admin', 'layout')
    redirect('/login')

}