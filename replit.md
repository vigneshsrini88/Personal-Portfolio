# Portfolio Web Application

## Overview

This is a modern portfolio website for Sarah Chen, a technical writer and documentation specialist. The application showcases her professional experience, skills, sample documents, and includes an AI-powered chat assistant to answer questions about her background. Built with React, TypeScript, and a Node.js/Express backend, it features a clean, professional design with comprehensive documentation examples.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: Express sessions with PostgreSQL storage

### Key Components

#### Database Schema (shared/schema.ts)
- **Users**: Authentication and user management
- **Experiences**: Professional work history with achievements
- **Documents**: Portfolio documents with metadata and file paths
- **Skills**: Technical skills with proficiency levels and categories
- **Chat Messages**: AI chat conversation history
- **Contact Messages**: Contact form submissions

#### API Structure (server/routes.ts)
- `GET /api/experiences` - Fetch professional experience data
- `GET /api/documents` - Retrieve document portfolio
- `GET /api/skills` - Get technical skills by category
- `POST /api/chat` - AI-powered chat interactions
- `POST /api/contact` - Handle contact form submissions

#### Frontend Components
- **Portfolio Pages**: Single-page application with smooth scrolling sections
- **AI Chat Sidebar**: Real-time chat with OpenAI integration
- **Component Library**: Comprehensive shadcn/ui component set
- **Responsive Design**: Mobile-first responsive layout

### Data Flow

1. **Portfolio Data**: Static content is stored in PostgreSQL and served via REST API
2. **AI Chat**: User messages are sent to OpenAI API, responses stored in database
3. **Contact Forms**: Form submissions are validated and stored in database
4. **Real-time Updates**: TanStack Query manages cache invalidation and refetching

### External Dependencies

#### AI Integration
- **OpenAI API**: GPT-4o model for intelligent chat responses
- **Fallback Handling**: Graceful degradation when API is unavailable

#### UI/UX Libraries
- **Radix UI**: Accessible component primitives
- **Lucide Icons**: Consistent icon system
- **React Hook Form**: Form validation and handling
- **Zod**: Runtime type validation

#### Development Tools
- **Drizzle Kit**: Database migrations and schema management
- **ESBuild**: Production build optimization
- **PostCSS**: CSS processing with Tailwind

### Deployment Strategy

#### Development Environment
- **Replit Integration**: Configured for Replit development environment
- **Hot Module Replacement**: Vite HMR for rapid development
- **Database**: PostgreSQL 16 module in Replit

#### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Static Serving**: Express serves built frontend in production

#### Environment Configuration
- **Database URL**: Required environment variable for PostgreSQL connection
- **OpenAI API Key**: Optional for AI chat functionality
- **Session Configuration**: Secure session management with PostgreSQL store

#### Key Design Decisions

1. **Monorepo Structure**: Client, server, and shared code in single repository for easier development
2. **Type Safety**: Full TypeScript coverage with shared schema definitions
3. **Database-First**: Drizzle ORM with PostgreSQL for reliable data persistence
4. **Component Architecture**: Reusable UI components with consistent design system
5. **Progressive Enhancement**: AI chat works as enhancement, core portfolio functions without it
6. **Mobile-First**: Responsive design prioritizes mobile experience
7. **Performance**: Optimized builds, lazy loading, and efficient caching strategies

The application follows modern web development best practices with a focus on maintainability, type safety, and user experience. The architecture supports both development iteration and production deployment while maintaining clean separation of concerns between frontend, backend, and data layers.