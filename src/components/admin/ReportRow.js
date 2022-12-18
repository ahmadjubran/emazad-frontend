import React from 'react';
import {
    Avatar,
    Flex,
    Icon,
    Td,
    Text,
    Tr,
    useColorModeValue,
    useDisclosure
} from "@chakra-ui/react";
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { BiEditAlt } from 'react-icons/bi';
import { FaUserSlash } from 'react-icons/fa';
import { BsFillEyeFill } from 'react-icons/bs';
import ReportItemMessage from './ReportItemMessage';

function ReportRow(props) {
    const { logo, startDate, endDate, condetion, title, category, reportItem } = props;
    const textColor = useColorModeValue("gray.700", "white");
    const { onOpen, isOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    return (
        <>
            <Tr>
                <Td minWidth={{ sm: "250px" }} pl="0px">
                    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                        <Avatar src={logo[0]} w="50px" borderRadius="12px" me="18px" />
                        <Flex direction="column">
                            <Text
                                fontSize="md"
                                color={textColor}
                                fontWeight="bold"
                                minWidth="100%"
                            >
                                {title}
                            </Text>
                            <Text fontSize="sm" color="gray.400" fontWeight="normal">
                                {category}
                            </Text>
                        </Flex>
                    </Flex>
                </Td>

                < Td >

                    <Flex direction="column">
                        <Text fontSize="md" color={textColor} fontWeight="bold">
                            {condetion}
                        </Text>
                    </Flex>
                </Td>



                <Td>
                    <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                        {reportItem.length}
                    </Text>
                </Td>

                <Td>
                    <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                        {startDate.slice(0, 10)} at {startDate.slice(11, 16)}
                    </Text>
                </Td>

                <Td>
                    <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                        {endDate.slice(0, 10)} at {endDate.slice(11, 16)}
                    </Text>
                </Td>
                <Td>
                    <Flex direction="row" alighItems="center" gap='3'>
                        <Icon as={BiEditAlt}
                            fontSize='xl'
                            _hover={{
                                color: '#5BCCD9',
                                cursor: 'pointer',
                                transform: 'scale(1.2)',
                            }}
                        ></Icon>
                        <Icon as={BsFillEyeFill}
                            fontSize='xl'
                            _hover={{
                                color: '#5BCCD9',
                                cursor: 'pointer',
                                transform: 'scale(1.2)',
                            }}
                            ref={btnRef}
                            onClick={onOpen}
                        ></Icon>
                        <Icon as={RiDeleteBin5Fill}
                            fontSize='xl'
                            _hover={{
                                color: 'red',
                                cursor: 'pointer',
                                transform: 'scale(1.2)',
                            }} ></Icon>
                        <Icon as={FaUserSlash}
                            fontSize='xl'
                            _hover={{
                                color: 'red',
                                cursor: 'pointer',
                                transform: 'scale(1.2)',
                            }} ></Icon>
                    </Flex>
                </Td>
            </Tr >
            <ReportItemMessage
                reportItem={reportItem}
                btnRef={btnRef}
                onOpen={onOpen}
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    );
}

export default ReportRow;
