import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../FireBase/firebase.init";



export const AuthContext = createContext()
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const [forgetEmail, setForgetEmail] = useState('');

   




    const createNewUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password);
    }


    const logOut = ()=>{
        setLoading(true)
        return signOut(auth)
    }

    const signInWithGoogle =()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }



   const userLogIn = (email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
   }


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>{
            unsubscribe()
        }
    },[])


    const updateUserProfile = (updatedData)=>{
       return updateProfile(auth.currentUser, updatedData)
    }

    const forgetPassword = (email)=>{
        return sendPasswordResetEmail(auth, email)
    }


    const authInfo = {
        name:'Main Format',
        user, 
        setUser,
        createNewUser,
        logOut,
        userLogIn,
        loading,
        updateUserProfile,
        signInWithGoogle,
        setForgetEmail,
        forgetEmail,
        forgetPassword
       
    }


    return (
       <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;