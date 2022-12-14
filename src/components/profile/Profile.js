import NewAuction from './StartNewAuction';
import ProfilePopover from './ProfilePopover';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useState } from 'react'
// import { selectUser } from '../../store/features/authSlicercer'
import '../../styles/Profile.css'
import { FiMail, FiSettings } from 'react-icons/fi'
import { ImHammer2 } from 'react-icons/im'
import { GiStarsStack } from 'react-icons/gi'
import { BsFillTelephoneFill, BsThreeDotsVertical, BsChatSquareQuote, BsFillPersonFill, BsFillCalendarCheckFill } from 'react-icons/bs'
import { MdSell, MdReportProblem, MdOutlineFavorite, MdReviews, MdOutlineEmail } from 'react-icons/md'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
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
  useColorModeValue
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

  return (

    <div className='profile'>
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
              <Button className="user-settings"> <MdReviews /> Reviews </Button>

              <Flex justifyContent="center" mt={4}>
              <ProfilePopover/>
              </Flex>

            </HStack>
            <div className="user-details">
              <div> <FiMail size='20px' /> {userEmail} </div>
              <div> <BsFillTelephoneFill size='20px' /> {userPhone} </div>
              <div> <BsFillPersonFill size='20px' /> {userGender} </div>
              <div> Favorite Auctions </div>

            </div>
          </div>
        </>}

      {isLargerThan768 &&
        <Flex
          direction={{ sm: "column", md: "row" }}
          maxH='330px'
          justifyContent={{ sm: "center", md: "space-between" }}
          align='center'
          backdropFilter='blur(21px)'
          boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.02)'
          border='1.5px solid'
          borderColor={borderProfileColor}
          bg={'#f7fafc'}
          p='24px'
          borderRadius='20px'
          mb ='0'
          pb='0'
          >
          <Flex
            align='left'
            direction={{ sm: "column", md: "row" }}
            w={{ sm: "100%" }}
            textAlign={{ sm: "center", md: "start" }}>
            <Avatar
              me={{ md: "22px" }}
              src={userImage}
              w='180px'
              h='180px'
              borderRadius='15px'
              alt='profile' cursor={'pointer'} as={Button} onClick={(e) => handleImageUpload}
            />
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
                fontWeight='semibold'>
                {userEmail}
              </Text>
            </Flex>
          </Flex>
          <Flex
            direction={{ sm: "column", lg: "row" }}
            w={{ sm: "100%", md: "50%", lg: "auto" }}
            alignItems="center" >

            <Flex
              align='center'
              w={{ sm: "100%", lg: "135px" }}
              borderRadius='8px'
              justifyContent='center'
              py='10px'
            >
              <Button> <MdSell /> Auctions</Button>
            </Flex>

            <Flex
              align='center'
              w={{ lg: "135px" }}
              borderRadius='15px'
              justifyContent='center'
              py='10px'
              mx={{ lg: "1rem" }}>

              <Button className="user-bids" width='112.31px'> <ImHammer2 size='18px' /> Bids </Button>

            </Flex>
            <Flex
              align='center'
              w={{ lg: "135px" }}
              borderRadius='15px'
              justifyContent='center'
              py='10px'>
              <Button className="user-settings"> <MdReviews /> Reviews </Button>

            </Flex>
            <ProfilePopover/>
          </Flex>

        </Flex>

      }

      {/* // Personal Information of This Profile  */}

      <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap='22px' bg={'#f7fafc'} m='0'>
        <Box p='24px'>
          <Box p='12px 5px' mb='12px'>
            <Text fontSize='lg' color={textColor} fontWeight='bold'>
              About {userName}
            </Text>
          </Box>


          <Box px='5px'>
            <Flex direction='column'>

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
                <MdOutlineEmail />
                <Text
                  noOfLines={1}
                  fontSize='md'
                  color='gray.400'
                  fontWeight='400'>
                  {userEmail}

                </Text>
              </Flex>


              <Flex align='center' mb='20px' direction='row'>
                <BsFillTelephoneFill />
                <Text
                  noOfLines={1}
                  fontSize='md'
                  color='gray.400'
                  fontWeight='400'>
                  {`962 ${userPhone}`}

                </Text>
              </Flex>

            </Flex>
          </Box>
        </Box>


        {/* Bids Made by This Profile  */}

        <Box p='16px' my={{ sm: "24px", xl: "0px" }}>
          <Box p='12px 5px' mb='12px'>
            <Text fontSize='lg' color={textColor} fontWeight='bold'>
              Bids made by {userName}
            </Text>
          </Box>
          <Box px='5px' overflowY="auto" maxHeight="150px">
            <Flex direction='column'>
              <Button  minW='100%' mb={'6px'} >
                Has bidden on HP Laptop 2021
              </Button>
              <Button  minW='100%' mb={'6px'}>
                Has bidden on HP Laptop 2021
              </Button>
              <Button  minW='100%'mb={'6px'} >
                Has bidden on HP Laptop 2021
              </Button>
              <Button  minW='100%'mb={'6px'} >
                Has bidden on HP Laptop 2021
              </Button>
              <Button  minW='100%'mb={'6px'} >
                Has bidden on HP Laptop 2021
              </Button>
              
            </Flex>
          </Box>
        </Box>

      </Grid>


        {/* //Auctions Posted By This Profile */}

        <Box p='16px' my='24px'>
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
            gap='24px'>

            {profileActiveAuctions.map((auction, index) => (
              <Flex direction='column'  key={index}>

              <Box key={index} mb='20px' position='relative' borderRadius='15px'>
              <Image src={auction.itemImage[0]} borderRadius='15px' />
              <Box
                  w='100%'
                  h='100%'
                  position='absolute'
                  top='0'
                  borderRadius='15px'
                  bg='linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 120%)'></Box>

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
      </Box>

    </div>


  )
}

