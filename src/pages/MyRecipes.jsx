import React, { useState, useEffect } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from '../firebase'
import { onSnapshot, collection, deleteDoc, doc } from 'firebase/firestore'
import { FiX } from 'react-icons/fi'

const MyRecipes = () => {
    const [myRecipes, setMyRecipes] = useState([])
    const [user] = useAuthState(auth);
    const id = user.uid;

    useEffect(() => {
        onSnapshot(collection(db, 'users', id, 'myrecipes'),
            (snapshot) => {
                setMyRecipes(snapshot.docs.map(doc => doc))
            }
        )
    },
        [ ]
    )

    const deleteMyRecipe = async (ID) => {
        await deleteDoc(doc(db, 'users', id, 'myrecipes', ID))
    }

    return (
        <div>
            {myRecipes.length === 0 ?
                <h1>There is no recipe</h1> :
                myRecipes.map((myRecipe) => {
                    const { label, image, url, ingredients, dishType, mealType } = myRecipe.data();
                    return (
                        <div className='Recipe'>
                            <FiX id='notFav' onClick={() => deleteMyRecipe(myRecipe.id)} />
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
                                className='recipe-button'>
                                {ingredients.length} Ingredients
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default MyRecipes