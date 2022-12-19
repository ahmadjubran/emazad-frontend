import React from 'react'
import {
    Flex,
    Table,
    Tbody,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Box,
    Heading
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import caption from '../../assets/caption.json';
import Admin from "./Admin";
import UserBlockedRow from "./UserBlockedRow";

function UserBlocked() {
    const textColor = useColorModeValue("gray.700", "white");
    const admin = useSelector((state) => state.admin);
    return (
        console.log(admin),
        <Admin>
            <Box my='22px' h='100hv' w='100%'
                overflowX={{ sm: "scroll", xl: "hidden" }}
                border='1px solid'
                borderColor='gray.300'
                borderRadius='2xl'
                bg='gray.200'
                padding='1rem'
                mr='1.2rem'
                boxShadow='md'
            >
                <Box p='6px 0px 22px 0px'>
                    <Flex direction='column'>
                        <Heading color={textColor} fontWeight='bold' pb='.5rem' textAlign={'center'} textTransform='uppercase'>
                            Users Bloked
                        </Heading>
                    </Flex>
                </Box>
                <Box>
                    <Table variant='simple' color={textColor}>
                        <Thead>
                            <Tr my='.8rem' pl='0px'>
                                {
                                    caption.caption.reportUser.map((caption, idx) => {
                                        return (
                                            <Th color='gray.400' key={idx} ps={idx === 0 ? "0px" : null}>
                                                {caption}
                                            </Th>
                                        );
                                    })}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                admin.userBlocked.map((row) => {
                                    return (
                                        <UserBlockedRow
                                            key={row.id}
                                            id={row.id}
                                            logo={row.image}
                                            name={row.fullName}
                                            email={row.email}
                                            phone={row.phoneNumber}
                                        />
                                    );
                                })}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </Admin>
    );
};

export default UserBlocked
