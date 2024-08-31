import React, { useState } from 'react'
import '../styles/Search.css'
import { FiHeart } from 'react-icons/fi'
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";

export default function Recipe({ recipe }) {
  const [show, setShow] = useState(false);
  const { label, image, url, ingredients, dishType, mealType } = recipe;
  const [user] = useAuthState(auth);
  let id = ''
  if (user) {
    id = user.uid;
  }

  const Ingredients = ({ ingredients }) => {
    return ingredients.map(ingredient => {
      return (
        <p>{ingredient.text}</p>
      )
    }
    )
  }

  const favourite = async () => {
    await addDoc(collection(db, "users", id, "favorites"), recipe);
  }

  return (
    <div className='Recipe'>
      {user !== null ?
        <FiHeart id='fav' onClick={favourite} />
        : <></>
      }
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
        onClick={() => setShow(!show)}>
        {ingredients.length} Ingredients
      </button>
      {show && <Ingredients ingredients={ingredients} />}
    </div>
  )
}
