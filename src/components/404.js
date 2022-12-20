import { Heading, Text, Button, Flex } from '@chakra-ui/react';
import {Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Flex textAlign="center" py={24} px={6} h={{ base: '35vh', lg: '62vh' }} w="100%" bg="gray.100" justify="center" direction="column">
      <Heading
        display="inline-block"
        as="h2"
        size="4xl"
        bgGradient="linear-gradient(90deg, blue.600 0%, blue.500 35%, blue.400 100%)"
        backgroundClip="text">
        404
      </Heading>
      <Text fontSize="20px" mt={3} mb={2} fontWeight='bold'>
        Page Not Found!
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you're looking for does not seem to exist :(
      </Text>

      <Link to={'/'}> 
      <Button
        colorScheme="blue"
        bgGradient="linear-gradient(90deg, blue.600 0%, blue.500 35%, blue.400 100%)"
        color="white"
        >
        Go to Home
      </Button>
      </Link>
    </Flex>
  );
}