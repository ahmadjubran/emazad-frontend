import { Button, ListItem, UnorderedList, useMediaQuery } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/actions/authActions";

export default function NavLinks() {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  return (
    <>
      {isLargerThan768 && (
        <div>
          <UnorderedList display="flex" listStyleType="none" gap="20px">
            <ListItem>
              <Link to="/">Home</Link>
            </ListItem>

            <ListItem>
              <Link to="/categories">Auctions</Link>
            </ListItem>

            <ListItem>
              <Link to="#">Contact Us</Link>
            </ListItem>

            <ListItem>
              <Link to="#">About eMazad</Link>
            </ListItem>

            {isAuth ? (
              <ListItem>
                <Link to="/profile">Profile</Link>
              </ListItem>
            ) : (
              <ListItem>
                <Link to="/login">Login</Link>
              </ListItem>
            )}

            {isAuth && <Button onClick={() => logout(dispatch)}>Logout</Button>}
          </UnorderedList>
        </div>
      )}

      {isLessThan768 && (
        <div>
          <UnorderedList display="flex" listStyleType="none" gap="20px" flexDirection="column" alignItems="center">
            <ListItem>
              <Link to="#">Home</Link>
            </ListItem>

            <ListItem>
              <Link to="#">Auctions</Link>
            </ListItem>

            <ListItem>
              <Link to="#">Contact Us</Link>
            </ListItem>

            <ListItem>
              <Link to="#">About eMazad</Link>
            </ListItem>

            <ListItem>
              <Link to="#">Login</Link>
            </ListItem>
          </UnorderedList>
        </div>
      )}
    </>
  );
}
