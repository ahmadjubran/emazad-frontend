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
  Textarea,
  FormHelperText,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../store/actions/itemActions";
import { FaDollarSign } from "react-icons/fa";

import { validateImage, uploadItemImage } from "../../store/actions/itemActions";

function AddItem() {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.item.error);
  const loading = useSelector((state) => state.item.loading);
  const userId = useSelector((state) => state.auth.user.id);

  // set the date to now in day and time format YYYY-MM-DDTHH:MM
  const date = new Date().toISOString().slice(0, 16);

  async function handleSubmit(e) {
    e.preventDefault();
    const imageURL = await uploadItemImage();
    console.log(imageURL);
    // signup the user
    addItem(dispatch, e, imageURL, userId)
  }

  return (
    <Flex direction={{ base: "column", md: "row" }} justify="center" align="center" w="100%" h="70vh">
      <VStack
        w="100%"
        h="100%"
        justify="center"
        align="center"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
      >
        <Heading textStyle="h1" mb="1em">
          Create Item
        </Heading>

        <form onSubmit={(e) => handleSubmit(e)}>
          {/* itemTitle */}
          <FormControl pb="1em" isRequired>
            <InputGroup>
              {/* <InputLeftElement pointerEvents="none" children={<TfiEmail/>} /> */}
              <Input type="text" name="itemTitle" placeholder="Title" variant="auth" />
            </InputGroup>
          </FormControl>

          <FormControl pb="1em" isRequired>
            <InputGroup>
              {/* <InputLeftElement pointerEvents="none" children={<TfiEmail/>} /> */}
              <Textarea type="text" name="itemDescription" placeholder="itemDescription" variant="auth" />
            </InputGroup>
          </FormControl>

          <FormControl pb="1em">
            <InputGroup>
              {/* <InputLeftElement pointerEvents="none" children={<TfiEmail/>} /> */}
              <Input type="file" name="itemImage" multiple="multiple" placeholder="itemImage" variant="auth" onChange={(e) => validateImage(e)}/>
            </InputGroup>
            <FormHelperText textAlign="left">you can upload up to 8 images.</FormHelperText>
          </FormControl>

          <FormControl pb="1em" isRequired>
            <InputGroup>
              <Select name="category" variant="auth">
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

          <FormControl pb="1em" isRequired>
            <InputGroup>
              {/* <InputLeftElement pointerEvents="none" children={<TfiEmail/>} /> */}
              <Input type="text" name="subCategory" placeholder="subCategory" variant="auth" />
            </InputGroup>
          </FormControl>

          <FormControl pb="1em" isRequired>
            <InputGroup>
              {/* <InputLeftElement pointerEvents="none" children={<TfiEmail/>} /> */}
              <Select name="itemCondition" variant="auth">
                <option disabled>Select Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </Select>
            </InputGroup>
          </FormControl>

          <FormControl pb="1em" isRequired>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaDollarSign />} />
              <NumberInput bg="grey.100">
                <NumberInputField pl="10" name="initialPrice"/>
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
          </FormControl>

          <FormControl pb="1em" isRequired>
            <InputGroup>
              {/* <InputLeftElement pointerEvents="none" children={<TfiEmail/>} /> */}
              <Input type="datetime-local" name="startDate" placeholder="startDate" min={date} variant="auth" />
            </InputGroup>
          </FormControl>

          <FormControl pb="1em" isRequired>
            <InputGroup>
              {/* <InputLeftElement pointerEvents="none" children={<TfiEmail/>} /> */}
              <Input type="datetime-local" name="endDate" placeholder="endDate" min={date} variant="auth" />
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
            Add Item
          </Button>

          {/* <Text >
            Don't have an account?{" "}
            <Link to='/signup' style={{ color: "white", textDecoration: "none",}}>
              Signup
            </Link>
          </Text> */}
        </form>
      </VStack>
    </Flex>
  );
}

export default AddItem;
