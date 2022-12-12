import { Box, Center, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../store/actions/itemActions";
import { selectItems } from "../store/features/itemSlicer";
import Title from "./Title";

function Categories() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  console.log(items);

  const categorieBox = (category) => {
    return (
      <GridItem>
        <Box
          w="350px"
          h="250px"
          bgImage={`url(https://source.unsplash.com/1600x900/?${category})`}
          bgRepeat="no-repeat"
          bgSize="cover"
          cursor="pointer"
          onClick={() => getItems(dispatch, "active", category)}
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
            {category}
          </Center>
        </Box>
      </GridItem>
    );
  };

  return (
    <Flex direction="column" p="6" justifyContent="center" alignItems="center" bg="gray.100" gap="8">
      {/* <Text
        fontSize="4xl"
        fontWeight="bold"
        cursor="pointer"
        onClick={() => getItems(dispatch)}
        textTransform="uppercase"
      >
        Categories
      </Text> */}
      <Title>Categories</Title>
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
        {categorieBox("electronics")}
        {categorieBox("clothes")}
        {categorieBox("vehicles")}
        {categorieBox("pets")}
        {categorieBox("realestate")}
        {categorieBox("others")}
      </Grid>
    </Flex>
  );
}

export default Categories;
