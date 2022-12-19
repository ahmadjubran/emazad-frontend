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
import { Link } from "react-router-dom";
import { deleteItem } from "../../../store/actions/itemActions";

function DeleteItem({ itemId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();

  const HandleDelete = () => {
    deleteItem(dispatch, itemId, toast);
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
              Delete Item
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure you want to delete this item? You can't undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
                    <Button onClick={onClose}>Cancel</Button>
                <Link to="/">
                    <Button colorScheme="red" onClick={HandleDelete} ml={3}>
                        Delete
                    </Button>
                </Link>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default DeleteItem;
