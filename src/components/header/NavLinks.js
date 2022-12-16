import {
  Button, ListItem, UnorderedList, useMediaQuery, useDisclosure,
  Avatar,
  Flex,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Stack,
  IconButton,
  AvatarBadge
} from "@chakra-ui/react";
import {  BsChatSquareQuote } from 'react-icons/bs'
import { MdOutlineFavorite } from 'react-icons/md'
import { BiLogOut } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/actions/authActions";
import Norifications from "./Notifications";

export default function NavLinks() {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  
  return (
    <>
      {isLargerThan768 && (

        <UnorderedList display="flex" listStyleType="none" gap="20px" alignItems="center">
          <ListItem>
            <Link to="/">Home</Link>
          </ListItem>

          <ListItem>
            <Link to="/contact">Contact Us</Link>
          </ListItem>

          <ListItem>
            <Link to="/about">About</Link>
          </ListItem>

          <ListItem>
            <Link to="/categories">Auctions</Link>
          </ListItem>

          {isAuth ? (
            <>
              <ListItem>
                <Norifications />
              </ListItem>
              <HStack >
                <Flex justifyContent="center" mt={4}>
                  <Popover placement="bottom" isLazy>
                    <PopoverTrigger>
                    <IconButton
                      aria-label="More server options"
                      icon={ <Avatar boxSize='2em'>
                      <AvatarBadge boxSize='.9em' bg='green.500' />
                    </Avatar> }
                      variant="solid"
                      w="fit-content"
                    />
                    </PopoverTrigger>
                    <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }}>
                      <PopoverArrow />
                      <PopoverBody>
                        <Stack>
                          <Link to="/profile" >
                            <Button
                              w="194px"
                              variant="ghost"
                              rightIcon={<CgProfile />}
                              justifyContent="space-between"
                              fontWeight="normal"
                              fontSize="sm">
                              Profile
                            </Button>
                          </Link>
                          <Button
                            onClick={() => logout(dispatch)} style={{ width: "100%" }}
                            w="194px"
                            variant="ghost"
                            rightIcon={<BiLogOut />}
                            justifyContent="space-between"
                            fontWeight="normal"
                            fontSize="sm">
                            Logout
                          </Button>
                        </Stack>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Flex>
              </HStack>
            </>
          ) : (
            <ListItem>
              <Link to="/login">Login</Link>
            </ListItem>
          )}
        </UnorderedList>
      )}

      {isLessThan768 && (

        <UnorderedList display="flex" listStyleType="none" gap="20px" flexDirection="column" alignItems="center">
          <ListItem>
            <Link to="/">Home</Link>
          </ListItem>

          <ListItem>
            <Link to="/contact">Contact Us</Link>
          </ListItem>

          <ListItem>
            <Link to="/about">About</Link>
          </ListItem>

          <ListItem>
            <Link to="/categories">Auctions</Link>
          </ListItem>

          {isAuth ? (
            <>
              <ListItem>
                <Link to="/profile">Profile</Link>
              </ListItem>

              <ListItem>
                <Norifications />
              </ListItem>

            </>
          ) : (
            <ListItem>
              <Link to="/login">Login</Link>
            </ListItem>
          )}

          {isAuth && <Button onClick={() => logout(dispatch)}>Logout</Button>}
        </UnorderedList>

      )}
    </>
  );
}
