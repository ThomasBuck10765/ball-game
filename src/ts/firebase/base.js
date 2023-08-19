import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

// Hidden as to protect db
import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
