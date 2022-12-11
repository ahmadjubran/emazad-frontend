import "./App.css";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

import Categories from "./components/Categories";
import ListOfItems from "./components/Categories/ListOfItems";
import NavBar from "./components/header/NavBar";
import Hero from "./components/hero/Hero";
import Profile from "./components/Profile";
function App() {
  return (
    <div>
      <header className="header">
        <NavBar />
      </header>
      <div className="profile-container">
        <Hero />
        <Profile />
        <Categories />
        <ListOfItems />
      </div>

      <Login />
      <Signup />
    </div>
  );
}

export default App;
