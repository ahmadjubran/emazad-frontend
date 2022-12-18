import React, { useEffect } from 'react';
import Chart from './ChartSell';
import Admin from './Admin';
import Statistic from './Statistic';
import {
    Flex,
    Box,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { getNumberUsers, getUsersBlocked, getActiveItem, getSoldItem, getDataCharts } from '../../store/actions/adminActions';


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
                <Box mt='15' h='calc(100vh - 400px)' overflow='hidden'>
                    <Chart w='100%' />

                </Box>
            </Flex>

        </Admin>


    )
}

export default Dashboard;
