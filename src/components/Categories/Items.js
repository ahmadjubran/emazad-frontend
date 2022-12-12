import { Box, Flex, Grid, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import Filter from "./Filter";
import ItemsList from "./ItemsList";

export default function Items() {
  const [isGreaterThanOrEqualTo768] = useMediaQuery("(min-width: 768px)");

  return (
    <Flex direction="column" p="6" justifyContent="center" gap="8" mx={{ base: "0", md: "6" }}>
      {isGreaterThanOrEqualTo768 && (
        <Flex justifyContent="center" alignItems="center" fontSize="4xl" fontWeight="bold" textTransform="uppercase">
          Items
        </Flex>
      )}
      <Box>
        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr", lg: "1fr 4fr" }} gap={6} alignItems="start">
          <Filter />
          <ItemsList />
        </Grid>
      </Box>
    </Flex>
  );
}
