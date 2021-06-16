# react-firebase-sample

A quick and dirty sample React app to explore [Google's Firebase](https://firebase.google.com/) services.

* Firebase Authentication
* Firebase Realtime Database
* Firebase Cloud Storage
* Firebase Cloud Messaging (not yet)

I wanted to add FCM but there is still limitation in browser support.

## Description
The app is like an online bulletin board. 
If the user is signed in, they can upload text and image.

**Note:** The config.js is not included in the /src folder for obvious reasons.

Sample format of config.js for reference:
```
export const config = {
    apiKey: "Abc12Defg34HijKlmn567",
    authDomain: "project-site.firebaseapp.com",
    projectId: "project-site",
    storageBucket: "project-site.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567:web:s283j38dhh3384hf",
    databaseURL: "https://project-site-default-rtdb.firebaseio.com",
    measurementId: "A-XYZABC123A"
}
```

## Installation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm install`

Installs all required modules and dependencies. 

You also need to install [Firebase CLI](https://firebase.google.com/docs/cli/).

### `firebase init`

To initialize firebase in the app and generate appropriate files and folders like:
- .firebase/
- .firebaserc
- firebase.json

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

**Important:** You also need to set the appropriate permission in the rules in Firebase control panel.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
