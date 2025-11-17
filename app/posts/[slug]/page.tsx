import type { Post } from '@/app/types/posts';
import { createClient } from '@/utils/supabase/server';
import getPosts from "@/app/lib/getposts";
import fetchCategories from '@/app/lib/fetchCategories';
import { Category } from '@/app/types/category';
import { getAuthorById } from '@/services/authorservices';
import type { Profile } from '@/app/types/profiles';
import Link from 'next/link';
import { Breadcrumb } from '@/app/component/breadCrumb';
import AboutAuthorCard from '@/app/component/aboutAuthorCard';
import fetchTags from '@/app/lib/fetchTags';
import type { Metadata } from "next";
import Script from "next/script";
import Image from 'next/image';


// ----------------------------------------------------------
// ✅ Dynamic Metadata (SEO)
// ----------------------------------------------------------
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } =  params;
    const posts = await getPosts() as Post[];
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found | YourSiteName",
      description: "This post could not be found.",
    };
  }

  return {
    title: `${post.title} | YourSiteName`,
    description: post.excerpt?.replace(/<[^>]*>?/gm, "").slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt?.replace(/<[^>]*>?/gm, ""),
      type: "article",
      url: `https://yoursite.com/posts/${post.slug}`,
      publishedTime: post.created_at,
      authors: [`https://yoursite.com/authors/${post.author_id}`],
      images: [
        {
          url: post.featured_image_url as string,
          alt: post.featured_image_alt || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt?.replace(/<[^>]*>?/gm, ""),
      images: [post.featured_image_url as string],
    },
    alternates: {
      canonical: `https://yoursite.com/posts/${post.slug}`,
    },
  };
}

// ----------------------------------------------------------
// ✅ Page Component
// ----------------------------------------------------------


export default async function PostPage({params}: any): Promise <React.JSX.Element> {
    const supabase = await createClient();
    const {slug} = await params;
    const posts: Post[] | Error = await getPosts();
    if (posts instanceof Error) {
        return <div>Error: {posts.message}</div>;
    }
    const post = posts.find(p => p.slug === (slug));
    if (!post) {
        return <div>Post not found</div>;
    }

    const postCategory = await fetchCategories(post.category_id)as Category | Error;
    if (postCategory instanceof Error) {
        postCategory.name = "Uncategorized";
    }
    let postAuthor = {username: " ", slug: " ", id: " "} as Profile;
    const author : Profile | Error= await getAuthorById(post.author_id as string); 
    if (author instanceof Error) {
        postAuthor.username = "Unknown Author";
    } else {
        postAuthor = author;
    }

    
// extract tags for the current post
const tagList = await fetchTags() as Category[] ;



    const { data , error} = await supabase.from('post_tags').select('*')
    .eq('post_id', post.id);
if (error) {
    console.error('Error fetching post tags:', error);
    return <div>Error loading tags</div>;
}



  const postTagIds = data.map(postTag => postTag.tag_id);
  const postTags = tagList.filter(tag => postTagIds.includes(tag.id));

    //console.log(postTags);



    


    return (<article className='max-w-5xl mx-auto px-10 py-10'>
       {/* ✅ Structured Data for BlogPosting */}
      <Script
        id="post-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt?.replace(/<[^>]*>?/gm, ""),
            image: post.featured_image_url,
            author: {
              "@type": "Person",
              name: postAuthor.username,
              url: `https://yoursite.com/authors/${postAuthor.slug}`,
            },
            datePublished: post.created_at,
            dateModified: post.updated_at || post.created_at,
            mainEntityOfPage: `https://yoursite.com/posts/${post.slug}`,
          }),
        }}
      />
      <header className='mb-6'>

        <p className='text-lg text-[#ff6b35] font-semibold mb-4'><Link href={`/category`}>{postCategory.name}</Link></p>

        <h1 className="text-4xl font-bold mb-4 tracking-wide">{post.title}</h1>
        <div dangerouslySetInnerHTML={{__html:post.excerpt as string}} className='tracking-wide mb-8'/>
        <Image src={post.featured_image_url as string} width={1200} height={500} alt={post.featured_image_alt as string} className="h-auto mb-4 rounded-lg shadow-md" />
       
         <div className="text-sm text-gray-600  ">
                    {new Date(post.created_at as string).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}
                </div>
                <p className='font-semibold text-[#007bff] mt-2 hover:underline'>By <Link href={`/authors/${postAuthor.slug}`}>{postAuthor.username} </Link></p>
                </header>

                <section >
                <div dangerouslySetInnerHTML={{__html:post.content}} 
                className='mt-8 p-8'/>
                </section>

                <footer className='flex  gap-1 md:gap-2 md:my-6 my-4 flex-wrap items-center'>
              <h2 className='text-xl tracking-wide font-semibold'>Tags:</h2>
              {postTags.map(tag => (
                <Link key={tag.id} href={`/tags/${tag.slug}`} className="text-sm md:text-lg font-semibold text-gray-500 hover:text-[#ff6b35] hover:underline border-r-2 border-gray-400 md-pr-2 pr-1">
                  {tag.name}
                </Link>
              ))}

                </footer>
                <section>
                <AboutAuthorCard authorId={post.author_id as string}/>
                </section>
          

        
        </article>)
}