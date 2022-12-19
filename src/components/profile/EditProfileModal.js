// import React, { useState } from "react";

import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  // FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  // InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaGenderless } from "react-icons/fa";
import { IoAddCircle, IoPencil } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../store/actions/profileActions";

import { uploadUserImage, validateImage } from "../../store/actions/authActions";
// import { BiHide, BiShow } from "react-icons/bi";
import { BsFillCalendarDateFill } from "react-icons/bs";

function EditProfileModal({ user }) {
  const error = useSelector((state) => state.profile.error);
  const loading = useSelector((state) => state.profile.loading);

  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    const imageURL = await uploadUserImage();
    // console.log(imageURL);
    updateProfile(dispatch, e, imageURL, user.id, user.image, toast);
  }

  return (
    <>
      <Button w="100%" onClick={onOpen} variant="none" size="sm" _hover={{ color: "blue.600", bg: "gray.300" }} 
      alignItems="center" justifyContent="left" borderRadius="0"
      >
        {<IoPencil />}
        <span  style={{ marginLeft: "0.6rem" }}>Edit Profile</span>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your profile</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={(e) => handleSubmit(e)}>
            <ModalBody pb={6}>

            <Flex justify="center" align="center" >
              <Avatar size="2xl" src={user.image} boxShadow={{ base: 'none', sm: '0 0 60px rgba(0, 0, 0, 0.5)' }} mb="1em"/>
              <FormLabel htmlFor="image" >
                <IoAddCircle style={{ width: '25px', height: '25px', cursor: 'pointer', position: 'absolute' }}/>
              </FormLabel>
              <Input type="file" id="image" name="image" hidden accept="image/png, image/jpeg" onChange={(e) => validateImage(e, dispatch, toast)}/>
            </Flex>

              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input type="text" name="fullName" placeholder="Full Name" autoComplete="fullname" variant="auth" defaultValue={user.fullName}/>
              </FormControl>

              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input type="text" name="userName" placeholder="Username" autoComplete="username" variant="auth" defaultValue={user.userName}/>
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" placeholder="Email" autoComplete="username" variant="auth" defaultValue={user.email}/>
              </FormControl>

              {/* <FormControl>
                <FormLabel>New Password</FormLabel>
                <InputGroup>
                <Input type= {showPassword ? 'text' : 'password'} name="password" placeholder="New Password" autoComplete="password" variant="auth"/>
                <InputRightElement 
                  onClick={() =>setShowPassword((showPassword) => !showPassword)}
                  children={showPassword ? <BiShow /> : <BiHide />}
                  />
                  </InputGroup>
              </FormControl>

              <FormControl>
              <InputGroup>
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
            </FormControl> */}

            <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input type="tel" name="phoneNumber" placeholder="Phone Number" autoComplete="tel" variant="auth" defaultValue={user.phoneNumber}/>
              </FormControl>

              <HStack>
              <Box w="100%">
                <FormControl pb="1em" >
                  <InputGroup>
                    <Select name="gender" variant="auth" icon={<FaGenderless />} defaultValue={user.gender}>
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
                <FormControl pb="1em" >
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" children={<BsFillCalendarDateFill color="gray.300" />} />
                    <Input type="date" name="birthDate" placeholder="Birth Date" autoComplete="bday" variant="auth" defaultValue={user.birthDate}/>
                  </InputGroup>
                </FormControl>
              </Box>
            </HStack>


            
            </ModalBody>

            <ModalFooter>
              <Text>{loading ? "Updating..." : ""}</Text>

              {error && (
                <Alert status="error" variant="left-accent" mb="1em">
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              <Button variant="primary" type="submit" mr={3} onClick={onClose}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditProfileModal;
