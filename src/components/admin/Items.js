// Chakra imports
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
import ItemsRow from "./ItemsRow";
import caption from '../../assets/caption.json';
import Admin from "./Admin";
const Items = () => {
    const textColor = useColorModeValue("blue.500", "white");
    const admin = useSelector((state) => state.admin);
    return (
        <Admin>
            {admin.item.length &&
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
                                {admin.item[0].status} Items
                            </Heading>
                        </Flex>
                    </Box>
                    <Box>
                        <Table variant='simple' color={textColor}>
                            <Thead>
                                <Tr my='.8rem' pl='0px'>
                                    {
                                        (admin.item[0].status === 'active' ? caption.caption.activeItem : caption.caption.soldItem)
                                            .map((caption, idx) => {
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
                                    admin.item.map((row) => {
                                        return (
                                            <ItemsRow
                                                key={row.id}
                                                logo={row.itemImage}
                                                name={row.itemTitle}
                                                owner={row.User.fullName}
                                                status={row.status}
                                                date={row.endDate}
                                                category={row.category}
                                                lastBid={row.latestBid}
                                                winner={row.Bids[row.Bids.length - 1]}
                                                item={row}
                                            />
                                        );
                                    })}
                            </Tbody>
                        </Table>
                    </Box>
                </Box>
            }
        </Admin>
    );
};

export default Items;
