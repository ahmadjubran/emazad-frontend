import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import AddComment from "./AddComment";
import Replies from "./Replies";

export default function Comments({ item }) {
  return (
    <Box>
      <Flex direction="column" bg="white" borderRadius="lg" overflow="hidden" p="4" mt="4">
        <Text fontSize="xl" fontWeight="bold">
          Comments
        </Text>
        <Box>
          {item.Comments &&
            item.Comments.map((comment) => (
              <Box key={comment.id}>
                <Flex direction="column" bg="white" borderRadius="lg" overflow="hidden" p="4" mt="4">
                  <Box display="flex" gap="4">
                    <Image src={comment.User.image} w="50px" h="50px" borderRadius="full" bg="gray.100" />
                    <Box>
                      <Text fontSize="xl" fontWeight="bold">
                        {comment.User.fullName}
                      </Text>
                    </Box>
                  </Box>
                  <Text fontSize="xl">{comment.comment}</Text>
                </Flex>
                <Replies comment={comment} />
              </Box>
            ))}
        </Box>
      </Flex>
      <Flex direction="column" bg="white" borderRadius="lg" overflow="hidden" p="4" mt="4">
        <Text fontSize="xl" fontWeight="bold">
          Add Comment
        </Text>
        <Box>
          <AddComment item={item} />
        </Box>
      </Flex>
    </Box>
  );
}
