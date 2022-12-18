import { Box, Flex, Link, ListItem, Text, UnorderedList } from "@chakra-ui/react";
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
import { useDispatch } from "react-redux";
import categories from "../../assets/categories.json";
import { getItems } from "../../store/actions/itemActions";

export default function Filter() {
  const dispatch = useDispatch();
  const [showSubcategories, setShowSubcategories] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

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
            borderBottom="1px solid"
            borderColor="gray.200"
            p="2"
            _hover={{ bg: "gray.100", color: "blue.500" }}
          >
            <Box
              ml="8"
              onClick={() => {
                getItems(dispatch, "active", category.name, subcategory);
                toggleSubcategories("");
                localStorage.setItem("category", category.name);
                localStorage.setItem("subCategory", subcategory);
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

  return (
    <Box>
      <Box
        p="4"
        bg="gray.50"
        borderRadius="lg"
        mb="4"
        border="1px solid"
        borderColor="gray.300"
        boxShadow="md"
        onClick={() => {
          getItems(dispatch, "active");
          localStorage.removeItem("category");
          localStorage.removeItem("subCategory");
        }}
        cursor="pointer"
      >
        <Text fontSize="4xl" fontWeight="bold" textTransform="uppercase" lineHeight="1.2">
          Items
        </Text>
      </Box>

      <UnorderedList
        listStyleType="none"
        display="flex"
        flexDirection="column"
        m="0"
        boxShadow="md"
        borderRadius="lg"
        bg="gray.50"
        border="1px solid"
        borderColor="gray.300"
        overflow="hidden"
      >
        {categories.categories.map((category, index) => (
          <ListItem key={index}>
            <Link
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              fontSize="md"
              borderBottom={index === categories.categories.length - 1 ? "none" : "1px solid"}
              borderColor="gray.300"
              p="4"
              onClick={() => toggleSubcategories(category.name)}
              textDecoration="none"
              _hover={{ textDecoration: "none", color: "blue.500", bg: "gray.100" }}
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
                <Text textTransform="capitalize">{category.display}</Text>
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
