import { FiBell } from "react-icons/fi";
import {
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Notifications() {
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

  return (
    <div>
      <IconButton size="lg" variant="ghost" aria-label="open menu" ft={"2px"} icon={<FiBell />} onClick={notiButton} />

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Notifications</DrawerHeader>
          <DrawerBody>
            {notifications.map((notification) => (
              <div key={notification.id}>
                <Box bg={"#D7D7D9"} borderRadius={"10px"} margin={"8px"} textAlign={"center"}>
                  {notification.notiMessage}
                </Box>
              </div>
            ))}
            <DrawerCloseButton />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

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
