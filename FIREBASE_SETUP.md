# Firebase Setup Instructions

**Note**: Your app now supports guest access even without Firebase setup! You can test the app immediately. Firebase is only needed for persistent user accounts and data storage.

## Testing Without Firebase

Your app works immediately! Guest access uses local storage and doesn't require Firebase setup.

1. Start the app: `npm start`
2. Click "Continue as Guest" on the login page
3. You'll be logged in as a guest user
4. All features work, but data is stored locally

## When to Set Up Firebase

Set up Firebase when you want:
- User registration and login with email/password
- Persistent user data across devices
- Cloud storage for issues and user profiles
- Analytics and user tracking

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "civic-link")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click on the "Sign-in method" tab
3. Enable "Email/Password" sign-in method
4. **Enable "Anonymous" sign-in method** (this is required for guest access)
5. (Optional) Enable other sign-in methods like Google, Facebook, etc.

## Step 3: Enable Firestore Database

1. Go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (you can change security rules later)
4. Select a location for your database
5. Click "Done"

## Step 4: Get Your Firebase Config

1. Click the gear icon (⚙️) next to "Project Overview" → "Project settings"
2. Scroll down to "Your apps" section
3. Click the "</>" icon to add a web app
4. Enter an app nickname (e.g., "Civic Link Web")
5. Copy the config object - it should look like this:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## Step 5: Update Your Config

1. Open `src/firebase.js` in your project
2. Replace the placeholder config with your actual Firebase config
3. Save the file

## Step 6: Test the Integration

1. Start your development server: `npm start`
2. Try registering a new user
3. Try logging in with the registered credentials
4. Check Firebase Console → Authentication → Users to see registered users
5. Check Firestore Database to see user data

## Security Rules (Optional but Recommended)

After testing, update your Firestore security rules in Firebase Console:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Issues can be read by authenticated users (including anonymous)
    // Only authenticated non-anonymous users can create issues
    match /issues/{issueId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && !request.auth.token.firebase.sign_in_provider == 'anonymous';
    }
  }
}
```

**Note**: The current app still uses localStorage for issues. You can move issues to Firestore later if needed.

## Troubleshooting

- **Config not working**: Double-check that you copied the config correctly from Firebase Console
- **Auth errors**: Make sure Authentication is enabled in Firebase Console
- **Database errors**: Make sure Firestore is enabled and rules are set correctly
- **CORS errors**: Firebase should handle CORS automatically for web apps

## Next Steps

- Consider adding email verification
- Add password reset functionality
- Implement role-based access control
- Add user profile management
- Store issues in Firestore instead of localStorage