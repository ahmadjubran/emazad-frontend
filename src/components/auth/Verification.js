import React from "react";

import Form from "react-bootstrap/Form";
import {
  VStack,
  Text,
  Heading,
  Alert,
  AlertIcon,
  Link,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";

import { useSelector, useDispatch } from "react-redux";
import { verifyEmail } from "../../store/actions/authActions";

function Verification() {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);

  return (
    <Flex direction={{ base: "column", md: "row" }} justify="center" align="center" w="100%" h="70vh">
      <VStack
        borderColor="blue.500"
        borderRadius="lg"
        borderWidth="2px"
        textAlign="center"
        p="5em"
        m="2em"
        w={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
        alignItems="stretch"
        spacing={100}
        mb="5em"
      >
        <Heading>Login</Heading>

        <Form onSubmit={(e) => verifyEmail(dispatch, e)}>
          <FormControl pb="2em" borderColor="blue.500" isRequired>
            <FormLabel requiredIndicator>Email</FormLabel>
            <Input type="email" name="email" placeholder="email" autoComplete="email" />
          </FormControl>

          <FormControl pb="3em" borderColor="blue.500" isRequired>
            <FormLabel requiredIndicator>Password</FormLabel>
            <Input type="password" name="password" placeholder="password" autoComplete="current-password" required />
          </FormControl>

          {error && (
            <Alert status="error" variant="left-accent" mb="1em">
              <AlertIcon />
              {error}
            </Alert>
          )}

          <Text>{loading ? "Loading..." : ""}</Text>

          <Button colorScheme="blue" type="submit" mb="1rem">
            Verify!
          </Button>

          <Text>
            Don't have an account?{" "}
            <Link color="blue.500" href="/signup">
              Sign up now
            </Link>
          </Text>

        </Form>
      </VStack>
    </Flex>
  );
}

export default Verification;
