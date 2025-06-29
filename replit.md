# SpaceLend - Space Rental Platform

## Overview

SpaceLend is a full-stack web application that connects space owners with renters, similar to Airbnb but focused on various types of spaces (parking spots, storage units, event spaces, etc.). The platform allows users to list their unused spaces for rent and discover/book spaces in their area.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: React Router DOM for client-side navigation
- **State Management**: TanStack React Query for server state management
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Development**: tsx for TypeScript execution in development
- **Build**: esbuild for production bundling
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)

### Monorepo Structure
The application follows a monorepo pattern with clear separation:
- `client/` - Frontend React application
- `server/` - Backend Express.js API
- `shared/` - Shared types and schemas between frontend/backend

## Key Components

### Authentication System
- Modal-based authentication flow
- Currently uses demo authentication (accepts any credentials)
- User session management with localStorage
- Protected routes for dashboard and user-specific features

### Space Management
- Multi-step space listing form with file uploads
- Space discovery with filtering and search
- Detailed space views with image galleries
- Booking system with calendar integration
- Review and rating system

### User Dashboard
- Comprehensive sidebar navigation
- Earnings tracking and analytics
- Booking management (both as guest and host)
- Messaging system between users
- Settings and profile management

### UI Components
- Complete design system with Shadcn/ui
- Responsive layout with mobile-first approach
- Dark/light theme support via CSS custom properties
- Accessible components built on Radix UI

## Data Flow

### Database Schema
- **Users Table**: Basic user information (id, username, password)
- Uses Drizzle ORM for type-safe database operations
- Schema defined in `shared/schema.ts` for consistency

### State Management
- React Query for server state caching and synchronization
- Local component state for UI interactions
- localStorage for user session persistence
- Form state managed by React Hook Form

### API Structure
- RESTful API design with `/api` prefix
- Structured route registration in `server/routes.ts`
- Storage abstraction layer with in-memory implementation
- Error handling middleware for consistent error responses

## External Dependencies

### UI Libraries
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Embla Carousel**: Image carousel functionality
- **date-fns**: Date manipulation utilities

### Development Tools
- **Vite**: Development server and build tool
- **ESBuild**: Fast TypeScript compilation for production
- **PostCSS**: CSS processing with Tailwind
- **TypeScript**: Type safety across the entire stack

### Database & Backend
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle Kit**: Database migrations and schema management
- **Express**: Web framework for API routes

## Deployment Strategy

### Development
- Vite dev server for frontend with HMR
- tsx for backend TypeScript execution
- Concurrent development with API proxy

### Production Build
- Frontend: Vite builds optimized static assets to `dist/public`
- Backend: esbuild compiles TypeScript to `dist/index.js`
- Single deployment with Express serving both API and static files

### Environment Configuration
- Database URL configuration via environment variables
- Development vs production mode detection
- Replit-specific optimizations and integrations

### Database Management
- Drizzle migrations for schema changes
- `db:push` command for development schema updates
- PostgreSQL as the production database

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 29, 2025. Initial setup