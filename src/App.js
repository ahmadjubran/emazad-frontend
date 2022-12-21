import "./App.css";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Verification from "./components/auth/Verification";

import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./components/404";
import About from "./components/About";
import Dashboard from "./components/admin/Dashboard";
import AdminItems from "./components/admin/Items";
import ReportItems from "./components/admin/ReportItems";
import UserBlocked from "./components/admin/UserBlocked";
import Contact from "./components/Contact";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import AddItem from "./components/items/AddItem";
import Item from "./components/items/item/Item";
import Items from "./components/items/Items";
import Profile from "./components/profile/Profile";
import { selectIsAuth } from "./store/features/authSlicer";

function App() {
  const isAuth = useSelector(selectIsAuth);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/login" element={isAuth ? <Navigate to="/" /> : <Login />} />
        <Route exact path="/signup" element={isAuth ? <Navigate to="/" /> : <Signup />} />
        <Route exact path="/verification/:id" element={<Verification />} />

        <Route exact path="/profile/:id" element={<Profile />} />

        <Route exact path="/items" element={<Items />} />
        <Route exact path="/item/:id" element={<Item />} />
        <Route exact path="/additem" element={<AddItem />} />

        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />

        <Route exact path="/admin" element={<Dashboard />} />
        <Route exact path="/admin/dashboard" element={<Dashboard />} />
        <Route exact path="/admin/activeitems" element={<AdminItems />} />
        <Route exact path="/admin/solditems" element={<AdminItems />} />
        <Route exact path="/admin/reportitems" element={<ReportItems />} />
        <Route exact path="/admin/userBlocked" element={<UserBlocked />} />

        <Route exact path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
