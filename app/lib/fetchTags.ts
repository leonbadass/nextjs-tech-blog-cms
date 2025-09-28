'use server'
import type { Category } from '@/app/types/category';

export default async function fetchTags(tagId?: string): Promise<Category[] | Category | Error> {
    const res = await fetch('http://localhost:3000/api/tags', { cache: 'no-store' });
    if (!res.ok) {
        return new Error('Failed to fetch categories');
    }

    if (tagId) {
        const tags: Category[] = await res.json();
        const tag = tags.find(cat => cat.id === tagId);
        if (!tag) {
            return new Error('Category not found');
        }
        return tag;
    } else {
    return res.json();
    }
}