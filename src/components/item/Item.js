import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addBid } from "../../store/actions/bidActions";
import { getItem } from "../../store/actions/itemActions";
import { handleRating } from "../../store/actions/ratingActions";
import { selectUser } from "../../store/features/authSlicer";
import { selectItem, selectUserRating } from "../../store/features/itemSlicer";
import Carousel from "./Carousel";
import Comments from "./Comments";
import LastBids from "./LastBids";

export default function Item() {
  const item = useSelector(selectItem);
  const dispatch = useDispatch();
  const { id } = useParams();
  const userRating = useSelector(selectUserRating);
  const user = useSelector(selectUser);

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
    getItem(dispatch, id);
  }, [dispatch, id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(timeLeft);
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  const renderStars = (rating) => {
    const stars = [];
    let star;
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) star = IoStar;
      else if (i === Math.ceil(rating) && !Number.isInteger(rating)) star = IoStarHalf;
      else star = IoStarOutline;

      stars.push(
        <Box
          key={i}
          as={star}
          color="gray.500"
          _hover={{ color: "teal.500" }}
          display="inline"
          cursor="pointer"
          onClick={() => handleRating(dispatch, i, item.userId, userRating)}
        />
      );
    }
    return stars;
  };

  return (
    <Box>
      <Flex
        direction="column"
        bg="white"
        borderRadius="lg"
        overflow="hidden"
        pb="4"
        gap="2"
        flexDir={{ base: "column", md: "row" }}
      >
        <Box w="100%" h="100%" bg="white" p="4">
          <Carousel itemImages={item.itemImage} />
        </Box>

        <Box
          w="100%"
          h="100%"
          bg="white"
          p="4"
          display="flex"
          alignItems="start"
          justifyContent="center"
          flexDir="column"
        >
          <Box display="flex" gap="4">
            <Image src={item.User && item.User.image} w="50px" h="50px" borderRadius="full" bg="gray.100" />
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                {item.User && item.User.fullName}
              </Text>
              <Text fontSize="md">
                {renderStars(userRating.averageRating)} ({userRating.countRating})
              </Text>
            </Box>
          </Box>
          <Text fontSize="xl" fontWeight="bold" textAlign="center">
            {item.itemTitle}
          </Text>
          <Text fontSize="md" textAlign="center">
            {item.itemDescription}
          </Text>
          <Text fontSize="md" textAlign="center">
            {item.category}
          </Text>
          <Text fontSize="md" textAlign="center">
            {item.subCategory}
          </Text>
          <Text fontSize="md" textAlign="center">
            {item.itemCondition}
          </Text>
          <Text fontSize="md" textAlign="center">
            {item.latestBid ? item.latestBid : item.initialPrice}
          </Text>
          <Text fontSize="md" textAlign="center">
            {timeLeft(item).days}d {timeLeft(item).hours}h {timeLeft(item).minutes}m {timeLeft(item).seconds}s
          </Text>
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={() =>
              addBid(
                dispatch,
                item.id,
                item.latestBid !== 0
                  ? Math.ceil(item.latestBid + item.initialPrice * 0.01)
                  : Math.ceil(item.initialPrice + item.initialPrice * 0.01)
              )
            }
            disabled={user === null}
          >
            Bid Now{" "}
            {item.latestBid !== 0
              ? Math.ceil(item.latestBid + item.initialPrice * 0.01)
              : Math.ceil(item.initialPrice + item.initialPrice * 0.01)}
            $
          </Button>
        </Box>
      </Flex>
      <Flex
        bg="white"
        borderRadius="lg"
        overflow="hidden"
        pb="4"
        gap="2"
        flexDir={{ base: "column", md: "row" }}
        justify="space-around"
      >
        <Comments item={item} />
        <LastBids item={item} />
      </Flex>
    </Box>
  );
}
