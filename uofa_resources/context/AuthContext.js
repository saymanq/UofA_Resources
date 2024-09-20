"use client"
import { useContext, createContext, useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';

// interface AuthContextType {
//     user: string
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const GoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    }

    const logOut = () => {
        signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [user])
    
    return (
        <AuthContext.Provider value={{ user, GoogleSignIn, logOut }}> {children} </AuthContext.Provider>
    )
};

export const UserAuth = () => {
    // const context = useContext(AuthContext);
    // if (context === undefined) {
    //     throw new Error('UserAuth must be used within an AuthContextProvider');
    // }
    // return context;
    return useContext(AuthContext);
}