import React, { useState, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'
import '../styles/Home.css'
import Recipe from './Recipe'
import Axios from 'axios'
import { FaAngleDoubleUp } from "react-icons/fa";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  const APP_ID = 'cc6d325a';
  const APP_KEY = "d71296a9566cc3d639c6ce4fc0555cff";
  let url = `https://api.edamam.com/search?q=random&app_id=${APP_ID}&app_key=${APP_KEY}&health=gluten-free`

  async function getRecipes() {
    try {
      var result = await Axios.get(url);
      setRecipes(result.data.hits);
    } catch (e) {
      console.log(e.message)
    }
  }

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    getRecipes();
  }, [ ])
  
  return (
    <div>
      <Container className='home-header'>
        <div className='header-text'>
          <p>You can easily find the recipes according to ingredients</p>
          <Button
            href='/search'
            className='search-button'>
            Search
          </Button>
        </div>
      </Container>
      <Container className='recipe-samples'>
        <div>
          <h2 style={{ margin: '7px', backgroundColor:'#FFFCFC' }}>Some recipes you can find in this site:</h2>
          <div>
            {recipes.map(recipe => {
              return <Recipe key={recipe.recipe.uri} recipe={recipe.recipe} />
            })}
          </div>
        </div>
      </Container>
      <div>
        <FaAngleDoubleUp className='backtotop' onClick={scrollToTop}/>
      </div>
    </div>
  )
}

export default Home