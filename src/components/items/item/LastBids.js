import { Box, Flex, Heading, Image, Spacer, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { showTime } from "../../../store/actions/generalActions";

export default function LastBids({ item }) {
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
          w="100%"
          justifyContent="space-between"
          fontSize="md"
          fontWeight="bold"
          textTransform="capitalize"
          px="4"
          gap="16"
        >
          <Text>Bidder</Text>
          <Spacer />
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
              bg="gray.300"
              justifyContent="space-between"
              p="4"
              mb="4"
              borderRadius="3xl"
              boxShadow="md"
            >
              <Flex alignItems="center" gap="2">
                <Link to={`/profile/${bid.User.id}`} onClick={() => window.scrollTo(0, 0)}>
                  <Image
                    src={bid.User.image}
                    alt={bid.User.fullName}
                    w="10"
                    h="10"
                    borderRadius="full"
                    objectFit="cover"
                  />
                </Link>
                <Link to={`/profile/${bid.User.id}`} onClick={() => window.scrollTo(0, 0)}>
                  <Text fontSize="md" fontWeight="bold" textTransform="capitalize">
                    {bid.User.fullName}
                  </Text>
                </Link>
              </Flex>
              <Spacer />
              <Flex alignItems="center" gap="12">
                <Text fontSize="sm" color="gray.500">
                  {showTime(bid.createdAt)}
                </Text>
                <Text fontSize="lg" fontWeight="bold" color="green.500">
                  {bid.bidprice}$
                </Text>
              </Flex>
            </Flex>
          </VStack>
        ))}
    </Box>
  );
}
