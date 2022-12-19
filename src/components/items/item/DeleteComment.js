import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { IoTrash } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../../store/actions/commentActions";

function DeleteItem({ commentId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const toast = useToast();
  const HandleDelete = () => {
    deleteComment(dispatch, commentId, toast);
    onClose();
    };

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
        {<IoTrash />}
        <span style={{ marginLeft: "0.6rem" }}>Delete</span>
      </Button>

      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Comment
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure you want to delete this comment? You can't undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button colorScheme="red" onClick={HandleDelete} ml={3}>
                        Delete
                    </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default DeleteItem;
