import logo from '../../assets/logo.png';
import '../../styles/Nav.css';
import { UnorderedList, ListItem, Flex } from '@chakra-ui/layout';
import { useMediaQuery } from '@chakra-ui/react'
export default function NavBar() {

  // if the user is logged in, show:
  // The logout button, sell on eMazad button, and the user's name
  // if the user is not logged in, show:
  // The login button


  return (
    <Flex className="nav-bar" display="flex" justifyContent="space-between" alignItems="center" padding="20px" width="100%" height="100px" backgroundColor="#f5f5f5">
      <div className="nav-logo">
        <img src={logo} alt="logo" width='75px'/>
      </div>
      <div >
        <UnorderedList display="flex" listStyleType="none" gap="20px">
          <ListItem>
            <a href="#">Home</a>
          </ListItem>

          <ListItem>
            <a href="#">Auctions</a>
          </ListItem>

          <ListItem>
            <a href="#">Contact Us</a>
          </ListItem>
          
          <ListItem>
            <a href="#">About eMazad</a>
          </ListItem>
           
          <ListItem>
            <a href="#">Login</a>
          </ListItem>

        </UnorderedList>
      </div>




    </Flex>
 
  )
}

