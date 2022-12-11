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
  Select,
  FormHelperText,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";

import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../../store/actions/authActions";

function Signup() {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);

  return (
    <Flex direction={{ base: "column", md: "row" }} justify="center" align="center" w="100%" h="100vh">
      <VStack
        borderColor="blue.500"
        borderRadius="lg"
        borderWidth="2px"
        textAlign="center"
        p="5em"
        m="2em"
        w={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
        alignItems="stretch"
        spacing={50}
        mb="5em"
      >

        <Heading>Signup</Heading>

        <Form onSubmit={(e) => signUp(dispatch, e)}>

          <FormControl pb="2em" borderColor="blue.500" isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" placeholder="email" autoComplete="email"/>
            <FormHelperText textAlign="left">We'll never share your email.</FormHelperText>
          </FormControl>

          <FormControl pb="2em" borderColor="blue.500" isRequired>
            <FormLabel>Username</FormLabel>
            <Input type="text" name="userName" placeholder="username" autoComplete="username"/>
            <FormHelperText textAlign="left">Choose a unique username.</FormHelperText>
          </FormControl>

          <FormControl pb="2em" borderColor="blue.500" isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input type="text" name="fullName" placeholder="full name" autoComplete="name"/>
          </FormControl>

          <FormControl pb="2em" borderColor="blue.500" isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input type="text" name="phoneNumber" placeholder="phone number" autoComplete="tel"/>
          </FormControl>

          <FormControl pb="2em" borderColor="blue.500" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" placeholder="password" autoComplete="new-password"/>
          </FormControl>

          <FormControl pb="2em" borderColor="blue.500" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" name="confirmPassword" placeholder="confirm password" autoComplete="new-password"/>
          </FormControl>

          <FormControl pb="2em" borderColor="blue.500">
            <FormLabel>Gender</FormLabel>
            <Select name="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </FormControl>

          <FormControl pb="2em" borderColor="blue.500">
            <FormLabel>Birth Date</FormLabel>
            <Input type="date" name="birthDate" placeholder="birth date" autoComplete="bday" required />
          </FormControl>

          <FormControl pb="2em" borderColor="blue.500">
            <FormLabel>Image</FormLabel>
            <Input type="file" name="image" placeholder="image" autoComplete="image" />
          </FormControl>


          { error &&
              <Alert status='error' variant='left-accent' mb="1em">
                <AlertIcon /> 
                {error}
              </Alert>}

          <Text>{loading ? "Loading..." : ""}</Text>

          <Button colorScheme="blue" type="submit" mb="1rem">
              Sign Up
          </Button>

          <Text>Already Registered? <Link color='blue.500' href="/signin">Sign in</Link></Text>
          
        </Form>
      </VStack>
    </Flex>
  );
}

export default Signup;
