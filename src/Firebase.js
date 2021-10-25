import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  ///...
};

firebase.initializeApp(firebaseConfig);

export default firebase;
