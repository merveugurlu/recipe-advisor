import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import Recipe from './Recipe'

const AddRecipeForm = () => {
    const [user, loading] = useAuthState(auth);
    const id = user.uid;
    const [label, setLabel] = useState('');
    const [image, setImage] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [mealType, setMealType] = useState('');
    const [dishType, setDishType] = useState('');
    const [url, setUrl] = useState('');
    const recipe = {
        label: label,
        image: image,
        ingredients: ingredients,
        mealType: mealType,
        dishType: dishType,
        url: url
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'users', id, 'myrecipes'), recipe);
    }

    return (
        <div className='row' style={{margin:'30px'}}>
            <div className='col'>
                {loading === false ? (
                    <form className='recipe-form' onSubmit={handleSubmit}>
                        <label>
                            Recipe Label:
                            <input type='text'
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                            />
                        </label> 
                        <label>
                            Recipe Image:
                            <input type='text'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </label> 
                        <label>
                            Ingredients:
                            <input type='text'
                                value={ingredients}
                                onChange={(e) => setIngredients(e.target.value)}
                            />
                        </label> 
                        <label>
                            Meal Type:
                            <input type='text'
                                value={mealType}
                                onChange={(e) => setMealType(e.target.value)} />
                        </label>
                        <label>
                            Dish Type:
                            <input type='text'
                                value={dishType}
                                onChange={(e) => setDishType(e.target.value)}
                            />
                        </label>
                        <label>
                            Recipe Link:
                            <input type='text'
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </label>
                        <button className='add-button'>Add New Recipe</button>
                    </form>
                ) : (
                    <h1>Loading</h1>
                )
                }
            </div>
            <div>
                <h2 style={{textAlign:'center', marginBottom:'25px'}}>Recipe Display</h2>
                <Recipe recipe={recipe} />
            </div>
        </div>
    )
}

export default AddRecipeForm