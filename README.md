# Subtraction Practice

An interactive educational web game designed to make subtraction learning engaging and fun for children through adaptive technologies and gamification. The application provides an intuitive, visually appealing interface that supports multiple difficulty levels and learning styles.

![Subtraction Practice App](./screenshots/app-preview.png)

## Features

- ✅ Interactive subtraction practice with 9 different tests (minus 1 through minus 9)
- ✅ 6 progressive difficulty levels with decreasing time limits
- ✅ Voice announcements in multiple languages (English, Spanish, French, German)
- ✅ Visual and audio feedback for correct/incorrect answers
- ✅ Score tracking and level progression
- ✅ Customizable difficulty settings
- ✅ Mobile-friendly responsive design
- ✅ Android app packaging with Capacitor

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **UI**: TailwindCSS, Shadcn UI components
- **Internationalization**: Custom i18n implementation
- **Audio**: Web Speech API for voice feedback
- **Mobile**: Capacitor for Android app packaging
- **Build Tools**: npm, Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/subtraction-practice.git
   cd subtraction-practice
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser to view the app
   ```
   http://localhost:5000
   ```

## Usage

1. Select a subtraction test (minus 1 through minus 9)
2. Complete each level by solving 10 subtraction problems
3. Progress through increasingly difficult levels with shorter time limits
4. View your final score at the end

## Game Levels

- **Level 1**: 12 seconds per problem
- **Level 2**: 10 seconds per problem
- **Level 3**: 8 seconds per problem
- **Level 4**: 6 seconds per problem
- **Level 5**: 4 seconds per problem
- **Level 6**: 3 seconds per problem

## Building for Production

### Web App

```bash
npm run build
```

### Android App

See [BUILD.md](./BUILD.md) for detailed instructions on building the Android app for Google Play and Amazon App Store submission.

## Customization

### Language Support

The app currently supports:
- English
- Spanish (Español)
- French (Français)
- German (Deutsch)

To add additional languages, modify the translations in `client/src/lib/i18n/translations.ts`.

### Difficulty Settings

Users can customize:
- Voice feedback (on/off)
- Sound effects (on/off)
- Auto-advance to next problem (on/off)

## Project Structure

```
├── android/              # Android app files (Capacitor)
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   ├── pages/        # Page components
│   │   └── main.tsx      # Application entry point
├── server/               # Express server
├── shared/               # Shared types and schemas
└── public/               # Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors who have helped shape this educational tool
- Inspired by traditional subtraction practice techniques
- Built with modern web technologies for an engaging learning experience