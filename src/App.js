import "./App.css";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Verification from "./components/auth/Verification";

import Categories from "./components/Categories";
import AddItem from "./components/item/AddItem";
import Item from "./components/item/Item";
import Items from "./components/item/Items";
import Hero from "./components/main/Hero";
import SliderCom from "./components/main/trending/SliderCom";
import Profile from "./components/profile/Profile";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/styles/tailwind.css";
import About from "./components/About";
import Admin from "./components/admin/Admin";
import Contact from "./components/Contact";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import RegisterBanner from "./components/main/RegisterAd";
import NewsLetter from "./components/main/Subscribe";

function App() {
  return (
    <BrowserRouter>
      <header className="header">
        <Header />
      </header>

      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Hero />
              <SliderCom />
              <Categories />

              <RegisterBanner />
              <NewsLetter />
            </>
          }
        />
        {/* <Hero /> */}
        <Route path="/profile/:id" element={<Profile />} />
        {/* <Profile /> */}
        {/* <Route exact path="/categories" element={<Categories />} />
        <Route exact path="/categories/item" element={<ListOfItems />} /> */}
        {/* </div> */}
        <Route path="/categories" element={<Categories />} />

        <Route path="/items" element={<Items />} />
        <Route path="/item/:id" element={<Item />} />

        <Route exact path="/login" element={<Login />} />

        <Route exact path="/signup" element={<Signup />} />

        <Route exact path="/about" element={<About />} />

        <Route exact path="/contact" element={<Contact />} />

        <Route exact path="/additem" element={<AddItem />} />

        <Route exact path="/verification/:id" element={<Verification />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route exact path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
