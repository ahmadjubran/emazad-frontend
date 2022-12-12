import "./App.css";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

import Categories from "./components/Categories";
import Items from "./components/Categories/Items";
import NavBar from "./components/header/NavBar";
import Hero from "./components/hero/Hero";
import Profile from "./components/Profile";

// import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <BrowserRouter>
      <header className="header">
        <NavBar />
      </header>

      <Routes>
        {/* <div className="profile-container"> */}
        <Route path="/" element={<Hero />} />
        {/* <Hero /> */}
        <Route path="/profile" element={<Profile />} />
        {/* <Profile /> */}
        {/* <Route exact path="/categories" element={<Categories />} />
        <Route exact path="/categories/item" element={<ListOfItems />} /> */}
        {/* </div> */}
        <Route path="/categories" element={<Categories />} />
        <Route path="/items" element={<Items />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
