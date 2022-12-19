import { Box, Flex, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Text, useToast, } from "@chakra-ui/react";
import React from "react";
import { IoEllipsisVertical, IoTrash } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { showTime } from "../../../store/actions/generalActions";
import { deleteReply } from "../../../store/actions/replyActions";
import { selectIsAuth, selectUser } from "../../../store/features/authSlicer";
import EditReply from "./EditReply";

export default function Replies({ comment }) {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectUser);
  const toast = useToast();

  return (
    <Box>
      {comment.Replies &&
        comment.Replies.map((reply) => (
          <Flex key={reply.id} direction="column" borderRadius="lg" overflow="hidden" my="2" ml="14">
            <Flex alignItems="flex-start" gap="2">
              {" "}
              <Image
                src={reply.User.image}
                alt={reply.User.fullName}
                w="8"
                h="8"
                borderRadius="full"
                objectFit="cover"
                alignSelf="flex-start"
                mt="2"
              />
              <Flex flexDirection="column" bg="gray.300" p="4" borderRadius="3xl">
                <Link to={`/profile/${reply.User.id}`}>
                <Text fontSize="sm" textTransform="capitalize" fontWeight="bold">
                  {reply.User && reply.User.fullName}
                </Text>
                </Link>
                <Text fontSize="sm" textTransform="capitalize" whiteSpace="pre-line">
                  {reply.reply}
                </Text>
              </Flex>
              {isAuth && (user.id === reply.userId || user.role === "admin") && (
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
                    bg="gray.200"
                    color="gray.700"
                    fontSize="sm"
                    fontWeight="normal"
                    borderRadius="lg"
                    shadow="lg"
                  >
                    <MenuItem as={EditReply} reply={reply} />
                    <MenuItem
                      onClick={() => deleteReply(dispatch, reply, toast)}
                      icon={<IoTrash />}
                      bg="gray.200"
                      _hover={{ bg: "gray.300" }}
                    >
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Flex>
            <Text fontSize="sm" color="gray.500" ml="14">
              {showTime(reply.createdAt)}
            </Text>
          </Flex>
        ))}
    </Box>
  );
}
