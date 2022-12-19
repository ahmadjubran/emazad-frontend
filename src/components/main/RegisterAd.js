import { Box, Button, Container, Image, Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsAuth } from "../../store/features/authSlicer";

import coinImage from "../../assets/img/s.webp";

export default function RegisterAd() {
  const isAuth = useSelector(selectIsAuth);

  return (
    <Box bg="gray.100" py="24">
      <Container
        maxW={"85%"}
        maxH={"30rem"}
        bg="blue.500"
        bgGradient="linear-gradient(90deg, blue.600 0%, blue.500 35%, blue.400 100%)"
        my={"24px"}
        borderRadius={"2xl"}
        boxShadow={"2xl"}
      >
        <Stack direction={{ base: "column", md: "row" }} p="12" align="center" justify="center" spacing="24">
          <Stack align="left" justify="center" gap="8">
            <Text position={"relative"} color="white" textStyle={"h1"} fontSize="2.2rem">
              Are you ready to start bidding?
            </Text>
            <Link to={isAuth ? "/items" : "/login"}>
              <Button
                colorScheme="gray"
                w="50%"
                _hover={{ bg: "gray.300" }}
                boxShadow="md"
                onClick={() => {
                  window.scrollTo(0, 0);
                  if (isAuth) {
                  }
                }}
              >
                {isAuth ? "Start Bidding" : "Join eMazad"}
              </Button>
            </Link>
          </Stack>
          <Stack>
            <Image
              src={coinImage}
              alt="coin"
              width="200px"
              filter="drop-shadow(0px 0px 0.75rem rgba(0, 0, 0, 0.5)) grayscale(100%)"
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
