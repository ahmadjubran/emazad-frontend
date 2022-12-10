import logo from '../../assets/logo.png';

export default function NavBar() {

  // if the user is logged in, show:
  // The logout button, sell on eMazad button, and the user's name
  // if the user is not logged in, show:
  // The login button


  return (
    <nav className="nav-container">
      <div className="nav-logo">
        <img src={logo} alt="logo" width='75px'/>
      </div>
      <div className="nav-links">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>

          <li>
            <a href="#">Auctions</a>
          </li>

          <li>
            <a href="#">Contact Us</a>
          </li>
          
          <li>
            <a href="#">About eMazad</a>
          </li>
           
          <li>
            <a href="#">Login</a>
          </li>

        </ul>
      </div>




    </nav>
 
  )
}

