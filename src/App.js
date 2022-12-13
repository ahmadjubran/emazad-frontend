import "./App.css";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Verification from "./components/auth/Verification";

import Categories from "./components/Categories";
import Items from "./components/Categories/Items";
import NavBar from "./components/header/NavBar";
import Hero from "./components/hero/Hero";
import Profile from "./components/Profile";
import SliderCom from "./components/trending/SliderCom";
// import { useSelector } from "react-redux";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import Contact from "./components/Contact";
import Footer from "./components/footer/Footer";
function App() {
  // const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <BrowserRouter>
      <header className="header">
        <NavBar />
      </header>

      <Routes>
        {/* <div className="profile-container"> */}
        <Route
          exact
          path="/"
          element={
            <>
              <Hero />
              <SliderCom />
              <Categories />
            </>
          }
        />
        {/* <Hero /> */}
        <Route path="/profile" element={<Profile />} />
        {/* <Profile /> */}
        {/* <Route exact path="/categories" element={<Categories />} />
        <Route exact path="/categories/item" element={<ListOfItems />} /> */}
        {/* </div> */}
        <Route path="/categories" element={<Categories />} />
        <Route path="/items" element={<Items />} />

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />

        <Route exact path="/About" element={<About />} />
        <Route exact path="/Contact" element={<Contact />} />



        <Route exact path="/verification/:id" element={<Verification />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />

    </BrowserRouter >
  );
}

export default App;
