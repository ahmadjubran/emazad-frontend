import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { timeLeft } from "../store/actions/generalActions";

export default function RenderTimeLeft({ item, time }) {
  return (
    <Box
      w="100%"
      h="100%"
      p="2"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="lg"
    >
      <Text fontSize="md" color="gray.500">
        {time === "days" ? "Days" : time === "hours" ? "Hours" : time === "minutes" ? "Minutes" : "Seconds"}
      </Text>
      <Text fontSize="xl" fontWeight="bold">
        {item.status === "sold" ? 0 : timeLeft(item)[time]}
      </Text>
    </Box>
  );
}
