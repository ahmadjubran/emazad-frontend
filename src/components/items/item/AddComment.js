import { Box, Button, Flex, Heading, Image, Input, Text, Textarea } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../../store/actions/commentActions";
import { selectUser } from "../../../store/features/authSlicer";
import { useToast } from "@chakra-ui/react";

export default function AddComment({ item }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const toast = useToast();

  const handleAddComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    addComment(dispatch, item.id, comment, toast);
    e.target.comment.value = "";
    e.target.comment.style.height = "auto";
    e.target.comment.style.height = e.target.comment.scrollHeight + "px";
    document.getElementById("comments").scrollIntoView();
  };

  return (
    <Flex direction="column" borderRadius="lg" overflow="hidden" m="4">
      <Heading as="h3" size="md" pb="4" textTransform="uppercase">
        Add Comment
      </Heading>
      <form onSubmit={handleAddComment}>
        <Box display="flex" gap="2">
          <Image
            src={user.image}
            alt={user.fullName}
            w="10"
            h="10"
            borderRadius="full"
            objectFit="cover"
            alignSelf="flex-start"
            mt="2"
          />
          <Flex flexDirection="column" bg="gray.300" p="4" borderRadius="3xl" w="100%">
            <Text fontSize="sm" textTransform="capitalize" fontWeight="bold" mb="2">
              {user.fullName}
            </Text>
            <Textarea
              name="comment"
              placeholder="Write a comment..."
              rows="1"
              resize="none"
              fontSize="sm"
              bg="gray.200"
              textTransform="capitalize"
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              borderRadius="3xl"
              overflow="hidden"
              borderColor="gray.400"
              _hover={{ borderColor: "gray.500" }}
            />
            <Button
              type="submit"
              size="sm"
              colorScheme="blue"
              mt="2"
              alignSelf="flex-start"
              variant="outline"
              borderRadius="3xl"
            >
              Comment
            </Button>
          </Flex>
        </Box>
      </form>
    </Flex>
  );
}
