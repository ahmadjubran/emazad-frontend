import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Textarea,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { BsDiscord, BsGithub, BsPerson } from "react-icons/bs";
import { MdEmail, MdFacebook, MdLocationOn, MdOutlineEmail, MdPhone } from "react-icons/md";

export default function contact() {
  return (
    <Container bg="gray.100" maxW="full" mt={0} centerContent overflow="hidden">
      <Flex>
        <Box
          borderRadius="3xl"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
          bg="gray.50"
          boxShadow="lg"
          border="1px solid"
          borderColor="gray.200"
        >
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 10, md: 15, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading>Contact</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                    Fill up the form below to contact
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack pl={0} spacing={3} alignItems="flex-start">
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        leftIcon={<MdPhone color="rgb(49,130,206)" size="20px" />}
                      >
                        +962 79 123 4567
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        leftIcon={<MdEmail color="rgb(49,130,206)" size="20px" />}
                      >
                        emazad@gmail.com
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        leftIcon={<MdLocationOn color="rgb(49,130,206)" size="20px" />}
                      >
                        Amman, Jordan
                      </Button>
                    </VStack>
                  </Box>
                  <HStack mt={{ lg: 10, md: 10 }} spacing={5} px={5} alignItems="flex-start">
                    <IconButton
                      aria-label="facebook"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ color: "rgb(49,130,206)" }}
                      icon={<MdFacebook size="28px" />}
                    />
                    <IconButton
                      aria-label="github"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ color: "rgb(49,130,206)" }}
                      icon={<BsGithub size="28px" />}
                    />
                    <IconButton
                      aria-label="discord"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ color: "rgb(49,130,206)" }}
                      icon={<BsDiscord size="28px" />}
                    />
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="gray.200" borderRadius="2xl" p={5} boxShadow="md" border="1px" borderColor="gray.400">
                  <Box m={8}>
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="gray.50">
                          <InputLeftElement pointerEvents="none" children={<BsPerson color="gray.800" />} />
                          <Input type="text" size="md" borderRadius="full" bg="gray.100" borderColor="gray.400" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Mail</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement pointerEvents="none" children={<MdOutlineEmail color="gray.800" />} />
                          <Input type="text" size="md" borderRadius="full" bg="gray.100" borderColor="gray.400" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Message</FormLabel>
                        <Textarea
                          size="md"
                          resize="none"
                          borderRadius="3xl"
                          bg="gray.100"
                          borderColor="gray.400"
                          placeholder="message"
                        />
                      </FormControl>
                      <FormControl id="name" float="right">
                        <Button variant="outline" colorScheme="blue" size="md" borderRadius="full">
                          Send Message
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
