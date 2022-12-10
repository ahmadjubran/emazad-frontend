import './App.css';
import NavBar from './components/header/NavBar';
import Profile from './components/Profile';

function App() {
  return (
    <div className="main-container">
      <header className="header">
        <NavBar />
        </header>
      <div className='profile-container'> 

        <Profile />
      </div>
    </div>
  );
}

export default App;
