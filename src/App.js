import "./App.css";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Verification from "./components/auth/Verification";

import Categories from "./components/Categories";
import Items from "./components/item/Items";
import NavBar from "./components/header/NavBar";
import Hero from "./components/main/hero/Hero";
import Profile from "./components/Profile";
import SliderCom from "./components/main/trending/SliderCom";
// import { useSelector } from "react-redux";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import Contact from "./components/Contact";
import Footer from "./components/footer/Footer";
import AdminItems from "./components/admin/Items";
import ReportItems from "./components/admin/ReportItems";
import UserBlocked from "./components/admin/UserBlocked";
import Dashboard from "./components/admin/Dashboard"
function App() {
  // const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <BrowserRouter>
      <header className="header">
        <NavBar />
      </header>

      <Routes>
        <div className="profile-container">
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
          <Hero />
          <Route path="/profile" element={<Profile />} />

          {/* <Profile /> */}
          {/* <Route exact path="/categories" element={<Categories />} />
        <Route exact path="/categories/item" element={<ListOfItems />} /> */}
        </div>
        <Route path="/categories" element={<Categories />} />

        <Route path="/items" element={<Items />} />

        <Route exact path="/login" element={<Login />} />

        <Route exact path="/signup" element={<Signup />} />

        <Route exact path="/about" element={<About />} />

        <Route exact path="/contact" element={<Contact />} />

        <Route exact path="/verification/:id" element={<Verification />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route exact path="/admin" element={<Dashboard />} />
        <Route exact path="/admin/dashboard" element={<Dashboard />} />
        <Route exact path="/admin/activeitems" element={<AdminItems />} />
        <Route exact path="/admin/solditems" element={<AdminItems />} />
        <Route exact path="/admin/reportitems" element={<ReportItems />} />
        <Route exact path="/admin/userBlocked" element={<UserBlocked />} />
      </Routes>
      {/* <Footer /> */}

    </BrowserRouter >
  );
}

export default App;
