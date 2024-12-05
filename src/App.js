import { useEffect, useState } from 'react';
import video from './food.mp4';
import './App.css';
import MyRecipesComponent from './MyRecipesComponent';



function App() {
  const MY_ID = "1f595820";
  const MY_KEY = "%20410ba818c2b360be560855d2082c11cf%09";

  const [mySearch, setMySearch] = useState("");
  const [myRecipes, setMyRecipes] = useState([]);
  const [wordSubmitted, setWordSubmitted] = useState("avocado");

  useEffect(() => {
    const getRecipe = async () => {
      const  response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${MY_ID}&app_key=${MY_KEY}`);
      const data = await response.json()
      setMyRecipes(data.hits);
    }
   getRecipe()
  }, [wordSubmitted])

 const myRecipeSearch = (e) => {
  setMySearch(e.target.value)

  }
  const finalSearch = (e) =>{
    e.preventDefault()
    setWordSubmitted(mySearch)
  }
  
  return (
    <div className="App">

  <div className="container">

  <video autoPlay muted loop>

   <source src={video} type="video/mp4" />

</video>

  <h1>Find a Recipe</h1>

  </div>
  <div className='container'>
     <form onSubmit = {finalSearch}>
         <input className="search" onChange={myRecipeSearch} placeholder='Search...' value={mySearch}/>
    </form>
</div>

<div className='container'>
     <button onClick={finalSearch}>
         <img src="https://img.icons8.com/fluency/48/000000/fry.png" alt="icon"/>
      </button>
</div>
 {myRecipes.map((element,index) => (
  <MyRecipesComponent key={index} 
  label={element.recipe.label} 
  image={element.recipe.image} 
  calories={element.recipe.calories}
  ingridients={element.recipe.ingredientLines}/>
 ))}
  </div>
  );
}

export default App;
