import "./App.css";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Verification from "./components/auth/Verification";

import Categories from "./components/Categories";
import AddItem from "./components/items/AddItem";
import Item from "./components/items/item/Item";
import Items from "./components/items/Items";
import Hero from "./components/main/Hero";
import SliderCom from "./components/main/trending/SliderCom";
import Profile from "./components/profile/Profile";
import NotFound from "./components/404";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Aboutt from "./components/AboutT";
import Dashboard from "./components/admin/Dashboard";
import AdminItems from "./components/admin/Items";
import ReportItems from "./components/admin/ReportItems";
import UserBlocked from "./components/admin/UserBlocked";
import Contact from "./components/Contact";
import NewFooter from "./components/footer/NewFooter";
import Header from "./components/header/Header";
import RegisterBanner from "./components/main/RegisterAd";
import NewsLetter from "./components/main/Subscribe";
import { selectIsAuth } from "./store/features/authSlicer";

function App() {
  const isAuth = useSelector(selectIsAuth);

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
              {/* <NewsLetter /> */}
            </>
          }
        />

        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/categories" element={<Categories />} />

        <Route path="/items" element={<Items />} />
        <Route path="/item/:id" element={<Item />} />

        <Route path="/login" element={isAuth ? <Navigate to="/" /> : <Login />} />

        <Route exact path="/signup" element={isAuth ? <Navigate to="/" /> : <Signup />} />

        <Route exact path="/about" element={<Aboutt />} />

        <Route exact path="/contact" element={<Contact />} />

        <Route exact path="/additem" element={<AddItem />} />

        <Route exact path="/verification/:id" element={<Verification />} />

        <Route exact path="/admin" element={<Dashboard />} />
        <Route exact path="/admin/dashboard" element={<Dashboard />} />
        <Route exact path="/admin/activeitems" element={<AdminItems />} />
        <Route exact path="/admin/solditems" element={<AdminItems />} />
        <Route exact path="/admin/reportitems" element={<ReportItems />} />
        <Route exact path="/admin/userBlocked" element={<UserBlocked />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <NewFooter />
    </BrowserRouter>
  );
}

export default App;
