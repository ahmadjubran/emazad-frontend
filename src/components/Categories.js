import { Box, Center, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import categories from "../assets/categories.json";
import { getItems } from "../store/actions/itemActions";
import Title from "./Title";

function Categories() {
  const dispatch = useDispatch();

  return (
    <Flex direction="column" p="6" justifyContent="center" alignItems="center" bg="gray.100" gap="8" w="100%">
      <Title>Categories</Title>
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6} w="90%">
        {categories.categories.map((category, index) => (
          <GridItem key={index} w="100%">
            <Link
              to={`/items`}
              onClick={() => {
                localStorage.setItem("category", category.name);
                localStorage.setItem("subCategory", "All");
                getItems(dispatch, "active", category.name);
                window.scrollTo(0, 0);
              }}
            >
              <Box
                w="100%"
                h="15rem"
                bgImage={`url(${category.image})`}
                bgRepeat="no-repeat"
                bgSize="cover"
                borderRadius="lg"
                overflow="hidden"
                opacity="0.9"
                _hover={{ opacity: "1", transition: "0.3s" }}
              >
                <Center
                  w="100%"
                  h="100%"
                  bg="rgba(0,0,0,0.5)"
                  color="white"
                  fontSize="2xl"
                  fontWeight="bold"
                  textTransform="capitalize"
                >
                  {category.display}
                </Center>
              </Box>
            </Link>
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
}

export default Categories;
