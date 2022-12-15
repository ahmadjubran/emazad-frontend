import NewAuction from './StartNewAuction';
import ProfilePopover from './ProfilePopover';
import bidsBG from '../../assets/img/ProfileWavesBG.png';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useState, useEffect } from 'react'
// import { selectUser } from '../../store/features/authSlicercer'
import '../../styles/Profile.css'
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
  SimpleGrid
} from '@chakra-ui/react';


export default function Profile() {

  // Routes:
  // router.get("/profile/:id", bearerAuth, getUserProfile);
  // router.put("/profile/:id", uploadUserImg, bearerAuth, updateUserProfile);

  const dispatch = useDispatch()
  // const user = useSelector(selectUser)
  const { user } = useSelector(state => state.auth)
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  
  const textColor = useColorModeValue("gray.700", "white");
  const iconColor = useColorModeValue("blue.500", "white");
  const bgProfile = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
  const borderProfileColor = useColorModeValue("white", "transparent");
  const emailColor = useColorModeValue("gray.400", "gray.300");
  
  // current date in the format of yyyy-mm-dd-hh-mm-ss:
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', '-');
  
  //States:
  
  const [userName, setUserName] = useState('Abu Al Shabab')
  const [userEmail, setUserEmail] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userGender, setUserGender] = useState('')
  const [userRating, setUserRating] = useState(0)
  const [userBirthDate, setUserBirthDate] = useState('')
  const [joinDate, setJoinDate] = useState('')
  const [userImage, setUserImage] = useState('')
  const [profileActiveAuctions, setProfileActiveAuctions] = useState([])
  const [renderComponent, setRenderComponent] = useState('Auctions')


  //Functions:

  // get profile data from backend 1
  const getProfileData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/profile/1`, {
      // there is a problem with the server, it doesn't let users to get data without authorization
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(currentDate)
    console.log(res.data)
    userReviews()
    userBids()
    userActiveAuctions()
    setUserName(res.data.userName)
    setUserEmail(res.data.email)
    setUserPhone(res.data.phone)
    setUserImage(res.data.image)
    setUserBirthDate(res.data.birthDate)
    setUserPhone(res.data.phoneNumber)
    setUserGender(res.data.gender)
    setJoinDate(res.data.createdAt)
    profileFavoriteAuctions()


  }
  // to get the sold auctions posted by the user 1
  const userSoldAuctions = async () => {
    const res = await axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/userSoldItems/1`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  // to get the active auctions posted by the user 1

  const userActiveAuctions = async () => {
    const res = await axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/userActiveItems/1`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(res.data)
    setProfileActiveAuctions(res.data)
  }

  // to get the bids made by the user 1


  const userBids = async () => {
    const res = await axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/userEngagedItems/1`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(res.data)
  }

  // to get user 1's reviews
  const userReviews = async () => {
    const res = await axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/userRating/1`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    let averageRating = res.data.averageRating
    averageRating = res.data.averageRating.toFixed(2)
    setUserRating(`${averageRating}/5`)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    axios.put(`${process.env.REACT_APP_HEROKU_API_KEY}/profile/1`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        setUserImage(res.data.image)
      })
      .catch(err => console.log(err))
  }

  const profileFavoriteAuctions = async () => {
    const res = await axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/favorite`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(res.data)
  }


  const handleRenderComponent = (e) => {
    setRenderComponent(e.target.name)
  }

  useEffect(() => {
    setRenderComponent(renderComponent)
  }, )

  return (

    <div className='profile' >
      <button onClick={getProfileData}> Get Data </button>

      {isLessThan768 &&
        <>
          <div className='profile-img'>
            <Avatar src={userImage} width='190px' height='190px' alt='profile' cursor={'pointer'} style={{ borderRadius: '50%' }} as={Button} onClick={(e) => handleImageUpload} />
          </div>
          <div className='profile-info'>
            <h1>{userName}</h1>
            <HStack>
              <Button className="user-auctions"> <MdSell /> Auctions</Button>
              <Button className="user-bids" width='112.31px'> <ImHammer2 size='18px' /> Bids </Button>

              <Flex justifyContent="center" mt={4}>
              <ProfilePopover/>
              </Flex>

            </HStack>
          </div>
        </>}

      {isLargerThan768 &&
        <VStack w='100%' bg={'#f7fafc'} boxShadow={'xl'} mb='12px' > 
        <Flex
          direction={{ sm: "column", md: "row" }}
          maxH='330px'
          justifyContent={{ sm: "center", md: "space-between" }}
          align='center'
          backdropFilter='blur(21px)'
          p='24px'
          borderRadius='20px'
          mb ='0'
          pb='0'
          w='100%'
          >
          <Flex
            align='left'
            direction={{ sm: "column", md: "row" }}
            w={{ sm: "100%" }}
            textAlign={{ sm: "center", md: "start" }}>
            <Avatar
              me={{ md: "22px" }}
              src={userImage}
              w='220px'
              h='190px'
              borderRadius='15px'
              alt='profile' cursor={'pointer'} as={Button} onClick={(e) => handleImageUpload}
              border='5px' borderColor='mediumBlue.200'
            />
            {/* Profile Summary */}
            <Flex direction='column' maxWidth='100%' my={{ sm: "14px" }}>
              <Text
                fontSize={{ sm: "lg", lg: "xl" }}
                color={textColor}
                fontWeight='bold'
                ms={{ sm: "8px", md: "0px" }}>
                {userName}
              </Text>
              <Text
                fontSize={{ sm: "sm", md: "md" }}
                color={emailColor}
                mb='8px'
                fontWeight='semibold'>
                {userEmail}
              </Text>
              <Flex align='center' mb='20px' direction='row'>
                <GiStarsStack />
                <Text
                  noOfLines={1}
                  fontSize='md'
                  color='gray.400'
                  fontWeight='400'>
                  Rating: {userRating}
                </Text>
              </Flex>
              <Flex align='center' mb='20px' direction='row'>
                <BsFillCalendarCheckFill />
                <Text
                  noOfLines={1}
                  fontSize='md'
                  color='gray.400'
                  fontWeight='400'>
                  Joined in Dec 2022

                </Text>
              </Flex>
              
              <Flex align='center' mb='20px' direction='row'>
                <BsFillTelephoneFill />
                <Text
                  noOfLines={1}
                  fontSize='md'
                  color='gray.400'
                  fontWeight='400'>
                  {`+962 ${userPhone}`}

                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex align='right'>
          <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5} mt={12} mb={4}>
          <Box  p={10} boxShadow="md" rounded="md" borderWidth={1} w='250px' bgImg={bidsBG} color='white' >
            <Text fontWeight="extrabold" fontSize="x-large" >
              {profileActiveAuctions.length+1}
            </Text>
            <Text>Active Auctions</Text>
          </Box>
      </SimpleGrid>
    </Container>
             </Flex>


        </Flex>
        <Flex
            direction={{ sm: "column", lg: "row" }}
            w={{ sm: "100%", md: "50%", lg: "auto" }}
            align="center" 
            justify="center"
            m='0'>
              <Flex gap ='50rem' align="center"> 
              <Flex gap ='-5rem'> 
            <Flex
              align='center'
              w={{ sm: "100%", lg: "135px" }}
              borderRadius='8px'
              justifyContent='center'
              py='10px'
            >
              <Button 
              name='Auctions'
               bg='transparent' 
               color='mediumBlue.200'
                border='1px'
                 borderColor='mediumblue.200'
                  _hover={{  background: 'mediumBlue.200',  color: 'white' }}
                   onClick={ e => handleRenderComponent(e)} > <MdSell />  Auctions </Button>
            </Flex>

            <Flex
              align='center'
              w={{ lg: "135px" }}
              borderRadius='15px'
              justifyContent='center'
              py='10px'
              >

              <Button 
              name='Bids'
               width='112.31px'
                bg='transparent'
                 color='mediumBlue.200' 
                 border='1px' 
                 borderColor='mediumblue.200'
                  _hover={{  background: 'mediumBlue.200',  color: 'white' }} 
                  onClick={ e => handleRenderComponent(e)}> <ImHammer2 size='18px' /> Bids </Button>

            </Flex> 
            </Flex>

            <Flex
              align='center'
              w={{ lg: "135px" }}
              borderRadius='15px'
              justifyContent='center'
              py='10px'>

            <ProfilePopover/>
            </Flex>
          </Flex>
          </Flex>


      </VStack>
      }


    {/* Bids Made by This Profile  */}

{renderComponent === 'Bids' &&
      <Grid   m='0' border={'solid, lightBlue, 2px'} align='center' templateColumns='repeat(3, 1fr)' gap={6}>
      

    <GridItem backgroundImage={bidsBG}>         </GridItem>
      <GridItem> 
        <Box p='16px' my={{ sm: "24px", xl: "0px" }}  >
          <Box p='12px 5px' mb='12px' >
            <Text fontSize='lg' color={'darkBlue.200'} fontWeight='bold'>
              Bids made by {userName}
            </Text>
          </Box>
          <Box px='5px' overflowY="auto" maxHeight="150px">
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
        {renderComponent === 'Auctions' &&
        <Box p='16px' my='24px' >
        <Box p='12px 5px' mb='12px'>
          <Flex direction='column'>
            <Text fontSize='lg' color={textColor} fontWeight='bold'>
              Auctions
            </Text>
            <Text fontSize='sm' color='gray.400' fontWeight='400'>
              Auctions posted by {userName}
            </Text>
          </Flex>
        </Box>
        <Box px='5px'>
          <Grid
            templateColumns={{ sm: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)" }}
            templateRows={{ sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr" }}
            gap='24px' overflowY="auto" maxHeight="500px">

            {profileActiveAuctions.map((auction, index) => (
              <Flex direction='column'  key={index}>

              <Box key={index} mb='20px' position='relative' borderRadius='15px'>
              <Image src={auction.itemImage[0]} borderRadius='15px'  />
          
                    </Box>
                    <Flex direction='column'>
                <Text
                  fontSize='xl'
                  color={textColor}
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
                  color={emailColor}
                  fontWeight='bold'
                  mb='10px'>
                  {`3 days remaining `}
                </Text>
                 
                </Flex>
              </Flex>
                    </Flex>

            ))}
            
            
           
           <NewAuction textColor={textColor}/>
          </Grid>
          </Box>
      </Box> }

    </div>


  )
}

