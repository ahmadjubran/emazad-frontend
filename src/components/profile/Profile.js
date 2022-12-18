import { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import ProfilePopover from './ProfilePopover';
import bidsBG from '../../assets/img/ProfileWavesBG.png';
import EditProfileModal from './EditProfileModal';

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
  TabPanel,
  MenuItem,
  MenuList,
  MenuButton,
  Menu
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'

import { getUserProfile, getProfileActiveItems, getProfileStandByItems, getProfileSoldItems, getProfileWonItems, getProfileEngagedItems, getProfileFavoriteItems, getProfileRatingItems } from '../../store/actions/profileActions'
import ProfileItems from './ProfileItems';
import { IoEllipsisVertical } from 'react-icons/io5';
import { selectUserProfile } from '../../store/features/profileSlicer';

export default function Profile() {
  const dispatch = useDispatch()

  const { id } = useParams();

  const { userProfile, activeItems, standByItems, soldItems, wonItems, engagedItems, favoriteItems, rating } = useSelector(state => state.profile)
  
  useEffect(() => {
    getUserProfile(dispatch, id)
    getProfileRatingItems(dispatch, id)
    getProfileActiveItems(dispatch, id)
  }, [dispatch, id])


  return (

    <div className='' >
        <VStack w='100%' h="100%" boxShadow={'xl'}> 
        <Flex direction='row' align='left' justify='center' w='100%' h="100%" mt="2em" mb="2em"> 

          <HStack w='100%' h="100%" justify='center' spacing='1em'>

            <Image src={userProfile.image}
              alt='profile image'
              boxSize='250px'
              objectFit='cover'
              borderRadius='full'
              border='2px'
              borderColor='mediumBlue.200'
              boxShadow='dark-lg'
              
            />

            <VStack align="left" spacing="4">

              <Text> {userProfile.fullName}</Text>
              <Text> {userProfile.userName}</Text>
              <Text> {userProfile.email}</Text>
              
              <HStack >
                <GiStarsStack />
                <Text> Rating: {rating.averageRating}</Text>
              </HStack>

              <HStack >
                <BsFillCalendarCheckFill />
                <Text>{`Joined in ${userProfile.createdAt && userProfile.createdAt.slice(0, 10)}`}</Text>
              </HStack>
              
              <HStack >
                <BsFillTelephoneFill />
                <Text>+962 {userProfile.phoneNumber && userProfile.phoneNumber.slice(1)}</Text>
              </HStack>

            </VStack>

          </HStack>

            <Container maxW="7xl" p={{ base: 5, md: 10 }}>
                  <Box  p={10} boxShadow="md" rounded="md" borderWidth={1} w='250px' bgImg={bidsBG} color='white' 
                  // onClick={scrollDown} 
                  as={Button}>
                    <Text fontWeight="extrabold" fontSize="x-large" >
                      {activeItems.length}
                    </Text>
                    <Text>Active Auctions</Text>
                  </Box>
            </Container>

            <ProfilePopover />
            <EditProfileModal user={userProfile} />

            <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<IoEllipsisVertical />}
                  variant="none"
                  size="lg"
                  alignSelf="center"
                />
                <MenuList
                  bg="gray.200"
                  color="gray.700"
                  fontSize="sm"
                  fontWeight="normal"
                  borderRadius="lg"
                  shadow="lg"
                >

            {/* <MenuItem as={EditProfileModal} user={userProfile} /> */}
            </MenuList>

            </Menu>
          
        </Flex>

      </VStack>



      <Tabs isFitted variant='enclosed' colorScheme='green'>

        <TabList>
          <Tab>Create a New Auction</Tab>
          <Tab onClick={() => getProfileActiveItems(dispatch, id)}><ImHammer2 />Active Items</Tab>
          <Tab onClick={() => getProfileStandByItems(dispatch, id)}><MdSell /> Standby Items</Tab>
          <Tab onClick={() => getProfileSoldItems(dispatch, id)}>Sold Items</Tab>
          <Tab onClick={() => getProfileWonItems(dispatch, id)}>Won Items</Tab>
          <Tab onClick={() => getProfileEngagedItems(dispatch, id)}>Engaged Items</Tab>
          <Tab onClick={() => getProfileFavoriteItems(dispatch, id)}>Favorite Items</Tab>
        </TabList>

            
        <TabPanels>
          <TabPanel>
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
          </TabPanel>

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
        
    </div>


  )
}

