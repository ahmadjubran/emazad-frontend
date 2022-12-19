import { Box, Flex, Grid } from "@chakra-ui/react";
import React from "react";
import Filter from "./Filter";
import ItemsList from "./ItemsList";

export default function Items() {
    return (
        <Flex direction="column" p="6" justifyContent="center" gap="8" px={{ base: "0", md: "6" }} bg="gray.100">
            <Box>
                <Grid templateColumns={{ base: "1fr", md: "1fr", lg: "1fr 4fr" }} gap={6} alignItems="start">
                    <Filter />
                    <ItemsList />
                </Grid>
            </Box>
        </Flex>
    );

}
