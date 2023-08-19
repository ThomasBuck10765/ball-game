import Rebase from 're-base';
import firebase from 'firebase/app';
import stringToHash from '../helpers/stringToHash';
import 'firebase/auth';
import 'firebase/database';

import firebaseConfig from './firebaseConfig';
const firebaseApp = firebase.initializeApp(firebaseConfig);

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export function authenticate() {    
    const authProvider = firebase.auth.EmailAuthProvider;

    const authCredentials = authProvider.credential(`${process.env.REACT_APP_FIREBASE_EMAIL}`, stringToHash(`${process.env.REACT_APP_FIREBASE_PASSWORD}`).toString());
    return firebaseApp
        .auth()
        .signInWithCredential(authCredentials)
        .then(authHandler);
    
}

async function authHandler(authData: any) {
    return (authData.user.uid === process.env.REACT_APP_FIREBASE_UID_RESULT);
}

export default base;
