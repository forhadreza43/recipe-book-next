# 🍳 Recipe Book

A modern, full-stack recipe management application built with Next.js 18, featuring user authentication, recipe CRUD operations, and a beautiful responsive design with dark mode support.

## ✨ Features

- **🔐 User Authentication**: Secure login/register with NextAuth.js
- **📝 Recipe Management**: Create, read, update, and delete recipes
- **🖼️ Image Optimization**: Next.js Image component with ImgBB integration
- **🌙 Dark Mode**: Toggle between light and dark themes
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **⚡ Performance**: Server-side rendering and image optimization
- **🔍 Search & Filter**: Find recipes by cuisine, ingredients, and more

## 🚀 Tech Stack

- **Frontend**: Next.js 18 (App Router), React 18, Tailwind CSS
- **Authentication**: NextAuth.js with Google OAuth
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React
- **Image Hosting**: ImgBB integration
- **Deployment**: Vercel ready

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Google OAuth credentials (for authentication)
- ImgBB API key (for image uploads)

## 🛠️ Setup & Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd recipe-book
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5000

# ImgBB (optional, for image uploads)
IMGBB_API_KEY=your-imgbb-api-key
```

### 4. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

### 5. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for Production

```bash
npm run build
npm start
```

## 🗂️ Route Summary

### Public Routes

| Route           | Component       | Description                                               |
| --------------- | --------------- | --------------------------------------------------------- |
| `/`             | `Home`          | Landing page with hero section, top recipes, and features |
| `/login`        | `Login`         | User authentication page                                  |
| `/register`     | `Register`      | User registration page                                    |
| `/recipes`      | `AllRecipes`    | Browse all available recipes                              |
| `/recipes/[id]` | `RecipeDetails` | View individual recipe details                            |

### Protected Routes (Dashboard)

| Route                  | Component   | Description                       |
| ---------------------- | ----------- | --------------------------------- |
| `/dashboard/addRecipe` | `AddRecipe` | Create new recipe form            |
| `/dashboard/myRecipe`  | `MyRecipes` | User's personal recipe collection |

### API Routes

| Route                     | Description                          |
| ------------------------- | ------------------------------------ |
| `/api/auth/[...nextauth]` | NextAuth.js authentication endpoints |
| `/api/recipes`            | Recipe CRUD operations               |

### Component Structure

```
components/
├── AuthProvider.jsx          # Authentication context
├── DarkModeToggle.jsx        # Theme switcher
├── Navbar.jsx               # Navigation header
├── Hero.jsx                 # Landing hero section
├── RecipeCard.jsx           # Individual recipe display
├── RecipeDetails.jsx        # Full recipe view
├── AddRecipe.jsx            # Recipe creation form
├── MyRecipes.jsx            # User's recipes
├── WhyWe.jsx                # Features section
├── CookingTips.jsx          # Cooking tips component
├── TopRecipes.jsx           # Featured recipes
└── ui/                      # Reusable UI components
    ├── button.jsx
    └── loader.jsx
```

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: Reusable UI components with consistent design
- **Dark Mode**: Automatic theme switching with system preference detection
- **Responsive**: Mobile-first design approach

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables for Production

```env
AUTH_URL=https://your-domain.vercel.app
AUTH_SECRET=your-production-secret
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
NEXT_PUBLIC_API_URL=https://your-backend-api.com
NEXT_PUBLIC_IMGBB_API_KEY=your-imgBB-api-key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="cloudinary-preset-name"
AUTH_TRUST_HOST=true
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Tailwind CSS for the utility-first approach
- Lucide for beautiful icons

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

**Happy Cooking! 🍽️**
