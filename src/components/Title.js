import React from "react";
import { Text } from "@chakra-ui/react";

function Title({ children }) {
  return (
    <Text fontSize="4xl" fontWeight="bold" textAlign={{ base: "center" }} textTransform="uppercase" mb={5}>
      {children}
    </Text>
  );
}

export default Title;
