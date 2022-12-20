// import React, { useState } from "react";

import {
  Alert,
  AlertIcon,
  Avatar,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
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
  useColorModeValue,
  useColorMode
} from "@chakra-ui/react";
import { FaGenderless } from "react-icons/fa";
import { IoAddCircle, IoPencil } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../store/actions/profileActions";

import { uploadUserImage, validateImage } from "../../store/actions/authActions";
// import { BiHide, BiShow } from "react-icons/bi";
import { BsFillCalendarDateFill } from "react-icons/bs";

function EditProfileModal({ user }) {

  const colorButton = useColorModeValue('blue.600', 'blue.300');
  const textColor = useColorModeValue("gray.700", "white");
  const { colorMode } = useColorMode();

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
        <span style={{ marginLeft: "0.6rem" }}>Edit Profile</span>
      </Button>

      <Modal isOpen={isOpen} size="3xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={colorMode === "light" ? "gray.200" : "gray.700"}
          color={colorMode === "light" ? "gray.700" : "gray.200"}
          borderRadius="3xl"
        >
          <ModalHeader>Edit your profile</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={(e) => handleSubmit(e)}>
            <ModalBody pb={3}>

              <Flex justify="center" align="center" >
                <Avatar size="2xl" src={user.image} boxShadow={{ base: 'none', sm: '0 0 60px rgba(0, 0, 0, 0.5)' }} mb="1em" />
                <FormLabel htmlFor="image" >
                  <IoAddCircle style={{ width: '25px', height: '25px', cursor: 'pointer', position: 'absolute' }} />
                </FormLabel>
                <Input
                  type="file"
                  id="image"
                  name="image"
                  hidden accept="image/png, image/jpeg"
                  onChange={(e) => validateImage(e, dispatch, toast)}
                />
              </Flex>

              <HStack>
                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    autoComplete="fullname"
                    variant="auth"
                    defaultValue={user.fullName}
                    bg={colorMode === "light" ? "gray.100" : "gray.600"}
                    borderRadius="3xl"
                    color={textColor}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    name="userName"
                    placeholder="Username"
                    autoComplete="username"
                    variant="auth"
                    defaultValue={user.userName}
                    bg={colorMode === "light" ? "gray.100" : "gray.600"}
                    borderRadius="3xl"
                    color={textColor}
                  />
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel mt='4'>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="username"
                  variant="auth"
                  defaultValue={user.email}
                  bg={colorMode === "light" ? "gray.100" : "gray.600"}
                  borderRadius="3xl"
                  color={textColor}
                />
              </FormControl>
              <FormControl>
                <FormLabel mt='4'>Phone Number</FormLabel>
                <Input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  autoComplete="tel"
                  variant="auth"
                  defaultValue={user.phoneNumber}
                  bg={colorMode === "light" ? "gray.100" : "gray.600"}
                  borderRadius="3xl"
                  color={textColor}
                />
              </FormControl>

              <HStack >
                <FormControl pb="1em" w="100%">
                  <FormLabel mt='4'>Email</FormLabel>
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

                <FormControl pb="1em" w="100%" >
                  <FormLabel mt='4'>Email</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" children={<BsFillCalendarDateFill color="gray.300" />} />
                    <Input type="date" name="birthDate" placeholder="Birth Date" autoComplete="bday" variant="auth" defaultValue={user.birthDate} />
                  </InputGroup>
                </FormControl>

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

              <Button
                type="submit"
                mr={3} onClick={onClose}
                bg={colorButton}
                _hover={{ light: 'blue.300', dark: 'blue.600' }}
                color={textColor}
              >
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

