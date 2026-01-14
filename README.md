# Bank Sumsel Babel - Product Catalog

![Logo](/public/logo.png)

A modern web portal for showcasing and managing Bank Sumsel Babel's banking products and services. Built with Next.js, TypeScript, and Supabase, this application provides a comprehensive content management system (CMS) for administrators and an intuitive browsing experience for customers.

## Features

### Public-Facing Features

- **Homepage**
  - Hero section with search functionality
  - Collapsible product and service listings
  - Categorized display of banking products and services

- **Product Catalog**
  - Browse products by category
  - Detailed product pages with comprehensive information
  - Tabbed content sections: Product Overview, Key Features, Benefits, Risks, Requirements, Costs, and Additional Information
  - YouTube video integration for product demonstrations
  - Image gallery with lightbox viewer
  - Related products recommendations

- **Search & Filter**

  - Real-time product search
  - Category-based filtering
  - Search across product titles and descriptions

- **Responsive Design**
  - Mobile-first approach
  - Optimized for all screen sizes
  - Touch-friendly interface

### Admin Panel Features

- **Authentication & Security**
  - Secure login system with Supabase Auth
  - Protected admin routes with middleware
  - Session management and auto-refresh
  - Logout functionality

- **Dashboard**

  - Catalog statistics overview (total categories, products, published/draft status)
  - Recent products table with quick actions
  - Visual analytics

- **Category Management**

  - Create, read, update, and delete categories
  - Drag-and-drop thumbnail upload
  - Icon selection from Lucide icon library
  - Custom ordering with order index

- **Product/Service Management**

  - Comprehensive CRUD operations
  - Three-tab form interface:
    - **Basic Info**: Category, type (product/service), title, short description, publish status
    - **Media**: Thumbnail, featured image, gallery images, YouTube video URL
    - **Content**: Rich text editor for all content sections
  - Advanced filtering (by category, type, status)
  - Pagination and search
  - Bulk publish/unpublish functionality
  - Draft auto-save

- **Rich Text Editor**

  - Tiptap-based WYSIWYG editor
  - Text formatting (bold, italic, underline)
  - Headings (H2, H3)
  - Lists (bullet and numbered)
  - Tables with row/column operations
  - Inline image upload
  - HTML output

- **Image Management**
  - Multiple image upload support
  - Drag-and-drop interface
  - Image preview and lightbox
  - Cloud storage with Supabase Storage
  - Automatic image optimization

## Tech Stack

| Category          | Technology                                                           |
| ----------------- | -------------------------------------------------------------------- |
| Framework         | [Next.js 15](https://nextjs.org/)                                    |
| Language          | [TypeScript 5](https://www.typescriptlang.org/)                      |
| UI Library        | [React 19](https://react.dev/)                                       |
| Styling           | [Tailwind CSS 4](https://tailwindcss.com/)                           |
| UI Components     | [shadcn/ui](https://ui.shadcn.com/) (Radix UI)                       |
| Backend (BaaS)    | [Supabase](https://supabase.com/)                                    |
| Authentication    | [Supabase Auth](https://supabase.com/auth)                           |
| Database          | PostgreSQL (via Supabase)                                            |
| Storage           | Supabase Storage                                                     |
| State Management  | [React Context API](https://react.dev/reference/react/createContext) |
| Data Fetching     | [TanStack Query](https://tanstack.com/query/latest)                  |
| Form Management   | [React Hook Form](https://react-hook-form.com/)                      |
| Schema Validation | [Zod](https://zod.dev/)                                              |
| Rich Text Editor  | [Tiptap](https://tiptap.dev/)                                        |
| Icons             | [Lucide React](https://lucide.dev/)                                  |
| Notifications     | [Sonner](https://sonner.emilkowal.ski/)                              |

## Project Structure
```
Bank-Sumsel-Babel-Catalog/
├── app/                          # Next.js App Router
│   ├── auth/                     # Auth routes
│   │   └── callback/             # OAuth callback handler
│   ├── login/                    # Login page
│   ├── kategori/[slug]/          # Category detail pages
│   ├── produk/[slug]/            # Product detail pages
│   ├── search/                   # Search page
│   ├── admin/                    # Admin panel (protected)
│   │   ├── kategori/             # Category management
│   │   ├── konten/               # Product management
│   │   │   ├── tambah/           # Add product
│   │   │   └── edit/[id]/        # Edit product
│   │   ├── layout.tsx            # Admin layout with logout
│   │   └── page.tsx              # Dashboard
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── not-found.tsx             # 404 page
│
├── components/                   # React components
│   ├── auth/                     # Authentication components
│   │   ├── LoginForm.tsx         # Main login form
│   │   ├── LoginBranding.tsx     # Login page branding
│   │   ├── LoginHeader.tsx       # Login page header
│   │   ├── LoginFormFields.tsx   # Form input fields
│   │   └── useLoginForm.ts       # Login form logic hook
│   ├── admin/                    # Admin-specific components
│   │   ├── dashboard/            # Dashboard components
│   │   ├── kategori/             # Category management
│   │   ├── produk/               # Product management
│   │   │   ├── tabs/             # Form tabs
│   │   │   ├── RichTextEditor.tsx
│   │   │   └── ProductForm.tsx
│   │   └── AdminLayout.tsx
│   ├── home/                     # Homepage components
│   ├── kategori/                 # Category page components
│   ├── produk/                   # Product page components
│   ├── search/                   # Search components
│   ├── shared/                   # Shared components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── SearchBar.tsx
│   └── ui/                       # shadcn/ui components
│
├── contexts/                     # React Context providers
│   └── CatalogContext.tsx        # Main catalog state
│
├── hooks/                        # Custom React hooks
│   ├── use-toast.ts
│   ├── useCategoryForm.ts
│   ├── useProductForm.ts
│   ├── useImageUpload.ts
│   ├── useDashboardData.ts
│   ├── useProductFilters.ts
│   └── useLocalStorage.ts
│
├── lib/                          # Utilities & API
│   ├── api/                      # API layer
│   │   ├── categories.ts         # Category CRUD
│   │   ├── products.ts           # Product CRUD
│   │   └── storage.ts            # File operations
│   ├── supabase/                 # Supabase config
│   │   ├── client.ts             # Browser client
│   │   ├── server-client.ts      # Server client
│   │   └── server.ts             # Server utilities
│   ├── supabase.ts               # Legacy client config
│   ├── utils.ts
│   └── constants.ts
│
├── types/                        # TypeScript types
│   ├── index.ts                  # Main types
│   └── productForm.ts
│
├── data/                         # Initial/mock data
│   └── mockData.ts
│
├── scripts/                      # Utility scripts
│   └── migrate-to-supabase.ts    # Data migration
│
├── middleware.ts                 # Next.js middleware for auth
│
└── public/                       # Static assets
    ├── logo.png
    └── logo-white.png
```

## Getting Started

### Prerequisites

- **Node.js** (v18 or later)
- **npm**, **yarn**, or **pnpm**
- **Supabase Account** (for backend services)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/ElloRabyndra/Bank-Sumsel-Babel-Catalog.git
   cd Bank-Sumsel-Babel-Catalog
```

2. **Install dependencies**
```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
```

3. **Set up environment variables**

   Create environment files in the root directory:

   **For local development** (`.env.local`):
```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

   **For production/deployment** (`.env`):
```env
   SUPABASE_URL=your_production_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_production_role_key
```

   > **Note**: `.env.local` is used for local development and is ignored by Git. `.env` can be used for production deployment or as a template.

   Get these values from your [Supabase project settings](https://supabase.com/dashboard).

4. **Set up Supabase database**

   Run the following SQL in your Supabase SQL Editor:
```sql
   -- Create categories table
   CREATE TABLE categories (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     slug TEXT UNIQUE NOT NULL,
     description TEXT,
     icon TEXT NOT NULL,
     thumbnail_url TEXT NOT NULL,
     order_index INTEGER NOT NULL DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create products table
   CREATE TABLE products (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
     type TEXT NOT NULL CHECK (type IN ('produk', 'layanan')),
     title TEXT NOT NULL,
     slug TEXT UNIQUE NOT NULL,
     thumbnail_url TEXT NOT NULL,
     short_description TEXT NOT NULL,
     kenali_produk TEXT,
     nama_penerbit TEXT,
     fitur_utama TEXT,
     manfaat TEXT,
     risiko TEXT,
     persyaratan TEXT,
     biaya TEXT,
     informasi_tambahan TEXT,
     featured_image_url TEXT,
     youtube_video_url TEXT,
     gallery_images TEXT[] DEFAULT '{}',
     is_published BOOLEAN DEFAULT FALSE,
     order_index INTEGER NOT NULL DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create indexes
   CREATE INDEX idx_products_category_id ON products(category_id);
   CREATE INDEX idx_products_type ON products(type);
   CREATE INDEX idx_products_is_published ON products(is_published);
   CREATE INDEX idx_categories_slug ON categories(slug);
   CREATE INDEX idx_products_slug ON products(slug);

   -- Create updated_at trigger function
   CREATE OR REPLACE FUNCTION update_updated_at_column()
   RETURNS TRIGGER AS $$
   BEGIN
     NEW.updated_at = NOW();
     RETURN NEW;
   END;
   $$ LANGUAGE plpgsql;

   -- Add triggers
   CREATE TRIGGER update_categories_updated_at
     BEFORE UPDATE ON categories
     FOR EACH ROW
     EXECUTE FUNCTION update_updated_at_column();

   CREATE TRIGGER update_products_updated_at
     BEFORE UPDATE ON products
     FOR EACH ROW
     EXECUTE FUNCTION update_updated_at_column();
```

5. **Configure Supabase Authentication**

   In your Supabase Dashboard:
   
   - Go to **Authentication** → **Settings**
   - Add **Site URL**: 
     - Development: `http://localhost:3000`
     - Production: `https://your-domain.com`
   - Add **Redirect URLs**:
     - Development: `http://localhost:3000/auth/callback`
     - Production: `https://your-domain.com/auth/callback`

6. **Create Admin User**

   In Supabase Dashboard → **Authentication** → **Users**:
   
   - Click **Add User** → **Create New User**
   - Enter admin email and password
   - Check **Auto Confirm User**
   - Click **Create User**

7. **Create Supabase Storage bucket**

   In your Supabase dashboard:

   - Go to **Storage**
   - Create a new bucket named `catalog-images`
   - Set it to **Public**

8. **Migrate initial data (optional)**
```bash
   npm run migrate
```

9. **Run the development server**
```bash
   npm run dev
```

10. **Open your browser**

    Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Public Site

- **Homepage**: Browse all products and services, use the search bar to find specific items
- **Categories**: Click on any category to view all products within it
- **Product Details**: Click on a product card to view comprehensive information
- **Search**: Use the search page to find products with advanced filtering

### Admin Panel

Access the admin panel at `/admin` (requires login):

- **Login** (`/login`): Authenticate with admin credentials
- **Dashboard** (`/admin`): View catalog statistics and recent products
- **Kategori** (`/admin/kategori`): Manage product categories
- **Konten** (`/admin/konten`): Manage products and services
  - Add new product: `/admin/konten/tambah`
  - Edit product: `/admin/konten/edit/[id]`

**Note**: All admin routes are protected and require authentication. Unauthorized users will be redirected to the login page.

## Database Schema

### Categories Table

| Column        | Type      | Description                  |
| ------------- | --------- | ---------------------------- |
| id            | UUID      | Primary key                  |
| name          | TEXT      | Category name                |
| slug          | TEXT      | URL-friendly identifier      |
| description   | TEXT      | Category description         |
| icon          | TEXT      | Lucide icon name             |
| thumbnail_url | TEXT      | Category thumbnail image URL |
| order_index   | INTEGER   | Display order                |
| created_at    | TIMESTAMP | Creation timestamp           |
| updated_at    | TIMESTAMP | Last update timestamp        |

### Products Table

| Column             | Type      | Description                 |
| ------------------ | --------- | --------------------------- |
| id                 | UUID      | Primary key                 |
| category_id        | UUID      | Foreign key to categories   |
| type               | TEXT      | 'produk' or 'layanan'       |
| title              | TEXT      | Product/service title       |
| slug               | TEXT      | URL-friendly identifier     |
| thumbnail_url      | TEXT      | Thumbnail image URL         |
| short_description  | TEXT      | Brief description (max 200) |
| kenali_produk      | TEXT      | Product overview (HTML)     |
| nama_penerbit      | TEXT      | Publisher name              |
| fitur_utama        | TEXT      | Key features (HTML)         |
| manfaat            | TEXT      | Benefits (HTML)             |
| risiko             | TEXT      | Risks (HTML)                |
| persyaratan        | TEXT      | Requirements (HTML)         |
| biaya              | TEXT      | Costs (HTML)                |
| informasi_tambahan | TEXT      | Additional info (HTML)      |
| featured_image_url | TEXT      | Featured image URL          |
| youtube_video_url  | TEXT      | YouTube video URL           |
| gallery_images     | TEXT[]    | Array of gallery image URLs |
| is_published       | BOOLEAN   | Publication status          |
| order_index        | INTEGER   | Display order               |
| created_at         | TIMESTAMP | Creation timestamp          |
| updated_at         | TIMESTAMP | Last update timestamp       |

## Authentication & Security

This application uses **Supabase Auth** for secure authentication:

- **Protected Routes**: All `/admin/*` routes require authentication
- **Middleware**: Next.js middleware automatically redirects unauthorized users
- **Session Management**: Automatic session refresh and token management
- **Secure Logout**: Properly destroys user sessions

### Default Admin Access

After setting up, log in with the admin credentials you created in Supabase Auth.

### Security Best Practices

- Never commit `.env.local` or `.env` files with real credentials
- Use environment variables for all sensitive data
- Enable Row Level Security (RLS) in Supabase for production
- Regularly rotate admin passwords

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/):

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Update Supabase **Site URL** and **Redirect URLs** with your production domain
5. Deploy

The application will automatically build and deploy on every push to the main branch.

> **Live Demo**: [Bank-Sumsel-Babel-Catalog](https://bank-sumsel-babel-catalog.vercel.app/)

---

**Built for Bank Sumsel Babel**