import { ListItem, UnorderedList, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Norifications from "./Notifications";
import UserMenu from "./UserMenu";

export default function Nav() {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [currentTab, setCurrentTab] = useState("home");

  const currentTabHandler = (tab) => {
    return (
      <ListItem
        color={currentTab === tab ? "blue.500" : "gray.500"}
        fontWeight={currentTab === tab ? "semibold" : "normal"}
        p={2}
        _hover={{ bg: "gray.100" }}
        textTransform="capitalize"
        onClick={() => {
          setCurrentTab(tab);
          localStorage.removeItem("category");
          localStorage.removeItem("subCategory");
        }}
      >
        <Link to={`/${tab === "home" ? "" : tab}`}>{tab === "categories" ? "auctions" : tab}</Link>
      </ListItem>
    );
  };

  return (
    <UnorderedList
      display="flex"
      listStyleType="none"
      gap="20px"
      alignItems="center"
      flexDirection={isLargerThan768 ? "row" : "column"}
    >
      {currentTabHandler("home")}
      {currentTabHandler("categories")}
      {currentTabHandler("contact")}
      {currentTabHandler("about")}

      {isAuth ? (
        <>
          <ListItem color="gray.500">
            <Norifications />
          </ListItem>
          <ListItem color="gray.500">
            <UserMenu setCurrentTab={setCurrentTab} />
          </ListItem>
        </>
      ) : (
        <ListItem
          color="gray.500"
          fontWeight="normal"
          p={2}
          borderRadius="md"
          _hover={{ bg: "gray.100", color: "blue.500" }}
        >
          <Link to="/login">Login</Link>
        </ListItem>
      )}
    </UnorderedList>
  );
}
