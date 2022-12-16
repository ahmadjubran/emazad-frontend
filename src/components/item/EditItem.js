import React, { useState } from "react";

import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { FaDollarSign } from "react-icons/fa";
import { IoPencil } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { editItem } from "../../store/actions/itemActions";

import { uploadItemImage, validateImage } from "../../store/actions/itemActions";

function EditItem({ item }) {
  const error = useSelector((state) => state.item.error);
  const loading = useSelector((state) => state.item.loading);
  const userId = useSelector((state) => state.auth.user.id);
  const [newDate, setNewDate] = useState("");

  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const date = new Date().toISOString().slice(0, 16);

  async function handleSubmit(e) {
    e.preventDefault();
    const imageURL = await uploadItemImage();
    console.log(imageURL);
    // signup the user
    editItem(dispatch, e, imageURL, userId, item.id, item.itemImage);
  }

  const newStartDate = (e) => {
    e.preventDefault();
    setNewDate(e.target.value);
  };

  return (
    <>
      {/* <Button onClick={onOpen}>Edit Item</Button> */}
      <Button onClick={onOpen} variant="none" size="sm" _hover={{ color: "blue.600" }}>
        {<IoPencil />}
        <span style={{ marginLeft: "0.6rem" }}>Edit Item</span>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your item</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={(e) => handleSubmit(e)}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input type="text" name="itemTitle" placeholder="Title" variant="auth" defaultValue={item.itemTitle} />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Item Description</FormLabel>
                <Textarea
                  type="text"
                  name="itemDescription"
                  placeholder="itemDescription"
                  variant="auth"
                  defaultValue={item.itemDescription}
                />
              </FormControl>

              <FormControl mt={4}>
                <InputGroup>
                  {/* <InputLeftElement pointerEvents="none" children={<TfiEmail/>} /> */}
                  <Input
                    type="file"
                    name="itemImage"
                    multiple="multiple"
                    placeholder="itemImage"
                    variant="auth"
                    onChange={(e) => validateImage(e)}
                  />
                </InputGroup>
                <FormHelperText textAlign="left">you can upload up to 8 images.</FormHelperText>
              </FormControl>

              <FormControl mt={4} isRequired>
                <InputGroup>
                  <Select name="category" variant="auth" defaultValue={item.category}>
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

              <FormControl mt={4} isRequired>
                <InputGroup>
                  {/* <InputLeftElement pointerEvents="none" children={<TfiEmail/>} /> */}
                  <Input
                    type="text"
                    name="subCategory"
                    placeholder="subCategory"
                    variant="auth"
                    defaultValue={item.subCategory}
                  />
                </InputGroup>
              </FormControl>

              <FormControl mt={4} isRequired>
                <InputGroup>
                  {/* <InputLeftElement pointerEvents="none" children={<TfiEmail/>} /> */}
                  <Select name="itemCondition" variant="auth" defaultValue={item.itemCondition}>
                    <option disabled>Select Condition</option>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                  </Select>
                </InputGroup>
              </FormControl>

              <FormControl mt={4} isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<FaDollarSign />} />
                  <NumberInput bg="grey.100" name="initialPrice" defaultValue={item.initialPrice}>
                    <NumberInputField pl="10" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </InputGroup>
              </FormControl>

              <FormControl mt={4} isRequired>
                <InputGroup>
                  {/* <InputLeftElement pointerEvents="none" children={<TfiEmail/>} /> */}
                  <Input
                    type="datetime-local"
                    name="startDate"
                    placeholder="startDate"
                    min={new Date().toISOString().slice(0, 16)}
                    variant="auth"
                    defaultValue={item.startDate && item.startDate.slice(0, 16)}
                    onChange={(e) => newStartDate(e)}
                  />
                </InputGroup>
              </FormControl>

              <FormControl mt={4} isRequired>
                <InputGroup>
                  {/* <InputLeftElement pointerEvents="none" children={<TfiEmail/>} /> */}
                  <Input
                    type="datetime-local"
                    name="endDate"
                    placeholder="endDate"
                    min={newDate}
                    variant="auth"
                    defaultValue={item.endDate && item.endDate.slice(0, 16)}
                  />
                </InputGroup>
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

              <Button variant="primary" type="submit" mr={3}>
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
