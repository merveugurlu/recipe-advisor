import React, { useState } from 'react'
import Axios from 'axios'
import Recipe from './Recipe'
import '../styles/Search.css'
import { FaAngleDoubleUp } from "react-icons/fa";

function Search() {
  const [query, setQuery] = useState(" ");
  const [recipes, setRecipes] = useState([]);
  const [result, setResult] = useState("");
  var count = 20;

  const APP_ID = 'cc6d325a';
  const APP_KEY = "d71296a9566cc3d639c6ce4fc0555cff";
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=${count}`

  async function getRecipes() {
    try {
      if (query !== '') {
        var result = await Axios.get(url);
        document.getElementById('result-header').style.visibility = 'visible'
        setRecipes(result.data.hits)
        console.log(result.data)
        if (result.data.count === 0) {
          return alert("Invalid Search");
        }
      } else {
        alert('Fill the form')
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipes();
    setResult(query);
    setQuery("");
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className='head'>
      <h1 className='title'>Recipe Search</h1>

      <form className='search-form' onSubmit={onSubmit}>
        <input
          className='search-form__text'
          type="text"
          placeholder="Ingredient"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          className='search-form__button'
          type="submit"
          value="Search"
        />
      </form>

      <h1 id='result-header' className='result-header'>Results for: {result}</h1>
      <div className='recipe-list'>
        {recipes.map(recipe => {
          return <Recipe key={recipe.recipe.uri} recipe={recipe.recipe} />
        })}
      </div>
      <div>
        <FaAngleDoubleUp
          className='backtotop'
          onClick={scrollToTop} />
      </div>
    </div>
  )
}

export default Search