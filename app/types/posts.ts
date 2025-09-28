// types/post.ts
import type { Category } from "./category";
export type Post = {
  id?: string,
  title: string;
  slug: string;
  content: string;
  excerpt?: string;

  featured_image_url?: string;
  featured_image_alt?: string;

  category_id?: string;
  author_id?: string;
  tags?: string[];

  // SEO fields
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  focus_keywords?: string[];

  // Open Graph
  og_title?: string;
  og_description?: string;
  og_image_url?: string;

  // Twitter Card
  twitter_title?: string;
  twitter_description?: string;
  twitter_image_url?: string;

  language?: string;
  status?: "draft" | "scheduled" | "published" | "archived";

  published_at?: string; // ISO string (timestamptz)
  updated_at?: string;
  created_at?: string;
};
