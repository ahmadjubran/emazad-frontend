import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import AddReply from "./AddReply";

export default function Replies({ comment }) {
  return (
    <Box>
      {comment.Replies &&
        comment.Replies.map((reply) => (
          <Flex key={reply.id} direction="column" bg="white" borderRadius="lg" overflow="hidden" p="4" mt="4">
            <Box display="flex" gap="4">
              <Image
                src={reply.User ? reply.User.image : "https://via.placeholder.com/150"}
                alt={reply.User ? reply.User.fullName : "User"}
                w="50px"
                h="50px"
                borderRadius="full"
                bg="gray.100"
              />
              <Box>
                <Text fontSize="xl" fontWeight="bold">
                  {reply.User ? reply.User.fullName : "User"}
                </Text>
              </Box>
            </Box>
            <Text fontSize="xl">{reply.reply}</Text>
          </Flex>
        ))}
      <Box>
        <AddReply comment={comment} />
      </Box>
    </Box>
  );
}
