import { Avatar, Badge, Box, Button, Flex, Grid, GridItem, Heading, Image, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addBid } from "../../store/actions/bidActions";
import { timeLeft } from "../../store/actions/generalActions";
import { getItem } from "../../store/actions/itemActions";
import { selectIsAuth } from "../../store/features/authSlicer";
import RenderTimeLeft from "../../utils/RenderTimeLeft";

function ProfileActiveItems({ items }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const isAuth = useSelector(selectIsAuth);

  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(timeLeft);
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
      {items.length > 0 ? (
        items.map((item) => (
          <GridItem key={item.id}>
            <Flex
              boxShadow="md"
              border="1px solid"
              borderColor="gray.300"
              justifyContent="space-between"
              flexDirection="column"
              bg="gray.50"
              borderRadius="lg"
              w="full"
              h="full"
              overflow="hidden"
              flex={1}
            >
              <Box w="full" h="15rem">
                <Link
                  to={`/item/${item.id}`}
                  style={{ width: "100%" }}
                  onClick={() => {
                    getItem(dispatch, item.id);
                    window.scrollTo(0, 0);
                  }}
                >
                  <Image
                    src={
                      item.itemImage[0].startsWith("http")
                        ? item.itemImage[0]
                        : `${process.env.REACT_APP_HEROKU_API_KEY}/${item.itemImage[0].split("/").pop()}`
                    }
                    alt="carousel"
                    objectFit="cover"
                    w="full"
                    h="15rem"
                  />
                </Link>
              </Box>
              <Flex justifyContent="space-between" w="100%" mt="4" px="4" flexDir="column">
                <Heading as="h3" fontWeight="bold" textTransform="capitalize" lineHeight="1" fontSize="lg">
                  {item.itemTitle}
                  <Badge
                    ml="1"
                    fontSize="sm"
                    colorScheme={item.itemCondition === "New" ? "blue" : "yellow"}
                    p="1"
                    borderRadius="xl"
                  >
                    {item.itemCondition}
                  </Badge>
                </Heading>
                <Text fontSize="xs" color="gray.500" textTransform="uppercase">
                  {item.category} - {item.subCategory}
                </Text>
                <Text fontSize="sm" mt="2" noOfLines={2} wordBreak="break-word" whiteSpace="pre-wrap" h="2.5rem">
                  {item.itemDescription}
                </Text>
              </Flex>
              <Flex w="100%" alignItems="center" justifyContent="space-between" gap="4" p="2">
                <RenderTimeLeft item={item} time="days" />
                <RenderTimeLeft item={item} time="hours" />
                <RenderTimeLeft item={item} time="minutes" />
                <RenderTimeLeft item={item} time="seconds" />
              </Flex>
              {item.status === "sold" ? (
                <Flex justifyContent="center" alignItems="center" w="full" h="full" p="2">
                  <Box
                    p="4"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg={item.latestBid === 0 ? "red.100" : "blue.100"}
                    borderRadius="lg"
                    border="1px solid"
                    borderColor={item.latestBid === 0 ? "red.200" : "blue.200"}
                    boxShadow="md"
                    gap="2"
                    w="full"
                    h="full"
                  >
                    {item.latestBid !== 0 ? (
                      <>
                        <Link
                          to={`/profile/${item.Bids && item.Bids[0].User.id}`}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          <Avatar
                            size="md"
                            name={item.Bids && item.Bids[0].User.fullName}
                            src={item.Bids && item.Bids[0].User.image}
                            border="1px solid"
                            borderColor="gray.300"
                            filter="grayscale(100%)"
                            _hover={{ filter: "grayscale(0%)" }}
                          />
                        </Link>
                        <Text fontSize="sm" color="gray.500">
                          <Link
                            to={`/profile/${item.Bids && item.Bids[0].User.id}`}
                            onClick={() => window.scrollTo(0, 0)}
                          >
                            <Text
                              as="span"
                              fontWeight="bold"
                              color="gray.700"
                              textTransform="capitalize"
                              _hover={{ color: "blue.500" }}
                            >
                              {item.Bids && item.Bids[0].User.fullName}
                            </Text>
                          </Link>{" "}
                          won this item with a bid of{" "}
                          <Text as="span" fontWeight="bold" color="gray.700">
                            ${item.latestBid}
                          </Text>
                        </Text>
                      </>
                    ) : (
                      <Text>Didn't get any bids</Text>
                    )}
                  </Box>
                </Flex>
              ) : (
                <>
                  <Flex
                    w="100%"
                    mt="4"
                    alignItems="center"
                    justifyContent="space-between"
                    gap="4"
                    h="75px"
                    px="2"
                    my="2"
                  >
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
                    <Link
                      to={`/item/${item.id}`}
                      onClick={() => window.scrollTo(0, 0)}
                      style={{ width: "100%", height: "100%" }}
                    >
                      <Box
                        w="full"
                        h="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="gray.300"
                        boxShadow="md"
                        cursor="pointer"
                        _hover={{ bg: "gray.100" }}
                      >
                        <Text fontSize="lg" color="blue.500" textTransform="uppercase" fontWeight="bold">
                          Go to Item
                        </Text>
                      </Box>
                    </Link>
                  </Flex>
                </>
              )}
            </Flex>
          </GridItem>
        ))
      ) : (
        <>
          <Text></Text>
          <Text fontSize="3xl" color="gray.500" textAlign="center" w="full" h="full" pb="32" pt="4">
            No Items
          </Text>
        </>
      )}
    </Grid>
  );
}

export default ProfileActiveItems;
