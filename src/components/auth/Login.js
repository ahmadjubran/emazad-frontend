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
import { login } from "../../store/actions/authActions";

function Login() {
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
        // borderRadius="300px" 
        bgSize="cover" 
        bgPosition="center" 
        bgRepeat="no-repeat"
      >
        <Heading textStyle="h1" color="white.100" mb="1em">Welcome Back!</Heading>

        <form onSubmit={(e) => login(dispatch, e)}>

          <FormControl pb="2em" borderColor="blue.500" isRequired>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<TfiEmail/>} />
              <Input type="email" name="email" placeholder="email" autoComplete="email" variant='auth'/>
            </InputGroup>
          </FormControl>

          <FormControl pb="3em" borderColor="blue.500" isRequired>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaLock />} />
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
            Login
          </Button>

          <Text >
            Don't have an account?{" "}
            <Link to='/signup' style={{ color: "white", textDecoration: "none",}}>
              Signup
            </Link>
          </Text>

        </form>
      </VStack>
    </Flex>
  );
}

export default Login;
