import React, { useState, useEffect, createContext, useContext } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateEmail,
    onAuthStateChanged,
    updatePassword,
    updateProfile,
    sendEmailVerification
} from 'firebase/auth'
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({})

    const createUser = async (email, password) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email,
            });
        } catch (e) {
            console.error(e);
        }
    }

    const signin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth);
    }

    const editEmail = (newEmail) => {
        return updateEmail(user, newEmail)
    }

    const editPassword = (newPassword) => {
        return updatePassword(user, newPassword);
    }

    const editUsername = (username) => {
        return updateProfile(user, { displayName: username })
    }
    const verifyEmail = () => {
        sendEmailVerification(user)
    }

    useEffect(() => {
        const unregister = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unregister();
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, createUser, logout, signin, editEmail, editPassword, editUsername, verifyEmail }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}
