import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyCm50GNeu0OHBhRrzImN_zJqMuri2M4f6U",
    authDomain: "netflix-clone-c30fc.firebaseapp.com",
    projectId: "netflix-clone-c30fc",
    storageBucket: "netflix-clone-c30fc.firebasestorage.app",
    messagingSenderId: "733674108570",
    appId: "1:733674108570:web:b25c253708db7f39bc5123"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        })
        console.log("user added ot firestore");
        toast.success("Signed Up Seccessfully")
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        toast.success("Signed In Seccessfully")
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const logout = () => {
    signOut(auth)
}

export { auth, db, signup, login, logout }