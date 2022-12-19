import logo from "../../assets/logo.png";
import Nav from "./Nav";

import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useDisclosure,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Header() {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack w="100%" h="100%" bg="gray.100" pt="1rem">
      <Flex display="flex" justifyContent="space-between" alignItems="center" width="100%" height="100px" px="5%">
        <Link to="/">
          <img src={logo} alt="logo" width="100px" />
        </Link>
        {isLargerThan768 ? (
          <Nav />
        ) : (
          <>
            <IoMenu size="3rem" onClick={onOpen} />
            <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent bg="gray.100">
                <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
                <DrawerBody>
                  <DrawerCloseButton />
                  <Nav />
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        )}
      </Flex>
    </VStack>
  );
}
