# Bank Sumsel Babel - Product Catalog

![Logo](/public/logo.png)

## Introduction

This is the frontend for the Bank Sumsel Babel product catalog, a web application designed to showcase the bank's products and services. It provides a user-friendly interface for customers to browse and search for information, as well as an admin panel for managing the catalog content.

The project is built with Next.js, TypeScript, and Tailwind CSS, and it uses a modern, component-based architecture. The data is currently mocked and managed using React Context and local storage, allowing for a fully interactive frontend experience without a live backend.

## Features

### Public-Facing Features

- **Homepage:** Displays a hero section with a search bar and a grid of product categories.
- **Category Pages:** Lists all products within a specific category.
- **Product Pages:** Shows detailed information about a single product, including a description, features, benefits, risks, requirements, and costs.
- **Search Functionality:** Allows users to search for products across the entire catalog.
- **Responsive Design:** The application is fully responsive and works on all screen sizes.

### Admin Panel Features

- **Dashboard:** Provides an overview of the catalog, including statistics and a list of recent products.
- **Category Management:** Allows admins to create, read, update, and delete product categories.
- **Product Management:** Allows admins to create, read, update, and delete products.
- **Rich Text Editor:** A Tiptap-based rich text editor for creating and editing product descriptions.
- **Image Upload:** Functionality to upload and manage product images.

## Tech Stack

| Category      | Technology                                      |
| ------------- | ----------------------------------------------- |
| Framework     | [Next.js](https://nextjs.org/)                  |
| Language      | [TypeScript](https://www.typescriptlang.org/)   |
| Styling       | [Tailwind CSS](https://tailwindcss.com/)        |
| UI Components | [shadcn/ui](https://ui.shadcn.com/)             |
| State Management| [React Context](https://reactjs.org/docs/context.html) |
| Form Management | [React Hook Form](https://react-hook-form.com/) |
| Schema Validation| [Zod](https://zod.dev/)                      |
| Icons         | [Lucide React](https://lucide.dev/guide/react)  |

## Project Structure

```
/
├── app/                # Main application directory (App Router)
│   ├── (public)/       # Public routes
│   │   ├── kategori/   # Category pages
│   │   └── produk/     # Product pages
│   ├── admin/          # Admin panel routes
│   └── ...
├── components/         # Reusable React components
│   ├── admin/          # Components for the admin panel
│   ├── home/           # Components for the homepage
│   ├── kategori/       # Components for category pages
│   ├── produk/         # Components for product pages
│   ├── shared/         # Components shared across the app
│   └── ui/             # UI components from shadcn/ui
├── contexts/           # React Context providers
├── data/               # Mock data for the application
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── public/             # Static assets (images, fonts, etc.)
└── types/              # TypeScript type definitions
```

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm, yarn, or pnpm

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ElloRabyndra/Bank-Sumsel-Babel-Catalog.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the development server
   ```sh
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

### Public Site

Navigate the site to browse through the product categories and individual products. Use the search bar on the homepage to find specific products.

### Admin Panel

Access the admin panel by navigating to `/admin`. From here, you can manage the product catalog:

- **Dashboard:** Get an overview of your catalog.
- **Kategori:** Add, edit, or delete product categories.
- **Produk:** Add, edit, or delete products.

All data is stored in your browser's local storage.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
