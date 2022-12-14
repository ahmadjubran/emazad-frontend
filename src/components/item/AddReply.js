import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReply } from "../../store/actions/replyActions";

export default function AddReply({ comment }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleAddReply = (e) => {
    e.preventDefault();
    const reply = e.target.reply.value;
    addReply(dispatch, comment, reply);
  };

  return (
    <Box>
      <Flex direction="column" bg="white" borderRadius="lg" overflow="hidden" p="4" mt="4">
        <Text fontSize="xl" fontWeight="bold">
          Add Reply
        </Text>
        <Box>
          <form onSubmit={handleAddReply}>
            <Flex direction="column" gap="4">
              <Box>
                <input name="reply" id="reply" type="text" placeholder="Add Reply" />
              </Box>
              <Box>
                <Button type="submit">Add Reply</Button>
              </Box>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
}
