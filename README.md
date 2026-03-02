# 📝 Next.js Tech Blog CMS

A production-ready **Full-Stack Tech Blog Content Management System
(CMS)** built with **Next.js (App Router)**, **TypeScript**, and
**Supabase**.

This project demonstrates modern full-stack architecture, secure
authentication, relational database design, protected routes,
draft/publish workflows, and scalable cloud deployment.

------------------------------------------------------------------------

## 🌐 Live Application

🚀 **Deployed on Vercel**\
👉 https://your-vercel-app-url.vercel.app

------------------------------------------------------------------------

# 🎯 Portfolio Overview

This CMS was built to showcase:

-   Modern **Next.js App Router architecture**
-   Explicit **Server Components + Client Components separation**
-   **Supabase PostgreSQL** with Row Level Security (RLS)
-   Secure **Email/Password authentication**
-   Custom API abstraction layer
-   Draft & Published post workflow
-   Middleware-protected admin routes
-   Fully responsive mobile-first UI
-   SSR / SSG / ISR rendering strategies
-   Production deployment on Vercel

------------------------------------------------------------------------

# 🏗️ System Architecture

## 🗄 Database -- Supabase PostgreSQL

The application uses Supabase PostgreSQL with **Row Level Security
(RLS)** enabled.

### Key Entities:

-   Posts
-   Categories
-   Tags
-   Profiles (Authors)
-   Images
-   Authentication Users

### Relationships:

-   Posts → Author (N:1)
-   Posts → Categories (1:N)
-   Posts → Tags (M:N)

RLS ensures: - Only authenticated users can manage their content -
Protected data access policies at the database level - Secure separation
of public and private data

------------------------------------------------------------------------

## 🔐 Authentication -- Supabase Auth

-   Email & Password authentication
-   Session-based login
-   Secure token handling
-   Protected admin routes via middleware
-   Server-side session validation

------------------------------------------------------------------------

## 🖼 Supabase Storage -- Image Management

Images are:

-   Uploaded via custom Next.js API routes
-   Stored in Supabase Storage buckets
-   Linked to posts in the database
-   Retrieved using controlled public URLs

### Upload Flow:

1.  Image uploaded to `/api/upload`
2.  Stored in Supabase Storage
3.  Metadata saved to PostgreSQL
4.  Image rendered dynamically in posts

------------------------------------------------------------------------

## 🔌 Custom API Layer (Next.js Route Handlers)

All CRUD logic is abstracted into API routes inside:

    app/api/

Responsibilities:

-   Post creation, editing, deletion
-   Draft → Publish transitions
-   Category & tag management
-   Profile updates
-   Image uploads
-   Secure data fetching

This ensures the frontend does not directly access the database.

------------------------------------------------------------------------

# 📝 Content Workflow

## Draft & Published System

Posts support two states:

-   **Draft**
-   **Published**

Draft posts: - Visible only in admin dashboard - Editable until
published

Published posts: - Publicly accessible - SEO-friendly dynamic routes

------------------------------------------------------------------------

# 🧩 Rendering Strategy

The project uses a combination of:

-   **Server-Side Rendering (SSR)**
-   **Static Site Generation (SSG)**
-   **Incremental Static Regeneration (ISR)**

This improves:

-   SEO
-   Performance
-   Content freshness

------------------------------------------------------------------------

# 🛡 Middleware Protection

Next.js middleware is used to:

-   Protect admin routes
-   Redirect unauthenticated users
-   Validate sessions before rendering protected pages

------------------------------------------------------------------------

# 📱 Responsive Design

-   Mobile-first design approach
-   Fully responsive layout
-   Optimized for desktop, tablet, and mobile devices

------------------------------------------------------------------------

# 🚀 Features

## Blog Management

-   Rich text editing (Tiptap)
-   Create / Edit / Delete posts
-   Featured images
-   Draft → Publish workflow
-   Dynamic routing

## Categories & Tags

-   Taxonomy management
-   Filtering by tag/category
-   SEO-friendly URLs

## Author Profiles

-   Profile management
-   Avatar support
-   Author-specific pages

## Admin Dashboard

-   Secure access
-   Content overview
-   Image gallery
-   Profile settings

## Testing

-   Unit testing with Vitest
-   Utility & layout validation

------------------------------------------------------------------------

# 🛠 Tech Stack

-   **Framework:** Next.js (App Router)
-   **Language:** TypeScript
-   **Database:** Supabase PostgreSQL
-   **Authentication:** Supabase Auth (Email/Password)
-   **Storage:** Supabase Storage
-   **Rendering:** SSR / SSG / ISR
-   **Testing:** Vitest
-   **Deployment:** Vercel

------------------------------------------------------------------------

# 📂 Project Structure

    nextjs-tech-blog-cms/
    │
    ├── app/                  # App Router pages & API routes
    ├── components/           # UI components (Server + Client)
    ├── context/              # React context providers
    ├── hooks/                # Custom hooks
    ├── lib/                  # Supabase & helper utilities
    ├── services/             # Business logic layer
    ├── styles/               # Styling
    ├── utils/                # Utilities
    ├── public/               # Static assets
    └── tests/                # Unit tests

------------------------------------------------------------------------

# ⚙️ Local Development

``` bash
https://github.com/leonbadass/nextjs-tech-blog-cms
cd nextjs-tech-blog-cms
npm install
npm run dev
```

------------------------------------------------------------------------

# 🌍 Environment Variables

Create `.env.local`:

    NEXT_PUBLIC_SUPABASE_URL=your_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
    SUPABASE_SERVICE_ROLE_KEY=your_service_key

------------------------------------------------------------------------

# 🚀 Deployment

Deployed via **Vercel**:

1.  Push to GitHub
2.  Import repository into Vercel
3.  Configure environment variables
4.  Deploy

------------------------------------------------------------------------

# 🔮 Upcoming Improvements

-   Image optimization strategies
-   Caching layer
-   Performance profiling
-   Advanced role-based access control
-   Analytics integration

------------------------------------------------------------------------

# 💼 Why This Project Matters

This project demonstrates:

-   Secure full-stack architecture
-   Database-level security (RLS)
-   Clean API abstraction
-   Modern React architecture
-   Scalable CMS design
-   Production-ready deployment
-   Real-world authentication flow
-   Maintainable and modular structure

------------------------------------------------------------------------

Generated on: 2026-03-02
