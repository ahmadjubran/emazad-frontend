import { Box, Button, Container, Flex, Heading, HStack, Image, Tag, Text, VStack } from "@chakra-ui/react";
import "fontsource-inter/500.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../../App.css";
import { addBid } from "../../../store/actions/bidActions";
import { timeLeft } from "../../../store/actions/generalActions";
import { getItem } from "../../../store/actions/itemActions";
import { getTrendingItems } from "../../../store/actions/itemActions";
import { selectTrendingItems } from "../../../store/features/itemSlicer";
import ChakraCarousel from "./ChakraCarousel";

function SliderCom() {
  const dispatch = useDispatch();
  const trendingItems = useSelector(selectTrendingItems);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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

  useEffect(() => {
    getTrendingItems(dispatch);
  }, [dispatch]);

  return (
    <Container maxW="100%" px="24" m="0" bg="gray.100">
      <Heading as="h2" size="lg" mb="4" mx="auto" textAlign="center">
        Trending
      </Heading>
      <ChakraCarousel gap={32}>
        {trendingItems.slice(0, 11).map((post, index) => (
          <Flex
            key={index}
            boxShadow="md"
            border="1px solid"
            borderColor="gray.300"
            justifyContent="space-between"
            flexDirection="column"
            bg="gray.200"
            borderRadius="lg"
            w="full"
            h="full"
            overflow="hidden"
            flex={1}
          >
            <Box w="full" h="20rem" bg="gray.300">
              <Link to={`/item/${post.id}`} style={{ width: "100%" }} onClick={() => getItem(dispatch, post.id)}>
                <Image
                  src={
                    post.itemImage[0].startsWith("http")
                      ? post.itemImage[0]
                      : `${process.env.REACT_APP_HEROKU_API_KEY}/${post.itemImage[0].split("/").pop()}`
                  }
                  alt="carousel"
                  objectFit={
                    post.itemImage && post.itemImage.width > post.itemImage && post.itemImage.height
                      ? "cover"
                      : "contain"
                  }
                  w="full"
                  h="full"
                />
              </Link>
            </Box>
            <Heading as="h3" size="md" textAlign="center" p="4">
              {post.itemTitle}
            </Heading>
            <Box>
              <Flex w="100%" alignItems="center" justifyContent="space-between" gap="4" p="4">
                {renderTimeLeft(post, "days")}
                {renderTimeLeft(post, "hours")}
                {renderTimeLeft(post, "minutes")}
                {renderTimeLeft(post, "seconds")}
              </Flex>
              <Flex w="100%" alignItems="center" justifyContent="space-between" gap="4" h="75px" px="4" mb="4">
                <Box
                  w="100%"
                  h="100%"
                  p="2"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDir="column"
                  bg="gray.300"
                  borderRadius="lg"
                >
                  <Text fontSize="md" color="gray.500">
                    {post.latestBid !== 0 ? "Current Bid" : "Starting Bid"}
                  </Text>
                  <Text fontSize="xl" fontWeight="bold">
                    {post.latestBid !== 0 ? post.latestBid : post.initialPrice}$
                  </Text>
                </Box>
                <Button
                  w="100%"
                  h="100%"
                  colorScheme="teal"
                  variant="outline"
                  boxShadow="md"
                  onClick={() =>
                    addBid(
                      dispatch,
                      post.id,
                      post.latestBid !== 0
                        ? Math.ceil(post.latestBid + post.initialPrice * 0.01)
                        : Math.ceil(post.initialPrice + post.initialPrice * 0.01)
                    )
                  }
                >
                  <Flex alignItems="center" justifyContent="center" w="100%" h="100%" flexDir="column">
                    <Text fontSize="md" color="gray.500" mb="2">
                      Bid Now
                    </Text>
                    <Text fontSize="xl" fontWeight="bold">
                      {post.latestBid !== 0
                        ? Math.ceil(post.latestBid + post.initialPrice * 0.01)
                        : Math.ceil(post.initialPrice + post.initialPrice * 0.01)}
                      $
                    </Text>
                  </Flex>
                </Button>
              </Flex>
            </Box>
          </Flex>
        ))}
      </ChakraCarousel>
    </Container>
  );
}

export default SliderCom;
