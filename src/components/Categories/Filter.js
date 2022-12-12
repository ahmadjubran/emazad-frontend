import {
  Box,
  Button,
  Flex,
  Link,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  UnorderedList,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  IoCarSportOutline,
  IoChevronForward,
  IoEllipsisHorizontalOutline,
  IoHomeOutline,
  IoPawOutline,
  IoPhonePortraitOutline,
  IoShirtOutline,
} from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { useDispatch } from "react-redux";
import categories from "../../assets/categories.json";
import { getItems } from "../../store/actions/itemActions";

export default function Filter() {
  const dispatch = useDispatch();
  const [showSubcategories, setShowSubcategories] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

  const toggleSubcategories = (category) => {
    if (selectedCategory === category) {
      setShowSubcategories(!showSubcategories);
    } else {
      setShowSubcategories(true);
    }
    setSelectedCategory(category);
  };

  const renderSubcategories = (category) => {
    return (
      <UnorderedList listStyleType="none" p="0" m="0">
        {category.subcategories.map((subcategory, index) => (
          <ListItem
            key={index}
            fontSize="sm"
            fontWeight="bold"
            textTransform="capitalize"
            cursor="pointer"
            onClick={() => toggleSubcategories(category.name)}
            position="relative"
            borderBottom="1px solid #e2e8f0"
            p="2"
            _hover={{ bg: "#e2e8f0", color: "teal.500" }}
          >
            <Box
              ml="8"
              onClick={() => {
                getItems(dispatch, "active", category.name, subcategory);
                toggleSubcategories("");
              }}
              fontSize="sm"
              fontWeight="normal"
              display="flex"
              alignItems="center"
              gap="2"
            >
              <IoChevronForward />
              <Text>{subcategory}</Text>
            </Box>
          </ListItem>
        ))}
      </UnorderedList>
    );
  };
  return isSmallerThan768 ? (
    <Flex justifyContent="space-between" alignItems="center">
      <Text fontSize="4xl" fontWeight="bold" textTransform="uppercase">
        Items
      </Text>
      <Menu>
        <MenuButton as={Button} rightIcon={<MdMenu />}>
          Filter
        </MenuButton>
        <MenuList>
          <MenuItem>Active</MenuItem>
          <MenuItem>Ended</MenuItem>
          <MenuItem>My Items</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  ) : (
    <Box>
      <UnorderedList
        listStyleType="none"
        display="flex"
        flexDirection="column"
        m="0"
        boxShadow="md"
        borderRadius="lg"
        bg="gray.50"
        overflow="hidden"
      >
        {categories.categories.map((category, index) => (
          <ListItem key={index}>
            <Link
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              fontSize="xl"
              borderBottom="1px solid #e2e8f0"
              p="4"
              onClick={() => toggleSubcategories(category.name)}
              textDecoration="none"
              _hover={{ textDecoration: "none", color: "teal.500", bg: "#e2e8f0" }}
            >
              <Flex gap="2" alignItems="center">
                {category.name === "electronics" ? (
                  <IoPhonePortraitOutline />
                ) : category.name === "clothes" ? (
                  <IoShirtOutline />
                ) : category.name === "vehicles" ? (
                  <IoCarSportOutline />
                ) : category.name === "pets" ? (
                  <IoPawOutline />
                ) : category.name === "realestate" ? (
                  <IoHomeOutline />
                ) : category.name === "others" ? (
                  <IoEllipsisHorizontalOutline />
                ) : (
                  <IoEllipsisHorizontalOutline />
                )}
                <Text textTransform="capitalize">{category.name}</Text>
              </Flex>
              <IoChevronForward />
            </Link>
            {showSubcategories && selectedCategory === category.name ? renderSubcategories(category) : null}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
}
