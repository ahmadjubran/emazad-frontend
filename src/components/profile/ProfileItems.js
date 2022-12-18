import { Badge, Box, Button, Flex, Grid, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProfileActiveItems({ items }) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const timeLeft = (item) => {
    const now = new Date().getTime();
    const end = new Date(item.endDate).getTime();
    const distance = end - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(timeLeft);
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  const renderTimeLeft = (item, time) => {
    return (
      <Box
        w="100%"
        h="100%"
        p="2"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
        border="1px solid"
        borderColor="gray.300"
        borderRadius="lg"
      >
        <Text fontSize="md" color="gray.500">
          {time === "days" ? "Days" : time === "hours" ? "Hours" : time === "minutes" ? "Minutes" : "Seconds"}
        </Text>
        <Text fontSize="xl" fontWeight="bold">
          {timeLeft(item)[time]}
        </Text>
      </Box>
    );
  };

  return (
    <Grid
      templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }}
      gap={6}
      m="10"
    >
      {items.length > 0 ? (
        items.map((item) => (
          <Box key={item.id} boxShadow="lg" borderRadius="lg" p="5">
            <Flex alignItems="center" justifyContent="center" gap="2">
              <Box w="100%" h="100%">
                <Image
                  src={item.itemImage[0]}
                  borderRadius="lg"
                  alt={item.itemTitle}
                  w="100%"
                  objectFit="cover"
                  h="250px"
                  mb="1em"
                />

                <Heading fontSize="xl" fontWeight="bold" textTransform="capitalize">
                  {item.itemTitle}
                  <Badge
                    ml="1"
                    fontSize="sm"
                    colorScheme={item.itemCondition === "New" ? "green" : "yellow"}
                    p="1"
                    borderRadius="xl"
                  >
                    {item.itemCondition}
                  </Badge>
                </Heading>

                <Text fontSize="xs" color="gray.500" textTransform="uppercase" mt="2">
                  {item.category} - {item.subCategory}
                </Text>
              </Box>
            </Flex>

            <Text fontSize="md" whiteSpace="pre-line" mt="4" wordBreak="break-word" noOfLines={2}>
            {item.itemDescription}
            </Text>

            <Flex w="100%" alignItems="center" justifyContent="space-between" gap="4" p="4">
              {renderTimeLeft(item, "days")}
              {renderTimeLeft(item, "hours")}
              {renderTimeLeft(item, "minutes")}
              {renderTimeLeft(item, "seconds")}
            </Flex>

            <Flex w="100%" mt="4" alignItems="center" justifyContent="space-between" gap="4" h="75px">
              <Box
                w="100%"
                h="100%"
                p="2"
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="2"
                >

            <Box w="100%" h="100%">

              <Image 
              src={item.itemImage[0]} 
              borderRadius="lg" 
              alt={item.itemTitle}
              w="100%"
              objectFit="cover"
              h="250px"
              mb= "1em"
              />

              <Heading fontSize="xl" fontWeight="bold" textTransform="capitalize">
                {item.itemTitle}
                <Badge ml="1" fontSize="sm" colorScheme={item.itemCondition === "New" ? "green" : "yellow"} p="1" borderRadius="xl">
                  {item.itemCondition}
                </Badge>
              </Heading>

              <Text fontSize="xs" color="gray.500" textTransform="uppercase" mt="2">
                {item.category} - {item.subCategory}
              </Text>
              
            </Box>

          </Flex>

          <Text fontSize="md" whiteSpace="pre-line" mt="4">
            {item.itemDescription}
          </Text>



          {/* <Flex w="100%" mt="4" alignItems="center" justifyContent="space-between" gap="4">
            {renderTimeLeft("days")}
            {renderTimeLeft("hours")}
            {renderTimeLeft("minutes")}
            {renderTimeLeft("seconds")}
          </Flex> */}

          <Flex w="100%" mt="4" alignItems="center" justifyContent="space-between" gap="4" h="75px">
            <Box
              w="100%"
              h="100%"
              p="2"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDir="column"
              bg="gray.200"
              borderRadius="lg"
            >

              <Text fontSize="md" color="gray.500">
                {item.latestBid !== 0 ? "Current Bid" : "Starting Bid"}
              </Text>

              <Text fontSize="xl" fontWeight="bold">
                {item.latestBid !== 0 ? item.latestBid : item.initialPrice}$
              </Text>

            </Box>

            <Box h="100%" bg="gray.200" borderRadius="lg">
              <Link to={`/item/${item.id}`} >
                <Button h='100%' w="100%" variant="primary">View Item Page to Bid</Button>
              </Link>
            </Box>



          </Flex>
          </Box>
        ))
      ) : (
        <p>No items</p>
      )}
    </Grid>
  );
}

export default ProfileActiveItems;
