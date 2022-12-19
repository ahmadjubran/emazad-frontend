import React, { useEffect } from 'react';
import Chart from './ChartSell';
import Admin from './Admin';
import Statistic from './Statistic';
import {
    Flex,
    Box,
    Grid,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { getNumberUsers, getUsersBlocked, getActiveItem, getSoldItem, getDataCharts } from '../../store/actions/adminActions';
import PieChart from './PieChart';

function Dashboard() {
    const dispatch = useDispatch();
    const admin = useSelector(state => state.admin);
    useEffect(() => {
        getNumberUsers(dispatch);
        getUsersBlocked(dispatch);
        getActiveItem(dispatch);
        getSoldItem(dispatch);
        getDataCharts(dispatch, { case: 'Users', data: admin.item });
    }, [dispatch])
    return (
        <Admin  >
            <Flex flexDir='column' w='100%' overflow='auto'>
                <Statistic />
                <Grid templateColumns={{ base: "1fr", md: "1fr auto", lg: "1fr auto auto  " }} gap={5} alignItems="center" justifyContent='space-evenly' mt='10'>
                    <Box overflow='auto' w='80%' p='15'
                        border='1px solid'
                        borderColor='gray.300'
                        borderRadius='2xl'
                        bg='gray.200'
                        padding='1rem'
                        mr='1.2rem'
                        boxShadow='md'

                    >
                        <Chart minW={{ base: "100%", md: "100%", lg: "100%" }} h='90%' />
                    </Box>
                    <Box >
                        <PieChart w='100%' />
                    </Box>
                    {/* <PieChart w='100%' /> */}

                </Grid>
            </Flex>


        </Admin>


    )
}

export default Dashboard;
