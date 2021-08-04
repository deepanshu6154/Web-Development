import firebase from 'firebase/app' ;
import 'firebase/auth' ;
import 'firebase/firestore' ;

firebase.initializeApp(
    {
        apiKey: "AIzaSyD_JoPkyjFIFWaBzc1SSuNu096FvlUzXOM",
        authDomain: "class-demo-c62fb.firebaseapp.com",
        projectId: "class-demo-c62fb",
        storageBucket: "class-demo-c62fb.appspot.com",
        messagingSenderId: "391296490859",
        appId: "1:391296490859:web:ef8de8bb5ebf621a2ac02e"
      })

export default firebase