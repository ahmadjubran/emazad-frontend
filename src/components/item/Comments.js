import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoEllipsisVertical, IoPencil, IoTrash } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../store/actions/commentActions";
import { selectUser } from "../../store/features/authSlicer";
import AddComment from "./AddComment";
import AddReply from "./AddReply";
import EditComment from "./EditComment";
import Replies from "./Replies";

export default function Comments({ item, showTime }) {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(3);
  const [showMore, setShowMore] = useState(false);
  const [showLess, setShowLess] = useState(false);
  const [showAddReply, setShowAddReply] = useState(null);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (item.Comments && item.Comments.length > showComments) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
  }, [showComments, item.Comments]);

  const handleShowMore = () => {
    setShowComments(showComments + 3);
    setShowLess(true);
  };

  const handleShowLess = () => {
    setShowComments(3);
    setShowLess(false);
  };

  const handleShowAddReply = (id) => {
    if (showAddReply === id) {
      setShowAddReply(null);
    } else {
      setShowAddReply(id);
    }
  };

  return (
    <Box w="100%" border="1px" borderColor="gray.300" borderRadius="2xl" boxShadow="md" bg="gray.200" pt="4">
      <Heading
        as="h3"
        size="md"
        pb="4"
        pl="4"
        textTransform="uppercase"
        borderBottom="1px solid"
        borderColor="gray.300"
      >
        Comments
      </Heading>
      {item.Comments &&
        item.Comments.slice(0, showComments).map((comment) => (
          <Box gap="2" borderBottom="1px solid" borderColor="gray.300" pb="4" m="4" key={comment.id}>
            <Flex alignItems="flex-start" gap="2">
              <Image
                src={comment.User.image}
                alt={comment.User.fullName}
                w="10"
                h="10"
                borderRadius="full"
                objectFit="cover"
                mt="2"
              />
              <Flex flexDirection="column" bg="gray.300" p="4" borderRadius="3xl">
                <Text fontSize="sm" textTransform="capitalize" fontWeight="bold">
                  {comment.User && comment.User.fullName}
                </Text>
                <Text fontSize="sm" textTransform="capitalize" whiteSpace="pre-line">
                  {comment.comment}
                </Text>
              </Flex>
              {comment.User.id === user.id && (
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<IoEllipsisVertical />}
                    variant="none"
                    size="lg"
                    alignSelf="center"
                  />
                  <MenuList
                    bg="gray.100"
                    color="gray.700"
                    fontSize="sm"
                    fontWeight="normal"
                    borderRadius="lg"
                    shadow="lg"
                  >
                    <MenuItem as={EditComment} comment={comment}>
                      <IoPencil />
                      Edit
                    </MenuItem>
                    <MenuItem onClick={() => deleteComment(dispatch, comment.id)}>
                      <IoTrash />
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Flex>
            <Flex alignItems="start" gap="2">
              <Text fontSize="sm" color="gray.500" ml="14">
                {showTime(comment.createdAt)}
              </Text>
              <Text fontSize="sm" color="blue.500" cursor="pointer" onClick={() => handleShowAddReply(comment.id)}>
                Reply
              </Text>
            </Flex>
            <Box>
              <Replies comment={comment} showTime={showTime} />
            </Box>
            {showAddReply === comment.id && <AddReply comment={comment} setShowAddReply={setShowAddReply} />}
          </Box>
        ))}
      <VStack
        alignItems="center"
        flexDir="rows"
        justifyContent="center"
        gap="4"
        borderBottom={item.Comments && item.Comments.length > 0 ? "1px solid" : "none"}
        pb="4"
        borderColor="gray.300"
      >
        {showMore && (
          <Text
            fontSize="sm"
            color="blue.500"
            cursor="pointer"
            onClick={handleShowMore}
            _hover={{ color: "blue.400" }}
            mt="2"
          >
            Show more comments
          </Text>
        )}
        {showLess && (
          <Text
            fontSize="sm"
            color="blue.500"
            cursor="pointer"
            onClick={handleShowLess}
            _hover={{ color: "blue.400" }}
            mt="2"
          >
            Show less comments
          </Text>
        )}
      </VStack>
      <AddComment item={item} />
    </Box>
  );
}
