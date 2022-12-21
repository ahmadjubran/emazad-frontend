import { Box, Flex, useMediaQuery, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { timeLeft } from "../../../store/actions/generalActions";
import { getItem } from "../../../store/actions/itemActions";
import { selectItem } from "../../../store/features/itemSlicer";
import Carousel from "./Carousel";
import Comments from "./Comments";
import ItemDetails from "./ItemDetails";
import LastBids from "./LastBids";

export default function Item() {
  const item = useSelector(selectItem);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    getItem(dispatch, id);
  }, [dispatch, id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(timeLeft);
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <VStack w="100%" h="100%" bg="gray.100" p="4" spacing="4">
      <Flex
        direction="column"
        borderRadius="lg"
        overflow="hidden"
        pb="4"
        gap="2"
        flexDir={{ base: "column", md: "row" }}
        w={{ base: "100%", md: "80%" }}
      >
        <Box w="100%" h="100%" p="4" display="flex" alignItems="center" justifyContent="center">
          <Carousel itemImages={item.itemImage} />
        </Box>

        <ItemDetails />
      </Flex>
      <Flex
        w={{ base: "100%", md: "80%" }}
        flexDir={{ base: "column", md: "row" }}
        h="100%"
        p="4"
        display="flex"
        justifyContent="center"
        gap="4"
      >
        {isLargerThan768 ? (
          <Box w={{ base: "100%", md: "60%" }}>
            <Comments item={item} />
          </Box>
        ) : (
          <Box w={{ base: "100%", md: "40%" }}>
            <LastBids item={item} />
          </Box>
        )}
        {isLargerThan768 ? (
          <Box w={{ base: "100%", md: "40%" }}>
            <LastBids item={item} />
          </Box>
        ) : (
          <Box w={{ base: "100%", md: "60%" }}>
            <Comments item={item} />
          </Box>
        )}
      </Flex>
    </VStack>
  );
}
