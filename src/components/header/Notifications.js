import { FiBell } from "react-icons/fi";
import {
  IconButton,
  useDisclosure,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Avatar,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { ItemContent } from "./NitificationContent";
export default function Notifications(props) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // render the notifications in the drawer right after the component mounts
  useEffect(() => {
    getNotifications();
    setNotifications(notifications);
  }, []);

  const getNotifications = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/usernotif/1`);
      // bring up the first 10 notifications
      setNotifications(response.data.slice(0, 10));
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const notiButton = () => {
    onOpen();
    getNotifications();
  };
  const {
    fixed,
    scrolled,
    secondary,
  } = props;
  
  // Chakra Color Mode
  let navbarIcon =
    fixed && scrolled
      ? ("black.700", "black.200")
      : ("white", "black.200");
  let menuBg = ("white", "navy.800");
  if (secondary) {
    navbarIcon = "white";
  }
  return (
    <div>
      
      <Menu>
        <MenuButton onClick={notiButton}>
          <BellIcon color={navbarIcon} w='18px' h='18px' />
        </MenuButton>
        <MenuList p='16px 8px' bg={menuBg}>
          <Flex flexDirection='column'>
           
            {notifications.map((notification, key) => (
                <MenuList p='16px 8px' bg={menuBg} key={key}>
                <Flex flexDirection='column'>
                <MenuItem borderRadius='8px' mb='10px' key={notification.id}>
                  <ItemContent
                    time='13 minutes ago'
                    info='from Alicia'
                    boldInfo={notification.notiMessage}
                    aName='Alicia'
                    aSrc={<Avatar boxSize='2em'> 
                  </Avatar>}
                  />
                </MenuItem>
                </Flex>
              </MenuList>
            //    <MenuList p='16px 8px' bg={menuBg}>
            //    <Flex flexDirection='column'>
            //      <MenuItem borderRadius='8px' mb='10px'>
            //        <ItemContent
            //          time='13 minutes ago'
            //          info='from Alicia'
            //          boldInfo='New Message'
            //          aName='Alicia'
            //          aSrc={<Avatar boxSize='2em'></Avatar>}
            //        />
            //      </MenuItem>
            //      <MenuItem borderRadius='8px' mb='10px'>
            //        <ItemContent
            //          time='2 days ago'
            //          info='by Josh Henry'
            //          boldInfo='New Album'
            //          aName='Josh Henry'
            //          aSrc={<Avatar boxSize='2em'></Avatar>}
            //        />
            //      </MenuItem>
            //      <MenuItem borderRadius='8px'>
            //        <ItemContent
            //          time='3 days ago'
            //          info='Payment succesfully completed!'
            //          boldInfo=''
            //          aName='Kara'
            //          aSrc={<Avatar boxSize='2em'></Avatar>}
            //        />
            //      </MenuItem>
            //    </Flex>
            //  </MenuList>
              ))}
          </Flex>
        </MenuList>
      </Menu>

      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      {notifications.map((notification) => (
        <div key={notification.id}>
          <p>{notification.message}</p>
        </div>
      ))}
    </div>
  );
}

// import { FiBell } from "react-icons/fi";
// import {
//   IconButton,
//   useDisclosure,
//   Drawer,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerHeader,
//   DrawerBody,
//   DrawerCloseButton,
//   Box,
// } from "@chakra-ui/react";
// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function Notifications() {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   // render the notifications in the drawer right after the component mounts
//   useEffect(() => {
//     getNotifications();
//     setNotifications(notifications);
//   }, []);

//   const getNotifications = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/usernotif/1`);
//       // bring up the first 10 notifications
//       setNotifications(response.data.slice(0, 10));
//     } catch (error) {
//       setError(error);
//     }
//     setLoading(false);
//   };

//   const notiButton = () => {
//     onOpen();
//     getNotifications();
//   };

//   return (
//     <div>
//       <IconButton size="lg" variant="ghost" aria-label="open menu" ft={"2px"} icon={<FiBell />} onClick={notiButton} />

//       <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
//         <DrawerOverlay />
//         <DrawerContent>
//           <DrawerHeader borderBottomWidth="1px">Notifications</DrawerHeader>
//           <DrawerBody>
//             {notifications.map((notification) => (
//               <div key={notification.id}>
//                 <Box bg={"#D7D7D9"} borderRadius={"10px"} margin={"8px"} textAlign={"center"}>
//                   {notification.notiMessage}
//                 </Box>
//               </div>
//             ))}
//             <DrawerCloseButton />
//           </DrawerBody>
//         </DrawerContent>
//       </Drawer>

//       {loading && <p>Loading...</p>}
//       {error && <p>Something went wrong</p>}
//       {notifications.map((notification) => (
//         <div key={notification.id}>
//           <p>{notification.message}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
