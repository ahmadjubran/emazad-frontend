import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Menu,
  MenuButton,
  MenuCommand,
  MenuDivider,
  MenuGroup,
  MenuIcon,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBid } from "../../store/actions/bidActions";
import { selectUser } from "../../store/features/authSlicer";
import { selectItems } from "../../store/features/itemSlicer";

export default function ListOfItems() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const user = useSelector(selectUser);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [isSmallerThan375] = useMediaQuery("(max-width: 375px)");

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
    <Flex direction="column" p="6" justifyContent="center" alignItems="center" gap="8" mx={{ base: "0", md: "6" }}>
      <Text fontSize="4xl" fontWeight="bold" textTransform="uppercase">
        Items
      </Text>
      {isSmallerThan375 ? (
        <Menu>
          <MenuButton as={Button} rightIcon={<MdMenu />}>
            Filters
          </MenuButton>
          <MenuList>
            <MenuItem>Active</MenuItem>
            <MenuItem>Ended</MenuItem>
            <MenuItem>My Items</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Grid templateColumns={{ base: "1fr 1fr", md: "1fr 2fr", lg: "1fr 3fr" }} gap={6}>
          <Box borderRadius="lg" overflow="hidden" boxShadow="md" pb="4" bg="gray.100">
            <Text fontSize="2xl" fontWeight="bold" textTransform="uppercase">
              Filters
            </Text>
          </Box>
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
        </Grid>
      )}
    </Flex>
  );
}
