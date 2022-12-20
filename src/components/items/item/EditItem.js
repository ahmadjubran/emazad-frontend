import React, { useState } from "react";

import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
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
  Textarea,
  useDisclosure,
  useToast,
  HStack,
  useColorModeValue,
  useColorMode
} from "@chakra-ui/react";
import { FaDollarSign } from "react-icons/fa";
import { IoPencil } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { editItem } from "../../../store/actions/itemActions";

import { uploadItemImage, validateImage } from "../../../store/actions/itemActions";

function EditItem({ item }) {
  const colorButton = useColorModeValue('blue.600', 'blue.300');
  const textColor = useColorModeValue("gray.700", "white");
  const { colorMode } = useColorMode();
  const error = useSelector((state) => state.item.error);
  const loading = useSelector((state) => state.item.loading);
  const userId = useSelector((state) => state.auth.user.id);

  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [minEndDate, setMinEndDate] = useState();
  const toast = useToast();

  function handleEndDate(e) {
    setMinEndDate(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const imageURL = await uploadItemImage();
    console.log(imageURL);
    editItem(dispatch, e, imageURL, userId, item.id, item.itemImage);
  }

  return (
    <>
      <Button
        onClick={onOpen}
        variant="none"
        size="sm"
        _hover={{ color: "blue.600", bg: "gray.300" }}
        w="100%"
        justifyContent="left"
        alignItems="center"
        borderRadius="0"
      >
        {<IoPencil />}
        <span style={{ marginLeft: "0.6rem" }}>Edit Item</span>
      </Button>

      <Modal isOpen={isOpen} size='5xl' onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={colorMode === "light" ? "gray.200" : "gray.700"}
          color={colorMode === "light" ? "gray.700" : "gray.200"}
          borderRadius="3xl"
        >
          <ModalHeader>Edit your item</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={(e) => handleSubmit(e)}>
            <ModalBody pb={6}>

              <HStack spacing={4}>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input type="text"
                    name="itemTitle"
                    placeholder="Title"
                    variant="auth"
                    defaultValue={item.itemTitle}
                    bg={colorMode === "light" ? "gray.100" : "gray.600"}
                    borderRadius="3xl"
                    color={textColor}
                  />
                </FormControl>
                <FormControl mt={4} isRequired>
                  <FormLabel>Category</FormLabel>
                  <InputGroup>
                    <Select name="category"
                      variant="auth"
                      defaultValue={item.category}
                      bg={colorMode === "light" ? "gray.100" : "gray.600"}
                      borderRadius="3xl"
                      color={textColor}
                    >
                      <option disabled>Select Category</option>
                      <option value="electronics">Electronics</option>
                      <option value="clothes">Clothes</option>
                      <option value="realestate">Real Estate</option>
                      <option value="pets">Pets</option>
                      <option value="vehicles">Vehicles</option>
                      <option value="others">Others</option>
                    </Select>
                  </InputGroup>
                </FormControl>

              </HStack>


              <HStack spacing={4}>
                <FormControl mt={4} isRequired>
                  <FormLabel>Sub Category</FormLabel>
                  <InputGroup>
                    {/* <InputLeftElement pointerEvents="none" children={<TfiEmail/>} /> */}
                    <Input
                      type="text"
                      name="subCategory"
                      placeholder="subCategory"
                      variant="auth"
                      defaultValue={item.subCategory}
                      bg={colorMode === "light" ? "gray.100" : "gray.600"}
                      borderRadius="3xl"
                      color={textColor}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl mt={4} isRequired>
                  <FormLabel mt={4} >Condition</FormLabel>
                  <InputGroup>
                    {/* <InputLeftElement pointerEvents="none" children={<TfiEmail/>} /> */}
                    <Select
                      name="itemCondition" variant="auth"
                      defaultValue={item.itemCondition}
                      bg={colorMode === "light" ? "gray.100" : "gray.600"}
                      borderRadius="3xl"
                      color={textColor}
                    >
                      <option disabled>Select Condition</option>
                      <option value="New">New</option>
                      <option value="Used">Used</option>
                    </Select>
                  </InputGroup>
                </FormControl>
              </HStack>


              <HStack w='100%' gap='3'>
                <FormControl mt={4} isRequired>
                  <FormLabel  >Start Date</FormLabel>
                  <InputGroup>
                    {/* <InputLeftElement pointerEvents="none" children={<TfiEmail/>} /> */}
                    <Input
                      type="datetime-local"
                      name="startDate"
                      placeholder="startDate"
                      min={new Date().toISOString().slice(0, 16)}
                      variant="auth"
                      defaultValue={item.startDate && item.startDate.slice(0, 16)}
                      onChange={(e) => handleEndDate(e)}
                      bg={colorMode === "light" ? "gray.100" : "gray.600"}
                      borderRadius="3xl"
                      color={textColor}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel mt={4}>End Date</FormLabel>
                  <InputGroup>
                    {/* <InputLeftElement pointerEvents="none" children={<TfiEmail/>} /> */}
                    <Input
                      type="datetime-local"
                      name="endDate"
                      placeholder="endDate"
                      min={minEndDate}
                      variant="auth"
                      defaultValue={item.endDate && item.endDate.slice(0, 16)}
                      bg={colorMode === "light" ? "gray.100" : "gray.600"}
                      borderRadius="3xl"
                      color={textColor}
                    />
                  </InputGroup>
                </FormControl>
              </HStack>

              <HStack spacing={4} >
                <FormControl isRequired>
                  <FormLabel mt={4}>Initial Price</FormLabel>
                  <InputGroup>
                    <InputLeftElement children={<FaDollarSign />} />

                    <Input
                      type="number"
                      name="initialPrice"
                      placeholder="initialPrice"
                      variant="auth"
                      defaultValue={item.initialPrice}
                      bg={colorMode === "light" ? "gray.100" : "gray.600"}
                      borderRadius="3xl"
                      color={textColor}
                    />

                  </InputGroup>
                </FormControl>

                <FormControl  >
                  <FormLabel mt={5}>*</FormLabel>
                  <InputGroup>
                    {/* <InputLeftElement pointerEvents="none" children={<TfiEmail/>} /> */}
                    <Input
                      type="file"
                      name="itemImage"
                      multiple="multiple"
                      placeholder="itemImage"
                      variant="auth"
                      onChange={(e) => validateImage(e, toast)}
                      bg='transparent'
                      _hover={{ bg: 'transparent', cursor: 'pointer' }}
                      color={textColor}
                    />
                  </InputGroup>
                  <FormHelperText textAlign="left">you can upload up to 8 images.</FormHelperText>
                </FormControl>
              </HStack>

              <FormControl mt={4}>
                <FormLabel>Item Description</FormLabel>
                <Textarea
                  type="text"
                  name="itemDescription"
                  placeholder="itemDescription"
                  variant="auth"
                  rowGap='20'
                  defaultValue={item.itemDescription}
                  bg={colorMode === "light" ? "gray.100" : "gray.600"}
                  borderRadius="3xl"
                  color={textColor}
                />
              </FormControl>


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

export default EditItem;
