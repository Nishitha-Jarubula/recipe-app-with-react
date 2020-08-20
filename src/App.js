import React, {useState, useEffect} from 'react';
import Recipes from "./Recipes";
import './App.css';

const App = () => {

  const APP_ID = "1e04532b";
  const APP_KEY = "b7e67fde317607685835854c18e94d2f";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('peanuts');//When clicked the search then only we get the search results
  //for that we created query and setQuery


  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      setRecipes(data.hits);
      console.log(data);
    };
    getRecipes();
  },[query]) // this useeffect only runs when we click on the submit button because thats the only time when the peanuts value get updated

 

  const updateSearch = e => {
    setSearch(e.target.value)
  }
    

  const getSearch = e => {
    e.preventDefault(); // to stop the page refresh
    setQuery(search);  // we can setQuery equal to what ever we have in the search, after we write everything and we hit the button to submit we can get the finished text rather than when the user is writing and updating
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form"> /* when ever we submit the form i want the getSearch function to run */
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">
          Search
        </button> 
      </form>
      hi 
      {recipes.map(recipe => (
        <Recipes key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients} />
      ))}
      hello
    </div>
  );
}

export default App;
