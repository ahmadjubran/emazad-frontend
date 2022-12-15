import React from "react";
import {
  VStack,
  Text,
  Heading,
  Alert,
  AlertIcon,
  FormControl,
  Input,
  Button,
  Flex,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { TfiEmail } from "react-icons/tfi";
import { FaLock } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { verifyEmail } from "../../store/actions/authActions";

function Verification() {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);

  return (
    <Flex direction={{ base: "column", md: "row" }} justify="center" align="center" w="100%" h="70vh">
      <VStack 
        w="100%" 
        h="100%" 
        bgImage="https://bia.lighting/wp-content/uploads/2016/04/Sign-Up-Background.png" 
        justify="center" 
        align="center"
        bgSize="cover" 
        bgPosition="center" 
        bgRepeat="no-repeat"
      >
        <Heading  textStyle="h1" color="white.100" mb="1em">Login to Verify!</Heading>

        <form onSubmit={(e) => verifyEmail(dispatch, e)}>

          <FormControl pb="2em" isRequired>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<TfiEmail color="gray.300" />} />
              <Input type="email" name="email" placeholder="email" autoComplete="email" variant='auth'/>
            </InputGroup>
          </FormControl>

          <FormControl pb="3em" isRequired>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaLock color="gray.300" />} />
              <Input type="password" name="password" placeholder="password" autoComplete="current-password" variant='auth'/>
            </InputGroup>
          </FormControl>

          {error && (
            <Alert status="error" variant="left-accent" mb="1em">
              <AlertIcon />
              {error}
            </Alert>
          )}

          <Text>{loading ? "Loading..." : ""}</Text>

          <Button variant="primary" type="submit" mb="1rem">
            Verify!
          </Button>

          <Text>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "white", textDecoration: "none",}}>
              Signup now
            </Link>
          </Text>

        </form>
      </VStack>
    </Flex>
  );
}

export default Verification;
