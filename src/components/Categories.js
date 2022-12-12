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
    <Flex direction="column" p="6" justifyContent="center" alignItems="center" bg="gray.100" gap="8">
      <Text
        fontSize="4xl"
        fontWeight="bold"
        cursor="pointer"
        onClick={() => getItems(dispatch)}
        textTransform="uppercase"
      >
        Categories
      </Text>
      <Title>Categories</Title>
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
        {categories.categories.map((category, index) => (
          <GridItem key={index}>
            <Link
              to={`/items`}
              onClick={() => {
                getItems(dispatch, "active", category.name);
              }}
            >
              <Box
                w={{ base: "300px", md: "350px", lg: "400px" }}
                h={{ base: "150px", md: "200px", lg: "250px" }}
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
                  {category.name}
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
