import { UnorderedList, ListItem, useMediaQuery } from "@chakra-ui/react"

export default function NavLinks () {

const [isLessThan768] = useMediaQuery("(max-width: 768px)")
const [isLargerThan768] = useMediaQuery("(min-width: 768px)")

    return (
        <> 
        {isLargerThan768 &&
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