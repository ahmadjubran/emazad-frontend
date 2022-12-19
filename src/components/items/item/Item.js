import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useMediaQuery,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  IoEllipsisVertical,
  IoHeart,
  IoHeartOutline,
  IoStar,
  IoStarHalf,
  IoStarOutline,
  IoTrash,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addBid } from "../../../store/actions/bidActions";
import { handleFavorite } from "../../../store/actions/favoriteActions";
import { showTime, timeLeft } from "../../../store/actions/generalActions";
import { deleteItem, getItem } from "../../../store/actions/itemActions";
import { handleRating } from "../../../store/actions/ratingActions";
import { selectIsAuth, selectUser } from "../../../store/features/authSlicer";
import { selectItem, selectUserRating } from "../../../store/features/itemSlicer";
import RenderTimeLeft from "../../../utils/RenderTimeLeft";
import Carousel from "./Carousel";
import Comments from "./Comments";
import EditItem from "./EditItem";
import LastBids from "./LastBids";

export default function Item() {
  const item = useSelector(selectItem);
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { id } = useParams();
  const userRating = useSelector(selectUserRating);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const toast = useToast();

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

  const renderStars = (rating) => {
    const rated =
      userRating.rating &&
      userRating.rating.find((rating) => Number(rating.userId) === Number(localStorage.getItem("userID")));
    if (rated) rating = rated.rating;
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
          color={rated && rated.rating >= i ? "blue.500" : "gray.500"}
          _hover={{ color: "blue.300" }}
          display="inline"
          cursor="pointer"
          onClick={() => handleRating(dispatch, i, item, userRating.rating, toast)}
        />
      );
    }
    return stars;
  };

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

        <Box w="100%" h="100%" p="4" display="flex" alignItems="start" justifyContent="center" flexDir="column">
          <Flex alignItems="start" gap="4" w="100%" borderBottom="1px solid" borderColor="gray.200" pb="4" h="75px">
            <Link to={`/profile/${item.userId}`}>
              <Image
                src={item.User && item.User.image}
                h="60px"
                w="60px"
                objectFit="cover"
                borderRadius="full"
                bg="gray.100"
              />
            </Link>
            <Box>
              <Link to={`/profile/${item.userId}`}>
                <Heading as="h3" fontWeight="bold" fontSize="xl" textTransform="capitalize" lineHeight="1">
                  {item.User && item.User.fullName}
                </Heading>
              </Link>
              <Box fontSize="sm">
                {renderStars(userRating.averageRating)} ({userRating.countRating})
              </Box>
              <Text fontSize="sm" color="gray.500" textTransform="uppercase">
                {showTime(item.createdAt)}
              </Text>
            </Box>
            <Spacer />
            <Box>
              <IconButton
                aria-label="Favorite"
                icon={
                  item.Favorites &&
                  item.Favorites.map((favorite) => favorite.userId).includes(Number(localStorage.getItem("userID"))) ? (
                    <IoHeart color="red" />
                  ) : (
                    <IoHeartOutline />
                  )
                }
                variant="none"
                size="lg"
                alignSelf="center"
                onClick={() => handleFavorite(dispatch, item, item.Favorites, toast)}
              />
              {isAuth && item.userId === user.id && (
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<IoEllipsisVertical />}
                    variant="none"
                    size="lg"
                    alignSelf="center"
                  />

                  <MenuList
                    bg="gray.200"
                    color="gray.700"
                    fontSize="sm"
                    fontWeight="normal"
                    borderRadius="lg"
                    shadow="lg"
                  >
                    <MenuItem as={EditItem} item={item} />
                    <Link to="/">
                      <MenuItem
                        icon={<IoTrash />}
                        bg="gray.200"
                        _hover={{ bg: "gray.300" }}
                        onClick={() => deleteItem(dispatch, item.id)}
                      >
                        Delete
                      </MenuItem>
                    </Link>
                  </MenuList>
                </Menu>
              )}
            </Box>
          </Flex>

          <Flex alignItems="center" justifyContent="space-between" w="100%" mt="4">
            <Box w="100%" h="100%">
              <Heading as="h2" fontWeight="bold" textTransform="capitalize" lineHeight="1">
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
              <Text fontSize="xs" color="gray.500" textTransform="uppercase" mt="2">
                {item.category} - {item.subCategory}
              </Text>
            </Box>
          </Flex>

          <Text fontSize="md" whiteSpace="pre-line" mt="4" wordBreak="break-word">
            {item.itemDescription}
          </Text>
          <Flex w="100%" mt="4" alignItems="center" justifyContent="space-between" gap="4">
            <RenderTimeLeft item={item} time="days" />
            <RenderTimeLeft item={item} time="hours" />
            <RenderTimeLeft item={item} time="minutes" />
            <RenderTimeLeft item={item} time="seconds" />
          </Flex>

          {item.status === "sold" ? (
            <Flex w="100%" mt="4" alignItems="center" justifyContent="space-between" gap="4">
              <Box
                p="4"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDir="column"
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
                    <Link to={`/profile/${item.Bids && item.Bids[0].User.id}`}>
                      <Avatar
                        size="lg"
                        name={item.Bids && item.Bids[0].User.fullName}
                        src={item.Bids && item.Bids[0].User.image}
                        border="1px solid"
                        borderColor="gray.300"
                        filter="grayscale(100%)"
                        _hover={{ filter: "grayscale(0%)" }}
                      />
                    </Link>
                    <Text fontSize="md" color="gray.500">
                      <Link to={`/profile/${item.Bids && item.Bids[0].User.id}`}>
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
                <Button
                  w="100%"
                  h="100%"
                  colorScheme="blue"
                  variant="outline"
                  boxShadow="md"
                  onClick={() =>
                    item.status === "active" &&
                    addBid(
                      dispatch,
                      item.id,
                      item.latestBid !== 0
                        ? Math.ceil(item.latestBid + item.initialPrice * 0.01)
                        : Math.ceil(item.initialPrice),
                      toast
                    )
                  }
                  disabled={item.status !== "active" || !isAuth}
                >
                  {item.status === "active" ? (
                    <Flex alignItems="center" justifyContent="center" w="100%" h="100%" flexDir="column">
                      <Text fontSize="md" color="gray.500" mb="2">
                        Bid Now
                      </Text>
                      <Text fontSize="xl" fontWeight="bold">
                        {item.latestBid !== 0
                          ? Math.ceil(item.latestBid + item.initialPrice * 0.01)
                          : Math.ceil(item.initialPrice)}
                        $
                      </Text>
                    </Flex>
                  ) : (
                    <Text fontSize="lg" color="gray.700" textTransform="uppercase">
                      Start Soon
                    </Text>
                  )}
                </Button>
              </Flex>
            </>
          )}
        </Box>
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
