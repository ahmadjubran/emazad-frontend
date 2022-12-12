import { Button, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBid } from "../../store/actions/bidActions";
import { selectUser } from "../../store/features/authSlicer";
import { selectItems } from "../../store/features/itemSlicer";

export default function ItemsList() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
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
    const interval = setInterval(() => {
      setCountdown(timeLeft);
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
      {items.map((item) => (
        <GridItem key={item._id}>
          <Flex
            direction="column"
            bg="white"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            pb="4"
            alignItems="center"
            justifyContent="center"
            gap="2"
          >
            <Image src={item.itemImage} alt={item.itemTitle} w="100%" objectFit="cover" h="200px" />
            <Text fontSize="xl" fontWeight="bold" textTransform="capitalize">
              {item.itemTitle}
            </Text>
            <Text color="gray.500">
              {timeLeft(item).days}d {timeLeft(item).hours}h {timeLeft(item).minutes}m {timeLeft(item).seconds}s
            </Text>
            <Text fontSize="xl" fontWeight="bold" textTransform="capitalize">
              {item.latestBid}$
            </Text>
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => addBid(dispatch, item.id, item.latestBid + item.initialPrice * 0.01)}
              disabled={user === null}
            >
              Bid Now {item.latestBid + item.initialPrice * 0.01}$
            </Button>
          </Flex>
        </GridItem>
      ))}
    </Grid>
  );
}
