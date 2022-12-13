import React, { useEffect } from "react";
import "fontsource-inter/500.css";
import { getTrend } from "../../store/actions/trendindAction";
import { useDispatch, useSelector } from "react-redux";
import "../../App.css";
import Title from "../Title";
import { Heading, Button, VStack, HStack, Text, Flex, Tag, Image, Box } from "@chakra-ui/react";

import ChakraCarousel from "./ChakraCarousel";

function SliderCom() {
  const dispatch = useDispatch();
  const trendingItems = useSelector((state) => state.trending);
  useEffect(() => {
    getTrend(dispatch);
  }, [dispatch]);

  const timeDown = (time) => {
    const now = new Date().getTime();
    const distance = new Date(time).getTime() - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="container">
      <Title> Trending </Title>
      <ChakraCarousel gap={32}>
        {trendingItems.trendItems.slice(0, 11).map((post, index) => (
          <Flex
            key={index}
            boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
            justifyContent="space-between"
            flexDirection="column"
            overflow="hidden"
            color="gray.300"
            bg="base.d100"
            rounded={5}
            flex={1}
            // p={5}
            _hover={{
              cursor: "pointer",
            }}
          >
            <VStack mb={6}>
              {/* <Heading
                                fontSize={{ base: "xl", md: "2xl" }}
                                textAlign="left"
                                w="full"
                                mb={2}
                            >
                                {post.itemTitle}
                            </Heading> */}
              <Box w="full" h="full" rounded={5} overflow="hidden" p={0} mb={2}>
                {/* <Image
                  src="https://source.unsplash.com/800x450/?electronics"
                  alt="itemImage"
                  objectFit={"cover"}
                  objectPosition={"center"}
                  w="full"
                  _hover={{
                    transform: "scale(1.1) rotate(6deg)",
                    transition: "all 0.3s ease-in-out",
                  }}
                /> */}

                <Image
                  src={
                    post.itemImage[0].startsWith("http")
                      ? post.itemImage[0]
                      : `${process.env.REACT_APP_HEROKU_API_KEY}/${post.itemImage[0].split("/").pop()}`
                  }
                  alt="itemImage"
                  objectFit={"cover"}
                  objectPosition={"center"}
                  w="full"
                  _hover={{
                    transform: "scale(1.1) rotate(6deg)",
                    transition: "all 0.3s ease-in-out",
                  }}
                />
              </Box>
              <Text fontSize={{ base: "sm", md: "md" }} textAlign="left" w="full" ps={5}>
                {post.itemDescription}
              </Text>
            </VStack>
            <HStack justifyContent="space-between" w="full" ps={5}>
              <HStack>
                <Tag size="sm" variant="solid" colorScheme="blue">
                  Initial Price : {post.initialPrice}
                </Tag>
                <Tag size="sm" variant="solid" colorScheme="blue">
                  Latest Bid {post.latestBid}
                </Tag>
              </HStack>
            </HStack>
            {new Date(post.endDate).getTime() > new Date().getTime() ? (
              <HStack justifyContent="space-between" w="full" ps={5} pb={5} pe={5}>
                <HStack>
                  <Tag size="sm" variant="solid" colorScheme="blue">
                    Time Left : {timeDown(post.endDate)}
                  </Tag>
                </HStack>
                <Button size="sm" variant="outline" colorScheme="blue">
                  Bid Now
                </Button>
              </HStack>
            ) : (
              <HStack justifyContent="space-between" w="full" ps={5} pb={5} pe={5}>
                <HStack>
                  <Tag size="sm" variant="solid" colorScheme="blue">
                    Time Left : 0d 0h 0m 0s
                  </Tag>
                </HStack>
                <Button size="sm" variant="outline" colorScheme="blue">
                  The Bid is Over
                </Button>
              </HStack>
            )}

            {/* <HStack justifyContent="space-between" w="full" ps={5} pb={5} pe={5}>
                            <HStack>
                                <Tag
                                    size="sm"
                                    variant="solid"
                                    colorScheme="blue"
                                >
                                    Time Left : {timeDown(post.endDate)}
                                </Tag>
                            </HStack>
                            <Button
                                size="sm"
                                variant="outline"
                                colorScheme="blue"
                            >
                                Bid Now
                            </Button>
                        </HStack>
 */}
          </Flex>
        ))}
      </ChakraCarousel>
    </div>
  );
}

export default SliderCom;
