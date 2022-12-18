import React from 'react';
import StatCard from './StatCard';
import {
    Box,
    chakra,
    SimpleGrid,

} from '@chakra-ui/react';
import { BsPerson } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { TbDatabase, TbDatabaseOff } from "react-icons/tb";


function Statistic() {
    const admin = useSelector(state => state.admin);
    console.log(admin)
    console.log("from card")
    return (
        console.log(admin),
        <Box pt={5} px={{ base: 2, sm: 12, md: 17 }}>
            <chakra.h1
                textAlign={'center'}
                fontSize={'4xl'}
                py={10}
                fontWeight={'bold'}>
                Dashboard
            </chakra.h1>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                <StatCard
                    title={'Users'}
                    stat={admin.numberUser}
                    icon={<BsPerson size={'3em'} />}
                />
                <StatCard
                    title={'Active Items'}
                    stat={admin.numberACtiveItems}
                    icon={<TbDatabase size={'3em'} />}

                />
                <StatCard
                    title={'Sold Items'}
                    stat={admin.numberSoldItems}
                    icon={<TbDatabaseOff size={'3em'}

                    />}
                />
            </SimpleGrid>
        </Box>
    );
}

export default Statistic;