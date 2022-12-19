import {
    Avatar,
    Button,
    Flex,
    Td,
    Text,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import EditItem from "../item/EditItem";
import { Link } from "react-router-dom";
function ItemsRow(props) {
    const { logo, name, owner, date, category, lastBid, winner, status, item } = props;
    const textColor = useColorModeValue("gray.700", "white");
    return (
        <Tr>
            <Td minWidth={{ sm: "250px" }} pl="0px">
                <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                    <Avatar as={Link} to={`/item/${item.id}`}
                        src={logo[0]} w="50px" borderRadius="12px" me="18px" />
                    <Flex direction="column">
                        <Text
                            fontSize="md"
                            color={textColor}
                            fontWeight="bold"
                            minWidth="100%"
                        >
                            {name}
                        </Text>
                        <Text fontSize="sm" color="gray.400" fontWeight="normal">
                            {category}
                        </Text>
                    </Flex>
                </Flex>
            </Td>

            <Td>
                <Text fontSize="md" color={textColor} fontWeight="bold">
                    {owner}
                </Text>
            </Td>
            <Td>
                <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                    ${lastBid}
                </Text>
            </Td>
            {status === "sold" && winner &&
                <Td>
                    <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">

                        {winner.User.fullName}
                    </Text>
                </Td>
            }
            {status === "sold" && !winner &&

                <Td>
                    <Text fontSize="2xl" color={textColor} fontWeight="bolder" pb=".5rem">
                        -
                    </Text>
                </Td>

            }

            <Td>
                <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                    {date.slice(0, 10)} at {date.slice(11, 16)}
                </Text>
            </Td>

            <Td>
                <Button p="0px" bg="transparent" variant="no-hover"  >
                    <Text
                        color="gray.400"
                        fontWeight="bold"
                        cursor="pointer"
                        _hover={{ color: '#5BCCD9' }}
                        as={EditItem}
                        item={item}
                    >
                    </Text>
                </Button>
            </Td>
        </Tr>
    );
}

export default ItemsRow;