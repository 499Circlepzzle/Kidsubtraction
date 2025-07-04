# Subtraction Practice App

## Overview

This is an interactive educational web application designed to help children learn subtraction through gamification and adaptive learning. The app features progressive difficulty levels, multilingual support, and voice feedback to create an engaging learning experience.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: TailwindCSS with Shadcn UI components for consistent design
- **State Management**: React hooks and context for local state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Storage**: In-memory storage implementation with interface for easy swapping

### Mobile Architecture
- **Mobile Framework**: Capacitor for cross-platform Android app packaging
- **Web View**: Uses the same React frontend wrapped in native container
- **Build Target**: Android with specific configurations for app store distribution

## Key Components

### Game Engine
- **Game Logic**: Located in `client/src/lib/game.ts`
- **Difficulty System**: 6 progressive levels with decreasing time limits (12s to 2s)
- **Test Types**: 9 different subtraction tests (minus 1 through minus 9)
- **Problem Generation**: Dynamic problem creation with number range validation

### Internationalization System
- **Translation Engine**: Custom i18n implementation in `client/src/lib/i18n/`
- **Language Support**: 16 languages (English, Spanish, French, German, Italian, Portuguese, Dutch, Japanese, Chinese, Russian, Hindi, Swahili, Amharic, Yoruba, Zulu, Arabic)
- **Context-Based**: React Context API for global language state management

### Audio System
- **Speech Synthesis**: Web Speech API for voice announcements
- **Sound Effects**: External sound files for correct/incorrect feedback
- **Language Mapping**: Automatic voice selection based on selected language

### UI Components
- **Design System**: Shadcn UI components with custom theme
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Game Interface**: Timer, problem display, score tracking components

## Data Flow

1. **Game Initialization**: User selects subtraction test → Game state initialized → First problem generated
2. **Problem Solving**: Problem displayed → Timer starts → User submits answer → Feedback provided
3. **Progress Tracking**: Score updated → Next problem generated or level completed
4. **Level Progression**: Level scores stored → Next level unlocked with increased difficulty
5. **Game Completion**: Final scores calculated → Results displayed

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React DOM, React Query for data fetching
- **UI Libraries**: Radix UI primitives, Lucide React icons, Class Variance Authority
- **Build Tools**: Vite, TypeScript, ESBuild for production builds
- **Database**: Drizzle ORM, Neon Database serverless driver
- **Mobile**: Capacitor CLI and Android plugin

### Development Dependencies
- **Styling**: TailwindCSS, PostCSS, Autoprefixer
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: Wouter for lightweight routing
- **Error Handling**: Custom error overlay disabling for production

## Deployment Strategy

### Web Deployment
- **Build Process**: Vite builds optimized static assets to `dist/public/`
- **Server**: Express.js serves both API routes and static files
- **Production**: Node.js server with environment-based configuration

### Android Deployment
- **Build Process**: Capacitor packages web assets into Android project
- **Configuration**: `capacitor.config.json` defines app metadata and build options
- **Distribution**: APK/AAB generation for Google Play Store and Amazon App Store
- **Requirements**: Android SDK, JDK 17+, signing keystore for release builds

### Database Strategy
- **Development**: In-memory storage for rapid prototyping
- **Production**: PostgreSQL via Neon Database with connection pooling
- **Migrations**: Drizzle Kit for schema management and migrations
- **Scaling**: Serverless architecture supports automatic scaling

## Recent Changes

- **January 1, 2025**: Added 6 new languages (Hindi, Swahili, Amharic, Yoruba, Zulu, Arabic) expanding total language support to 16 languages
- **January 1, 2025**: Enhanced voice synthesis system with proper language codes for all African and Asian languages
- **January 1, 2025**: Updated language selector UI with native language names in their respective scripts
- **January 1, 2025**: Prepared comprehensive GitHub setup documentation and automation scripts
- **December 31, 2024**: Expanded language support from 4 to 10 languages (added Italian, Portuguese, Dutch, Japanese, Chinese, Russian)
- **December 31, 2024**: Enhanced multilingual voice feedback system with proper language mapping
- **December 31, 2024**: Updated Level 6 timing from 2 seconds to 3 seconds based on user feedback
- **December 31, 2024**: Implemented Android app packaging with Capacitor for Google Play and Amazon App Store submission
- **December 31, 2024**: Added comprehensive build documentation and store submission guidelines
- **December 31, 2024**: Initial core game implementation with 9 subtraction tests and 6 difficulty levels

## User Preferences

```
Preferred communication style: Simple, everyday language.
```