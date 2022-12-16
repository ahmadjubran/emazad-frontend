import React, { useState } from "react";

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
  Box,
  HStack,
  InputRightElement,
  Avatar,
  useToast,

} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { BsFillPersonFill, BsFillTelephoneFill, BsFillCalendarDateFill } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import { FaUserAstronaut, FaLock, FaGenderless } from "react-icons/fa";
import { BiShow, BiHide } from "react-icons/bi";
import { IoAddCircle } from "react-icons/io5";

import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../../store/actions/authActions";
import { validateImage, uploadUserImage } from "../../store/actions/authActions";

import saeed from "../../assets/img/saeed.jpg";
import { FormLabel } from "react-bootstrap";

function Signup() {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const image = useSelector((state) => state.auth.previewImage);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // set the date to now in day and time format YYYY-MM-DD
  const date = new Date().toISOString().slice(0, 10);

  const toast = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    const imageURL = await uploadUserImage();
    console.log(imageURL);
    // signup the user
    signUp(dispatch, e, imageURL, toast);
  }

  return (
    <Flex direction={{ base: "column", md: "row" }} justify="center" align="center" w="100%" h="100%">
      <VStack
        w="100%"
        h="100%"
        bgImage="https://bia.lighting/wp-content/uploads/2016/04/Sign-Up-Background.png"
        justify="center"
        align="center"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        pt="3em"
        pb="3em"
      >
        <Heading textStyle="h1" color="white.100" mb="1em">
          Create Account
        </Heading>

        <Box rounded={"lg"} p={8} boxShadow={{ base: 'none', sm: '0 0 60px rgba(0, 0, 0, 0.5)' }} 
          // bgGradient="linear(to-r, teal.500,blue.500)"
        >
          <form onSubmit={(e) => handleSubmit(e)}>

          <Flex justify="center" align="center" >
            <Avatar size="2xl" src={image || saeed} boxShadow={{ base: 'none', sm: '0 0 60px rgba(0, 0, 0, 0.5)' }} mb="1em"/>
            <FormLabel htmlFor="image" >
              <IoAddCircle style={{ width: '25px', height: '25px', cursor: 'pointer', position: 'absolute' }}/>
            </FormLabel>
            <Input type="file" id="image" name="image" hidden accept="image/png, image/jpeg" onChange={(e) => validateImage(e, dispatch, toast)}/>
          </Flex>
          
            <FormControl pb="1em"  isRequired>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<BsFillPersonFill />} />
                <Input type="text" name="fullName" placeholder="Full Name" autoComplete="name" variant="auth" />
              </InputGroup>
            </FormControl>

            <FormControl pb="1em" isRequired>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaUserAstronaut />} />
                <Input type="text" name="userName" placeholder="Username" autoComplete="username" variant="auth" />
              </InputGroup>
              <FormHelperText textAlign="left" color="white">
                Choose a unique username.
              </FormHelperText>
            </FormControl>

            <FormControl pb="1em" isRequired>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<TfiEmail />} />
                <Input type="email" name="email" placeholder="Email" autoComplete="email" variant="auth" />
              </InputGroup>
              <FormHelperText textAlign="left" color="white">
                We'll never share your email.
              </FormHelperText>
            </FormControl>

            <FormControl pb="1em" isRequired>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaLock />} />
                <Input
                  type= {showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="password"
                  autoComplete="new-password"
                  variant="auth"
                />
                <InputRightElement 
                  onClick={() =>setShowPassword((showPassword) => !showPassword)}
                  children={showPassword ? <BiShow /> : <BiHide />}
                  />
              </InputGroup>
            </FormControl>

            <FormControl pb="1em" isRequired>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaLock />} />
                <Input
                  type= {showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  variant="auth"
                />
                <InputRightElement 
                  onClick={() =>setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword)}
                  children={showConfirmPassword ? <BiShow /> : <BiHide />}
                  />
              </InputGroup>
            </FormControl>

            <FormControl pb="1em" isRequired>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<BsFillTelephoneFill />} />
                <Input type="tel" name="phoneNumber" placeholder="Phone Number" autoComplete="tel" variant="auth" />
              </InputGroup>
            </FormControl>

            <HStack>
              <Box w="100%">
                <FormControl pb="1em" isRequired>
                  <InputGroup>
                    <Select name="gender" variant="auth" icon={<FaGenderless />}>
                      <option value="" icon={<FaGenderless color="grey.300" />} disabled>
                        Select Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Select>
                  </InputGroup>
                </FormControl>
              </Box>

              <Box>
                <FormControl pb="1em" isRequired>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" children={<BsFillCalendarDateFill color="gray.300" />} />
                    <Input type="date" name="birthDate" placeholder="Birth Date" autoComplete="bday" max={date} variant="auth" />
                  </InputGroup>
                </FormControl>
              </Box>
            </HStack>

            

            {error && (
              <Alert status="error" variant="left-accent" mb="1em">
                <AlertIcon />
                {error}
              </Alert>
            )}

            <Text color="white">{loading ? "Submitting" : ""}</Text>

            <Button variant="primary" type="submit" mb="1rem" w="100%">
              Sign Up
            </Button>

            <Text textAlign="center">
              Already Registered?{" "}
              <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
                Login
              </Link>
            </Text>
          </form>
        </Box>
      </VStack>
    </Flex>
  );
}

export default Signup;
