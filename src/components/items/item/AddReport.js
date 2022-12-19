import {
  Button,
  Input,
  Select,
  Textarea,
  useToast,
  InputGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  useColorMode,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  FormControl,
  ModalFooter,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../store/features/authSlicer";
import { addReport } from "../../../store/actions/adminActions";
import { MdReportProblem } from "react-icons/md";

export default function AddReport({ itemId }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const toast = useToast();
  const { colorMode } = useColorMode();
  const [show, setShow] = useState(false);

  const handleAddReport = (e) => {
    e.preventDefault();
    addReport(dispatch, e, itemId, user.id, toast);
    setShow(false);
  };

  return (
    <>
      <>
        <Button
          onClick={() => setShow(true)}
          variant="none"
          size="sm"
          _hover={{ color: "blue.600", bg: "gray.300" }}
          w="100%"
          justifyContent="left"
          alignItems="center"
          borderRadius="0"
        >
          {<MdReportProblem />}
          <span style={{ marginLeft: "0.6rem" }}>Report</span>
        </Button>

        <Modal isOpen={show} onClose={() => setShow(false)}>
          <ModalOverlay />
          <ModalContent
            bg={colorMode === "light" ? "gray.200" : "gray.700"}
            color={colorMode === "light" ? "gray.700" : "gray.200"}
            borderRadius="3xl"
          >
            <ModalHeader>Report Item</ModalHeader>
            <ModalCloseButton />

            <form onSubmit={(e) => handleAddReport(e)}>
              <ModalBody>
                <VStack spacing="4" w="100%">
                  <FormControl isRequired>
                    <Input
                      type="text"
                      placeholder="Title"
                      name="reportTitle"
                      fontSize="sm"
                      bg={colorMode === "light" ? "gray.100" : "gray.600"}
                      borderRadius="3xl"
                      overflow="hidden"
                      borderColor="gray.200"
                      _hover={{ borderColor: "gray.500" }}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <Textarea
                      name="reportMessage"
                      placeholder="Report Message"
                      resize="none"
                      fontSize="sm"
                      bg={colorMode === "light" ? "gray.100" : "gray.600"}
                      onInput={(e) => {
                        e.target.style.height = "auto";
                        e.target.style.height = e.target.scrollHeight + "px";
                      }}
                      borderRadius="3xl"
                      overflow="hidden"
                      borderColor="gray.200"
                      _hover={{ borderColor: "gray.500" }}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <InputGroup>
                      <Select
                        name="reportReason"
                        type="text"
                        placeholder="Select Reason..."
                        fontSize="sm"
                        bg={colorMode === "light" ? "gray.100" : "gray.600"}
                        borderRadius="3xl"
                        overflow="hidden"
                        borderColor="gray.200"
                        _hover={{ borderColor: "gray.500" }}
                      >
                        <option value="Spam">Spam</option>
                        <option value="Inappropriate">Inappropriate</option>
                        <option value="Scam">Scam</option>
                        <option value="Other">Other</option>
                      </Select>
                    </InputGroup>
                  </FormControl>
                </VStack>
              </ModalBody>

              <ModalFooter>
                <Button
                  type="submit"
                  size="sm"
                  colorScheme="blue"
                  mt="2"
                  alignSelf="flex-start"
                  variant="outline"
                  borderRadius="3xl"
                >
                  Report
                </Button>
                <Button
                  onClick={() => setShow(false)}
                  size="sm"
                  mt="2"
                  alignSelf="flex-start"
                  variant="outline"
                  borderRadius="3xl"
                >
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    </>
  );
}
