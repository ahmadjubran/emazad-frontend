import { Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { IoNotificationsOutline, IoTimeOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { showTime } from "../../store/actions/generalActions";
import { selectUser } from "../../store/features/authSlicer";
import Title from "../Title";

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

  const markAsRead = (id) => {
    axios
      .put(`${process.env.REACT_APP_HEROKU_API_KEY}/notif/${id}`)
      .then((res) => {
        getNotifications();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Menu>
        <MenuButton onClick={() => getNotifications()} _hover={{ color: "blue.500" }} position="relative">
          <IoNotificationsOutline size="26px" />
          <Text
            fontSize="10px"
            position="absolute"
            top="-5px"
            left="10px"
            bg="red.500"
            color="white"
            w="15px"
            h="15px"
            borderRadius="full"
            textAlign="center"
          >
            {notifications.filter((notification) => notification.status === "unread").length > 9 ? (
              <p>9+</p>
            ) : (
              notifications.filter((notification) => notification.status === "unread").length
            )}
          </Text>
        </MenuButton>
        <MenuList borderRadius="2xl" boxShadow="md" px="4" h="500px" overflowY="scroll" bg="gray.50">
          <Flex flexDirection="column">
            {/* loop through the first 20 notifications */}
            <Heading fontSize="18px" my="2">
              {" "}
              Notifications{" "}
            </Heading>
            {notifications &&
              notifications.slice(0, 20).map((notification) =>
                notification.length === 0 ? (
                  <p>no notifications</p>
                ) : (
                  <Link to={`/item/${notification.itemId}`} style={{ width: "100%" }}>
                    <MenuItem
                      key={notification.id}
                      mb="4"
                      borderRadius="2xl"
                      boxShadow="md"
                      p="4"
                      bg={notification.status === "unread" ? "gray.50" : "gray.200"}
                      border="1px solid"
                      borderColor={notification.status === "unread" ? "gray.200" : "gray.300"}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Flex flexDirection="column">
                        <Text fontSize="14px" mb="5px" color="gray.600">
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
                  </Link>
                )
              )}
          </Flex>
        </MenuList>
      </Menu>
    </div>
  );
}
