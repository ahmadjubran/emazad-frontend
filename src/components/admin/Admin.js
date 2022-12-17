import React from 'react';
import { Heading, Button, Text, Flex, Tag, Image, Box, Link, Icon} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { FiHome } from "react-icons/fi";
import { FaUsersSlash } from "react-icons/fa";
import { TbDatabase, TbDatabaseOff } from "react-icons/tb";
import { MdReport } from "react-icons/md";
import { getActiveItem, getBlockedItem, getSoldItem } from '../../store/actions/adminActions';
function Admin() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const admin = useSelector((state) => state.admin);
    return (
        console.log(admin),
        <div>
            <Flex
                flexDir='row'
                overflow='hidden'
                maxW='2000px'
                h='100vh'
            >
                <Flex
                    w='20%'
                    flexDir='column'
                    alignItems={'center'}
                    justifyContent='space-evenly'
                    bg='#D7D7D9'
                >
                    <Flex
                        flexDir='column'
                        alignItems={'center'}
                        justifyContent='space-evenly'
                        gap='5'
                    >
                        <Image src={user.image} alt="admin" borderRadius='full' boxsize='100px' />
                        <Text as="h1" size="xl">Admin : {user.fullName}</Text>
                    </Flex>


                    <Flex flexDir="column" alignItems='flex-start' justifyContent='center' gap='5'>

                        <Flex flexDir="row" alignItems='center' justifyContent='center' gap='3' fontSize='xl'
                            fontWeight='bold' _hover={{ color: '#5BCCD9' }}>
                            <Link>
                                <Icon as={FiHome} fontSize='3xl' _hover={{ color: '#5BCCD9' }} />
                            </Link>
                            <Link _hover={{ textDecor: 'none', color: '#5BCCD9' }}>Home</Link>
                        </Flex>
                        <Flex flexDir="row" alignItems='center' justifyContent='center' gap='3' fontSize='xl'
                            fontWeight='bold' _hover={{ color: '#5BCCD9' }}
                            onClick={() => {
                                getActiveItem(dispatch);
                            }}
                        >
                            <Link >
                                <Icon as={TbDatabase} fontSize='2xl' _hover={{ color: '#5BCCD9' }} />
                            </Link>
                            <Link _hover={{ textDecor: 'none', color: '#5BCCD9' }}>Items Active </Link>
                        </Flex>
                        <Flex flexDir="row" alignItems='center' justifyContent='center' gap='3' fontSize='xl'
                            fontWeight='bold' _hover={{ color: '#5BCCD9' }}
                            onClick={() => {
                                getSoldItem(dispatch);
                            }}
                        >
                            <Link >
                                <Icon as={TbDatabaseOff} fontSize='2xl' _hover={{ color: '#5BCCD9' }} />
                            </Link>
                            <Link _hover={{ textDecor: 'none', color: '#5BCCD9' }}>Items Sold </Link>
                        </Flex>
                        <Flex flexDir="row" alignItems='center' justifyContent='center' gap='3' fontSize='xl'
                            fontWeight='bold' _hover={{ color: '#5BCCD9' }}
                        >
                            <Link >
                                <Icon as={FaUsersSlash} fontSize='2xl' _hover={{ color: '#5BCCD9' }} />
                            </Link>
                            <Link _hover={{ textDecor: 'none', color: '#5BCCD9' }}>User Blocked </Link>
                        </Flex>
                        <Flex flexDir="row" alignItems='center' justifyContent='center' gap='3' fontSize='xl'
                            fontWeight='bold' _hover={{ color: '#5BCCD9' }}
                            onClick={() => {
                                getBlockedItem(dispatch);
                            }}
                        >
                            <Link >
                                <Icon as={MdReport} fontSize='2xl' _hover={{ color: '#5BCCD9' }} />
                            </Link>
                            <Link _hover={{ textDecor: 'none', color: '#5BCCD9' }}>Report</Link>
                        </Flex>
                    </Flex>

                    <Flex >
                        <Text>dfsdff</Text>
                    </Flex>
                </Flex>
            </Flex>

        </div>
    )
}

export default Admin;
