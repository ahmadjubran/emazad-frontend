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
import { activationUsers } from '../../store/actions/adminActions';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

function UserBlockedRow(props) {
    const { logo, name, email, phone, id } = props;
    const textColor = useColorModeValue("gray.700", "white");
    const dispatch = useDispatch();
    return (
        < Tr >
            <Td minWidth={{ sm: "250px" }} pl="0px">
                <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                    <Avatar as={Link} to={`/profile/${id}`}
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
                    </Flex>
                </Flex>
            </Td>

            <Td>
                <Text fontSize="md" color={textColor} fontWeight="bold">
                    {email}
                </Text>
            </Td>
            <Td>
                <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                    {phone}
                </Text>
            </Td>
            <Td>
                <Button p="0px" bg="transparent" variant="no-hover">
                    <Text
                        fontSize="md"
                        color="gray.400"
                        fontWeight="bold"
                        cursor="pointer"
                        _hover={{ color: 'red' }}

                        onClick={() => {
                            activationUsers(dispatch, id)
                        }}
                    >
                        Remove Block
                    </Text>
                </Button>
            </Td>
        </Tr >
    );
}

export default UserBlockedRow;
