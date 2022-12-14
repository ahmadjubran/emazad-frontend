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

        <Heading  color="white" fontSize="4xl" fontWeight="bold" mb="1em">Create Account</Heading>

        <form onSubmit={(e) => signUp(dispatch, e)}>

          <FormControl pb="1em" borderColor="teal.500" isRequired>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<BsFillPersonFill color="white.300" />} />
              <Input type="text" name="fullName" placeholder="Full Name" autoComplete="name" focusBorderColor='white' variant='filled' color='teal' bgColor="white"/>
            </InputGroup>
          </FormControl>

          <FormControl pb="1em" borderColor="blue.500" isRequired>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaUserAstronaut color="gray.300" />} />
              <Input type="text" name="userName" placeholder="Username" autoComplete="username" focusBorderColor='white' variant='filled'/>
            </InputGroup>
            <FormHelperText textAlign="left" color="white">Choose a unique username.</FormHelperText>
          </FormControl>

          <FormControl pb="1em" borderColor="blue.500" isRequired>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<TfiEmail color="gray.300" />} />
              <Input type="email" name="email" placeholder="Email" autoComplete="email" focusBorderColor='white' variant='filled'/>
            </InputGroup>
            <FormHelperText textAlign="left" color="white">We'll never share your email.</FormHelperText>
          </FormControl>

          <FormControl pb="1em" borderColor="blue.500" isRequired>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaLock color="gray.300" />} />
              <Input type="password" name="password" placeholder="password" autoComplete="new-password" focusBorderColor='white' variant='filled'/>
            </InputGroup>
          </FormControl>

          <FormControl pb="1em" borderColor="blue.500" isRequired>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaLock color="gray.300" />} />
              <Input type="password" name="confirmPassword" placeholder="Confirm Password" autoComplete="new-password" focusBorderColor='white' variant='filled'/>
            </InputGroup>
          </FormControl>

          <FormControl pb="1em" borderColor="blue.500" isRequired>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<BsFillTelephoneFill color="gray.300" />} />
              <Input type="text" name="phoneNumber" placeholder="Phone Number" autoComplete="tel" focusBorderColor='white' variant='filled'/>
            </InputGroup>
          </FormControl>

          <FormControl pb="1em" borderColor="blue.500">
            <InputGroup>
              <Select name="gender" focusBorderColor='white' variant='filled' icon={<FaGenderless color="gray.300" />}>
                <option value="" icon={<FaGenderless color="gray.300" />}>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </InputGroup>
          </FormControl>

          <FormControl pb="1em" borderColor="blue.500">
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<BsFillCalendarDateFill color="gray.300" />} />
              <Input type="date" name="birthDate" placeholder="Birth Date" autoComplete="bday" required focusBorderColor='white' variant='filled'/>
            </InputGroup>
          </FormControl>

          <FormControl pb="2em" borderColor="blue.500">
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaImage color="gray.300" />} />
              <Input type="file" name="image" placeholder="Upload Image" autoComplete="image" focusBorderColor='white' variant='filled' />
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
