# UHBC Resource Hub - L2 CS

A modern web application built to provide easy access to educational resources for L2 Computer Science students at the University of Hassiba Benbouali of Chlef (UHBC). This platform serves as a centralized hub for course materials, making it easier for students to find and access their study resources.

## 🌟 Features

- 📚 Organized module-based resource access
- 🎯 Clean and intuitive user interface
- 🔍 Search functionality for quick resource finding
- 📱 Fully responsive design for all devices
- 🌓 Light/Dark theme support
- ⚡ Fast and efficient performance with Vite
- 🎨 Modern UI components with shadcn/ui

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **UI Components**: 
  - Radix UI primitives
  - Custom shadcn/ui components
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form with Zod validation
- **Data Visualization**: Recharts
- **State Management**: React Query
- **Development Tools**:
  - ESLint for code linting
  - TypeScript for type safety
  - SWC for fast compilation

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or Yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/Rayane-cs/l2-cs-ressourses-hub.git
cd l2-cs-ressourses-hub
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit `http://localhost:5173`

## 🏗️ Building for Production

1. Create a production build
```bash
npm run build
# or
yarn build
```

2. Preview the production build locally
```bash
npm run preview
# or
yarn preview
```

## 🚥 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run build:dev` - Create development build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint code analysis

## 📝 Project Structure

```
src/
├── components/     # Reusable UI components
│   └── ui/        # shadcn/ui components
├── hooks/         # Custom React hooks
├── lib/           # Utilities and resources
├── pages/         # Route pages
└── integrations/  # External service integrations
```

## 🌐 Deployment

The application can be deployed to any static hosting platform that supports modern Single Page Applications (SPA):

1. Build the project using `npm run build`
2. Deploy the contents of the `dist` directory to your hosting platform
3. Configure your hosting platform to handle client-side routing

Recommended hosting platforms:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## 👤 Author

**Rayane**
- UHBC L2 Computer Science student
- GitHub: [@Rayane-cs](https://github.com/Rayane-cs)

## 📄 License

This project is open source and available under the [MIT License](LICENSE)
