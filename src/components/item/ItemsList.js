import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Spacer,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addBid } from "../../store/actions/bidActions";
import { timeLeft } from "../../store/actions/generalActions";
import { getItem, getItems } from "../../store/actions/itemActions";
import { selectItems } from "../../store/features/itemSlicer";

export default function ItemsList() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const [category, setCategory] = useState(localStorage.getItem("category"));
  const [subCategory, setSubCategory] = useState(localStorage.getItem("subCategory"));
  const [statusStyle, setStatusStyle] = useState("active");

  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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
    const interval = setInterval(() => {
      setCountdown(timeLeft);
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    setCategory(localStorage.getItem("category"));
    setStatusStyle("active");
    setSubCategory(localStorage.getItem("subCategory"));
  }, [localStorage.getItem("category"), localStorage.getItem("subCategory")]);

  const renderStatus = (status) => {
    return (
      <Button
        color={statusStyle === status ? "blue.500" : "gray.500"}
        p="0"
        bg="transparent"
        textTransform="capitalize"
        _hover={{ color: "blue.500", bg: "transparent" }}
        _active={{ color: "blue.500", bg: "transparent" }}
        onClick={() => {
          getItems(dispatch, status, localStorage.getItem("category"), localStorage.getItem("subCategory"));
          setStatusStyle(status);
        }}
      >
        {status === "standby" ? "upcoming" : status}
      </Button>
    );
  };

  return (
    <Box>
      <UnorderedList
        display="flex"
        justifyContent="start"
        listStyleType="none"
        m="0"
        mb="4"
        bg="gray.50"
        p="4"
        alignItems="left"
        gap="4"
        borderRadius="lg"
        boxShadow="md"
        border="1px solid"
        borderColor="gray.300"
      >
        <Flex textTransform="uppercase" alignItems="center" gap="2" color="gray.500" fontSize="md">
          <Text
            _hover={{ color: "blue.500" }}
            onClick={() => {
              localStorage.setItem("subCategory", "All");
              getItems(dispatch, "active", category);
              setSubCategory("All");
              setStatusStyle("active");
            }}
            cursor="pointer"
          >
            {category === null ? "All" : category}
          </Text>{" "}
          {subCategory === "All" ? null : subCategory === null ? null : <IoArrowForward />}
          {subCategory === "All" ? null : subCategory === null ? null : subCategory}
        </Flex>
        <Spacer />
        {renderStatus("active")}
        <Text color="gray.500" alignSelf="center" fontSize="2xl" fontWeight="light" m="0" p="0">
          |
        </Text>
        {renderStatus("standby")}
        <Text color="gray.500" alignSelf="center" fontSize="2xl" fontWeight="light">
          |
        </Text>
        {renderStatus("sold")}
      </UnorderedList>
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
        {items.length > 0
          ? items.map((item) => (
              <GridItem key={item.id}>
                <Flex
                  key={item.id}
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
                  <Box h="15rem" bg="gray.300">
                    <Link to={`/item/${item.id}`} onClick={() => getItem(dispatch, item.id)}>
                      <Image
                        src={
                          item.itemImage[0].startsWith("http")
                            ? item.itemImage[0]
                            : `${process.env.REACT_APP_HEROKU_API_KEY}/${item.itemImage[0].split("/").pop()}`
                        }
                        alt="carousel"
                        objectFit={
                          item.itemImage && item.itemImage.width > item.itemImage && item.itemImage.height
                            ? "cover"
                            : "contain"
                        }
                        w="full"
                        h="full"
                      />
                    </Link>
                  </Box>
                  <Flex justifyContent="space-between" mt="4" px="2" flexDir="column">
                    <Heading as="h3" fontWeight="bold" textTransform="capitalize" lineHeight="1" fontSize="lg">
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
                    <Text fontSize="xs" color="gray.500" textTransform="uppercase">
                      {item.category} - {item.subCategory}
                    </Text>
                    <Text fontSize="sm" mt="2" noOfLines={2} wordBreak="break-word" whiteSpace="pre-wrap">
                      {item.itemDescription}
                    </Text>
                  </Flex>
                  <Flex alignItems="center" justifyContent="space-between" gap="4" px="2" py="4">
                    {renderTimeLeft(item, "days")}
                    {renderTimeLeft(item, "hours")}
                    {renderTimeLeft(item, "minutes")}
                    {renderTimeLeft(item, "seconds")}
                  </Flex>
                  <Box>
                    <Flex alignItems="center" justifyContent="space-between" gap="4" h="75px" px="2" mb="4" w="full">
                      <Box
                        h="100%"
                        p="2"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexDir="column"
                        bg="gray.300"
                        borderRadius="lg"
                        w="full"
                      >
                        <Text fontSize="md" color="gray.500">
                          {item.latestBid !== 0 ? "Current Bid" : "Starting Bid"}
                        </Text>
                        <Text fontSize="xl" fontWeight="bold">
                          {item.latestBid !== 0 ? item.latestBid : item.initialPrice}$
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
                            item.id,
                            item.latestBid !== 0
                              ? Math.ceil(item.latestBid + item.initialPrice * 0.01)
                              : Math.ceil(item.initialPrice + item.initialPrice * 0.01)
                          )
                        }
                      >
                        <Flex alignItems="center" justifyContent="center" w="100%" h="100%" flexDir="column">
                          <Text fontSize="md" color="gray.500" mb="2">
                            Bid Now
                          </Text>
                          <Text fontSize="xl" fontWeight="bold">
                            {item.latestBid !== 0
                              ? Math.ceil(item.latestBid + item.initialPrice * 0.01)
                              : Math.ceil(item.initialPrice + item.initialPrice * 0.01)}
                            $
                          </Text>
                        </Flex>
                      </Button>
                    </Flex>
                  </Box>
                </Flex>
              </GridItem>
            ))
          : null}
      </Grid>
    </Box>
  );
}
