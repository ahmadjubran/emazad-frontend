import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../store/actions/commentActions";

export default function AddComment({ item }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleAddComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    addComment(dispatch, item.id, comment);
  };

  return (
    <Box>
      <Flex direction="column" bg="white" borderRadius="lg" overflow="hidden" p="4" mt="4">
        <Text fontSize="xl" fontWeight="bold">
          Add Comment
        </Text>
        <Box>
          <form onSubmit={handleAddComment}>
            <Flex direction="column" gap="4">
              <Image src={user.image} w="50px" h="50px" borderRadius="full" bg="gray.100" />
              <Box>
                <Text fontSize="xl" fontWeight="bold">
                  {user.fullName}
                </Text>
              </Box>
              <Box>
                <textarea name="comment" id="comment" cols="30" rows="10"></textarea>
              </Box>
              <Box>
                <Button type="submit">Add Comment</Button>
              </Box>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
}
