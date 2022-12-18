import React from 'react';
import {
    Box,
    Flex,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
} from '@chakra-ui/react';
import { getActiveItem, getSoldItem, getDataCharts } from '../../store/actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';


function StatCard(props) {
    const dispatch = useDispatch();
    const admin = useSelector(state => state.admin);
    const { title, stat, icon } = props;
    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py={'5'}
            shadow={'xl'}
            border={'1px solid'}
            borderColor={useColorModeValue('gray.800', 'gray.500')}
            rounded={'lg'}
            _hover={{
                transition: '0.3s',
                transform: 'translateY(-3px)',
                bg: '#5BCCD9',
                cursor: 'pointer',

            }}
            onClick={() => {
                switch (title) {
                    case "Users":
                        getDataCharts(dispatch, { case: title, data: admin.item });
                        break;
                    case "Active Items":
                        getActiveItem(dispatch);
                        getDataCharts(dispatch, { case: title, data: admin.item });
                        break;
                    case "Sold Items":
                        getSoldItem(dispatch);
                        getDataCharts(dispatch, { case: title, data: admin.item });
                        break;
                    default:
                        break;
                }
            }}
        >
            <Flex justifyContent={'space-between'}>
                <Box pl={{ base: 2, md: 4 }}>
                    <StatLabel fontWeight={'medium'} isTruncated>
                        {title}
                    </StatLabel>
                    <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                        {stat}
                    </StatNumber>
                </Box>
                <Box
                    my={'auto'}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    alignContent={'center'}>
                    {icon}
                </Box>
            </Flex>
        </Stat>
    )
}

export default StatCard;
