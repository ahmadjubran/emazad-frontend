import Norifications from "./Notifications"
import { UnorderedList, ListItem, useMediaQuery, Button, HStack } from "@chakra-ui/react"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../store/actions/authActions"


export default function NavLinks () {

const [isLessThan768] = useMediaQuery("(max-width: 768px)")
const [isLargerThan768] = useMediaQuery("(min-width: 768px)")

const isAuth = useSelector((state) => state.auth.isAuth)
const dispatch = useDispatch()

    return (
        <> 
        {isLargerThan768 &&
        <div >
        <UnorderedList display="flex" listStyleType="none" gap="20px" alignItems={'center'}>
          <ListItem>
            <a href="/">Home</a>
          </ListItem>

          <ListItem>
            <a href="/categories">Auctions</a>
          </ListItem>

          <ListItem>
            <a href="#">Contact Us</a>
          </ListItem>
          
          <ListItem>
            <a href="#">About eMazad</a>
          </ListItem>

          {isAuth ? 
          <>
           <ListItem>
           <Norifications />
           </ListItem> 
            <ListItem>
              <a href="/profile">Profile</a>
            </ListItem>  
            </>
            :
            <ListItem>
              <a href="/login">Login</a>
            </ListItem> 
            }

          {isAuth &&
          <Button onClick={() => logout(dispatch)}>Logout</Button>
          }

        </UnorderedList>
      </div>
      }

        {isLessThan768 &&
        <div >
        <UnorderedList display="flex" listStyleType="none" gap="20px" flexDirection="column" alignItems="center">
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
}
                
      </>
    )
}