import { Flex, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { IoNotificationsOutline, IoTimeOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { showTime } from "../../store/actions/generalActions";
import { selectUser } from "../../store/features/authSlicer";

export default function Notifications(props) {
  const [notifications, setNotifications] = useState([]);
  const user = useSelector(selectUser);

  const getNotifications = () => {
    axios
      .get(`${process.env.REACT_APP_HEROKU_API_KEY}/usernotif/${user.id}`)
      .then((res) => {
        setNotifications(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Menu>
        <MenuButton onClick={() => getNotifications()} _hover={{ color: "blue.500" }}>
          <IoNotificationsOutline size="26px" />
        </MenuButton>
        <MenuList borderRadius="2xl" boxShadow="md" p="4" h="500px" overflowY="scroll">
          <Flex flexDirection="column">
            {/* loop through the first 20 notifications */}
            {notifications &&
              notifications.slice(0, 20).map((notification) =>
                notification.length === 0 ? (
                  <p>No notifications</p>
                ) : (
                  <MenuItem key={notification.id} mb="4" borderRadius="2xl" boxShadow="md" p="4" bg="gray.100">
                    <Flex flexDirection="column">
                      <Text fontSize="14px" mb="5px" color="gray.700">
                        <b>{notification.notiMessage}</b>
                      </Text>
                      <Flex alignItems="center" gap="1">
                        <IoTimeOutline color="gray.500" w="13px" h="13px" me="3px" />
                        <Text fontSize="xs" lineHeight="100%" color="gray.500">
                          {showTime(notification.createdAt)}
                        </Text>
                      </Flex>
                    </Flex>
                  </MenuItem>
                )
              )}
          </Flex>
        </MenuList>
      </Menu>
    </div>
  );
}
