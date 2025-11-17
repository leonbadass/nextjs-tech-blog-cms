import type { Category } from '@/app/types/category';

export default async function fetchCategories(categoryId?: string): Promise<Category[] | Category | Error> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const res = await fetch(`${baseUrl}/api/categories`, { cache: 'no-store' });
    if (!res.ok) {
        return new Error('Failed to fetch categories');
    }

    if (categoryId) {
        const categories: Category[] = await res.json();
        const category = categories.find(cat => cat.id === categoryId);
        if (!category) {
            return new Error('Category not found');
        }
        return category;
    } else {
    return res.json();
    }
}