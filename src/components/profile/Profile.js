import '../../styles/Profile.css'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import NewAuction from './ProfileFunctions(NotNeeded)';
import ProfilePopover from './ProfilePopover';
import bidsBG from '../../assets/img/ProfileWavesBG.png';

import { FiMail, FiSettings } from 'react-icons/fi'
import { ImHammer2 } from 'react-icons/im'
import { GiStarsStack } from 'react-icons/gi'
import { BsFillTelephoneFill, BsThreeDotsVertical, BsChatSquareQuote, BsFillPersonFill, BsFillCalendarCheckFill } from 'react-icons/bs'
import { MdSell, MdReportProblem, MdOutlineFavorite, MdReviews, MdOutlineEmail } from 'react-icons/md'
import {
  IconButton,
  GridItem,
  Button,
  Stack,
  Avatar,
  Flex,
  HStack,
  useDisclosure,
  Box,
  Grid,
  Image,
  Text,
  useMediaQuery,
  useColorModeValue,
  VStack,
  Container,
  SimpleGrid,
  Icon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'

import { getUserProfile, getProfileActiveItems, getProfileStandByItems, getProfileSoldItems, getProfileWonItems, getProfileEngagedItems, getProfileFavoriteItems, getProfileRatingItems } from '../../store/actions/profileActions'
import ProfileItems from './ProfileItems';

export default function Profile() {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const { userProfile, activeItems, standByItems, soldItems, wonItems, engagedItems, favoriteItems, rating } = useSelector(state => state.profile)
  
  useEffect(() => {
    getUserProfile(dispatch)
    getProfileRatingItems(dispatch)
    getProfileActiveItems(dispatch)
  }, [dispatch])



  return (

    <div className='' >
        <VStack w='100%' h="100%" boxShadow={'xl'}> 
        <Flex direction='row' align='left' justify='center' w='100%' h="100%" mt="2em" mb="2em"> 


          <HStack w='100%' h="100%" justify='center' spacing='1em'>

            <Image src={userProfile && userProfile.image}
              alt='profile image'
              boxSize='250px'
              objectFit='cover'
              borderRadius='full'
              border='2px'
              borderColor='mediumBlue.200'
              boxShadow='dark-lg'
              
            />

            <VStack align="left" spacing="4">

              <Text> {userProfile && userProfile.fullName}</Text>
              <Text> {userProfile && userProfile.userName}</Text>
              <Text> {userProfile && userProfile.email}</Text>
              
              <HStack >
                <GiStarsStack />
                <Text> Rating: {rating && rating.averageRating}</Text>
              </HStack>

              <HStack >
                <BsFillCalendarCheckFill />
                <Text>{`Joined in ${userProfile && userProfile.createdAt.slice(0, 10)}`}</Text>
              </HStack>
              
              <HStack >
                <BsFillTelephoneFill />
                <Text>+962 {userProfile && userProfile.phoneNumber.slice(1)}</Text>
              </HStack>

            </VStack>

          </HStack>

            <Container maxW="7xl" p={{ base: 5, md: 10 }}>
                  <Box  p={10} boxShadow="md" rounded="md" borderWidth={1} w='250px' bgImg={bidsBG} color='white' 
                  // onClick={scrollDown} 
                  as={Button}>
                    <Text fontWeight="extrabold" fontSize="x-large" >
                      {activeItems && activeItems.length}
                    </Text>
                    <Text>Active Auctions</Text>
                  </Box>
            </Container>

            <Link to='/additem'>
              <Button
              p='0px'
              bg='transparent'
              border='1px solid lightgray'
              borderRadius='15px'
              minHeight={{ sm: "200px", md: "100%" }}
              height='300px'
              w="100%"
              >
                <Flex direction='column' justifyContent='center' align='center'>
                  <Icon as={FaPlus}  fontSize='lg' mb='12px' />
                  <Text fontSize='lg' fontWeight='bold'>
                    Start a New Auction
                  </Text>
                </Flex>
              </Button>
            </Link>
          
        </Flex>

      </VStack>

      <Tabs isFitted variant='enclosed' colorScheme='green'>

        <TabList>
          <Tab onClick={() => getProfileActiveItems(dispatch)}><ImHammer2 />Active Items</Tab>
          <Tab onClick={() => getProfileStandByItems(dispatch)}><MdSell /> Standby Items</Tab>
          <Tab onClick={() => getProfileSoldItems(dispatch)}>Sold Items</Tab>
          <Tab onClick={() => getProfileWonItems(dispatch)}>Won Items</Tab>
          <Tab onClick={() => getProfileEngagedItems(dispatch)}>Engaged Items</Tab>
          <Tab onClick={() => getProfileFavoriteItems(dispatch)}>Favorite Items</Tab>
        </TabList>

        <TabPanels>

          <TabPanel>
            <ProfileItems items={activeItems}/>
          </TabPanel>

          <TabPanel>
            <ProfileItems items={standByItems}/>
          </TabPanel>

          <TabPanel>
            <ProfileItems items={soldItems}/>
          </TabPanel>

          <TabPanel>
            <ProfileItems items={wonItems}/>
          </TabPanel>

          <TabPanel>
            <ProfileItems items={engagedItems}/>
          </TabPanel>

          <TabPanel>
            <ProfileItems items={favoriteItems.map(item => item.Item)}/>
          </TabPanel>

        </TabPanels>
      </Tabs>
      


    {/* Bids Made by This Profile  */}

{engagedItems === 'Bids' &&
      <Grid   m='0' border={'solid, lightBlue, 2px'} align='center' templateColumns='repeat(3, 1fr)' gap={6} >
      

    <GridItem backgroundImage={bidsBG}>         </GridItem>
      <GridItem> 
        <Box p='16px' my={{ sm: "24px", xl: "0px" }}  >
          <Box p='12px 5px' mb='12px' >
            <Text fontSize='lg' color={'darkBlue.200'} fontWeight='bold'>
              Bids made by {user.fullName}
            </Text>
          </Box>
          <Box px='5px' overflowY="auto" maxHeight="220px">
            <Flex direction='column'  align='center'>
              <Button w={'400px'} mb={'6px'} variant={'secondary'} >
                Has bidden on HP Laptop 2021
              </Button>
              <Button  w={'400px'} mb={'6px'} variant={'secondary'}>
                Has bidden on HP Laptop 2021
              </Button>
              <Button  w={'400px'} mb={'6px'} variant={'secondary'}>
                Has bidden on HP Laptop 2021
              </Button>
              <Button  w={'400px'} mb={'6px'} variant={'secondary'}>
                Has bidden on HP Laptop 2021
              </Button>
              <Button  w={'400px'} mb={'6px'} variant={'secondary'}>
                Has bidden on HP Laptop 2021
              </Button>
              
            </Flex>
          </Box>
        </Box>
        </GridItem>
        <GridItem  backgroundImage={bidsBG} >    </GridItem>
        
      </Grid> }

        {/* //Auctions Posted By This Profile */}
        {engagedItems === 'Auctions' &&
        <Box p='16px' my='24px' >
        <Box p='12px 5px' mb='12px'>
          <Flex direction='column'>
            <Text fontSize='lg'  fontWeight='bold'>
              Auctions
            </Text>
            <Text fontSize='sm' color='gray.400' fontWeight='400'>
              Auctions posted by {user.fullName}
            </Text>
          </Flex>
        </Box>
        <Box px='5px'>
          <Grid
            templateColumns={{ sm: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)" }}
            templateRows={{ sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr" }}
            gap='24px' overflowY="auto" maxHeight="500px">

            {activeItems.map((auction, index) => (
              <Flex direction='column'  key={index}>

              <Box key={index} mb='20px' position='relative' borderRadius='15px'>
              <Image src={auction.itemImage[0]} borderRadius='15px'  />
          
                    </Box>
                    <Flex direction='column'>
                <Text
                  fontSize='xl'
                 fontWeight='bold'
                  mb='10px'>
                  {auction.itemTitle}
                </Text>
                <Text fontSize='md' color='gray.400' fontWeight='400' mb='20px'>
                 {auction.itemDescription}
                </Text>
                <Flex justifyContent='space-between'>
                  <Button variant='dark' minW='110px' h='36px' >
                    VIEW AUCTION
                  </Button>
                  <Text
                  fontSize='sm'
              
                  fontWeight='bold'
                  mb='10px'>
                  {`3 days remaining `}
                </Text>
                 
                </Flex>
              </Flex>
                    </Flex>

            ))}
            
            
  

            <Link to='/additem'>
              <Button
              p='0px'
              bg='transparent'
              border='1px solid lightgray'
              borderRadius='15px'
              minHeight={{ sm: "200px", md: "100%" }}
              height='300px'
              w="100%"
              >
                <Flex direction='column' justifyContent='center' align='center'>
                  <Icon as={FaPlus}  fontSize='lg' mb='12px' />
                  <Text fontSize='lg' fontWeight='bold'>
                    Start a New Auction
                  </Text>
                </Flex>
              </Button>
            </Link>
                

          </Grid>
          </Box>
      </Box> }

    </div>


  )
}

