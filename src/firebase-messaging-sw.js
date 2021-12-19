importScripts('https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.4.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyBoOBo8RacS_YuLOG3auysSTdEfeCtD7Sc",
  authDomain: "linkedin-bf16c.firebaseapp.com",
  projectId: "linkedin-bf16c",
  storageBucket: "linkedin-bf16c.appspot.com",
  messagingSenderId: "339494660908",
  appId: "1:339494660908:web:bc70d9f27cc769d9bf5a89"
});

const messaging = firebase.messaging();
