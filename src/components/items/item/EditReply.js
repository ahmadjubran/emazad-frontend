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
import { editReply } from "../../../store/actions/replyActions";

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
        variant="none"
        size="sm"
        _hover={{ color: "blue.600", bg: "gray.300" }}
        w="100%"
        justifyContent="left"
        alignItems="center"
        borderRadius="0"
      >
        {<IoPencil />}
        <span style={{ marginLeft: "5px" }}>Edit Post</span>
      </Button>

      <Modal isOpen={show} onClose={() => setShow(false)}>
        <ModalOverlay />
        <ModalContent
          bg={colorMode === "light" ? "gray.200" : "gray.700"}
          color={colorMode === "light" ? "gray.700" : "gray.200"}
          borderRadius="3xl"
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
                  fontSize="sm"
                  textTransform="capitalize"
                  bg={colorMode === "light" ? "gray.100" : "gray.600"}
                  rows={reply.reply ? reply.reply.split("\n").length : 1}
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
              onClick={handleEditReply}
            >
              Edit
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
        </ModalContent>
      </Modal>
    </>
  );
}
