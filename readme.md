# Teacher Management System

## Overview

This is a modern Teacher Management System built with React, TypeScript, and a Node.js/Express backend. The application provides a comprehensive interface for managing teacher data with features like search, filtering, CRUD operations, and responsive design. It follows a full-stack architecture with a clean separation between frontend and backend concerns.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Shadcn/UI components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for HTTP server and API routes
- **Development**: TSX for TypeScript execution in development
- **Build**: ESBuild for production bundling

### Component Structure
- **Atomic Design**: Organized into reusable UI components
- **Feature Components**: Domain-specific components for teacher management
- **Layout Components**: Header, navigation, and page structure
- **Modal/Dialog Components**: For adding and editing teachers

## Key Components

### Data Layer
- **Schema Definition**: Shared TypeScript types and Zod schemas in `/shared/schema.ts`
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database Storage**: PostgreSQL database with persistent storage via DatabaseStorage class
- **Validation**: Zod schemas for runtime type checking and form validation
- **Storage Interface**: Abstract storage interface with PostgreSQL database implementation

### API Layer
- **RESTful API**: Express routes for teacher CRUD operations
- **Error Handling**: Centralized error middleware
- **Request Logging**: Custom middleware for API request logging
- **Data Filtering**: Support for search, department, and status filtering

### Frontend Features
- **Teacher Dashboard**: Overview with statistics and teacher listings
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Search & Filter**: Real-time search with department and status filters
- **CRUD Operations**: Create, read, update, delete teachers
- **Data Export**: CSV export functionality
- **Toast Notifications**: User feedback for actions

### UI/UX Components
- **Design System**: Consistent theming with CSS variables
- **Accessibility**: WCAG-compliant components from Radix UI
- **Interactive Elements**: Buttons, forms, modals, and navigation
- **Data Display**: Tables, cards, statistics, and badges

## Data Flow

### Request Flow
1. User interactions trigger React components
2. TanStack Query manages API calls and caching
3. Express routes handle HTTP requests
4. Storage layer processes data operations
5. Responses flow back through the same chain

### State Management
- **Server State**: Managed by TanStack Query with automatic caching and invalidation
- **Form State**: React Hook Form for local form state and validation
- **UI State**: Local React state for modals, filters, and interactions

### Data Validation
- **Client-side**: Zod schemas validate forms before submission
- **Server-side**: Same Zod schemas validate incoming requests
- **Type Safety**: Shared TypeScript types ensure consistency

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database driver
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Form validation integration

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe style variants
- **lucide-react**: Icon library

### Development Dependencies
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler
- **vite**: Frontend build tool
- **@replit/vite-plugin-***: Replit-specific development tools

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: ESBuild bundles server code to `dist/index.js`
3. **Database Migration**: Drizzle pushes schema changes to PostgreSQL

### Environment Configuration
- **Development**: Uses TSX for hot reloading and Vite dev server
- **Production**: Serves static files and runs bundled Node.js server
- **Database**: PostgreSQL via environment variable `DATABASE_URL`

### File Structure
- `/client`: React frontend application
- `/server`: Express backend application
- `/shared`: Common TypeScript types and schemas
- `/migrations`: Database migration files
- `/dist`: Built application files

### Deployment Requirements
- Node.js runtime environment
- PostgreSQL database instance
- Environment variables for database connection
- Static file serving capability

The application is designed to be easily deployable on platforms like Replit, Vercel, or any Node.js hosting service with minimal configuration requirements.