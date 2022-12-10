import './App.css';
import NavBar from './components/header/NavBar';
import Profile from './components/Profile';
import Hero from './components/hero/Hearo';
function App() {
  return (
    <div>
      <div className="main-container">
        <header className="header">
          <NavBar />
        </header>
        <div className='profile-container'>
          <Profile />
        </div>
      </div>
      <Hero />
      <div>space</div>
    </div>
  );
}

export default App;
