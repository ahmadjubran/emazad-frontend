import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

export default function LastBids({ item }) {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Last bids
      </Text>
      {item.Bids &&
        item.Bids.slice(-8)
          .reverse()
          .map((bid) => (
            <Flex key={bid.id} mb="4">
              <Image src={bid.User.image} alt={bid.User.fullName} w="10" h="10" borderRadius="full" objectFit="cover" />
              <Box ml="2">
                <Text fontSize="md" fontWeight="bold">
                  {bid.User.fullName}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {bid.bidprice}$
                </Text>
              </Box>
            </Flex>
          ))}
    </Box>
  );
}
