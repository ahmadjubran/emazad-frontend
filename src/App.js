import './App.css';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

import NavBar from './components/header/NavBar';
import Profile from './components/Profile';
import Hero from './components/hero/Hearo';
function App() {
  return (
    <div>
      <header className="header">
        <NavBar />
      </header>

      <div className='profile-container'>
      </div>
      <Hero />
      <Profile />


      <Login />
      <Signup />


    </div>
  );
}

export default App;