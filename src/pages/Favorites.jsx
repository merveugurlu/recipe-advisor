import React, { useState, useEffect } from 'react'
import { auth, db } from '../firebase'
import { onSnapshot, collection, deleteDoc, doc } from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";
import { FiX } from 'react-icons/fi'

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [user] = useAuthState(auth);
    const id = user.uid;

    useEffect(() =>
        onSnapshot(collection(db, 'users', id, 'favorites'),
            (snapshot) => {
                setFavorites(snapshot.docs.map(doc => doc))
            }),
        []
    );

    const deleteFavorite = async (ID) => {
        await deleteDoc(doc(db, 'users', id, 'favorites', ID))
    }

    return (
        <div>
            {favorites.length === 0 ?
                <h1>...</h1> :
                favorites.map((favorite) => {
                    let show = false;
                    const { label, image, url, ingredients, dishType, mealType } = favorite.data();
                    return (
                        <div className='Recipe'>
                            <FiX id='notFav' onClick={() => deleteFavorite(favorite.id)} />
                            <img
                                alt='recipe'
                                className='recipe-image'
                                src={image}>
                            </img>
                            <h2 style={{ textTransform: 'capitalize' }}>{label}</h2>
                            <p
                                style={{ textTransform: 'capitalize' }}>
                                {mealType} - {dishType}
                            </p>
                            <a
                                href={url}
                                target='_blank'
                                rel="noreferrer"
                                className='recipe-button'>
                                Get Recipe
                            </a>
                            <button
                                className='recipe-button'
                                onClick={(show = !show)}>
                                {ingredients.length} Ingredients
                            </button>
                        </div>
                    )
                }
                )}
        </div>
    )
}

export default Favorites