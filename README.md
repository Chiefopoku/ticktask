# TickTask

TickTask is a task management web application that allows users to create, manage, and track their tasks. It includes user authentication (via Google Sign-In) using Firebase and stores tasks in Firestore for real-time updates.

## Features

- **User Authentication**: Google Sign-In powered by Firebase Authentication.
- **Task Management**: Add, update, delete, and mark tasks as complete.
- **Real-Time Updates**: Tasks are updated in real-time using Firestore.
- **Responsive Design**: Works on both desktop and mobile devices.
- **Theme Toggle**: Switch between dark mode and light mode.

## Tech Stack

- **Frontend**: React.js (JavaScript)
- **Backend**: Firebase (Authentication, Firestore, Hosting)
- **Styling**: CSS (custom styles)
- **Authentication**: Firebase Authentication (Google Sign-In)
- **Database**: Firestore (NoSQL real-time database)

## Screenshots

![TickTask Screenshot](path_to_screenshot)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- **Node.js** and **npm**: Install from [nodejs.org](https://nodejs.org/)
- **Firebase account**: Sign up for free at [Firebase Console](https://firebase.google.com/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/ticktask.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd ticktask
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Set up Firebase**:

   - Go to [Firebase Console](https://console.firebase.google.com/).
   - Create a new Firebase project.
   - Enable **Firestore** and **Authentication** (Google Sign-In).
   - Create a `.env` file in the root of your project and add your Firebase configuration keys:

     ```bash
     REACT_APP_FIREBASE_API_KEY=your-api-key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
     REACT_APP_FIREBASE_PROJECT_ID=your-project-id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     REACT_APP_FIREBASE_APP_ID=your-app-id
     ```

5. **Run the development server**:

   ```bash
   npm start
   ```

   The app will run locally on `http://localhost:3000`.

## Usage

1. **Sign in**: Click on the **Google Sign-In** button to authenticate.
2. **Create a Task**: Use the input field to add new tasks.
3. **Manage Tasks**: Mark tasks as complete, edit them, or delete them as needed.
4. **Logout**: Sign out using the **Logout** button.

## Firebase Security Rules

Ensure that your Firestore database is secure by applying the following security rules in Firebase:

```javascript
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

These rules ensure that only authenticated users can access and modify their own tasks.

## Deployment

To deploy the application using Firebase Hosting, follow these steps:

1. **Build the app**:

   ```bash
   npm run build
   ```

2. **Install Firebase CLI**:

   ```bash
   npm install -g firebase-tools
   ```

3. **Login to Firebase**:

   ```bash
   firebase login
   ```

4. **Initialize Firebase in your project**:

   ```bash
   firebase init
   ```

   Select **Hosting** and use the **build/** folder as the public directory.

5. **Deploy the app**:

   ```bash
   firebase deploy
   ```

The app will be deployed and hosted at `https://your-project-id.web.app/`.

## Contributing

If you'd like to contribute to **TickTask**, feel free to fork the repository and submit pull requests. All contributions are welcome!

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Commit your changes**: `git commit -m "Add some feature"`
4. **Push to the branch**: `git push origin feature/your-feature-name`
5. **Open a pull request**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Special thanks to [Firebase](https://firebase.google.com/) for providing easy-to-use backend services.
- Inspired by the simplicity of task management tools like Todoist and Microsoft To Do.

---
