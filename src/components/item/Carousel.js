import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import "./carousel.css";

export default function Carousel({ itemImages }) {
  const [currentImage, setCurrentImage] = React.useState(0);

  const refs = itemImages
    ? itemImages.reduce((acc, val, i) => {
        acc[i] = React.createRef();
        return acc;
      }, {})
    : [];

  const scrollToImage = (i) => {
    setCurrentImage(i);

    refs[i].current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const totalImages = itemImages ? itemImages.length : 0;

  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentImage + 1);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentImage - 1);
    }
  };

  const sliderControl = (isLeft) => (
    <Button
      type="button"
      onClick={isLeft ? previousImage : nextImage}
      position="absolute"
      top="50%"
      left={isLeft ? "0" : "auto"}
      right={isLeft ? "auto" : "0"}
      transform={isLeft ? "translateY(-50%)" : "translateY(-50%)"}
      bg="transparent"
      color="gray.700"
      w="8"
      h="8"
      borderRadius="full"
      _hover={{ bg: "transparent", color: "teal.500" }}
      disabled={totalImages <= 1}
    >
      <Text role="img" aria-label={`Arrow ${isLeft ? "left" : "right"}`}>
        {isLeft ? <IoChevronBack /> : <IoChevronForward />}
      </Text>
    </Button>
  );

  return (
    <Box position="relative" h="full">
      <Box className="carousel" h="30rem">
        {itemImages &&
          itemImages.map((image, i) => (
            <Box
              key={image}
              ref={refs[i]}
              w="full"
              h="full"
              flexShrink="0"
              borderRadius="2xl"
              overflow="hidden"
              bg="gray.300"
            >
              <Image
                src={
                  image.startsWith("http") ? image : `${process.env.REACT_APP_HEROKU_API_KEY}/${image.split("/").pop()}`
                }
                alt="carousel"
                objectFit={image.width > image.height ? "cover" : "contain"}
                w="full"
                h="full"
              />
            </Box>
          ))}
      </Box>
      {sliderControl(true)}
      {sliderControl(false)}
      {totalImages > 1 && (
        <Flex position="absolute" bottom="4" left="50%" transform="translateX(-50%)" justify="center">
          {itemImages &&
            itemImages.map((image, i) => (
              <Box
                key={image}
                w="2"
                h="2"
                borderRadius="full"
                bg={currentImage === i ? "teal.500" : "gray.700"}
                opacity={currentImage === i ? "1" : "0.5"}
                mx="1"
                cursor="pointer"
                onClick={() => scrollToImage(i)}
              />
            ))}
        </Flex>
      )}
    </Box>
  );
}
