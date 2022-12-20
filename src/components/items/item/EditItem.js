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
import categories from "../../../assets/categories.json";

function EditItem({ item }) {
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
    editItem(dispatch, e, imageURL, userId, item.id, item.itemImage, toast);
  }

  // console.log(categories.categories[0].subcategories)

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
          <ModalHeader>Edit your Item</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={(e) => handleSubmit(e)}>
            <ModalBody pb={6}>

              <HStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel fontWeight="bold" ml="2" mt='4' requiredIndicator>Title</FormLabel>
                  <Input type="text"
                    name="itemTitle"
                    placeholder="Title"
                    defaultValue={item.itemTitle}
                    bg={colorMode === "light" ? "gray.100" : "gray.600"}
                    borderRadius="3xl"
                    color={textColor}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontWeight="bold" ml="2" mt='4' requiredIndicator>Condition</FormLabel>
                  <InputGroup>
                    {/* <InputLeftElement pointerEvents="none" children={<TfiEmail/>} /> */}
                    <Select
                      name="itemCondition"
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


              <HStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel fontWeight="bold" ml="2" mt='4' requiredIndicator>Category</FormLabel>
                  <InputGroup>
                    <Select name="category"
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

                <FormControl isRequired>
                  <FormLabel fontWeight="bold" ml="2" mt='4' requiredIndicator>Sub Category</FormLabel>
                  <InputGroup>
                     {/* <Input
                      type="text"
                      name="subCategory"
                      placeholder="subCategory"
                      defaultValue={item.subCategory}
                      bg={colorMode === "light" ? "gray.100" : "gray.600"}
                      borderRadius="3xl"
                      color={textColor}
                    /> */}

                     <Select name='subCategory' bg='white' defaultValue={item.subCategory} >
                      
                      {categories.categories.map((category, index) => (
                        category.name === item.category && category.subcategories.map((subcategory, index) => (
                              <option value={subcategory} key={index}>{subcategory}</option>
                        ))
                        ))}
                    </Select>

                  </InputGroup>
                </FormControl> 

                
              </HStack>


              <HStack w='100%' gap='3'>

              <FormControl isRequired>
                  <FormLabel fontWeight="bold" ml="2" mt='4' requiredIndicator>Initial Price</FormLabel>
                  <InputGroup>
                    <InputLeftElement children={<FaDollarSign />} />

                    <Input
                      type="number"
                      name="initialPrice"
                      placeholder="initialPrice"
                      defaultValue={item.initialPrice}
                      bg={colorMode === "light" ? "gray.100" : "gray.600"}
                      borderRadius="3xl"
                      color={textColor}
                    />

                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontWeight="bold" ml="2" mt='4' requiredIndicator >Start Date</FormLabel>
                  <InputGroup>
                    {/* <InputLeftElement pointerEvents="none" children={<TfiEmail/>} /> */}
                    <Input
                      type="datetime-local"
                      name="startDate"
                      placeholder="startDate"
                      min={new Date().toISOString().slice(0, 16)}
                      defaultValue={item.startDate && item.startDate.slice(0, 16)}
                      onChange={(e) => handleEndDate(e)}
                      bg={colorMode === "light" ? "gray.100" : "gray.600"}
                      borderRadius="3xl"
                      color={textColor}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontWeight="bold" ml="2" mt='4' requiredIndicator>End Date</FormLabel>
                  <InputGroup>
                    {/* <InputLeftElement pointerEvents="none" children={<TfiEmail/>} /> */}
                    <Input
                      type="datetime-local"
                      name="endDate"
                      placeholder="endDate"
                      min={minEndDate}
                      defaultValue={item.endDate && item.endDate.slice(0, 16)}
                      bg={colorMode === "light" ? "gray.100" : "gray.600"}
                      borderRadius="3xl"
                      color={textColor}
                    />
                  </InputGroup>
                </FormControl>

              </HStack>


              <FormControl isRequired>
                <FormLabel fontWeight="bold" ml="2" mt='4' requiredIndicator>Item Description</FormLabel>
                <Textarea
                  type="text"
                  name="itemDescription"
                  placeholder="itemDescription"
                  rowGap='20'
                  defaultValue={item.itemDescription}
                  bg={colorMode === "light" ? "gray.100" : "gray.600"}
                  borderRadius="3xl"
                  color={textColor}
                />
              </FormControl>

              <HStack spacing={4} >

                <FormControl  >
                  <FormLabel fontWeight="bold" ml="2" mt='4'>Upload Images</FormLabel>
                  <InputGroup>
                    {/* <InputLeftElement pointerEvents="none" children={<TfiEmail/>} /> */}
                    <Input
                      type="file"
                      name="itemImage"
                      multiple="multiple"
                      placeholder="itemImage"
                      onChange={(e) => validateImage(e, toast)}
                      bg='transparent'
                      _hover={{ bg: 'transparent', cursor: 'pointer' }}
                      color={textColor}
                    />
                  </InputGroup>
                  <FormHelperText textAlign="left">you can upload up to 8 images.</FormHelperText>
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
                onClick={onClose}
                mr={3} 
                colorScheme="blue"
                borderRadius="3xl"
                w="100%"
              >
                Save
              </Button>
              <Button 
              onClick={onClose}
              colorScheme="blue"
                variant="outline"
                borderRadius="3xl"
                w="100%"
              >Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditItem;
