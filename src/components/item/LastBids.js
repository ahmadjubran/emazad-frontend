import { Box, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

export default function LastBids({ item, showTime }) {
  return (
    <Box w="100%" border="1px" borderColor="gray.300" borderRadius="2xl" boxShadow="md" bg="gray.200" pt="4">
      <Heading
        as="h3"
        size="md"
        pb="4"
        pl="4"
        textTransform="uppercase"
        borderBottom="1px solid"
        borderColor="gray.300"
      >
        Latest Bids
      </Heading>
      <VStack m="4">
        <Flex
          alignItems="center"
          gap="2"
          w="100%"
          borderBottom="1px solid"
          borderColor="gray.300"
          pb="4"
          justifyContent="space-between"
          fontSize="md"
          fontWeight="bold"
          textTransform="capitalize"
        >
          <Text>User Name</Text>
          <Text>Time</Text>
          <Text>Bid Price</Text>
        </Flex>
      </VStack>
      {item.Bids &&
        item.Bids.slice(0, 9).map((bid) => (
          <VStack key={bid.id} mx="4">
            <Flex
              alignItems="center"
              w="100%"
              // add border bottom to the first 8 bids
              borderBottom={bid.id === item.Bids[8].id ? "none" : "1px solid"}
              borderColor="gray.300"
              py="2"
              justifyContent="space-between"
            >
              <Flex alignItems="center" gap="2">
                <Image
                  src={bid.User.image}
                  alt={bid.User.fullName}
                  w="10"
                  h="10"
                  borderRadius="full"
                  objectFit="cover"
                />
                <Text fontSize="md" fontWeight="bold" textTransform="capitalize">
                  {bid.User.fullName}
                </Text>
              </Flex>
              <Text fontSize="sm" color="gray.500">
                {showTime(bid.createdAt)}
              </Text>
              <Text fontSize="lg" fontWeight="bold" color="green.500">
                {bid.bidprice}$
              </Text>
            </Flex>
          </VStack>
        ))}
    </Box>
  );
}
