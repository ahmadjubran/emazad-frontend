import React, { useEffect } from 'react';
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
import { useSelector, useDispatch } from "react-redux";
import caption from '../../assets/caption.json';
import Admin from "./Admin";
import ReportRow from "./ReportRow";
import { getBlockedItem } from '../../store/actions/adminActions';
function ReportItems() {
    const textColor = useColorModeValue("blue.500", "white");
    const admin = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    useEffect(() => {
        getBlockedItem(dispatch);
    }, [dispatch]);

    return (
        console.log(admin.reportItems),
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
                            Reported Items
                        </Heading>
                    </Flex>
                </Box>
                <Box>
                    <Table variant='simple' color={textColor}>
                        <Thead>
                            <Tr my='.8rem' pl='0px'>
                                {
                                    caption.caption.reportItem.map((caption, idx) => {
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
                                admin.reportItems.map((row) => {
                                    return (
                                        <ReportRow
                                            key={row.id}
                                            logo={row.itemImage}
                                            category={row.category}
                                            title={row.itemTitle}
                                            condetion={row.itemCondition}
                                            endDate={row.endDate}
                                            startDate={row.startDate}
                                            reportItem={row.Reports}
                                            item={row}
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


export default ReportItems;