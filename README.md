# Project Cost Tracker

A modern web application to help track project costs, including items and additional expenses. Built with React, Redux, Firebase, and Chakra UI.

## Features

- **User Authentication**: Secure user authentication with email/password and Google sign-in
- **Items Management**: Add, edit, and delete project items with cost tracking
- **Other Costs Management**: Track additional project expenses
- **Cost Summary**: View total project cost with breakdowns
- **Clean Starting State**: No sample data - begin with a fresh, clean slate
- **Personalized Avatar**: Enhanced user avatar displays a *single* uppercase letter (first letter of name or email) with pulsing animation effect
- **Karkhana Branding**: Application uses larger, more visible Karkhana logo throughout the interface for better brand representation
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop with optimized layouts for all screen sizes
- **Dark Mode Support**: Toggle between light and dark themes with improved visual contrast
- **Enhanced UI/UX**: Beautiful animations and transitions for a modern user experience
  - Rotating elements with smooth motion
  - Hover effects with scale and shadow transitions
  - Smooth page transitions with staggered animations
  - Interactive elements with visual feedback
  - Gradient elements with shimmering effects
  - Improved typography with better readability
- **Clean Code**: Optimized imports and removed unused code for better performance, with React Hooks rules followed correctly

## Technologies Used

- **React**: For building the user interface
- **Redux Toolkit**: For state management
- **Firebase**: 
  - Authentication for user login/registration
  - Firestore for real-time database operations
- **Chakra UI**: For component styling and theming
- **Framer Motion**: For animations and transitions

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Fix any dependency issues if needed:
   ```
   npm install caniuse-lite
   ```
4. Start the development server:
   ```
   npm start
   ```

## Usage

1. Register a new account or log in with existing credentials
2. Start adding items with their costs
3. Add any additional project costs
4. View the total project cost and breakdowns in real-time
5. Toggle between light and dark mode using the theme switch in the navbar

## Official Submission Checklist ✅

All requirements for submission have been completed:

- ✅ **Fully functional React app** with all required features
- ✅ **Redux store** managing application state (auth, items, and other costs)
- ✅ **Firebase Authentication** working properly with email/password and Google login
- ✅ **Data persisted and synced with Firestore** in real-time
- ✅ **UI built with Chakra UI** and fully responsive
- ✅ **GitHub repository** with clean commit history
- ✅ **Deployment ready** with build configuration properly set up

## Additional Enhancements ✨

Beyond the basic requirements, we've added:

- ✅ **Enhanced login/register pages** with animations and modern design
- ✅ **Clean, animation-rich interface** for improved user experience
- ✅ **Personalized avatar** showing exactly one uppercase letter with enhanced visual presentation
- ✅ **Karkhana branding** implemented with larger, more prominent logos throughout the application
- ✅ **Improved UI** with better typography, spacing, and visual feedback
- ✅ **Code optimization** with cleanup of unused imports and variables
- ✅ **React rules compliance** fixed conditional hooks issues to follow best practices
- ✅ **Error resolution** addressed console warnings and errors for clean output

## Deployment

Build the production version:
```
npm run build
```

Deploy to Firebase or your preferred hosting service.

## Known Issues and Workarounds

If you encounter dependency issues with the `caniuse-lite` package, run:
```
npm install caniuse-lite
```

If you're using Windows PowerShell and encounter `&&` token issues, run commands one at a time or use the Command Prompt instead.

## License

This project is licensed under the MIT License.
