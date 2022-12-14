import React from "react";

import {
  VStack,
  Text,
  Heading,
  Alert,
  AlertIcon,
  FormControl,
  Select,
  FormHelperText,
  Input,
  Button,
  Flex,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { BsFillPersonFill, BsFillTelephoneFill, BsFillCalendarDateFill } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import { FaUserAstronaut, FaLock, FaGenderless, FaImage } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../../store/actions/authActions";

function Signup() {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);

  return (
    <Flex direction={{ base: "column", md: "row" }} justify="center" align="center" w="100%" h="90vh">
      
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

        <Heading  textStyle="h1" color="white.100" mb="1em">Create Account</Heading>

        <form onSubmit={(e) => signUp(dispatch, e)}>

          <FormControl pb="1em" borderColor="teal.500" isRequired>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<BsFillPersonFill/>} />
              <Input type="text" name="fullName" placeholder="Full Name" autoComplete="name" variant='auth'/>
            </InputGroup>
          </FormControl>

          <FormControl pb="1em" borderColor="blue.500" isRequired>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaUserAstronaut/>} />
              <Input type="text" name="userName" placeholder="Username" autoComplete="username" variant='auth'/>
            </InputGroup>
            <FormHelperText textAlign="left" color="white">Choose a unique username.</FormHelperText>
          </FormControl>

          <FormControl pb="1em" borderColor="blue.500" isRequired>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<TfiEmail/>} />
              <Input type="email" name="email" placeholder="Email" autoComplete="email" variant='auth'/>
            </InputGroup>
            <FormHelperText textAlign="left" color="white">We'll never share your email.</FormHelperText>
          </FormControl>

          <FormControl pb="1em" borderColor="blue.500" isRequired>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaLock />} />
              <Input type="password" name="password" placeholder="password" autoComplete="new-password" variant='auth'/>
            </InputGroup>
          </FormControl>

          <FormControl pb="1em" borderColor="blue.500" isRequired>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaLock />} />
              <Input type="password" name="confirmPassword" placeholder="Confirm Password" autoComplete="new-password" variant='auth'/>
            </InputGroup>
          </FormControl>

          <FormControl pb="1em" borderColor="blue.500" isRequired>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<BsFillTelephoneFill />} />
              <Input type="text" name="phoneNumber" placeholder="Phone Number" autoComplete="tel" variant='auth'/>
            </InputGroup>
          </FormControl>

          <FormControl pb="1em" borderColor="blue.500" isRequired>
            <InputGroup>
              <Select name="gender" variant='auth' icon={<FaGenderless  />}>
                <option value="" icon={<FaGenderless color="grey.300" />}>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </InputGroup>
          </FormControl>

          <FormControl pb="1em" borderColor="blue.500" isRequired>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<BsFillCalendarDateFill color="gray.300" />} />
              <Input type="date" name="birthDate" placeholder="Birth Date" autoComplete="bday" variant='auth'/>
            </InputGroup>
          </FormControl>

          <FormControl pb="2em" borderColor="blue.500" isRequired>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaImage color="gray.300" />} />
              <Input type="file" name="image" placeholder="Upload Image" autoComplete="image" variant='auth' />
            </InputGroup>
          </FormControl>

          {error && (
            <Alert status="error" variant="left-accent" mb="1em">
              <AlertIcon />
              {error}
            </Alert>
          )}

          <Text color="white">{loading ? 'Submitting' : ""}</Text>

          <Button 
          variant="primary"
          type="submit" mb="1rem">
            Sign Up
          </Button>


          <Text>
            Already Registered?{" "}
            <Link to='/login' style={{ color: "white", textDecoration: "none",}}>
              Login
            </Link>
          </Text>
        </form>
      </VStack>
    </Flex>
  );
}

export default Signup;
