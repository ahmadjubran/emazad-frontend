import './App.css';
import logo from './assets/logo.png';
import Login from './components/auth/Login';

import Signup from './components/auth/Signup';

function App() {
  return (
    <div className="App">
      Hello Bid-Hammers!
      <img src={logo} alt="logo" />

      <Login />

      <Signup />


    </div>
  );
}

export default App;
