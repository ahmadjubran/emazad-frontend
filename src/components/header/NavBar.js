import logo from "../../assets/logo.png";
import NavLinks from "./NavLinks";

import {
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";


export default function NavBar() {

  const [isLessThan768] = useMediaQuery("(max-width: 768px)");
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {isLargerThan768 && (
        <Flex
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding="20px"
          width="100%"
          height="100px"
          backgroundColor="#f5f5f5"
        >
          <Link to="/">
            <img src={logo} alt="logo" width="75px" />
          </Link>

          <NavLinks />

        </Flex>
      )}

      {isLessThan768 && (
        <Flex
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding="20px"
          width="100%"
          height="100px"
          backgroundColor="#f5f5f5"
        >
          <div className="nav-logo">
            <img src={logo} alt="logo" width="75px" />
          </div>
          <GiHamburgerMenu size="2em" onClick={onOpen} />
          <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader borderBottomWidth="1px">eMazad</DrawerHeader>
              <DrawerBody>
                <DrawerCloseButton />
                <NavLinks />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      )}
    </>
  );
}
