import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import Navbar from './components/Navbar';
import Recipe from './pages/Recipe';
import { AuthContextProvider } from './components/AuthContext';
import Account from './pages/Account';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Favorites from './pages/Favorites';
import AddRecipeForm from './pages/AddRecipeForm';
import MyRecipes from './pages/MyRecipes';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Router basename='/'>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/recipe" element={<Recipe />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<Search />} />
            <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='addrecipe' element={<AddRecipeForm />} />
            <Route path='myrecipes' element={<MyRecipes />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </Router>
      </AuthContextProvider>
    </div >
  );
}

export default App;
