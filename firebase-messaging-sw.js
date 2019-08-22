// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDAHkN6WdkV6Zpg3hBE-qALFZtzxk2ocaI",
    authDomain: "lubeasy.firebaseapp.com",
    databaseURL: "https://lubeasy.firebaseio.com",
    projectId: "lubeasy",
    storageBucket: "lubeasy.appspot.com",
    messagingSenderId: "208924966875",
    appId: "1:208924966875:web:9884ac548d51eb5c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    var notificationTitle = 'Background Message Title';
    var notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };
    notificationOptions.click = function() {
        window.open("https://lubeasywebsite.herokuapp.com", "lubeasy");
    };
    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});