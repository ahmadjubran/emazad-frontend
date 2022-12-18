import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useColorMode,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoPencil } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { editReply } from "../../store/actions/replyActions";

export default function EditReply({ reply }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const { colorMode } = useColorMode();
  const [replyText, setReplyText] = useState(reply.reply);
  const [show, setShow] = useState(false);

  const handleEditReply = () => {
    editReply(dispatch, reply.id, replyText, toast);
    setShow(false);
  };

  return (
    <>
      <Button
        onClick={() => setShow(true)}
        color="blue.500"
        variant="none"
        size="sm"
        _hover={{ color: colorMode === "light" ? "blue.700" : "blue.300" }}
      >
        {<IoPencil />}
        <span style={{ marginLeft: "5px" }}>Edit Post</span>
      </Button>

      <Modal isOpen={show} onClose={() => setShow(false)}>
        <ModalOverlay />
        <ModalContent
          bg={colorMode === "light" ? "gray.200" : "gray.700"}
          color={colorMode === "light" ? "gray.700" : "gray.200"}
        >
          <ModalHeader>Edit Reply</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="4" w="100%">
              <FormControl id="reply" isRequired>
                <FormLabel>Reply</FormLabel>
                <Textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Reply"
                  resize="none"
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEditReply}>
              Save
            </Button>
            <Button variant="ghost" onClick={() => setShow(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
