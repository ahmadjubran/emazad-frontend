import { Button, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addBid } from "../../store/actions/bidActions";
import { timeLeft } from "../../store/actions/generalActions";
import { getItem } from "../../store/actions/itemActions";
import { selectUser } from "../../store/features/authSlicer";
import { selectItems } from "../../store/features/itemSlicer";

export default function ItemsList() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const user = useSelector(selectUser);

  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(timeLeft);
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
      {items.length > 0
        ? items.map((item) => (
            <GridItem key={item.id}>
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
                <Link to={`/item/${item.id}`} style={{ width: "100%" }} onClick={() => getItem(dispatch, item.id)}>
                  <Image
                    src={
                      item.itemImage[0].startsWith("http")
                        ? item.itemImage[0]
                        : `${process.env.REACT_APP_HEROKU_API_KEY}/${item.itemImage[0].split("/").pop()}`
                    }
                    alt={item.itemTitle}
                    w="100%"
                    objectFit="cover"
                    h="200px"
                  />
                </Link>
                <Text fontSize="xl" fontWeight="bold" textTransform="capitalize">
                  {item.itemTitle}
                </Text>
                <Text color="gray.500">
                  {timeLeft(item).days}d {timeLeft(item).hours}h {timeLeft(item).minutes}m {timeLeft(item).seconds}s
                </Text>
                <Text fontSize="xl" fontWeight="bold" textTransform="capitalize">
                  {item.latestBid !== 0 ? item.latestBid : item.initialPrice}$
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
              </Flex>
            </GridItem>
          ))
        : null}
    </Grid>
  );
}
