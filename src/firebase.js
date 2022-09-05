import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {getFirestore} from "@firebase/firestore";

const app = firebase.initializeApp({

    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,

    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
  
});

export const auth = app.auth();
export const db = getFirestore(app);

// export const uid = auth.onAuthStateChanged(user => {if(user) {
//     return user.uid;
// }
// })

// //---------------------------------------------------
// export const firestore = app.firestore();
// export const createUserDocument = async (user, additionalData) =>{
//     if(!user) return;

//     const userRef = firestore.doc(`users/${user.uid}`)

//     const snapshot = await userRef.get();
//     if(!snapshot.exists){
//         const {email}= user;
//         const {displayName} = additionalData;
    
//     try{
//         userRef.set({
//             displayName,
//             email,
//             createdAt: new Date(),
//         })
//     }
//     catch(err){
//         console.log("Error in creating user", err)
//     }
// }   
// }
// export const db = getDatabase(app);

export default app;