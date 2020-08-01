## General info
A Todo App that can be downloaded as a Progressive Web App which utilises service worker to run offline. Most modern browsers offer full or partial support for service worker. This [site](https://caniuse.com/#feat=serviceworkers) covers the support offered by most common browsers in the market. 

The app uses indexed DB to store data in the browser. 
This [site](https://caniuse.com/#feat=indexeddb) covers the compatibility of most popular browsers in the market.

### Features 
- User can assign category to tasks and set reminders on a specific date and time.
- User will be asked to allow notifications from the app to enabled the notification feature.

	
## Technologies
The app is created with:
* React - v 16.13.1
	
## Setup
To run this project, install it locally by running `npm install`:

### Development mode

Run `npm start` to run the app in the development mode with local hosting on port 3000 [http://localhost:3000](http://localhost:3000).

### Testing
This project uses Jest and React-Testing-Library for testing.
Run `npm run test` to run tests in the __test__ folder in the root directory.

### Deployment

This app is hosted on Firebase Hosting using the Firebase CLI deploy. Documentation can be found [here](https://firebase.google.com/docs/hosting/quickstart).
